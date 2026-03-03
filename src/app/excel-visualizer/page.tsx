import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import DashboardView from '../DashboardView';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free Excel Data Visualizer Online | Convert Spreadsheet to Chart',
    description: 'Upload any Excel file and instantly convert it to bar, line, pie or area charts online. Free, no login required. Files never leave your device.',
    alternates: { canonical: 'https://visualizemydata.in/excel-visualizer/' },
    openGraph: {
        title: 'Free Excel Data Visualizer Online | Convert Spreadsheet to Chart',
        description: 'Upload any Excel file and instantly convert it to bar, line, pie or area charts online. Free, no login required.',
        url: 'https://visualizemydata.in/excel-visualizer/',
    },
};

const faqItems = [
    { q: 'Is this Excel visualizer free to use?', a: 'Yes, completely free. There are no hidden charges, no subscriptions, and no credit card required. Simply upload your Excel file and start visualizing.' },
    { q: 'Do my Excel files get uploaded to a server?', a: 'No. All processing is done entirely in your browser using JavaScript. Your files never leave your device and are never stored on any server.' },
    { q: 'What Excel formats are supported?', a: 'Both .xlsx (Excel 2007+) and .xls (older Excel format) files are supported. CSV files are also accepted on this tool.' },
    { q: 'Can I create bar charts, pie charts and line charts from Excel?', a: 'Yes. After uploading your Excel file, you can choose from bar, line, area, and pie chart types. You can also switch between chart types instantly.' },
    { q: 'Can I download my chart as a PNG or PDF?', a: 'Yes. Once your chart is generated, you can download it as a high-resolution PNG image or as a PDF document, perfect for reports and presentations.' },
    { q: 'Do I need to create an account or sign up?', a: 'No account or sign-up is required. Open the tool, upload your Excel file, and your chart is ready in seconds.' },
    { q: 'How many rows of Excel data can I visualize?', a: 'The tool handles thousands of rows efficiently. Performance depends on your device, but most standard Excel files visualize instantly.' },
    { q: 'Can I use this Excel visualizer on my phone or tablet?', a: 'Yes. The tool is fully responsive and works on mobile browsers, tablets, and desktop computers without any installation.' },
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

export default function ExcelVisualizerPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <NavbarWrapper />

            {/* Hero */}
            <section style={{ padding: '56px 0 32px', background: 'linear-gradient(135deg, rgba(16,185,129,0.08), transparent)' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: 720 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 20, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)', marginBottom: 20 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Excel Visualizer</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 16, lineHeight: 1.2 }}>
                        Free Excel Data Visualizer Online
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 24 }}>
                        Convert any Excel spreadsheet to beautiful, interactive charts in seconds. No login. No uploads to any server. Works entirely in your browser.
                    </p>
                    {/* Trust badges */}
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
                        <h2>What Is the Free Excel Data Visualizer?</h2>
                        <p>
                            The <strong>free Excel data visualizer</strong> on VisualizeMyData is a browser-based tool that converts your Excel spreadsheet data into interactive charts instantly — with no signup, no installation, and no data ever leaving your device. Whether you have sales figures, survey results, student grades, or financial data in an Excel file, this tool transforms it into clear, professional visualizations in just a few clicks.
                        </p>
                        <p>
                            Simply upload your <strong>.xlsx</strong> or <strong>.xls</strong> file, and the tool automatically detects your columns and numeric data. You then choose your chart type — bar chart, line chart, area chart, or pie chart — and your visualization is ready. You can switch between chart types, customize color palettes, and download the final chart as a <strong>PNG image or PDF document</strong>.
                        </p>

                        <h2>Who Is This Tool For?</h2>
                        <p>
                            This <strong>free Excel to graph converter</strong> is designed for everyone who works with data but does not want to spend hours in specialized software:
                        </p>
                        <ul>
                            <li><strong>Students</strong> presenting research data for assignments and thesis projects.</li>
                            <li><strong>Business analysts</strong> who need to quickly visualize Excel reports without exporting to other tools.</li>
                            <li><strong>Teachers and educators</strong> creating visual aids from grade books and assessment data.</li>
                            <li><strong>Small business owners</strong> tracking sales, inventory, or customer data in spreadsheets.</li>
                            <li><strong>Researchers and scientists</strong> needing a fast, no-login spreadsheet chart generator.</li>
                        </ul>

                        <h2>Why Is Your Data Safe?</h2>
                        <p>
                            Unlike many online tools, VisualizeMyData processes your Excel files <strong>entirely within your browser</strong> using the <code>xlsx</code> JavaScript library. This means your file is never transmitted to any external server, never stored in a database, and is automatically cleared when you close or refresh the tab. This approach makes the tool ideal for <strong>confidential business data, personal financial records, and private research files</strong>.
                        </p>

                        <h2>How to Convert Excel to Chart — Step by Step</h2>
                        <ol>
                            <li>Click <strong>"Upload File"</strong> or drag your <code>.xlsx</code> / <code>.xls</code> file into the drop zone.</li>
                            <li>The tool automatically reads your spreadsheet and detects numeric columns.</li>
                            <li>Select your preferred <strong>chart type</strong> — bar, line, area, or pie.</li>
                            <li>Choose a <strong>color palette</strong> to match your brand or presentation.</li>
                            <li>Click <strong>"Download PNG"</strong> or <strong>"Download PDF"</strong> to export your chart.</li>
                        </ol>

                        <h2>Also Try These Related Tools</h2>
                        <p>
                            Need to visualize other data formats? VisualizeMyData supports multiple file types:
                        </p>
                        <ul>
                            <li><Link href="/csv-visualizer/">→ <strong>Free CSV to Chart Converter</strong></Link> — visualize raw CSV data files instantly</li>
                            <li><Link href="/pdf-visualizer/">→ <strong>PDF Table Extractor &amp; Visualizer</strong></Link> — extract tables from PDFs and chart them</li>
                            <li><Link href="/google-sheets-visualizer/">→ <strong>Google Sheets Visualizer</strong></Link> — paste a public Sheets URL and generate charts</li>
                            <li><Link href="/">→ <strong>Back to Homepage</strong></Link> — try all formats in one place</li>
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
