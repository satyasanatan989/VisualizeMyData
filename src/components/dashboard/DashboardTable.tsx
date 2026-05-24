'use client';

import React, { useState, useMemo } from 'react';
import { ParsedData } from '@/lib/excelParser';
import { ArrowUp, ArrowDown, Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import * as xlsx from 'xlsx';
import { toast } from 'sonner';

interface DashboardTableProps {
    parsedData: ParsedData;
    maxRows?: number;
}

export default function DashboardTable({ parsedData, maxRows }: DashboardTableProps) {
    const { columns, data, fileName } = parsedData;

    // Table States
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(maxRows ?? 10);

    // 1. Filter data based on search query across all columns
    const filteredData = useMemo(() => {
        if (!searchQuery) return data;
        const query = searchQuery.toLowerCase().trim();
        return data.filter(row => {
            return Object.values(row).some(val => 
                String(val ?? '').toLowerCase().includes(query)
            );
        });
    }, [data, searchQuery]);

    // 2. Sort data
    const sortedData = useMemo(() => {
        if (!sortConfig) return filteredData;

        const sorted = [...filteredData].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];

            if (aVal === undefined || aVal === null) return 1;
            if (bVal === undefined || bVal === null) return -1;

            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
            }

            const aStr = String(aVal).toLowerCase();
            const bStr = String(bVal).toLowerCase();
            if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [filteredData, sortConfig]);

    // 3. Paginate data
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return sortedData.slice(start, start + rowsPerPage);
    }, [sortedData, currentPage, rowsPerPage]);

    const totalPages = Math.ceil(sortedData.length / rowsPerPage);

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        setCurrentPage(1);
    };

    const handleDownload = (format: 'csv' | 'xlsx') => {
        if (sortedData.length === 0) {
            toast.error("No data available to export.");
            return;
        }

        const ws = xlsx.utils.json_to_sheet(sortedData);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, 'FilteredData');
        
        const baseName = fileName.replace(/\.[^.]+$/, '') + '_exported';
        if (format === 'csv') {
            xlsx.writeFile(wb, `${baseName}.csv`, { bookType: 'csv' });
        } else {
            xlsx.writeFile(wb, `${baseName}.xlsx`, { bookType: 'xlsx' });
        }
        toast.success(`Exported ${sortedData.length} rows as ${format.toUpperCase()}`);
    };

    const inputStyle: React.CSSProperties = {
        padding: '6px 12px 6px 32px',
        borderRadius: 8,
        border: '1px solid var(--border-subtle)',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        fontSize: '0.8rem',
        outline: 'none',
        width: '100%',
        maxWidth: 240,
    };

    return (
        <div style={{
            borderRadius: 20,
            border: '1px solid var(--border-subtle)',
            background: 'rgba(23, 26, 30, 0.4)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            overflow: 'hidden',
        }}>
            {/* Table controls header */}
            <div style={{
                padding: '14px 20px',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <h3 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 800, margin: 0 }}>
                        📋 Interactive Data Table
                    </h3>
                    <span style={{
                        padding: '2px 8px', background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--border-subtle)', borderRadius: 6,
                        fontSize: '0.68rem', color: 'var(--text-muted)'
                    }}>
                        {filteredData.length.toLocaleString()} of {data.length.toLocaleString()} rows
                    </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                    {/* Search */}
                    <div style={{ position: 'relative', minWidth: 160 }}>
                        <input 
                            value={searchQuery}
                            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            placeholder="Filter table rows..."
                            style={inputStyle}
                        />
                        <Search size={12} color="var(--text-muted)" style={{ position: 'absolute', left: 10, top: '53%', transform: 'translateY(-50%)' }} />
                    </div>

                    {/* Rows per page selector */}
                    <select 
                        value={rowsPerPage} 
                        onChange={e => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                        style={{
                            padding: '6px 10px', background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-subtle)', borderRadius: 8, color: 'var(--text-secondary)',
                            fontSize: '0.75rem', cursor: 'pointer', outline: 'none',
                        }}
                    >
                        <option value={10}>10 rows</option>
                        <option value={25}>25 rows</option>
                        <option value={50}>50 rows</option>
                        <option value={100}>100 rows</option>
                    </select>

                    {/* Exports */}
                    <button 
                        onClick={() => handleDownload('csv')} 
                        style={{
                            display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px',
                            borderRadius: 8, fontSize: '0.75rem', fontWeight: 600, border: '1px solid var(--border-subtle)',
                            background: 'var(--bg-glass)', color: 'var(--text-secondary)', cursor: 'pointer',
                        }}
                    >
                        <Download size={12} /> CSV
                    </button>
                    <button 
                        onClick={() => handleDownload('xlsx')} 
                        style={{
                            display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px',
                            borderRadius: 8, fontSize: '0.75rem', fontWeight: 600, border: '1px solid var(--border-subtle)',
                            background: 'var(--bg-glass)', color: 'var(--text-secondary)', cursor: 'pointer',
                        }}
                    >
                        <Download size={12} /> XLSX
                    </button>
                </div>
            </div>

            {/* Table wrapper */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                    <thead>
                        <tr style={{ background: 'var(--bg-secondary)' }}>
                            {columns.map(col => {
                                const isSorted = sortConfig?.key === col.key;
                                return (
                                    <th 
                                        key={col.key} 
                                        onClick={() => handleSort(col.key)}
                                        style={{
                                            padding: '12px 14px',
                                            textAlign: 'left',
                                            whiteSpace: 'nowrap',
                                            color: isSorted ? '#ba9eff' : 'var(--text-secondary)',
                                            fontWeight: 700,
                                            fontSize: '0.72rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            borderBottom: '1px solid var(--border-subtle)',
                                            cursor: 'pointer',
                                            userSelect: 'none',
                                            transition: 'background 0.2s',
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            {col.key}
                                            {isSorted ? (
                                                sortConfig.direction === 'asc' ? <ArrowUp size={11} /> : <ArrowDown size={11} />
                                            ) : (
                                                <span style={{ opacity: 0.15 }}>⇅</span>
                                            )}
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row, i) => (
                            <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                                {columns.map(col => (
                                    <td key={col.key} style={{
                                        padding: '9px 14px',
                                        color: col.type === 'number' ? '#60a5fa' : 'var(--text-secondary)',
                                        borderBottom: '1px solid rgba(255,255,255,0.03)',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {row[col.key] !== undefined && row[col.key] !== null ? String(row[col.key]) : '–'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {paginatedData.length === 0 && (
                            <tr>
                                <td colSpan={columns.length} style={{ padding: '36px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No records match your search filter.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 20px',
                    borderTop: '1px solid var(--border-subtle)',
                    background: 'rgba(0,0,0,0.15)',
                }}>
                    <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 4, padding: '5px 12px',
                            borderRadius: 6, fontSize: '0.75rem', fontWeight: 600, border: '1px solid var(--border-subtle)',
                            background: 'rgba(255,255,255,0.03)', color: 'var(--text-secondary)', cursor: 'pointer',
                            opacity: currentPage === 1 ? 0.4 : 1, transition: 'all 0.2s',
                        }}
                    >
                        <ChevronLeft size={12} /> Previous
                    </button>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 4, padding: '5px 12px',
                            borderRadius: 6, fontSize: '0.75rem', fontWeight: 600, border: '1px solid var(--border-subtle)',
                            background: 'rgba(255,255,255,0.03)', color: 'var(--text-secondary)', cursor: 'pointer',
                            opacity: currentPage === totalPages ? 0.4 : 1, transition: 'all 0.2s',
                        }}
                    >
                        Next <ChevronRight size={12} />
                    </button>
                </div>
            )}
        </div>
    );
}
