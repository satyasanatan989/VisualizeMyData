import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import DataCleaner from '@/components/dashboard/DataCleaner';
import DiscoveryLinks from '@/components/DiscoveryLinks';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free Online CSV Cleaner – Remove Duplicates & Empty Rows | VisualizeMyData',
    description: 'Clean CSV files online for free. Remove duplicate rows, strip blank lines, trim spaces, normalize column headers, standardize dates, and download cleaned CSV files client-side. No signup, no logs.',
    alternates: {
        canonical: 'https://visualizemydata.in/csv-cleaner/',
    },
    openGraph: {
        title: 'Free Online CSV Cleaner – Remove Duplicates & Empty Rows | VisualizeMyData',
        description: 'Clean CSV files online for free. Remove duplicate rows, strip blank lines, trim spaces, normalize column headers, standardize dates, and download cleaned CSV files client-side. No signup, no logs.',
        url: 'https://visualizemydata.in/csv-cleaner/',
        type: 'website',
        siteName: 'VisualizeMyData',
        locale: 'en_US',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'VisualizeMyData CSV Cleaner' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Online CSV Cleaner – Remove Duplicates & Empty Rows | VisualizeMyData',
        description: 'Clean CSV files online for free. Remove duplicates, trim spaces, and standardise dates locally in your browser.',
        images: ['/og-image.png'],
    },
};

const faqItems = [
    { q: 'How do I clean a CSV file online?', a: 'Upload your CSV file above. The browser-based CSV parser reads the data rows instantly, letting you choose to remove duplicates, strip blank lines, standardize date columns, trim extra spaces, and rename columns before downloading.' },
    { q: 'Does my CSV data get uploaded to any servers?', a: 'No. All parsing and data operations are executed locally within your web browser using JavaScript. No files or database entries are transmitted over the internet.' },
    { q: 'Can I format the CSV headers?', a: 'Yes. The header formatting filter lets you normalize column names into snake_case, camelCase, Title Case, or CAPITAL letters, which is helpful before importing CSVs into SQL databases.' },
    { q: 'How does it handle date standardization?', a: 'The parser scans columns containing dates and automatically standardizes them into the standard ISO YYYY-MM-DD format, resolving inconsistencies from mixed formats.' },
    { q: 'Can I choose to keep empty fields or fill them?', a: 'Yes. You can select filters to replace null or empty cell records with a standard placeholder (like "N/A"), fill missing numbers with 0, or delete rows containing empty cells entirely.' }
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
    name: 'Free Online CSV Cleaner',
    url: 'https://visualizemydata.in/csv-cleaner/',
    description: 'Clean CSV files online for free. Remove duplicate rows, strip empty cells, standardize dates, and normalize headers directly in your browser.',
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
                    <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
                </div>
                <div className="container" style={{ position: 'relative', maxWidth: 720 }}>
                    <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 99, background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.25)', fontSize: '0.7rem', fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 20 }}>
                        CSV Optimization
                    </span>
                    <h1 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 16 }}>
                        Free Online CSV Cleaner
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 28px' }}>
                        Clean and repair messy CSV datasets before uploading to your databases or BI tools. Zero database uploads, 100% private.
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
                        High-Speed Local CSV Pre-processing
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 20 }}>
                        CSV files are simple comma-separated values, but in practice, exporting data from legacy systems often leaves them corrupted or full of formatting issues. Extra whitespace, blank lines, missing columns, and inconsistent dates make it impossible to import CSVs smoothly. Our CSV Cleaner parses your files locally and provides one-click bulk formatting.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 20 }}>
                        This pre-processing step is extremely helpful when feeding data into business intelligence pipelines or relational database engines like PostgreSQL or MySQL. Sanitized values minimize schema syntax errors and import failures.
                    </p>

                    <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
                        Why clean CSVs using VisualizeMyData?
                    </h3>
                    <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', paddingLeft: 20, lineHeight: 2, marginBottom: 30 }}>
                        <li><strong>Standardize separators:</strong> Repairs comma spacing and text enclosures so parsing engines can read rows accurately.</li>
                        <li><strong>Remove duplications:</strong> Flags and cleans repetitive database keys or logs that shouldn&apos;t be present.</li>
                        <li><strong>Date normalization:</strong> Automatically formats dates to standard YYYY-MM-DD format for PostgreSQL, MySQL, and BigQuery loading.</li>
                        <li><strong>Header formatting:</strong> Standardizes headers to camelCase or snake_case, avoiding DB syntax errors during schema mapping.</li>
                    </ul>

                    <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 12 }}>
                        Safe and Secure Processing
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 24 }}>
                        By utilizing HTML5 File Reader APIs, the parsing, sanitization, and downloads all occur in-memory within your browser. There is no cloud-side processing, keeping all proprietary data protected on your local device.
                    </p>

                    <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 12 }}>
                        Related Pre-processing Utilities
                    </h3>
                    <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', paddingLeft: 20, lineHeight: 2 }}>
                        <li><Link href="/csv-visualizer/" style={{ color: 'var(--accent)' }}>→ <strong>CSV Chart Creator</strong></Link> — plot interactive charts from CSV files</li>
                        <li><Link href="/data-cleaning-tool/" style={{ color: 'var(--accent)' }}>→ <strong>General Data Cleaner</strong></Link> — clean Excel files alongside CSV formats</li>
                        <li><Link href="/dashboard-generator/" style={{ color: 'var(--accent)' }}>→ <strong>Interactive Dashboard Generator</strong></Link> — build automatic dashboards from CSV files</li>
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
