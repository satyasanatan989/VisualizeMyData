/**
 * xlsxDashboardExport.ts
 *
 * Generates a multi-sheet Excel workbook (.xlsx) containing:
 *   Sheet 1 – Dashboard Summary  (KPIs + Insights)
 *   Sheet 2 – Raw Data           (original dataset)
 *   Sheet 3 – Analytics Summary  (per-column stats)
 *   Sheet 4 – Column Info        (schema metadata)
 *
 * Uses the existing `xlsx` package — no new dependencies.
 */

import * as xlsx from 'xlsx';
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

export function exportDashboardXlsx(
    parsedData: ParsedData,
    report: InsightReport
): void {
    const wb = xlsx.utils.book_new();
    const { data, columns, fileName, rowCount } = parsedData;
    const { keyStats, numericColumns, categoricalColumns, dateColumns, insights, summary } = report;
    const baseName = fileName.replace(/\.[^.]+$/, '');

    /* ── SHEET 1: Dashboard Summary ── */
    const summaryRows: (string | number)[][] = [
        ['VisualizeMyData — Dashboard Summary'],
        [],
        ['File', fileName],
        ['Total Rows', rowCount],
        ['Total Columns', columns.length],
        ['Numeric Columns', numericColumns.length],
        ['Categorical Columns', categoricalColumns.length],
        ['Date Columns', dateColumns.length],
        ['Missing Value Rows', countMissingRows(data, columns.map(c => c.key))],
        [],
        ['── KPI Metrics ──'],
        ['Metric', 'Value'],
    ];

    // Per-numeric-column KPIs
    for (const col of numericColumns) {
        const s = keyStats[col];
        if (!s) continue;
        const vals = data.map(r => Number(r[col])).filter(n => !isNaN(n));
        const sum = vals.reduce((a, b) => a + b, 0);
        summaryRows.push([`${col} — Min`, fmt(s.min)]);
        summaryRows.push([`${col} — Max`, fmt(s.max)]);
        summaryRows.push([`${col} — Average`, fmt(s.avg)]);
        summaryRows.push([`${col} — Median`, fmt(s.median)]);
        summaryRows.push([`${col} — Sum`, fmt(sum, 0)]);
    }

    summaryRows.push([]);
    summaryRows.push(['── AI Insights ──']);
    summaryRows.push(['Title', 'Description', 'Severity']);
    for (const ins of insights) {
        summaryRows.push([ins.title, ins.description, ins.severity]);
    }
    summaryRows.push([]);
    summaryRows.push(['Summary', summary]);

    const ws1 = xlsx.utils.aoa_to_sheet(summaryRows);
    // Column widths
    ws1['!cols'] = [{ wch: 32 }, { wch: 60 }, { wch: 12 }];
    xlsx.utils.book_append_sheet(wb, ws1, 'Dashboard Summary');

    /* ── SHEET 2: Raw Data ── */
    const ws2 = xlsx.utils.json_to_sheet(data);
    ws2['!cols'] = columns.map(() => ({ wch: 18 }));
    xlsx.utils.book_append_sheet(wb, ws2, 'Raw Data');

    /* ── SHEET 3: Analytics Summary ── */
    const analyticsRows: (string | number)[][] = [
        ['Column', 'Type', 'Min', 'Max', 'Average', 'Median', 'Sum', 'Unique Values'],
    ];

    for (const col of columns) {
        const s = keyStats[col.key];
        const vals = col.type === 'number'
            ? data.map(r => Number(r[col.key])).filter(n => !isNaN(n))
            : [];
        const sum = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) : '';
        analyticsRows.push([
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

    const ws3 = xlsx.utils.aoa_to_sheet(analyticsRows);
    ws3['!cols'] = [{ wch: 24 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 14 }, { wch: 14 }];
    xlsx.utils.book_append_sheet(wb, ws3, 'Analytics Summary');

    /* ── SHEET 4: Column Info ── */
    const colInfoRows: (string | number | boolean)[][] = [
        ['Column Name', 'Data Type', 'Unique Values', 'Is Categorical', 'Min', 'Max'],
        ...columns.map(c => [
            c.key,
            c.type,
            c.uniqueValues,
            c.isCategorical ? 'Yes' : 'No',
            c.min ?? '—',
            c.max ?? '—',
        ]),
    ];
    const ws4 = xlsx.utils.aoa_to_sheet(colInfoRows);
    ws4['!cols'] = [{ wch: 24 }, { wch: 12 }, { wch: 14 }, { wch: 16 }, { wch: 12 }, { wch: 12 }];
    xlsx.utils.book_append_sheet(wb, ws4, 'Column Info');

    /* ── Write file ── */
    xlsx.writeFile(wb, `${baseName}-dashboard.xlsx`, { bookType: 'xlsx' });
}
