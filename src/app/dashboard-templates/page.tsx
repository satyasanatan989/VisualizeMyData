import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import TemplateGallery from '@/components/templates/TemplateGallery';
import DiscoveryLinks from '@/components/DiscoveryLinks';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free Interactive Data Dashboard Templates | VisualizeMyData',
    description: 'Explore professionally designed data dashboard templates for sales, finance, marketing, student performance, and attendance tracking. Load presets and visualize instantly.',
    alternates: {
        canonical: 'https://visualizemydata.in/dashboard-templates/',
    },
    openGraph: {
        title: 'Free Interactive Data Dashboard Templates | VisualizeMyData',
        description: 'Explore professionally designed data dashboard templates for sales, finance, marketing, student performance, and attendance tracking. Load presets and visualize instantly.',
        url: 'https://visualizemydata.in/dashboard-templates/',
        type: 'website',
        siteName: 'VisualizeMyData',
        locale: 'en_US',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'VisualizeMyData Dashboard Templates' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Interactive Data Dashboard Templates | VisualizeMyData',
        description: 'Explore ready-made dashboard presets for sales, finance, marketing, and student performance. Load and customize instantly.',
        images: ['/og-image.png'],
    },
};

const faqItems = [
    { q: 'How do I use a dashboard template?', a: 'Select any of the templates in the gallery above and click "Load Template". The generator instantly populates the workspace with a pre-configured sample dataset, rendering KPI summaries, chart visualizations, and outlier logs immediately.' },
    { q: 'Can I replace the template data with my own?', a: 'Yes. After loading a template to inspect its layout, you can click "Reset" or upload your own CSV/Excel file to populate the exact same dashboard layout with your own numbers.' },
    { q: 'Do these templates support PDF exports?', a: 'Yes. Every dashboard template layout is pre-formatted for printing, allowing you to export the loaded visual layout as a clean PDF page or save individual charts as PNGs.' },
    { q: 'Are there templates for student grade sheets and attendance?', a: 'Yes. The gallery includes specialized presets for academic tracking, including CGPA/GPA grade distribution calculators and attendance ratio visualizers.' },
    { q: 'Is there any database registration required?', a: 'No. The templates run completely offline within your web browser. There is no account registration or cloud-saving required to explore or customize templates.' }
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
    })),
};

const itemPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    name: 'Data Visualization Dashboard Templates',
    description: 'A collection of ready-made spreadsheet datasets and dashboards for sales, marketing, finance, HR, and education.',
    url: 'https://visualizemydata.in/dashboard-templates/',
};

export default function Page() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemPageSchema) }} />
            <NavbarWrapper />

            {/* Hero */}
            <section style={{ padding: '60px 0 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 700, background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
                </div>
                <div className="container" style={{ position: 'relative', maxWidth: 720 }}>
                    <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 99, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', fontSize: '0.7rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 20 }}>
                        Preset Configurations
                    </span>
                    <h1 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(1.9rem, 5vw, 3rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 16 }}>
                        Interactive Dashboard Templates
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: 560, margin: '0 auto 28px' }}>
                        Choose a preset dashboard configuration to instantly analyze marketing metrics, expense ledgers, or attendance rosters with rule-based data insights.
                    </p>
                </div>
            </section>

            {/* Gallery */}
            <section style={{ paddingBottom: 80 }}>
                <div className="container">
                    <TemplateGallery />
                </div>
            </section>

            {/* SEO section */}
            <section style={{ padding: '48px 0 64px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ maxWidth: 760 }}>
                    <h2 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: 800, marginBottom: 14 }}>
                        Instant Dashboard Prototyping
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 12 }}>
                        Configuring dashboards from scratch inside platforms like Tableau, PowerBI, or Excel requires complicated data modelling, custom formatting, and formula syntax. Our dashboard templates load pre-configured, valid datasets in-memory so you can see exactly how the KPI cards, line trends, and category distribution graphs map together.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 24 }}>
                        These templates serve as excellent interactive references for analysts designing new report structures. Simply load a template, explore the filters, and download a snapshot PDF, PNG or Excel file for formatting reference.
                    </p>

                    <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 12 }}>
                        Related Dashboard Builders
                    </h3>
                    <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', paddingLeft: 20, lineHeight: 2 }}>
                        <li><Link href="/dashboard-generator/" style={{ color: 'var(--accent)' }}>→ <strong>Interactive Dashboard Builder</strong></Link> — build full KPI layouts from custom file uploads</li>
                        <li><Link href="/multi-chart-generator/" style={{ color: 'var(--accent)' }}>→ <strong>Multi-Chart Maker</strong></Link> — compare multiple metrics side-by-side in custom workspaces</li>
                        <li><Link href="/data-report-generator/" style={{ color: 'var(--accent)' }}>→ <strong>Data Report Builder</strong></Link> — compile structured business summaries and print reports</li>
                    </ul>
                </div>
            </section>

            {/* FAQ Accordion */}
            <section style={{ padding: '48px 0 64px', background: 'var(--bg-primary)' }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 32 }}>Frequently Asked Questions</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {faqItems.map(({ q, a }) => (
                            <div key={q} style={{ padding: '20px 24px', borderRadius: 12, border: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}>
                                <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.5 }}>{q}</p>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <DiscoveryLinks />
            <Footer />
        </div>
    );
}
