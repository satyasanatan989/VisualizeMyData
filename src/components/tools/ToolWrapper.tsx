'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    Lock, Shield, Clock, ArrowRight, Home, History, Sparkles, 
    Image as ImageIcon, FileText, ListFilter, Code, QrCode, ChevronRight 
} from 'lucide-react';
import { ToolDef, getRelatedTools, QUICK_TOOLS, CATEGORIES } from '@/lib/toolsRegistry';

interface ToolWrapperProps {
    tool: ToolDef;
    children: React.ReactNode;
}

const ICON_MAP: Record<string, any> = {
    'Image': ImageIcon,
    'FileText': FileText,
    'ListFilter': ListFilter,
    'Code': Code,
    'QrCode': QrCode
};

export default function ToolWrapper({ tool, children }: ToolWrapperProps) {
    const [recentlyUsed, setRecentlyUsed] = useState<ToolDef[]>([]);
    
    // Track Recently Used Tools in localStorage
    useEffect(() => {
        const stored = localStorage.getItem('recently_used_tools');
        let list: string[] = stored ? JSON.parse(stored) : [];
        
        // Add current tool to list if not already there, limit to 4
        list = [tool.slug, ...list.filter(slug => slug !== tool.slug)].slice(0, 4);
        localStorage.setItem('recently_used_tools', JSON.stringify(list));

        // Map slugs back to definitions
        const mapped = list
            .map(slug => QUICK_TOOLS.find(t => t.slug === slug))
            .filter((t): t is ToolDef => !!t && t.slug !== tool.slug);
        
        setRecentlyUsed(mapped);
    }, [tool.slug]);

    const related = getRelatedTools(tool, 3);
    const CategoryIcon = tool.category === 'Image Tools' ? ImageIcon : FileText;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', paddingBottom: 80 }}>
            {/* Header / Breadcrumbs */}
            <div style={{ borderBottom: '1px solid var(--border-subtle)', background: 'rgba(2, 8, 23, 0.4)', backdropFilter: 'blur(10px)', padding: '24px 0' }}>
                <div className="container">
                    {/* Breadcrumbs */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 12 }}>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'inherit', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'inherit'}>
                            <Home size={11} /> Home
                        </Link>
                        <ChevronRight size={10} />
                        <Link href="/tools" style={{ color: 'inherit', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'inherit'}>
                            Tools
                        </Link>
                        <ChevronRight size={10} />
                        <span style={{ color: 'var(--text-secondary)' }}>{tool.category}</span>
                        <ChevronRight size={10} />
                        <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{tool.name}</span>
                    </div>

                    {/* Title */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <h1 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
                            {tool.name}
                        </h1>
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#000', background: 'linear-gradient(135deg, #ba9eff, #8455ef)', padding: '3px 8px', borderRadius: 4, textTransform: 'uppercase' }}>
                            {tool.badge}
                        </span>
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#10b981', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', padding: '2px 8px', borderRadius: 4 }}>
                            100% LOCAL
                        </span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, maxWidth: 640, lineHeight: 1.6 }}>
                        {tool.description}
                    </p>
                </div>
            </div>

            {/* Main grid */}
            <div className="container" style={{ marginTop: 32 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 1.1fr', gap: 32 }} className="tool-layout-grid">
                    
                    {/* Left: Main Tool workspace */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <div style={{
                            background: 'rgba(10, 18, 36, 0.25)', border: '1px solid var(--border-subtle)',
                            borderRadius: 20, padding: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                            backdropFilter: 'blur(8px)'
                        }}>
                            {children}
                        </div>

                        {/* Local execution notice */}
                        <div style={{ display: 'flex', gap: 12, padding: '16px 20px', borderRadius: 16, background: 'rgba(16,185,129,0.03)', border: '1px solid rgba(16,185,129,0.12)' }}>
                            <Shield size={16} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
                            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                <strong>Privacy Secured:</strong> This utility runs 100% inside your browser. No files, logs, or values are uploaded to any server. Your information stays safe on your device.
                            </p>
                        </div>
                    </div>

                    {/* Right: Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }} className="tool-sidebar">
                        
                        {/* 1. Privacy Badges card */}
                        <div style={sidebarCardStyle}>
                            <h4 style={sidebarTitleStyle}>🔒 Privacy Guarantee</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <PrivacyItem text="Files never leave your device" />
                                <PrivacyItem text="No login required" />
                                <PrivacyItem text="No database required" />
                                <PrivacyItem text="100% browser-based" />
                            </div>
                        </div>

                        {/* 2. Recently Used Tools */}
                        {recentlyUsed.length > 0 && (
                            <div style={sidebarCardStyle}>
                                <h4 style={sidebarTitleStyle}><History size={13} style={{ marginRight: 6 }} /> Recently Used</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {recentlyUsed.map(t => (
                                        <Link key={t.slug} href={`/tools/${t.slug}`} style={sidebarLinkStyle}>
                                            <span>{t.name}</span>
                                            <ArrowRight size={11} color="var(--text-muted)" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 3. Related Tools */}
                        {related.length > 0 && (
                            <div style={sidebarCardStyle}>
                                <h4 style={sidebarTitleStyle}><Sparkles size={13} style={{ marginRight: 6 }} /> Related Tools</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {related.map(t => (
                                        <Link key={t.slug} href={`/tools/${t.slug}`} style={sidebarLinkStyle}>
                                            <span>{t.name}</span>
                                            <ArrowRight size={11} color="var(--text-muted)" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 4. Quick Category Links */}
                        <div style={sidebarCardStyle}>
                            <h4 style={sidebarTitleStyle}>📂 Browse Categories</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {CATEGORIES.map(cat => (
                                    <Link key={cat.slug} href={`/tools?cat=${cat.name}`} style={sidebarLinkStyle}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span>{cat.icon}</span>
                                            <span>{cat.name}</span>
                                        </span>
                                        <ChevronRight size={11} color="var(--text-muted)" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .tool-layout-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .tool-sidebar {
                        margin-top: 16px;
                    }
                }
            `}</style>
        </div>
    );
}

function PrivacyItem({ text }: { text: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            <span style={{ color: '#10b981', fontWeight: 900 }}>✓</span>
            <span>{text}</span>
        </div>
    );
}

// ── Shared Sidebar Styles ──

const sidebarCardStyle: React.CSSProperties = {
    background: 'rgba(23, 26, 30, 0.45)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 16,
    padding: 18,
};

const sidebarTitleStyle: React.CSSProperties = {
    margin: '0 0 14px',
    fontSize: '0.8rem',
    fontWeight: 800,
    color: 'var(--text-primary)',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    display: 'flex',
    alignItems: 'center',
};

const sidebarLinkStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 10px',
    borderRadius: 8,
    background: 'rgba(255,255,255,0.01)',
    border: '1px solid transparent',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontSize: '0.78rem',
    fontWeight: 500,
    transition: 'all 0.2s',
};
