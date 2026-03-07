declare module 'xlsx-populate' {
    export interface Cell {
        value(val: any): Cell;
        value(): any;
    }

    export interface Range {
        clear(): Range;
    }

    export interface Sheet {
        cell(row: number, col: number): Cell;
        usedRange(): Range | undefined;
    }

    export interface Workbook {
        sheet(name: string): Sheet | undefined;
        outputAsync(options?: any): Promise<any>;
    }

    const XlsxPopulate: {
        fromDataAsync(data: ArrayBuffer | Uint8Array): Promise<Workbook>;
    };

    export default XlsxPopulate;
}
