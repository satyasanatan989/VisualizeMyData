import type { Metadata } from 'next';
import DataReportGeneratorView from '@/components/views/DataReportGeneratorView';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free PDF Data Report Generator Online | VisualizeMyData',
    description: 'Transform Excel, CSV, PDF, and Google Sheets into professional executive summaries and analytical PDF reports automatically. Free browser-based report builder.',
    alternates: {
        canonical: 'https://visualizemydata.in/data-report-generator/',
    },
    openGraph: {
        title: 'Free PDF Data Report Generator Online | VisualizeMyData',
        description: 'Transform Excel, CSV, PDF, and Google Sheets into professional executive summaries and analytical PDF reports automatically. Free browser-based report builder.',
        url: 'https://visualizemydata.in/data-report-generator/',
        type: 'website',
        siteName: 'VisualizeMyData',
        locale: 'en_US',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'VisualizeMyData Data Report Generator' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free PDF Data Report Generator Online | VisualizeMyData',
        description: 'Convert spreadsheets to structured business and academic PDF reports in seconds. No signup required.',
        images: ['/og-image.png'],
    },
};

const faqItems = [
    { q: 'What is the Data Report Generator?', a: 'It is a browser utility that parses raw datasets (CSV, Excel, PDF tables) and compiles them into a structured, printable report format. This includes automatic title pages, descriptive statistics summary tables, anomaly logs, trend descriptions, and data charts.' },
    { q: 'Does it use AI to summarize my data?', a: 'The tool uses deterministic statistical algorithms (running entirely client-side) to detect trends, calculate standard averages, identify outliers, and write summary statements in plain language. Your data is not sent to external AI servers.' },
    { q: 'Can I export the report directly to PDF?', a: 'Yes. The generator is styled specifically for printing and PDF generation. Clicking the "Export Report" button triggers your browser\'s native print dialog formatted for clean A4 or Letter page pagination.' },
    { q: 'Is there a limit on the size of the generated PDF?', a: 'The document paginates dynamically based on the volume of data and number of charts you select. Most reports range between 2 to 6 pages, formatted with clean headers, page breaks, and column alignments.' },
    { q: 'Is my business spreadsheet kept private?', a: 'Yes. Like all tools on our site, the report generator processes files locally in your browser memory. Your proprietary business figures or academic databases are never uploaded to any remote server.' },
    { q: 'Can I edit the text before exporting?', a: 'Yes. The report interface allows you to add custom report titles, subtitle notes, analyst names, and custom text sections before saving the document to PDF.' }
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
    name: 'Free Data Report Generator',
    url: 'https://visualizemydata.in/data-report-generator/',
    description: 'Transform spreadsheet data into structured analytical reports with summarizations, charts, and key statistical insights in seconds. 100% client-side.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    browserRequirements: 'Requires a modern web browser with JavaScript enabled.',
};

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />

            {/* Interactive view component */}
            <DataReportGeneratorView />

            {/* In-depth content section for SEO and E-E-A-T */}
            <section style={{ padding: '64px 0 48px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ maxWidth: 860 }}>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 20 }}>
                        Automate Executive Summaries &amp; Multi-Page PDF Reports
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                        Sharing spreadsheets with stakeholders, managers, or clients often results in cognitive overload. Raw grid rows and simple charts don't tell the full story. To make data actionable, it needs context: structured summaries, statistical thresholds, trend analysis, and clear section breaks.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                        The VisualizeMyData Report Generator automates this formatting process. By loading your Excel (.xlsx), CSV, or parsed PDF files, the utility automatically builds a professional, multi-page business document. It compiles descriptive statistics, highlights data anomalies (such as extreme values or outliers), plots key trends, and formats the output into clean, printable pages complete with headers, footers, and page breaks.
                    </p>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '36px 0 16px' }}>
                        How to Generate an Automated Analytical Report
                    </h2>
                    <ol style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: 20 }}>
                        <li><strong>Upload Your Source File</strong> — load any CSV file, Excel sheet, or extract data tables from PDF documents.</li>
                        <li><strong>Input Metadata</strong> — set custom fields for the Document Title, Subtitle, Date, and Analyst/Author Name to personalize the cover page.</li>
                        <li><strong>Review Automated Sections</strong> — inspect auto-generated sections including the Executive Summary, Key Statistics Table, Chart Visualizations, and Outlier Logs.</li>
                        <li><strong>Customize and Annotate</strong> — add qualitative notes, edit automatically generated summary text, or toggle specific charts in the report customizer.</li>
                        <li><strong>Save as PDF</strong> — click "Export Report" to print the document or save it as a high-quality PDF directly to your device.</li>
                    </ol>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '36px 0 16px' }}>
                        What is Included in Your Automated PDF Report?
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                        <strong>Executive Summary:</strong> A plain-language narrative summarizing the overall dataset size, key metrics, and core observations.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                        <strong>Descriptive Statistics Table:</strong> Comprehensive calculations including column counts, average/mean values, median boundaries, and maximum/minimum benchmarks for every numeric attribute.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                        <strong>Outlier &amp; Anomaly Log:</strong> Automatic scanning of numerical rows to identify values exceeding standard standard deviations, alerting you to data entry errors or exceptional performance spikes.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                        <strong>Data Charts:</strong> Embedded high-resolution visualizations plotting core trends and category distributions, pre-scaled to fit within standard PDF page dimensions without cropping.
                    </p>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '36px 0 16px' }}>
                        Explore Related Tools
                    </h2>
                    <ul style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: 20 }}>
                        <li><Link href="/dashboard-generator/" style={{ color: 'var(--accent)' }}>→ <strong>Interactive Dashboard Builder</strong></Link> — generate interactive analytical dashboards with KPI cards</li>
                        <li><Link href="/multi-chart-generator/" style={{ color: 'var(--accent)' }}>→ <strong>Multi-Chart Dashboard Maker</strong></Link> — compare multiple metrics side-by-side in custom workspaces</li>
                        <li><Link href="/excel-visualizer/" style={{ color: 'var(--accent)' }}>→ <strong>Excel Data Visualizer</strong></Link> — quickly plot and customize charts from .xlsx files</li>
                        <li><Link href="/data-analysis-tool/" style={{ color: 'var(--accent)' }}>→ <strong>Data Analysis Tool</strong></Link> — deep statistical outlines, standard deviation logs, and outlier flags</li>
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
        </>
    );
}
