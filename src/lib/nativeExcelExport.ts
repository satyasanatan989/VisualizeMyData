import ExcelJS from 'exceljs';
import type { ParsedData } from './excelParser';
import { getChartRecommendation } from './dataInsightEngine';
import { toast } from 'sonner';

/**
 * Native Excel Dashboard Exporter using exceljs
 * Reads a pre-generated Excel template containing native charts
 * and injects the user's data so the charts update dynamically.
 */
export async function exportNativeExcelDashboard(
    parsedData: ParsedData,
    selectedChartType?: string
) {
    try {
        // 1. Fetch the static Excel template array buffer
        const response = await fetch('/templates/dashboard-template.xlsx');
        if (!response.ok) {
            throw new Error(`Failed to load template: ${response.statusText}`);
        }
        const templateBuffer = await response.arrayBuffer();

        // 2. Load the workbook with exceljs
        const wb = new ExcelJS.Workbook();
        await wb.xlsx.load(templateBuffer);

        // 3. Inject Raw Data into "DATA" sheet
        const dataSheet = wb.getWorksheet("DATA");
        if (!dataSheet) throw new Error("Template missing DATA sheet");

        // Clear existing rows (splicing from row 1)
        if (dataSheet.rowCount > 0) {
            dataSheet.spliceRows(1, dataSheet.rowCount + 1);
        }

        // Write headers
        const headers = parsedData.columns.map(c => c.key);
        dataSheet.getRow(1).values = headers;

        // Write rows
        parsedData.data.forEach((row, i) => {
            dataSheet.getRow(i + 2).values = headers.map(h => row[h] ?? null);
        });

        // 4. Inject Aggregated Data into "CHART_DATA" sheet
        const chartDataSheet = wb.getWorksheet("CHART_DATA");
        if (!chartDataSheet) throw new Error("Template missing CHART_DATA sheet");

        if (chartDataSheet.rowCount > 0) {
            chartDataSheet.spliceRows(1, chartDataSheet.rowCount + 1);
        }

        // We need a category column and a metric column to power the charts.
        const catCol = parsedData.columns.find(c => c.isCategorical || c.type === 'string' || c.type === 'date');
        const numCol = parsedData.columns.find(c => c.type === 'number');

        if (catCol && numCol) {
            chartDataSheet.getRow(1).values = [catCol.key, numCol.key];

            // Aggregate data (simple sum by category) for chart clarity
            const aggregated: Record<string, number> = {};
            for (const row of parsedData.data) {
                const cat = String(row[catCol.key] || 'Unknown');
                const rawVal = row[numCol.key];
                let cleanVal = rawVal;
                if (typeof rawVal === 'string') {
                    cleanVal = rawVal.replace(/[$,\s]/g, '');
                }
                const val = cleanVal !== '' && cleanVal !== undefined && cleanVal !== null ? Number(cleanVal) : 0;
                aggregated[cat] = (aggregated[cat] || 0) + (isNaN(val) ? 0 : val);
            }

            // Limit to top 100 entries for Excel charts
            const sortedEntries = Object.entries(aggregated)
                .sort((a, b) => b[1] - a[1]) // Descending
                .slice(0, 100);

            sortedEntries.forEach((entry, i) => {
                chartDataSheet.getRow(i + 2).values = entry;
            });
        } else {
            chartDataSheet.getRow(1).values = ['Category', 'Value'];
            chartDataSheet.getRow(2).values = ['No valid categories/metrics found', 0];
        }

        // Let's update the titles dynamically based on data
        const dashSheet = wb.getWorksheet("DASHBOARD");
        if (dashSheet) {
            const titleCell = dashSheet.getCell("B2");
            if (titleCell) {
                titleCell.value = `${parsedData.fileName.replace(/\.[^.]+$/, '')} Dashboard`;
            }
        }

        // 6. Generate final Excel buffer and trigger download
        const buffer = await wb.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${parsedData.fileName.replace(/\.[^.]+$/, '')}-native-dashboard.xlsx`;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);

    } catch (err) {
        console.error("Failed to generate native Excel dashboard:", err);
        toast.error("Failed to export Excel Dashboard.");
    }
}
