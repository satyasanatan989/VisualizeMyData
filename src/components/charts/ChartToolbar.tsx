'use client';

import React from 'react';
import { Plus, Download, FileText, Table } from 'lucide-react';
import { ParsedData } from '@/lib/excelParser';
import * as xlsx from 'xlsx';

interface ChartToolbarProps {
    onAddNewRequest: () => void;
    isAdding: boolean;
    canExport: boolean;
    parsedData: ParsedData;
}

export default function ChartToolbar({ onAddNewRequest, isAdding, canExport, parsedData }: ChartToolbarProps) {

    const handleExportXLSX = () => {
        const ws = xlsx.utils.json_to_sheet(parsedData.data);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, "Data");
        xlsx.writeFile(wb, `${parsedData.fileName.replace(/\.[^/.]+$/, "")}_Export.xlsx`);
    };

    const handleExportCSV = () => {
        const ws = xlsx.utils.json_to_sheet(parsedData.data);
        const csvStr = xlsx.utils.sheet_to_csv(ws);
        const blob = new Blob([csvStr], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${parsedData.fileName.replace(/\.[^/.]+$/, "")}_Export.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 24px',
            background: 'var(--bg-card)',
            borderRadius: 16,
            border: '1px solid var(--border-subtle)',
            marginBottom: 32,
            boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
            <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px' }}>
                    Multi-Chart Dashboard
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                    {parsedData.fileName} • {parsedData.rowCount} rows processed
                </p>
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                {/* Export Data Group */}
                {canExport && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingRight: 16, borderRight: '1px solid var(--border-subtle)' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Export Data:</span>
                        <button onClick={handleExportXLSX} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                            <Table size={14} /> XLSX
                        </button>
                        <button onClick={handleExportCSV} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                            <FileText size={14} /> CSV
                        </button>
                    </div>
                )}

                <button
                    onClick={onAddNewRequest}
                    disabled={isAdding}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '10px 20px', borderRadius: 8,
                        background: 'var(--text-primary)', color: 'var(--bg-primary)',
                        border: 'none', fontSize: '0.9rem', fontWeight: 700,
                        cursor: isAdding ? 'not-allowed' : 'pointer',
                        opacity: isAdding ? 0.6 : 1
                    }}
                >
                    <Plus size={18} />
                    Add New Chart
                </button>
            </div>
        </div>
    );
}
