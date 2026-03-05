import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import LearnGrid from '@/components/learn/LearnGrid';
import { LearnArticle } from '@/components/learn/LearnArticleCard';

export const metadata: Metadata = {
    title: 'Learn Data Visualization: Guides & Best Practices | VisualizeMyData',
    description: 'Master data visualization with our free educational hub. Learn how to create charts from Excel, design effective dashboards, and choose the right visualization techniques.',
    alternates: { canonical: 'https://visualizemydata.in/learn/' },
    openGraph: {
        title: 'Learn Data Visualization | Free Guides & Tutorials',
        description: 'Master data visualization with our free educational hub. Learn how to create charts from Excel, design effective dashboards, and choose the right visualization techniques.',
        url: 'https://visualizemydata.in/learn/',
    },
};

export const LEARN_ARTICLES: LearnArticle[] = [
    {
        title: 'What Is Data Visualization? A Beginner\'s Guide',
        description: 'Understand the core concepts of data visualization, why it matters, and how transforming raw numbers into visual formats helps uncover hidden patterns.',
        href: '/learn/what-is-data-visualization',
        readTime: '6 min',
        icon: '👁️',
        color: '#3b82f6',
    },
    {
        title: 'How to Create Charts from Excel Data',
        description: 'A complete step-by-step tutorial on preparing your spreadsheet data, selecting the right columns, and generating professional charts instantly.',
        href: '/learn/how-to-create-charts-from-excel',
        readTime: '8 min',
        icon: '📊',
        color: '#10b981',
    },
    {
        title: 'Best Data Visualization Techniques for 2026',
        description: 'Explore the most effective techniques for modern data presentation, including interactive filtering, color psychology, and proper axis scaling.',
        href: '/learn/best-data-visualization-techniques',
        readTime: '7 min',
        icon: '✨',
        color: '#f59e0b',
    },
    {
        title: 'Dashboard Design Best Practices',
        description: 'Learn how to build KPI dashboards that actually drive decisions. Covers layout hierarchy, reducing cognitive load, and actionable metrics.',
        href: '/learn/dashboard-design-best-practices',
        readTime: '9 min',
        icon: '📈',
        color: '#8b5cf6',
    },
    {
        title: 'Common Chart Types & When to Use Them',
        description: 'Stop guessing which chart to use. This comprehensive guide explains exactly when to use Bar, Line, Pie, Area, and Scatter charts for your specific dataset.',
        href: '/learn/common-chart-types',
        readTime: '10 min',
        icon: '📐',
        color: '#f43f5e',
    },
];

export default function LearnIndexPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />

            {/* Hero Section */}
            <section style={{ padding: '70px 0 50px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at top, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />
                <div className="container" style={{ position: 'relative', maxWidth: 780, textAlign: 'center' }}>
                    <span style={{
                        display: 'inline-block', padding: '5px 16px', borderRadius: 99,
                        background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
                        fontSize: '0.75rem', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20
                    }}>
                        Knowledge Hub
                    </span>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 18 }}>
                        Learn Data Visualization
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: 640, margin: '0 auto' }}>
                        Transforming raw data into clear, actionable insights is a superpower. Explore our comprehensive guides, best practices, and tutorials to master the art of data storytelling.
                    </p>
                </div>
            </section>

            {/* Articles Grid */}
            <section style={{ paddingBottom: 100 }}>
                <div className="container">
                    <LearnGrid articles={LEARN_ARTICLES} />
                </div>
            </section>

            {/* Internal Linking Block */}
            <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: 600 }}>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 800, marginBottom: 16 }}>
                        Ready to apply what you've learned?
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.7 }}>
                        Use our free, browser-based tools to instantly convert your Excel, CSV, or Google Sheets data into beautiful interactive visualizations.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
                        <a href="/dashboard-generator" style={{ color: 'var(--accent-blue)', fontWeight: 600, textDecoration: 'underline' }}>Dashboard Generator →</a>
                        <a href="/csv-visualizer" style={{ color: 'var(--accent-blue)', fontWeight: 600, textDecoration: 'underline' }}>CSV Visualizer →</a>
                        <a href="/data-report-generator" style={{ color: 'var(--accent-blue)', fontWeight: 600, textDecoration: 'underline' }}>Report Generator →</a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
