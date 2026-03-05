'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ParsedData } from '@/lib/excelParser';
import { PdfParseResult } from '@/lib/pdfParser';
import { generateInsights, getChartRecommendation } from '@/lib/dataInsightEngine';
import AIInsightsPanel from './AIInsightsPanel';
import KpiCards from './KpiCards';
import DashboardFilters, { FilterState } from './DashboardFilters';
import DashboardCharts from './DashboardCharts';
import DashboardTable from './DashboardTable';
import { RefreshCw, Download, FileDown, FileImage, FileText } from 'lucide-react';
import * as xlsx from 'xlsx';

interface DashboardGeneratorProps {
    parsedData: ParsedData;
    onReset: () => void;
}

const DEFAULT_FILTERS: FilterState = {
    categoryFilter: '',
    dateFrom: '',
    dateTo: '',
    numericMin: '',
    numericMax: '',
    selectedChartType: 'bar',
};

export default function DashboardGenerator({ parsedData, onReset }: DashboardGeneratorProps) {
    const recommendedChart = useMemo(() => getChartRecommendation(parsedData.columns), [parsedData]);
    const [filters, setFilters] = useState<FilterState>(() => ({
        ...DEFAULT_FILTERS,
        selectedChartType: getChartRecommendation(parsedData.columns),
    }));
    const [downloading, setDownloading] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'table'>('dashboard');

    const report = useMemo(() => generateInsights(parsedData), [parsedData]);

    // recommended chart is pre-computed above

    // Apply filters
    const filteredData = useMemo(() => {
        let d = parsedData.data;
        const catCol = parsedData.columns.find(c => c.isCategorical || c.type === 'string');
        const numCol = parsedData.columns.find(c => c.type === 'number');
        const dateCol = parsedData.columns.find(c => c.type === 'date');

        if (filters.categoryFilter && catCol) {
            d = d.filter(r => String(r[catCol.key] ?? '') === filters.categoryFilter);
        }
        if (filters.numericMin !== '' && numCol) {
            d = d.filter(r => Number(r[numCol.key]) >= Number(filters.numericMin));
        }
        if (filters.numericMax !== '' && numCol) {
            d = d.filter(r => Number(r[numCol.key]) <= Number(filters.numericMax));
        }
        if (filters.dateFrom && dateCol) {
            const from = new Date(filters.dateFrom);
            d = d.filter(r => new Date(r[dateCol.key]) >= from);
        }
        if (filters.dateTo && dateCol) {
            const to = new Date(filters.dateTo);
            d = d.filter(r => new Date(r[dateCol.key]) <= to);
        }
        return d;
    }, [parsedData, filters]);

    const handleDownloadPng = useCallback(async () => {
        setDownloading('png');
        try {
            const { default: html2canvas } = await import('html2canvas');
            const el = document.getElementById('dashboard-export-area');
            if (!el) return;
            const canvas = await html2canvas(el, { backgroundColor: '#020817', scale: 2 });
            const link = document.createElement('a');
            link.download = `${parsedData.fileName.replace(/\.[^.]+$/, '')}-dashboard.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (e) { console.error(e); }
        finally { setDownloading(null); }
    }, [parsedData.fileName]);

    const handleDownloadPdf = useCallback(async () => {
        setDownloading('pdf');
        try {
            const { default: html2canvas } = await import('html2canvas');
            const { jsPDF } = await import('jspdf');
            const el = document.getElementById('dashboard-export-area');
            if (!el) return;
            const canvas = await html2canvas(el, { backgroundColor: '#020817', scale: 1.5 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`${parsedData.fileName.replace(/\.[^.]+$/, '')}-dashboard.pdf`);
        } catch (e) { console.error(e); }
        finally { setDownloading(null); }
    }, [parsedData.fileName]);

    const handleDownloadExcel = useCallback((format: 'xlsx' | 'xls' | 'xlsm') => {
        setDownloading(format);
        try {
            const ws = xlsx.utils.json_to_sheet(parsedData.data);
            const wb = xlsx.utils.book_new();
            xlsx.utils.book_append_sheet(wb, ws, 'Data');
            const ext = format === 'xlsm' ? 'xlsm' : format;
            const bookType = format === 'xlsm' ? 'xlsm' : format === 'xls' ? 'xls' : 'xlsx';
            xlsx.writeFile(wb, `${parsedData.fileName.replace(/\.[^.]+$/, '')}.${ext}`, { bookType: bookType as any });
        } catch (e) { console.error(e); }
        finally { setDownloading(null); }
    }, [parsedData]);

    const btnStyle = (active?: boolean): React.CSSProperties => ({
        display: 'flex', alignItems: 'center', gap: 6, padding: '7px 13px',
        borderRadius: 8, fontSize: '0.78rem', fontWeight: 600,
        border: '1px solid var(--border-subtle)',
        background: active ? 'rgba(59,130,246,0.15)' : 'var(--bg-glass)',
        color: active ? '#60a5fa' : 'var(--text-secondary)',
        cursor: 'pointer',
    });

    const effectiveChartType = filters.selectedChartType || recommendedChart;

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Header */}
            <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center',
                justifyContent: 'space-between', marginBottom: 20,
                padding: '14px 18px', borderRadius: 16,
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            }}>
                <div>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                        📊 {parsedData.fileName}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', margin: '2px 0 0' }}>
                        {parsedData.rowCount.toLocaleString()} rows · {parsedData.columns.length} columns
                    </p>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <button onClick={handleDownloadPng} disabled={!!downloading} style={btnStyle()}>
                        <FileImage size={13} /> {downloading === 'png' ? '...' : 'PNG'}
                    </button>
                    <button onClick={handleDownloadPdf} disabled={!!downloading} style={btnStyle()}>
                        <FileDown size={13} /> {downloading === 'pdf' ? '...' : 'PDF'}
                    </button>
                    <button onClick={() => handleDownloadExcel('xlsx')} disabled={!!downloading} style={btnStyle()}>
                        <FileText size={13} /> {downloading === 'xlsx' ? '...' : 'XLSX'}
                    </button>
                    <button onClick={() => handleDownloadExcel('xls')} disabled={!!downloading} style={btnStyle()}>
                        <FileText size={13} /> {downloading === 'xls' ? '...' : 'XLS'}
                    </button>
                    <button onClick={() => handleDownloadExcel('xlsm')} disabled={!!downloading} style={btnStyle()}>
                        <FileText size={13} /> {downloading === 'xlsm' ? '...' : 'XLSM'}
                    </button>
                    <button onClick={onReset} style={btnStyle()}>
                        <RefreshCw size={13} /> New File
                    </button>
                </div>
            </div>

            {/* AI Insights */}
            <AIInsightsPanel insights={report.insights} summary={report.summary} />

            {/* KPI Cards */}
            <KpiCards parsedData={parsedData} report={report} />

            {/* Filters */}
            <DashboardFilters parsedData={parsedData} filters={filters} onFilterChange={setFilters} />

            {/* Tab bar */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                {[{ key: 'dashboard', label: '📊 Charts' }, { key: 'table', label: '📋 Data Table' }].map(t => (
                    <button key={t.key} onClick={() => setActiveTab(t.key as any)} style={{
                        padding: '7px 18px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600,
                        background: activeTab === t.key ? 'linear-gradient(135deg, #3b82f6, #6366f1)' : 'var(--bg-glass)',
                        color: activeTab === t.key ? '#fff' : 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)', cursor: 'pointer',
                    }}>
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div id="dashboard-export-area">
                {activeTab === 'dashboard' ? (
                    <DashboardCharts
                        parsedData={parsedData}
                        filteredData={filteredData}
                        chartType={effectiveChartType}
                    />
                ) : (
                    <DashboardTable parsedData={{ ...parsedData, data: filteredData }} maxRows={20} />
                )}
            </div>
        </motion.div>
    );
}
