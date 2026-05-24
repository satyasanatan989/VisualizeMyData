import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import DataCleaner from '@/components/dashboard/DataCleaner';

export const metadata: Metadata = {
    title: 'Free Online CSV Cleaner – Remove Duplicates & Empty Rows | VisualizeMyData',
    description: 'Clean CSV files online for free. Remove duplicate rows, strip blank lines, trim spaces, normalize column headers, standardize dates, and download cleaned CSV files client-side. No signup, no logs.',
    alternates: { canonical: 'https://visualizemydata.in/csv-cleaner/' },
};

export default function CsvCleanerPage() {
    // Structure schema
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'Free Online CSV Cleaner',
        'description': 'Clean CSV files online for free. Remove duplicate rows, strip empty cells, standardize dates, and normalize headers directly in your browser.',
        'applicationCategory': 'BusinessApplication',
        'operatingSystem': 'All',
        'browserRequirements': 'Requires JavaScript. HTML5',
        'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />

            <script 
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

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
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: 20 }}>
                        CSV files are simple comma-separated values, but in practice, exporting data from legacy systems often leaves them corrupted or full of formatting issues. Extra whitespace, blank lines, missing columns, and inconsistent dates make it impossible to import CSVs smoothly. Our CSV Cleaner parses your files locally and provides one-click bulk formatting.
                    </p>

                    <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
                        Why clean CSVs using VisualizeMyData?
                    </h3>
                    <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', paddingLeft: 20, lineHeight: 2, marginBottom: 30 }}>
                        <li><strong>Standardize separators:</strong> Repairs comma spacing and text enclosures so parsing engines can read rows accurately.</li>
                        <li><strong>Remove duplications:</strong> Flags and cleans repetitive database keys or logs that shouldn&apos;t be present.</li>
                        <li><strong>Date normalization:</strong> Automatically formats dates to standard YYYY-MM-DD format for PostgreSQL, MySQL, and BigQuery loading.</li>
                        <li><strong>Header formatting:</strong> Standardizes headers to camelCase or snake_case, avoiding DB syntax errors during schema mapping.</li>
                    </ul>

                    <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 12 }}>
                        Safe and Secure Processing
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0 }}>
                        By utilizing HTML5 File Reader APIs, the parsing, sanitization, and downloads all occur in-memory within your browser. There is no cloud-side processing, keeping all proprietary data protected on your local device.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
