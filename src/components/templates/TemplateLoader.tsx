'use client';

import { ParsedData, ColumnInfo } from '@/lib/excelParser';

/**
 * Converts a simple 2-column CSV string (header + rows) into a ParsedData object
 * compatible with the existing DashboardGenerator and chart system.
 * No file I/O needed — works purely from an in-memory CSV string.
 */
export function csvStringToParsedData(csvContent: string, fileName: string): ParsedData {
    const lines = csvContent.trim().split('\n').filter(l => l.trim());
    if (lines.length < 2) throw new Error('Template CSV must have a header row and at least one data row.');

    const headers = lines[0].split(',').map(h => h.trim());

    const rows: Record<string, string | number>[] = lines.slice(1).map(line => {
        const vals = line.split(',').map(v => v.trim());
        const row: Record<string, string | number> = {};
        headers.forEach((h, i) => {
            const raw = vals[i] ?? '';
            const num = Number(raw);
            row[h] = isNaN(num) || raw === '' ? raw : num;
        });
        return row;
    });

    const columns: ColumnInfo[] = headers.map(h => {
        const values = rows.map(r => r[h]);
        const numericVals = values.map(v => Number(v)).filter(v => !isNaN(v));
        const isNumeric = numericVals.length === values.length && values.length > 0;
        const uniqueCount = new Set(values.map(String)).size;

        return {
            key: h,
            type: isNumeric ? 'number' : 'string',
            isCategorical: !isNumeric && uniqueCount <= 20,
            uniqueValues: uniqueCount,
            ...(isNumeric ? { min: Math.min(...numericVals), max: Math.max(...numericVals) } : {}),
        } satisfies ColumnInfo;
    });

    return {
        data: rows,
        columns,
        rowCount: rows.length,
        fileName,
    } satisfies ParsedData;
}
