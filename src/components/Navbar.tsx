'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart2, Moon, Sun, Monitor, Menu, X, ChevronDown, Search, ArrowRight, Github, HelpCircle } from 'lucide-react';
import { trackThemeToggle } from '@/lib/analytics';

const TOOL_LINKS = [
    { label: '📗 Excel Visualizer', href: '/excel-visualizer' },
    { label: '📋 CSV Visualizer', href: '/csv-visualizer' },
    { label: '📕 PDF Table to Chart', href: '/pdf-table-to-chart' },
    { label: '🔗 Google Sheets', href: '/google-sheets-visualizer' },
    { label: '🧹 Data Cleaner', href: '/data-cleaning-tool' },
    { label: '📊 Survey Visualizer', href: '/survey-visualizer' },
    { label: '💡 Formula Generator', href: '/excel-formula-generator' },
    { label: '✨ Dashboard Templates', href: '/dashboard-templates' },
    { label: '⚡ Quick Utilities', href: '/tools' },
];

const NAV_LINKS = [
    { label: 'Multi-Chart', href: '/multi-chart-generator' },
    { label: 'Dashboard', href: '/dashboard-generator' },
    { label: 'Report', href: '/data-report-generator' },
    { label: 'Templates', href: '/templates' },
    { label: 'Utilities', href: '/tools' },
    { label: 'Learn', href: '/learn' },
    { label: 'Blog', href: '/blog' },
];

const COMPANY_LINKS = [
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Disclaimer', href: '/disclaimer' },
];

export default function Navbar({ darkMode: propDarkMode, onToggleDark }: { darkMode?: boolean; onToggleDark?: () => void }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [toolsOpen, setToolsOpen] = useState(false);
    const [companyOpen, setCompanyOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
    const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
    const [mobileSearchQuery, setMobileSearchQuery] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('theme-preference') as 'light' | 'dark' | 'system';
        if (stored) {
            setTheme(stored);
        }
    }, []);

    const changeTheme = (mode: 'light' | 'dark' | 'system') => {
        setTheme(mode);
        localStorage.setItem('theme-preference', mode);
        setThemeDropdownOpen(false);

        const isDark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        if (!isDark) {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }

        // Trigger prop callbacks if passed to maintain backward compatibility
        if (onToggleDark) {
            onToggleDark();
        }

        trackThemeToggle(mode);
        window.dispatchEvent(new Event('theme-changed'));
    };

    const filteredMobileTools = TOOL_LINKS.filter(t => 
        t.label.toLowerCase().includes(mobileSearchQuery.toLowerCase())
    );

    const linkStyle: React.CSSProperties = {
        padding: '6px 12px',
        borderRadius: 8,
        fontSize: '0.875rem',
        fontWeight: 500,
        color: 'var(--text-secondary)',
        textDecoration: 'none',
        transition: 'color 0.2s, background 0.2s',
    };

    return (
        <nav
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                background: 'rgba(12, 14, 18, 0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid var(--border-subtle)',
            }}
            className="navbar-global"
        >
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
                {/* Logo */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                    <div style={{
                        width: 34, height: 34, borderRadius: 10,
                        background: 'linear-gradient(135deg, #ba9eff, #8455ef)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 20px rgba(186,158,255,0.4)',
                    }}>
                        <BarChart2 size={18} color="white" />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                        ToolVista
                    </span>
                </Link>

                {/* Desktop links */}
                <div style={{ display: 'flex', gap: 2, alignItems: 'center' }} className="hidden-mobile">
                    {/* Tools dropdown */}
                    <div
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setToolsOpen(true)}
                        onMouseLeave={() => setToolsOpen(false)}
                    >
                        <button
                            style={{
                                ...linkStyle,
                                background: toolsOpen ? 'rgba(255,255,255,0.06)' : 'transparent',
                                color: toolsOpen ? 'var(--text-primary)' : 'var(--text-secondary)',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                            }}
                        >
                            Tools
                            <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: toolsOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                        </button>

                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            minWidth: 210,
                            paddingTop: '8px',
                            opacity: toolsOpen ? 1 : 0,
                            pointerEvents: toolsOpen ? 'auto' : 'none',
                            transform: toolsOpen ? 'translateY(0)' : 'translateY(-6px)',
                            transition: 'opacity 0.18s ease, transform 0.18s ease',
                        }}>
                            <div style={{
                                background: 'rgba(10,18,36,0.97)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 14,
                                padding: '8px',
                                boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                                backdropFilter: 'blur(20px)',
                            }}>
                                {TOOL_LINKS.map(t => (
                                    <Link
                                        key={t.href}
                                        href={t.href}
                                        onClick={() => setToolsOpen(false)}
                                        style={{
                                            display: 'block',
                                            padding: '10px 14px',
                                            borderRadius: 10,
                                            fontSize: '0.85rem',
                                            fontWeight: 500,
                                            color: 'var(--text-secondary)',
                                            textDecoration: 'none',
                                            transition: 'background 0.15s, color 0.15s',
                                        }}
                                        onMouseEnter={e => {
                                            (e.currentTarget as HTMLElement).style.background = 'rgba(186,158,255,0.12)';
                                            (e.currentTarget as HTMLElement).style.color = '#cdcdff';
                                        }}
                                        onMouseLeave={e => {
                                            (e.currentTarget as HTMLElement).style.background = 'transparent';
                                            (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                                        }}
                                    >
                                        {t.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Other nav links */}
                    {NAV_LINKS.map(l => (
                        <Link key={l.href} href={l.href} style={linkStyle}
                            onMouseEnter={e => {
                                (e.target as HTMLElement).style.color = 'var(--text-primary)';
                                (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                            }}
                            onMouseLeave={e => {
                                (e.target as HTMLElement).style.color = 'var(--text-secondary)';
                                (e.target as HTMLElement).style.background = 'transparent';
                            }}
                        >
                            {l.label}
                        </Link>
                    ))}

                    {/* Company dropdown */}
                    <div
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setCompanyOpen(true)}
                        onMouseLeave={() => setCompanyOpen(false)}
                    >
                        <button
                            style={{
                                ...linkStyle,
                                background: companyOpen ? 'rgba(255,255,255,0.06)' : 'transparent',
                                color: companyOpen ? 'var(--text-primary)' : 'var(--text-secondary)',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                            }}
                        >
                            Company
                            <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: companyOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                        </button>

                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            minWidth: 180,
                            paddingTop: '8px',
                            opacity: companyOpen ? 1 : 0,
                            pointerEvents: companyOpen ? 'auto' : 'none',
                            transform: companyOpen ? 'translateY(0)' : 'translateY(-6px)',
                            transition: 'opacity 0.18s ease, transform 0.18s ease',
                        }}>
                            <div style={{
                                background: 'rgba(10,18,36,0.97)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 14,
                                padding: '8px',
                                boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                                backdropFilter: 'blur(20px)',
                            }}>
                                {COMPANY_LINKS.map(c => (
                                    <Link
                                        key={c.href}
                                        href={c.href}
                                        onClick={() => setCompanyOpen(false)}
                                        style={{
                                            display: 'block',
                                            padding: '10px 14px',
                                            borderRadius: 10,
                                            fontSize: '0.85rem',
                                            fontWeight: 500,
                                            color: 'var(--text-secondary)',
                                            textDecoration: 'none',
                                            transition: 'background 0.15s, color 0.15s',
                                        }}
                                        onMouseEnter={e => {
                                            (e.currentTarget as HTMLElement).style.background = 'rgba(186,158,255,0.12)';
                                            (e.currentTarget as HTMLElement).style.color = '#cdcdff';
                                        }}
                                        onMouseLeave={e => {
                                            (e.currentTarget as HTMLElement).style.background = 'transparent';
                                            (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                                        }}
                                    >
                                        {c.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    
                    {/* GitHub Link */}
                    <a 
                        href="https://github.com/satyasanatan989/VisualizeMyData" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="GitHub Repository"
                        className="hidden-mobile"
                        style={{
                            width: 36, height: 36, borderRadius: 8,
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: 'var(--text-secondary)',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                        <Github size={16} />
                    </a>

                    {/* Support Mail Link */}
                    <a 
                        href="mailto:support@visualizemydata.in?subject=VisualizeMyData Support Request"
                        aria-label="Contact Support"
                        className="hidden-mobile"
                        style={{
                            width: 36, height: 36, borderRadius: 8,
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: 'var(--text-secondary)',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                        <HelpCircle size={16} />
                    </a>
                    
                    {/* Theme Selector Dropdown */}
                    <div style={{ position: 'relative' }}>
                        <button 
                            onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                            aria-label="Select theme"
                            style={{
                                width: 36, height: 36, borderRadius: 8,
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', color: 'var(--text-secondary)',
                                transition: 'all 0.2s',
                            }}
                        >
                            {theme === 'light' ? <Sun size={16} /> : theme === 'dark' ? <Moon size={16} /> : <Monitor size={16} />}
                        </button>
                        
                        {themeDropdownOpen && (
                            <div style={{
                                position: 'absolute',
                                top: '120%',
                                right: 0,
                                minWidth: 120,
                                background: 'rgba(10,18,36,0.98)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 12,
                                padding: 6,
                                boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                                zIndex: 100,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2
                            }}>
                                {[
                                    { id: 'light', label: 'Light', icon: <Sun size={13} /> },
                                    { id: 'dark', label: 'Dark', icon: <Moon size={13} /> },
                                    { id: 'system', label: 'System', icon: <Monitor size={13} /> }
                                ].map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => changeTheme(item.id as any)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 8,
                                            padding: '8px 10px',
                                            borderRadius: 8,
                                            border: 'none',
                                            background: theme === item.id ? 'rgba(186,158,255,0.12)' : 'transparent',
                                            color: theme === item.id ? '#cdcdff' : 'var(--text-secondary)',
                                            fontSize: '0.8rem',
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                            width: '100%',
                                            textAlign: 'left',
                                            transition: 'background 0.2s'
                                        }}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        className="hidden-mobile"
                        onClick={() => document.getElementById('upload-zone')?.scrollIntoView({ behavior: 'smooth' })}
                        style={{
                            padding: '8px 18px', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600,
                            background: 'var(--accent-primary)',
                            color: '#000', border: 'none', cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(186,158,255,0.3)',
                        }}
                    >
                        Try Free
                    </button>
                    <button
                        onClick={() => setMobileOpen(o => !o)}
                        className="show-mobile"
                        style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: 4 }}
                        aria-label="Menu"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Bottom-Sheet Style Menu Redesign */}
            {mobileOpen && (
                <div style={{
                    position: 'fixed',
                    top: 64,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(2, 8, 23, 0.96)',
                    backdropFilter: 'blur(20px)',
                    zIndex: 49,
                    padding: '20px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    overflowY: 'auto'
                }}>
                    {/* Floating Mobile Search bar */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 12,
                        padding: '10px 16px'
                    }}>
                        <Search size={16} color="var(--text-muted)" />
                        <input
                            type="text"
                            placeholder="Search tools..."
                            value={mobileSearchQuery}
                            onChange={(e) => setMobileSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                background: 'none',
                                border: 'none',
                                outline: 'none',
                                color: '#fff',
                                fontSize: '0.88rem'
                            }}
                        />
                    </div>

                    {mobileSearchQuery ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Matches ({filteredMobileTools.length})</p>
                            {filteredMobileTools.map(l => (
                                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
                                    padding: '10px 12px', borderRadius: 8, fontSize: '0.85rem', fontWeight: 500,
                                    color: 'var(--text-secondary)', textDecoration: 'none', background: 'rgba(255,255,255,0.01)',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                }}>
                                    <span>{l.label}</span>
                                    <ArrowRight size={12} color="var(--text-muted)" />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <>
                            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: 0 }}>Tools Catalog</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                {TOOL_LINKS.map(l => (
                                    <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
                                        padding: '10px', borderRadius: 10, fontSize: '0.78rem', fontWeight: 500,
                                        color: 'var(--text-secondary)', textDecoration: 'none', background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid var(--border-subtle)', textAlign: 'center'
                                    }}>
                                        {l.label}
                                    </Link>
                                ))}
                            </div>
                            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', margin: 0 }} />
                            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: 0 }}>Navigation</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {NAV_LINKS.map(l => (
                                    <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
                                        padding: '8px 12px', borderRadius: 8, fontSize: '0.85rem', fontWeight: 500,
                                        color: 'var(--text-secondary)', textDecoration: 'none',
                                    }}>
                                        {l.label}
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}

            <style>{`
                @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
                @media (min-width: 769px) { .show-mobile { display: none !important; } }
            `}</style>
        </nav>
    );
}
