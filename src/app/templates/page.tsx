import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import TemplateGallery from '@/components/templates/TemplateGallery';

export const metadata: Metadata = {
    title: 'Data Visualization Templates – Free Dashboard and Chart Examples | VisualizeMyData',
    description: 'Explore ready-made datasets and generate charts or dashboards instantly using our free online data visualization templates. No upload needed.',
    alternates: { canonical: 'https://visualizemydata.in/templates/' },
    openGraph: {
        title: 'Free Data Visualization Templates | VisualizeMyData',
        description: '6 ready-made datasets — Sales, Marketing, Survey, Expense, Grades, Traffic. Click and get an instant interactive dashboard.',
        url: 'https://visualizemydata.in/templates/',
    },
};

export default function TemplatesPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />

            {/* Hero */}
            <section style={{ padding: '60px 0 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 700, background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
                </div>
                <div className="container" style={{ position: 'relative', maxWidth: 720 }}>
                    <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 99, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', fontSize: '0.7rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 20 }}>
                        Ready-Made Templates
                    </span>
                    <h1 style={{ fontSize: 'clamp(1.9rem, 5vw, 3rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 16 }}>
                        Data Visualization Templates
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: 560, margin: '0 auto 28px' }}>
                        Click any template to instantly generate an interactive chart, full KPI dashboard, and AI-style insights — no file upload needed.
                    </p>
                    <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
                        {['✓ 6 preset datasets', '✓ Full dashboard view', '✓ Export PNG / PDF / Excel'].map(t => (
                            <span key={t} style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>{t}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section style={{ paddingBottom: 80 }}>
                <div className="container">
                    <TemplateGallery />
                </div>
            </section>

            {/* SEO content */}
            <section style={{ padding: '48px 0 64px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ maxWidth: 760 }}>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: 700, marginBottom: 14 }}>
                        Why Use Data Visualization Templates?
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 12 }}>
                        Starting from a blank spreadsheet is often the hardest part of data analysis. Our templates provide real, structured datasets that load instantly into the VisualizeMyData dashboard — giving you KPI cards, interactive charts, AI-style insights, and filters without uploading anything.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 24 }}>
                        Each template is designed around a common use case: tracking monthly sales, analyzing survey data, comparing marketing channels, or monitoring student performance. Once the template loads, you can explore the data just like you would with your own uploaded file — and export the result as PNG, PDF, or Excel.
                    </p>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <a href="/dashboard-generator" style={{ color: 'var(--accent-blue)', textDecoration: 'underline', fontSize: '0.875rem' }}>→ Dashboard Generator</a>
                        <a href="/excel-visualizer" style={{ color: 'var(--accent-blue)', textDecoration: 'underline', fontSize: '0.875rem' }}>→ Excel Visualizer</a>
                        <a href="/csv-visualizer" style={{ color: 'var(--accent-blue)', textDecoration: 'underline', fontSize: '0.875rem' }}>→ CSV Chart Generator</a>
                        <a href="/data-report-generator" style={{ color: 'var(--accent-blue)', textDecoration: 'underline', fontSize: '0.875rem' }}>→ Data Report Generator</a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
