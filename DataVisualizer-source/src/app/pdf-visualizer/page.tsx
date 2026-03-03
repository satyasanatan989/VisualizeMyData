import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import DashboardView from '../DashboardView';

export const metadata: Metadata = {
    title: 'PDF Data Visualizer – Extract Tables from PDF & Create Charts',
    description: 'Upload PDF files to extract tables and create online charts. Free browser-based PDF table extractor and data visualizer. No server upload required.',
    openGraph: {
        title: 'PDF Data Visualizer – Extract Tables from PDF & Create Charts',
        description: 'Extract PDF tables and turn them into charts. 100% free and browser-based.',
        type: 'website',
    },
};

export default function PdfVisualizerPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />

            <section style={{ padding: '64px 0', background: 'linear-gradient(135deg, rgba(244,63,94,0.08), transparent)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'rgba(244,63,94,0.12)', borderRadius: 99, border: '1px solid rgba(244,63,94,0.25)', marginBottom: 20 }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#fb7185', textTransform: 'uppercase', letterSpacing: '0.08em' }}>📕 PDF Visualizer</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 16 }}>
                        PDF Table Extractor & Data Visualizer
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.8 }}>
                        Upload any PDF file and automatically extract embedded tables for instant chart visualization. If no tables are found, a full PDF page preview is displayed.
                    </p>
                    <DashboardView />
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ maxWidth: 860 }}>
                    <article className="prose">
                        <h2>What is the PDF Data Visualizer?</h2>
                        <p>
                            The PDF Data Visualizer is a powerful, browser-based tool that extracts tabular data from PDF reports and renders it as interactive charts. Many organizations distribute data in PDF format — financial statements, research papers, government reports, and annual filings all commonly contain data tables. Our tool eliminates the need to manually copy numbers from PDFs, saving significant time and reducing errors.
                        </p>
                        <h2>How PDF Table Extraction Works</h2>
                        <p>
                            When you upload a PDF, our tool uses a sophisticated text extraction engine powered by <strong>PDF.js</strong>, Mozilla's open-source PDF reader. It reads each page of the document, extracts text content with precise X/Y coordinates, and groups text elements that share the same vertical position into rows. Rows with consistent column alignment are identified as table data and converted into structured records ready for charting.
                        </p>
                        <h2>What Happens When No Table is Found?</h2>
                        <p>
                            Not all PDFs contain tabular data. Scanned documents, image-based PDFs, and text-only reports will not yield extractable tables. In these cases, our tool gracefully switches to <strong>PDF Preview Mode</strong>, rendering each page as a high-fidelity canvas image. You can navigate between pages using the built-in controls, allowing you to read and reference the document content without leaving the tool.
                        </p>
                        <h2>Types of PDFs That Work Best</h2>
                        <ul>
                            <li><strong>Financial Reports</strong> – Balance sheets, income statements with aligned numeric columns.</li>
                            <li><strong>Research Papers</strong> – Data tables in academic publications and white papers.</li>
                            <li><strong>Government Data</strong> – Census data, statistical reports from public agencies.</li>
                            <li><strong>Analytics Exports</strong> – PDF reports from Google Analytics, CRM tools, or BI platforms.</li>
                        </ul>
                        <h2>Limitations of PDF Table Extraction</h2>
                        <p>
                            PDF table extraction has inherent limitations due to the PDF format's nature. PDFs do not have a semantic understanding of "tables" — they are essentially positioned text elements on a canvas. Our extraction engine works well for digitally-created PDFs but may struggle with scanned documents, complex multi-column layouts, or tables with heavy use of merged cells. If extraction fails, the preview mode always provides a fallback.
                        </p>
                        <h2>Is My PDF Secure?</h2>
                        <p>
                            Yes. The entire PDF processing pipeline runs inside your browser using WebAssembly and JavaScript. Your PDF file is never transmitted to any server. This means your confidential financial reports, medical data, or proprietary research remain completely private. The data disappears entirely when you close or refresh the tab.
                        </p>
                        <h2>PDF Data Visualization Use Cases</h2>
                        <ul>
                            <li>Visualizing quarterly financial results from downloaded PDF annual reports</li>
                            <li>Charting survey data published in PDF research documents</li>
                            <li>Analyzing comparison tables from product or market research PDFs</li>
                            <li>Creating presentations from data locked in PDF format</li>
                        </ul>
                    </article>
                </div>
            </section>

            <Footer />
        </div>
    );
}
