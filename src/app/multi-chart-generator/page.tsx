import type { Metadata } from 'next';
import MultiChartGeneratorView from '@/components/views/MultiChartGeneratorView';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free Multi-Chart Dashboard Generator Online | VisualizeMyData',
    description: 'Compare multiple data columns side-by-side using bar, line, pie, area, scatter, and radar charts. Free online multi-chart dashboard generator — no login, no signup.',
    alternates: {
        canonical: 'https://visualizemydata.in/multi-chart-generator/',
    },
    openGraph: {
        title: 'Free Multi-Chart Dashboard Generator Online | VisualizeMyData',
        description: 'Compare multiple data columns side-by-side using bar, line, pie, area, scatter, and radar charts. Free online multi-chart dashboard generator — no login, no signup.',
        url: 'https://visualizemydata.in/multi-chart-generator/',
        type: 'website',
        siteName: 'VisualizeMyData',
        locale: 'en_US',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'VisualizeMyData Multi-Chart Generator' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Multi-Chart Dashboard Generator Online | VisualizeMyData',
        description: 'Compare multiple data columns side-by-side using different charts. Free online tool — no signup required.',
        images: ['/og-image.png'],
    },
};

const faqItems = [
    { q: 'What is a multi-chart dashboard generator?', a: 'It is a specialized data visualization tool that allows you to plot and display multiple charts side-by-side from a single uploaded file (Excel, CSV, or PDF). This makes it easy to compare different columns, variables, or metrics simultaneously.' },
    { q: 'Which chart types are available in the multi-chart builder?', a: 'You can generate bar charts, line charts, pie charts, area charts, scatter plots, radar charts, and data summary cards. You can assign different columns to different chart layouts within the same workspace.' },
    { q: 'Can I visualize Excel and CSV files together?', a: 'You can upload one file at a time (e.g., an Excel sheet or a CSV file) and generate multiple independent charts from the different columns or sheets contained within that single dataset.' },
    { q: 'Is there a limit to how many charts I can create?', a: 'No. You can add as many charts as your screen real estate allows. The interface features a modular grid that adjusts dynamically as you append new charts to your dashboard.' },
    { q: 'Is my data secure when using the multi-chart maker?', a: 'Absolutely. Just like all tools on VisualizeMyData, the multi-chart generator operates 100% client-side inside your browser. No files or records are uploaded to any external server.' },
    { q: 'Can I print or save the entire dashboard?', a: 'Yes. You can export the entire collection of charts as a single PDF report using the print/save controls at the top of the dashboard platform.' },
    { q: 'How do I change the columns plotted in a specific chart?', a: 'Each chart block in the generator has individual controls. You can click on a chart block to modify its type, change its X/Y axis data columns, adjust color palettes, or delete it entirely.' }
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
    name: 'Free Multi-Chart Generator',
    url: 'https://visualizemydata.in/multi-chart-generator/',
    description: 'Compare multiple data columns side-by-side using different charts online. Free, no login, 100% client-side.',
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

            {/* The interactive tool */}
            <MultiChartGeneratorView />

            {/* In-depth content section for SEO and E-E-A-T */}
            <section style={{ padding: '64px 0 48px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ maxWidth: 860 }}>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 20 }}>
                        Unlock Comparative Insights with the Multi-Chart Generator
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                        When analyzing business records, scientific research, or survey responses, viewing a single chart is rarely enough. A true analytical workflow requires looking at different variables side-by-side: comparing monthly sales trends alongside product category splits, or tracking regional performance while simultaneously inspecting individual customer satisfaction rates.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                        The VisualizeMyData Multi-Chart Generator enables you to build custom, multi-panel dashboards from your Excel, CSV, or PDF spreadsheets. Simply drag your file into the workspace to parse it locally, and start appending custom visualization blocks. Plot one column as a bar chart, another as a line chart, and select a third for a breakdown pie chart. The generator handles all layout scaling automatically.
                    </p>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '36px 0 16px' }}>
                        How to Build a Custom Multi-Chart Board
                    </h2>
                    <ol style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: 20 }}>
                        <li><strong>Drag &amp; Drop Your File</strong> — upload any standard spreadsheet (.xlsx, .xls, .csv) or text-based PDF containing tables.</li>
                        <li><strong>Configure Your First Chart</strong> — select a chart type (Bar, Line, Area, Pie, Scatter, Radar) and specify which columns represent your data categories and numeric values.</li>
                        <li><strong>Add More Visualization Blocks</strong> — click the "Add Chart" button to generate a new slot. Customize it independently to plot different columns or use different visual representations.</li>
                        <li><strong>Reorder and Customize</strong> — customize individual block colors, titles, and variables to create a logical analytical flow.</li>
                        <li><strong>Download Your Analytical Report</strong> — click "Export Dashboard" to save your multi-chart layout as a single, print-ready PDF report or save individual charts as high-resolution PNGs.</li>
                    </ol>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '36px 0 16px' }}>
                        When to Use a Multi-Chart Comparison Board
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                        <strong>Marketing Campaigns Evaluation:</strong> Build a marketing overview showing lead volume trends (Line Chart), acquisition sources (Pie Chart), and cost-per-lead comparisons across different channels (Bar Chart) — all derived from a single exported campaign report.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                        <strong>Sales Performance Analysis:</strong> Map out absolute monthly revenue values alongside sales representative performance metrics and regional distribution percentages to identify product bottlenecks and geographic opportunities.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                        <strong>Academic &amp; Survey Research:</strong> Display demographic distributions (pie or bar charts) directly alongside correlation scatter plots or frequency histograms to present research findings clearly and concisely.
                    </p>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '36px 0 16px' }}>
                        Designed for Total Security &amp; Offline Speed
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                        Unlike SaaS platforms that require uploading database records or credentials to remote servers, the VisualizeMyData platform is 100% client-side. Your uploaded files are never sent over the internet, keeping proprietary financial files, client databases, and personal records perfectly secure. The entire application runs directly on your device's CPU and memory, providing instantaneous chart updates and full offline capabilities once the page loads.
                    </p>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '36px 0 16px' }}>
                        Explore Related Tools
                    </h2>
                    <ul style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: 20 }}>
                        <li><Link href="/dashboard-generator/" style={{ color: 'var(--accent)' }}>→ <strong>Interactive Dashboard Generator</strong></Link> — build automatic dashboards with KPI summary cards and smart insights</li>
                        <li><Link href="/excel-visualizer/" style={{ color: 'var(--accent)' }}>→ <strong>Excel Data Visualizer</strong></Link> — quick spreadsheet plotting for .xlsx and .xls formats</li>
                        <li><Link href="/csv-visualizer/" style={{ color: 'var(--accent)' }}>→ <strong>CSV to Chart Generator</strong></Link> — standard single-chart plotter for comma-separated spreadsheets</li>
                        <li><Link href="/data-report-generator/" style={{ color: 'var(--accent)' }}>→ <strong>Data Report Builder</strong></Link> — generate structured, multi-page analytical summaries</li>
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
