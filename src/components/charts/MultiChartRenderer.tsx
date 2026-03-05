'use client';

import React, { useState } from 'react';
import { ParsedData } from '@/lib/excelParser';
import ChartToolbar from './ChartToolbar';
import ChartSelector from './ChartSelector';
import ChartContainer from './ChartContainer';
import { ChartType, ChartConfig } from './types';
import {
    ResponsiveContainer,
    BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
    ScatterChart, Scatter, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ZAxis, Cell
} from 'recharts';

interface MultiChartRendererProps {
    parsedData: ParsedData;
}

// Built-in color palette for multi-series charts
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#f43f5e', '#06b6d4'];

export default function MultiChartRenderer({ parsedData }: MultiChartRendererProps) {
    const [configs, setConfigs] = useState<ChartConfig[]>([]);
    const [isAdding, setIsAdding] = useState(true); // Start with adding mode if empty

    const data = parsedData.data;

    const handleAddChart = (config: ChartConfig) => {
        // Only allow up to 6 charts
        if (configs.length >= 6) {
            alert("Maximum of 6 charts allowed to maintain performance.");
            setIsAdding(false);
            return;
        }
        setConfigs([...configs, config]);
        setIsAdding(false);
    };

    const handleRemoveChart = (id: string) => {
        setConfigs(configs.filter(c => c.id !== id));
        if (configs.length === 1) setIsAdding(true); // Re-open selector if last chart removed
    };

    // Helper to process Histogram data (binning)
    const getHistogramData = (key: string) => {
        const values = data.map(d => Number(d[key])).filter(v => !isNaN(v));
        if (values.length === 0) return [];

        const min = Math.min(...values);
        const max = Math.max(...values);
        const binCount = 10;
        const binSize = (max - min) / binCount;

        // Create bins
        const bins = Array.from({ length: binCount }, (_, i) => ({
            range: `${(min + i * binSize).toFixed(1)} - ${(min + (i + 1) * binSize).toFixed(1)}`,
            count: 0,
        }));

        // Fill bins
        values.forEach(v => {
            let binIndex = Math.floor((v - min) / binSize);
            if (binIndex >= binCount) binIndex = binCount - 1; // edge case for max value
            bins[binIndex].count++;
        });

        return bins;
    };

    const renderChart = (config: ChartConfig) => {
        const { type, xAxisKey, yAxisKeys, zAxisKey } = config;

        switch (type) {
            case 'bar':
            case 'grouped_bar':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                            <XAxis dataKey={xAxisKey} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <YAxis tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Legend wrapperStyle={{ fontSize: 12 }} />
                            {yAxisKeys.map((k, i) => <Bar key={k} dataKey={k} fill={COLORS[i % COLORS.length]} radius={[4, 4, 0, 0]} />)}
                        </BarChart>
                    </ResponsiveContainer>
                );

            case 'stacked_bar':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                            <XAxis dataKey={xAxisKey} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <YAxis tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Legend wrapperStyle={{ fontSize: 12 }} />
                            {yAxisKeys.map((k, i) => <Bar key={k} dataKey={k} stackId="a" fill={COLORS[i % COLORS.length]} />)}
                        </BarChart>
                    </ResponsiveContainer>
                );

            case 'line':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                            <XAxis dataKey={xAxisKey} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <YAxis tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Legend wrapperStyle={{ fontSize: 12 }} />
                            {yAxisKeys.map((k, i) => <Line key={k} type="monotone" dataKey={k} stroke={COLORS[i % COLORS.length]} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />)}
                        </LineChart>
                    </ResponsiveContainer>
                );

            case 'area':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                            <XAxis dataKey={xAxisKey} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <YAxis tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Legend wrapperStyle={{ fontSize: 12 }} />
                            {yAxisKeys.map((k, i) => (
                                <Area key={k} type="monotone" dataKey={k} stroke={COLORS[i % COLORS.length]} fill={COLORS[i % COLORS.length]} fillOpacity={0.3} />
                            ))}
                        </AreaChart>
                    </ResponsiveContainer>
                );

            case 'scatter':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                            <XAxis type="number" dataKey={xAxisKey} name={xAxisKey} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <YAxis type="number" dataKey={yAxisKeys[0]} name={yAxisKeys[0]} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Scatter name={`${xAxisKey} vs ${yAxisKeys[0]}`} data={data} fill={COLORS[0]} />
                        </ScatterChart>
                    </ResponsiveContainer>
                );

            case 'bubble':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                            <XAxis type="number" dataKey={xAxisKey} name={xAxisKey} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <YAxis type="number" dataKey={yAxisKeys[0]} name={yAxisKeys[0]} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <ZAxis type="number" dataKey={zAxisKey} range={[40, 400]} name={zAxisKey} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Scatter name="Data" data={data} fill={COLORS[1]} fillOpacity={0.6} />
                        </ScatterChart>
                    </ResponsiveContainer>
                );

            case 'heatmap':
                // Simulating a heatmap using a scatter plot with square shapes
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                            <XAxis type="category" dataKey={xAxisKey} name={xAxisKey} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <YAxis type="category" dataKey={yAxisKeys[0]} name={yAxisKeys[0]} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <ZAxis type="number" dataKey={yAxisKeys[0]} range={[100, 100]} /> {/* Fixed area, color varies by value later if custom shape provided */}
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Scatter name="Heatmap" data={data} fill={COLORS[3]} shape="square" />
                        </ScatterChart>
                    </ResponsiveContainer>
                );

            case 'pie':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Legend wrapperStyle={{ fontSize: 12 }} />
                            <Pie data={data} dataKey={yAxisKeys[0]} nameKey={xAxisKey} cx="50%" cy="50%" outerRadius={120} innerRadius={0}>
                                {data.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                );

            case 'radar':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={data}>
                            <PolarGrid stroke="var(--border-subtle)" />
                            <PolarAngleAxis dataKey={xAxisKey} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                            <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Legend wrapperStyle={{ fontSize: 12 }} />
                            {yAxisKeys.map((k, i) => (
                                <Radar key={k} name={k} dataKey={k} stroke={COLORS[i % COLORS.length]} fill={COLORS[i % COLORS.length]} fillOpacity={0.4} />
                            ))}
                        </RadarChart>
                    </ResponsiveContainer>
                );

            case 'histogram':
                const histData = getHistogramData(yAxisKeys[0]);
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={histData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                            <XAxis dataKey="range" tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <YAxis tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Bar dataKey="count" fill={COLORS[4]} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                );

            default:
                return <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)' }}>Unsupported Chart Type</div>;
        }
    };

    return (
        <div>
            <ChartToolbar
                parsedData={parsedData}
                isAdding={isAdding}
                canExport={true}
                onAddNewRequest={() => setIsAdding(true)}
            />

            {isAdding && (
                <ChartSelector
                    columns={parsedData.columns}
                    onAddChart={handleAddChart}
                    onCancel={() => { if (configs.length > 0) setIsAdding(false); }}
                />
            )}

            {/* CSS Grid for multi-charts */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
                gap: 24,
                marginTop: 32
            }}>
                {configs.map((config) => (
                    <ChartContainer key={config.id} id={config.id} title={config.title} onRemove={handleRemoveChart}>
                        {renderChart(config)}
                    </ChartContainer>
                ))}
            </div>
        </div>
    );
}
