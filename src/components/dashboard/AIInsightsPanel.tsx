'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DataInsight } from '@/lib/dataInsightEngine';

interface AIInsightsPanelProps {
    insights: DataInsight[];
    summary: string;
}

const severityStyles: Record<string, { bg: string; border: string; badge: string }> = {
    success: {
        bg: 'rgba(16, 185, 129, 0.06)',
        border: 'rgba(16, 185, 129, 0.2)',
        badge: '#10b981',
    },
    warning: {
        bg: 'rgba(251, 146, 60, 0.06)',
        border: 'rgba(251, 146, 60, 0.2)',
        badge: '#fb923c',
    },
    info: {
        bg: 'rgba(59, 130, 246, 0.06)',
        border: 'rgba(59, 130, 246, 0.2)',
        badge: '#3b82f6',
    },
};

export default function AIInsightsPanel({ insights, summary }: AIInsightsPanelProps) {
    if (insights.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                marginBottom: 24,
                borderRadius: 20,
                background: 'rgba(139, 92, 246, 0.04)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                overflow: 'hidden',
            }}
        >
            {/* Header */}
            <div style={{
                padding: '16px 24px',
                borderBottom: '1px solid rgba(139, 92, 246, 0.15)',
                background: 'rgba(139, 92, 246, 0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
            }}>
                <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem',
                }}>
                    🧠
                </div>
                <div>
                    <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>
                        AI-Style Data Insights
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: 0 }}>
                        Rule-based analysis — no external API
                    </p>
                </div>
                <div style={{
                    marginLeft: 'auto',
                    padding: '4px 12px',
                    background: 'rgba(139, 92, 246, 0.15)',
                    borderRadius: 99,
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: '#a78bfa',
                    letterSpacing: '0.05em',
                }}>
                    {insights.length} INSIGHTS
                </div>
            </div>

            {/* Summary */}
            <div style={{ padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, lineHeight: 1.6 }}>
                    {summary}
                </p>
            </div>

            {/* Insights grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 12,
                padding: '16px 24px 20px',
            }}>
                {insights.map((insight, i) => {
                    const s = severityStyles[insight.severity] || severityStyles.info;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            style={{
                                padding: '14px 16px',
                                borderRadius: 12,
                                background: s.bg,
                                border: `1px solid ${s.border}`,
                            }}
                        >
                            <p style={{
                                color: 'var(--text-primary)',
                                fontSize: '0.825rem',
                                fontWeight: 700,
                                margin: '0 0 4px',
                            }}>
                                {insight.title}
                            </p>
                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '0.78rem',
                                margin: 0,
                                lineHeight: 1.55,
                            }}>
                                {insight.description}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
