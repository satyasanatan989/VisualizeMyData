import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import DashboardView from '../DashboardView';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free Online Data Analysis Tool — Descriptive Statistics & Insights | VisualizeMyData',
    description: 'Analyze Excel, CSV, and PDF data online instantly. Get automatic descriptive statistics, outliers, average distributions, and trend logs. Free, 100% private.',
    alternates: {
        canonical: 'https://visualizemydata.in/data-analysis-tool/',
    },
    openGraph: {
        title: 'Free Online Data Analysis & Statistics Tool | VisualizeMyData',
        description: 'Analyze Excel, CSV, and PDF data online instantly. Get automatic descriptive statistics, outliers, average distributions, and trend logs. Free, 100% private.',
        url: 'https://visualizemydata.in/data-analysis-tool/',
        type: 'website',
        siteName: 'VisualizeMyData',
        locale: 'en_US',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'VisualizeMyData Data Analysis Tool' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Online Data Analysis & Statistics Tool | VisualizeMyData',
        description: 'Get automated statistics, outlier flags, and data insights client-side. No signup required.',
        images: ['/og-image.png'],
    },
};

const faqItems = [
    { q: 'How does the online data analysis tool work?', a: 'Once you upload a spreadsheet file (Excel or CSV) or drop a PDF document containing table structures, the analysis engine parses the dataset. It automatically detects text and numeric columns, runs statistical math (calculating means, averages, records, min/max), scans for value anomalies, and displays the summary details in a neat analytical dashboard.' },
    { q: 'What statistics does the tool compute?', a: 'It calculates descriptive metrics including total record counts, unique category splits, arithmetic averages, median boundaries, absolute minimums, and absolute maximums for every numeric variable in your dataset.' },
    { q: 'How are outliers detected?', a: 'The outlier detector scans numeric values using standard deviation bounds from the calculated mean. Values that fall significantly outside the normal distribution range are flagged in the insights panel as potential anomalies or exceptional data points.' },
    { q: 'Do I need to pay or create an account to run data analysis?', a: 'No. The analytical dashboard and all statistical features are completely free to use, without limitations or captcha limits, and require no account registration.' },
    { q: 'Can my private business files be accessed by anyone?', a: 'No. The analysis engine processes files locally inside your browser memory using JavaScript. No database storage or API uploads occur, keeping your proprietary business data or corporate metrics 100% secure.' },
    { q: 'Can I export the statistical summary report?', a: 'Yes. You can save the entire dashboard — including the auto-generated KPI tables, outlier logs, and charts — as a structured PDF report suitable for print distribution or file sharing.' }
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
    name: 'Online Data Analysis Tool',
    url: 'https://visualizemydata.in/data-analysis-tool/',
    description: 'Analyze Excel, CSV, and PDF data online instantly. Get automatic descriptive statistics, outliers, average distributions, and trend logs. Free, 100% private.',
    applicationCategory: 'BusinessApplication',
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
            <section style={{ padding: '56px 0 32px', background: 'linear-gradient(135deg, rgba(139,92,246,0.08), transparent)' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: 720 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 20, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)', marginBottom: 20 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Data Analysis</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 16, lineHeight: 1.2 }}>
                        Free Online Data Analysis &amp; Statistics Tool
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 24 }}>
                        Upload your data files to instantly generate descriptive statistics, outlier logs, and analytical insights. Secure, 100% local browser processing for Excel, CSV, and PDF files.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 32 }}>
                        {['🔒 100% Client-Side', '📁 Zero Server Uploads', '🚫 No Signup Required', '📈 Statistical Outlier Detection'].map(b => (
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
                        <h2>Automated Statistical Analysis in Your Browser</h2>
                        <p>
                            Raw data spreadsheets are filled with potential insights, but manually auditing them is time-consuming. Performing standard data audits requires calculating arithmetic averages, finding midpoints, identifying record outliers, and logging category splits. Doing this in Microsoft Excel requires complex nested formulas, pivot tables, or macro scripting.
                        </p>
                        <p>
                            The **Free Online Data Analysis Tool** on VisualizeMyData automates these procedures entirely. Our browser-based math engine parses your Excel, CSV, or PDF table rows and runs statistical algorithms in real-time. It maps data ranges, calculates standard deviation boundaries, identifies anomalies, and summarizes category distributions — presenting everything as a clear analytical dashboard.
                        </p>

                        <h3>Key Statistical Insights Generated Automatically</h3>
                        <ul>
                            <li><strong>Descriptive Metrics:</strong> Calculates the mean (average), median (mid-point), record volume, and minimum/maximum values for every numerical column.</li>
                            <li><strong>Outlier Logs:</strong> Scans rows using standard deviation checks to flag values that fall outside expected bounds, helping locate data entry errors or extreme spikes.</li>
                            <li><strong>Category Summaries:</strong> Logs distribution splits and counts for non-numerical categorical columns, displaying frequency distributions.</li>
                            <li><strong>Trend Auditing:</strong> Checks chronological series datasets for positive or negative slope values to report general growth or decline trends.</li>
                        </ul>

                        <h3>Keep Your Data Secure and Private</h3>
                        <p>
                            Corporate audits, medical data registries, and personal financial sheets should never be uploaded to standard cloud-based converters. VisualizeMyData operates 100% client-side. The file parser and statistical calculation engine are written in local JavaScript, running entirely within your browser tab. Your files never leave your computer, keeping your metrics completely secure.
                        </p>

                        <h3>Related Analytical Utilities</h3>
                        <ul>
                            <li><Link href="/dashboard-generator/">→ <strong>Interactive Dashboard Builder</strong></Link> — auto-generate full KPI layouts and charts</li>
                            <li><Link href="/excel-visualizer/">→ <strong>Excel Data Visualizer</strong></Link> — plot interactive charts from Excel sheets</li>
                            <li><Link href="/csv-visualizer/">→ <strong>Free CSV Chart Generator</strong></Link> — quick csv file converter and graph maker</li>
                            <li><Link href="/data-report-generator/">→ <strong>Data Report Builder</strong></Link> — compile structured business summaries and print reports</li>
                        </ul>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
