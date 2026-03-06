'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ParsedData } from '@/lib/excelParser';
import {
    BarChart, Bar, LineChart, Line, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell,
    ScatterChart, Scatter, ZAxis,
} from 'recharts';

type ChartType = 'area' | 'bar' | 'line' | 'pie';

interface DashboardChartsProps {
    parsedData: ParsedData;
    filteredData: Record<string, any>[];
    chartType: ChartType;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f43f5e', '#f59e0b', '#06b6d4', '#ec4899', '#84cc16'];

const tooltipStyle = {
    contentStyle: { backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 10, color: '#fff', fontSize: 12 },
    itemStyle: { color: '#fff' },
};
const axisProps = { stroke: '#475569', tick: { fill: '#64748b', fontSize: 11 } };
const grid = <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />;

const cardStyle: React.CSSProperties = {
    padding: 24, borderRadius: 20,
    background: 'var(--bg-card)',
    border: '1px solid var(--border-subtle)',
};

function ChartCard({ title, height = 340, delay = 0, children }: { title: string; height?: number; delay?: number; children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            style={{ ...cardStyle, height: height + 68 }}
        >
            <h3 style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 700, margin: '0 0 16px' }}>{title}</h3>
            <div style={{ height }}>{children}</div>
        </motion.div>
    );
}

export default function DashboardCharts({ parsedData, filteredData, chartType }: DashboardChartsProps) {
    const { columns } = parsedData;
    const numericCols = columns.filter(c => c.type === 'number');
    const categoricalCols = columns.filter(c => c.isCategorical || c.type === 'string');
    const dateCols = columns.filter(c => c.type === 'date');

    const numericKey = numericCols[0]?.key;
    const secondNumericKey = numericCols[1]?.key;
    const thirdNumericKey = numericCols[2]?.key;
    const xKey = dateCols[0]?.key || categoricalCols[0]?.key || columns[0]?.key;
    const catKey = categoricalCols[0]?.key;

    // Throttle to max 150 rows for rendering performance
    const chartData = useMemo(() => {
        const max = 150;
        if (filteredData.length <= max) return filteredData;
        const step = Math.ceil(filteredData.length / max);
        return filteredData.filter((_, i) => i % step === 0);
    }, [filteredData]);

    // Category distribution for pie / distribution chart
    const distributionData = useMemo(() => {
        if (!catKey) return [];
        const counts: Record<string, number> = {};
        filteredData.forEach(row => {
            const v = String(row[catKey] ?? '');
            if (v) counts[v] = (counts[v] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 10);
    }, [filteredData, catKey]);

    // Histogram buckets for first numeric column
    const histogramData = useMemo(() => {
        if (!numericKey) return [];
        const values = filteredData.map(r => Number(r[numericKey])).filter(n => !isNaN(n));
        if (values.length === 0) return [];
        const min = Math.min(...values);
        const max = Math.max(...values);
        const bucketCount = Math.min(20, Math.ceil(Math.sqrt(values.length)));
        const bucketSize = (max - min) / (bucketCount || 1);
        const buckets = Array.from({ length: bucketCount }, (_, i) => ({
            range: `${(min + i * bucketSize).toFixed(1)}`,
            count: 0,
            label: `${(min + i * bucketSize).toFixed(1)}–${(min + (i + 1) * bucketSize).toFixed(1)}`,
        }));
        values.forEach(v => {
            const idx = Math.min(Math.floor((v - min) / (bucketSize || 1)), bucketCount - 1);
            if (buckets[idx]) buckets[idx].count++;
        });
        return buckets;
    }, [filteredData, numericKey]);

    // Scatter data for first two numeric cols
    const scatterData = useMemo(() => {
        if (!numericKey || !secondNumericKey) return [];
        return chartData
            .map(r => ({ x: Number(r[numericKey]), y: Number(r[secondNumericKey]) }))
            .filter(p => !isNaN(p.x) && !isNaN(p.y));
    }, [chartData, numericKey, secondNumericKey]);

    const renderPrimary = () => {
        if (!numericKey || !xKey) return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
                No numeric columns found for charting.
            </div>
        );

        if (chartType === 'pie') {
            const pieData = distributionData.length > 0
                ? distributionData
                : chartData.slice(0, 10).map(r => ({ name: String(r[xKey] ?? ''), value: Number(r[numericKey] ?? 0) }));
            return (
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={120} paddingAngle={4} dataKey="value" stroke="none">
                            {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip {...tooltipStyle} />
                        <Legend wrapperStyle={{ paddingTop: 20, fontSize: 12, color: 'var(--text-secondary)' }} />
                    </PieChart>
                </ResponsiveContainer>
            );
        }

        if (chartType === 'bar') return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    {grid}
                    <XAxis dataKey={xKey} {...axisProps} />
                    <YAxis {...axisProps} />
                    <Tooltip {...tooltipStyle} cursor={{ fill: '#1e293b' }} />
                    <Bar dataKey={numericKey} radius={[4, 4, 0, 0]} fill={COLORS[0]} />
                    {secondNumericKey && <Bar dataKey={secondNumericKey} radius={[4, 4, 0, 0]} fill={COLORS[1]} />}
                    {thirdNumericKey && <Bar dataKey={thirdNumericKey} radius={[4, 4, 0, 0]} fill={COLORS[2]} />}
                </BarChart>
            </ResponsiveContainer>
        );

        if (chartType === 'line') return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    {grid}
                    <XAxis dataKey={xKey} {...axisProps} />
                    <YAxis {...axisProps} />
                    <Tooltip {...tooltipStyle} />
                    <Line type="monotone" dataKey={numericKey} stroke={COLORS[0]} strokeWidth={2.5} dot={false} />
                    {secondNumericKey && <Line type="monotone" dataKey={secondNumericKey} stroke={COLORS[1]} strokeWidth={2} dot={false} />}
                    {thirdNumericKey && <Line type="monotone" dataKey={thirdNumericKey} stroke={COLORS[2]} strokeWidth={2} dot={false} />}
                </LineChart>
            </ResponsiveContainer>
        );

        // Area (default)
        return (
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                    <defs>
                        {COLORS.slice(0, 3).map((color, i) => (
                            <linearGradient key={i} id={`dashGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.5} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        ))}
                    </defs>
                    {grid}
                    <XAxis dataKey={xKey} {...axisProps} />
                    <YAxis {...axisProps} />
                    <Tooltip {...tooltipStyle} />
                    <Area type="monotone" dataKey={numericKey} stroke={COLORS[0]} fill="url(#dashGrad0)" strokeWidth={2.5} />
                    {secondNumericKey && <Area type="monotone" dataKey={secondNumericKey} stroke={COLORS[1]} fill="url(#dashGrad1)" strokeWidth={2} />}
                    {thirdNumericKey && <Area type="monotone" dataKey={thirdNumericKey} stroke={COLORS[2]} fill="url(#dashGrad2)" strokeWidth={2} />}
                </AreaChart>
            </ResponsiveContainer>
        );
    };

    const hasMultiNumeric = numericCols.length >= 2;
    const hasScatter = scatterData.length > 0;
    const hasHistogram = histogramData.length > 0;
    const hasDistribution = distributionData.length > 0 && catKey && chartType !== 'pie';
    const hasMultiBar = numericCols.length >= 3 && xKey;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* ── Primary chart (full width) ── */}
            <ChartCard
                title={`📊 Primary Chart — ${numericKey || 'Overview'}${filteredData.length !== parsedData.data.length ? ` (${filteredData.length} of ${parsedData.data.length} rows)` : ''}`}
                height={340}
                delay={0.1}
            >
                {renderPrimary()}
            </ChartCard>

            {/* ── Secondary charts grid (2-col on wide screens) ── */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
                gap: 16,
            }}>

                {/* Distribution Pie */}
                {hasDistribution && (
                    <ChartCard title={`🥧 Distribution by ${catKey}`} height={280} delay={0.2}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={distributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={100}
                                    paddingAngle={3} dataKey="value" stroke="none">
                                    {distributionData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                </Pie>
                                <Tooltip {...tooltipStyle} />
                                <Legend wrapperStyle={{ fontSize: 12, color: 'var(--text-secondary)' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>
                )}

                {/* Histogram */}
                {hasHistogram && (
                    <ChartCard title={`📐 Distribution Histogram — ${numericKey}`} height={280} delay={0.25}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={histogramData} barCategoryGap="2%">
                                {grid}
                                <XAxis dataKey="range" {...axisProps} interval="preserveStartEnd" />
                                <YAxis {...axisProps} />
                                <Tooltip
                                    {...tooltipStyle}
                                    formatter={(v: number | undefined) => [v ?? 0, 'Count']}
                                    labelFormatter={(label: any) => {
                                        const b = histogramData.find(d => d.range === String(label));
                                        return b ? b.label : String(label);
                                    }}
                                    cursor={{ fill: '#1e293b' }}
                                />
                                <Bar dataKey="count" fill={COLORS[2]} radius={[3, 3, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                )}

                {/* Scatter Plot */}
                {hasScatter && (
                    <ChartCard title={`🔵 Scatter — ${numericKey} vs ${secondNumericKey}`} height={280} delay={0.3}>
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart>
                                {grid}
                                <XAxis dataKey="x" name={numericKey} {...axisProps} label={{ value: numericKey, position: 'insideBottom', offset: -4, fill: '#64748b', fontSize: 11 }} />
                                <YAxis dataKey="y" name={secondNumericKey} {...axisProps} />
                                <ZAxis range={[30, 30]} />
                                <Tooltip
                                    {...tooltipStyle}
                                    cursor={{ strokeDasharray: '3 3' }}
                                    formatter={(v: number | undefined, name: string | undefined) => [v ?? 0, name ?? '']}
                                />
                                <Scatter name="Data" data={scatterData} fill={COLORS[0]} fillOpacity={0.7} />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </ChartCard>
                )}

                {/* Multi-Series Bar (3+ numeric cols) */}
                {hasMultiBar && (
                    <ChartCard title={`📊 Multi-Column Comparison`} height={280} delay={0.35}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData.slice(0, 30)}>
                                {grid}
                                <XAxis dataKey={xKey} {...axisProps} />
                                <YAxis {...axisProps} />
                                <Tooltip {...tooltipStyle} cursor={{ fill: '#1e293b' }} />
                                <Legend wrapperStyle={{ fontSize: 11, color: 'var(--text-secondary)' }} />
                                {numericCols.slice(0, 5).map((col, i) => (
                                    <Bar key={col.key} dataKey={col.key} radius={[4, 4, 0, 0]} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                )}

                {/* Secondary Numeric Trend (2nd column as separate area chart) */}
                {hasMultiNumeric && secondNumericKey && chartType !== 'area' && (
                    <ChartCard title={`📈 Trend — ${secondNumericKey}`} height={280} delay={0.4}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="secGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={COLORS[1]} stopOpacity={0.5} />
                                        <stop offset="95%" stopColor={COLORS[1]} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                {grid}
                                <XAxis dataKey={xKey} {...axisProps} />
                                <YAxis {...axisProps} />
                                <Tooltip {...tooltipStyle} />
                                <Area type="monotone" dataKey={secondNumericKey} stroke={COLORS[1]} fill="url(#secGrad)" strokeWidth={2.5} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartCard>
                )}

            </div>
        </div>
    );
}
