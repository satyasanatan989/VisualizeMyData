'use client';

import Link from 'next/link';
import { BarChart2, Shield, Trash2, Lock } from 'lucide-react';

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-subtle)',
            marginTop: 80,
        }}>
            {/* Trust bar */}
            <div style={{
                background: 'linear-gradient(90deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))',
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
                        <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>
                            <span style={{ color: 'var(--accent-emerald)' }}>{icon}</span>
                            {text}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main footer */}
            <div className="container" style={{ padding: '48px 24px 32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 40 }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                            <div style={{
                                width: 30, height: 30, borderRadius: 8,
                                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <BarChart2 size={16} color="white" />
                            </div>
                            <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1rem' }}>DataVisualizer</span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', lineHeight: 1.7 }}>
                            Free online tool to visualize Excel, CSV, Google Sheets & PDF data instantly without signup.
                        </p>
                    </div>

                    {/* Tools */}
                    <div>
                        <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: 14, fontSize: '0.875rem' }}>Core Tools</h4>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {[
                                { label: 'Excel Visualizer', href: '/excel-visualizer' },
                                { label: 'CSV Visualizer', href: '/csv-visualizer' },
                                { label: 'PDF Visualizer', href: '/pdf-visualizer' },
                                { label: 'Google Sheets', href: '/google-sheets-visualizer' },
                                { label: 'Dashboard Generator', href: '/dashboard-generator' },
                                { label: 'Data Report', href: '/data-report-generator' },
                                { label: 'Templates', href: '/templates' },
                            ].map(l => (
                                <Link key={l.href} href={l.href} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.8125rem', transition: 'color 0.2s' }}>
                                    {l.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* SEO Tools */}
                    <div>
                        <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: 14, fontSize: '0.875rem' }}>SEO Tools</h4>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {[
                                { label: 'Excel Chart Generator', href: '/excel-chart-generator' },
                                { label: 'CSV Chart Generator', href: '/csv-chart-generator' },
                                { label: 'PDF Chart Generator', href: '/pdf-chart-generator' },
                                { label: 'Google Sheets Charts', href: '/google-sheets-chart-generator' },
                                { label: 'Online Chart Maker', href: '/online-chart-maker' },
                                { label: 'Free Viz Tool', href: '/free-data-visualization-tool' },
                                { label: 'Spreadsheet to Chart', href: '/spreadsheet-to-chart' },
                            ].map(l => (
                                <Link key={l.href} href={l.href} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.8125rem' }}>
                                    {l.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: 14, fontSize: '0.875rem' }}>Company</h4>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {[
                                { label: 'About Us', href: '/about' },
                                { label: 'Contact Us', href: '/contact' },
                            ].map(l => (
                                <Link key={l.href} href={l.href} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.8125rem' }}>
                                    {l.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: 14, fontSize: '0.875rem' }}>Legal</h4>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {[
                                { label: 'Privacy Policy', href: '/privacy-policy' },
                                { label: 'Terms & Conditions', href: '/terms' },
                                { label: 'Disclaimer', href: '/disclaimer' },
                            ].map(l => (
                                <Link key={l.href} href={l.href} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.8125rem' }}>
                                    {l.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                <div className="divider" />
                <div style={{
                    paddingTop: 24, display: 'flex', flexWrap: 'wrap',
                    justifyContent: 'space-between', alignItems: 'center', gap: 12,
                }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                        © {year} VisualizeMyData. All rights reserved. Registered Business Entity.
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                        Your files are private and automatically deleted. No data is stored.
                    </p>
                </div>
            </div>
        </footer>
    );
}
