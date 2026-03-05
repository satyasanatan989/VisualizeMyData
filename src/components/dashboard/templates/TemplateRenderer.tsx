'use client';

import React, { useMemo } from 'react';
import { ParsedData, ColumnInfo } from '@/lib/excelParser';
import { DASHBOARD_TEMPLATES } from '@/lib/dashboardTemplates';
import MultiChartRenderer from '@/components/charts/MultiChartRenderer';
import { ChartConfig } from '@/components/charts/types';
import DashboardTable from '@/components/dashboard/DashboardTable';
import { RefreshCw, ArrowLeft } from 'lucide-react';

interface TemplateRendererProps {
    templateId: string;
    parsedData: ParsedData;
    onReset: () => void;
    onBack: () => void;
}

export default function TemplateRenderer({ templateId, parsedData, onReset, onBack }: TemplateRendererProps) {
    const template = useMemo(() => DASHBOARD_TEMPLATES.find(t => t.id === templateId), [templateId]);
    const columns = parsedData.columns;

    // Helper function: Find the best matching column from a list of hints
    const findBestColumn = (hints: string[], typeFilter: 'number' | 'string' | 'date' | 'any' = 'any'): ColumnInfo | undefined => {
        const validCols = columns.filter(c => typeFilter === 'any' || c.type === typeFilter || (typeFilter === 'string' && c.isCategorical));

        // First pass: look for exact hint matches in the column name
        for (const hint of hints) {
            const match = validCols.find(c => c.key.toLowerCase().includes(hint.toLowerCase()));
            if (match) return match;
        }

        // Fallback: return the first valid column of the requested type
        return validCols[0];
    };

    // Maps the Template charts array to MultiChartRenderer configs
    const generatedChartConfigs: ChartConfig[] = useMemo(() => {
        if (!template) return [];

        return template.charts.map((chartConf, index) => {
            // Determine what type of columns we need based on the chart type
            const isXNumeric = ['scatter', 'bubble', 'histogram'].includes(chartConf.type);
            const isYNumeric = true; // all Y axes in our templates plot values

            const bestX = findBestColumn(chartConf.xAxisHint, isXNumeric ? 'number' : 'any');
            const bestY = findBestColumn(chartConf.yAxisHint, isYNumeric ? 'number' : 'any');

            if (!bestX || !bestY) return null;

            return {
                id: `template-chart-${index}`,
                type: chartConf.type,
                title: chartConf.title,
                xAxisKey: bestX.key,
                yAxisKeys: [bestY.key]
            };
        }).filter(Boolean) as ChartConfig[];
    }, [template, columns]);

    // Compute Metric Bar values
    const computedMetrics = useMemo(() => {
        if (!template) return [];

        return template.metrics.map(metric => {
            let targetCol: ColumnInfo | undefined;

            if (metric.type === 'top_category') {
                targetCol = findBestColumn(metric.targetColumnHint, 'string');
            } else {
                targetCol = findBestColumn(metric.targetColumnHint, 'number');
            }

            if (!targetCol) return { ...metric, value: 'N/A', subtitle: 'Not Found' };

            const values = parsedData.data.map(row => row[targetCol!.key]).filter(v => v !== null && v !== undefined && v !== '');

            let aggregatedValue: string | number = 0;

            if (values.length === 0) return { ...metric, value: 'N/A', subtitle: targetCol.key };

            if (metric.type === 'sum' || metric.type === 'average' || metric.type === 'max' || metric.type === 'min') {
                const numValues = values.map(Number).filter(n => !isNaN(n));
                if (numValues.length === 0) return { ...metric, value: 'N/A', subtitle: targetCol.key };

                switch (metric.type) {
                    case 'sum': aggregatedValue = numValues.reduce((a, b) => a + b, 0); break;
                    case 'max': aggregatedValue = Math.max(...numValues); break;
                    case 'min': aggregatedValue = Math.min(...numValues); break;
                    case 'average': aggregatedValue = numValues.reduce((a, b) => a + b, 0) / numValues.length; break;
                }

                // Format nicely
                if (aggregatedValue > 1000000) aggregatedValue = (aggregatedValue / 1000000).toFixed(1) + 'M';
                else if (aggregatedValue > 1000) aggregatedValue = (aggregatedValue / 1000).toFixed(1) + 'k';
                else aggregatedValue = Math.round(aggregatedValue).toLocaleString();

            } else if (metric.type === 'count') {
                aggregatedValue = values.length.toLocaleString();

            } else if (metric.type === 'top_category') {
                const counts = values.reduce((acc: Record<string, number>, val) => {
                    const str = String(val);
                    acc[str] = (acc[str] || 0) + 1;
                    return acc;
                }, {});
                aggregatedValue = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
            }

            return {
                ...metric,
                value: aggregatedValue,
                subtitle: targetCol.key
            };
        });
    }, [template, parsedData]);

    if (!template) return <div>Template not found</div>;

    return (
        <div style={{ animation: 'fadeIn 0.5s ease-out' }}>

            {/* Template Header Toolbar */}
            <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center',
                justifyContent: 'space-between', marginBottom: 24,
                padding: '16px 20px', borderRadius: 16,
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <button
                        onClick={onBack}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px',
                            borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
                            color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600
                        }}
                    >
                        <ArrowLeft size={14} /> Back to Layouts
                    </button>
                    <div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                            {template.icon} {template.name} Dashboard
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: '4px 0 0' }}>
                            Generated from {parsedData.fileName}
                        </p>
                    </div>
                </div>

                <button
                    onClick={onReset}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
                        borderRadius: 8, background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)',
                        color: '#f43f5e', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600
                    }}
                >
                    <RefreshCw size={14} /> Upload New File
                </button>
            </div>

            {/* KPI Metrics Ribbon */}
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 16, marginBottom: 32
            }}>
                {computedMetrics.map(metric => (
                    <div key={metric.id} style={{
                        background: 'var(--bg-card)', padding: '24px', borderRadius: 16,
                        border: '1px solid var(--border-subtle)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                    }}>
                        <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {metric.label}
                        </p>
                        <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px' }}>
                            {metric.value}
                        </h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                            Based on: {metric.subtitle}
                        </p>
                    </div>
                ))}
            </div>

            {/* Primary Charts (Leveraging the MultiChartRenderer engine) */}
            {/* We pass an initialConfigs prop to force it to render our pre-calculated charts */}
            <div style={{ marginBottom: 40 }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--border-subtle)' }}>
                    Visualizations
                </h3>
                <MultiChartRenderer parsedData={parsedData} initialConfigs={generatedChartConfigs} hideToolbar={true} />
            </div>

            {/* Data Table */}
            <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--border-subtle)' }}>
                    Detailed Data
                </h3>
                <DashboardTable parsedData={parsedData} maxRows={15} />
            </div>

        </div>
    );
}
