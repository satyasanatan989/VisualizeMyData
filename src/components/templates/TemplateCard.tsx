'use client';

import React from 'react';

export interface TemplateDataset {
    id: string;
    title: string;
    description: string;
    category: string;
    csvContent: string;
    accentColor: string;
    accentBg: string;
    chartType: 'bar' | 'line' | 'pie' | 'area';
    previewData: { name: string; value: number }[];
}

interface TemplateCardProps {
    template: TemplateDataset;
    onUseTemplate: (template: TemplateDataset) => void;
}

/** Tiny inline SVG bar chart preview — no recharts, no extra bundle */
function MiniBarPreview({ data, color }: { data: { name: string; value: number }[]; color: string }) {
    const max = Math.max(...data.map(d => d.value));
    const w = 200, h = 80, barW = Math.floor((w - (data.length + 1) * 6) / data.length);
    return (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
            {data.map((d, i) => {
                const barH = Math.round((d.value / max) * (h - 10));
                const x = 6 + i * (barW + 6);
                const y = h - barH;
                return (
                    <g key={i}>
                        <rect x={x} y={y} width={barW} height={barH} rx={3} fill={color} opacity={0.85} />
                    </g>
                );
            })}
        </svg>
    );
}

export default function TemplateCard({ template, onUseTemplate }: TemplateCardProps) {
    return (
        <div style={{
            borderRadius: 18,
            border: `1px solid ${template.accentColor}25`,
            background: 'var(--bg-card)',
            overflow: 'hidden',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'default',
        }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px ${template.accentColor}20`;
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
            }}
        >
            {/* Preview area */}
            <div style={{
                height: 130, background: template.accentBg,
                display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                padding: '16px 20px 0', borderBottom: `1px solid ${template.accentColor}18`,
                position: 'relative', overflow: 'hidden',
            }}>
                {/* Glow */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${template.accentColor}18, transparent 70%)`, pointerEvents: 'none' }} />
                <MiniBarPreview data={template.previewData} color={template.accentColor} />
            </div>

            {/* Info */}
            <div style={{ padding: '18px 20px 20px' }}>
                {/* Category badge */}
                <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: template.accentColor, background: template.accentBg, padding: '3px 9px', borderRadius: 99, display: 'inline-block', marginBottom: 10 }}>
                    {template.category}
                </span>
                <h3 style={{ fontSize: '0.975rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px' }}>{template.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 18px' }}>{template.description}</p>
                <button
                    onClick={() => onUseTemplate(template)}
                    style={{
                        width: '100%', padding: '9px 0', borderRadius: 9, fontSize: '0.82rem', fontWeight: 700,
                        background: `linear-gradient(135deg, ${template.accentColor}, ${template.accentColor}cc)`,
                        color: '#fff', border: 'none', cursor: 'pointer',
                        boxShadow: `0 4px 14px ${template.accentColor}30`,
                        transition: 'opacity 0.15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
                >
                    ✦ Use Template
                </button>
            </div>
        </div>
    );
}
