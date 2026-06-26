import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import TemplateGallery from '@/components/templates/TemplateGallery';
import DiscoveryLinks from '@/components/DiscoveryLinks';

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
        title: 'Free Interactive Data Dashboard Templates | VisualizeMyData',
        description: 'Explore professionally designed data dashboard templates for sales, finance, marketing, student performance, and attendance tracking. Load presets and visualize instantly.',
        images: ['/og-image.png'],
    },
};;

export default function DashboardTemplatesPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemPage',
        'name': 'Data Visualization Dashboard Templates',
        'description': 'A collection of ready-made spreadsheet datasets and dashboards for sales, marketing, finance, HR, and education.',
        'url': 'https://visualizemydata.in/dashboard-templates/',
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />

            <script 
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

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
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: 12 }}>
                        Configuring dashboards from scratch inside platforms like Tableau, PowerBI, or Excel requires complicated data modelling, custom formatting, and formula syntax. Our dashboard templates load pre-configured, valid datasets in-memory so you can see exactly how the KPI cards, line trends, and category distribution graphs map together.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0 }}>
                        These templates serve as excellent interactive references for analysts designing new report structures. Simply load a template, explore the filters, and download a snapshot PDF, PNG or Excel file for formatting reference.
                    </p>
                </div>
            </section>

            <DiscoveryLinks />
            <Footer />
        </div>
    );
}
