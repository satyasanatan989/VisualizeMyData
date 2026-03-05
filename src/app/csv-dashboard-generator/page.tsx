import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free CSV Dashboard Generator Online | Instant Dashboard from CSV',
    description: 'Upload a CSV file and automatically generate an interactive dashboard with charts, KPI cards, and AI insights. Free, browser-based, no login required.',
    alternates: { canonical: 'https://visualizemydata.in/csv-dashboard-generator/' },
    openGraph: {
        title: 'Free CSV Dashboard Generator Online',
        description: 'Transform CSV data into interactive dashboards instantly. Free, no signup required.',
        url: 'https://visualizemydata.in/csv-dashboard-generator/',
    },
};

const faqItems = [
    { q: 'How do I create a dashboard from a CSV file?', a: 'Go to the Dashboard Generator, upload your CSV file, and the tool instantly creates KPI cards, charts, and an AI insights panel.' },
    { q: 'What chart types are supported for CSV dashboards?', a: 'Bar charts, line charts, area charts, and pie charts are all supported. The tool automatically picks the most appropriate chart based on your CSV column types.' },
    { q: 'Is there a CSV file size limit?', a: 'The tool handles standard CSV files well. Very large files (over 100,000 rows) may be slower depending on your device memory. Performance varies by browser.' },
    { q: 'Can I filter a CSV dashboard?', a: 'Yes. After uploading, you can filter by category dropdown, numeric range, and date range. Charts update live when you adjust filters.' },
    { q: 'Can I download a CSV dashboard as PDF?', a: 'Yes. The export button lets you download the dashboard as a PNG image or PDF document.' },
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

export default function CsvDashboardGeneratorPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <NavbarWrapper />

            <section style={{ padding: '60px 0 40px', background: 'linear-gradient(135deg, rgba(59,130,246,0.07), transparent)' }}>
                <div className="container" style={{ maxWidth: 760, textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 99, marginBottom: 20 }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.06em' }}>CSV Dashboard</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.8rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 16 }}>
                        Free CSV Dashboard Generator Online
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 32 }}>
                        Upload any CSV file and instantly generate a complete interactive dashboard — KPI cards, auto-charts, AI insights, and data tables. Free, private, no signup required.
                    </p>
                    <Link href="/dashboard-generator" className="btn-primary">→ Open Dashboard Generator</Link>
                </div>
            </section>

            <section style={{ padding: '56px 0', borderTop: '1px solid var(--border-subtle)' }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <div className="prose">
                        <h2>Why Use a CSV Dashboard Generator?</h2>
                        <p>
                            CSV (Comma-Separated Values) is one of the most widely used data formats in the world. Exported from databases, ERPs, CRMs, Google Analytics, Stripe, Shopify, and countless other platforms, CSV files often contain valuable business data that is hard to interpret in raw form. A <strong>CSV Dashboard Generator</strong> transforms these plain text files into meaningful visual dashboards — making trends, outliers, and patterns immediately visible.
                        </p>
                        <p>
                            VisualizeMyData's free CSV dashboard tool does all this automatically in your browser. There is no server processing, no file size cap based on subscriptions, and no account wall — just upload and visualize.
                        </p>

                        <h2>CSV Dashboard Features</h2>
                        <ul>
                            <li><strong>Auto-detection</strong> — numeric, date, and categorical columns are identified automatically</li>
                            <li><strong>Smart chart selection</strong> — the right chart type is chosen based on your CSV structure</li>
                            <li><strong>6 KPI cards</strong> — rows, columns, max, min, average, top category count</li>
                            <li><strong>AI-style insights panel</strong> — trend detection, distribution analysis, outlier alerts</li>
                            <li><strong>Interactive filters</strong> — category, numeric range, date range</li>
                            <li><strong>Export as PNG/PDF</strong> and download data as Excel</li>
                        </ul>

                        <h2>Step-by-Step: Create a CSV Dashboard</h2>
                        <ol>
                            <li>Open the <Link href="/dashboard-generator">Dashboard Generator</Link></li>
                            <li>Click "Upload File" and select your CSV file</li>
                            <li>The dashboard generates automatically within seconds</li>
                            <li>Explore KPI cards, insights, and charts</li>
                            <li>Use dropdown filters to drill into specific data segments</li>
                            <li>Export the dashboard as PNG or PDF</li>
                        </ol>

                        <h2>Common CSV Dashboard Use Cases</h2>
                        <ul>
                            <li><strong>Sales analytics</strong> — monthly revenue, top products, regional performance</li>
                            <li><strong>Website analytics</strong> — sessions, bounce rates, conversion trends from exported CSVs</li>
                            <li><strong>HR data</strong> — headcount, salary bands, department distributions</li>
                            <li><strong>E-commerce</strong> — order volumes, customer segments, product categories</li>
                            <li><strong>Scientific data</strong> — experimental results with numeric measurements and categories</li>
                        </ul>

                        <h2>Related Tools</h2>
                        <ul>
                            <li><Link href="/excel-dashboard-generator">→ Excel Dashboard Generator</Link></li>
                            <li><Link href="/google-sheets-dashboard">→ Google Sheets Dashboard</Link></li>
                            <li><Link href="/data-report-generator">→ Data Report Generator</Link></li>
                            <li><Link href="/csv-visualizer">→ CSV Chart Generator</Link></li>
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
