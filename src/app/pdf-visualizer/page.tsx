import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import DashboardView from '../DashboardView';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free PDF Table Extractor & Data Visualizer Online | No Login',
    description: 'Extract tables from any PDF and instantly create bar, line or pie charts online. Free PDF data visualizer — no signup, no server upload, 100% private.',
    alternates: { canonical: 'https://visualizemydata.in/pdf-visualizer/' },
    openGraph: {
        title: 'Free PDF Table Extractor & Data Visualizer Online | No Login',
        description: 'Extract tables from PDF files and convert to charts online. Free, private, no server upload — try it instantly.',
        url: 'https://visualizemydata.in/pdf-visualizer/',
    },
};

const faqItems = [
    { q: 'Can I create a chart directly from a PDF file?', a: 'Yes. Upload your PDF and the tool automatically attempts to detect and extract any embedded tables. If a table is found, it is converted into a dataset you can chart immediately.' },
    { q: 'What happens if my PDF does not contain a table?', a: 'If no table is detected, the tool switches to PDF preview mode, rendering each page of your PDF as a high-quality image so you can still view the document.' },
    { q: 'Is this PDF table extractor free?', a: 'Yes, completely free with no login, no subscription, and no credit card required.' },
    { q: 'Does my PDF file get uploaded to a server?', a: 'No. The PDF is processed entirely in your browser using the pdfjs-dist library. Your file never leaves your device and is not stored anywhere.' },
    { q: 'What type of PDFs work best for table extraction?', a: 'Machine-readable PDFs (created digitally, not scanned) work best. Scanned PDFs that are images of text cannot have tables extracted without OCR, which this tool does not use.' },
    { q: 'Can I extract tables from multi-page PDFs?', a: 'Yes. The tool scans all pages of your PDF for tables. You can also navigate through pages in preview mode if table extraction is not possible.' },
    { q: 'What chart types can I create from PDF data?', a: 'Once the table is extracted, you can create bar charts, line charts, area charts, and pie charts, and download them as PNG or PDF.' },
    { q: 'Is this better than Adobe Acrobat for extracting tables?', a: 'For quick, free, no-signup use cases, yes. This tool is instant — no Adobe account required and works directly in your browser.' },
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

export default function PdfVisualizerPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <NavbarWrapper />

            {/* Hero */}
            <section style={{ padding: '56px 0 32px', background: 'linear-gradient(135deg, rgba(244,63,94,0.08), transparent)' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: 720 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 20, background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.2)', marginBottom: 20 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#f43f5e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>PDF Visualizer</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 16, lineHeight: 1.2 }}>
                        PDF Table Extractor &amp; Data Visualizer
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 24 }}>
                        Upload any PDF file to automatically extract embedded tables and visualize them as charts. Falls back to a full-page PDF preview when no tables are detected.
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
                        <h2>What Is the Free PDF Table Extractor &amp; Visualizer?</h2>
                        <p>
                            VisualizeMyData's <strong>free PDF data visualizer</strong> is a browser-based tool that reads your PDF file, scans it for embedded tables, and automatically converts detected table data into interactive charts — all without uploading your file to any server. If no table is found, it renders your PDF as a visual page preview for easy reading.
                        </p>
                        <p>
                            PDF files often contain valuable data locked inside tables — financial statements, research results, product data, analytics reports. Extracting that data manually is time-consuming. This <strong>PDF table to chart online free</strong> tool automates the extraction and gives you charts within seconds.
                        </p>

                        <h2>Who Is This PDF Visualizer For?</h2>
                        <ul>
                            <li><strong>Finance professionals</strong> who receive quarterly reports as PDFs and need to chart specific table data.</li>
                            <li><strong>Students and academics</strong> extracting data from research papers or published reports.</li>
                            <li><strong>Journalists and data reporters</strong> who need to chart statistics published in PDF documents.</li>
                            <li><strong>Business analysts</strong> working with vendor or client PDF reports containing tabular data.</li>
                            <li><strong>Anyone</strong> who needs a <strong>pdf table to chart online free</strong> tool without installing software.</li>
                        </ul>

                        <h2>Why Your PDF Data Is Safe</h2>
                        <p>
                            PDF files often contain sensitive information — contracts, financial records, personal data. With VisualizeMyData, your PDF is processed <strong>100% within your browser</strong> using the open-source <code>pdfjs-dist</code> library (the same engine that powers Firefox PDF viewer). <strong>No bytes of your PDF are ever transmitted to any server.</strong> When you close the tab, the data is gone.
                        </p>

                        <h2>How to Extract PDF Tables and Create Charts</h2>
                        <ol>
                            <li>Click <strong>"Upload File"</strong> and select your <code>.pdf</code> file.</li>
                            <li>The tool scans all pages for embedded table structures using text-position analysis.</li>
                            <li>If a table is found, columns and rows are automatically mapped into a dataset.</li>
                            <li>Select your preferred <strong>chart type</strong> and color palette.</li>
                            <li>Export the chart as a <strong>PNG</strong> or <strong>PDF</strong>.</li>
                            <li>If no table is detected, use the <strong>PDF preview mode</strong> to navigate pages visually.</li>
                        </ol>

                        <h2>Explore Other Free Data Visualization Tools</h2>
                        <ul>
                            <li><Link href="/excel-visualizer/">→ <strong>Excel Visualizer</strong></Link> — upload .xlsx or .xls files and create charts instantly</li>
                            <li><Link href="/csv-visualizer/">→ <strong>CSV Chart Generator</strong></Link> — convert CSV data files to interactive charts free</li>
                            <li><Link href="/google-sheets-visualizer/">→ <strong>Google Sheets Visualizer</strong></Link> — paste a public Sheets link and visualize instantly</li>
                            <li><Link href="/">→ <strong>Homepage</strong></Link> — try all formats in one place</li>
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
