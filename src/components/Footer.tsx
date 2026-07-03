'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BarChart2, Shield, Trash2, Lock, ArrowRight, Github, Twitter, Linkedin, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function Footer() {
    const year = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !email.includes('@')) {
            toast.error('Please enter a valid email address.');
            return;
        }
        setSubscribed(true);
        toast.success('Thank you for subscribing to ToolVista newsletter!');
        setEmail('');
    };

    return (
        <footer style={{
            background: 'var(--surface-base)',
            borderTop: '1px solid var(--border-subtle)',
            marginTop: 80,
            fontFamily: 'var(--font-inter)'
        }}>
            {/* Trust bar */}
            <div style={{
                background: 'var(--surface-low)',
                borderBottom: '1px solid var(--border-subtle)',
                padding: '20px 0',
            }}>
                <div className="container" style={{
                    display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', alignItems: 'center',
                }}>
                    {[
                        { icon: <Shield size={16} />, text: '100% Secure Processing' },
                        { icon: <Trash2 size={16} />, text: 'Files Auto-Deleted' },
                        { icon: <Lock size={16} />, text: 'No Data Stored' },
                    ].map(({ icon, text }) => (
                        <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 600 }}>
                            <span style={{ color: 'var(--accent-emerald)' }}>{icon}</span>
                            {text}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main footer content */}
            <div className="container" style={{ padding: '60px 24px 40px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 60 }}>
                    {/* Brand + Newsletter */}
                    <div style={{ gridColumn: 'span 2' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <div style={{
                                width: 32, height: 32, borderRadius: 8,
                                background: 'linear-gradient(135deg, #ba9eff, #8455ef)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <BarChart2 size={16} color="white" />
                            </div>
                            <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.05rem', letterSpacing: '-0.02em' }}>ToolVista</span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: 24, maxWidth: 300 }}>
                            Free online browser-based utilities to create dashboards, format developer code, split PDFs, and visualize spreadsheets instantly.
                        </p>
                        
                        {/* Newsletter box */}
                        <div style={{ maxWidth: 320 }}>
                            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Subscribe to Updates</p>
                            {subscribed ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#10b981', fontSize: '0.82rem', background: 'rgba(16,185,129,0.06)', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(16,185,129,0.15)' }}>
                                    <Check size={14} />
                                    <span>You are subscribed to ToolVista updates!</span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 8 }}>
                                    <input 
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        style={{
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid var(--border-subtle)',
                                            borderRadius: 8,
                                            padding: '8px 12px',
                                            fontSize: '0.82rem',
                                            color: '#fff',
                                            outline: 'none',
                                            width: '100%'
                                        }}
                                    />
                                    <button 
                                        type="submit"
                                        style={{
                                            background: 'var(--accent-primary)',
                                            color: '#000',
                                            border: 'none',
                                            borderRadius: 8,
                                            padding: '0 14px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <ArrowRight size={14} />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Solutions */}
                    <div>
                        <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: 16, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Solutions</h4>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {[
                                { label: 'Excel Visualizer', href: '/excel-visualizer' },
                                { label: 'CSV Visualizer', href: '/csv-visualizer' },
                                { label: 'PDF Visualizer', href: '/pdf-visualizer' },
                                { label: 'Google Sheets', href: '/google-sheets-visualizer' },
                                { label: 'Dashboard Creator', href: '/dashboard-generator' },
                                { label: 'Visual Templates', href: '/templates' },
                            ].map(l => (
                                <Link key={l.href} href={l.href} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.82rem', transition: 'color 0.15s' }}
                                    onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--text-primary)'}
                                    onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: 16, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Resources</h4>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {[
                                { label: 'Excel Chart Generator', href: '/excel-chart-generator' },
                                { label: 'CSV Chart Generator', href: '/csv-chart-generator' },
                                { label: 'PDF Chart Generator', href: '/pdf-chart-generator' },
                                { label: 'Sheets Chart Maker', href: '/google-sheets-chart-generator' },
                                { label: 'Online Chart Maker', href: '/online-chart-maker' },
                                { label: 'Free Viz Tool', href: '/free-data-visualization-tool' },
                            ].map(l => (
                                <Link key={l.href} href={l.href} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.82rem', transition: 'color 0.15s' }}
                                    onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--text-primary)'}
                                    onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Legal & Company */}
                    <div>
                        <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: 16, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Legal</h4>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {[
                                { label: 'About Us', href: '/about' },
                                { label: 'Contact Us', href: '/contact' },
                                { label: 'Privacy Policy', href: '/privacy-policy' },
                                { label: 'Terms of Service', href: '/terms' },
                                { label: 'Disclaimer', href: '/disclaimer' },
                            ].map(l => (
                                <Link key={l.href} href={l.href} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.82rem', transition: 'color 0.15s' }}
                                    onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--text-primary)'}
                                    onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                <div className="divider" style={{ borderTop: '1px solid var(--border-subtle)', margin: '40px 0 24px' }} />
                
                <div style={{
                    display: 'flex', flexWrap: 'wrap',
                    justifyContent: 'space-between', alignItems: 'center', gap: 16,
                }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>
                        © {year} VisualizeMyData. All rights reserved. Made for premium offline browser productivity.
                    </p>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.15s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}>
                            <Github size={18} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.15s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}>
                            <Twitter size={18} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.15s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}>
                            <Linkedin size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
