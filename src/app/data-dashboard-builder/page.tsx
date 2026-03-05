import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free Data Dashboard Builder Online | Create Interactive Dashboards',
    description: 'Build interactive data dashboards from Excel, CSV, Google Sheets, or PDF in seconds. Free online dashboard builder — no login, no install, instant results.',
    alternates: { canonical: 'https://visualizemydata.in/data-dashboard-builder/' },
    openGraph: {
        title: 'Free Data Dashboard Builder Online',
        description: 'Create dashboards from your data in seconds. Free, browser-based, no signup.',
        url: 'https://visualizemydata.in/data-dashboard-builder/',
    },
};

const faqItems = [
    { q: 'What is a data dashboard builder?', a: 'A data dashboard builder is a tool that takes raw data — from Excel, CSV, or other sources — and automatically creates visual summaries including charts, KPI metrics, and insights panels.' },
    { q: 'What data formats can I use to build a dashboard?', a: 'VisualizeMyData supports Excel (.xlsx, .xls), CSV, PDF tables, and Google Sheets. All formats generate the same fully-featured dashboard.' },
    { q: 'Do I need design or coding skills to build a dashboard?', a: 'No. The tool is fully automatic. Upload your file and the dashboard is built for you — no coding, no drag-and-drop configuration, no prior experience needed.' },
    { q: 'Can I customize the charts?', a: 'Yes. You can switch between chart types (bar, line, area, pie) and apply column filters to customize which data is shown. The charts update dynamically.' },
    { q: 'Is this dashboard builder really free?', a: 'Yes, completely free. There is no freemium tier, no file limit for basic features, and no credit card required.' },
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

export default function DataDashboardBuilderPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <NavbarWrapper />

            <section style={{ padding: '60px 0 40px', background: 'linear-gradient(135deg, rgba(244,63,94,0.07), transparent)' }}>
                <div className="container" style={{ maxWidth: 760, textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: 99, marginBottom: 20 }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#fda4af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Dashboard Builder</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.8rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 16 }}>
                        Free Data Dashboard Builder Online
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 32 }}>
                        Transform any dataset into a beautiful, interactive dashboard automatically. Upload Excel, CSV, PDF, or Google Sheets and get instant charts, KPIs, AI insights, and export options.
                    </p>
                    <Link href="/dashboard-generator" className="btn-primary">→ Build Your Dashboard</Link>
                </div>
            </section>

            <section style={{ padding: '56px 0', borderTop: '1px solid var(--border-subtle)' }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <div className="prose">
                        <h2>The Simplest Way to Build a Data Dashboard</h2>
                        <p>
                            Traditional dashboard tools like Tableau, Power BI, and Google Looker Studio are powerful but complex, expensive, and time-consuming to set up. VisualizeMyData's free <strong>data dashboard builder</strong> takes a different approach: upload your data file and receive a fully-formed, interactive dashboard automatically — in under 10 seconds, with no configuration required.
                        </p>
                        <p>
                            The tool achieves this through intelligent column detection. It reads your dataset, identifies which columns are numeric, which are categorical, and which are dates, then selects the most appropriate chart type for each combination. The result is a dashboard that would take hours to build manually, delivered instantly.
                        </p>

                        <h2>What Makes a Good Dashboard?</h2>
                        <p>A great dashboard communicates data clearly at a glance. VisualizeMyData's dashboard builder includes all the key elements:</p>
                        <ul>
                            <li><strong>KPI Cards</strong> — top-level numbers that tell the story at a glance</li>
                            <li><strong>Primary Chart</strong> — the main data trend or distribution visualization</li>
                            <li><strong>Secondary Chart</strong> — a complementary view (e.g., distribution pie chart)</li>
                            <li><strong>AI Insights Panel</strong> — natural-language observations about the data</li>
                            <li><strong>Data Table</strong> — the raw data behind the charts, filterable and scrollable</li>
                            <li><strong>Filter Controls</strong> — dynamic controls to drill into data segments</li>
                        </ul>

                        <h2>Supported Data Sources</h2>
                        <ul>
                            <li><strong>Excel</strong> — .xlsx and .xls files from Microsoft Excel or Google Sheets exports</li>
                            <li><strong>CSV</strong> — comma-separated value files from any software or platform</li>
                            <li><strong>PDF</strong> — PDFs containing data tables (e.g., financial reports, research papers)</li>
                            <li><strong>Google Sheets</strong> — paste any public Google Sheets URL to visualize live data</li>
                        </ul>

                        <h2>Comparison: VisualizeMyData vs Traditional Dashboard Tools</h2>
                        <ul>
                            <li>✅ <strong>Free forever</strong> — no paid tiers or usage limits</li>
                            <li>✅ <strong>Zero setup</strong> — no connectors, no accounts, no imports</li>
                            <li>✅ <strong>Instant results</strong> — under 10 seconds from upload to dashboard</li>
                            <li>✅ <strong>100% private</strong> — data never leaves your browser</li>
                            <li>✅ <strong>No downloads</strong> — works in any modern browser</li>
                        </ul>

                        <h2>Related Tools</h2>
                        <ul>
                            <li><Link href="/excel-dashboard-generator">→ Excel Dashboard Generator</Link></li>
                            <li><Link href="/csv-dashboard-generator">→ CSV Dashboard Generator</Link></li>
                            <li><Link href="/data-report-generator">→ Data Report Generator</Link></li>
                            <li><Link href="/excel-visualizer">→ Excel Chart Generator</Link></li>
                        </ul>
                    </div>
                </div>
            </section>

            <section style={{ padding: '48px 0', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 32 }}>FAQ</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {faqItems.map(({ q, a }) => (
                            <div key={q} style={{ padding: '20px 24px', borderRadius: 14, background: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
                                <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{q}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
