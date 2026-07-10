import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import DataCleaner from '@/components/dashboard/DataCleaner';
import DiscoveryLinks from '@/components/DiscoveryLinks';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free Online Data Cleaning Tool – Remove Duplicates & Empty Rows | VisualizeMyData',
    description: 'Clean Excel and CSV files online for free. Remove duplicate rows, strip blank lines, trim spaces, normalize column headers, standardize dates, and download cleaned files client-side. No signup, no logs.',
    alternates: {
        canonical: 'https://visualizemydata.in/data-cleaning-tool/',
    },
    openGraph: {
        title: 'Free Online Data Cleaning Tool – Remove Duplicates & Empty Rows | VisualizeMyData',
        description: 'Clean Excel and CSV files online for free. Remove duplicate rows, strip blank lines, trim spaces, normalize column headers, standardize dates, and download cleaned files client-side. No signup, no logs.',
        url: 'https://visualizemydata.in/data-cleaning-tool/',
        type: 'website',
        siteName: 'VisualizeMyData',
        locale: 'en_US',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'VisualizeMyData Data Cleaning Tool' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Online Data Cleaning Tool – Remove Duplicates & Empty Rows | VisualizeMyData',
        description: 'Clean Excel and CSV files online for free. Remove duplicates, trim spaces, and standardise dates locally in your browser.',
        images: ['/og-image.png'],
    },
};

const faqItems = [
    { q: 'How does the browser-based data cleaner work?', a: 'When you upload an Excel or CSV file, the tool parses it entirely in local browser memory using JavaScript. The cleaning filters — such as duplicate removal, text trimming, and null replacement — run instantly on your device CPU, letting you download the sanitized file immediately.' },
    { q: 'Does it support Excel (.xlsx) files as well as CSV?', a: 'Yes. The data cleaning tool accepts standard Excel (.xlsx and .xls) files, CSV files (.csv), and standard tab-delimited files. Cleaned files can be downloaded back in their original format.' },
    { q: 'Is my private business information safe?', a: 'Yes. The data cleaner runs 100% client-side. Your file data is never sent over the internet or uploaded to any remote server, keeping financial lists, employee rosters, and customer contacts completely private.' },
    { q: 'What happens to rows with empty cells?', a: 'You can customize how empty cells are treated: you can choose to delete entire rows containing missing values, replace empty cells with a default string (like "N/A"), or replace empty numeric cells with a zero.' },
    { q: 'Can I undo a cleaning action?', a: 'Yes. The cleaning interface tracks your filter settings. You can reset or toggle individual cleaning options (like header capitalization or blank row removal) and preview the changes in the grid before downloading.' },
    { q: 'Is there a limit on row counts?', a: 'There is no hard limit, but datasets under 50,000 rows are processed best. Performance depends entirely on your device\'s CPU and browser memory.' }
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
    name: 'Free Online Data Cleaning Tool',
    url: 'https://visualizemydata.in/data-cleaning-tool/',
    description: 'Clean Excel and CSV files online for free. Remove duplicate rows, strip empty cells, standardize dates, and normalize headers directly in your browser.',
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

            {/* Hero Header */}
            <section style={{ padding: '60px 0 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
                </div>
                <div className="container" style={{ position: 'relative', maxWidth: 720 }}>
                    <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 99, background: 'rgba(186,158,255,0.08)', border: '1px solid rgba(186,158,255,0.25)', fontSize: '0.7rem', fontWeight: 700, color: '#cdcdff', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 20 }}>
                        Data Pre-Processing
                    </span>
                    <h1 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 16 }}>
                        Free Online Data Cleaning Tool
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 28px' }}>
                        Quickly prepare your spreadsheet datasets before analysis. Clean duplicates, null values, trailing spaces, and standardize date fields instantly.
                    </p>
                </div>
            </section>

            {/* Main Interactive Tool Container */}
            <main className="container" style={{ paddingBottom: 80 }}>
                <DataCleaner />
            </main>

            {/* Informational SEO Section */}
            <section style={{ padding: '60px 0 70px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <h2 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 800, marginBottom: 16 }}>
                        Why Clean Your Spreadsheet Data?
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 20 }}>
                        In data analytics, the rule of "garbage in, garbage out" is absolute. If your raw CSV or Excel dataset contains duplicate entries, mismatched date formats, trailing white spaces, or empty cells, your charts and pivot tables will produce skewed, inaccurate insights. Cleaning your data is the critical first step in any analytical workflow.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 20 }}>
                        Messy spreadsheets often cause issues when building dashboards or calculating summary formulas. For instance, trailing spaces can prevent exact category groupings, while inconsistent text capitalization might lead to multiple redundant categories on a pie chart. Standardizing your fields beforehand saves hours of manual troubleshooting.
                    </p>

                    <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
                        Key Features of VisualizeMyData Data Cleaner:
                    </h3>
                    <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', paddingLeft: 20, lineHeight: 2, marginBottom: 30 }}>
                        <li><strong>Remove Duplicates:</strong> Instantly scans all spreadsheet rows and deletes exact duplicate entries.</li>
                        <li><strong>Standardize Date Formats:</strong> Parses textual dates (e.g. "12/04/2026", "2026.05.24") and standardizes them to ISO standard YYYY-MM-DD.</li>
                        <li><strong>Trim Spaces:</strong> Cleans up database strings by stripping out unnecessary leading, trailing, and double white spaces.</li>
                        <li><strong>Null &amp; Empty Value Handling:</strong> Replaces missing fields smartly with 0 for numeric fields or "N/A" for text fields.</li>
                        <li><strong>Normalize Headers:</strong> Automatically formats messy column titles into standard snake_case, camelCase, or Title Case.</li>
                    </ul>

                    <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 12 }}>
                        100% Client-Side Privacy
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 24 }}>
                        VisualizeMyData processes your files locally using standard browser APIs. Your spreadsheet contents are never uploaded to any remote server or third-party database. Your private records remain secure on your own device.
                    </p>

                    <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 12 }}>
                        Related Pre-Processing Tools
                    </h3>
                    <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', paddingLeft: 20, lineHeight: 2 }}>
                        <li><Link href="/csv-cleaner/" style={{ color: 'var(--accent)' }}>→ <strong>CSV-Specific Cleaner</strong></Link> — specialized utility for handling csv files</li>
                        <li><Link href="/excel-formula-generator/" style={{ color: 'var(--accent)' }}>→ <strong>Excel Formula Creator</strong></Link> — write complex excel formulas instantly</li>
                        <li><Link href="/dashboard-generator/" style={{ color: 'var(--accent)' }}>→ <strong>Interactive Dashboard Builder</strong></Link> — auto-generate analytical reports after data cleanup</li>
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

            <DiscoveryLinks />
            <Footer />
        </div>
    );
}
