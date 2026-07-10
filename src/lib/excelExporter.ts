import ExcelJS from 'exceljs';

export async function exportToXLSX(data: Record<string, any>[], fileName: string, sheetName: string = 'Data') {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    if (data.length > 0) {
        // Collect all keys/headers from the data records
        const allKeys = new Set<string>();
        data.forEach(row => Object.keys(row).forEach(k => allKeys.add(k)));
        const headers = Array.from(allKeys).filter(h => !h.startsWith('__EMPTY'));

        worksheet.getRow(1).values = headers;
        
        data.forEach((row, index) => {
            const values = headers.map(h => row[h] ?? null);
            worksheet.getRow(index + 2).values = values;
        });
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    const cleanFileName = fileName.replace(/\.[^/.]+$/, "");
    a.download = `${cleanFileName}_Export.xlsx`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

export function exportToCSV(data: Record<string, any>[], fileName: string) {
    if (data.length === 0) return;
    
    const allKeys = new Set<string>();
    data.forEach(row => Object.keys(row).forEach(k => allKeys.add(k)));
    const headers = Array.from(allKeys).filter(h => !h.startsWith('__EMPTY'));

    const escapeCsvCell = (val: any) => {
        if (val === null || val === undefined) return '';
        const str = String(val);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
    };

    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(h => escapeCsvCell(row[h])).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    const cleanFileName = fileName.replace(/\.[^/.]+$/, "");
    a.download = `${cleanFileName}_Export.csv`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}
