import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import FormulaGenerator from '@/components/dashboard/FormulaGenerator';

export const metadata: Metadata = {
    title: 'Free Excel Formula Generator – VLOOKUP, XLOOKUP, INDEX MATCH | VisualizeMyData',
    description: 'Generate Excel and Google Sheets formulas online for free. Use our searchable helper or interactive builder to write VLOOKUP, XLOOKUP, INDEX MATCH, SUMIF, and COUNTIF formulas in seconds.',
    alternates: { canonical: 'https://visualizemydata.in/excel-formula-generator/' },
};

export default function ExcelFormulaGeneratorPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'Free Excel Formula Generator',
        'description': 'Generate complex Excel and Google Sheets formulas instantly using our interactive online tool. Learn syntax, parameters, and examples.',
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
                    <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(144,147,255,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
                </div>
                <div className="container" style={{ position: 'relative', maxWidth: 720 }}>
                    <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 99, background: 'rgba(144, 147, 255, 0.08)', border: '1px solid rgba(144, 147, 255, 0.25)', fontSize: '0.7rem', fontWeight: 700, color: '#b4c6fc', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 20 }}>
                        Formula Helper
                    </span>
                    <h1 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 16 }}>
                        Free Excel Formula Generator
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 28px' }}>
                        Build complex spreadsheet formulas without memorizing syntax. Search our catalog or use the interactive builder to generate copyable formulas.
                    </p>
                </div>
            </section>

            {/* Main Interactive Tool Container */}
            <main className="container" style={{ paddingBottom: 80 }}>
                <FormulaGenerator />
            </main>

            {/* Informational SEO Section */}
            <section style={{ padding: '60px 0 70px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <h2 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 800, marginBottom: 16 }}>
                        Master Spreadsheet Formulas Instantly
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: 20 }}>
                        Modern business depends on spreadsheet calculations, but formatting parameters correctly in formulas like VLOOKUP, INDEX MATCH, or SUMIF is notoriously difficult. A single misplaced comma or mismatched range can trigger frustrating errors like #N/A, #VALUE!, or #REF!. The VisualizeMyData Excel Formula Generator removes the guesswork by showing exactly how parameters relate to your goals.
                    </p>

                    <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
                        Formulas You Can Generate:
                    </h3>
                    <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', paddingLeft: 20, lineHeight: 2, marginBottom: 30 }}>
                        <li><strong>XLOOKUP:</strong> The modern way to search rows. Can look left, default fallback values, and works without column index numbers.</li>
                        <li><strong>VLOOKUP:</strong> Standard vertical lookup. Searches the leftmost column of your table and returns values to the right.</li>
                        <li><strong>INDEX MATCH:</strong> The industry standard for large spreadsheets, supporting leftward matching and dynamic columns.</li>
                        <li><strong>SUMIF:</strong> Sums range cells depending on whether they satisfy a target logical condition.</li>
                        <li><strong>COUNTIF:</strong> Scans cell columns and counts cells meeting criteria (e.g. tracking absences or passing scores).</li>
                    </ul>

                    <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 12 }}>
                        Perfect for Excel &amp; Google Sheets
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0 }}>
                        All generated formulas utilize standard syntax supported by both Microsoft Excel and Google Sheets. Simply click the copy button, double-click a cell in your spreadsheet, paste the formula, and press Enter.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
