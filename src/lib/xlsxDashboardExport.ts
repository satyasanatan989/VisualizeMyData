import ExcelJS from 'exceljs';
import type { ParsedData } from './excelParser';
import type { InsightReport } from './dataInsightEngine';

function fmt(n: number, dp = 2) {
    return isFinite(n) ? Number(n.toFixed(dp)) : 0;
}

function countMissingRows(data: Record<string, any>[], keys: string[]): number {
    return data.filter(row =>
        keys.some(k => row[k] === null || row[k] === undefined || row[k] === '')
    ).length;
}

export async function exportDashboardXlsx(
    parsedData: ParsedData,
    report: InsightReport,
    imgDataBase64?: string
): Promise<void> {
    const wb = new ExcelJS.Workbook();
    wb.creator = 'VisualizeMyData';
    const { data, columns, fileName, rowCount } = parsedData;
    const { keyStats, numericColumns, categoricalColumns, dateColumns, insights, summary } = report;
    const baseName = fileName.replace(/\.[^.]+$/, '');

    /* ── SHEET 1: Dashboard Summary ── */
    const ws1 = wb.addWorksheet('Dashboard Summary');
    ws1.properties.defaultColWidth = 15;

    // Header for Visual Dashboard
    ws1.mergeCells('A1:J2');
    const titleCell = ws1.getCell('A1');
    titleCell.value = 'VisualizeMyData — Dashboard Visual & Summary';
    titleCell.font = { size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
    titleCell.alignment = { vertical: 'middle', horizontal: 'center' };

    let imageRowOffset = 3;

    // Embed Image if provided
    if (imgDataBase64) {
        try {
            const imageId = wb.addImage({
                base64: imgDataBase64,
                extension: 'png',
            });

            // The image scale depends on ExcelJS cell scaling. We'll give it a large block.
            ws1.addImage(imageId, {
                tl: { col: 0, row: 3 },
                ext: { width: 1100, height: 750 }
            });
            imageRowOffset = 42; // push text below image
        } catch (e) {
            console.error('Failed to embed image', e);
        }
    }

    // Add Text Summary Below Image
    ws1.getCell(`A${imageRowOffset}`).value = 'Dataset Metadata';
    ws1.getCell(`A${imageRowOffset}`).font = { bold: true, size: 14 };

    const metaData = [
        ['File', fileName],
        ['Total Rows', rowCount],
        ['Total Columns', columns.length],
        ['Numeric Columns', numericColumns.length],
        ['Categorical Columns', categoricalColumns.length],
        ['Date Columns', dateColumns.length],
        ['Missing Value Rows', countMissingRows(data, columns.map(c => c.key))],
    ];

    let rowCursor = imageRowOffset + 2;
    metaData.forEach(row => {
        ws1.getRow(rowCursor).values = row;
        rowCursor++;
    });

    rowCursor++;
    ws1.getCell(`A${rowCursor}`).value = 'KPI Metrics';
    ws1.getCell(`A${rowCursor}`).font = { bold: true, size: 14 };
    rowCursor++;
    ws1.getRow(rowCursor).values = ['Metric', 'Value'];
    ws1.getRow(rowCursor).font = { bold: true };
    rowCursor++;

    for (const col of numericColumns) {
        const s = keyStats[col];
        if (!s) continue;
        const vals = data.map(r => Number(r[col])).filter(n => !isNaN(n));
        const sum = vals.reduce((a, b) => a + b, 0);
        ws1.getRow(rowCursor++).values = [`${col} — Min`, fmt(s.min)];
        ws1.getRow(rowCursor++).values = [`${col} — Max`, fmt(s.max)];
        ws1.getRow(rowCursor++).values = [`${col} — Average`, fmt(s.avg)];
        ws1.getRow(rowCursor++).values = [`${col} — Median`, fmt(s.median)];
        ws1.getRow(rowCursor++).values = [`${col} — Sum`, fmt(sum, 0)];
    }

    rowCursor++;
    ws1.getCell(`A${rowCursor}`).value = 'AI Insights';
    ws1.getCell(`A${rowCursor}`).font = { bold: true, size: 14 };
    rowCursor++;
    ws1.getRow(rowCursor).values = ['Title', 'Description', 'Severity'];
    ws1.getRow(rowCursor).font = { bold: true };
    rowCursor++;

    for (const ins of insights) {
        ws1.getRow(rowCursor).values = [ins.title, ins.description, ins.severity];
        rowCursor++;
    }

    ws1.getColumn(1).width = 35;
    ws1.getColumn(2).width = 60;
    ws1.getColumn(3).width = 15;

    /* ── SHEET 2: Raw Data ── */
    const ws2 = wb.addWorksheet('Raw Data');
    const headerRow = columns.map(c => c.key);
    ws2.addRow(headerRow).font = { bold: true };
    data.forEach(row => {
        ws2.addRow(columns.map(c => row[c.key]));
    });

    /* ── SHEET 3: Analytics Summary ── */
    const ws3 = wb.addWorksheet('Analytics Summary');
    ws3.addRow(['Column', 'Type', 'Min', 'Max', 'Average', 'Median', 'Sum', 'Unique Values']).font = { bold: true };

    for (const col of columns) {
        const s = keyStats[col.key];
        const vals = col.type === 'number'
            ? data.map(r => Number(r[col.key])).filter(n => !isNaN(n))
            : [];
        const sum = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) : '';
        ws3.addRow([
            col.key,
            col.type,
            s ? fmt(s.min) : '—',
            s ? fmt(s.max) : '—',
            s ? fmt(s.avg) : '—',
            s ? fmt(s.median) : '—',
            typeof sum === 'number' ? fmt(sum, 0) : '—',
            col.uniqueValues,
        ]);
    }
    ws3.getColumn(1).width = 25;

    /* ── SHEET 4: Column Info ── */
    const ws4 = wb.addWorksheet('Column Info');
    ws4.addRow(['Column Name', 'Data Type', 'Unique Values', 'Is Categorical', 'Min', 'Max']).font = { bold: true };
    for (const c of columns) {
        ws4.addRow([
            c.key,
            c.type,
            c.uniqueValues,
            c.isCategorical ? 'Yes' : 'No',
            c.min ?? '—',
            c.max ?? '—',
        ]);
    }
    ws4.getColumn(1).width = 25;

    /* ── Write file ── */
    const buffer = await wb.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${baseName}-dashboard.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
