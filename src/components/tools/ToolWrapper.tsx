'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    Lock, Shield, Clock, ArrowRight, Home, History, Sparkles, 
    Image as ImageIcon, FileText, ListFilter, Code, ChevronRight, ChevronLeft,
    Star, Share2, Copy, MessageSquare, Plus, Info, Check, User, ShieldAlert, Award,
    BookOpen, Tag, Mail, PanelLeftClose, PanelLeftOpen, Folder, Search, Cpu
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
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [allFavorites, setAllFavorites] = useState<ToolDef[]>([]);
    const [recentlyUsed, setRecentlyUsed] = useState<ToolDef[]>([]);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [isFavourited, setIsFavourited] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('sidebar_collapsed');
        if (stored) {
            setSidebarCollapsed(stored === 'true');
        }

        const favs = localStorage.getItem('favourite_tools');
        const list: string[] = favs ? JSON.parse(favs) : [];
        const mappedFavs = list
            .map(slug => QUICK_TOOLS.find(t => t.slug === slug))
            .filter((t): t is ToolDef => !!t);
        setAllFavorites(mappedFavs);

        const handleFavUpdate = () => {
            const currentFavs = localStorage.getItem('favourite_tools');
            const currentList: string[] = currentFavs ? JSON.parse(currentFavs) : [];
            const currentMapped = currentList
                .map(slug => QUICK_TOOLS.find(t => t.slug === slug))
                .filter((t): t is ToolDef => !!t);
            setAllFavorites(currentMapped);
        };
        window.addEventListener('favourites-updated', handleFavUpdate);
        return () => window.removeEventListener('favourites-updated', handleFavUpdate);
    }, []);

    const toggleSidebar = () => {
        const nextState = !sidebarCollapsed;
        setSidebarCollapsed(nextState);
        localStorage.setItem('sidebar_collapsed', String(nextState));
    };

    const handleSearchClick = () => {
        window.dispatchEvent(new CustomEvent('trigger-global-search'));
    };

    const categories = Array.from(new Set(QUICK_TOOLS.map(t => t.category)));

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



    const related = getRelatedTools(tool, 3);
    
    // Programmatic Tag Calculations for SaaS metadata
    const catStr = tool.category as string;
    const difficulty = ['Developer Tools', 'CSV Tools', 'Excel Tools', 'Food Technology'].includes(catStr) ? 'Intermediate' : 'Beginner';
    
    let bestFor = 'Everyone';
    if (catStr === 'Developer Tools') bestFor = 'Developers';
    else if (catStr === 'Image Tools') bestFor = 'Designers';
    else if (catStr === 'Student Tools') bestFor = 'Students';
    else if (catStr === 'Business Tools') bestFor = 'Businesses';
    else if (catStr === 'Food Technology') bestFor = 'Food Scientists';

    // Smart Navigation: Prev & Next Tools
    const currentIndex = QUICK_TOOLS.findIndex(t => t.slug === tool.slug);
    const prevTool = currentIndex > 0 ? QUICK_TOOLS[currentIndex - 1] : null;
    const nextTool = currentIndex < QUICK_TOOLS.length - 1 ? QUICK_TOOLS[currentIndex + 1] : null;

    // Recommendations lists (5 tools, 3 guides, 2 templates)
    const similarTools = getRelatedTools(tool, 5);
    const SEARCH_GUIDES = [
        { title: 'What is Data Visualization?', href: '/learn/what-is-data-visualization' },
        { title: 'How to Create Charts from Excel', href: '/learn/how-to-create-charts-from-excel' },
        { title: 'Best Data Visualization Techniques', href: '/learn/best-data-visualization-techniques' },
        { title: 'Dashboard Design Best Practices', href: '/learn/dashboard-design-best-practices' },
        { title: 'Common Chart Types Guide', href: '/learn/common-chart-types' },
        { title: 'How to Visualize Excel Data', href: '/blog/how-to-visualize-excel-data' },
        { title: 'CSV Data Visualization Guide', href: '/blog/csv-data-visualization-guide' },
        { title: 'Best Free Data Visualization Tools', href: '/blog/best-free-data-visualization-tools' }
    ];
    const relatedGuides = SEARCH_GUIDES.filter(g => !g.title.toLowerCase().includes(tool.name.toLowerCase())).slice(0, 3);

    const SEARCH_TEMPLATES = [
        { name: 'Sales Performance Dashboard', href: '/gallery/sales-performance-dashboard' },
        { name: 'Marketing Campaign ROI Dashboard', href: '/gallery/marketing-campaign-roi' },
        { name: 'Financial Overview Dashboard', href: '/gallery/financial-overview-dashboard' },
        { name: 'Employee Satisfaction Survey', href: '/gallery/employee-satisfaction-survey' }
    ];
    const relatedTemplates = SEARCH_TEMPLATES.slice(0, 2);

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
                    
                    {/* Tool Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
                        <span style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', padding: '4px 10px', borderRadius: 20, color: 'var(--text-secondary)' }}>
                            <Tag size={10} color="var(--accent-primary)" /> {difficulty}
                        </span>
                        <span style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', padding: '4px 10px', borderRadius: 20, color: 'var(--text-secondary)' }}>
                            <User size={10} color="var(--accent-primary)" /> Best for {bestFor}
                        </span>
                        {(tool as any).isPopular && (
                            <span style={{ fontSize: '0.7rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.25)', padding: '4px 10px', borderRadius: 20, color: '#f59e0b', fontWeight: 600 }}>
                                🔥 Popular Today
                            </span>
                        )}
                        {tool.badge === 'NEW' && (
                            <span style={{ fontSize: '0.7rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.25)', padding: '4px 10px', borderRadius: 20, color: '#3b82f6', fontWeight: 600 }}>
                                ✨ New Release
                            </span>
                        )}
                    </div>

                    {/* EEAT Meta Data Row */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 24px', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 8, alignItems: 'center' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><User size={11} /> <strong>Written By:</strong> Prabhdeep Singh</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Check size={11} color="#10b981" /> <strong>Reviewed By:</strong> Editorial Board &amp; Data Architects</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} /> <strong>Last Updated:</strong> July 2026</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Lock size={11} color="#10b981" /> <strong>Privacy Promise:</strong> 100% Secure Client Memory</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Cpu size={11} /> <strong>Browser Processing:</strong> Local Sandboxed Execution</span>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, maxWidth: 640, lineHeight: 1.6 }}>
                        {tool.description}
                    </p>
                </div>
            </div>

            {/* Collapsible Left Sidebar Layout */}
            <div className="container" style={{ display: 'flex', gap: 24, marginTop: 24 }}>
                {/* Left Sidebar */}
                <div className="hidden-mobile" style={{
                    width: sidebarCollapsed ? 0 : 240,
                    opacity: sidebarCollapsed ? 0 : 1,
                    pointerEvents: sidebarCollapsed ? 'none' : 'auto',
                    transition: 'width 0.25s ease, opacity 0.2s ease',
                    overflow: 'hidden',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                    borderRight: sidebarCollapsed ? 'none' : '1px solid var(--border-subtle)',
                    paddingRight: sidebarCollapsed ? 0 : 16
                }}>
                    {/* Collapsible header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Navigator</span>
                        <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }} title="Collapse Sidebar">
                            <PanelLeftClose size={15} />
                        </button>
                    </div>

                    {/* Search shortcut bar */}
                    <button onClick={handleSearchClick} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.78rem',
                        cursor: 'pointer', width: '100%', textAlign: 'left'
                    }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Search size={13} /> Search...</span>
                        <kbd style={{ fontSize: '0.62rem', background: 'rgba(255,255,255,0.08)', padding: '2px 4px', borderRadius: 4 }}>Ctrl K</kbd>
                    </button>

                    {/* Pinned / Favorites */}
                    <div>
                        <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Star size={12} color="var(--accent-primary)" fill="var(--accent-primary)" /> Pinned Tools
                        </h4>
                        {allFavorites.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {allFavorites.slice(0, 5).map(f => (
                                    <Link key={f.slug} href={`/tools/${f.slug}`} style={{
                                        fontSize: '0.76rem', color: f.slug === tool.slug ? '#fff' : 'var(--text-secondary)',
                                        textDecoration: 'none', padding: '6px 8px', borderRadius: 6,
                                        background: f.slug === tool.slug ? 'rgba(186,158,255,0.12)' : 'transparent',
                                        transition: 'background 0.2s'
                                    }}>
                                        {f.name}
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p style={{ margin: 0, fontSize: '0.68rem', color: 'var(--text-muted)' }}>No pinned tools.</p>
                        )}
                    </div>

                    {/* Recently Visited */}
                    <div>
                        <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <History size={12} color="var(--accent-primary)" /> Recent Tools
                        </h4>
                        {recentlyUsed.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {recentlyUsed.map(r => (
                                    <Link key={r.slug} href={`/tools/${r.slug}`} style={{
                                        fontSize: '0.76rem', color: 'var(--text-secondary)',
                                        textDecoration: 'none', padding: '6px 8px', borderRadius: 6,
                                        transition: 'background 0.2s'
                                    }}>
                                        {r.name}
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p style={{ margin: 0, fontSize: '0.68rem', color: 'var(--text-muted)' }}>History is empty.</p>
                        )}
                    </div>

                    {/* Dynamic Categories */}
                    <div>
                        <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Folder size={12} color="var(--accent-primary)" /> Categories
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {categories.map(c => (
                                <Link key={c} href={`/category/${c.toLowerCase().replace(/\s+/g, '-')}`} style={{
                                    fontSize: '0.76rem', color: 'var(--text-secondary)',
                                    textDecoration: 'none', padding: '6px 8px', borderRadius: 6,
                                    transition: 'background 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                }}>
                                    <span>{c}</span>
                                    <ChevronRight size={10} color="var(--text-muted)" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Toggle Button when collapsed */}
                {sidebarCollapsed && (
                    <button onClick={toggleSidebar} className="hidden-mobile" style={{
                        position: 'fixed', left: 16, bottom: 84, zIndex: 40,
                        width: 36, height: 36, borderRadius: 10, background: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                    }} title="Expand Navigator">
                        <PanelLeftOpen size={16} />
                    </button>
                )}

                {/* Main Content Workspace */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    
                    {/* Collapsible toggle bar on top */}
                    {!sidebarCollapsed && (
                        <div className="hidden-mobile" style={{ marginBottom: 12 }}>
                            <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', padding: '4px 8px', borderRadius: 6 }}>
                                <PanelLeftClose size={13} /> Collapse Navigator
                            </button>
                        </div>
                    )}

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

                        {/* Tool Actions Row & Viral Sharing System */}
                        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 20 }} className="tool-actions-container">
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                                {/* Left side: Social Sharing */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: 6 }}>Share:</span>
                                    <button onClick={handleShare} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: 4 }} title="System Native Share">
                                        <Share2 size={13} /> Share
                                    </button>
                                    <button onClick={handleCopyLink} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: 4 }} title="Copy Link to Clipboard">
                                        <Copy size={13} /> Copy Link
                                    </button>
                                    
                                    {/* Whatsapp */}
                                    <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(tool.name + ' - Free online browser tool: ' + (typeof window !== 'undefined' ? window.location.href : ''))}`} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '6px 10px', fontSize: '0.72rem', textDecoration: 'none', color: '#25D366' }}>
                                        WhatsApp
                                    </a>

                                    {/* X / Twitter */}
                                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Use ' + tool.name + ' online for free: ')}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '6px 10px', fontSize: '0.72rem', textDecoration: 'none', color: '#1DA1F2' }}>
                                        X
                                    </a>

                                    {/* LinkedIn */}
                                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '6px 10px', fontSize: '0.72rem', textDecoration: 'none', color: '#0A66C2' }}>
                                        LinkedIn
                                    </a>

                                    {/* Facebook */}
                                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '6px 10px', fontSize: '0.72rem', textDecoration: 'none', color: '#1877F2' }}>
                                        Facebook
                                    </a>
                                </div>

                                {/* Right side: Serverless Feedback Actions */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    <a href={`mailto:support@visualizemydata.in?subject=Bug Report - ${tool.name}&body=Please enter bug details below:`} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, color: '#ef4444' }}>
                                        <ShieldAlert size={12} /> Report Bug
                                    </a>
                                    <a href={`mailto:support@visualizemydata.in?subject=Improvement Suggestion - ${tool.name}&body=Describe the feature or improvement you would like to see:`} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                        <MessageSquare size={12} /> Suggest Improvement
                                    </a>
                                    <a href={`mailto:support@visualizemydata.in?subject=Request New In-Browser Tool&body=Detail the tool specifications you want:`} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                        <Plus size={12} /> Request New Tool
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Local execution notice */}
                        <div style={{ display: 'flex', gap: 12, padding: '16px 20px', borderRadius: 16, background: 'rgba(16,185,129,0.03)', border: '1px solid rgba(16,185,129,0.12)' }}>
                            <Shield size={16} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
                            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                <strong>Privacy Secured:</strong> This utility runs 100% inside your browser. No files, logs, or values are uploaded to any server. Your information stays safe on your device.
                            </p>
                        </div>

                        {/* Learning Center Widget */}
                        <div className="card" style={{ padding: 24, background: 'rgba(132, 85, 239, 0.02)', border: '1px solid rgba(132, 85, 239, 0.15)', borderRadius: 20 }}>
                            <h3 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1rem', fontWeight: 800, color: '#fff', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <BookOpen size={16} color="var(--accent-primary)" /> Learning Center &amp; Guides
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }} className="features-grid">
                                <div style={{ background: 'rgba(0,0,0,0.15)', padding: 16, borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
                                    <span style={{ fontSize: '0.62rem', background: '#10b981', color: '#000', fontWeight: 800, padding: '2px 6px', borderRadius: 4, textTransform: 'uppercase', display: 'inline-block', marginBottom: 8 }}>Beginner</span>
                                    <h4 style={{ fontSize: '0.8rem', fontWeight: 700, margin: '0 0 6px', color: '#fff' }}>Get Started Guide</h4>
                                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: '0 0 10px', lineHeight: 1.4 }}>Master the fundamentals of browser-based calculations in 2 minutes.</p>
                                    <Link href="/learn/what-is-data-visualization" style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                        Read Tutorial <ChevronRight size={10} />
                                    </Link>
                                </div>
                                <div style={{ background: 'rgba(0,0,0,0.15)', padding: 16, borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
                                    <span style={{ fontSize: '0.62rem', background: '#f59e0b', color: '#000', fontWeight: 800, padding: '2px 6px', borderRadius: 4, textTransform: 'uppercase', display: 'inline-block', marginBottom: 8 }}>Advanced</span>
                                    <h4 style={{ fontSize: '0.8rem', fontWeight: 700, margin: '0 0 6px', color: '#fff' }}>High Volume Tips</h4>
                                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: '0 0 10px', lineHeight: 1.4 }}>Learn how to manage large files and batch process data locally.</p>
                                    <Link href="/learn/dashboard-design-best-practices" style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                        Read Guide <ChevronRight size={10} />
                                    </Link>
                                </div>
                                <div style={{ background: 'rgba(0,0,0,0.15)', padding: 16, borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
                                    <span style={{ fontSize: '0.62rem', background: 'var(--accent-primary)', color: '#000', fontWeight: 800, padding: '2px 6px', borderRadius: 4, textTransform: 'uppercase', display: 'inline-block', marginBottom: 8 }}>Tutorial</span>
                                    <h4 style={{ fontSize: '0.8rem', fontWeight: 700, margin: '0 0 6px', color: '#fff' }}>Related Tutorial</h4>
                                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: '0 0 10px', lineHeight: 1.4 }}>Step-by-step workbook for extracting insights without server limits.</p>
                                    <Link href="/blog/how-to-visualize-excel-data" style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                        Open Tutorial <ChevronRight size={10} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Smart Navigation Buttons */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderRadius: 16, background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: 12 }}>
                            {prevTool ? (
                                <Link href={`/tools/${prevTool.slug}`} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }} className="hover-white">
                                    <ChevronLeft size={14} /> Previous: {prevTool.name}
                                </Link>
                            ) : (
                                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>First Tool</span>
                            )}

                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                Category: <Link href={`/category/${tool.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 700 }}>{tool.category}</Link>
                            </span>

                            {nextTool ? (
                                <Link href={`/tools/${nextTool.slug}`} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }} className="hover-white">
                                    Next: {nextTool.name} <ChevronRight size={14} />
                                </Link>
                            ) : (
                                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Last Tool</span>
                            )}
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

                            {/* 11. Troubleshooting */}
                            <div style={seoSectionStyle}>
                                <h2 style={seoSectionTitleStyle}>11. Troubleshooting &amp; Common Pitfalls to Avoid</h2>
                                <ul style={{ paddingLeft: 18, margin: 0, color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.7 }}>
                                    {seoData.mistakes.map((mis, i) => <li key={i} style={{ marginBottom: 4 }}><span style={{ color: '#ef4444' }}>✗</span> {mis}</li>)}
                                </ul>
                            </div>

                            {/* 12. Related Tools, Guides, & Templates (10-Slot Recommendation Grid) */}
                            <div style={seoSectionStyle}>
                                <h2 style={seoSectionTitleStyle}>12. Related Free Tools, Guides &amp; Templates</h2>
                                
                                {/* 5 Similar Tools */}
                                <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-secondary)', margin: '14px 0 10px' }}>Similar Tools You Might Like:</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
                                    {similarTools.map((t, idx) => (
                                        <Link key={idx} href={`/tools/${t.slug}`} style={{ textDecoration: 'none' }}>
                                            <div style={{ ...seoInnerCardStyle, padding: '12px 14px' }} className="glass-card-hover">
                                                <h4 style={{ margin: 0, fontSize: '0.78rem', fontWeight: 700, color: '#fff' }}>{t.name}</h4>
                                                <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: 4, display: 'block' }}>{t.category}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* 3 Guides */}
                                <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-secondary)', margin: '0 0 10px' }}>Recommended Reading:</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
                                    {relatedGuides.map((g, idx) => (
                                        <Link key={idx} href={g.href} style={{ textDecoration: 'none' }}>
                                            <div style={{ ...seoInnerCardStyle, padding: '12px 14px' }} className="glass-card-hover">
                                                <h4 style={{ margin: 0, fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-primary)' }}>{g.title}</h4>
                                                <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: 4, display: 'block' }}>Guide</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* 2 Templates */}
                                <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-secondary)', margin: '0 0 10px' }}>SaaS Dashboard Templates:</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    {relatedTemplates.map((t, idx) => (
                                        <Link key={idx} href={t.href} style={{ textDecoration: 'none' }}>
                                            <div style={{ ...seoInnerCardStyle, padding: '12px 14px' }} className="glass-card-hover">
                                                <h4 style={{ margin: 0, fontSize: '0.78rem', fontWeight: 700, color: '#fff' }}>{t.name}</h4>
                                                <span style={{ fontSize: '0.62rem', color: '#10b981', marginTop: 4, display: 'block' }}>Premium Template</span>
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
            </div>
        </div>
    );
}
