import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import InteractiveLearnHub from '@/components/learn/InteractiveLearnHub';

export const metadata: Metadata = {
    title: 'Learn Data Visualization: Guides & Best Practices | VisualizeMyData',
    description: 'Master data visualization with our free educational hub. Learn how to create charts from Excel, design effective dashboards, and choose the right visualization techniques.',
    alternates: {
        canonical: 'https://visualizemydata.in/learn/',
    },
    openGraph: {
        title: 'Learn Data Visualization: Guides & Best Practices | VisualizeMyData',
        description: 'Master data visualization with our free educational hub. Learn how to create charts from Excel, design effective dashboards, and choose the right visualization techniques.',
        url: 'https://visualizemydata.in/learn/',
        type: 'website',
        siteName: 'VisualizeMyData',
        locale: 'en_US',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'VisualizeMyData',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Learn Data Visualization: Guides & Best Practices | VisualizeMyData',
        description: 'Master data visualization with our free educational hub. Learn how to create charts from Excel, design effective dashboards, and choose the right visualization techniques.',
        images: ['/og-image.png'],
    },
};;

const LEARN_ARTICLES = [
    {
        title: 'What Is Data Visualization? A Beginner\'s Guide',
        description: 'Understand the core concepts of data visualization, why it matters, and how transforming raw numbers into visual formats helps uncover hidden patterns.',
        href: '/learn/what-is-data-visualization',
        readTime: '6 min',
        icon: '👁️',
        color: '#3b82f6',
        category: 'Data Visualization'
    },
    {
        title: 'How to Create Charts from Excel Data',
        description: 'A complete step-by-step tutorial on preparing your spreadsheet data, selecting the right columns, and generating professional charts instantly.',
        href: '/learn/how-to-create-charts-from-excel',
        readTime: '8 min',
        icon: '📊',
        color: '#10b981',
        category: 'Excel'
    },
    {
        title: 'Best Data Visualization Techniques for 2026',
        description: 'Explore the most effective techniques for modern data presentation, including interactive filtering, color psychology, and proper axis scaling.',
        href: '/learn/best-data-visualization-techniques',
        readTime: '7 min',
        icon: '✨',
        color: '#f59e0b',
        category: 'Data Visualization'
    },
    {
        title: 'Dashboard Design Best Practices',
        description: 'Learn how to build KPI dashboards that actually drive decisions. Covers layout hierarchy, reducing cognitive load, and actionable metrics.',
        href: '/learn/dashboard-design-best-practices',
        readTime: '9 min',
        icon: '📈',
        color: '#8b5cf6',
        category: 'Dashboards'
    },
    {
        title: 'Common Chart Types & When to Use Them',
        description: 'Stop guessing which chart to use. This comprehensive guide explains exactly when to use Bar, Line, Pie, Area, and Scatter charts for your specific dataset.',
        href: '/learn/common-chart-types',
        readTime: '10 min',
        icon: '📐',
        color: '#f43f5e',
        category: 'Data Visualization'
    },
    {
        title: 'How to Create Professional Dashboards: The Complete Guide',
        description: 'Detailed analysis of information grids, target persona definitions, and metrics filtering to construct business dashboards.',
        href: '/blog/how-to-create-professional-dashboards',
        readTime: '12 min',
        icon: '💼',
        color: '#ba9eff',
        category: 'Dashboards'
    },
    {
        title: 'Best Excel Dashboard Templates for Business Operations',
        description: 'Explore professional pre-made templates to turn your Excel spreadsheets into fully functioning KPI trackers.',
        href: '/blog/best-excel-dashboard-templates',
        readTime: '8 min',
        icon: '📗',
        color: '#10b981',
        category: 'Excel'
    },
    {
        title: 'Dashboard Design Principles: Cognitive Load & Grid Layouts',
        description: 'Align widgets, reduce visual clutter, and manage Z-pattern reading flows for presentation-ready analytical panels.',
        href: '/blog/dashboard-design-principles',
        readTime: '9 min',
        icon: '🎨',
        color: '#6366f1',
        category: 'Dashboards'
    },
    {
        title: 'Essential Excel Tips for Data Analysts',
        description: 'Formulas, macros bypasses, and data layout formats every spreadsheet designer needs to know.',
        href: '/blog/excel-tips',
        readTime: '9 min',
        icon: '⚡',
        color: '#10b981',
        category: 'Excel'
    },
    {
        title: 'Google Sheets Live Dashboard Guide',
        description: 'Sync online sheets, use public viewer links, and generate live charts without exports.',
        href: '/blog/google-sheets-guide',
        readTime: '8 min',
        icon: '🔗',
        color: '#3b82f6',
        category: 'Google Sheets'
    },
    {
        title: 'The Complete Guide to Handling CSV Files Online',
        description: 'UTF encoding, raw delimit parameters, and comma-separated layouts parsed in-memory.',
        href: '/blog/csv-guide',
        readTime: '8 min',
        icon: '📋',
        color: '#ba9eff',
        category: 'CSV'
    },
    {
        title: 'The Ultimate Data Cleaning Guide for Spreadsheets',
        description: 'Remove duplicates, handle blank coordinates, and standardize columns for error-free graphing.',
        href: '/blog/data-cleaning-guide',
        readTime: '9 min',
        icon: '🧹',
        color: '#8455ef',
        category: 'CSV'
    },
    {
        title: 'Image Optimization Best Practices for Web Performance',
        description: 'Resize, crop, and convert files into highly compressed WEBP formats without leaving the browser.',
        href: '/blog/image-optimization-guide',
        readTime: '7 min',
        icon: '🎨',
        color: '#f43f5e',
        category: 'Images'
    },
    {
        title: 'PDF Table Extraction & Workspace Workflows',
        description: 'Extract raw tables, parse PDF margins, and convert them to interactive bar and line charts.',
        href: '/blog/pdf-workflow-guide',
        readTime: '8 min',
        icon: '📕',
        color: '#ef4444',
        category: 'PDF'
    },
    {
        title: 'Essential Developer Utilities Guide',
        description: 'Browser-based JSON parsing, UUID generation, and base64 tools to keep keys private.',
        href: '/blog/developer-utilities-guide',
        readTime: '8 min',
        icon: '💻',
        color: '#10b981',
        category: 'Developer'
    }
];

export default function LearnIndexPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />

            {/* Hero Section */}
            <section style={{ padding: '70px 0 50px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at top, rgba(132,85,239,0.08) 0%, transparent 70%)' }} />
                <div className="container" style={{ position: 'relative', maxWidth: 780, textAlign: 'center', margin: '0 auto' }}>
                    <span style={{
                        display: 'inline-block', padding: '5px 16px', borderRadius: 99,
                        background: 'rgba(132,85,239,0.1)', border: '1px solid rgba(132,85,239,0.2)',
                        fontSize: '0.75rem', fontWeight: 800, color: '#ba9eff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20
                    }}>
                        Knowledge Hub
                    </span>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 18, textAlign: 'center' }}>
                        Learn Data Visualization
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
                        Master data formatting, spreadsheet visualization, and browser optimization. Explore our comprehensive guides, best practices, and tutorials to unlock the power of data storytelling.
                    </p>
                </div>
            </section>

            {/* Interactive Client Hub */}
            <section style={{ paddingBottom: 100 }}>
                <div className="container">
                    <InteractiveLearnHub articles={LEARN_ARTICLES as any} />
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
