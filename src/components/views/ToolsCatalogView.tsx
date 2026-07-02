'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, Image as ImageIcon, FileText, ListFilter, Code, QrCode, 
    ChevronRight, Shield, Sparkles, Star, History, ArrowRight 
} from 'lucide-react';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import { QUICK_TOOLS, CATEGORIES, ToolDef } from '@/lib/toolsRegistry';

export default function ToolsCatalogView() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [recentlyUsed, setRecentlyUsed] = useState<ToolDef[]>([]);

    // Get recently used from localStorage on mount
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

    // Categories metadata with colors
    const categoryTabs = useMemo(() => {
        return ['All', ...CATEGORIES.map(c => c.name)];
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />

            {/* Hero Header */}
            <section style={{ padding: '60px 0 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', borderRadius: '50%' }} />
                </div>
                
                <div className="container" style={{ position: 'relative', maxWidth: 720 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 14px', borderRadius: 99, background: 'rgba(186,158,255,0.08)', border: '1px solid rgba(186,158,255,0.25)', fontSize: '0.7rem', fontWeight: 700, color: '#cdcdff', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 20 }}>
                        <Sparkles size={11} color="#ba9eff" /> Complete Utilities
                    </span>
                    <h1 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 16 }}>
                        Free Web Utility Tools
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 28px' }}>
                        Convert files, clean lists, compile PDFs, format JSON, and generate passwords locally. 100% browser-based. Zero data leaves your device.
                    </p>
                </div>
            </section>

            {/* Catalog workspace */}
            <main className="container" style={{ paddingBottom: 80 }}>
                
                {/* Search Bar & Filters */}
                <div style={{
                    background: 'rgba(23, 26, 30, 0.45)', border: '1px solid var(--border-subtle)',
                    borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 20,
                    marginBottom: 32, backdropFilter: 'blur(8px)'
                }}>
                    {/* Search Input */}
                    <div style={{ position: 'relative' }}>
                        <input 
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search tools (e.g. image compressor, word counter, qr generator)..."
                            style={{
                                width: '100%', padding: '12px 14px 12px 42px', borderRadius: 10,
                                background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
                                color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none',
                                transition: 'border-color 0.2s',
                            }}
                        />
                        <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                    </div>

                    {/* Category tabs */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {categoryTabs.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                style={{
                                    padding: '6px 14px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 600,
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

                {/* Recently Used Tools */}
                {recentlyUsed.length > 0 && !searchQuery && selectedCategory === 'All' && (
                    <div style={{ marginBottom: 40 }}>
                        <h3 style={sectionTitleStyle}><History size={16} style={{ marginRight: 8 }} /> Recently Used Tools</h3>
                        <div style={gridStyle}>
                            {recentlyUsed.map(tool => <ToolCard key={tool.slug} tool={tool} />)}
                        </div>
                    </div>
                )}

                {/* Featured / Popular Tools */}
                {!searchQuery && selectedCategory === 'All' && (
                    <div style={{ marginBottom: 40 }}>
                        <h3 style={sectionTitleStyle}><Star size={16} style={{ marginRight: 8 }} /> Featured Utilities</h3>
                        <div style={gridStyle}>
                            {QUICK_TOOLS.filter(t => t.isFeatured).map(tool => <ToolCard key={tool.slug} tool={tool} />)}
                        </div>
                    </div>
                )}

                {/* Main tools list */}
                <div>
                    <h3 style={sectionTitleStyle}>
                        {selectedCategory === 'All' ? '📂 All Tools Directory' : `${selectedCategory}`} ({filteredTools.length})
                    </h3>
                    
                    <div style={gridStyle}>
                        {filteredTools.map(tool => <ToolCard key={tool.slug} tool={tool} />)}
                    </div>

                    {filteredTools.length === 0 && (
                        <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 60, border: '1px dashed var(--border-subtle)', borderRadius: 16 }}>
                            No tools match your search query. Try searching for other keywords.
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

// ── Shared Card Component ──

function ToolCard({ tool }: { tool: ToolDef }) {
    const CategoryIcon = tool.category === 'Image Tools' ? ImageIcon : FileText;
    
    // Choose color theme based on category
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
                    padding: 20, 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    border: '1px solid var(--border-subtle)',
                    transition: 'all 0.25s'
                }}
            >
                <div>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <div style={{
                            width: 32, height: 32, borderRadius: 8,
                            background: colors.bg, border: `1px solid ${colors.border}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <CategoryIcon size={16} color={colors.text} />
                        </div>
                        <div style={{ display: 'flex', gap: 4 }}>
                            {tool.isPopular && <span style={miniBadgeStyle('#8455ef')}>POPULAR</span>}
                            <span style={miniBadgeStyle(tool.badge === 'NEW' ? '#10b981' : 'rgba(255,255,255,0.05)')}>
                                {tool.badge}
                            </span>
                        </div>
                    </div>

                    <h4 style={{ fontFamily: 'var(--font-manrope)', fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px' }}>
                        {tool.name}
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>
                        {tool.description}
                    </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontWeight: 700, color: colors.text, marginTop: 14 }}>
                    Try Tool <ArrowRight size={12} />
                </div>
            </div>
        </Link>
    );
}

// ── Styles ──

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 16,
};

const sectionTitleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-manrope)',
    color: 'var(--text-primary)',
    fontSize: '1.15rem',
    fontWeight: 800,
    marginBottom: 16,
    display: 'flex',
    alignItems: 'center',
};

const miniBadgeStyle = (color: string): React.CSSProperties => ({
    fontSize: '0.6rem',
    fontWeight: 800,
    color: color === 'rgba(255,255,255,0.05)' ? 'var(--text-secondary)' : '#000',
    background: color === 'rgba(255,255,255,0.05)' ? 'rgba(255,255,255,0.04)' : color,
    border: color === 'rgba(255,255,255,0.05)' ? '1px solid var(--border-subtle)' : 'none',
    padding: '2px 6px',
    borderRadius: 4,
    letterSpacing: '0.04em',
});
