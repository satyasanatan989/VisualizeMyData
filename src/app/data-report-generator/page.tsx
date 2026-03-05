'use client';

import React, { useState } from 'react';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import FileUploadZone from '@/components/FileUploadZone';
import ReportGenerator from '@/components/report/ReportGenerator';
import { ParsedData } from '@/lib/excelParser';
import type { PdfParseResult } from '@/lib/pdfParser';

export default function DataReportGeneratorPage() {
    const [parsedData, setParsedData] = useState<ParsedData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleDataParsed = (data: ParsedData, _isPdf?: boolean, _pdfResult?: PdfParseResult) => {
        setParsedData(data);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />

            {!parsedData && (
                <section style={{ padding: '60px 0 40px', textAlign: 'center' }}>
                    <div className="container">
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            padding: '4px 14px', background: 'rgba(16,185,129,0.12)',
                            borderRadius: 99, border: '1px solid rgba(16,185,129,0.25)', marginBottom: 20,
                        }}>
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', color: '#6ee7b7', textTransform: 'uppercase' }}>
                                Free Report Generator
                            </span>
                        </div>
                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 16,
                            background: 'linear-gradient(135deg, #e2e8f0, #34d399)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        }}>
                            Auto-Generate Data Reports<br />in Seconds
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 540, margin: '0 auto 40px' }}>
                            Upload any dataset — Excel, CSV, PDF, or Google Sheets — and get a fully formatted report with statistics, AI insights, charts, and conclusions. Download as PDF or PNG.
                        </p>
                    </div>
                </section>
            )}

            <main className="container" style={{ paddingBottom: 80 }}>
                {!parsedData ? (
                    <FileUploadZone
                        onDataParsed={handleDataParsed}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                    />
                ) : (
                    <ReportGenerator
                        parsedData={parsedData}
                        onReset={() => setParsedData(null)}
                    />
                )}
            </main>

            {!parsedData && (
                <section style={{ padding: '40px 0 60px', borderTop: '1px solid var(--border-subtle)' }}>
                    <div className="container" style={{ maxWidth: 760 }}>
                        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 700, marginBottom: 12 }}>
                            What's in the Report?
                        </h2>
                        <ul style={{ color: 'var(--text-secondary)', paddingLeft: 20, lineHeight: 2.2 }}>
                            <li><strong style={{ color: 'var(--text-primary)' }}>Dataset Summary</strong> — rows, columns, field types</li>
                            <li><strong style={{ color: 'var(--text-primary)' }}>Key Statistics</strong> — min, max, average, median per numeric column</li>
                            <li><strong style={{ color: 'var(--text-primary)' }}>AI-Style Insights</strong> — trend detection, outliers, category analysis</li>
                            <li><strong style={{ color: 'var(--text-primary)' }}>Data Sample</strong> — first 10 rows preview</li>
                            <li><strong style={{ color: 'var(--text-primary)' }}>Conclusion</strong> — auto-generated narrative summary</li>
                        </ul>
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
                            <a href="/dashboard-generator" style={{ color: 'var(--accent-blue)', textDecoration: 'underline', fontSize: '0.875rem' }}>→ Dashboard Generator</a>
                            <a href="/excel-visualizer" style={{ color: 'var(--accent-blue)', textDecoration: 'underline', fontSize: '0.875rem' }}>→ Excel Visualizer</a>
                            <a href="/csv-visualizer" style={{ color: 'var(--accent-blue)', textDecoration: 'underline', fontSize: '0.875rem' }}>→ CSV Visualizer</a>
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
}
