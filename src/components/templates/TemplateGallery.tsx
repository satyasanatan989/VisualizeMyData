'use client';

import React, { useState, lazy, Suspense } from 'react';
import TemplateCard, { TemplateDataset } from './TemplateCard';
import { csvStringToParsedData } from './TemplateLoader';
import { ParsedData } from '@/lib/excelParser';

const DashboardGenerator = lazy(() => import('@/components/dashboard/DashboardGenerator'));

// ─── Template Definitions ─────────────────────────────────────────────────
const TEMPLATES: TemplateDataset[] = [
    {
        id: 'sales-dashboard',
        title: 'Monthly Sales Dashboard',
        description: 'Track monthly revenue trends and identify your best-performing periods.',
        category: 'Sales',
        accentColor: '#10b981',
        accentBg: 'rgba(16,185,129,0.07)',
        chartType: 'bar',
        csvContent: `Month,Sales\nJan,1200\nFeb,1500\nMar,1800\nApr,2100\nMay,1900\nJun,2400`,
        previewData: [
            { name: 'Jan', value: 1200 }, { name: 'Feb', value: 1500 },
            { name: 'Mar', value: 1800 }, { name: 'Apr', value: 2100 },
            { name: 'May', value: 1900 }, { name: 'Jun', value: 2400 },
        ],
    },
    {
        id: 'marketing-performance',
        title: 'Marketing Performance',
        description: 'Compare lead generation across channels — SEO, Ads, Email, and Social.',
        category: 'Marketing',
        accentColor: '#3b82f6',
        accentBg: 'rgba(59,130,246,0.07)',
        chartType: 'bar',
        csvContent: `Channel,Leads\nSEO,120\nAds,80\nEmail,50\nSocial,70\nReferral,40`,
        previewData: [
            { name: 'SEO', value: 120 }, { name: 'Ads', value: 80 },
            { name: 'Email', value: 50 }, { name: 'Social', value: 70 },
            { name: 'Referral', value: 40 },
        ],
    },
    {
        id: 'survey-analysis',
        title: 'Survey Response Analysis',
        description: 'Visualize survey results and see how responses are distributed.',
        category: 'Research',
        accentColor: '#8b5cf6',
        accentBg: 'rgba(139,92,246,0.07)',
        chartType: 'pie',
        csvContent: `Response,Count\nStrongly Agree,80\nAgree,140\nNeutral,45\nDisagree,30\nStrongly Disagree,15`,
        previewData: [
            { name: 'Strongly Agree', value: 80 }, { name: 'Agree', value: 140 },
            { name: 'Neutral', value: 45 }, { name: 'Disagree', value: 30 },
            { name: 'Strongly Disagree', value: 15 },
        ],
    },
    {
        id: 'expense-tracker',
        title: 'Monthly Expense Tracker',
        description: 'Break down monthly spending by category to identify where your money goes.',
        category: 'Finance',
        accentColor: '#f59e0b',
        accentBg: 'rgba(245,158,11,0.07)',
        chartType: 'bar',
        csvContent: `Category,Amount\nFood,400\nTransport,150\nUtilities,200\nEntertainment,120\nHealth,90\nOther,80`,
        previewData: [
            { name: 'Food', value: 400 }, { name: 'Transport', value: 150 },
            { name: 'Utilities', value: 200 }, { name: 'Entertainment', value: 120 },
            { name: 'Health', value: 90 },
        ],
    },
    {
        id: 'student-grades',
        title: 'Student Grade Analysis',
        description: 'Visualize academic performance across subjects for quick insights.',
        category: 'Education',
        accentColor: '#f43f5e',
        accentBg: 'rgba(244,63,94,0.07)',
        chartType: 'bar',
        csvContent: `Subject,Score\nMath,85\nPhysics,78\nChemistry,90\nBiology,72\nEnglish,88\nHistory,76`,
        previewData: [
            { name: 'Math', value: 85 }, { name: 'Physics', value: 78 },
            { name: 'Chemistry', value: 90 }, { name: 'Biology', value: 72 },
            { name: 'English', value: 88 },
        ],
    },
    {
        id: 'website-traffic',
        title: 'Website Traffic Trends',
        description: 'Analyze weekly visitor data to spot traffic spikes and growth patterns.',
        category: 'Analytics',
        accentColor: '#06b6d4',
        accentBg: 'rgba(6,182,212,0.07)',
        chartType: 'area',
        csvContent: `Week,Visitors\nWeek 1,3200\nWeek 2,4100\nWeek 3,3800\nWeek 4,5200\nWeek 5,4900\nWeek 6,6100`,
        previewData: [
            { name: 'W1', value: 3200 }, { name: 'W2', value: 4100 },
            { name: 'W3', value: 3800 }, { name: 'W4', value: 5200 },
            { name: 'W5', value: 4900 }, { name: 'W6', value: 6100 },
        ],
    },
];

export default function TemplateGallery() {
    const [activeTemplate, setActiveTemplate] = useState<ParsedData | null>(null);
    const [activeTitle, setActiveTitle] = useState('');

    const handleUseTemplate = (template: TemplateDataset) => {
        const parsed = csvStringToParsedData(template.csvContent, `${template.title}.csv`);
        setActiveTitle(template.title);
        setActiveTemplate(parsed);
        // Scroll to dashboard viewer
        setTimeout(() => document.getElementById('template-output')?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    return (
        <div>
            {/* Gallery grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
                {TEMPLATES.map(t => (
                    <TemplateCard key={t.id} template={t} onUseTemplate={handleUseTemplate} />
                ))}
            </div>

            {/* Active template dashboard — lazy loaded */}
            {activeTemplate && (
                <div id="template-output" style={{ marginTop: 48 }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px',
                        borderRadius: 14, background: 'rgba(16,185,129,0.06)',
                        border: '1px solid rgba(16,185,129,0.2)', marginBottom: 24,
                    }}>
                        <span style={{ fontSize: '1.25rem' }}>✦</span>
                        <div>
                            <p style={{ color: '#34d399', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', margin: 0 }}>Template Loaded</p>
                            <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.95rem', margin: '2px 0 0' }}>{activeTitle}</p>
                        </div>
                        <button
                            onClick={() => setActiveTemplate(null)}
                            style={{ marginLeft: 'auto', padding: '6px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
                        >
                            ✕ Close
                        </button>
                    </div>
                    <Suspense fallback={
                        <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>Loading dashboard…</div>
                    }>
                        <DashboardGenerator parsedData={activeTemplate} onReset={() => setActiveTemplate(null)} />
                    </Suspense>
                </div>
            )}
        </div>
    );
}
