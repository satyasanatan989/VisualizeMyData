import * as xlsx from 'xlsx';

export type DataType = 'string' | 'number' | 'date' | 'boolean';

export interface ColumnInfo {
    key: string;
    type: DataType;
    uniqueValues: number;
    isCategorical: boolean;
    min?: number;
    max?: number;
}

export interface ParsedData {
    fileName: string;
    data: Record<string, any>[];
    columns: ColumnInfo[];
    rowCount: number;
}

export function parseExcelFile(file: File): Promise<ParsedData> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                if (!data) throw new Error("Could not read file data");

                const workbook = xlsx.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];

                const rawJson = xlsx.utils.sheet_to_json<Record<string, any>>(worksheet);

                if (rawJson.length === 0) {
                    throw new Error("Spreadsheet is empty or invalid format.");
                }

                const columns = analyzeColumns(rawJson);

                resolve({
                    fileName: file.name,
                    data: rawJson,
                    columns,
                    rowCount: rawJson.length
                });
            } catch (err) {
                reject(err);
            }
        };

        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
}

/**
 * Fetch a Google Sheets spreadsheet via its public CSV export URL.
 * Accepts both a Sheet URL and a direct CSV export URL.
 */
export async function parseGoogleSheet(url: string): Promise<ParsedData> {
    let csvUrl = url;

    // Convert a standard Google Sheets URL to its CSV export endpoint
    const sheetsMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    const gidMatch = url.match(/[?&]gid=(\d+)/);

    if (sheetsMatch) {
        const spreadsheetId = sheetsMatch[1];
        const gid = gidMatch ? gidMatch[1] : '0';
        csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`;
    }

    const response = await fetch(csvUrl);
    if (!response.ok) {
        throw new Error(
            'Could not fetch Google Sheet. Make sure the sheet is set to "Anyone with the link can view".'
        );
    }

    const csvText = await response.text();
    const workbook = xlsx.read(csvText, { type: 'string' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawJson = xlsx.utils.sheet_to_json<Record<string, any>>(worksheet);

    if (rawJson.length === 0) throw new Error("Google Sheet appears to be empty.");

    const columns = analyzeColumns(rawJson);

    return {
        fileName: 'Google Sheet',
        data: rawJson,
        columns,
        rowCount: rawJson.length,
    };
}

/** Exported for use in pdfParser.ts */
export function analyzeColumnsFromData(data: Record<string, any>[]): ColumnInfo[] {
    return analyzeColumns(data);
}

function analyzeColumns(data: Record<string, any>[]): ColumnInfo[] {
    if (data.length === 0) return [];

    const sampleSize = Math.min(100, data.length);
    const sampleData = data.slice(0, sampleSize);

    const keys = new Set<string>();
    sampleData.forEach(row => {
        Object.keys(row).forEach(k => keys.add(k));
    });

    const columns: ColumnInfo[] = [];

    keys.forEach(key => {
        const typeDataCount = { string: 0, number: 0, boolean: 0, date: 0 };
        const uniqueVals = new Set<any>();

        sampleData.forEach(row => {
            const val = row[key];
            if (val !== undefined && val !== null && val !== "") {
                uniqueVals.add(val);
                if (typeof val === 'number') {
                    typeDataCount.number++;
                } else if (typeof val === 'boolean') {
                    typeDataCount.boolean++;
                } else if (val instanceof Date) {
                    typeDataCount.date++;
                } else if (typeof val === 'string') {
                    const cleanStr = val.replace(/[$,\s]/g, '');
                    if (cleanStr !== '' && !isNaN(Number(cleanStr))) {
                        typeDataCount.number++;
                    } else if (!isNaN(Date.parse(val))) {
                        typeDataCount.date++;
                    } else {
                        typeDataCount.string++;
                    }
                } else {
                    typeDataCount.string++;
                }
            }
        });

        let inferredType = 'string' as DataType;
        let maxCount = 0;
        const entries = Object.entries(typeDataCount) as [DataType, number][];
        entries.forEach(([type, count]) => {
            if (count > maxCount) {
                maxCount = count;
                inferredType = type;
            }
        });

        const isCategorical = uniqueVals.size > 0 && uniqueVals.size <= Math.min(20, data.length * 0.1);

        let min, max;
        if (inferredType === 'number') {
            const numbers = data.map(r => {
                const rawVal = r[key];
                if (typeof rawVal === 'number') return rawVal;
                if (typeof rawVal === 'string') {
                    const cleanVal = rawVal.replace(/[$,\s]/g, '');
                    return cleanVal !== '' ? Number(cleanVal) : NaN;
                }
                return NaN;
            }).filter(n => !isNaN(n));

            if (numbers.length > 0) {
                min = Math.min(...numbers);
                max = Math.max(...numbers);
            }
        }

        columns.push({
            key,
            type: inferredType,
            uniqueValues: uniqueVals.size,
            isCategorical,
            min,
            max
        });
    });

    return columns;
}
