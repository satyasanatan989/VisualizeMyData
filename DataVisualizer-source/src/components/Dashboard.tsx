'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ParsedData } from '@/lib/excelParser';
import { PdfParseResult } from '@/lib/pdfParser';
import {
    BarChart, Bar,
    LineChart, Line,
    AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { ArrowLeft, Download, BarChart3, LineChart as LineIcon, PieChart as PieIcon, Table2, FileImage, FileDown, RefreshCw } from 'lucide-react';
import { downloadChartAsPng, downloadChartAsPdf } from '@/lib/chartDownloader';
import PdfPreview from './PdfPreview';

interface DashboardProps {
    parsedData: ParsedData;
    isPdf?: boolean;
    pdfFile?: File | null;
    pdfResult?: PdfParseResult | null;
    onReset: () => void;
}

const PALETTES = {
    ocean: ['#3b82f6', '#06b6d4', '#0ea5e9', '#38bdf8', '#7dd3fc'],
    purple: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#6366f1', '#818cf8'],
    sunset: ['#f43f5e', '#fb923c', '#facc15', '#4ade80', '#34d399'],
    forest: ['#10b981', '#059669', '#34d399', '#6ee7b7', '#a7f3d0'],
};

type PaletteName = keyof typeof PALETTES;
type ChartType = 'area' | 'bar' | 'line' | 'pie';

const CHART_TOOLS = [
    { type: 'area' as ChartType, label: 'Area', icon: <LineIcon size={14} /> },
    { type: 'bar' as ChartType, label: 'Bar', icon: <BarChart3 size={14} /> },
    { type: 'line' as ChartType, label: 'Line', icon: <LineIcon size={14} /> },
    { type: 'pie' as ChartType, label: 'Pie', icon: <PieIcon size={14} /> },
];

export default function Dashboard({ parsedData, isPdf, pdfFile, pdfResult, onReset }: DashboardProps) {
    const { fileName, columns, data, rowCount } = parsedData;
    const [chartType, setChartType] = useState<ChartType>('area');
    const [palette, setPalette] = useState<PaletteName>('ocean');
    const [activeTab, setActiveTab] = useState<'chart' | 'table'>('chart');
    const [downloading, setDownloading] = useState<'png' | 'pdf' | null>(null);

    const COLORS = PALETTES[palette];
    const numericCols = columns.filter(c => c.type === 'number');
    const categoricalCols = columns.filter(c => c.isCategorical);
    const categoryKey = categoricalCols.length > 0 ? categoricalCols[0].key : (columns.length > 0 ? columns[0].key : '');
    const numericKey = numericCols.length > 0 ? numericCols[0].key : undefined;
    const xKey = columns.find(c => c.type === 'date')?.key || categoryKey;

    const distributionData = useMemo(() => {
        if (!categoryKey) return [];
        const counts: Record<string, number> = {};
        data.forEach(row => {
            const v = String(row[categoryKey] ?? '');
            if (v) counts[v] = (counts[v] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 12);
    }, [data, categoryKey]);

    const chartData = useMemo(() => {
        const maxPoints = 100;
        if (data.length <= maxPoints) return data;
        const step = Math.ceil(data.length / maxPoints);
        return data.filter((_, i) => i % step === 0);
    }, [data]);

    const tooltipStyle = {
        contentStyle: { backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 10, color: '#fff', fontSize: 12 },
        itemStyle: { color: '#fff' },
    };

    const handleDownload = async (type: 'png' | 'pdf') => {
        setDownloading(type);
        try {
            if (type === 'png') await downloadChartAsPng('chart-area', fileName.replace(/\.[^.]+$/, ''));
            else await downloadChartAsPdf('chart-area', fileName.replace(/\.[^.]+$/, ''));
        } catch (e) { console.error(e); }
        finally { setDownloading(null); }
    };

    const renderChart = () => {
        if (!numericKey || !xKey) return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 48, color: 'var(--text-muted)' }}>
                <BarChart3 size={48} style={{ marginBottom: 12, opacity: 0.3 }} />
                <p>No numeric columns detected for charting.</p>
            </div>
        );

        const commonProps = { data: chartData };
        const axisProps = { stroke: '#475569', tick: { fill: '#64748b', fontSize: 11 } };
        const grid = <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />;

        if (chartType === 'pie') return (
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={distributionData} cx="50%" cy="50%" innerRadius={70} outerRadius={120}
                        paddingAngle={4} dataKey="value" stroke="none">
                        {distributionData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip {...tooltipStyle} />
                    <Legend wrapperStyle={{ paddingTop: 20, fontSize: 12, color: 'var(--text-secondary)' }} />
                </PieChart>
            </ResponsiveContainer>
        );

        if (chartType === 'bar') return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart {...commonProps}>
                    {grid}
                    <XAxis dataKey={xKey} {...axisProps} />
                    <YAxis {...axisProps} />
                    <Tooltip {...tooltipStyle} cursor={{ fill: '#1e293b' }} />
                    <Bar dataKey={numericKey} radius={[4, 4, 0, 0]}>
                        {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        );

        if (chartType === 'line') return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart {...commonProps}>
                    {grid}
                    <XAxis dataKey={xKey} {...axisProps} />
                    <YAxis {...axisProps} />
                    <Tooltip {...tooltipStyle} />
                    <Line type="monotone" dataKey={numericKey} stroke={COLORS[0]} strokeWidth={2.5} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        );

        // Area (default)
        return (
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart {...commonProps}>
                    <defs>
                        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.5} />
                            <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    {grid}
                    <XAxis dataKey={xKey} {...axisProps} />
                    <YAxis {...axisProps} />
                    <Tooltip {...tooltipStyle} />
                    <Area type="monotone" dataKey={numericKey} stroke={COLORS[0]} fill="url(#grad)" strokeWidth={2.5} />
                </AreaChart>
            </ResponsiveContainer>
        );
    };

    // Show PDF preview mode if no tables were found
    if (isPdf && pdfResult && !pdfResult.hasTables) {
        return (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>PDF Preview</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: 4 }}>
                            No table data detected in <strong>{fileName}</strong>. Showing document preview.
                        </p>
                    </div>
                    <button onClick={onReset} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <ArrowLeft size={14} /> New File
                    </button>
                </div>
                <PdfPreview file={pdfFile!} pageCount={pdfResult.pageCount} />
            </motion.div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ width: '100%' }}>
            {/* Header bar */}
            <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center',
                justifyContent: 'space-between', marginBottom: 24,
                padding: '16px 20px', borderRadius: 16, background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
            }}>
                <div>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                        {fileName}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: '2px 0 0' }}>
                        {rowCount.toLocaleString()} rows · {columns.length} columns detected
                    </p>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button onClick={() => handleDownload('png')} disabled={!!downloading} style={{
                        display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
                        borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, border: '1px solid var(--border-subtle)',
                        background: 'var(--bg-glass)', color: 'var(--text-secondary)', cursor: 'pointer',
                    }}>
                        <FileImage size={14} /> {downloading === 'png' ? '...' : 'PNG'}
                    </button>
                    <button onClick={() => handleDownload('pdf')} disabled={!!downloading} style={{
                        display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
                        borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, border: '1px solid var(--border-subtle)',
                        background: 'var(--bg-glass)', color: 'var(--text-secondary)', cursor: 'pointer',
                    }}>
                        <FileDown size={14} /> {downloading === 'pdf' ? '...' : 'PDF'}
                    </button>
                    <button onClick={onReset} style={{
                        display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
                        borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, border: '1px solid var(--border-subtle)',
                        background: 'var(--bg-glass)', color: 'var(--text-secondary)', cursor: 'pointer',
                    }}>
                        <RefreshCw size={14} /> New File
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 20 }}>
                {[
                    { label: 'Total Rows', value: rowCount.toLocaleString() },
                    { label: 'Columns', value: columns.length },
                    { label: 'Numeric Fields', value: numericCols.length },
                    { label: 'Categories', value: categoricalCols.length },
                ].map((kpi, i) => (
                    <motion.div key={kpi.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                        style={{ padding: '16px 18px', borderRadius: 14, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>{kpi.label}</p>
                        <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 0' }}>{kpi.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Chart / Table tabs */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                {[{ key: 'chart', label: '📊 Charts' }, { key: 'table', label: '📋 Data Table' }].map(t => (
                    <button key={t.key} onClick={() => setActiveTab(t.key as 'chart' | 'table')} style={{
                        padding: '7px 18px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600,
                        background: activeTab === t.key ? 'linear-gradient(135deg, #3b82f6, #6366f1)' : 'var(--bg-glass)',
                        color: activeTab === t.key ? '#fff' : 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)', cursor: 'pointer',
                    }}>
                        {t.label}
                    </button>
                ))}
            </div>

            {activeTab === 'chart' ? (
                <div id="chart-area">
                    {/* Chart controls */}
                    <div style={{
                        display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center',
                        marginBottom: 16, padding: '14px 18px', borderRadius: 14,
                        background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                    }}>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, marginRight: 4 }}>CHART</span>
                            {CHART_TOOLS.map(c => (
                                <button key={c.type} onClick={() => setChartType(c.type)} style={{
                                    display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 8,
                                    fontSize: '0.8rem', fontWeight: 600, border: '1px solid var(--border-subtle)', cursor: 'pointer',
                                    background: chartType === c.type ? 'rgba(59,130,246,0.2)' : 'transparent',
                                    color: chartType === c.type ? '#60a5fa' : 'var(--text-secondary)',
                                }}>
                                    {c.icon} {c.label}
                                </button>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginLeft: 'auto' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, marginRight: 4 }}>PALETTE</span>
                            {(Object.keys(PALETTES) as PaletteName[]).map(p => (
                                <button key={p} onClick={() => setPalette(p)} style={{
                                    width: 22, height: 22, borderRadius: 5, cursor: 'pointer', border: palette === p ? '2px solid white' : '2px solid transparent',
                                    background: `linear-gradient(135deg, ${PALETTES[p][0]}, ${PALETTES[p][2]})`,
                                }} />
                            ))}
                        </div>
                    </div>

                    {/* Main chart */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                        style={{ padding: 24, borderRadius: 20, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', height: 420 }}>
                        {renderChart()}
                    </motion.div>

                    {/* Secondary pie (if different) */}
                    {chartType !== 'pie' && distributionData.length > 0 && categoryKey && (
                        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            style={{ marginTop: 16, padding: 24, borderRadius: 20, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', height: 340 }}>
                            <h3 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, marginBottom: 12 }}>
                                Distribution by {categoryKey}
                            </h3>
                            <ResponsiveContainer width="100%" height={260}>
                                <PieChart>
                                    <Pie data={distributionData} cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={3} dataKey="value" stroke="none">
                                        {distributionData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip {...tooltipStyle} />
                                    <Legend wrapperStyle={{ fontSize: 12, color: 'var(--text-secondary)' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </motion.div>
                    )}
                </div>
            ) : (
                /* Data Table */
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ borderRadius: 16, border: '1px solid var(--border-subtle)', overflow: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                        <thead>
                            <tr>
                                {columns.map(col => (
                                    <th key={col.key} style={{
                                        padding: '12px 16px', textAlign: 'left', whiteSpace: 'nowrap',
                                        background: 'var(--bg-secondary)', color: 'var(--text-secondary)',
                                        fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                                        borderBottom: '1px solid var(--border-subtle)',
                                    }}>
                                        {col.key}
                                        <span style={{ marginLeft: 4, opacity: 0.5, fontSize: '0.65rem' }}>{col.type}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.slice(0, 100).map((row, i) => (
                                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                                    {columns.map(col => (
                                        <td key={col.key} style={{
                                            padding: '10px 16px', color: 'var(--text-secondary)',
                                            borderBottom: '1px solid rgba(255,255,255,0.03)', whiteSpace: 'nowrap',
                                        }}>
                                            {row[col.key] !== undefined ? String(row[col.key]) : '–'}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {data.length > 100 && (
                        <div style={{ padding: '12px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', borderTop: '1px solid var(--border-subtle)' }}>
                            Showing first 100 of {data.length.toLocaleString()} rows
                        </div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
}
