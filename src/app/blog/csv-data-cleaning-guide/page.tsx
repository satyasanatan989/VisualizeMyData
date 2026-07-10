import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'The Ultimate CSV Data Cleaning Guide for Database Imports | VisualizeMyData',
    description: 'Learn how to clean, standardize, and format CSV spreadsheets before importing them into SQL databases or BI platforms. Free browser-based tips.',
    alternates: {
        canonical: 'https://visualizemydata.in/blog/csv-data-cleaning-guide/',
    },
    openGraph: {
        title: 'The Ultimate CSV Data Cleaning Guide for Database Imports | VisualizeMyData',
        description: 'Learn how to clean, standardize, and format CSV spreadsheets before importing them into SQL databases or BI platforms. Free browser-based tips.',
        url: 'https://visualizemydata.in/blog/csv-data-cleaning-guide/',
        type: 'article',
        siteName: 'VisualizeMyData',
        locale: 'en_US',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CSV Data Cleaning Guide' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'The Ultimate CSV Data Cleaning Guide for Database Imports',
        description: 'Prepare your CSV files for SQL database imports. Clean duplicates, null values, and headers locally.',
        images: ['/og-image.png'],
    },
};

export default function Page() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />
            <article style={{ padding: '56px 0 80px' }}>
                <div className="container" style={{ maxWidth: 760 }}>
                    <div style={{ marginBottom: 40 }}>
                        <Link href="/blog" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>← Blog</Link>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 99, fontSize: '0.7rem', fontWeight: 700, color: '#3b82f6', marginLeft: 12 }}>CSV Guides</span>
                    </div>

                    <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.4rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 16 }}>
                        The Ultimate CSV Data Cleaning Guide for Database Imports
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 40 }}>July 2026 · 12 min read · By Prabhash Kumar</p>

                    <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
                        <p style={{ marginBottom: 24 }}>
                            If you have ever tried to import a raw CSV export from a CRM, marketing tool, or customer log database into PostgreSQL, MySQL, BigQuery, or Salesforce, you have probably run into syntax errors. Issues like unescaped commas, mismatched text enclosures, missing columns, or mixed date formats can break an entire database upload pipeline.
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            Cleaning your CSV data before starting imports is crucial. In this guide, we will walk you through a step-by-step pre-processing checklist to clean, standardize, and validate your comma-separated spreadsheet files.
                        </p>

                        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginTop: 40, marginBottom: 16 }}>
                            1. Normalize Column Headers (Schema Formatting)
                        </h2>
                        <p style={{ marginBottom: 24 }}>
                            Database engines are strict about column header naming. Headers containing white spaces, special characters (like `%`, `$`, `@`), or mixed cases will often return syntax errors.
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            **Best Practice:** Convert column headers to lowercase snake_case (e.g. `first_name`, `postal_code`, `total_revenue`). Avoid using numbers at the start of header names, and strip out any special character symbols.
                        </p>

                        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginTop: 40, marginBottom: 16 }}>
                            2. Remove Duplicate Records
                        </h2>
                        <p style={{ marginBottom: 24 }}>
                            Importing duplicate rows can corrupt databases that require unique primary keys (like `user_id` or `transaction_id`). You must identify and eliminate duplicate entries beforehand.
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            Using the <Link href="/csv-cleaner/" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>CSV Cleaner</Link> on VisualizeMyData, you can upload your file and select "Remove Duplicates" to instantly deduplicate rows in-memory.
                        </p>

                        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginTop: 40, marginBottom: 16 }}>
                            3. Trim Trailing and Leading Spaces
                        </h2>
                        <p style={{ marginBottom: 24 }}>
                            String spaces can be invisible to the eye but problematic to database filters. For instance, `"Active"` and `"Active "` are considered different categories by most indexing engines, causing issues in queries.
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            Make sure all textual cell data is trimmed of extra leading, trailing, or double white spaces.
                        </p>

                        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginTop: 40, marginBottom: 16 }}>
                            4. Standardize Date Fields
                        </h2>
                        <p style={{ marginBottom: 24 }}>
                            Dates are the most common source of spreadsheet headaches. If one cell represents May 24th as `24-05-2026` and another uses `05/24/2026`, your database import will fail.
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            Convert all date cells to the ISO-8601 standard format: **YYYY-MM-DD** (e.g., `2026-05-24`).
                        </p>

                        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginTop: 40, marginBottom: 16 }}>
                            5. Handle Null and Blank Cells Smartly
                        </h2>
                        <p style={{ marginBottom: 24 }}>
                            If columns require values (`NOT NULL`), empty cells will trigger import failures. Decide how to handle missing data:
                        </p>
                        <ul style={{ paddingLeft: 20, marginBottom: 24, listStyleType: 'disc' }}>
                            <li style={{ marginBottom: 8 }}>Fill empty numeric cells with `0`.</li>
                            <li style={{ marginBottom: 8 }}>Fill empty text cells with a string placeholder like `"N/A"`.</li>
                            <li style={{ marginBottom: 8 }}>Alternatively, drop rows containing missing values completely.</li>
                        </ul>

                        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginTop: 40, marginBottom: 16 }}>
                            Conclusion
                        </h2>
                        <p style={{ marginBottom: 24 }}>
                            Investing a few minutes into pre-processing your CSV datasets avoids hours of database debugging later on. Using VisualizeMyData's local browser tools, you can clean headers, dates, and duplicates completely offline, ensuring your spreadsheets are ready for a clean upload.
                        </p>
                    </div>
                </div>
            </article>
            <Footer />
        </div>
    );
}
