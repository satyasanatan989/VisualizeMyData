/**
 * PDF Parser – uses pdfjs-dist (client-side only, dynamically imported)
 * Extracts text from PDF, detects tables via heuristics, and returns ParsedData
 */

import type { ParsedData } from './excelParser';

export interface PdfParseResult extends ParsedData {
    hasTables: boolean;
    pageCount: number;
}

/**
 * Main entry point – call from client components only
 */
export async function parsePdfFile(file: File): Promise<PdfParseResult> {
    // Dynamic import to prevent SSR issues
    const pdfjsLib = await import('pdfjs-dist');

    // Set worker src
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const pageCount = pdfDoc.numPages;

    const allRows: string[][] = [];

    for (let i = 1; i <= pageCount; i++) {
        const page = await pdfDoc.getPage(i);
        const textContent = await page.getTextContent();

        // Group text items by their Y position (row grouping heuristic)
        const lineMap: Map<number, { text: string; x: number }[]> = new Map();

        for (const item of textContent.items as any[]) {
            if (!item.str?.trim()) continue;
            const y = Math.round(item.transform[5]); // y coordinate
            const x = Math.round(item.transform[4]); // x coordinate

            if (!lineMap.has(y)) lineMap.set(y, []);
            lineMap.get(y)!.push({ text: item.str.trim(), x });
        }

        // Sort lines top-to-bottom (PDF y-axis is inverted)
        const sortedYKeys = Array.from(lineMap.keys()).sort((a, b) => b - a);

        for (const y of sortedYKeys) {
            const cells = lineMap.get(y)!
                .sort((a, b) => a.x - b.x)
                .map(c => c.text);
            if (cells.length > 0) allRows.push(cells);
        }
    }

    // Detect if it looks like tabular data (most rows have similar column counts)
    const hasTables = detectTableStructure(allRows);

    if (!hasTables || allRows.length < 2) {
        return {
            fileName: file.name,
            data: [],
            columns: [],
            rowCount: 0,
            hasTables: false,
            pageCount,
        };
    }

    // Use first row as headers
    const headers = allRows[0];
    const dataRows = allRows.slice(1);

    const data: Record<string, any>[] = dataRows.map(row => {
        const obj: Record<string, any> = {};
        headers.forEach((header, idx) => {
            const raw = row[idx] ?? '';
            const num = Number(raw.replace(/,/g, ''));
            obj[header] = isNaN(num) || raw === '' ? raw : num;
        });
        return obj;
    });

    // Analyze columns
    const { analyzeColumnsFromData } = await import('./excelParser');
    const columns = analyzeColumnsFromData(data);

    return {
        fileName: file.name,
        data,
        columns,
        rowCount: data.length,
        hasTables: true,
        pageCount,
    };
}

function detectTableStructure(rows: string[][]): boolean {
    if (rows.length < 3) return false;

    // Check if most rows have the same number of columns (table heuristic)
    const colCounts = rows.map(r => r.length);
    const dominant = mode(colCounts);
    const matchRatio = colCounts.filter(c => c === dominant).length / colCounts.length;

    // At least 60% rows should share the same column count, and > 1 column
    return matchRatio >= 0.6 && dominant > 1;
}

function mode(arr: number[]): number {
    const freq: Record<number, number> = {};
    let maxFreq = 0;
    let modeVal = arr[0];
    for (const val of arr) {
        freq[val] = (freq[val] || 0) + 1;
        if (freq[val] > maxFreq) {
            maxFreq = freq[val];
            modeVal = val;
        }
    }
    return modeVal;
}
