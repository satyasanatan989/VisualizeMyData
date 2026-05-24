'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DataInsight } from '@/lib/dataInsightEngine';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface AIInsightsPanelProps {
    insights: DataInsight[];
    summary: string;
}

const severityStyles: Record<string, { bg: string; border: string; text: string; glow: string }> = {
    success: {
        bg: 'rgba(16, 185, 129, 0.04)',
        border: 'rgba(16, 185, 129, 0.15)',
        text: '#34d399',
        glow: 'rgba(16, 185, 129, 0.1)',
    },
    warning: {
        bg: 'rgba(251, 146, 60, 0.04)',
        border: 'rgba(251, 146, 60, 0.15)',
        text: '#fb923c',
        glow: 'rgba(251, 146, 60, 0.1)',
    },
    info: {
        bg: 'rgba(139, 92, 246, 0.04)',
        border: 'rgba(139, 92, 246, 0.15)',
        text: '#a78bfa',
        glow: 'rgba(139, 92, 246, 0.1)',
    },
};

export default function AIInsightsPanel({ insights, summary }: AIInsightsPanelProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    if (insights.length === 0) return null;

    const visibleInsights = isCollapsed ? insights.slice(0, 3) : insights;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                marginBottom: 24,
                borderRadius: 20,
                background: 'rgba(23, 26, 30, 0.4)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 30px rgba(139, 92, 246, 0.05)',
                overflow: 'hidden',
            }}
        >
            {/* Header */}
            <div 
                onClick={() => setIsCollapsed(!isCollapsed)}
                style={{
                    padding: '16px 24px',
                    borderBottom: '1px solid rgba(139, 92, 246, 0.15)',
                    background: 'rgba(139, 92, 246, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    cursor: 'pointer',
                    userSelect: 'none',
                }}
            >
                <div style={{
                    width: 32, height: 32, borderRadius: 10,
                    background: 'linear-gradient(135deg, #ba9eff, #8455ef)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 15px rgba(186, 158, 255, 0.4)',
                }}>
                    <Sparkles size={16} color="#000" />
                </div>
                <div>
                    <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>
                        Smart Data Insights
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: 0 }}>
                        In-browser statistical summaries &amp; trend analysis
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
                    <div style={{
                        padding: '4px 12px',
                        background: 'rgba(186, 158, 255, 0.12)',
                        border: '1px solid rgba(186, 158, 255, 0.2)',
                        borderRadius: 99,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#cdcdff',
                        letterSpacing: '0.05em',
                    }}>
                        {insights.length} INSIGHTS
                    </div>
                    {isCollapsed ? <ChevronDown size={18} color="var(--text-muted)" /> : <ChevronUp size={18} color="var(--text-muted)" />}
                </div>
            </div>

            {/* Summary */}
            <div style={{ padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.03)', background: 'rgba(0,0,0,0.1)' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
                    💡 <span style={{ color: 'var(--text-primary)' }}>Executive Summary:</span> {summary}
                </p>
            </div>

            {/* Insights grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 12,
                padding: '20px 24px 24px',
            }}>
                <AnimatePresence initial={false}>
                    {visibleInsights.map((insight, i) => {
                        const s = severityStyles[insight.severity] || severityStyles.info;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                transition={{ duration: 0.25, delay: i * 0.04 }}
                                whileHover={{ y: -3, scale: 1.01, borderColor: s.text, boxShadow: `0 8px 24px ${s.glow}` }}
                                style={{
                                    padding: '16px',
                                    borderRadius: 14,
                                    background: s.bg,
                                    border: `1px solid ${s.border}`,
                                    transition: 'border-color 0.2s, box-shadow 0.2s',
                                    cursor: 'default',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                    <span style={{ fontSize: '1.1rem' }}>{insight.icon}</span>
                                    <h4 style={{
                                        color: 'var(--text-primary)',
                                        fontSize: '0.85rem',
                                        fontWeight: 700,
                                        margin: 0,
                                    }}>
                                        {insight.title}
                                    </h4>
                                </div>
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.78rem',
                                    margin: 0,
                                    lineHeight: 1.6,
                                }}>
                                    {insight.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
            
            {insights.length > 3 && (
                <div 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    style={{
                        padding: '10px',
                        textAlign: 'center',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: 'var(--accent-primary)',
                        borderTop: '1px solid rgba(255,255,255,0.03)',
                        background: 'rgba(0,0,0,0.15)',
                        cursor: 'pointer',
                        userSelect: 'none',
                        transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.15)'; }}
                >
                    {isCollapsed ? `Show All ${insights.length} Insights` : 'Collapse Insights View'}
                </div>
            )}
        </motion.div>
    );
}
