'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Search, Image as ImageIcon, FileText, Code, QrCode, ArrowRight, Star, History, Sparkles } from 'lucide-react';
import { QUICK_TOOLS, CATEGORIES, ToolDef } from '@/lib/toolsRegistry';

export default function QuickToolsSection() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [recentlyUsed, setRecentlyUsed] = useState<ToolDef[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('recently_used_tools');
        if (stored) {
            const list: string[] = JSON.parse(stored);
            const mapped = list
                .map(slug => QUICK_TOOLS.find(t => t.slug === slug))
                .filter((t): t is ToolDef => !!t);
            setRecentlyUsed(mapped);
        }
    }, []);

    // Filter tools
    const filteredTools = useMemo(() => {
        return QUICK_TOOLS.filter(t => {
            const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 t.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const displayTools = useMemo(() => {
        // If searching or category is not All, show all filtered
        if (searchQuery || selectedCategory !== 'All') {
            return filteredTools;
        }
        // By default on homepage, show featured and popular
        return QUICK_TOOLS.filter(t => t.isFeatured || t.isPopular).slice(0, 8);
    }, [filteredTools, searchQuery, selectedCategory]);

    return (
        <section className="section" style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-low)', position: 'relative' }}>
            <div className="container">
                
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <span className="badge" style={{ marginBottom: 14, background: 'rgba(186,158,255,0.08)', color: '#ba9eff', border: '1px solid rgba(186,158,255,0.2)' }}>
                        ⚡ Quick Tools
                    </span>
                    <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
                        ⚡ Quick Utility Tools
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: 520, margin: '12px auto 0', lineHeight: 1.7, fontSize: '0.9rem' }}>
                        Process files, images, PDFs, formats, and calculations 100% locally in your browser. Complete privacy guarantee.
                    </p>
                </div>

                {/* Search & Tabs Controls */}
                <div style={{
                    background: 'rgba(23, 26, 30, 0.4)', border: '1px solid var(--border-subtle)',
                    borderRadius: 20, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16,
                    marginBottom: 28, backdropFilter: 'blur(10px)'
                }}>
                    {/* Search bar */}
                    <div style={{ position: 'relative' }}>
                        <input 
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search among 29+ tools (e.g. image compressor, QR code, word counter)..."
                            style={{
                                width: '100%', padding: '10px 14px 10px 38px', borderRadius: 8,
                                background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
                                color: 'var(--text-primary)', fontSize: '0.8rem', outline: 'none',
                            }}
                        />
                        <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: 14, top: '52%', transform: 'translateY(-50%)' }} />
                    </div>

                    {/* Filter categories */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {['All', ...CATEGORIES.map(c => c.name)].map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                style={{
                                    padding: '5px 12px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 600,
                                    background: selectedCategory === cat ? 'rgba(186,158,255,0.15)' : 'transparent',
                                    border: `1px solid ${selectedCategory === cat ? 'rgba(186,158,255,0.3)' : 'var(--border-subtle)'}`,
                                    color: selectedCategory === cat ? '#ba9eff' : 'var(--text-secondary)',
                                    cursor: 'pointer', transition: 'all 0.2s',
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Recently Used Sub-section */}
                {recentlyUsed.length > 0 && !searchQuery && selectedCategory === 'All' && (
                    <div style={{ marginBottom: 28 }}>
                        <h4 style={subSectionTitleStyle}><History size={13} style={{ marginRight: 6 }} /> Recently Used Tools</h4>
                        <div style={gridStyle}>
                            {recentlyUsed.map(tool => <HomepageToolCard key={tool.slug} tool={tool} />)}
                        </div>
                    </div>
                )}

                {/* Main tools listing */}
                <div>
                    {!searchQuery && selectedCategory === 'All' ? (
                        <>
                            <h4 style={subSectionTitleStyle}><Star size={13} style={{ marginRight: 6 }} /> Popular &amp; Featured Tools</h4>
                            <div style={gridStyle}>
                                {displayTools.map(tool => <HomepageToolCard key={tool.slug} tool={tool} />)}
                            </div>
                        </>
                    ) : (
                        <>
                            <h4 style={subSectionTitleStyle}><Sparkles size={13} style={{ marginRight: 6 }} /> Filtered Tools ({filteredTools.length})</h4>
                            <div style={gridStyle}>
                                {displayTools.map(tool => <HomepageToolCard key={tool.slug} tool={tool} />)}
                            </div>
                        </>
                    )}
                </div>

                {/* Footer link */}
                <div style={{ textAlign: 'center', marginTop: 32 }}>
                    <Link href="/tools" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        Browse All 29+ Tools <ArrowRight size={14} />
                    </Link>
                </div>

            </div>
        </section>
    );
}

function HomepageToolCard({ tool }: { tool: ToolDef }) {
    const CategoryIcon = tool.category === 'Image Tools' ? ImageIcon : FileText;
    
    const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
        'Image Tools': { bg: 'rgba(236,72,153,0.06)', border: 'rgba(236,72,153,0.15)', text: '#ec4899' },
        'PDF Tools': { bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.15)', text: '#ef4444' },
        'Text Tools': { bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.15)', text: '#f59e0b' },
        'Developer Tools': { bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.15)', text: '#10b981' },
        'Utility Tools': { bg: 'rgba(59,130,246,0.06)', border: 'rgba(59,130,246,0.15)', text: '#3b82f6' },
        'Student Tools': { bg: 'rgba(99,102,241,0.06)', border: 'rgba(99,102,241,0.15)', text: '#6366f1' },
        'Business Tools': { bg: 'rgba(244,63,94,0.06)', border: 'rgba(244,63,94,0.15)', text: '#f43f5e' },
        'Food Technology': { bg: 'rgba(139,92,246,0.06)', border: 'rgba(139,92,246,0.15)', text: '#8b5cf6' },
        'Shareable Tools': { bg: 'rgba(14,165,233,0.06)', border: 'rgba(14,165,233,0.15)', text: '#0ea5e9' }
    };
    const colors = categoryColors[tool.category] || { bg: 'rgba(255,255,255,0.02)', border: 'var(--border-subtle)', text: 'var(--text-secondary)' };

    return (
        <Link href={`/tools/${tool.slug}`} style={{ textDecoration: 'none' }}>
            <div 
                className="glass-card glass-card-hover" 
                style={{ 
                    padding: 16, 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    border: '1px solid var(--border-subtle)',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                }}
            >
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <div style={{
                            width: 28, height: 28, borderRadius: 6,
                            background: colors.bg, border: `1px solid ${colors.border}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <CategoryIcon size={14} color={colors.text} />
                        </div>
                        <div style={{ display: 'flex', gap: 4 }}>
                            {tool.isPopular && <span style={miniBadgeStyle('#8455ef')}>POPULAR</span>}
                            <span style={miniBadgeStyle(tool.badge === 'NEW' ? '#10b981' : 'rgba(255,255,255,0.05)')}>
                                {tool.badge}
                            </span>
                        </div>
                    </div>

                    <h4 style={{ fontFamily: 'var(--font-manrope)', fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px' }}>
                        {tool.name}
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.72rem', lineHeight: 1.4, margin: 0 }}>
                        {tool.description}
                    </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', fontWeight: 700, color: colors.text, marginTop: 12 }}>
                    Open Tool <ArrowRight size={10} />
                </div>
            </div>
        </Link>
    );
}

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 14,
};

const subSectionTitleStyle: React.CSSProperties = {
    margin: '0 0 12px',
    fontSize: '0.78rem',
    fontWeight: 800,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    display: 'flex',
    alignItems: 'center',
};

const miniBadgeStyle = (color: string): React.CSSProperties => ({
    fontSize: '0.58rem',
    fontWeight: 800,
    color: color === 'rgba(255,255,255,0.05)' ? 'var(--text-secondary)' : '#000',
    background: color === 'rgba(255,255,255,0.05)' ? 'rgba(255,255,255,0.04)' : color,
    border: color === 'rgba(255,255,255,0.05)' ? '1px solid var(--border-subtle)' : 'none',
    padding: '1px 5px',
    borderRadius: 4,
});
