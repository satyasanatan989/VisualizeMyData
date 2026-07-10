import ExcelJS from 'exceljs';

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

/**
 * Robust CSV string parsing helper that handles quoted strings and comma separations correctly.
 */
export function parseCsvText(csvText: string): Record<string, any>[] {
    const lines = csvText.split(/\r?\n/);
    if (lines.length === 0) return [];

    const splitCsvLine = (line: string): string[] => {
        const result: string[] = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    };

    const headers = splitCsvLine(lines[0]).map(h => h.replace(/^["']|["']$/g, '').trim());
    const rawJson: Record<string, any>[] = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const cells = splitCsvLine(line);
        const rowData: Record<string, any> = {};
        headers.forEach((header, index) => {
            if (header) {
                let cellVal = cells[index] !== undefined ? cells[index].replace(/^["']|["']$/g, '').trim() : '';
                // Clean columns that start with __EMPTY
                if (header.startsWith('__EMPTY')) return;

                // Try to infer number
                if (cellVal !== '' && !isNaN(Number(cellVal))) {
                    rowData[header] = Number(cellVal);
                } else if (cellVal.toLowerCase() === 'true') {
                    rowData[header] = true;
                } else if (cellVal.toLowerCase() === 'false') {
                    rowData[header] = false;
                } else {
                    rowData[header] = cellVal;
                }
            }
        });
        if (Object.keys(rowData).length > 0) {
            rawJson.push(rowData);
        }
    }
    return rawJson;
}

/**
 * Clean cell values (e.g. from formula results or rich texts)
 */
function cleanCellValue(val: any): any {
    if (val === null || val === undefined) return '';
    if (typeof val === 'object') {
        if ('result' in val) {
            return val.result;
        } else if ('richText' in val) {
            return val.richText.map((t: any) => t.text).join('');
        } else if ('text' in val) {
            return val.text;
        }
    }
    return val;
}

export function parseExcelFile(file: File): Promise<ParsedData> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async (e) => {
            try {
                const buffer = e.target?.result;
                if (!buffer || !(buffer instanceof ArrayBuffer)) {
                    throw new Error("Could not read file data");
                }

                // If file is CSV, parse it textually
                if (file.name.endsWith('.csv')) {
                    const textDecoder = new TextDecoder('utf-8');
                    const text = textDecoder.decode(buffer);
                    const rawJson = parseCsvText(text);
                    const columns = analyzeColumns(rawJson);
                    resolve({
                        fileName: file.name,
                        data: rawJson,
                        columns,
                        rowCount: rawJson.length
                    });
                    return;
                }

                const workbook = new ExcelJS.Workbook();
                await workbook.xlsx.load(buffer);

                const worksheet = workbook.worksheets[0];
                if (!worksheet) {
                    throw new Error("Spreadsheet contains no sheets.");
                }

                const rawJson: Record<string, any>[] = [];
                const headers: string[] = [];

                // Load headers
                const headerRow = worksheet.getRow(1);
                headerRow.eachCell((cell, colNumber) => {
                    const headerVal = cleanCellValue(cell.value);
                    headers[colNumber] = headerVal ? String(headerVal) : `Column_${colNumber}`;
                });

                worksheet.eachRow((row, rowNumber) => {
                    if (rowNumber === 1) return; // Skip headers
                    const rowData: Record<string, any> = {};
                    row.eachCell((cell, colNumber) => {
                        const header = headers[colNumber] || `Column_${colNumber}`;
                        if (header.startsWith('__EMPTY')) return;

                        let val = cleanCellValue(cell.value);
                        rowData[header] = val;
                    });
                    if (Object.keys(rowData).length > 0) {
                        rawJson.push(rowData);
                    }
                });

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
    const rawJson = parseCsvText(csvText);

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
