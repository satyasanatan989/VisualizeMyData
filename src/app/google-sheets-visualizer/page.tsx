import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import DashboardView from '../DashboardView';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free Google Sheets Data Visualizer Online | Chart From Sheets URL',
    description: 'Paste any public Google Sheets link and instantly create bar, line, pie or area charts online. Free, no login, 100% private — no data sent to servers.',
    alternates: { canonical: 'https://visualizemydata.in/google-sheets-visualizer/' },
    openGraph: {
        title: 'Free Google Sheets Data Visualizer Online | Chart From Sheets URL',
        description: 'Paste a Google Sheets URL and instantly visualize data as charts. Free, no login, no server upload.',
        url: 'https://visualizemydata.in/google-sheets-visualizer/',
    },
};

const faqItems = [
    { q: 'How do I visualize Google Sheets data without downloading?', a: 'Click the "Google Sheets Link" tab in the tool above, paste your public Google Sheets URL, and click "Load Sheet". The data is fetched and visualized instantly.' },
    { q: 'Is the Google Sheets visualizer free?', a: 'Yes. The tool is completely free to use with no account, no subscription, and no credit card required.' },
    { q: 'Does my Google Sheets data get stored anywhere?', a: 'No. The tool fetches your sheet as a CSV via Google\'s public export URL and processes it entirely in your browser. No data is stored on any server.' },
    { q: 'Does my Google Sheet need to be public?', a: 'Yes. Your Google Sheet must be set to "Anyone with the link can view" for the tool to access it. Private sheets cannot be loaded.' },
    { q: 'Can I create real-time charts from Google Sheets?', a: 'You can refresh the tool at any time to fetch the latest data from your sheet. The chart updates instantly with the most recent values.' },
    { q: 'What chart types can I create from Google Sheets?', a: 'Bar charts, line charts, area charts, and pie charts are supported. You can switch between types and customize color palettes.' },
    { q: 'Can I download the Google Sheets chart?', a: 'Yes. After generating a chart from your Google Sheets data, you can download it as a high-resolution PNG image or a PDF document.' },
    { q: 'Does this work with Google Sheets that have multiple tabs?', a: 'Currently the tool reads the first (default) sheet tab. If you need data from a specific tab, make it the first tab in your spreadsheet.' },
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

export default function GoogleSheetsVisualizerPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <NavbarWrapper />

            {/* Hero */}
            <section style={{ padding: '56px 0 32px', background: 'linear-gradient(135deg, rgba(139,92,246,0.08), transparent)' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: 720 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 20, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)', marginBottom: 20 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Google Sheets Visualizer</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 16, lineHeight: 1.2 }}>
                        Visualize Google Sheets Data Instantly — Free
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 24 }}>
                        Paste any public Google Sheets link and generate beautiful charts in seconds. No file download required. No login. Works entirely in your browser.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 32 }}>
                        {['🔒 100% Client-Side', '📁 Files Never Uploaded', '🚫 No Signup Required', '📱 Works on Mobile'].map(b => (
                            <span key={b} style={{ padding: '5px 12px', borderRadius: 20, background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{b}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tool */}
            <section style={{ padding: '8px 0 48px' }}>
                <div className="container">
                    <DashboardView />
                </div>
            </section>

            {/* SEO Content */}
            <section style={{ padding: '48px 0', borderTop: '1px solid var(--border-subtle)' }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <div className="prose">
                        <h2>What Is the Free Google Sheets Visualizer?</h2>
                        <p>
                            The <strong>free Google Sheets data visualizer</strong> on VisualizeMyData allows you to paste any public Google Sheets URL and instantly convert the spreadsheet data into interactive charts — no file download, no login, and no data sent to any server. It is the fastest way to <strong>visualize Google Sheets data instantly</strong> without installing any add-ons or third-party tools.
                        </p>
                        <p>
                            The tool works by fetching your Google Sheet as a publicly accessible CSV export (which Google provides for all public sheets). This data is processed entirely in your browser and rendered as a fully interactive chart with your choice of type and color palette. The resulting chart can be exported as a <strong>PNG image or PDF document</strong>.
                        </p>

                        <h2>Who Should Use the Google Sheets Visualizer?</h2>
                        <ul>
                            <li><strong>Teams and collaborators</strong> who share live Google Sheets and need quick visual summaries for meetings.</li>
                            <li><strong>Teachers and educators</strong> tracking student performance in Google Sheets and wanting visual reports.</li>
                            <li><strong>Startup founders and managers</strong> monitoring KPIs in Sheets who want instant chart exports.</li>
                            <li><strong>Freelancers and consultants</strong> who share client data in Google Sheets and want polished chart exports.</li>
                            <li><strong>Content creators</strong> making infographics or data-driven posts from Google Sheets datasets.</li>
                        </ul>

                        <h2>How to Make Your Google Sheet Public</h2>
                        <p>
                            For the tool to access your data, your Google Sheet must be set to <strong>"Anyone with the link can view"</strong>:
                        </p>
                        <ol>
                            <li>Open your Google Sheet in the browser.</li>
                            <li>Click <strong>Share</strong> (top right corner).</li>
                            <li>Under "General access," select <strong>"Anyone with the link"</strong> and set role to <strong>"Viewer"</strong>.</li>
                            <li>Copy the link and paste it into the tool above.</li>
                        </ol>

                        <h2>Privacy &amp; Security</h2>
                        <p>
                            Only <strong>publicly shared Google Sheets</strong> are accessible by this tool — private sheets protected by a Google account are never accessible. The fetched CSV data is processed in your browser memory only and is automatically cleared when you refresh or close the page. No Google Sheet data is stored by VisualizeMyData.
                        </p>

                        <h2>How to Visualize Google Sheets Data</h2>
                        <ol>
                            <li>Click the <strong>"Google Sheets Link"</strong> tab in the tool above.</li>
                            <li>Paste your public Google Sheets URL into the input field.</li>
                            <li>Click <strong>"Load Sheet"</strong> — data is fetched and parsed instantly.</li>
                            <li>Select your preferred <strong>chart type</strong> and color palette.</li>
                            <li>Download your chart as a <strong>PNG or PDF</strong>.</li>
                        </ol>

                        <h2>Other Free Visualization Tools</h2>
                        <ul>
                            <li><Link href="/excel-visualizer/">→ <strong>Free Excel Visualizer</strong></Link> — upload .xlsx files and visualize spreadsheet data</li>
                            <li><Link href="/csv-visualizer/">→ <strong>Free CSV Chart Generator</strong></Link> — upload CSV files and create interactive charts</li>
                            <li><Link href="/pdf-visualizer/">→ <strong>PDF Table Extractor</strong></Link> — extract tables from PDFs and convert to charts</li>
                            <li><Link href="/">→ <strong>Homepage — All Formats</strong></Link> — use all tools in one place</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section style={{ padding: '48px 0', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 32 }}>Frequently Asked Questions</h2>
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
