'use client';

import React, { useMemo } from 'react';
import { ParsedData, ColumnInfo } from '@/lib/excelParser';

interface FilterState {
    categoryFilter: string;
    dateFrom: string;
    dateTo: string;
    numericMin: string;
    numericMax: string;
    selectedChartType: 'area' | 'bar' | 'line' | 'pie';
}

interface DashboardFiltersProps {
    parsedData: ParsedData;
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
}

export type { FilterState };

export default function DashboardFilters({ parsedData, filters, onFilterChange }: DashboardFiltersProps) {
    const { columns, data } = parsedData;
    const categoricalCols = columns.filter(c => c.isCategorical || c.type === 'string');
    const dateCols = columns.filter(c => c.type === 'date');
    const numericCols = columns.filter(c => c.type === 'number');
    const firstCatCol = categoricalCols[0];

    const categoryOptions = useMemo(() => {
        if (!firstCatCol) return [];
        const vals = new Set<string>();
        data.forEach(r => {
            const v = String(r[firstCatCol.key] ?? '');
            if (v) vals.add(v);
        });
        return Array.from(vals).sort().slice(0, 50);
    }, [data, firstCatCol]);

    const update = (partial: Partial<FilterState>) =>
        onFilterChange({ ...filters, ...partial });

    const inputStyle: React.CSSProperties = {
        padding: '8px 12px',
        borderRadius: 8,
        border: '1px solid var(--border-subtle)',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        fontSize: '0.8rem',
        outline: 'none',
        width: '100%',
    };

    const chartTypes = [
        { type: 'area', label: '〰 Area' },
        { type: 'bar', label: '▊ Bar' },
        { type: 'line', label: '📈 Line' },
        { type: 'pie', label: '🥧 Pie' },
    ] as const;

    return (
        <div style={{
            padding: '16px 20px',
            borderRadius: 14,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            marginBottom: 16,
        }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 14px' }}>
                🎛️ Interactive Filters
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>

                {/* Chart type */}
                <div>
                    <label style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>Chart Type</label>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {chartTypes.map(ct => (
                            <button key={ct.type} onClick={() => update({ selectedChartType: ct.type })} style={{
                                padding: '5px 10px', borderRadius: 6, border: '1px solid var(--border-subtle)',
                                fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer',
                                background: filters.selectedChartType === ct.type ? 'rgba(59,130,246,0.2)' : 'transparent',
                                color: filters.selectedChartType === ct.type ? '#60a5fa' : 'var(--text-secondary)',
                            }}>
                                {ct.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category filter */}
                {firstCatCol && categoryOptions.length > 0 && (
                    <div>
                        <label style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>
                            {firstCatCol.key} Filter
                        </label>
                        <select value={filters.categoryFilter} onChange={e => update({ categoryFilter: e.target.value })} style={inputStyle}>
                            <option value="">All</option>
                            {categoryOptions.map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                    </div>
                )}

                {/* Date range */}
                {dateCols.length > 0 && (
                    <>
                        <div>
                            <label style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>Date From</label>
                            <input type="date" value={filters.dateFrom} onChange={e => update({ dateFrom: e.target.value })} style={inputStyle} />
                        </div>
                        <div>
                            <label style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>Date To</label>
                            <input type="date" value={filters.dateTo} onChange={e => update({ dateTo: e.target.value })} style={inputStyle} />
                        </div>
                    </>
                )}

                {/* Numeric range */}
                {numericCols.length > 0 && (
                    <>
                        <div>
                            <label style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>
                                {numericCols[0].key} Min
                            </label>
                            <input type="number" placeholder={String(numericCols[0].min ?? '')} value={filters.numericMin}
                                onChange={e => update({ numericMin: e.target.value })} style={inputStyle} />
                        </div>
                        <div>
                            <label style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>
                                {numericCols[0].key} Max
                            </label>
                            <input type="number" placeholder={String(numericCols[0].max ?? '')} value={filters.numericMax}
                                onChange={e => update({ numericMax: e.target.value })} style={inputStyle} />
                        </div>
                    </>
                )}

                {/* Reset */}
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button onClick={() => onFilterChange({
                        categoryFilter: '', dateFrom: '', dateTo: '',
                        numericMin: '', numericMax: '', selectedChartType: 'bar',
                    })} style={{
                        padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)',
                        background: 'transparent', color: 'var(--text-secondary)', fontSize: '0.78rem',
                        fontWeight: 600, cursor: 'pointer', width: '100%',
                    }}>
                        ↺ Reset Filters
                    </button>
                </div>
            </div>
        </div>
    );
}
