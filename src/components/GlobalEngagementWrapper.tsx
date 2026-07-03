'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
    Home, Search, History, Star, Grid, X, Bookmark, 
    ArrowRight, ChevronRight, Moon, Sun, Trash2
} from 'lucide-react';
import { QUICK_TOOLS, ToolDef } from '@/lib/toolsRegistry';
import { toast } from 'sonner';

// Define static Search Database for Categories, Guides, and Templates
const SEARCH_CATEGORIES = [
    { name: 'Dashboard Tools', href: '/category/dashboard-tools' },
    { name: 'Excel Tools', href: '/category/excel-tools' },
    { name: 'CSV Tools', href: '/category/csv-tools' },
    { name: 'PDF Tools', href: '/category/pdf-tools' },
    { name: 'Image Tools', href: '/category/image-tools' },
    { name: 'Developer Tools', href: '/category/developer-tools' },
    { name: 'Student Tools', href: '/category/student-tools' },
    { name: 'Business Tools', href: '/category/business-tools' },
    { name: 'Food Science Tools', href: '/category/food-science-tools' }
];

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

const SEARCH_TEMPLATES = [
    { name: 'Sales Performance Dashboard', href: '/gallery/sales-performance-dashboard' },
    { name: 'Marketing Campaign ROI Dashboard', href: '/gallery/marketing-campaign-roi' },
    { name: 'Financial Overview Dashboard', href: '/gallery/financial-overview-dashboard' },
    { name: 'Employee Satisfaction Survey', href: '/gallery/employee-satisfaction-survey' }
];

export default function GlobalEngagementWrapper({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [showBookmarkPrompt, setShowBookmarkPrompt] = useState(false);
    
    // Quick access list states
    const [recentTools, setRecentTools] = useState<ToolDef[]>([]);
    const [favoriteTools, setFavoriteTools] = useState<ToolDef[]>([]);
    
    // Floating dropdown menus
    const [activeDockMenu, setActiveDockMenu] = useState<'none' | 'recent' | 'favorites' | 'categories'>('none');
    
    const searchInputRef = useRef<HTMLInputElement>(null);

    // 1. Dark Theme sync
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme-preference');
            if (saved === 'light') {
                setTheme('light');
                document.documentElement.classList.add('light');
            } else if (saved === 'dark') {
                setTheme('dark');
                document.documentElement.classList.remove('light');
            } else {
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                setTheme(systemDark ? 'dark' : 'light');
                if (!systemDark) document.documentElement.classList.add('light');
            }
        }
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        localStorage.setItem('theme-preference', nextTheme);
        if (nextTheme === 'light') {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }
        toast.success(`Switched to ${nextTheme === 'light' ? 'Light' : 'Dark'} Mode`);
    };

    // 2. Load lists on DOCK interaction
    const reloadLists = () => {
        if (typeof window === 'undefined') return;
        
        // Load recent
        const storedRecent = localStorage.getItem('recently_used_tools');
        const listRecent: string[] = storedRecent ? JSON.parse(storedRecent) : [];
        const mappedRecent = listRecent
            .map(slug => QUICK_TOOLS.find(t => t.slug === slug))
            .filter((t): t is ToolDef => !!t)
            .slice(0, 10);
        setRecentTools(mappedRecent);

        // Load favorites
        const storedFavs = localStorage.getItem('favourite_tools');
        const listFavs: string[] = storedFavs ? JSON.parse(storedFavs) : [];
        const mappedFavs = listFavs
            .map(slug => QUICK_TOOLS.find(t => t.slug === slug))
            .filter((t): t is ToolDef => !!t);
        setFavoriteTools(mappedFavs);
    };

    useEffect(() => {
        reloadLists();
        window.addEventListener('favourites-updated', reloadLists);
        return () => window.removeEventListener('favourites-updated', reloadLists);
    }, []);

    const clearRecentHistory = () => {
        localStorage.removeItem('recently_used_tools');
        setRecentTools([]);
        toast.success('Recently used history cleared.');
    };

    // 3. Smart Bookmark Prompt trigger
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const dismissed = localStorage.getItem('bookmark_prompt_dismissed');
        if (dismissed) return;

        const countStr = sessionStorage.getItem('page_view_interactions') || '0';
        const count = parseInt(countStr) + 1;
        sessionStorage.setItem('page_view_interactions', count.toString());

        if (count >= 3) {
            const timer = setTimeout(() => {
                setShowBookmarkPrompt(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const dismissBookmarkPrompt = () => {
        localStorage.setItem('bookmark_prompt_dismissed', 'true');
        setShowBookmarkPrompt(false);
    };

    // 4. Keyboard Listener: Ctrl+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setSearchOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setSearchOpen(false);
                setActiveDockMenu('none');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        const handleCustomSearchTrigger = () => {
            setSearchOpen(true);
        };
        window.addEventListener('trigger-global-search', handleCustomSearchTrigger);
        return () => window.removeEventListener('trigger-global-search', handleCustomSearchTrigger);
    }, []);

    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        } else {
            setSearchQuery('');
        }
    }, [searchOpen]);

    // 5. Search filtering logic
    const filteredResults = React.useMemo(() => {
        if (!searchQuery.trim()) return null;
        const q = searchQuery.toLowerCase();

        const tools = QUICK_TOOLS.filter(t => 
            t.name.toLowerCase().includes(q) || 
            t.description.toLowerCase().includes(q) || 
            t.category.toLowerCase().includes(q)
        ).slice(0, 5);

        const cats = SEARCH_CATEGORIES.filter(c => 
            c.name.toLowerCase().includes(q)
        ).slice(0, 3);

        const guides = SEARCH_GUIDES.filter(g => 
            g.title.toLowerCase().includes(q)
        ).slice(0, 3);

        const temps = SEARCH_TEMPLATES.filter(t => 
            t.name.toLowerCase().includes(q)
        ).slice(0, 2);

        return { tools, cats, guides, temps };
    }, [searchQuery]);

    return (
        <>
            {children}

            {/* ── BOOKMARK PROMPT NOTIFICATION ── */}
            {showBookmarkPrompt && (
                <div style={{
                    position: 'fixed',
                    bottom: 90,
                    right: 20,
                    zIndex: 95,
                    width: '320px',
                    background: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(132, 85, 239, 0.3)',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(12px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    animation: 'slideUp 0.3s ease-out'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Bookmark size={12} /> Enjoying Visualize My Data?
                        </span>
                        <button onClick={dismissBookmarkPrompt} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 2 }}>
                            <X size={14} />
                        </button>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#fff', lineHeight: 1.45 }}>
                        Press <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 4, fontSize: '0.75rem', fontFamily: 'monospace' }}>Ctrl + D</kbd> to bookmark us for quick client-side access online!
                    </p>
                </div>
            )}

            {/* ── FLOATING QUICK ACCESS BAR DOCK ── */}
            <div style={{
                position: 'fixed',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 90,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(12, 14, 18, 0.75)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '32px',
                padding: '6px 12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.4)'
            }}>
                {/* 🏠 Home */}
                <Link href="/" title="Go to Homepage" style={{ textDecoration: 'none' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s' }} className="dock-icon-hover">
                        <Home size={18} />
                    </div>
                </Link>

                {/* 🔍 Search */}
                <button 
                    onClick={() => { setActiveDockMenu('none'); setSearchOpen(true); }}
                    title="Global Search (Ctrl + K)"
                    style={{ background: 'none', border: 'none', padding: 0 }}
                >
                    <div style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s' }} className="dock-icon-hover">
                        <Search size={18} />
                    </div>
                </button>

                {/* ⏰ Recent */}
                <button 
                    onClick={() => { reloadLists(); setActiveDockMenu(prev => prev === 'recent' ? 'none' : 'recent'); }}
                    title="Recently Used Tools"
                    style={{ background: 'none', border: 'none', padding: 0, position: 'relative' }}
                >
                    <div style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeDockMenu === 'recent' ? 'var(--accent-primary)' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s' }} className="dock-icon-hover">
                        <History size={18} />
                    </div>
                </button>

                {/* ⭐ Favorites */}
                <button 
                    onClick={() => { reloadLists(); setActiveDockMenu(prev => prev === 'favorites' ? 'none' : 'favorites'); }}
                    title="My Favourite Tools"
                    style={{ background: 'none', border: 'none', padding: 0 }}
                >
                    <div style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeDockMenu === 'favorites' ? '#f59e0b' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s' }} className="dock-icon-hover">
                        <Star size={18} fill={activeDockMenu === 'favorites' ? '#f59e0b' : 'none'} />
                    </div>
                </button>

                {/* 📁 Categories */}
                <button 
                    onClick={() => setActiveDockMenu(prev => prev === 'categories' ? 'none' : 'categories')}
                    title="Browse Categories"
                    style={{ background: 'none', border: 'none', padding: 0 }}
                >
                    <div style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeDockMenu === 'categories' ? 'var(--accent-primary)' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s' }} className="dock-icon-hover">
                        <Grid size={18} />
                    </div>
                </button>

                {/* Divider */}
                <span style={{ width: 1, height: 20, background: 'var(--border-subtle)', margin: '0 4px' }} />

                {/* 🌗 Dark/Light Mode */}
                <button 
                    onClick={toggleTheme}
                    title="Toggle Dark/Light Mode"
                    style={{ background: 'none', border: 'none', padding: 0 }}
                >
                    <div style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s' }} className="dock-icon-hover">
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </div>
                </button>

                {/* ── DOCK OVERLAY POPUPS ── */}
                {activeDockMenu !== 'none' && (
                    <div style={{
                        position: 'absolute',
                        bottom: 60,
                        left: activeDockMenu === 'categories' ? 'auto' : activeDockMenu === 'favorites' ? '40%' : '20px',
                        right: activeDockMenu === 'categories' ? '20px' : 'auto',
                        width: '280px',
                        background: 'rgba(10, 14, 18, 0.98)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '16px',
                        padding: '16px 20px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(16px)',
                        zIndex: 91,
                        animation: 'slideUp 0.2s ease-out'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                                {activeDockMenu === 'recent' && <><History size={12} /> Recently Used</>}
                                {activeDockMenu === 'favorites' && <><Star size={12} fill="#f59e0b" color="#f59e0b" /> Favorites</>}
                                {activeDockMenu === 'categories' && <><Grid size={12} /> Categories</>}
                            </span>
                            <button onClick={() => setActiveDockMenu('none')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 2 }}>
                                <X size={12} />
                            </button>
                        </div>

                        {/* Recent Panel */}
                        {activeDockMenu === 'recent' && (
                            <div>
                                {recentTools.length > 0 ? (
                                    <>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 200, overflowY: 'auto', marginBottom: 12 }}>
                                            {recentTools.map(t => (
                                                <Link key={t.slug} href={`/tools/${t.slug}`} onClick={() => setActiveDockMenu('none')} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 8px', borderRadius: 8, background: 'rgba(255,255,255,0.02)' }} className="glass-card-hover">
                                                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{t.name}</span>
                                                    <ChevronRight size={10} color="var(--text-muted)" />
                                                </Link>
                                            ))}
                                        </div>
                                        <button onClick={clearRecentHistory} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: '#ef4444', padding: 4 }}>
                                            <Trash2 size={12} /> Clear History
                                        </button>
                                    </>
                                ) : (
                                    <p style={{ margin: '10px 0', fontSize: '0.74rem', color: 'var(--text-muted)' }}>No history yet. Start exploring!</p>
                                )}
                            </div>
                        )}

                        {/* Favorites Panel */}
                        {activeDockMenu === 'favorites' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 200, overflowY: 'auto' }}>
                                {favoriteTools.length > 0 ? (
                                    favoriteTools.map(t => (
                                        <Link key={t.slug} href={`/tools/${t.slug}`} onClick={() => setActiveDockMenu('none')} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 8px', borderRadius: 8, background: 'rgba(255,255,255,0.02)' }} className="glass-card-hover">
                                            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{t.name}</span>
                                            <Star size={10} fill="#f59e0b" color="#f59e0b" />
                                        </Link>
                                    ))
                                ) : (
                                    <p style={{ margin: '10px 0', fontSize: '0.74rem', color: 'var(--text-muted)' }}>Star a tool to bookmark it here!</p>
                                )}
                            </div>
                        )}

                        {/* Categories Panel */}
                        {activeDockMenu === 'categories' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 220, overflowY: 'auto' }}>
                                {SEARCH_CATEGORIES.map(c => (
                                    <Link key={c.name} href={c.href} onClick={() => setActiveDockMenu('none')} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 8px', borderRadius: 8, background: 'rgba(255,255,255,0.02)' }} className="glass-card-hover">
                                        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{c.name}</span>
                                        <ChevronRight size={10} color="var(--text-muted)" />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* ── GLOBAL SEARCH MODAL (Ctrl + K) ── */}
            {searchOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(3, 7, 18, 0.75)',
                    backdropFilter: 'blur(6px)',
                    zIndex: 100,
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    padding: '80px 20px 20px'
                }}>
                    <div className="glass-card" style={{
                        maxWidth: '600px',
                        width: '100%',
                        background: 'rgba(10, 18, 36, 0.98)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '20px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                        overflow: 'hidden'
                    }}>
                        {/* Search Input Bar */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
                            <Search size={18} color="var(--text-muted)" />
                            <input 
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search tools, categories, templates, guides..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                style={{
                                    flex: 1,
                                    background: 'none',
                                    border: 'none',
                                    color: '#fff',
                                    outline: 'none',
                                    fontSize: '0.92rem'
                                }}
                            />
                            <button onClick={() => setSearchOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}>
                                <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 4, fontSize: '0.7rem', fontFamily: 'monospace', marginRight: 8 }}>ESC</kbd>
                                <X size={16} />
                            </button>
                        </div>

                        {/* Search Results */}
                        <div style={{ padding: 20, maxHeight: '420px', overflowY: 'auto' }}>
                            {filteredResults ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    {/* 1. Tools Matches */}
                                    {filteredResults.tools.length > 0 && (
                                        <div>
                                            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', display: 'block', marginBottom: 8, letterSpacing: 0.5 }}>Tools</span>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                {filteredResults.tools.map(t => (
                                                    <Link key={t.slug} href={`/tools/${t.slug}`} onClick={() => setSearchOpen(false)} style={{ textDecoration: 'none' }}>
                                                        <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="glass-card-hover">
                                                            <div>
                                                                <h4 style={{ margin: 0, fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>{t.name}</h4>
                                                                <p style={{ margin: '2px 0 0', fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t.description}</p>
                                                            </div>
                                                            <span style={{ fontSize: '0.62rem', background: 'rgba(132, 85, 239, 0.1)', color: '#ba9eff', padding: '2px 6px', borderRadius: 4 }}>{t.category}</span>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* 2. Categories Matches */}
                                    {filteredResults.cats.length > 0 && (
                                        <div>
                                            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', display: 'block', marginBottom: 8, letterSpacing: 0.5 }}>Categories</span>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                                {filteredResults.cats.map(c => (
                                                    <Link key={c.name} href={c.href} onClick={() => setSearchOpen(false)} style={{ textDecoration: 'none' }}>
                                                        <div style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="glass-card-hover">
                                                            <span style={{ fontSize: '0.78rem', color: '#fff', fontWeight: 600 }}>{c.name}</span>
                                                            <ArrowRight size={12} color="var(--text-muted)" />
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* 3. Guides Matches */}
                                    {filteredResults.guides.length > 0 && (
                                        <div>
                                            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', display: 'block', marginBottom: 8, letterSpacing: 0.5 }}>Learning Guides</span>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                                {filteredResults.guides.map(g => (
                                                    <Link key={g.title} href={g.href} onClick={() => setSearchOpen(false)} style={{ textDecoration: 'none' }}>
                                                        <div style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="glass-card-hover">
                                                            <span style={{ fontSize: '0.78rem', color: '#fff', fontWeight: 600 }}>{g.title}</span>
                                                            <ArrowRight size={12} color="var(--text-muted)" />
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* 4. Templates Matches */}
                                    {filteredResults.temps.length > 0 && (
                                        <div>
                                            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', display: 'block', marginBottom: 8, letterSpacing: 0.5 }}>Templates &amp; Gallery</span>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                                {filteredResults.temps.map(t => (
                                                    <Link key={t.name} href={t.href} onClick={() => setSearchOpen(false)} style={{ textDecoration: 'none' }}>
                                                        <div style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="glass-card-hover">
                                                            <span style={{ fontSize: '0.78rem', color: '#fff', fontWeight: 600 }}>{t.name}</span>
                                                            <ArrowRight size={12} color="var(--text-muted)" />
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {filteredResults.tools.length === 0 && 
                                     filteredResults.cats.length === 0 && 
                                     filteredResults.guides.length === 0 && 
                                     filteredResults.temps.length === 0 && (
                                        <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)' }}>
                                            No matches found for "{searchQuery}".
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>Popular Quick Searches</span>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                        {[
                                            { name: 'Image Compressor', href: '/tools/image-compressor' },
                                            { name: 'Excel Visualizer', href: '/excel-visualizer' },
                                            { name: 'CSV Visualizer', href: '/csv-visualizer' },
                                            { name: 'PDF Merger', href: '/tools/pdf-merger' },
                                            { name: 'Invoice Generator', href: '/tools/invoice-generator' },
                                            { name: 'HTML Preview', href: '/tools/html-preview' }
                                        ].map(t => (
                                            <Link key={t.name} href={t.href} onClick={() => setSearchOpen(false)} style={{ textDecoration: 'none' }}>
                                                <div style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-subtle)', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }} className="glass-card-hover">
                                                    {t.name}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
