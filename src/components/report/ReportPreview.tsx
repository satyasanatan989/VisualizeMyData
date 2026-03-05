'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ParsedData } from '@/lib/excelParser';
import { InsightReport } from '@/lib/dataInsightEngine';

interface ReportPreviewProps {
    parsedData: ParsedData;
    report: InsightReport;
}

export default function ReportPreview({ parsedData, report }: ReportPreviewProps) {
    const { fileName, rowCount, columns, data } = parsedData;
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div id="report-preview-area" style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 20,
            overflow: 'hidden',
        }}>
            {/* Report header */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))',
                borderBottom: '1px solid var(--border-subtle)',
                padding: '28px 32px',
            }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{
                        width: 48, height: 48, borderRadius: 12,
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.4rem', flexShrink: 0,
                    }}>📊</div>
                    <div>
                        <h1 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
                            Data Analysis Report
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '4px 0 0' }}>
                            Generated on {today} · VisualizeMyData.in
                        </p>
                    </div>
                </div>
            </div>

            <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 28 }}>
                {/* Section 1: Dataset Summary */}
                <section>
                    <SectionHeader num={1} title="Dataset Summary" />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginTop: 14 }}>
                        {[
                            { label: 'File Name', value: fileName },
                            { label: 'Total Rows', value: rowCount.toLocaleString() },
                            { label: 'Total Columns', value: columns.length },
                            { label: 'Numeric Columns', value: report.numericColumns.length },
                            { label: 'Text Columns', value: report.categoricalColumns.length },
                            { label: 'Date Columns', value: report.dateColumns.length },
                        ].map(item => (
                            <div key={item.label} style={{
                                padding: '14px 16px', borderRadius: 10,
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--border-subtle)',
                            }}>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px' }}>{item.label}</p>
                                <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, margin: 0, wordBreak: 'break-all' }}>{item.value}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 2: Key Statistics */}
                {Object.keys(report.keyStats).length > 0 && (
                    <section>
                        <SectionHeader num={2} title="Key Statistics" />
                        <div style={{ overflowX: 'auto', marginTop: 14 }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                                <thead>
                                    <tr>
                                        {['Column', 'Min', 'Max', 'Average', 'Median'].map(h => (
                                            <th key={h} style={{
                                                padding: '10px 14px', textAlign: 'left',
                                                background: 'rgba(255,255,255,0.04)',
                                                color: 'var(--text-muted)', fontSize: '0.7rem',
                                                fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
                                                borderBottom: '1px solid var(--border-subtle)',
                                            }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(report.keyStats).map(([col, stats], i) => (
                                        <tr key={col} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                                            <td style={{ padding: '9px 14px', color: 'var(--text-primary)', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{col}</td>
                                            <td style={{ padding: '9px 14px', color: '#f43f5e', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{stats.min.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                            <td style={{ padding: '9px 14px', color: '#10b981', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{stats.max.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                            <td style={{ padding: '9px 14px', color: '#60a5fa', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{stats.avg.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                            <td style={{ padding: '9px 14px', color: '#a78bfa', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{stats.median.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {/* Section 3: AI Insights */}
                <section>
                    <SectionHeader num={3} title="AI-Style Insights" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
                        {report.insights.slice(0, 8).map((insight, i) => (
                            <div key={i} style={{
                                padding: '12px 16px', borderRadius: 10,
                                background: 'rgba(139, 92, 246, 0.05)',
                                border: '1px solid rgba(139, 92, 246, 0.15)',
                            }}>
                                <p style={{ color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 600, margin: '0 0 2px' }}>{insight.title}</p>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', margin: 0, lineHeight: 1.55 }}>{insight.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 4: Data Sample */}
                <section>
                    <SectionHeader num={4} title="Data Sample (First 10 Rows)" />
                    <div style={{ overflowX: 'auto', marginTop: 14, borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                            <thead>
                                <tr>
                                    {columns.slice(0, 6).map(col => (
                                        <th key={col.key} style={{
                                            padding: '9px 12px', textAlign: 'left',
                                            background: 'rgba(255,255,255,0.04)',
                                            color: 'var(--text-muted)', fontSize: '0.68rem',
                                            fontWeight: 700, textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            borderBottom: '1px solid var(--border-subtle)',
                                        }}>{col.key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.slice(0, 10).map((row, i) => (
                                    <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                                        {columns.slice(0, 6).map(col => (
                                            <td key={col.key} style={{
                                                padding: '8px 12px', color: 'var(--text-secondary)',
                                                borderBottom: '1px solid rgba(255,255,255,0.03)', whiteSpace: 'nowrap',
                                            }}>
                                                {row[col.key] !== undefined ? String(row[col.key]) : '–'}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Section 5: Conclusion */}
                <section>
                    <SectionHeader num={5} title="Conclusion" />
                    <div style={{
                        marginTop: 14, padding: '16px 20px', borderRadius: 12,
                        background: 'rgba(59,130,246,0.05)',
                        border: '1px solid rgba(59,130,246,0.15)',
                    }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.75, margin: 0 }}>
                            {report.summary} The dataset includes {report.numericColumns.length > 0 ? `${report.numericColumns.length} numeric field(s) (${report.numericColumns.slice(0, 3).join(', ')})` : 'no numeric fields'} and {report.categoricalColumns.length > 0 ? `${report.categoricalColumns.length} categorical field(s) for segmentation analysis` : 'no categorical fields'}. {report.insights.length > 0 ? `Key finding: ${report.insights[1]?.description ?? report.insights[0]?.description}` : ''} This report was generated automatically using rule‑based analysis with no external AI APIs.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

function SectionHeader({ num, title }: { num: number; title: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
                width: 26, height: 26, borderRadius: 6,
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 800, color: 'white', flexShrink: 0,
            }}>
                {num}
            </div>
            <h2 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 700, margin: 0 }}>{title}</h2>
        </div>
    );
}
