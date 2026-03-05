'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import FileUploadZone from '@/components/FileUploadZone';
import type { ParsedData } from '@/lib/excelParser';
import type { PdfParseResult } from '@/lib/pdfParser';

const MultiChartRenderer = dynamic(() => import('@/components/charts/MultiChartRenderer'), {
    ssr: false,
    loading: () => <div style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Loading Advanced Chart Engine...</div>
});

export default function MultiChartGeneratorPage() {
    const [parsedData, setParsedData] = useState<ParsedData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleDataParsed = (data: ParsedData, _isPdf?: boolean, _pdfResult?: PdfParseResult) => {
        setParsedData(data);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />

            <main style={{ flexGrow: 1, padding: '40px 0 80px' }}>
                <div className="container">

                    {!parsedData && (
                        <header style={{ textAlign: 'center', marginBottom: 48, maxWidth: 800, margin: '0 auto 48px' }}>
                            <span style={{
                                display: 'inline-block', padding: '6px 16px', borderRadius: 99,
                                background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
                                fontSize: '0.75rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 20
                            }}>
                                Advanced Multi-Chart Engine
                            </span>
                            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 16 }}>
                                Multi-Chart Visualization Board
                            </h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7 }}>
                                Build complex data dashboards from a single upload. Compare variables across Scatter Plots, Radar Charts, Histograms, and more — up to 6 charts at once.
                            </p>
                        </header>
                    )}

                    {!parsedData ? (
                        <FileUploadZone
                            onDataParsed={handleDataParsed}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                        />
                    ) : (
                        <div style={{ width: '100%', animation: 'fadeIn 0.5s ease-out' }}>
                            <MultiChartRenderer parsedData={parsedData} />
                        </div>
                    )}

                </div>
            </main>

            <Footer />
        </div>
    );
}
