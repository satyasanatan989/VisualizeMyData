'use client';

import React from 'react';
import { Plus, Download, FileText, Table } from 'lucide-react';
import { ParsedData } from '@/lib/excelParser';
import { exportToXLSX, exportToCSV } from '@/lib/excelExporter';
import { exportNativeExcelDashboard } from '@/lib/nativeExcelExport';

interface ChartToolbarProps {
    onAddNewRequest: () => void;
    isAdding: boolean;
    canExport: boolean;
    parsedData: ParsedData;
}

export default function ChartToolbar({ onAddNewRequest, isAdding, canExport, parsedData }: ChartToolbarProps) {

    const handleExportXLSX = async () => {
        await exportToXLSX(parsedData.data, parsedData.fileName);
    };

    const handleExportCSV = () => {
        exportToCSV(parsedData.data, parsedData.fileName);
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
                        <button onClick={handleExportXLSX} title="Export Raw Data to XLSX" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                            <Table size={14} /> XLSX
                        </button>
                        <button onClick={handleExportCSV} title="Export Raw Data to CSV" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                            <FileText size={14} /> CSV
                        </button>
                        <button 
                            onClick={() => exportNativeExcelDashboard(parsedData)} 
                            title="Export to an editable Native Excel Dashboard"
                            style={{ 
                                display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', 
                                borderRadius: 8, border: '1px solid rgba(16,185,129,0.3)', 
                                background: 'rgba(16,185,129,0.1)', color: '#34d399', 
                                fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' 
                            }}
                        >
                            <Download size={14} /> Dashboard (Native)
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
