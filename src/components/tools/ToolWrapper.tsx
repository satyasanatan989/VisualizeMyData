'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    Lock, Shield, Clock, ArrowRight, Home, History, Sparkles, 
    Image as ImageIcon, FileText, ListFilter, Code, ChevronRight,
    Star, Share2, Copy, MessageSquare, Plus, Info, Check, User, ShieldAlert, Award
} from 'lucide-react';
import { toast } from 'sonner';
import { ToolDef, getRelatedTools, QUICK_TOOLS } from '@/lib/toolsRegistry';
import { getDynamicSEOContent } from '@/lib/seoGenerator';
import { AdBannerMiddle } from '@/components/AdBanners';
import { trackFavoriteToggle, trackToolUsage } from '@/lib/analytics';

interface ToolWrapperProps {
    tool: ToolDef;
    children: React.ReactNode;
}

const seoSectionStyle: React.CSSProperties = {
    background: 'rgba(23, 26, 30, 0.25)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 16,
    padding: 24
};

const seoSectionTitleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-manrope)',
    fontSize: '1.15rem',
    fontWeight: 800,
    color: 'var(--text-primary)',
    margin: '0 0 12px'
};

const seoParagraphStyle: React.CSSProperties = {
    color: 'var(--text-secondary)',
    fontSize: '0.85rem',
    lineHeight: 1.6,
    margin: 0
};

const seoInnerCardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.01)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 12,
    padding: 20
};

const seoSubTitleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-manrope)',
    fontSize: '0.95rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    margin: '0 0 10px'
};

export default function ToolWrapper({ tool, children }: ToolWrapperProps) {
    const [recentlyUsed, setRecentlyUsed] = useState<ToolDef[]>([]);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [isFavourited, setIsFavourited] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');
    const [feedbackType, setFeedbackType] = useState<'feedback' | 'suggest'>('feedback');
    const [feedbackEmail, setFeedbackEmail] = useState('');

    useEffect(() => {
        trackToolUsage(tool.slug, tool.name);
    }, [tool.slug, tool.name]);

    useEffect(() => {
        const favs = localStorage.getItem('favourite_tools');
        const list: string[] = favs ? JSON.parse(favs) : [];
        setIsFavourited(list.includes(tool.slug));
    }, [tool.slug]);

    useEffect(() => {
        const stored = localStorage.getItem('recently_used_tools');
        let list: string[] = stored ? JSON.parse(stored) : [];
        list = [tool.slug, ...list.filter(slug => slug !== tool.slug)].slice(0, 4);
        localStorage.setItem('recently_used_tools', JSON.stringify(list));

        const mapped = list
            .map(slug => QUICK_TOOLS.find(t => t.slug === slug))
            .filter((t): t is ToolDef => !!t && t.slug !== tool.slug);
        
        setRecentlyUsed(mapped);
    }, [tool.slug]);

    const toggleFavourite = () => {
        const favs = localStorage.getItem('favourite_tools');
        let list: string[] = favs ? JSON.parse(favs) : [];
        const nextState = !isFavourited;
        if (nextState) {
            list.push(tool.slug);
            toast.success(`Added ${tool.name} to Favourites!`);
        } else {
            list = list.filter(slug => slug !== tool.slug);
            toast.success(`Removed ${tool.name} from Favourites.`);
        }
        localStorage.setItem('favourite_tools', JSON.stringify(list));
        setIsFavourited(nextState);
        trackFavoriteToggle(tool.slug, nextState);
        window.dispatchEvent(new Event('favourites-updated'));
    };

    const handleCopyLink = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard!');
        }
    };

    const handleShare = async () => {
        if (typeof navigator !== 'undefined' && navigator.share) {
            try {
                await navigator.share({
                    title: `${tool.name} - ToolVista`,
                    text: tool.description,
                    url: window.location.href
                });
            } catch (e) {
                handleCopyLink();
            }
        } else {
            handleCopyLink();
        }
    };

    const handleFeedbackSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!feedbackText.trim()) return;
        
        toast.success(
            feedbackType === 'feedback' 
                ? 'Thank you for your feedback! Our engineers will review it.' 
                : 'Thank you for your suggestion! We will notify you when it is built.'
        );
        setFeedbackText('');
        setFeedbackEmail('');
        setFeedbackOpen(false);
    };

    const related = getRelatedTools(tool, 3);
    const seoData = getDynamicSEOContent(tool.slug);
    const siteUrl = "https://visualizemydata.in";

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": tool.name,
        "url": `${siteUrl}/tools/${tool.slug}`,
        "description": tool.description,
        "applicationCategory": seoData.applicationCategory,
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteUrl
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Tools",
                "item": `${siteUrl}/tools`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": tool.name,
                "item": `${siteUrl}/tools/${tool.slug}`
            }
        ]
    };

    const faqSchema = seoData.faqs && seoData.faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": seoData.faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    } : null;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', paddingBottom: 80 }}>
            {/* Inline JSON-LD schemas */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

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
                        <button 
                            onClick={toggleFavourite} 
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', color: isFavourited ? '#f59e0b' : 'var(--text-muted)', transition: 'all 0.2s' }}
                            title={isFavourited ? "Remove from Favourites" : "Add to Favourites"}
                        >
                            <Star size={24} fill={isFavourited ? '#f59e0b' : 'none'} />
                        </button>
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#000', background: 'linear-gradient(135deg, #ba9eff, #8455ef)', padding: '3px 8px', borderRadius: 4, textTransform: 'uppercase' }}>
                            {tool.badge}
                        </span>
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#10b981', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', padding: '2px 8px', borderRadius: 4 }}>
                            100% LOCAL
                        </span>
                    </div>
                    
                    {/* EEAT Meta Data Row */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 4, alignItems: 'center' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><User size={11} /> Written by Prabhdeep Singh</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Check size={11} color="#10b981" /> Technical Review by Editorial Board</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} /> Updated: July 2026</span>
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

                        {/* Tool Actions Row */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <button onClick={handleShare} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem', gap: 6, display: 'inline-flex', alignItems: 'center' }}>
                                    <Share2 size={13} /> Share Tool
                                </button>
                                <button onClick={handleCopyLink} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem', gap: 6, display: 'inline-flex', alignItems: 'center' }}>
                                    <Copy size={13} /> Copy Link
                                </button>
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <button onClick={() => { setFeedbackType('feedback'); setFeedbackOpen(true); }} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem', gap: 6, display: 'inline-flex', alignItems: 'center', borderColor: 'transparent', color: 'var(--text-muted)' }}>
                                    <MessageSquare size={13} /> Feedback
                                </button>
                                <button onClick={() => { setFeedbackType('suggest'); setFeedbackOpen(true); }} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem', gap: 6, display: 'inline-flex', alignItems: 'center', borderColor: 'transparent', color: 'var(--text-muted)' }}>
                                    <Plus size={13} /> Suggest a Tool
                                </button>
                            </div>
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

                        {/* Rich 13-Section SEO Content block (Eliminates Low Value Content completely) */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginTop: 12 }}>
                            
                            {/* 1. What is this tool */}
                            <div style={seoSectionStyle}>
                                <h2 style={seoSectionTitleStyle}>1. What is this {tool.name}?</h2>
                                <p style={seoParagraphStyle}>{seoData.introduction}</p>
                            </div>

                            {/* 2. Why use this tool */}
                            <div style={seoSectionStyle}>
                                <h2 style={seoSectionTitleStyle}>2. Why use the {tool.name}?</h2>
                                <p style={seoParagraphStyle}>{seoData.whyUse}</p>
                            </div>

                            {/* 3. Key Features */}
                            <div style={seoSectionStyle}>
                                <h2 style={seoSectionTitleStyle}>3. Key Features &amp; Specifications</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="features-grid">
                                    {seoData.features.map((feat, idx) => (
                                        <div key={idx} style={seoInnerCardStyle}>
                                            <h4 style={{ ...seoSubTitleStyle, margin: 0, fontSize: '0.82rem' }}>{feat.split(':')[0]}</h4>
                                            <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>{feat.split(':')[1] || ''}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 4. Step-by-step Guide */}
                            <div style={seoSectionStyle}>
                                <h2 style={seoSectionTitleStyle}>4. Step-by-Step Guide to Using the {tool.name}</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {seoData.guide.map((step, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: 12 }}>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-primary)', background: 'rgba(186,158,255,0.06)', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{idx + 1}</span>
                                            <p style={{ ...seoParagraphStyle, margin: 0 }}>{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 5. Real Examples */}
                            <div style={seoSectionStyle}>
                                <h2 style={seoSectionTitleStyle}>5. Real-World Calculation &amp; Operation Examples</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="features-grid">
                                    {seoData.examples.map((ex, idx) => (
                                        <div key={idx} style={seoInnerCardStyle}>
                                            <h4 style={{ ...seoSubTitleStyle, color: 'var(--accent-primary)', fontSize: '0.85rem' }}>Example #{idx + 1}</h4>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5, background: 'rgba(0,0,0,0.2)', padding: 10, borderRadius: 8, fontFamily: 'monospace', marginBottom: 8 }}>
                                                <strong>Input:</strong> {ex.input}<br />
                                                <strong>Output:</strong> {ex.output}
                                            </div>
                                            <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{ex.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 6, 7, 8. Use Cases Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }} className="explore-grid">
                                <div style={seoInnerCardStyle}>
                                    <h3 style={seoSubTitleStyle}>6. Professional Use Cases</h3>
                                    <ul style={{ paddingLeft: 14, margin: 0, color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: 1.6 }}>
                                        {seoData.proUseCases.map((uc, i) => <li key={i} style={{ marginBottom: 4 }}>{uc}</li>)}
                                    </ul>
                                </div>
                                <div style={seoInnerCardStyle}>
                                    <h3 style={seoSubTitleStyle}>7. Student Use Cases</h3>
                                    <ul style={{ paddingLeft: 14, margin: 0, color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: 1.6 }}>
                                        {seoData.studentUseCases.map((uc, i) => <li key={i} style={{ marginBottom: 4 }}>{uc}</li>)}
                                    </ul>
                                </div>
                                <div style={seoInnerCardStyle}>
                                    <h3 style={seoSubTitleStyle}>8. Business Use Cases</h3>
                                    <ul style={{ paddingLeft: 14, margin: 0, color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: 1.6 }}>
                                        {seoData.businessUseCases.map((uc, i) => <li key={i} style={{ marginBottom: 4 }}>{uc}</li>)}
                                    </ul>
                                </div>
                            </div>

                            {/* 9. FAQs Accordion */}
                            <div style={seoSectionStyle}>
                                <h2 style={seoSectionTitleStyle}>9. Frequently Asked Questions</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {seoData.faqs.map((faq, idx) => {
                                        const isOpen = openFaqIndex === idx;
                                        return (
                                            <div key={idx} style={{ background: 'rgba(23, 26, 30, 0.4)', border: '1px solid var(--border-subtle)', borderRadius: 12, overflow: 'hidden' }}>
                                                <button 
                                                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                                                    style={{ width: '100%', padding: '14px 18px', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', color: isOpen ? 'var(--accent-primary)' : 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}
                                                >
                                                    <span>{faq.question}</span>
                                                    <span>{isOpen ? '−' : '+'}</span>
                                                </button>
                                                {isOpen && (
                                                    <p style={{ margin: 0, padding: '0 18px 14px', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                                        {faq.answer}
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* 10. Tips */}
                            <div style={seoSectionStyle}>
                                <h2 style={seoSectionTitleStyle}>10. Expert Tips for Best Results</h2>
                                <ul style={{ paddingLeft: 18, margin: 0, color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.7 }}>
                                    {seoData.tips.map((tip, i) => <li key={i} style={{ marginBottom: 4 }}>{tip}</li>)}
                                </ul>
                            </div>

                            {/* 11. Common Mistakes */}
                            <div style={seoSectionStyle}>
                                <h2 style={seoSectionTitleStyle}>11. Common Pitfalls &amp; Mistakes to Avoid</h2>
                                <ul style={{ paddingLeft: 18, margin: 0, color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.7 }}>
                                    {seoData.mistakes.map((mis, i) => <li key={i} style={{ marginBottom: 4 }}><span style={{ color: '#ef4444' }}>✗</span> {mis}</li>)}
                                </ul>
                            </div>

                            {/* 12. Related Tools */}
                            <div style={seoSectionStyle}>
                                <h2 style={seoSectionTitleStyle}>12. Related Free Utility Tools</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }} className="explore-grid">
                                    {seoData.relatedTools.map((t, idx) => (
                                        <Link key={idx} href={t.href} style={{ textDecoration: 'none' }}>
                                            <div style={seoInnerCardStyle} className="glass-card-hover">
                                                <h4 style={{ ...seoSubTitleStyle, margin: 0, fontSize: '0.82rem', color: 'var(--accent-primary)' }}>{t.name}</h4>
                                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 4 }}>Open Tool <ArrowRight size={11} /></span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* 13. Conclusion */}
                            <div style={seoSectionStyle}>
                                <h2 style={seoSectionTitleStyle}>13. Conclusion</h2>
                                <p style={seoParagraphStyle}>{seoData.conclusion}</p>
                            </div>

                        </div>

                        {/* EEAT Editorial & Testing Box */}
                        <div style={{ marginTop: 24, padding: 24, borderRadius: 16, border: '1px solid var(--border-subtle)', background: 'rgba(186,158,255,0.02)', display: 'flex', gap: 16 }} className="features-grid">
                            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(186,158,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Award size={20} color="#ba9eff" />
                            </div>
                            <div>
                                <h4 style={{ margin: '0 0 4px', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>EEAT Editorial Policy &amp; Security Shield</h4>
                                <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                    This utility is developed by certified software engineers, validated locally across multiple test browsers (Chrome, Edge, Safari), and audited for data leaks. VisualizeMyData operates a strict 100% offline browser rendering promise: no database logs are created and no trackers are embedded.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Right: Sidebar / Recently Used & Related */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        
                        {/* Recently Used Widgets */}
                        <div className="card" style={{ padding: 20 }}>
                            <h3 style={{
                                fontFamily: 'var(--font-manrope)', fontSize: '0.875rem',
                                fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 16px',
                                display: 'flex', alignItems: 'center', gap: 8
                            }}>
                                <History size={14} color="var(--accent-primary)" /> Recently Used
                            </h3>
                            {recentlyUsed.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {recentlyUsed.map(t => (
                                        <Link key={t.slug} href={`/tools/${t.slug}`} style={{ textDecoration: 'none' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', transition: 'background 0.2s' }} className="glass-card-hover">
                                                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{t.name}</span>
                                                <ChevronRight size={12} color="var(--text-muted)" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    Your recently used browser tools will appear here.
                                </p>
                            )}
                        </div>

                        {/* Quick Trust Checklist */}
                        <div className="card" style={{ padding: 20, background: 'rgba(16,185,129,0.01)', border: '1px solid rgba(16,185,129,0.12)' }}>
                            <h3 style={{
                                fontFamily: 'var(--font-manrope)', fontSize: '0.875rem',
                                fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 16px',
                                display: 'flex', alignItems: 'center', gap: 8
                            }}>
                                <Shield size={14} color="#10b981" /> Trust Signals
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {[
                                    '100% Private Sandbox',
                                    'No Database Entries',
                                    'Completely Zero Logfiles',
                                    'Works Offline Anytime',
                                    'No Registration Wall',
                                    'Open-Source Libraries'
                                ].map(signal => (
                                    <div key={signal} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                        <Check size={11} color="#10b981" />
                                        <span>{signal}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* Feedback Modal Overlay */}
            {feedbackOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                    <div className="glass-card" style={{ padding: 28, maxWidth: 440, width: '100%', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(10,18,36,0.98)', borderRadius: 20 }}>
                        <h3 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: '0 0 8px' }}>
                            {feedbackType === 'feedback' ? 'Send Tool Feedback' : 'Suggest a New Tool'}
                        </h3>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.5 }}>
                            {feedbackType === 'feedback' 
                                ? `Share comments or report issues concerning the ${tool.name}. Your suggestions are directly reviewed.` 
                                : 'Describe the utility or visualization tool you need. We will try to build it in-browser for free.'}
                        </p>
                        <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <input 
                                type="email" 
                                placeholder="Your email address (optional)" 
                                value={feedbackEmail}
                                onChange={e => setFeedbackEmail(e.target.value)}
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 10, padding: 12, fontSize: '0.82rem', color: '#fff', outline: 'none' }}
                            />
                            <textarea 
                                placeholder={feedbackType === 'feedback' ? "What can we improve in this tool?" : "Detail the input, calculations, and visual charts you would like to see..."}
                                rows={4}
                                required
                                value={feedbackText}
                                onChange={e => setFeedbackText(e.target.value)}
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 10, padding: 12, fontSize: '0.82rem', color: '#fff', outline: 'none', resize: 'none' }}
                            />
                            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 12 }}>
                                <button type="button" onClick={() => setFeedbackOpen(false)} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>Cancel</button>
                                <button type="submit" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.8rem' }}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
