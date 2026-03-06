'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BarChart2, Moon, Sun, Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
    darkMode: boolean;
    onToggleDark: () => void;
}

const TOOL_LINKS = [
    { label: '📗 Excel Visualizer', href: '/excel-visualizer' },
    { label: '📋 CSV Visualizer', href: '/csv-visualizer' },
    { label: '📕 PDF Visualizer', href: '/pdf-visualizer' },
    { label: '🔗 Google Sheets', href: '/google-sheets-visualizer' },
];

const NAV_LINKS = [
    { label: 'Multi-Chart', href: '/multi-chart-generator' },
    { label: 'Dashboard', href: '/dashboard-generator' },
    { label: 'Report', href: '/data-report-generator' },
    { label: 'Templates', href: '/templates' },
    { label: 'Learn', href: '/learn' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
];

export default function Navbar({ darkMode, onToggleDark }: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [toolsOpen, setToolsOpen] = useState(false);

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
                background: 'rgba(2, 8, 23, 0.88)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
        >
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
                {/* Logo */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                    <div style={{
                        width: 34, height: 34, borderRadius: 10,
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 20px rgba(59,130,246,0.4)',
                    }}>
                        <BarChart2 size={18} color="white" />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                        DataVisualizer
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

                        {/* Dropdown panel */}
                        <div style={{
                            position: 'absolute',
                            top: 'calc(100% + 8px)',
                            left: 0,
                            minWidth: 210,
                            background: 'rgba(10,18,36,0.97)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 14,
                            padding: '8px',
                            boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(20px)',
                            opacity: toolsOpen ? 1 : 0,
                            pointerEvents: toolsOpen ? 'auto' : 'none',
                            transform: toolsOpen ? 'translateY(0)' : 'translateY(-6px)',
                            transition: 'opacity 0.18s ease, transform 0.18s ease',
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
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.12)';
                                        (e.currentTarget as HTMLElement).style.color = '#93c5fd';
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
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <button onClick={onToggleDark} aria-label="Toggle dark mode" style={{
                        width: 36, height: 36, borderRadius: 8,
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: 'var(--text-secondary)',
                        transition: 'all 0.2s',
                    }}>
                        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                    <button
                        className="hidden-mobile"
                        onClick={() => document.getElementById('upload-zone')?.scrollIntoView({ behavior: 'smooth' })}
                        style={{
                            padding: '8px 18px', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600,
                            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                            color: 'white', border: 'none', cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(59,130,246,0.3)',
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

            {/* Mobile dropdown */}
            {mobileOpen && (
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    padding: '12px 24px 16px',
                    display: 'flex', flexDirection: 'column', gap: 4,
                }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '8px 0 4px 12px' }}>Tools</p>
                    {TOOL_LINKS.map(l => (
                        <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
                            padding: '10px 12px', borderRadius: 8, fontSize: '0.9rem', fontWeight: 500,
                            color: 'var(--text-secondary)', textDecoration: 'none',
                        }}>
                            {l.label}
                        </Link>
                    ))}
                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', margin: '6px 0' }} />
                    {NAV_LINKS.map(l => (
                        <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
                            padding: '10px 12px', borderRadius: 8, fontSize: '0.9rem', fontWeight: 500,
                            color: 'var(--text-secondary)', textDecoration: 'none',
                        }}>
                            {l.label}
                        </Link>
                    ))}
                </div>
            )}

            <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
      `}</style>
        </nav>
    );
}
