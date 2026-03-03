import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import DashboardView from '../DashboardView';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free CSV to Chart Generator Online | Visualize CSV Data Instantly',
    description: 'Convert any CSV file to interactive bar, line, pie or area charts online. Free CSV data visualizer — no login, no upload to server, instant results.',
    alternates: { canonical: 'https://visualizemydata.in/csv-visualizer/' },
    openGraph: {
        title: 'Free CSV to Chart Generator Online | Visualize CSV Data Instantly',
        description: 'Convert any CSV file to interactive charts online. Free, no login, no server upload — instant CSV data visualization.',
        url: 'https://visualizemydata.in/csv-visualizer/',
    },
};

const faqItems = [
    { q: 'How do I convert a CSV file to a chart online?', a: 'Simply upload your CSV file using the tool above. It automatically parses your data and lets you choose from bar, line, area, or pie charts. No conversion software is needed.' },
    { q: 'Is the CSV visualizer completely free?', a: 'Yes. The tool is 100% free to use with no hidden costs, no subscriptions, and no account required.' },
    { q: 'Does my CSV data get sent to a server?', a: 'No. Your CSV file is parsed entirely within your web browser. The data never leaves your device and is not stored anywhere.' },
    { q: 'What delimiter formats does the CSV tool support?', a: 'The tool supports standard comma-separated values (CSV). Files exported from Excel, Google Sheets, or any standard spreadsheet software will work correctly.' },
    { q: 'Can I create a pie chart from a CSV file?', a: 'Yes. After uploading your CSV, select "Pie" from the chart type options. The tool will use your first column as labels and the first numeric column as values.' },
    { q: 'Can I download the chart generated from my CSV?', a: 'Yes. You can download your chart as a high-quality PNG image or as a PDF document, suitable for reports, presentations, and publications.' },
    { q: 'What if my CSV has hundreds of columns?', a: 'The tool handles wide CSV files efficiently. You can select which columns to use for your X and Y axes in the chart controls.' },
    { q: 'Does the CSV visualizer work on mobile devices?', a: 'Yes. The tool is fully responsive and works on iPhone, Android, tablets, and all modern browsers — no app download required.' },
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

export default function CsvVisualizerPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <NavbarWrapper />

            {/* Hero */}
            <section style={{ padding: '56px 0 32px', background: 'linear-gradient(135deg, rgba(59,130,246,0.08), transparent)' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: 720 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 20, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)', marginBottom: 20 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.06em' }}>CSV Visualizer</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 16, lineHeight: 1.2 }}>
                        Free CSV to Interactive Chart Generator
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 24 }}>
                        Upload any CSV file and instantly convert it into a beautiful chart. No account needed, no server uploads — your data stays private in your browser.
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
                        <h2>What Is the Free CSV Chart Generator?</h2>
                        <p>
                            The <strong>free CSV to chart generator</strong> on VisualizeMyData lets you upload any comma-separated values file and instantly produce interactive charts — no software installation, no login, and no data upload to any external server. It is one of the fastest and most privacy-focused ways to <strong>visualize CSV data online free</strong>.
                        </p>
                        <p>
                            CSV files are the most universal data format — exported from databases, Google Sheets, Excel, CRM tools, analytics platforms, and more. This tool reads your CSV, intelligently detects numeric and categorical columns, and gives you instant control over <strong>bar charts, line charts, area charts, and pie charts</strong>. You can also export your finished visualization as a PNG or PDF.
                        </p>

                        <h2>Who Should Use the CSV Visualizer?</h2>
                        <p>
                            This <strong>CSV to interactive chart generator</strong> is built for anyone dealing with raw data files:
                        </p>
                        <ul>
                            <li><strong>Data analysts</strong> who need a quick visual check on CSV exports from databases or BI tools.</li>
                            <li><strong>Marketing professionals</strong> visualizing campaign performance data downloaded from ad platforms.</li>
                            <li><strong>Finance teams</strong> creating expense or revenue charts from accounting system CSV exports.</li>
                            <li><strong>Developers and QA engineers</strong> spot-checking test result CSV files visually.</li>
                            <li><strong>Students and researchers</strong> who collect data in CSV format and need fast chart generation for reports.</li>
                        </ul>

                        <h2>Privacy and Security</h2>
                        <p>
                            Many businesses handle sensitive data in CSV format — customer lists, financial records, or proprietary datasets. With VisualizeMyData, you can visualize these files with <strong>full confidence that your data never leaves your device</strong>. All parsing happens using JavaScript in your browser. No CSV content is transmitted to any server, logged, or stored. Your data is automatically cleared when you close the tab.
                        </p>

                        <h2>How to Create a Chart from CSV — Step by Step</h2>
                        <ol>
                            <li>Click <strong>"Upload File"</strong> or drag your <code>.csv</code> file into the drop zone.</li>
                            <li>The tool auto-detects your columns and identifies numeric data series.</li>
                            <li>Select a <strong>chart type</strong>: bar, line, area, or pie chart.</li>
                            <li>Optionally adjust the <strong>color palette</strong> from the preset options.</li>
                            <li>Click <strong>"Download PNG"</strong> or <strong>"Download PDF"</strong> to save your visualization.</li>
                        </ol>

                        <h2>Related Visualization Tools</h2>
                        <ul>
                            <li><Link href="/excel-visualizer/">→ <strong>Free Excel Visualizer</strong></Link> — upload .xlsx or .xls spreadsheet files directly</li>
                            <li><Link href="/pdf-visualizer/">→ <strong>PDF Table to Chart Converter</strong></Link> — extract and chart tables from PDF documents</li>
                            <li><Link href="/google-sheets-visualizer/">→ <strong>Google Sheets Chart Generator</strong></Link> — paste a Google Sheets URL and visualize instantly</li>
                            <li><Link href="/">→ <strong>Homepage — All Formats</strong></Link> — try any file format in one place</li>
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
