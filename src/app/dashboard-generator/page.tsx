import type { Metadata } from 'next';
import DashboardGeneratorView from '@/components/views/DashboardGeneratorView';
import Footer from '@/components/Footer';
import NavbarWrapper from '@/components/NavbarWrapper';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free Interactive Dashboard Generator Online — Excel, CSV, PDF | VisualizeMyData',
    description: 'Build interactive analytical dashboards from Excel, CSV, PDF, or Google Sheets files — free, no login, 100% browser-based. Get KPI cards, charts, and AI insights instantly.',
    alternates: {
        canonical: 'https://visualizemydata.in/dashboard-generator/',
    },
    openGraph: {
        title: 'Free Interactive Dashboard Generator Online | VisualizeMyData',
        description: 'Build interactive analytical dashboards from Excel, CSV, PDF, or Google Sheets files — free, no login, 100% browser-based. Get KPI cards, charts, and AI insights instantly.',
        url: 'https://visualizemydata.in/dashboard-generator/',
        type: 'website',
        siteName: 'VisualizeMyData',
        locale: 'en_US',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'VisualizeMyData Dashboard Generator' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Interactive Dashboard Generator Online | VisualizeMyData',
        description: 'Build interactive analytical dashboards from Excel, CSV, PDF, or Google Sheets files — free, no login, 100% browser-based.',
        images: ['/og-image.png'],
    },
};

const faqItems = [
    { q: 'What file formats does the dashboard generator support?', a: 'The dashboard generator accepts Excel files (.xlsx and .xls), CSV files (.csv), PDF documents containing tables, and public Google Sheets URLs. All file processing happens entirely within your browser.' },
    { q: 'Is the dashboard generator completely free?', a: 'Yes, entirely free. There are no subscription tiers, no hidden fees, and no account registration required. Every feature — including PDF export — is available at zero cost.' },
    { q: 'Does my data get uploaded to a server?', a: 'No. Your files are parsed locally using JavaScript running in your browser. Your data never leaves your device and is not stored, processed, or analysed on any external server.' },
    { q: 'What does the AI Insights panel show?', a: 'The AI Insights panel automatically analyses your dataset and generates plain-language observations — such as top-performing categories, outlier values, column correlations, and trend descriptions. It works entirely client-side using statistical algorithms without any external API call.' },
    { q: 'Can I export the dashboard as a PDF or image?', a: 'Yes. Once your dashboard is generated, you can download it as a PDF report or export individual charts as PNG images. The export function works offline once the page has loaded.' },
    { q: 'How many rows of data can the tool handle?', a: 'The dashboard generator comfortably handles datasets up to approximately 50,000 rows. Performance depends on your device memory, but most business-scale datasets work instantly.' },
    { q: 'Can I filter or sort the data inside the dashboard?', a: 'Yes. The dashboard includes interactive filters that let you narrow down data by column values and sort rows to focus on specific segments of your dataset.' },
    { q: 'Does the tool work on mobile and tablet?', a: 'Yes. The interface is fully responsive and functions on smartphones, tablets, and desktop browsers. For the best experience with large datasets, a desktop or laptop is recommended.' },
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
    name: 'Free Dashboard Generator',
    url: 'https://visualizemydata.in/dashboard-generator/',
    description: 'Build interactive analytical dashboards from Excel, CSV, PDF, or Google Sheets — free, no login, 100% browser-based.',
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

            {/* Tool (client component — full interactive dashboard builder) */}
            <DashboardGeneratorView />

            {/* Static SEO content — server-rendered, always in HTML */}
            <section style={{ padding: '64px 0 48px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ maxWidth: 860 }}>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 20 }}>
                        What is the Dashboard Generator?
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                        The VisualizeMyData Dashboard Generator is a free, browser-based tool that converts raw data files into fully interactive analytical dashboards — in seconds. Unlike desktop BI tools such as Power BI or Tableau that require installation, licensing, and data exports, this tool works directly inside your web browser. There is no software to install, no account to create, and your data never leaves your device.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                        Designed for analysts, business owners, students, and non-technical users alike, the dashboard generator automatically detects your dataset structure, categorises numeric and categorical columns, and renders a professional multi-panel dashboard featuring KPI summary cards, interactive charts, data filters, and an AI-powered insights panel. What would normally take hours in Excel or days to build with a developer is done in under 60 seconds.
                    </p>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '36px 0 16px' }}>
                        How to Create a Dashboard from Your Data
                    </h2>
                    <ol style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: 20 }}>
                        <li><strong>Upload your file</strong> — drag and drop or click to upload an Excel (.xlsx/.xls), CSV (.csv), or PDF file. Paste a Google Sheets URL for live spreadsheet data.</li>
                        <li><strong>Wait for automatic analysis</strong> — the tool parses your file, identifies numeric and text columns, computes statistics, and builds the dashboard layout automatically.</li>
                        <li><strong>Explore your dashboard</strong> — review KPI cards showing totals, averages, and record counts. Browse auto-generated charts for your key numeric columns.</li>
                        <li><strong>Read AI Insights</strong> — the insights panel highlights the most significant patterns, top-performing categories, and notable outliers in plain English.</li>
                        <li><strong>Apply filters</strong> — use the interactive filters to drill into specific date ranges, categories, or value thresholds.</li>
                        <li><strong>Export</strong> — download the complete dashboard as a PDF report, or save individual charts as PNG images.</li>
                    </ol>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '36px 0 16px' }}>
                        Key Dashboard Features
                    </h2>
                    <ul style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: 20 }}>
                        <li><strong>KPI Summary Cards</strong> — automatically calculated totals, averages, minimums, maximums, and unique value counts for every numeric column in your dataset.</li>
                        <li><strong>Multi-Format Charts</strong> — bar charts, line charts, pie charts, area charts, and scatter plots generated automatically based on your data structure.</li>
                        <li><strong>AI Insight Narratives</strong> — plain-language analysis generated client-side using statistical pattern detection — no external API, no data transmission.</li>
                        <li><strong>Column Filters</strong> — interactive dropdowns to segment your data by any categorical column without reloading the page.</li>
                        <li><strong>PDF &amp; PNG Export</strong> — download your entire dashboard or individual charts for use in presentations, reports, and emails.</li>
                        <li><strong>Full Privacy</strong> — all computation runs in your browser. Files are never uploaded. Session data is cleared on page close.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '36px 0 16px' }}>
                        Who Uses the Dashboard Generator?
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                        <strong>Business analysts</strong> use the dashboard generator to quickly visualize sales data, marketing metrics, and operational KPIs exported from CRM systems, ERPs, or marketing platforms — without waiting for a data engineering team. The ability to upload a fresh export and produce a boardroom-ready dashboard in under a minute is transformative for fast-moving teams.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                        <strong>Students and researchers</strong> use it to analyse survey results, experimental data, and financial datasets for reports and dissertations. Because the tool is entirely free and requires no software installation, it is ideal for academic environments where budget and IT restrictions are common.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                        <strong>Small business owners</strong> use it to track monthly sales trends, monitor inventory levels, and compare performance periods — all from a simple Excel or CSV export from their accounting software.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                        <strong>Freelancers and consultants</strong> use it to rapidly produce client-ready visualizations from raw data exports, saving hours of manual chart-building in Excel or Google Sheets.
                    </p>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '36px 0 16px' }}>
                        Dashboard Generator vs. Excel, Power BI, and Tableau
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 12 }}>
                        Traditional dashboard tools have significant barriers — Excel requires manual chart creation and formula writing, Power BI requires a Microsoft 365 subscription and desktop installation, and Tableau can cost thousands of dollars per user per year. VisualizeMyData eliminates these barriers entirely.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                        While professional BI tools offer greater customisation for enterprise use cases, the VisualizeMyData dashboard generator covers the most common analytical needs — trend analysis, category comparison, KPI monitoring, and outlier detection — at zero cost and with zero setup time. For individuals and small teams who need fast insights without infrastructure investment, it is the most practical choice available.
                    </p>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '36px 0 16px' }}>
                        Related Tools
                    </h2>
                    <ul style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: 20 }}>
                        <li><Link href="/csv-visualizer/" style={{ color: 'var(--accent)' }}>→ <strong>CSV to Chart Converter</strong></Link> — upload CSV files and choose your chart type manually</li>
                        <li><Link href="/excel-visualizer/" style={{ color: 'var(--accent)' }}>→ <strong>Excel Data Visualizer</strong></Link> — visualize .xlsx and .xls spreadsheet data interactively</li>
                        <li><Link href="/multi-chart-generator/" style={{ color: 'var(--accent)' }}>→ <strong>Multi-Chart Generator</strong></Link> — plot multiple columns side-by-side in a single view</li>
                        <li><Link href="/data-report-generator/" style={{ color: 'var(--accent)' }}>→ <strong>Data Report Generator</strong></Link> — produce a structured PDF analytical report from your data</li>
                        <li><Link href="/data-analysis-tool/" style={{ color: 'var(--accent)' }}>→ <strong>Data Analysis Tool</strong></Link> — descriptive statistics and outlier detection for any dataset</li>
                    </ul>
                </div>
            </section>

            {/* FAQ */}
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
