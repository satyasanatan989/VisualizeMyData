import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import DataCleaner from '@/components/dashboard/DataCleaner';

export const metadata: Metadata = {
    title: 'Free Online Data Cleaning Tool – Remove Duplicates & Empty Rows | VisualizeMyData',
    description: 'Clean Excel and CSV files online for free. Remove duplicate rows, strip blank lines, trim spaces, normalize column headers, standardize dates, and download cleaned files client-side. No signup, no logs.',
    alternates: { canonical: 'https://visualizemydata.in/data-cleaning-tool/' },
};

export default function DataCleaningPage() {
    // Structure schema
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'Free Online Data Cleaning Tool',
        'description': 'Clean Excel and CSV files online for free. Remove duplicate rows, strip empty cells, standardize dates, and normalize headers directly in your browser.',
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
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: 20 }}>
                        In data analytics, the rule of "garbage in, garbage out" is absolute. If your raw CSV or Excel dataset contains duplicate entries, mismatched date formats, trailing white spaces, or empty cells, your charts and pivot tables will produce skewed, inaccurate insights. Cleaning your data is the critical first step in any analytical workflow.
                    </p>

                    <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
                        Key Features of VisualizeMyData Data Cleaner:
                    </h3>
                    <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', paddingLeft: 20, lineHeight: 2, marginBottom: 30 }}>
                        <li><strong>Remove Duplicates:</strong> Instantly scans all spreadsheet rows and deletes exact duplicate entries.</li>
                        <li><strong>Standardize Date Formats:</strong> Parses textual dates (e.g. "12/04/2026", "2026.05.24") and standardizes them to ISO standard YYYY-MM-DD.</li>
                        <li><strong>Trim Spaces:</strong> Cleans up database strings by stripping out unnecessary leading, trailing, and double white spaces.</li>
                        <li><strong>Null &amp; Empty Value Handling:</strong> Replaces missing fields smartly with 0 for numeric fields or "N/A" for text fields.</li>
                        <li><strong>Normalize Headers:</strong> Automatically formats messy column titles into standard snake_case, camelCase, or Title Case.</li>
                    </ul>

                    <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 12 }}>
                        100% Client-Side Privacy
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0 }}>
                        VisualizeMyData processes your files locally using standard browser APIs. Your spreadsheet contents are never uploaded to any remote server or third-party database. Your private records remain secure on your own device.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
