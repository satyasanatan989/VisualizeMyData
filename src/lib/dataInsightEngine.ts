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

    // --- Numeric column insights ---
    for (const col of numericColumns) {
        const values = data.map(r => Number(r[col])).filter(n => !isNaN(n));
        if (values.length === 0) continue;

        const stats = computeStats(values);
        keyStats[col] = stats;

        // Trend detection
        const trend = detectTrend(values);
        if (trend === 'increasing') {
            insights.push({
                type: 'trend',
                severity: 'success',
                title: `📈 ${col} is trending upward`,
                description: `"${col}" shows an increasing trend over the dataset — values rose from ~${stats.min.toFixed(1)} to ~${stats.max.toFixed(1)}.`,
                icon: '📈',
            });
        } else if (trend === 'decreasing') {
            insights.push({
                type: 'trend',
                severity: 'warning',
                title: `📉 ${col} is declining`,
                description: `"${col}" shows a declining trend across the dataset. The average is ${stats.avg.toFixed(2)}.`,
                icon: '📉',
            });
        }

        // Distribution insight
        const range = stats.max - stats.min;
        insights.push({
            type: 'distribution',
            severity: 'info',
            title: `📊 Distribution of ${col}`,
            description: `Most values in "${col}" cluster between ${stats.min.toFixed(1)} and ${stats.max.toFixed(1)}, with a median of ${stats.median.toFixed(1)} and an average of ${stats.avg.toFixed(1)}.`,
            icon: '📊',
        });

        // Outlier detection
        const { count: outlierCount } = detectOutliers(values);
        if (outlierCount > 0) {
            insights.push({
                type: 'outlier',
                severity: 'warning',
                title: `⚠️ Outliers detected in ${col}`,
                description: `Found ${outlierCount} outlier${outlierCount > 1 ? 's' : ''} in "${col}" that deviate significantly from the average of ${stats.avg.toFixed(2)}.`,
                icon: '⚠️',
            });
        }

        // High variance insight
        const coeffOfVariation = range / (stats.avg || 1);
        if (coeffOfVariation > 1) {
            insights.push({
                type: 'summary',
                severity: 'info',
                title: `📐 High variability in ${col}`,
                description: `"${col}" has high variability (range of ${range.toFixed(1)}), suggesting diverse data points or multiple segments.`,
                icon: '📐',
            });
        }
    }

    // --- Categorical column insights ---
    for (const col of categoricalColumns.slice(0, 3)) {
        const counts: Record<string, number> = {};
        data.forEach(row => {
            const v = String(row[col] ?? '');
            if (v) counts[v] = (counts[v] || 0) + 1;
        });

        const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        if (entries.length === 0) continue;

        const [topCat, topCount] = entries[0];
        const topPct = ((topCount / rowCount) * 100).toFixed(1);

        insights.push({
            type: 'category',
            severity: 'success',
            title: `🏆 Top category in ${col}`,
            description: `"${topCat}" is the dominant category in "${col}", accounting for ${topPct}% of all records (${topCount} out of ${rowCount}).`,
            icon: '🏆',
        });

        if (entries.length > 1) {
            const [secondCat, secondCount] = entries[1];
            const ratio = (topCount / (secondCount || 1)).toFixed(1);
            insights.push({
                type: 'category',
                severity: 'info',
                title: `📋 ${col} has ${entries.length} unique values`,
                description: `"${col}" contains ${entries.length} categories. "${topCat}" leads with ${topCount} entries, ${ratio}× more than "${secondCat}" (${secondCount}).`,
                icon: '📋',
            });
        }
    }

    // --- Date column insights ---
    if (dateColumns.length > 0) {
        const dateCol = dateColumns[0];
        const dates = data.map(r => new Date(r[dateCol])).filter(d => !isNaN(d.getTime())).sort((a, b) => a.getTime() - b.getTime());
        if (dates.length > 1) {
            const earliest = dates[0].toLocaleDateString();
            const latest = dates[dates.length - 1].toLocaleDateString();
            insights.push({
                type: 'summary',
                severity: 'info',
                title: `📅 Date range detected`,
                description: `The dataset spans from ${earliest} to ${latest} in the "${dateCol}" column, covering ${dates.length} time-stamped records.`,
                icon: '📅',
            });
        }
    }

    // --- Overall dataset summary ---
    insights.unshift({
        type: 'summary',
        severity: 'info',
        title: `🗂️ Dataset Overview`,
        description: `Your dataset contains ${rowCount.toLocaleString()} rows and ${columns.length} columns — ${numericColumns.length} numeric, ${categoricalColumns.length} categorical${dateColumns.length > 0 ? `, and ${dateColumns.length} date` : ''} column${columns.length !== 1 ? 's' : ''}.`,
        icon: '🗂️',
    });

    const summaryText = numericColumns.length > 0
        ? `Dataset with ${rowCount} rows. Key metric "${numericColumns[0]}" ranges from ${keyStats[numericColumns[0]]?.min?.toFixed(1) ?? 'N/A'} to ${keyStats[numericColumns[0]]?.max?.toFixed(1) ?? 'N/A'}.`
        : `Dataset with ${rowCount} rows and ${columns.length} columns detected.`;

    return {
        insights: insights.slice(0, 10), // Cap at 10 insights
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
