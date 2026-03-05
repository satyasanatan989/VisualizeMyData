import React from 'react';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface LearnArticleLayoutProps {
    title: string;
    description: string;
    date: string;
    readTime: string;
    children: React.ReactNode;
}

export default function LearnArticleLayout({ title, description, date, readTime, children }: LearnArticleLayoutProps) {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />

            <main style={{ padding: '40px 0 80px' }}>
                <article className="container" style={{ maxWidth: 760 }}>
                    {/* Breadcrumbs */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 24 }}>
                        <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
                        <span>›</span>
                        <Link href="/learn" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Learn</Link>
                        <span>›</span>
                        <span style={{ color: 'var(--text-muted)' }}>Article</span>
                    </div>

                    {/* Header */}
                    <header style={{ marginBottom: 40, paddingBottom: 32, borderBottom: '1px solid var(--border-subtle)' }}>
                        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 16 }}>
                            {title}
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: 24 }}>
                            {description}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            <span>Published: {date}</span>
                            <span>·</span>
                            <span>{readTime} read</span>
                        </div>
                    </header>

                    {/* Content */}
                    <div className="prose" style={{ lineHeight: 1.8 }}>
                        {children}
                    </div>

                    {/* Related Tools CTA */}
                    <div style={{
                        marginTop: 64, padding: '32px 40px', borderRadius: 16,
                        background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))',
                        border: '1px solid rgba(59,130,246,0.15)',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>
                            Ready to Visualize Your Data?
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
                            Apply what you've learned. Upload your dataset and generate beautiful, interactive charts directly in your browser.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                            <Link href="/dashboard-generator" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>Dashboard Builder</Link>
                            <Link href="/excel-visualizer" style={{ padding: '10px 24px', fontSize: '0.9rem', background: 'var(--bg-glass)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)', borderRadius: 8, fontWeight: 700, textDecoration: 'none' }}>Chart Generator</Link>
                            <Link href="/data-report-generator" style={{ padding: '10px 24px', fontSize: '0.9rem', background: 'var(--bg-glass)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)', borderRadius: 8, fontWeight: 700, textDecoration: 'none' }}>Report Generator</Link>
                        </div>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
