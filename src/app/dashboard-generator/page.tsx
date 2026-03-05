'use client';

import React, { useState } from 'react';
import Footer from '@/components/Footer';
import NavbarWrapper from '@/components/NavbarWrapper';
import FileUploadZone from '@/components/FileUploadZone';
import DashboardGenerator from '@/components/dashboard/DashboardGenerator';
import { ParsedData } from '@/lib/excelParser';
import type { PdfParseResult } from '@/lib/pdfParser';

export default function DashboardGeneratorPage() {
    const [parsedData, setParsedData] = useState<ParsedData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleDataParsed = (data: ParsedData, _isPdf?: boolean, _pdfResult?: PdfParseResult) => {
        setParsedData(data);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />

            {/* Hero */}
            {!parsedData && (
                <section style={{ padding: '60px 0 40px', textAlign: 'center' }}>
                    <div className="container">
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            padding: '4px 14px', background: 'rgba(99,102,241,0.12)',
                            borderRadius: 99, border: '1px solid rgba(99,102,241,0.25)', marginBottom: 20,
                        }}>
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', color: '#a5b4fc', textTransform: 'uppercase' }}>
                                Free Dashboard Generator
                            </span>
                        </div>
                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 16,
                            background: 'linear-gradient(135deg, #e2e8f0, #a78bfa)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        }}>
                            Auto-Generate Dashboards<br />from Your Data
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 540, margin: '0 auto 40px' }}>
                            Upload Excel, CSV, PDF or Google Sheets and instantly get KPI cards, interactive charts, AI insights and exportable dashboards. 100% free, no signup.
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
                    <DashboardGenerator
                        parsedData={parsedData}
                        onReset={() => setParsedData(null)}
                    />
                )}
            </main>

            {/* SEO content */}
            {!parsedData && (
                <section style={{ padding: '40px 0 60px', borderTop: '1px solid var(--border-subtle)' }}>
                    <div className="container" style={{ maxWidth: 760 }}>
                        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 700, marginBottom: 16 }}>
                            How It Works
                        </h2>
                        <ol style={{ color: 'var(--text-secondary)', paddingLeft: 20, lineHeight: 2 }}>
                            <li>Upload your Excel (.xlsx), CSV, PDF, or paste a Google Sheets link</li>
                            <li>Our engine analyses all columns and detects numeric, categorical, and date fields</li>
                            <li>A complete dashboard generates automatically — KPI cards, charts, and AI insights</li>
                            <li>Filter, explore, then export as PNG, PDF, or download data as Excel</li>
                        </ol>
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
                            <a href="/excel-visualizer" style={{ color: 'var(--accent-blue)', textDecoration: 'underline', fontSize: '0.875rem' }}>→ Excel Visualizer</a>
                            <a href="/data-report-generator" style={{ color: 'var(--accent-blue)', textDecoration: 'underline', fontSize: '0.875rem' }}>→ Data Report Generator</a>
                            <a href="/csv-visualizer" style={{ color: 'var(--accent-blue)', textDecoration: 'underline', fontSize: '0.875rem' }}>→ CSV Visualizer</a>
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
}
