import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import SurveyVisualizer from '@/components/dashboard/SurveyVisualizer';
import DiscoveryLinks from '@/components/DiscoveryLinks';

export const metadata: Metadata = {
    title: 'Free Google Forms Survey Visualizer Online | VisualizeMyData',
    description: 'Visualize Google Forms CSV exports online for free. Upload survey results and automatically generate pie charts, bar charts, response percentages, and rating statistics client-side. No signup, no logs.',
    alternates: {
        canonical: 'https://visualizemydata.in/survey-visualizer/',
    },
    openGraph: {
        title: 'Free Google Forms Survey Visualizer Online | VisualizeMyData',
        description: 'Visualize Google Forms CSV exports online for free. Upload survey results and automatically generate pie charts, bar charts, response percentages, and rating statistics client-side. No signup, no logs.',
        url: 'https://visualizemydata.in/survey-visualizer/',
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
        title: 'Free Google Forms Survey Visualizer Online | VisualizeMyData',
        description: 'Visualize Google Forms CSV exports online for free. Upload survey results and automatically generate pie charts, bar charts, response percentages, and rating statistics client-side. No signup, no logs.',
        images: ['/og-image.png'],
    },
};;

export default function SurveyVisualizerPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'Free Google Forms Survey Visualizer',
        'description': 'Visualize Google Forms exports easily. Automatically create pie charts, rating bar charts, and summary statistics directly in the browser.',
        'applicationCategory': 'BusinessApplication',
        'operatingSystem': 'All',
        'browserRequirements': 'Requires JavaScript. HTML5',
        'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />

            <script 
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Header */}
            <section style={{ padding: '60px 0 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
                </div>
                <div className="container" style={{ position: 'relative', maxWidth: 720 }}>
                    <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 99, background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', fontSize: '0.7rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 20 }}>
                        Research &amp; Feedback
                    </span>
                    <h1 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 16 }}>
                        Free Google Forms Survey Visualizer
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 28px' }}>
                        Turn spreadsheet response sheets into clean, visual dashboards. Instantly plot distributions of multiple-choice, scale ratings, and list open feedback answers.
                    </p>
                </div>
            </section>

            {/* Main Interactive Tool Container */}
            <main className="container" style={{ paddingBottom: 80 }}>
                <SurveyVisualizer />
            </main>

            {/* Informational SEO Section */}
            <section style={{ padding: '60px 0 70px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <h2 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 800, marginBottom: 16 }}>
                        Get Clean Insights from Survey Data
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: 20 }}>
                        While Google Forms gives basic pie charts inside its own interface, exporting the data to Excel or CSV makes you lose these visual elements. Re-creating charts inside Excel or Google Sheets requires writing manual frequency formulas (`COUNTIF`), setting up helper tables, and mapping ranges. The VisualizeMyData Survey Visualizer parses raw survey CSVs directly, detects row patterns, and builds presentation-ready dashboards instantly.
                    </p>

                    <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
                        Automated Survey Analysis Features:
                    </h3>
                    <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', paddingLeft: 20, lineHeight: 2, marginBottom: 30 }}>
                        <li><strong>Multiple-Choice Detection:</strong> Automatically classifies categorical items and plots them as interactive Pie Charts with legend descriptions.</li>
                        <li><strong>Rating Scales:</strong> Recognizes standard 1-5 or 1-10 survey scales, computes average score headers, and plots frequency distribution Bar Charts.</li>
                        <li><strong>Text &amp; Feedback:</strong> Groups open-ended text answers in clean scrolling lists, making it easy to review qualitative user comments.</li>
                        <li><strong>Universal Support:</strong> Works with CSV/XLSX exports from Google Forms, Typeform, Microsoft Forms, and SurveyMonkey.</li>
                    </ul>

                    <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 12 }}>
                        Safe and Private Survey Review
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0 }}>
                        Survey data often contains sensitive user emails, names, or private comments. VisualizeMyData operates completely inside your web browser. Your survey responses are processed entirely client-side, ensuring that customer feedback never travels to external networks.
                    </p>
                </div>
            </section>

            <DiscoveryLinks />
            <Footer />
        </div>
    );
}
