'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Presentation, Copy, Check, Star, Sparkles } from 'lucide-react';
import { ParsedData } from '@/lib/excelParser';
import { InsightReport } from '@/lib/dataInsightEngine';
import { toast } from 'sonner';

interface DataStoryGeneratorProps {
    parsedData: ParsedData;
    report: InsightReport;
}

export default function DataStoryGenerator({ parsedData, report }: DataStoryGeneratorProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [copied, setCopied] = useState(false);

    const slides = useMemo(() => {
        const { fileName, rowCount, columns } = parsedData;
        const { insights, numericColumns, categoricalColumns } = report;

        // Extract specifics
        const highs = insights.filter(i => i.title.toLowerCase().includes('highest') || i.title.toLowerCase().includes('max'));
        const lows = insights.filter(i => i.title.toLowerCase().includes('lowest') || i.title.toLowerCase().includes('min'));
        const trends = insights.filter(i => i.type === 'trend');
        const categories = insights.filter(i => i.type === 'category');
        const anomalies = insights.filter(i => i.type === 'outlier' && i.title.toLowerCase().includes('anomal'));

        const deck = [
            {
                title: '📊 Executive Data Briefing',
                subtitle: `An automated presentation deck for ${fileName}`,
                content: [
                    `This presentation provides a rule-based executive summary analyzing the dataset "${fileName}".`,
                    `The dataset spans ${rowCount.toLocaleString()} records across ${columns.length} columns.`,
                    `Our engine identified ${numericColumns.length} numeric keys and ${categoricalColumns.length} categorical keys for study.`
                ],
                tag: 'Overview'
            },
            {
                title: '📐 Core Performance Metrics',
                subtitle: 'Key averages and distributions in your dataset',
                content: insights
                    .filter(i => i.title.toLowerCase().includes('average') || i.title.toLowerCase().includes('distribution'))
                    .map(i => i.description)
                    .slice(0, 3),
                tag: 'Averages'
            }
        ];

        // 3. Extremes (Highs and Lows)
        const extremesContent: string[] = [];
        if (highs.length > 0) extremesContent.push(highs[0].description);
        if (lows.length > 0) extremesContent.push(lows[0].description);
        if (extremesContent.length > 0) {
            deck.push({
                title: '⚡ Extremes & Outliers',
                subtitle: 'The highest and lowest records detected',
                content: extremesContent,
                tag: 'Extremes'
            });
        }

        // 4. Trends
        if (trends.length > 0) {
            deck.push({
                title: '📈 Growth & Velocity Trends',
                subtitle: 'Directional shifts across the sequence',
                content: trends.map(t => t.description).slice(0, 3),
                tag: 'Trends'
            });
        }

        // 5. Categories
        if (categories.length > 0) {
            deck.push({
                title: '🏆 Categorical Distributions',
                subtitle: 'Most frequent and dominant variables',
                content: categories.map(c => c.description).slice(0, 3),
                tag: 'Categories'
            });
        }

        // 6. Anomalies
        if (anomalies.length > 0) {
            deck.push({
                title: '⚠️ Anomalous Events',
                subtitle: 'Data points that deviate from average limits',
                content: anomalies.map(a => a.description),
                tag: 'Anomalies'
            });
        }

        // 7. Strategic Recommendations
        const recommendations: string[] = [];
        if (trends.length > 0) {
            const hasUpward = trends.some(t => t.title.toLowerCase().includes('upward') || t.title.toLowerCase().includes('increasing'));
            if (hasUpward) {
                recommendations.push("🚀 capitalize on positive momentum: Allocate additional resources or budgets to reinforce currently expanding variables.");
            } else {
                recommendations.push("⚠️ Formulate drop mitigation plans: Investigate declining metrics immediately to identify friction points.");
            }
        }
        if (anomalies.length > 0) {
            recommendations.push("🔬 Audit anomalous records: Check if data anomalies were caused by manual entry errors or genuine system spikes.");
        }
        if (categories.length > 0) {
            recommendations.push("🎯 Leverage leading segments: Optimize product offerings around your dominant category to maximize yield.");
        }
        if (recommendations.length === 0) {
            recommendations.push("📈 Continuous tracking: Maintain standard checks on your numeric indices to capture growth trends early.");
        }

        deck.push({
            title: '✨ Strategic Recommendations',
            subtitle: 'Action items derived from statistical facts',
            content: recommendations,
            tag: 'Action Plan'
        });

        return deck;
    }, [parsedData, report]);

    const handleCopyAll = () => {
        const text = slides.map((s, i) => `Slide ${i + 1}: ${s.title}\n${s.subtitle}\n${s.content.map(c => `- ${c}`).join('\n')}`).join('\n\n');
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success('Presentation story copied as text!');
        setTimeout(() => setCopied(false), 2000);
    };

    if (slides.length === 0) return null;

    const current = slides[currentSlide];

    return (
        <div style={{
            background: 'rgba(23, 26, 30, 0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--border-subtle)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            padding: 24,
            boxShadow: 'var(--shadow-ambient)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Header bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Presentation size={16} color="var(--text-muted)" />
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        📊 Data Story Generator
                    </span>
                </div>
                <button
                    onClick={handleCopyAll}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '6px 12px', borderRadius: 8, fontSize: '0.72rem', fontWeight: 600,
                        background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s',
                    }}
                >
                    {copied ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
                    {copied ? 'Copied Story!' : 'Copy Presentation'}
                </button>
            </div>

            {/* Slide container */}
            <div style={{
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.03)',
                borderRadius: 16,
                minHeight: 220,
                padding: '28px 24px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div style={{ display: 'inline-block', padding: '3px 8px', borderRadius: 4, background: 'rgba(186,158,255,0.08)', border: '1px solid rgba(186,158,255,0.15)', color: '#ba9eff', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                            {current.tag}
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                            {current.title}
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '4px 0 20px' }}>
                            {current.subtitle}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {current.content.map((point, index) => (
                                <div key={index} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                    <Sparkles size={12} color="#ba9eff" style={{ marginTop: 4, flexShrink: 0 }} />
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem', lineHeight: 1.55, margin: 0 }}>
                                        {point}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Slide Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                <button
                    onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                    disabled={currentSlide === 0}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px',
                        borderRadius: 8, fontSize: '0.75rem', fontWeight: 600, border: '1px solid var(--border-subtle)',
                        background: 'rgba(255,255,255,0.03)', color: 'var(--text-secondary)', cursor: 'pointer',
                        opacity: currentSlide === 0 ? 0.3 : 1, transition: 'all 0.2s',
                    }}
                >
                    <ChevronLeft size={14} /> Back
                </button>

                {/* Dots indicator */}
                <div style={{ display: 'flex', gap: 6 }}>
                    {slides.map((_, idx) => (
                        <span 
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            style={{
                                width: 8, height: 8, borderRadius: '50%',
                                background: idx === currentSlide ? '#ba9eff' : 'rgba(255,255,255,0.15)',
                                cursor: 'pointer', transition: 'all 0.2s'
                            }}
                        />
                    ))}
                </div>

                <button
                    onClick={() => setCurrentSlide(s => Math.min(slides.length - 1, s + 1))}
                    disabled={currentSlide === slides.length - 1}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px',
                        borderRadius: 8, fontSize: '0.75rem', fontWeight: 600, border: '1px solid var(--border-subtle)',
                        background: 'rgba(255,255,255,0.03)', color: 'var(--text-secondary)', cursor: 'pointer',
                        opacity: currentSlide === slides.length - 1 ? 0.3 : 1, transition: 'all 0.2s',
                    }}
                >
                    Next <ChevronRight size={14} />
                </button>
            </div>
        </div>
    );
}
