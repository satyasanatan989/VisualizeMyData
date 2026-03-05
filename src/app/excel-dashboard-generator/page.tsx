import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free Excel Dashboard Generator Online | Auto-Create Dashboards from Excel',
    description: 'Upload an Excel file and automatically generate a full dashboard with KPI cards, bar charts, line charts, pie charts, and AI insights. Free, no login required.',
    alternates: { canonical: 'https://visualizemydata.in/excel-dashboard-generator/' },
    openGraph: {
        title: 'Free Excel Dashboard Generator Online',
        description: 'Transform Excel data into interactive dashboards instantly. Free, browser-based, no signup.',
        url: 'https://visualizemydata.in/excel-dashboard-generator/',
    },
};

const faqItems = [
    { q: 'Can I create a dashboard from an Excel file for free?', a: 'Yes. VisualizeMyData\'s Excel Dashboard Generator is completely free. Upload your .xlsx or .xls file and it instantly generates KPI cards, interactive charts, and AI-style insights with no account required.' },
    { q: 'What types of charts are generated from Excel?', a: 'Depending on your data, the tool automatically selects bar charts, line charts, area charts, and pie charts. Date columns trigger line charts, categorical data triggers bar or pie charts.' },
    { q: 'Does my Excel data stay private?', a: 'Absolutely. All processing happens in your browser. Your Excel file is never sent to any server, never stored, and is gone when you close the tab.' },
    { q: 'Can I download the dashboard?', a: 'Yes. You can download the dashboard as a PNG image or a PDF document. You can also export your data back to Excel (.xlsx, .xls, .xlsm).' },
    { q: 'What is a KPI card?', a: 'KPI cards are summary statistics shown at the top of the dashboard: total rows, total columns, maximum value, minimum value, average value, and the count of the top category.' },
    { q: 'Can I filter the dashboard data?', a: 'Yes. The dashboard includes interactive filters: category dropdowns, numeric range sliders, and date range selectors. Charts update dynamically when you apply filters.' },
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

export default function ExcelDashboardGeneratorPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <NavbarWrapper />

            <section style={{ padding: '60px 0 40px', background: 'linear-gradient(135deg, rgba(16,185,129,0.07), transparent)' }}>
                <div className="container" style={{ maxWidth: 760, textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 99, marginBottom: 20 }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Excel Dashboard</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.8rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 16 }}>
                        Free Excel Dashboard Generator Online
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 32 }}>
                        Upload any Excel spreadsheet and automatically generate a complete dashboard — KPI cards, interactive charts, AI insights, and data tables. No login. No server. 100% free.
                    </p>
                    <Link href="/dashboard-generator" className="btn-primary">
                        → Open Dashboard Generator
                    </Link>
                </div>
            </section>

            <section style={{ padding: '56px 0', borderTop: '1px solid var(--border-subtle)' }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <div className="prose">
                        <h2>What Is the Excel Dashboard Generator?</h2>
                        <p>
                            The <strong>Excel Dashboard Generator</strong> on VisualizeMyData is a free, browser-based tool that transforms any Excel spreadsheet into a fully interactive dashboard in seconds. Whether you have monthly sales data, inventory records, financial reports, or survey results stored in <code>.xlsx</code> or <code>.xls</code> format, the tool automatically analyses your data and generates a professional dashboard — no coding, no design skills, and no paid software required.
                        </p>
                        <p>
                            Unlike traditional dashboard tools that require manual chart configuration, VisualizeMyData uses smart column detection to automatically identify date columns, numeric fields, and categorical data, then selects the most appropriate chart type for each combination. The result is an intelligent, auto-generated dashboard that would take hours to build manually but is ready in under 10 seconds.
                        </p>

                        <h2>What Does the Excel Dashboard Include?</h2>
                        <p>When you upload an Excel file, the dashboard automatically includes:</p>
                        <ul>
                            <li><strong>KPI Cards</strong> — total rows, total columns, maximum value, minimum value, average value, and top category count</li>
                            <li><strong>Primary Chart</strong> — auto-selected bar, line, area, or pie chart based on your data types</li>
                            <li><strong>Distribution Chart</strong> — a pie or distribution chart showing category breakdown</li>
                            <li><strong>AI-Style Insights</strong> — rule-based analysis detecting trends, outliers, and category dominance</li>
                            <li><strong>Data Table</strong> — scrollable preview of the first 20 rows with full column headers</li>
                            <li><strong>Interactive Filters</strong> — category dropdowns, numeric range inputs, and date range selectors</li>
                        </ul>

                        <h2>How to Generate an Excel Dashboard — Step by Step</h2>
                        <ol>
                            <li>Click <Link href="/dashboard-generator"><strong>Open Dashboard Generator</strong></Link> above</li>
                            <li>Drag and drop your <code>.xlsx</code> or <code>.xls</code> file onto the upload zone, or click to browse</li>
                            <li>The tool reads your Excel file entirely in your browser — no server involved</li>
                            <li>Within seconds you see KPI cards, AI insights, and auto-generated charts</li>
                            <li>Use filters to explore segments of your data</li>
                            <li>Download the dashboard as <strong>PNG</strong> or <strong>PDF</strong>, or export your data to <strong>Excel (.xlsx, .xls, .xlsm)</strong></li>
                        </ol>

                        <h2>Supported Excel Formats</h2>
                        <p>
                            The tool supports <strong>.xlsx</strong> (Excel 2007 and later), <strong>.xls</strong> (older Excel format), and <strong>.csv</strong> comma-separated values files. You can also paste a <strong>Google Sheets link</strong> to generate a dashboard from live spreadsheet data.
                        </p>

                        <h2>Who Should Use the Excel Dashboard Generator?</h2>
                        <ul>
                            <li><strong>Business Analysts</strong> who need quick dashboards from Excel reports without Tableau or Power BI</li>
                            <li><strong>Small Business Owners</strong> tracking sales, expenses, or inventory in spreadsheets</li>
                            <li><strong>Students and Researchers</strong> presenting data findings in class or publications</li>
                            <li><strong>Teachers</strong> creating dashboard demos from class data or results</li>
                            <li><strong>Finance Professionals</strong> who want instant visual summaries of financial data</li>
                        </ul>

                        <h2>Why Is VisualizeMyData Different?</h2>
                        <p>
                            Most online dashboard tools require account creation, have file size limits, or process your data on remote servers. VisualizeMyData processes everything <strong>entirely in your browser</strong> using JavaScript — meaning your data never leaves your device, there is nothing to install, and there is no monthly subscription. It is free, instant, and private by design.
                        </p>

                        <h2>Related Tools</h2>
                        <ul>
                            <li><Link href="/csv-dashboard-generator">→ CSV Dashboard Generator</Link> — create dashboards from CSV files</li>
                            <li><Link href="/google-sheets-dashboard">→ Google Sheets Dashboard Builder</Link> — generate dashboards from Google Sheets</li>
                            <li><Link href="/data-report-generator">→ Data Report Generator</Link> — generate downloadable PDF reports</li>
                            <li><Link href="/excel-visualizer">→ Excel Chart Generator</Link> — create individual charts from Excel</li>
                        </ul>
                    </div>
                </div>
            </section>

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
