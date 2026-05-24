import { ParsedData, ColumnInfo } from './excelParser';

export interface DataInsight {
    type: 'trend' | 'distribution' | 'outlier' | 'summary' | 'category' | 'correlation';
    severity: 'info' | 'warning' | 'success';
    title: string;
    description: string;
    icon: string;
}

export interface InsightReport {
    insights: DataInsight[];
    summary: string;
    numericColumns: string[];
    categoricalColumns: string[];
    dateColumns: string[];
    keyStats: Record<string, { min: number; max: number; avg: number; median: number }>;
}

function computeStats(values: number[]) {
    if (values.length === 0) return { min: 0, max: 0, avg: 0, median: 0 };
    const sorted = [...values].sort((a, b) => a - b);
    const sum = values.reduce((a, b) => a + b, 0);
    const mid = Math.floor(sorted.length / 2);
    return {
        min: sorted[0],
        max: sorted[sorted.length - 1],
        avg: sum / values.length,
        median: sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2,
    };
}

function detectTrend(values: number[]): 'increasing' | 'decreasing' | 'stable' {
    if (values.length < 3) return 'stable';
    const half = Math.floor(values.length / 2);
    const firstHalfAvg = values.slice(0, half).reduce((a, b) => a + b, 0) / half;
    const secondHalfAvg = values.slice(half).reduce((a, b) => a + b, 0) / (values.length - half);
    const changePercent = ((secondHalfAvg - firstHalfAvg) / Math.abs(firstHalfAvg || 1)) * 100;
    if (changePercent > 10) return 'increasing';
    if (changePercent < -10) return 'decreasing';
    return 'stable';
}

function detectOutliers(values: number[]): { count: number; threshold: number } {
    if (values.length < 5) return { count: 0, threshold: 0 };
    const { avg } = computeStats(values);
    const variance = values.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);
    const threshold = avg + 2 * stdDev;
    const outliers = values.filter(v => Math.abs(v - avg) > 2 * stdDev);
    return { count: outliers.length, threshold };
}

export function generateInsights(parsedData: ParsedData): InsightReport {
    const { data, columns, rowCount } = parsedData;
    const insights: DataInsight[] = [];

    const numericColumns = columns.filter(c => c.type === 'number').map(c => c.key);
    const categoricalColumns = columns.filter(c => c.isCategorical || c.type === 'string').map(c => c.key);
    const dateColumns = columns.filter(c => c.type === 'date').map(c => c.key);

    const keyStats: Record<string, { min: number; max: number; avg: number; median: number }> = {};

    // Determine a label column to associate with numeric highs/lows (e.g., "Month", "Category", etc.)
    const labelKey = dateColumns[0] || categoricalColumns[0] || (columns[0]?.key !== numericColumns[0] ? columns[0]?.key : undefined);

    // --- Numeric column insights ---
    for (const col of numericColumns) {
        // Parse values and keep track of their original row references
        const rowsWithValues = data.map((r, index) => {
            const rawVal = r[col];
            let numVal = NaN;
            if (typeof rawVal === 'number') {
                numVal = rawVal;
            } else if (typeof rawVal === 'string') {
                const cleanVal = rawVal.replace(/[$,\s]/g, '');
                numVal = cleanVal !== '' ? Number(cleanVal) : NaN;
            }
            return { val: numVal, row: r, index };
        }).filter(item => !isNaN(item.val));

        const values = rowsWithValues.map(item => item.val);
        if (values.length === 0) continue;

        const stats = computeStats(values);
        keyStats[col] = stats;

        // 1. Highest Value Insight
        const maxItem = rowsWithValues.reduce((max, item) => item.val > max.val ? item : max, rowsWithValues[0]);
        const maxLabel = labelKey ? String(maxItem.row[labelKey] ?? `Row ${maxItem.index + 1}`) : `Row ${maxItem.index + 1}`;
        insights.push({
            type: 'outlier',
            severity: 'success',
            title: `🏆 Highest ${col} Detected`,
            description: `The highest value for "${col}" is ${maxItem.val.toLocaleString()}, recorded at ${maxLabel}.`,
            icon: '🏆',
        });

        // 2. Lowest Value Insight
        const minItem = rowsWithValues.reduce((min, item) => item.val < min.val ? item : min, rowsWithValues[0]);
        const minLabel = labelKey ? String(minItem.row[labelKey] ?? `Row ${minItem.index + 1}`) : `Row ${minItem.index + 1}`;
        insights.push({
            type: 'outlier',
            severity: 'info',
            title: `📉 Lowest ${col} Detected`,
            description: `The lowest value for "${col}" is ${minItem.val.toLocaleString()}, recorded at ${minLabel}.`,
            icon: '📉',
        });

        // 3. Average Value Insight
        insights.push({
            type: 'summary',
            severity: 'info',
            title: `📐 Average of ${col}`,
            description: `The overall average of "${col}" is ${stats.avg.toLocaleString(undefined, { maximumFractionDigits: 2 })}, with a median value of ${stats.median.toLocaleString(undefined, { maximumFractionDigits: 2 })}.`,
            icon: '📐',
        });

        // 4. Growth Trends (comparing first and last entries)
        if (rowsWithValues.length >= 2) {
            const firstVal = rowsWithValues[0].val;
            const lastVal = rowsWithValues[rowsWithValues.length - 1].val;
            const diff = lastVal - firstVal;
            const growthPct = firstVal !== 0 ? (diff / Math.abs(firstVal)) * 100 : 0;
            const firstLabel = labelKey ? String(rowsWithValues[0].row[labelKey] ?? 'start') : 'start';
            const lastLabel = labelKey ? String(rowsWithValues[rowsWithValues.length - 1].row[labelKey] ?? 'end') : 'end';

            if (Math.abs(growthPct) > 1) {
                insights.push({
                    type: 'trend',
                    severity: growthPct > 0 ? 'success' : 'warning',
                    title: `${growthPct > 0 ? '📈' : '📉'} Growth Trend for ${col}`,
                    description: `"${col}" changed by ${growthPct > 0 ? '+' : ''}${growthPct.toFixed(1)}% from ${firstLabel} (${firstVal.toLocaleString()}) to ${lastLabel} (${lastVal.toLocaleString()}).`,
                    icon: growthPct > 0 ? '📈' : '📉',
                });
            }
        }

        // 5. Outliers (Anomalies)
        const { count: outlierCount, threshold } = detectOutliers(values);
        if (outlierCount > 0) {
            insights.push({
                type: 'outlier',
                severity: 'warning',
                title: `⚠️ Anomalies in ${col}`,
                description: `Detected ${outlierCount} anomalous data point(s) in "${col}" deviating significantly from the statistical mean.`,
                icon: '⚠️',
            });
        }
    }

    // --- Categorical column insights ---
    for (const col of categoricalColumns.slice(0, 2)) {
        const counts: Record<string, number> = {};
        data.forEach(row => {
            const v = String(row[col] ?? '');
            if (v && v.trim() !== '') counts[v] = (counts[v] || 0) + 1;
        });

        const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        if (entries.length === 0) continue;

        const [topCat, topCount] = entries[0];
        const topPct = ((topCount / rowCount) * 100).toFixed(1);

        insights.push({
            type: 'category',
            severity: 'success',
            title: `🏆 Top Category: ${topCat}`,
            description: `"${topCat}" is the most frequent value in "${col}", representing ${topPct}% of all entries (${topCount}/${rowCount}).`,
            icon: '🏆',
        });
    }

    // --- Overall dataset summary ---
    insights.unshift({
        type: 'summary',
        severity: 'info',
        title: `🗂️ Dataset Overview`,
        description: `Your dataset contains ${rowCount.toLocaleString()} rows and ${columns.length} columns — ${numericColumns.length} numeric, ${categoricalColumns.length} categorical${dateColumns.length > 0 ? `, and ${dateColumns.length} date` : ''} column${columns.length !== 1 ? 's' : ''}.`,
        icon: '🗂️',
    });

    const firstNumCol = numericColumns[0];
    const summaryText = firstNumCol && keyStats[firstNumCol]
        ? `Dataset with ${rowCount} rows. Key metric "${firstNumCol}" averages ${keyStats[firstNumCol].avg.toFixed(1)}, ranging from ${keyStats[firstNumCol].min.toFixed(1)} to ${keyStats[firstNumCol].max.toFixed(1)}.`
        : `Dataset with ${rowCount} rows and ${columns.length} columns loaded successfully.`;

    return {
        insights: insights.slice(0, 12), // Cap at 12 insights
        summary: summaryText,
        numericColumns,
        categoricalColumns,
        dateColumns,
        keyStats,
    };
}

export function getChartRecommendation(columns: ColumnInfo[]): 'line' | 'bar' | 'pie' | 'area' {
    const hasDate = columns.some(c => c.type === 'date');
    const hasNumeric = columns.some(c => c.type === 'number');
    const hasCategorical = columns.some(c => c.isCategorical);

    if (hasDate && hasNumeric) return 'line';
    if (hasCategorical && hasNumeric) return 'bar';
    if (hasCategorical && !hasNumeric) return 'pie';
    if (hasNumeric) return 'area';
    return 'bar';
}
