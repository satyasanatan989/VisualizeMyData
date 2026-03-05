'use client';

import React, { useMemo } from 'react';
import { ParsedData } from '@/lib/excelParser';

interface DashboardTableProps {
    parsedData: ParsedData;
    maxRows?: number;
}

export default function DashboardTable({ parsedData, maxRows = 20 }: DashboardTableProps) {
    const { columns, data } = parsedData;
    const displayData = useMemo(() => data.slice(0, maxRows), [data, maxRows]);

    return (
        <div style={{
            borderRadius: 16,
            border: '1px solid var(--border-subtle)',
            overflow: 'hidden',
        }}>
            <div style={{
                padding: '14px 18px',
                background: 'var(--bg-card)',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>
                    📋 Data Table
                </h3>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    Showing first {Math.min(maxRows, data.length)} of {data.length.toLocaleString()} rows
                </span>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                        <tr>
                            {columns.map(col => (
                                <th key={col.key} style={{
                                    padding: '10px 14px',
                                    textAlign: 'left',
                                    whiteSpace: 'nowrap',
                                    background: 'var(--bg-secondary)',
                                    color: 'var(--text-secondary)',
                                    fontWeight: 700,
                                    fontSize: '0.72rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    borderBottom: '1px solid var(--border-subtle)',
                                }}>
                                    {col.key}
                                    <span style={{ marginLeft: 4, opacity: 0.45, fontSize: '0.6rem' }}>{col.type}</span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {displayData.map((row, i) => (
                            <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                                {columns.map(col => (
                                    <td key={col.key} style={{
                                        padding: '9px 14px',
                                        color: col.type === 'number' ? '#60a5fa' : 'var(--text-secondary)',
                                        borderBottom: '1px solid rgba(255,255,255,0.03)',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {row[col.key] !== undefined ? String(row[col.key]) : '–'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
