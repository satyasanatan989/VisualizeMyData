'use client';

import React from 'react';
import { Palette, RefreshCw } from 'lucide-react';

interface ColorPaletteGeneratorProps {
    currentPalette: string[];
    onPaletteChange: (colors: string[]) => void;
}

const THEME_PRESETS = {
    dark: {
        label: '🌌 Astra Dark',
        colors: ['#ba9eff', '#8455ef', '#9093ff', '#40ceed', '#3b82f6', '#0ea5e9'],
    },
    pastel: {
        label: '🌸 Soft Pastel',
        colors: ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff', '#e8c4ff'],
    },
    corporate: {
        label: '💼 Corporate Slate',
        colors: ['#1e3a8a', '#3b82f6', '#475569', '#64748b', '#94a3b8', '#cbd5e1'],
    },
    neon: {
        label: '⚡ Tech Neon',
        colors: ['#39ff14', '#ff007f', '#00e5ff', '#fff01f', '#8a2be2', '#ff4500'],
    },
};

export default function ColorPaletteGenerator({ currentPalette, onPaletteChange }: ColorPaletteGeneratorProps) {
    const handleShuffle = () => {
        const randomColors = Array.from({ length: 6 }, () => {
            const hex = Math.floor(Math.random() * 16777215).toString(16);
            return '#' + hex.padStart(6, '0');
        });
        onPaletteChange(randomColors);
    };

    return (
        <div style={{
            padding: '16px 20px',
            borderRadius: 14,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            marginBottom: 16,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Palette size={16} color="var(--text-muted)" />
                <span style={{ color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    🎨 Chart Theme Generator
                </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
                
                {/* Theme presets */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {Object.entries(THEME_PRESETS).map(([key, theme]) => {
                        const isSelected = JSON.stringify(currentPalette) === JSON.stringify(theme.colors);
                        return (
                            <button
                                key={key}
                                onClick={() => onPaletteChange(theme.colors)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6,
                                    padding: '6px 12px',
                                    borderRadius: 8,
                                    fontSize: '0.72rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    background: isSelected ? 'rgba(186,158,255,0.12)' : 'transparent',
                                    border: `1px solid ${isSelected ? 'rgba(186,158,255,0.3)' : 'var(--border-subtle)'}`,
                                    color: isSelected ? '#ba9eff' : 'var(--text-secondary)',
                                }}
                            >
                                {theme.label}
                            </button>
                        );
                    })}
                </div>

                {/* Shuffle / Colors preview */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {/* Colors Preview */}
                    <div style={{ display: 'flex', gap: 4 }}>
                        {currentPalette.slice(0, 6).map((color, i) => (
                            <span 
                                key={i} 
                                style={{
                                    width: 14, height: 14, borderRadius: '50%', background: color,
                                    boxShadow: '0 0 8px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)'
                                }}
                            />
                        ))}
                    </div>

                    {/* Shuffle button */}
                    <button
                        onClick={handleShuffle}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 5,
                            padding: '6px 12px', borderRadius: 8, fontSize: '0.72rem', fontWeight: 600,
                            background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)',
                            color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                    >
                        <RefreshCw size={12} /> Shuffle Colors
                    </button>
                </div>

            </div>
        </div>
    );
}
