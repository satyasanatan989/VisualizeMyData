'use client';

import React, { useEffect, useState } from 'react';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { GALLERY_DASHBOARDS, GalleryDashboard } from '@/lib/galleryRegistry';
import ScrollReveal from '@/components/ScrollReveal';

export default function GalleryPage() {
    const [localDashboards, setLocalDashboards] = useState<GalleryDashboard[]>([]);
    const [filter, setFilter] = useState('All');

    // On mount, load user-published dashboards from localStorage
    useEffect(() => {
        try {
            const keys = Object.keys(localStorage).filter(k => k.startsWith('local-dash-'));
            const loaded = keys.map(k => {
                const item = localStorage.getItem(k);
                return item ? JSON.parse(item) as GalleryDashboard : null;
            }).filter(Boolean) as GalleryDashboard[];

            setLocalDashboards(loaded);
        } catch (e) {
            console.error("Failed to load local dashboards", e);
        }
    }, []);

    const allDashboards = [...localDashboards, ...GALLERY_DASHBOARDS];
    const categories = ['All', 'Sales', 'Marketing', 'Finance', 'Survey', 'User Generated'];

    const filtered = allDashboards.filter(d => {
        if (filter === 'All') return true;
        if (filter === 'User Generated') return d.slug.startsWith('local-');
        return d.tags.includes(filter);
    });

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />

            <section style={{ padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-10%', left: '10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
                </div>
                <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
                    <span className="badge badge-blue" style={{ marginBottom: 16 }}>Community & Examples</span>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 20, color: 'var(--text-primary)' }}>
                        Dashboard <span className="gradient-text">Gallery</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.6 }}>
                        Explore interactive data dashboards generated with VisualizeMyData. Filter by category or publish your own directly from the generator tool.
                    </p>

                    {/* Filters */}
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
                        {categories.map(c => (
                            <button
                                key={c}
                                onClick={() => setFilter(c)}
                                style={{
                                    padding: '8px 18px',
                                    borderRadius: 30,
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    background: filter === c ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.03)',
                                    color: filter === c ? '#60a5fa' : 'var(--text-secondary)',
                                    border: `1px solid ${filter === c ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.08)'}`,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                            >
                                {c}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24, textAlign: 'left' }}>
                        {filtered.map((dash, i) => (
                            <ScrollReveal key={dash.slug} delay={i * 50}>
                                <Link href={`/gallery/${dash.slug}`} style={{ textDecoration: 'none' }}>
                                    <div className="glass-card glass-card-hover" style={{ padding: 20, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        {/* Thumbnail (using css gradient fallback if image fails) */}
                                        <div style={{
                                            width: '100%', height: 160, borderRadius: 12, marginBottom: 16, overflow: 'hidden',
                                            background: dash.thumbnail.startsWith('data:') ? `url(${dash.thumbnail}) center/cover` : 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))',
                                            border: '1px solid var(--border-subtle)',
                                            position: 'relative'
                                        }}>
                                            {!dash.thumbnail.startsWith('data:') && (
                                                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5, fontSize: '3rem' }}>
                                                    📊
                                                </div>
                                            )}
                                        </div>

                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.3 }}>
                                            {dash.title}
                                        </h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 16, flex: 1 }}>
                                            {dash.description.length > 100 ? dash.description.slice(0, 100) + '...' : dash.description}
                                        </p>

                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
                                            {dash.tags.slice(0, 3).map(tag => (
                                                <span key={tag} style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', padding: '2px 8px', borderRadius: 4 }}>
                                                    {tag}
                                                </span>
                                            ))}
                                            {dash.slug.startsWith('local-') && (
                                                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#10b981', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', padding: '2px 8px', borderRadius: 4 }}>
                                                    LOCAL
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div style={{ padding: '60px 0', color: 'var(--text-muted)' }}>
                            No dashboards found for this category.
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
