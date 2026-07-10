import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import DashboardView from '../DashboardView';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free Online Chart Maker — Create Charts from Excel, CSV, PDF | VisualizeMyData',
    description: 'Create professional bar, line, pie, and area charts online instantly from Excel, CSV, or PDF files. Free browser-based chart generator — no login, 100% private.',
    alternates: {
        canonical: 'https://visualizemydata.in/online-chart-maker/',
    },
    openGraph: {
        title: 'Free Online Chart Maker — Create Charts from Spreadsheet Data | VisualizeMyData',
        description: 'Create professional bar, line, pie, and area charts online instantly from Excel, CSV, or PDF files. Free browser-based chart generator — no login, 100% private.',
        url: 'https://visualizemydata.in/online-chart-maker/',
        type: 'website',
        siteName: 'VisualizeMyData',
        locale: 'en_US',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'VisualizeMyData Online Chart Maker' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Online Chart Maker — Create Charts from Spreadsheet Data | VisualizeMyData',
        description: 'Create professional bar, line, pie, and area charts online instantly from Excel, CSV, or PDF files. No login required.',
        images: ['/og-image.png'],
    },
};

const faqItems = [
    { q: 'How do I make a chart online for free?', a: 'Simply drag and drop your spreadsheet file (Excel or CSV) or a table-based PDF document into the upload zone above. The chart maker automatically parses the rows, detects column categories, and generates an interactive chart that you can customize.' },
    { q: 'What types of charts can I generate?', a: 'You can create vertical and horizontal bar charts, line graphs, area charts, and pie charts. You can also generate multi-chart workspaces and full analytical dashboards.' },
    { q: 'Do I need to sign up or create an account?', a: 'No. The chart maker is fully open-access. You do not need to register, provide an email address, or enter payment details to generate or export charts.' },
    { q: 'Is my uploaded data safe?', a: 'Yes. The online chart maker operates entirely within your web browser using HTML5 and local JavaScript APIs. Your files are processed locally on your device and are never sent to external servers.' },
    { q: 'Can I download the charts I create?', a: 'Yes. You can download individual charts as high-resolution PNG images or export the entire workspace layout as a clean PDF report.' },
    { q: 'Does the tool support Google Sheets?', a: 'Yes. By pasting a public Google Sheets share URL, the tool can load the live spreadsheet data and render charts dynamically.' },
    { q: 'Can I customize the colors and labels of my graph?', a: 'Yes. The interface features custom controls to select specific data columns for the X and Y axes, change chart titles, customize color palettes, and toggle gridlines.' }
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
    name: 'Online Chart Maker',
    url: 'https://visualizemydata.in/online-chart-maker/',
    description: 'Create professional bar, line, pie, and area charts online instantly from Excel, CSV, or PDF files. Free, no login, 100% private.',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    browserRequirements: 'Requires a modern web browser with JavaScript enabled.',
};

export default function Page() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
            <NavbarWrapper />

            {/* Hero */}
            <section style={{ padding: '56px 0 32px', background: 'linear-gradient(135deg, rgba(99,102,241,0.08), transparent)' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: 720 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 20, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)', marginBottom: 20 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Chart Maker</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 16, lineHeight: 1.2 }}>
                        Free Online Chart &amp; Graph Maker
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 24 }}>
                        Turn your spreadsheets into professional charts instantly. Free browser-based generator for Excel, CSV, PDF, and Google Sheets — no signup, 100% client-side privacy.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 32 }}>
                        {['🔒 100% Secure', '📁 Local Browser Parsing', '🚫 Zero Account Setup', '📊 Multiple Formats Supported'].map(b => (
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
                        <h2>Free Online Chart Maker for Everyone</h2>
                        <p>
                            Presenting numerical data as a list of raw figures can quickly lose the attention of your audience. Whether you are drafting a business proposal, a school assignment, a blog article, or an investment pitch deck, visual data is significantly more memorable. Charts and graphs help highlight critical trends, identify correlations, and demonstrate comparisons at a glance.
                        </p>
                        <p>
                            The **Free Online Chart Maker** on VisualizeMyData is designed to make data visualization accessible to everyone. You don't need design skills or complex spreadsheet knowledge to get started. Simply drag and drop your data file, select your preferred visualization format, customize color schemes, and export your completed chart in seconds.
                        </p>

                        <h3>Supported File Formats</h3>
                        <p>
                            Our chart generator works seamlessly with standard data export files:
                        </p>
                        <ul>
                            <li><strong>Microsoft Excel (.xlsx/.xls):</strong> Simply upload your spreadsheet; multiple sheets are automatically parsed and selectable.</li>
                            <li><strong>CSV (Comma-Separated Values):</strong> Fast and compatible with raw data exports from CRMs, accounting databases, or web analytics platforms.</li>
                            <li><strong>PDF Documents:</strong> Our parser extracts table layouts embedded within text-based PDF reports.</li>
                            <li><strong>Google Sheets:</strong> Paste a public share link to dynamically fetch and visualize live collaborative spreadsheets.</li>
                        </ul>

                        <h3>Four Common Chart Types &amp; When to Use Them</h3>
                        <p>
                            Selecting the correct chart layout is vital to presenting data accurately:
                        </p>
                        <ol>
                            <li><strong>Bar Charts:</strong> Ideal for comparing values across discrete categories (e.g., comparing sales figures by product category or monthly department budgets).</li>
                            <li><strong>Line Graphs:</strong> The best choice for demonstrating trends over time (e.g., tracking website visits over a 30-day period or monitoring revenue growth across fiscal quarters).</li>
                            <li><strong>Pie Charts:</strong> Perfect for showing relative proportions or percentages of a whole (e.g., displaying market share splits or budget allocation categories).</li>
                            <li><strong>Area Charts:</strong> Useful for showing cumulative totals over time, giving a sense of volume alongside trends.</li>
                        </ol>

                        <h3>Why Choose VisualizeMyData?</h3>
                        <p>
                            Traditional charting applications often come with limitations: they require account creation, impose watermarks on exported images, limit file uploads, or upload your sensitive business reports to cloud servers. VisualizeMyData processes everything locally inside your browser sandbox. Your data remains 100% private, and you can export unlimited charts without watermarks, entirely for free.
                        </p>

                        <h3>Related Visualization Tools</h3>
                        <ul>
                            <li><Link href="/excel-visualizer/">→ <strong>Excel Data Visualizer</strong></Link> — plot interactive charts from Excel sheets</li>
                            <li><Link href="/csv-visualizer/">→ <strong>CSV to Chart Generator</strong></Link> — quick csv file converter and graph maker</li>
                            <li><Link href="/pdf-table-to-chart/">→ <strong>PDF Table Extractor</strong></Link> — pull tables from PDF reports and turn them into graphs</li>
                            <li><Link href="/dashboard-generator/">→ <strong>Interactive Dashboard Builder</strong></Link> — build automatic dashboards with summary statistics</li>
                        </ul>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
