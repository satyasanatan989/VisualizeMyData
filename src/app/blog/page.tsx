import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import Link from 'next/link';

// -------------------- BLOG INDEX --------------------

export const metadata: Metadata = {
    title: 'Data Visualization Blog | Excel, CSV & Dashboard Guides | VisualizeMyData',
    description: 'Free guides and tutorials on data visualization, Excel dashboards, CSV charts, and online analytics tools. Learn how to visualize data effectively.',
    alternates: { canonical: 'https://visualizemydata.in/blog/' },
    openGraph: {
        title: 'Data Visualization Blog | VisualizeMyData',
        description: 'Tutorials, guides, and tips on Excel charts, CSV dashboards, and data visualization best practices.',
        url: 'https://visualizemydata.in/blog/',
    },
};

const posts = [
    {
        slug: 'how-to-visualize-excel-data',
        title: 'How to Visualize Excel Data Online for Free',
        excerpt: 'A complete guide to uploading Excel files and creating beautiful bar charts, line charts, and pie charts without any software installation.',
        date: 'March 2025',
        readTime: '6 min read',
        category: 'Excel',
        color: '#10b981',
    },
    {
        slug: 'csv-data-visualization-guide',
        title: 'CSV Data Visualization Guide: From Raw Data to Charts',
        excerpt: 'Learn how to convert raw CSV files into interactive charts and dashboards using free online tools — no coding required.',
        date: 'March 2025',
        readTime: '7 min read',
        category: 'CSV',
        color: '#3b82f6',
    },
    {
        slug: 'best-free-data-visualization-tools',
        title: 'Best Free Data Visualization Tools in 2025',
        excerpt: 'Compare the top free data visualization tools available today, from browser-based chart generators to full business intelligence platforms.',
        date: 'February 2025',
        readTime: '8 min read',
        category: 'Tools',
        color: '#8b5cf6',
    },
    {
        slug: 'how-to-create-dashboard-from-excel',
        title: 'How to Create a Dashboard from Excel Data (Free Method)',
        excerpt: 'Step-by-step guide to building a complete interactive dashboard from an Excel spreadsheet using only free online tools.',
        date: 'February 2025',
        readTime: '7 min read',
        category: 'Dashboard',
        color: '#f59e0b',
    },
    {
        slug: 'convert-data-to-charts-online',
        title: 'How to Convert Data to Charts Online: The Complete Guide',
        excerpt: 'Everything you need to know about converting Excel, CSV, PDF, and Google Sheets data into professional charts using free online tools.',
        date: 'January 2025',
        readTime: '9 min read',
        category: 'Charts',
        color: '#f43f5e',
    },
];

export default function BlogIndexPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />

            <section style={{ padding: '60px 0 48px', borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: 680 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 99, marginBottom: 20 }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Blog</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 16 }}>
                        Data Visualization Guides & Tutorials
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8 }}>
                        Free articles on Excel charts, CSV dashboards, AI data insights, and the best tools for making sense of your data.
                    </p>
                </div>
            </section>

            <section style={{ padding: '56px 0' }}>
                <div className="container" style={{ maxWidth: 900 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
                        {posts.map(post => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                                <article style={{
                                    padding: 24, borderRadius: 16,
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border-subtle)',
                                    height: '100%',
                                    transition: 'border-color 0.2s, transform 0.2s',
                                    display: 'flex', flexDirection: 'column', gap: 12,
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{
                                            padding: '3px 10px', borderRadius: 99, fontSize: '0.7rem', fontWeight: 700,
                                            background: `${post.color}18`, color: post.color,
                                            border: `1px solid ${post.color}30`,
                                        }}>
                                            {post.category}
                                        </span>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{post.readTime}</span>
                                    </div>
                                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 700, margin: 0, lineHeight: 1.4 }}>
                                        {post.title}
                                    </h2>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0, flex: 1 }}>
                                        {post.excerpt}
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{post.date}</span>
                                        <span style={{ color: post.color, fontSize: '0.8rem', fontWeight: 600 }}>Read →</span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ padding: '40px 0', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 700, marginBottom: 16 }}>Try Our Free Tools</h2>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/excel-visualizer" className="btn-secondary">Excel Charts</Link>
                        <Link href="/dashboard-generator" className="btn-primary">Dashboard Generator</Link>
                        <Link href="/data-report-generator" className="btn-secondary">Report Generator</Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
