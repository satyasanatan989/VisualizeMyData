import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free Google Sheets Dashboard Builder Online | Auto Visual Dashboard',
    description: 'Paste a Google Sheets link and instantly generate an interactive dashboard with charts, KPI cards, and AI insights. Free, no login, 100% browser-based.',
    alternates: { canonical: 'https://visualizemydata.in/google-sheets-dashboard/' },
    openGraph: {
        title: 'Google Sheets Dashboard Builder — Free Online Tool',
        description: 'Create dashboards from Google Sheets without exporting. Paste your sheet URL and get instant charts and insights.',
        url: 'https://visualizemydata.in/google-sheets-dashboard/',
    },
};

const faqItems = [
    { q: 'How do I create a dashboard from Google Sheets?', a: 'Open the Dashboard Generator, switch to the "Google Sheets" tab, paste your public sheet link, and click Load. Your dashboard generates automatically.' },
    { q: 'Does my Google Sheet need to be public?', a: 'Yes. The sheet must be set to "Anyone with the link can view" for the tool to access the data. No edit access is needed — view-only is sufficient.' },
    { q: 'Is my Google Sheets data stored anywhere?', a: 'No. The tool fetches the CSV export of your sheet directly in your browser and processes it locally. Nothing is stored on any server.' },
    { q: 'Can I export the Google Sheets dashboard to PDF?', a: 'Yes. After the dashboard is generated, you can download it as a PNG or PDF using the export buttons.' },
    { q: 'Does this work with Google Sheets on mobile?', a: 'Yes. The tool is fully responsive and works in mobile browsers. You can paste the Google Sheets URL from your phone or tablet.' },
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

export default function GoogleSheetsDashboardPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <NavbarWrapper />

            <section style={{ padding: '60px 0 40px', background: 'linear-gradient(135deg, rgba(139,92,246,0.07), transparent)' }}>
                <div className="container" style={{ maxWidth: 760, textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 99, marginBottom: 20 }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Google Sheets</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.8rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 16 }}>
                        Free Google Sheets Dashboard Builder
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 32 }}>
                        Paste any public Google Sheets URL and instantly create an interactive dashboard — no download required, no signup, completely free and private.
                    </p>
                    <Link href="/dashboard-generator" className="btn-primary">→ Open Dashboard Generator</Link>
                </div>
            </section>

            <section style={{ padding: '56px 0', borderTop: '1px solid var(--border-subtle)' }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <div className="prose">
                        <h2>Build Dashboards Directly from Google Sheets</h2>
                        <p>
                            Google Sheets is the go-to collaborative spreadsheet tool for teams across the world. But while Sheets is excellent for data entry and collaboration, building visual dashboards from it typically requires Looker Studio, Tableau, or complex add-ons. VisualizeMyData eliminates that friction entirely — paste your <strong>Google Sheets URL</strong> and get a fully formed dashboard in seconds with no additional tools required.
                        </p>
                        <p>
                            The tool reads your sheet's <strong>CSV export</strong> directly in your browser, analyses all columns, and generates KPI cards, charts, AI insights, and an interactive data table. Everything runs locally on your device, so your spreadsheet data remains completely private.
                        </p>

                        <h2>Setting Up Your Google Sheet</h2>
                        <ol>
                            <li>Open your Google Sheet</li>
                            <li>Click <strong>Share</strong> → <strong>Anyone with the link</strong> → set to <strong>Viewer</strong></li>
                            <li>Copy the link from the address bar</li>
                            <li>Go to <Link href="/dashboard-generator">Dashboard Generator</Link></li>
                            <li>Click the <strong>"Google Sheets Link"</strong> tab and paste the URL</li>
                            <li>Click <strong>Load</strong> — your dashboard appears instantly</li>
                        </ol>

                        <h2>Dashboard Features for Google Sheets Data</h2>
                        <ul>
                            <li>Automatic column type detection (text, number, date)</li>
                            <li>Smart chart selection — bar, line, area, or pie depending on your data</li>
                            <li>6 KPI metric cards showing core statistics</li>
                            <li>AI-style insights panel revealing trends and outliers</li>
                            <li>Interactive filters (category, numeric range, date range)</li>
                            <li>Export to PNG, PDF, or download as Excel</li>
                        </ul>

                        <h2>Why Not Use Looker Studio?</h2>
                        <p>
                            Google Looker Studio (formerly Data Studio) is a powerful tool, but it requires a Google account, setup time, connector configuration, and has a learning curve. VisualizeMyData is designed for speed — paste one URL and have a high-quality visual dashboard ready in under 10 seconds, with zero setup.
                        </p>

                        <h2>Related Tools</h2>
                        <ul>
                            <li><Link href="/excel-dashboard-generator">→ Excel Dashboard Generator</Link></li>
                            <li><Link href="/csv-dashboard-generator">→ CSV Dashboard Generator</Link></li>
                            <li><Link href="/google-sheets-visualizer">→ Google Sheets Chart Generator</Link></li>
                            <li><Link href="/data-report-generator">→ Data Report Generator</Link></li>
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
