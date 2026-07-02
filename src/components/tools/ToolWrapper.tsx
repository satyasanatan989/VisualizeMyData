'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    Lock, Shield, Clock, ArrowRight, Home, History, Sparkles, 
    Image as ImageIcon, FileText, ListFilter, Code, QrCode, ChevronRight 
} from 'lucide-react';
import { ToolDef, getRelatedTools, QUICK_TOOLS, CATEGORIES } from '@/lib/toolsRegistry';
import { SEO_TOOLS_CONTENT } from '@/lib/seoToolsContent';
import { AdBannerMiddle } from '@/components/AdBanners';

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
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    
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
    const seoData = SEO_TOOLS_CONTENT[tool.slug];

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

                        {/* Mid-Page AdSense Banner (Disabled by default) */}
                        <AdBannerMiddle style={{ margin: '16px 0' }} />

                        {/* Rich SEO Content Section */}
                        {seoData && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 12 }}>
                                
                                {/* About Section */}
                                <div style={seoSectionStyle}>
                                    <h2 style={seoSectionTitleStyle}>About {tool.name}</h2>
                                    <p style={seoParagraphStyle}>{seoData.introduction}</p>
                                </div>

                                {/* How It Works Section */}
                                <div style={seoSectionStyle}>
                                    <h2 style={seoSectionTitleStyle}>How it Works</h2>
                                    <p style={seoParagraphStyle}>{seoData.howItWorks}</p>
                                </div>

                                {/* Features & Specs Grid */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="features-grid">
                                    <div style={seoInnerCardStyle}>
                                        <h3 style={seoSubTitleStyle}>Key Features</h3>
                                        <ul style={{ paddingLeft: 18, margin: 0, color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.7 }}>
                                            {seoData.features.map((feat: string, idx: number) => (
                                                <li key={idx} style={{ marginBottom: 6 }}>{feat}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div style={seoInnerCardStyle}>
                                        <h3 style={seoSubTitleStyle}>Technical Details</h3>
                                        <p style={{ ...seoParagraphStyle, fontSize: '0.82rem' }}>{seoData.technicalDetails}</p>
                                    </div>
                                </div>

                                {/* Use Cases */}
                                <div style={seoSectionStyle}>
                                    <h2 style={seoSectionTitleStyle}>Common Use Cases</h2>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        {seoData.useCases.map((useCase: string, idx: number) => (
                                            <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>•</span>
                                                <span style={{ lineHeight: 1.4 }}>{useCase}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* FAQ Section */}
                                {seoData.faqs && seoData.faqs.length > 0 && (
                                    <div style={seoSectionStyle}>
                                        <h2 style={seoSectionTitleStyle}>Frequently Asked Questions</h2>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                            {seoData.faqs.map((faq: { question: string; answer: string }, idx: number) => {
                                                const isOpen = openFaqIndex === idx;
                                                return (
                                                    <div 
                                                        key={idx} 
                                                        style={{ 
                                                            background: 'rgba(23, 26, 30, 0.4)', 
                                                            border: '1px solid var(--border-subtle)', 
                                                            borderRadius: 12, 
                                                            overflow: 'hidden',
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                    >
                                                        <button 
                                                            onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                                                            style={{ 
                                                                width: '100%', 
                                                                padding: '14px 18px', 
                                                                background: 'none', 
                                                                border: 'none', 
                                                                display: 'flex', 
                                                                justifyContent: 'space-between', 
                                                                alignItems: 'center', 
                                                                cursor: 'pointer',
                                                                textAlign: 'left',
                                                                color: isOpen ? 'var(--accent-primary)' : 'var(--text-primary)',
                                                                fontSize: '0.85rem',
                                                                fontWeight: 600,
                                                                transition: 'color 0.2s'
                                                            }}
                                                        >
                                                            <span>{faq.question}</span>
                                                            <span style={{ 
                                                                transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', 
                                                                transition: 'transform 0.2s',
                                                                fontSize: '1.1rem',
                                                                fontWeight: 300,
                                                                color: 'var(--text-muted)'
                                                            }}>+</span>
                                                        </button>
                                                        <div 
                                                            style={{ 
                                                                maxHeight: isOpen ? '250px' : '0px', 
                                                                overflow: 'hidden', 
                                                                transition: 'max-height 0.3s cubic-bezier(0, 1, 0, 1)' 
                                                            }}
                                                        >
                                                            <p style={{ 
                                                                margin: 0, 
                                                                padding: '0 18px 14px', 
                                                                fontSize: '0.82rem', 
                                                                color: 'var(--text-secondary)', 
                                                                lineHeight: 1.5 
                                                            }}>
                                                                {faq.answer}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
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
                @media (max-width: 600px) {
                    .features-grid {
                        grid-template-columns: 1fr !important;
                        gap: 16px !important;
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

// ── Shared SEO Content Styles ──

const seoSectionStyle: React.CSSProperties = {
    background: 'rgba(10, 18, 36, 0.15)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 16,
    padding: 24,
};

const seoSectionTitleStyle: React.CSSProperties = {
    fontSize: '1.15rem',
    fontWeight: 800,
    margin: '0 0 16px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-manrope)',
    letterSpacing: '-0.02em',
};

const seoSubTitleStyle: React.CSSProperties = {
    fontSize: '1.05rem',
    fontWeight: 700,
    margin: '0 0 12px',
    color: 'var(--text-primary)',
};

const seoParagraphStyle: React.CSSProperties = {
    fontSize: '0.88rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.65,
    margin: 0,
};

const seoInnerCardStyle: React.CSSProperties = {
    background: 'rgba(23, 26, 30, 0.3)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 16,
    padding: 20,
};
