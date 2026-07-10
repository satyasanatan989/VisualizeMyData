import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import SurveyVisualizer from '@/components/dashboard/SurveyVisualizer';
import DiscoveryLinks from '@/components/DiscoveryLinks';
import Link from 'next/link';

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
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'VisualizeMyData Survey Visualizer' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Google Forms Survey Visualizer Online | VisualizeMyData',
        description: 'Visualize Google Forms CSV exports online for free. Automatically generate pie charts, bar charts, and rating statistics client-side.',
        images: ['/og-image.png'],
    },
};

const faqItems = [
    { q: 'How do I visualize survey data online?', a: 'Export your survey responses (Google Forms, Typeform, SurveyMonkey) as a CSV or Excel file, then drag and drop the file into the upload box above. The tool automatically reads the columns, categorizes multiple-choice questions or ratings, and renders beautiful charts.' },
    { q: 'Does this tool support Typeform and SurveyMonkey exports?', a: 'Yes. It supports any standard CSV or Excel export from Typeform, SurveyMonkey, Microsoft Forms, Google Forms, or custom web forms.' },
    { q: 'Is my survey respondent data kept private?', a: 'Yes. The survey visualizer is entirely browser-based. All email lists, names, and responses are parsed locally on your device and are never sent to external servers.' },
    { q: 'Can I visualize rating scales (e.g., 1 to 5 stars)?', a: 'Yes. The tool automatically detects numeric scales, calculates average scores, and creates bar charts showing the distribution of ratings.' },
    { q: 'Can I download the survey charts?', a: 'Yes. You can download individual survey charts as PNG images or save the full summary layout as a PDF report.' },
    { q: 'What happens to open-ended text comments?', a: 'They are parsed and listed in a searchable, scrollable panel, allowing you to quickly read qualitative customer feedback or review employee suggestions without scanning endless spreadsheet rows.' }
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

const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Free Google Forms Survey Visualizer',
    url: 'https://visualizemydata.in/survey-visualizer/',
    description: 'Visualize Google Forms exports easily. Automatically create pie charts, rating bar charts, and summary statistics directly in the browser.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    browserRequirements: 'Requires a modern web browser with JavaScript enabled.',
};

export default function Page() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
            <NavbarWrapper />

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
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 20 }}>
                        While Google Forms gives basic pie charts inside its own interface, exporting the data to Excel or CSV makes you lose these visual elements. Re-creating charts inside Excel or Google Sheets requires writing manual frequency formulas (`COUNTIF`), setting up helper tables, and mapping ranges. The VisualizeMyData Survey Visualizer parses raw survey CSVs directly, detects row patterns, and builds presentation-ready dashboards instantly.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 20 }}>
                        By converting raw user forms, feedback surveys, and product rating evaluations into dashboards, research teams and business owners can quickly make decisions. You can toggle between different response metrics, filter answers by specific categories, and see response counts dynamically without formatting spreadsheet templates.
                    </p>

                    <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
                        Automated Survey Analysis Features:
                    </h3>
                    <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', paddingLeft: 20, lineHeight: 2, marginBottom: 30 }}>
                        <li><strong>Multiple-Choice Detection:</strong> Automatically classifies categorical items and plots them as interactive Pie Charts with legend descriptions.</li>
                        <li><strong>Rating Scales:</strong> Recognizes standard 1-5 or 1-10 survey scales, computes average score headers, and plots frequency distribution Bar Charts.</li>
                        <li><strong>Text &amp; Feedback:</strong> Groups open-ended text answers in clean scrolling lists, making it easy to review qualitative user comments.</li>
                        <li><strong>Universal Support:</strong> Works with CSV/XLSX exports from Google Forms, Typeform, Microsoft Forms, and SurveyMonkey.</li>
                    </ul>

                    <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 12 }}>
                        Safe and Private Survey Review
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 24 }}>
                        Survey data often contains sensitive user emails, names, or private comments. VisualizeMyData operates completely inside your web browser. Your survey responses are processed entirely client-side, ensuring that customer feedback never travels to external networks.
                    </p>

                    <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 12 }}>
                        Related Visualization Tools
                    </h3>
                    <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', paddingLeft: 20, lineHeight: 2 }}>
                        <li><Link href="/excel-visualizer/" style={{ color: 'var(--accent)' }}>→ <strong>Excel Data Visualizer</strong></Link> — plot charts directly from Microsoft Excel (.xlsx/.xls) files</li>
                        <li><Link href="/csv-visualizer/" style={{ color: 'var(--accent)' }}>→ <strong>Free CSV Data Visualizer</strong></Link> — render interactive charts from comma-separated datasets</li>
                        <li><Link href="/dashboard-generator/" style={{ color: 'var(--accent)' }}>→ <strong>Interactive Dashboard Builder</strong></Link> — auto-generate full KPI layouts and charts</li>
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
