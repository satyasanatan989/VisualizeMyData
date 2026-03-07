import XlsxPopulate from 'xlsx-populate/browser/xlsx-populate';
import type { ParsedData } from './excelParser';
import type { InsightReport } from './dataInsightEngine';
import { getChartRecommendation } from './dataInsightEngine';

/**
 * Native Excel Dashboard Exporter using xlsx-populate
 * Reads a pre-generated Excel template containing native charts
 * and injects the user's data so the charts update dynamically.
 */
export async function exportNativeExcelDashboard(
    parsedData: ParsedData,
    report: InsightReport,
    selectedChartType?: string
) {
    try {
        // 1. Fetch the static Excel template array buffer
        const response = await fetch('/templates/dashboard-template.xlsx');
        if (!response.ok) {
            throw new Error(`Failed to load template: ${response.statusText}`);
        }
        const templateBuffer = await response.arrayBuffer();

        // 2. Load the workbook with xlsx-populate
        const wb = await XlsxPopulate.fromDataAsync(templateBuffer);

        // 3. Inject Raw Data into "DATA" sheet
        const dataSheet = wb.sheet("DATA");
        if (!dataSheet) throw new Error("Template missing DATA sheet");

        // Clear existing template data safely (just mapping over rows used)
        dataSheet.usedRange()?.clear();

        // Write headers
        const headers = parsedData.columns.map(c => c.key);
        dataSheet.cell(1, 1).value([headers]);

        // Write rows
        const rows = parsedData.data.map(row => headers.map(h => row[h] ?? null));
        if (rows.length > 0) {
            dataSheet.cell(2, 1).value(rows);
        }

        // 4. Inject Aggregated Data into "CHART_DATA" sheet
        const chartDataSheet = wb.sheet("CHART_DATA");
        if (!chartDataSheet) throw new Error("Template missing CHART_DATA sheet");

        chartDataSheet.usedRange()?.clear();

        // Determine what data to put here based on the selected chart type.
        // If not specified, use recommendation.
        const chartType = selectedChartType || getChartRecommendation(parsedData.columns);

        // We need a category column and a metric column to power the charts.
        const catCol = parsedData.columns.find(c => c.isCategorical || c.type === 'string' || c.type === 'date');
        const numCol = parsedData.columns.find(c => c.type === 'number');

        if (catCol && numCol) {
            chartDataSheet.cell(1, 1).value([[catCol.key, numCol.key]]);

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

            // Limit to top 100 for Excel charts to not break templates
            const sortedEntries = Object.entries(aggregated)
                .sort((a, b) => b[1] - a[1]) // Decending
                .slice(0, 100);

            if (sortedEntries.length > 0) {
                chartDataSheet.cell(2, 1).value(sortedEntries);
            }
        } else {
            chartDataSheet.cell(1, 1).value([['Category', 'Value']]);
            chartDataSheet.cell(2, 1).value([['No valid categories/metrics found', 0]]);
        }

        // 5. Hide charts that the user did not select from the DASHBOARD sheet.
        // xlsx-populate does not have rich chart deletion APIs, but we can hide shapes
        // or just let them all render as a multi-chart dashboard.
        // We will keep all 5 charts as a feature of the "Native Dashboard Export".

        // Let's update the titles dynamically based on data
        const dashSheet = wb.sheet("DASHBOARD");
        if (dashSheet) {
            const titleCell = dashSheet.cell("B2");
            if (titleCell) {
                titleCell.value(`${parsedData.fileName.replace(/\.[^.]+$/, '')} Dashboard`);
            }
        }

        // 6. Generate final Excel buffer and trigger download
        const blob = await wb.outputAsync({ type: "blob" });
        const url = URL.createObjectURL(blob as Blob);

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
        alert("Failed to export Excel Dashboard. Please check console for details.");
    }
}
