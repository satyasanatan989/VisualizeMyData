'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ParsedData } from '@/lib/excelParser';
import {
    BarChart, Bar, LineChart, Line, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell,
} from 'recharts';

type ChartType = 'area' | 'bar' | 'line' | 'pie';

interface DashboardChartsProps {
    parsedData: ParsedData;
    filteredData: Record<string, any>[];
    chartType: ChartType;
}

const PALETTES = {
    ocean: ['#3b82f6', '#06b6d4', '#0ea5e9', '#38bdf8', '#7dd3fc'],
    purple: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#6366f1', '#818cf8'],
    sunset: ['#f43f5e', '#fb923c', '#facc15', '#4ade80', '#34d399'],
};

const tooltipStyle = {
    contentStyle: { backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 10, color: '#fff', fontSize: 12 },
    itemStyle: { color: '#fff' },
};

const axisProps = { stroke: '#475569', tick: { fill: '#64748b', fontSize: 11 } };

export default function DashboardCharts({ parsedData, filteredData, chartType }: DashboardChartsProps) {
    const { columns } = parsedData;
    const numericCols = columns.filter(c => c.type === 'number');
    const categoricalCols = columns.filter(c => c.isCategorical || c.type === 'string');
    const dateCols = columns.filter(c => c.type === 'date');

    const numericKey = numericCols[0]?.key;
    const secondNumericKey = numericCols[1]?.key;
    const xKey = dateCols[0]?.key || categoricalCols[0]?.key || (columns[0]?.key);
    const catKey = categoricalCols[0]?.key;

    const COLORS = PALETTES.ocean;

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

    const chartData = useMemo(() => {
        const max = 100;
        if (filteredData.length <= max) return filteredData;
        const step = Math.ceil(filteredData.length / max);
        return filteredData.filter((_, i) => i % step === 0);
    }, [filteredData]);

    const grid = <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />;

    const renderPrimary = () => {
        if (!numericKey || !xKey) return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
                No numeric columns found for charting.
            </div>
        );

        if (chartType === 'pie') {
            return (
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={distributionData.length > 0 ? distributionData : chartData.slice(0, 10).map(r => ({ name: String(r[xKey] ?? ''), value: Number(r[numericKey] ?? 0) }))}
                            cx="50%" cy="50%" innerRadius={70} outerRadius={120}
                            paddingAngle={4} dataKey="value" stroke="none">
                            {(distributionData.length > 0 ? distributionData : chartData.slice(0, 10)).map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
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
                </LineChart>
            </ResponsiveContainer>
        );

        // Area (default)
        return (
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="dashGrad1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.5} />
                            <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="dashGrad2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS[1]} stopOpacity={0.4} />
                            <stop offset="95%" stopColor={COLORS[1]} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    {grid}
                    <XAxis dataKey={xKey} {...axisProps} />
                    <YAxis {...axisProps} />
                    <Tooltip {...tooltipStyle} />
                    <Area type="monotone" dataKey={numericKey} stroke={COLORS[0]} fill="url(#dashGrad1)" strokeWidth={2.5} />
                    {secondNumericKey && <Area type="monotone" dataKey={secondNumericKey} stroke={COLORS[1]} fill="url(#dashGrad2)" strokeWidth={2} />}
                </AreaChart>
            </ResponsiveContainer>
        );
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Primary chart */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                    padding: 24, borderRadius: 20,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    height: 420,
                }}
            >
                <h3 style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 700, margin: '0 0 16px' }}>
                    📊 Primary Chart — {numericKey || 'Overview'}
                    {filteredData.length !== parsedData.data.length && (
                        <span style={{ marginLeft: 8, color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 400 }}>
                            ({filteredData.length} of {parsedData.data.length} rows)
                        </span>
                    )}
                </h3>
                <div style={{ height: 340 }}>{renderPrimary()}</div>
            </motion.div>

            {/* Distribution pie */}
            {chartType !== 'pie' && distributionData.length > 0 && catKey && (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    style={{
                        padding: 24, borderRadius: 20,
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)',
                        height: 360,
                    }}
                >
                    <h3 style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 700, margin: '0 0 16px' }}>
                        🥧 Distribution by {catKey}
                    </h3>
                    <div style={{ height: 280 }}>
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
                    </div>
                </motion.div>
            )}
        </div>
    );
}
