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
    {
        id: 'sales-performance',
        title: 'Sales Performance Dashboard',
        description: 'Quarterly revenue breakdown by product line to identify top performers and growth opportunities.',
        category: 'Sales',
        accentColor: '#10b981',
        accentBg: 'rgba(16,185,129,0.07)',
        chartType: 'bar',
        csvContent: `Product,Q1,Q2,Q3,Q4\nProduct A,18000,22000,19500,25000\nProduct B,12000,15000,17000,21000\nProduct C,8000,9500,11000,13500\nProduct D,5000,6200,7800,9000`,
        previewData: [
            { name: 'Product A', value: 84500 }, { name: 'Product B', value: 65000 },
            { name: 'Product C', value: 42000 }, { name: 'Product D', value: 28000 },
        ],
    },
    {
        id: 'marketing-analytics',
        title: 'Marketing Analytics Dashboard',
        description: 'Campaign performance across channels — compare impressions, clicks, and conversions for ROI analysis.',
        category: 'Marketing',
        accentColor: '#3b82f6',
        accentBg: 'rgba(59,130,246,0.07)',
        chartType: 'bar',
        csvContent: `Campaign,Impressions,Clicks,Conversions,Cost\nGoogle Search,45000,2100,180,3200\nFacebook Ads,120000,1800,95,2400\nEmail,8000,640,120,400\nLinkedIn,22000,480,55,1800\nOrganic SEO,65000,3200,210,0`,
        previewData: [
            { name: 'Google', value: 180 }, { name: 'Facebook', value: 95 },
            { name: 'Email', value: 120 }, { name: 'LinkedIn', value: 55 },
            { name: 'SEO', value: 210 },
        ],
    },
    {
        id: 'financial-performance',
        title: 'Financial Performance Dashboard',
        description: 'Monthly P&L overview with income, expenses, and net profit tracking across the fiscal year.',
        category: 'Finance',
        accentColor: '#f59e0b',
        accentBg: 'rgba(245,158,11,0.07)',
        chartType: 'bar',
        csvContent: `Month,Income,Expenses,Profit\nJan,42000,31000,11000\nFeb,45000,32000,13000\nMar,51000,34000,17000\nApr,48000,33500,14500\nMay,55000,35000,20000\nJun,62000,37000,25000`,
        previewData: [
            { name: 'Jan', value: 11000 }, { name: 'Feb', value: 13000 },
            { name: 'Mar', value: 17000 }, { name: 'Apr', value: 14500 },
            { name: 'May', value: 20000 }, { name: 'Jun', value: 25000 },
        ],
    },
    {
        id: 'business-kpi',
        title: 'Business KPI Dashboard',
        description: 'Track key business metrics — revenue, active users, churn rate, and NPS — across four quarters.',
        category: 'Business',
        accentColor: '#8b5cf6',
        accentBg: 'rgba(139,92,246,0.07)',
        chartType: 'area',
        csvContent: `Quarter,Revenue,ActiveUsers,ChurnRate,NPS\nQ1,120000,4800,3.2,42\nQ2,145000,5600,2.8,48\nQ3,162000,6200,2.5,52\nQ4,188000,7100,2.1,57`,
        previewData: [
            { name: 'Q1', value: 120000 }, { name: 'Q2', value: 145000 },
            { name: 'Q3', value: 162000 }, { name: 'Q4', value: 188000 },
        ],
    },
    {
        id: 'hr-analytics',
        title: 'HR Analytics Dashboard',
        description: 'Workforce insights by department — headcount, average salary, and attrition rate for HR reporting.',
        category: 'HR',
        accentColor: '#f43f5e',
        accentBg: 'rgba(244,63,94,0.07)',
        chartType: 'bar',
        csvContent: `Department,Headcount,AvgSalary,Attrition\nEngineering,45,92000,8\nSales,32,68000,14\nMarketing,18,72000,6\nOperations,27,58000,10\nHR,12,65000,4\nFinance,15,78000,3`,
        previewData: [
            { name: 'Engineering', value: 45 }, { name: 'Sales', value: 32 },
            { name: 'Marketing', value: 18 }, { name: 'Operations', value: 27 },
            { name: 'HR', value: 12 }, { name: 'Finance', value: 15 },
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
