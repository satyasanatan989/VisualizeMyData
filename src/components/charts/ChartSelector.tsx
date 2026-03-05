'use client';

import React, { useState } from 'react';
import { ColumnInfo } from '@/lib/excelParser';
import { ChartType, ChartConfig } from './types';

interface ChartSelectorProps {
    columns: ColumnInfo[];
    onAddChart: (config: ChartConfig) => void;
    onCancel: () => void;
}

const AVAILABLE_CHARTS: { type: ChartType; label: string; group: string }[] = [
    { type: 'bar', label: 'Bar Chart', group: 'Basic' },
    { type: 'line', label: 'Line Chart', group: 'Basic' },
    { type: 'pie', label: 'Pie Chart', group: 'Basic' },
    { type: 'area', label: 'Area Chart', group: 'Basic' },
    { type: 'scatter', label: 'Scatter Plot', group: 'Advanced' },
    { type: 'bubble', label: 'Bubble Chart', group: 'Advanced' },
    { type: 'radar', label: 'Radar Chart', group: 'Advanced' },
    { type: 'histogram', label: 'Histogram (Distribution)', group: 'Statistical' },
    { type: 'grouped_bar', label: 'Grouped Bar Chart', group: 'Comparison' },
    { type: 'stacked_bar', label: 'Stacked Bar Chart', group: 'Comparison' },
];

export default function ChartSelector({ columns, onAddChart, onCancel }: ChartSelectorProps) {
    const [type, setType] = useState<ChartType>('bar');
    const [title, setTitle] = useState('');

    // Basic Axes
    const [xAxisKey, setXAxisKey] = useState<string>(columns[0]?.key || '');
    const [yAxisKeys, setYAxisKeys] = useState<string[]>([]);

    // Advanced Axes
    const [zAxisKey, setZAxisKey] = useState<string>('');

    const numericColumns = columns.filter(c => c.type === 'number');
    const categoricalColumns = columns.filter(c => c.type === 'string' || c.isCategorical);

    // Automatic suggestions when changing types
    const handleTypeChange = (newType: ChartType) => {
        setType(newType);
        if (newType === 'scatter' || newType === 'bubble') {
            // Scatter requires numeric X and Y
            setXAxisKey(numericColumns[0]?.key || '');
            setYAxisKeys(numericColumns.length > 1 ? [numericColumns[1].key] : [numericColumns[0]?.key || '']);
        } else {
            setXAxisKey(categoricalColumns[0]?.key || columns[0]?.key || '');
        }
    };

    const toggleYAxis = (key: string) => {
        if (['grouped_bar', 'stacked_bar', 'line', 'radar'].includes(type)) {
            // Multi-select allowed
            setYAxisKeys(prev =>
                prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
            );
        } else {
            // Single select
            setYAxisKeys([key]);
        }
    };

    const handleSave = () => {
        if (!xAxisKey || yAxisKeys.length === 0) return;

        // Auto generate title if empty
        const finalTitle = title.trim() || `${yAxisKeys.join(' & ')} by ${xAxisKey} (${type})`;

        const config: ChartConfig = {
            id: crypto.randomUUID(),
            type,
            title: finalTitle,
            xAxisKey,
            yAxisKeys,
            zAxisKey: type === 'bubble' ? zAxisKey : undefined,
        };
        onAddChart(config);
    };

    return (
        <div style={{
            background: 'var(--bg-card)', padding: 32, borderRadius: 24, border: '1px solid var(--border-subtle)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)', marginBottom: 32, position: 'relative'
        }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 24px' }}>Build New Chart</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>

                {/* Chart Type Selection */}
                <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 8, color: 'var(--text-secondary)' }}>Chart Type</label>
                    <select
                        value={type}
                        onChange={e => handleTypeChange(e.target.value as ChartType)}
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    >
                        {['Basic', 'Advanced', 'Statistical', 'Comparison'].map(group => (
                            <optgroup label={group} key={group}>
                                {AVAILABLE_CHARTS.filter(c => c.group === group).map(c => (
                                    <option key={c.type} value={c.type}>{c.label}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>

                {/* Title */}
                <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 8, color: 'var(--text-secondary)' }}>Chart Title (Optional)</label>
                    <input
                        type="text"
                        placeholder="Auto-generated if left blank"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    />
                </div>

                {/* X-Axis */}
                <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 8, color: 'var(--text-secondary)' }}>
                        X-Axis Parameter {['scatter', 'bubble', 'histogram'].includes(type) ? '(Numeric)' : '(Category)'}
                    </label>
                    <select
                        value={xAxisKey}
                        onChange={e => setXAxisKey(e.target.value)}
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    >
                        {columns.map(c => (
                            <option key={c.key} value={c.key}>{c.key} ({c.type})</option>
                        ))}
                    </select>
                </div>

                {/* Y-Axis */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 8, color: 'var(--text-secondary)' }}>
                        Y-Axis Parameter(s) (Numeric values to plot)
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                        {numericColumns.map(c => {
                            const selected = yAxisKeys.includes(c.key);
                            return (
                                <button
                                    key={c.key}
                                    onClick={() => toggleYAxis(c.key)}
                                    style={{
                                        padding: '8px 16px', borderRadius: 99, fontSize: '0.85rem', fontWeight: 600, border: '1px solid', cursor: 'pointer', transition: 'all 0.2s',
                                        background: selected ? 'var(--accent-blue)' : 'var(--bg-secondary)',
                                        color: selected ? '#fff' : 'var(--text-secondary)',
                                        borderColor: selected ? 'var(--accent-blue)' : 'var(--border-subtle)'
                                    }}
                                >
                                    {c.key}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Z-Axis for Bubble */}
                {type === 'bubble' && (
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 8, color: 'var(--text-secondary)' }}>
                            Bubble Size Parameter (Z-Axis)
                        </label>
                        <select
                            value={zAxisKey}
                            onChange={e => setZAxisKey(e.target.value)}
                            style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                        >
                            <option value="">-- Select Size Metric --</option>
                            {numericColumns.map(c => (
                                <option key={c.key} value={c.key}>{c.key}</option>
                            ))}
                        </select>
                    </div>
                )}

            </div>

            {/* Footer Actions */}
            <div style={{ display: 'flex', gap: 12, marginTop: 32, justifyContent: 'flex-end', borderTop: '1px solid var(--border-subtle)', paddingTop: 24 }}>
                <button
                    onClick={onCancel}
                    style={{ padding: '10px 20px', borderRadius: 8, background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)', fontWeight: 600, cursor: 'pointer' }}
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    disabled={!xAxisKey || yAxisKeys.length === 0 || (type === 'bubble' && !zAxisKey)}
                    style={{ padding: '10px 24px', borderRadius: 8, background: 'var(--accent-blue)', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', opacity: (!xAxisKey || yAxisKeys.length === 0) ? 0.5 : 1 }}
                >
                    Generate Chart
                </button>
            </div>
        </div>
    );
}
