'use client';

import React, { useEffect, useState } from 'react';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import DashboardGenerator from '@/components/dashboard/DashboardGenerator';
import { GalleryDashboard, getPublicDashboard } from '@/lib/galleryRegistry';
import Link from 'next/link';

export default function PublicDashboardViewer({ slug }: { slug: string }) {
    const [dashboard, setDashboard] = useState<GalleryDashboard | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Check SEO registry first
        const seoDash = getPublicDashboard(slug);
        if (seoDash) {
            setDashboard(seoDash);
            setLoading(false);
            return;
        }

        // 2. Fallback to LocalStorage for user-generated
        try {
            const localRaw = localStorage.getItem(`local-dash-${slug.replace('local-', '')}`);
            if (localRaw) {
                setDashboard(JSON.parse(localRaw));
            }
        } catch (e) {
            console.error("Failed loading local dashboard", e);
        } finally {
            setLoading(false);
        }
    }, [slug]);

    if (loading) {
        return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading dashboard...</div>;
    }

    if (!dashboard) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
                <NavbarWrapper />
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <h2>Dashboard Not Found</h2>
                    <p style={{ color: 'var(--text-muted)' }}>This link may be invalid or the dashboard was deleted.</p>
                    <Link href="/gallery" className="btn-primary" style={{ marginTop: 20 }}>Back to Gallery</Link>
                </div>
                <Footer />
            </div>
        );
    }

    // Format `data` to match the expected `ParsedData` signature of `DashboardGenerator`
    const { analyzeColumnsFromData } = require('@/lib/excelParser');
    const columns = analyzeColumnsFromData(dashboard.data.rows);

    const parsedDataWrapper = {
        fileName: `${dashboard.title}.csv`,
        data: dashboard.data.rows,
        columns: columns,
        rowCount: dashboard.data.rows.length,
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column' }}>
            <NavbarWrapper />

            <div style={{ padding: '40px 0 20px', background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                            <Link href="/gallery" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>← Gallery</Link>
                            <span style={{ color: 'var(--text-muted)' }}>/</span>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{slug.startsWith('local-') ? 'User Published' : 'Showcase'}</span>
                        </div>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 10px' }}>{dashboard.title}</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: 700, margin: 0 }}>{dashboard.description}</p>
                        <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                            {dashboard.tags.map(tag => (
                                <span key={tag} style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)', padding: '2px 8px', borderRadius: 4 }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: 10 }}>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                alert('Link copied to clipboard!');
                            }}
                            className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                        >
                            🔗 Share Link
                        </button>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginTop: 24, paddingBottom: 60 }}>
                {/* 
                  Passing the formatted data to the existing Dashboard component.
                  We pass a flag or rely on its standard behavior. Since we mimic a CSV upload, it works out of the box.
                */}
                <DashboardGenerator
                    parsedData={parsedDataWrapper as any}
                    onReset={() => { window.location.href = '/' }}
                />
            </div>

            <Footer />
        </div>
    );
}
