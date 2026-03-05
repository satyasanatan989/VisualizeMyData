'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ParsedData } from '@/lib/excelParser';
import { generateInsights } from '@/lib/dataInsightEngine';
import ReportPreview from './ReportPreview';
import { FileDown, FileImage, RefreshCw } from 'lucide-react';

interface ReportGeneratorProps {
    parsedData: ParsedData;
    onReset: () => void;
}

export default function ReportGenerator({ parsedData, onReset }: ReportGeneratorProps) {
    const [downloading, setDownloading] = useState<string | null>(null);
    const report = React.useMemo(() => generateInsights(parsedData), [parsedData]);

    const handleDownloadPdf = useCallback(async () => {
        setDownloading('pdf');
        try {
            const { default: html2canvas } = await import('html2canvas');
            const { jsPDF } = await import('jspdf');
            const el = document.getElementById('report-preview-area');
            if (!el) return;
            const canvas = await html2canvas(el, { backgroundColor: '#020817', scale: 1.5 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: 'a4' });
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgRatio = canvas.height / canvas.width;
            const imgWidth = pageWidth;
            const imgHeight = pageWidth * imgRatio;
            let y = 0;
            while (y < imgHeight) {
                pdf.addImage(imgData, 'PNG', 0, -y, imgWidth, imgHeight);
                y += pageHeight;
                if (y < imgHeight) pdf.addPage();
            }
            pdf.save(`${parsedData.fileName.replace(/\.[^.]+$/, '')}-report.pdf`);
        } catch (e) { console.error(e); }
        finally { setDownloading(null); }
    }, [parsedData.fileName]);

    const handleDownloadPng = useCallback(async () => {
        setDownloading('png');
        try {
            const { default: html2canvas } = await import('html2canvas');
            const el = document.getElementById('report-preview-area');
            if (!el) return;
            const canvas = await html2canvas(el, { backgroundColor: '#020817', scale: 2 });
            const link = document.createElement('a');
            link.download = `${parsedData.fileName.replace(/\.[^.]+$/, '')}-report.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (e) { console.error(e); }
        finally { setDownloading(null); }
    }, [parsedData.fileName]);

    const btnStyle: React.CSSProperties = {
        display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
        borderRadius: 8, fontSize: '0.8rem', fontWeight: 600,
        border: '1px solid var(--border-subtle)',
        background: 'var(--bg-glass)', color: 'var(--text-secondary)',
        cursor: 'pointer',
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Toolbar */}
            <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center',
                justifyContent: 'space-between', marginBottom: 20,
                padding: '14px 18px', borderRadius: 16,
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            }}>
                <div>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                        📄 Data Report — {parsedData.fileName}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', margin: '2px 0 0' }}>
                        {parsedData.rowCount.toLocaleString()} rows · {parsedData.columns.length} columns · Auto-generated
                    </p>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={handleDownloadPng} disabled={!!downloading} style={btnStyle}>
                        <FileImage size={13} /> {downloading === 'png' ? '...' : 'PNG'}
                    </button>
                    <button onClick={handleDownloadPdf} disabled={!!downloading} style={btnStyle}>
                        <FileDown size={13} /> {downloading === 'pdf' ? '...' : 'PDF'}
                    </button>
                    <button onClick={onReset} style={btnStyle}>
                        <RefreshCw size={13} /> New File
                    </button>
                </div>
            </div>

            <ReportPreview parsedData={parsedData} report={report} />
        </motion.div>
    );
}
