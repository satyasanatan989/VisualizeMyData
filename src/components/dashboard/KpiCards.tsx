'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ParsedData } from '@/lib/excelParser';
import { InsightReport } from '@/lib/dataInsightEngine';

interface KpiCardsProps {
    parsedData: ParsedData;
    report: InsightReport;
}

export default function KpiCards({ parsedData, report }: KpiCardsProps) {
    const { rowCount, columns } = parsedData;
    const firstNumericKey = report.numericColumns[0];
    const firstStats = firstNumericKey ? report.keyStats[firstNumericKey] : null;
    const firstCatKey = report.categoricalColumns[0];

    const topCategoryCount = firstCatKey
        ? (() => {
            const counts: Record<string, number> = {};
            parsedData.data.forEach(r => {
                const v = String(r[firstCatKey] ?? '');
                if (v) counts[v] = (counts[v] || 0) + 1;
            });
            const vals = Object.values(counts);
            return vals.length > 0 ? Math.max(...vals) : 0;
        })()
        : 0;

    const firstNumericValues = firstNumericKey
        ? parsedData.data.map(r => Number(r[firstNumericKey])).filter(n => !isNaN(n))
        : [];
    const firstNumericSum = firstNumericValues.reduce((a, b) => a + b, 0);

    const allKeys = parsedData.columns.map(c => c.key);
    const missingRows = parsedData.data.filter(row =>
        allKeys.some(k => row[k] === null || row[k] === undefined || row[k] === '')
    ).length;

    const uniqueCategories = firstCatKey
        ? new Set(parsedData.data.map(r => String(r[firstCatKey] ?? ''))).size
        : 0;

    const kpis = [
        {
            label: 'Total Rows',
            value: rowCount.toLocaleString(),
            icon: '📁',
            color: '#3b82f6',
            bg: 'rgba(59, 130, 246, 0.1)',
        },
        {
            label: 'Total Columns',
            value: columns.length,
            icon: '🏛️',
            color: '#8b5cf6',
            bg: 'rgba(139, 92, 246, 0.1)',
        },
        {
            label: `Max (${firstNumericKey || '—'})`,
            value: firstStats ? firstStats.max.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '—',
            icon: '⬆️',
            color: '#10b981',
            bg: 'rgba(16, 185, 129, 0.1)',
        },
        {
            label: `Min (${firstNumericKey || '—'})`,
            value: firstStats ? firstStats.min.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '—',
            icon: '⬇️',
            color: '#f43f5e',
            bg: 'rgba(244, 63, 94, 0.1)',
        },
        {
            label: `Avg (${firstNumericKey || '—'})`,
            value: firstStats ? firstStats.avg.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '—',
            icon: '📊',
            color: '#06b6d4',
            bg: 'rgba(6, 182, 212, 0.1)',
        },
        {
            label: `Top Category`,
            value: topCategoryCount > 0 ? topCategoryCount.toLocaleString() : '—',
            icon: '🏆',
            color: '#f59e0b',
            bg: 'rgba(245, 158, 11, 0.1)',
        },
        {
            label: `Sum (${firstNumericKey || '—'})`,
            value: firstNumericKey ? firstNumericSum.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '—',
            icon: '∑',
            color: '#a78bfa',
            bg: 'rgba(167, 139, 250, 0.1)',
        },
        {
            label: 'Missing Rows',
            value: missingRows.toLocaleString(),
            icon: '⚠️',
            color: missingRows > 0 ? '#fb923c' : '#10b981',
            bg: missingRows > 0 ? 'rgba(251, 146, 60, 0.1)' : 'rgba(16, 185, 129, 0.1)',
        },
        {
            label: `Unique (${firstCatKey || '—'})`,
            value: firstCatKey ? uniqueCategories.toLocaleString() : '—',
            icon: '🔢',
            color: '#34d399',
            bg: 'rgba(52, 211, 153, 0.1)',
        },
    ];

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 12,
            marginBottom: 20,
        }}>
            {kpis.map((kpi, i) => (
                <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    style={{
                        padding: '18px 16px',
                        borderRadius: 14,
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <div style={{
                        position: 'absolute', top: 12, right: 12,
                        width: 32, height: 32, borderRadius: 8,
                        background: kpi.bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1rem',
                    }}>
                        {kpi.icon}
                    </div>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        margin: '0 0 6px',
                        paddingRight: 40,
                    }}>
                        {kpi.label}
                    </p>
                    <p style={{
                        fontSize: '1.6rem',
                        fontWeight: 800,
                        color: kpi.color,
                        margin: 0,
                        lineHeight: 1,
                    }}>
                        {kpi.value}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}
