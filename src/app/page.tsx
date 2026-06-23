'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardView from './DashboardView';
import StickyUploadButton from '@/components/StickyUploadButton';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import QuickToolsSection from '@/components/tools/QuickToolsSection';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { GALLERY_DASHBOARDS } from '@/lib/galleryRegistry';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

// ── Sample data for live preview charts ──
const PREVIEW_BAR = [
  { month: 'Jan', value: 4200 }, { month: 'Feb', value: 5800 },
  { month: 'Mar', value: 5100 }, { month: 'Apr', value: 7200 },
  { month: 'May', value: 6800 }, { month: 'Jun', value: 9100 },
];
const PREVIEW_LINE = [
  { month: 'Jan', users: 1200 }, { month: 'Feb', users: 1900 },
  { month: 'Mar', users: 1700 }, { month: 'Apr', users: 2800 },
  { month: 'May', users: 3200 }, { month: 'Jun', users: 4100 },
];
const PREVIEW_PIE = [
  { name: 'Excel', value: 38 }, { name: 'CSV', value: 31 },
  { name: 'PDF', value: 19 }, { name: 'Sheets', value: 12 },
];
const PIE_COLORS = ['#ba9eff', '#8455ef', '#9093ff', '#40ceed'];

const DASH_AREA = [
  { t: 'Q1', rev: 12000, cost: 7200 }, { t: 'Q2', rev: 18500, cost: 9800 },
  { t: 'Q3', rev: 15200, cost: 8600 }, { t: 'Q4', rev: 24000, cost: 11200 },
];
const DASH_PIE = [
  { name: 'Product A', value: 42 }, { name: 'Product B', value: 28 },
  { name: 'Product C', value: 18 }, { name: 'Other', value: 12 },
];

const DEMO_ROWS = [
  { Product: 'Widget Pro', Category: 'Electronics', Sales: 12450, Region: 'North America' },
  { Product: 'DataPen X', Category: 'Software', Sales: 8900, Region: 'Europe' },
  { Product: 'CloudSync', Category: 'SaaS', Sales: 21300, Region: 'Asia' },
  { Product: 'Analytics+', Category: 'Software', Sales: 15600, Region: 'North America' },
  { Product: 'PrintHub', Category: 'Hardware', Sales: 6780, Region: 'Europe' },
];

const tooltipCfg = {
  contentStyle: { background: '#0f172a', border: '1px solid #334155', borderRadius: 8, fontSize: 11, color: '#fff' },
};

const USE_CASES = [
  { icon: '🎓', title: 'Students', desc: 'Analyze project data, build charts for presentations, and visualize study results — no Excel skills required.' },
  { icon: '🔬', title: 'Researchers', desc: 'Visualize survey responses, experiment results, and datasets from CSV or Excel exports instantly.' },
  { icon: '📈', title: 'Business Analysts', desc: 'Create KPI dashboards, sales charts, and exportable reports from any spreadsheet in seconds.' },
  { icon: '👤', title: 'Everyone Else', desc: 'Turn any table of numbers into a clear, downloadable chart — no data expertise needed.' },
];

const FEATURES = [
  { icon: '📊', title: 'Smart Chart Generation', desc: 'AI-powered column detection automatically picks the best chart type for your data.' },
  { icon: '📄', title: 'PDF Table Extraction', desc: 'Upload PDFs and we\'ll extract tables automatically. No manual copy-paste needed.' },
  { icon: '🔗', title: 'Google Sheets Integration', desc: 'Paste a public Sheets link and visualize live spreadsheet data in seconds.' },
  { icon: '⬇️', title: 'Export Charts', desc: 'Download your charts as PNG or PDF with one click. Perfect for reports and presentations.' },
  { icon: '🎨', title: 'Color Customization', desc: 'Choose from multiple color palettes to match your brand or presentation theme.' },
  { icon: '🔒', title: 'Privacy First', desc: 'All processing happens in your browser. Files are never sent to our servers.' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Upload Your File', desc: 'Drag & drop an Excel, CSV, PDF file — or paste a Google Sheets link.', icon: '📁' },
  { step: '02', title: 'Auto-Detect Data', desc: 'We instantly analyze columns, data types, and suggest the best chart types.', icon: '🔍' },
  { step: '03', title: 'Visualize & Export', desc: 'Explore interactive charts and download them as PNG or PDF.', icon: '📈' },
];

const FORMATS = [
  { icon: '📗', name: 'Excel', ext: '.xlsx / .xls', color: '#10b981', desc: 'Upload any Microsoft Excel file and instantly convert rows to charts.', href: '/excel-visualizer' },
  { icon: '📋', name: 'CSV', ext: '.csv', color: '#3b82f6', desc: 'Comma-separated values — the universal data format. Fully supported.', href: '/csv-visualizer' },
  { icon: '📕', name: 'PDF', ext: '.pdf', color: '#f43f5e', desc: 'Extract tables from PDF reports and visualize them instantly.', href: '/pdf-visualizer' },
  { icon: '📊', name: 'Google Sheets', ext: 'Link', color: '#8b5cf6', desc: 'Paste a public Google Sheets URL — no download required.', href: '/google-sheets-visualizer' },
];

const FAQS = [
  { q: 'Is DataVisualizer really free?', a: 'Yes, 100% free! No signup, no credit card, no limits. Just upload and visualize.' },
  { q: 'Can I use it on mobile?', a: 'Absolutely. The interface is fully responsive and works on phones, tablets, and desktops.' },
  { q: 'Is my data safe?', a: 'All file processing happens directly in your browser. Your files are never uploaded to our servers, ensuring complete privacy.' },
  { q: 'What file size is supported?', a: 'We support Excel/CSV files up to 50MB and PDFs up to 25MB for table extraction.' },
  { q: 'Can I download the charts?', a: 'Yes! You can download any chart as a high-resolution PNG or as a PDF document.' },
  { q: 'What if my PDF has no tables?', a: 'If no table data is detected, we switch to a full PDF preview mode so you can still view the document.' },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(o => !o)} style={{
      padding: '20px 24px', borderRadius: 14, border: '1px solid var(--border-subtle)',
      background: open ? 'rgba(59,130,246,0.04)' : 'var(--bg-glass)',
      cursor: 'pointer', transition: 'all 0.2s',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{q}</h3>
        {open ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
      </div>
      {open && (
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: 12, marginBottom: 0, lineHeight: 1.7 }}>{a}</p>
      )}
    </div>
  );
}

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? '' : 'light'} style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar darkMode={darkMode} onToggleDark={() => setDarkMode(d => !d)} />

      {/* ── HERO SECTION ── */}
      <section style={{ padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient blobs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div className="ambient-blob" style={{ position: 'absolute', top: '-10%', left: '-5%', width: 800, height: 800, background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div className="ambient-blob-delayed" style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
        </div>
        <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: 760, marginBottom: 60 }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', background: 'rgba(186,158,255,0.08)', border: '1px solid rgba(186,158,255,0.25)', borderRadius: 99, marginBottom: 24, backdropFilter: 'blur(8px)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ba9eff', display: 'inline-block', boxShadow: '0 0 10px #ba9eff' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: '#cdcdff', textTransform: 'uppercase' }}>Free · No Signup · 100% Browser-Based</span>
          </div>
          {/* Headline */}
          <h1 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 20, background: 'linear-gradient(135deg, #f8f9fe 30%, #ba9eff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Visualize Your Data Instantly
          </h1>
          {/* Subtext */}
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', lineHeight: 1.75, maxWidth: 580, margin: '0 auto 36px' }}>
            Upload Excel, CSV, PDF, or Google Sheets and instantly generate charts, dashboards, and data insights directly in your browser.
          </p>
          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 44 }}>
            <button
              onClick={() => document.getElementById('upload-zone')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >⚡ Upload File &amp; Create Charts</button>
            <Link href="/dashboard-generator" className="btn-secondary"
            >📊 Create Instant Dashboard</Link>
            <Link href="/templates" className="btn-secondary" style={{ borderColor: 'rgba(64,206,237,0.3)', color: '#53ddfc' }}
            >✨ Try Templates</Link>
          </div>
          {/* Trust indicators */}
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['✓ 100% Browser Processing', '✓ No Login Required', '✓ Your Data Never Leaves Your Device'].map(t => (
              <span key={t} style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── Live Preview Chart Strip ── */}
        <div className="container" style={{ position: 'relative', marginBottom: 40 }}>
          <div className="gradient-border">
            <div className="glass-card" style={{ padding: '20px 24px' }}>
              {/* Header bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="live-dot" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>LIVE DEMO — SAMPLE ANALYTICS</span>
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)', padding: '3px 10px', borderRadius: 20, border: '1px solid var(--border-subtle)' }}>Sample Data</span>
              </div>
              {/* 3 mini charts */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                {/* Bar */}
                <div style={{ background: 'rgba(186,158,255,0.05)', borderRadius: 14, padding: '14px 16px', border: '1px solid rgba(186,158,255,0.15)' }}>
                  <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '0.72rem', fontWeight: 700, color: '#ba9eff', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Monthly Revenue</p>
                  <ResponsiveContainer width="100%" height={120}>
                    <BarChart data={PREVIEW_BAR} barCategoryGap="30%">
                      <XAxis dataKey="month" tick={{ fill: '#73757a', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip {...tooltipCfg} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="url(#barGrad)" />
                      <defs>
                        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ba9eff" />
                          <stop offset="100%" stopColor="#8455ef" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                {/* Line */}
                <div style={{ background: 'rgba(64,206,237,0.05)', borderRadius: 14, padding: '14px 16px', border: '1px solid rgba(64,206,237,0.15)' }}>
                  <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '0.72rem', fontWeight: 700, color: '#40ceed', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>User Growth</p>
                  <ResponsiveContainer width="100%" height={120}>
                    <LineChart data={PREVIEW_LINE}>
                      <XAxis dataKey="month" tick={{ fill: '#73757a', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip {...tooltipCfg} />
                      <Line type="monotone" dataKey="users" stroke="#40ceed" strokeWidth={2.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                {/* Pie */}
                <div style={{ background: 'rgba(144,147,255,0.05)', borderRadius: 14, padding: '14px 16px', border: '1px solid rgba(144,147,255,0.15)' }}>
                  <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '0.72rem', fontWeight: 700, color: '#9093ff', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Upload Sources</p>
                  <ResponsiveContainer width="100%" height={120}>
                    <PieChart>
                      <Pie data={PREVIEW_PIE} cx="50%" cy="50%" innerRadius={28} outerRadius={50} dataKey="value" paddingAngle={3} stroke="none">
                        {PREVIEW_PIE.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                      </Pie>
                      <Tooltip {...tooltipCfg} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Tool */}
        <div className="container" style={{ position: 'relative' }}>
          <DashboardView />
        </div>
      </section>

      {/* ⚡ Quick Tools Section */}
      <QuickToolsSection />

      {/* Social Proof Counter Strip */}
      <section style={{
        padding: '28px 0',
        background: 'var(--surface-mid)',
      }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px 48px', textAlign: 'center' }}>
          {[
            { value: '2M+', label: 'Charts Generated', color: '#ba9eff' },
            { value: '150+', label: 'Countries Using The Tool', color: '#8455ef' },
            { value: '50K+', label: 'Daily Data Uploads', color: '#9093ff' },
            { value: '100%', label: 'Free — No Signup', color: '#40ceed' },
          ].map(stat => (
            <div key={stat.label}>
              <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.9rem', fontWeight: 900, color: stat.color, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{stat.value}</p>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AdSense Banner Placeholder */}
      <div className="container" style={{ marginBottom: 60 }}>
        <div className="adsense-banner">📢 Advertisement · Google AdSense</div>
      </div>

      {/* How It Works */}
      <ScrollReveal>
        <section className="section" style={{ background: 'var(--surface-low)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="badge" style={{ marginBottom: 14, background: 'rgba(186,158,255,0.08)', color: '#ba9eff', border: '1px solid rgba(186,158,255,0.2)' }}>How It Works</span>
              <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                From File to Chart in 3 Steps
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '12px auto 0', lineHeight: 1.7 }}>
                No learning curve. Upload your data and get instant, beautiful visualizations.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
              {HOW_IT_WORKS.map((step, i) => (
                <div key={step.step} className="card" style={{ padding: 32, textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>{step.icon}</div>
                  <div style={{ fontFamily: 'var(--font-manrope)', fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.1em', marginBottom: 10, textTransform: 'uppercase' }}>
                    Step {step.step}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge" style={{ marginBottom: 14, background: 'rgba(186,158,255,0.08)', color: '#ba9eff', border: '1px solid rgba(186,158,255,0.2)' }}>Features</span>
            <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Everything You Need
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '12px auto 0', lineHeight: 1.7 }}>
              Professional-grade data visualization, completely free and browser-based.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {FEATURES.map(f => (
              <div key={f.title} className="card" style={{ padding: '24px 28px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.75rem', flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-manrope)', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{f.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8375rem', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chart Types Showcase */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="badge" style={{ marginBottom: 14, background: 'rgba(186,158,255,0.08)', color: '#ba9eff', border: '1px solid rgba(186,158,255,0.2)' }}>Chart Types</span>
            <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Every Chart Type You Need
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '12px auto 0', lineHeight: 1.7 }}>
              Auto-detected from your data — or choose manually. One upload, multiple chart options.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              { emoji: '📊', name: 'Bar Chart', desc: 'Compare categories side-by-side', color: '#ba9eff', bg: 'rgba(186,158,255,0.08)' },
              { emoji: '📈', name: 'Line Chart', desc: 'Track trends over time', color: '#9093ff', bg: 'rgba(144,147,255,0.08)' },
              { emoji: '🥧', name: 'Pie Chart', desc: 'Show proportional breakdowns', color: '#8455ef', bg: 'rgba(132,85,239,0.08)' },
              { emoji: '🔵', name: 'Scatter Plot', desc: 'Visualize correlations', color: '#ba9eff', bg: 'rgba(186,158,255,0.08)' },
              { emoji: '📉', name: 'Area Chart', desc: 'Highlight cumulative data', color: '#40ceed', bg: 'rgba(64,206,237,0.08)' },
              { emoji: '◼️', name: 'Histogram', desc: 'Frequency distribution view', color: '#9093ff', bg: 'rgba(144,147,255,0.08)' },
              { emoji: '📌', name: 'Dashboard', desc: 'KPI + multi-chart layouts', color: '#8455ef', bg: 'rgba(132,85,239,0.08)' },
            ].map(c => (
              <div key={c.name} style={{
                padding: '22px 18px',
                borderRadius: 16,
                background: c.bg,
                border: `1px solid ${c.color}28`,
                textAlign: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'default',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px ${c.color}22`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: 10 }}>{c.emoji}</span>
                <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '0.9rem', fontWeight: 700, color: c.color, margin: '0 0 5px' }}>{c.name}</p>
                <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES SECTION ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge" style={{ marginBottom: 14, background: 'rgba(186,158,255,0.08)', color: '#ba9eff', border: '1px solid rgba(186,158,255,0.2)' }}>Use Cases</span>
            <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Who Is This Tool For?
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '12px auto 0', lineHeight: 1.7 }}>
              Whether you&apos;re a student, researcher, or analyst — visualizing data has never been this easy.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {USE_CASES.map((uc, i) => (
              <div key={uc.title} className="card" style={{ padding: '28px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: i % 2 === 0 ? 'rgba(186,158,255,0.06)' : 'rgba(132,85,239,0.06)' }} />
                <div style={{ fontSize: '2.5rem', marginBottom: 14 }}>{uc.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>{uc.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Formats */}
      <section className="section" style={{ background: 'var(--surface-low)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge" style={{ marginBottom: 14, background: 'rgba(186,158,255,0.08)', color: '#ba9eff', border: '1px solid rgba(186,158,255,0.2)' }}>Supported Formats</span>
            <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Works With All Your Data Sources
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {FORMATS.map(f => (
              <Link key={f.name} href={f.href} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: 28, cursor: 'pointer', transition: 'all 0.25s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <span style={{ fontSize: '2rem' }}>{f.icon}</span>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{f.name}</h3>
                      <span style={{ fontSize: '0.7rem', color: f.color, fontWeight: 600, background: `${f.color}18`, padding: '2px 8px', borderRadius: 4 }}>{f.ext}</span>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8375rem', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
                  <span style={{ color: f.color, fontSize: '0.8rem', fontWeight: 600, marginTop: 14, display: 'block' }}>Try {f.name} Visualizer →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR TOOLS ── */}
      <section className="section" style={{ background: 'var(--surface-mid)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="badge" style={{ marginBottom: 14, background: 'rgba(186,158,255,0.08)', color: '#ba9eff', border: '1px solid rgba(186,158,255,0.2)' }}>Popular Tools</span>
            <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Popular Data Visualization Tools
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '12px auto 0', lineHeight: 1.7 }}>
              Browse our most-used tools for every file format and use case.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { icon: '📗', label: 'Excel Chart Generator', href: '/excel-chart-generator', color: '#9093ff', desc: 'Convert Excel spreadsheets to bar, line & pie charts' },
              { icon: '📋', label: 'CSV Chart Generator', href: '/csv-chart-generator', color: '#ba9eff', desc: 'Generate charts from any CSV file instantly' },
              { icon: '📕', label: 'PDF Data Visualizer', href: '/pdf-data-visualizer', color: '#8455ef', desc: 'Extract PDF table data and visualize as charts' },
              { icon: '🔗', label: 'Google Sheets Charts', href: '/google-sheets-chart-generator', color: '#40ceed', desc: 'Paste a Sheets link and generate instant charts' },
              { icon: '🌐', label: 'Online Chart Maker', href: '/online-chart-maker', color: '#9093ff', desc: 'Free chart maker for any data format' },
              { icon: '📊', label: 'Dashboard Generator', href: '/dashboard-generator', color: '#ba9eff', desc: 'Auto-generate full KPI dashboards from your data' },
              { icon: '📈', label: 'Excel Graph Maker', href: '/excel-graph-maker', color: '#8455ef', desc: 'Create professional graphs from Excel files' },
              { icon: '📉', label: 'CSV Data Visualizer', href: '/csv-data-visualizer', color: '#40ceed', desc: 'Visualize CSV data as interactive charts' },
              { icon: '🆓', label: 'Free Viz Tool', href: '/free-data-visualization-tool', color: '#9093ff', desc: 'The best free data visualization tool online' },
              { icon: '📑', label: 'Spreadsheet to Chart', href: '/spreadsheet-to-chart', color: '#ba9eff', desc: 'Convert any spreadsheet to a chart online' },
              { icon: '🗂️', label: 'PDF Chart Generator', href: '/pdf-chart-generator', color: '#8455ef', desc: 'Convert PDF table data to bar & line charts' },
              { icon: '✨', label: 'Dashboard Templates', href: '/templates', color: '#40ceed', desc: 'Ready-made dashboard templates for any use case' },
            ].map(tool => (
              <Link key={tool.href} href={tool.href} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: '20px 22px', height: '100%', transition: 'border-color 0.2s, transform 0.2s', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: '1.4rem' }}>{tool.icon}</span>
                    <span style={{ fontFamily: 'var(--font-manrope)', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{tool.label}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', lineHeight: 1.6, margin: 0 }}>{tool.desc}</p>
                  <span style={{ display: 'block', marginTop: 10, fontSize: '0.78rem', fontWeight: 600, color: tool.color }}>Try Free →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED DASHBOARDS ── */}
      <section className="section" style={{ background: 'var(--surface-base)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="badge" style={{ marginBottom: 14, background: 'rgba(186,158,255,0.08)', color: '#ba9eff', border: '1px solid rgba(186,158,255,0.2)' }}>Dashboard Gallery</span>
            <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Featured Dashboards
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '12px auto 0', lineHeight: 1.7 }}>
              Explore interactive dashboards generated by VisualizeMyData.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {GALLERY_DASHBOARDS.slice(0, 4).map(dash => (
              <Link key={dash.slug} href={`/gallery/${dash.slug}`} style={{ textDecoration: 'none' }}>
                <div className="glass-card glass-card-hover" style={{ padding: 16, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    width: '100%', height: 140, borderRadius: 10, marginBottom: 16,
                    background: 'linear-gradient(135deg, rgba(186,158,255,0.1), rgba(132,85,239,0.1))',
                    border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem'
                  }}>
                    📊
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.3 }}>
                    {dash.title}
                  </h3>
                  <div style={{ display: 'flex', gap: 6, marginTop: 'auto' }}>
                    {dash.tags.slice(0, 2).map(tag => (
                      <span key={tag} style={{ fontFamily: 'var(--font-manrope)', fontSize: '0.65rem', fontWeight: 600, color: '#cdcdff', background: 'rgba(186,158,255,0.08)', border: '1px solid rgba(186,158,255,0.15)', padding: '2px 8px', borderRadius: 4, letterSpacing: '0.04em' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link href="/gallery" className="btn-secondary">
              View All Dashboards →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container" style={{ maxWidth: 780 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="badge" style={{ marginBottom: 14, background: 'rgba(186,158,255,0.08)', color: '#ba9eff', border: '1px solid rgba(186,158,255,0.2)' }}>FAQ</span>
            <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQS.map(faq => <FAQItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', background: 'var(--surface-low)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '-0.02em' }}>
            Start Visualizing Your Data — Free
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
            No signup needed. Drag & drop your file and get beautiful charts in seconds.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn-primary"
            style={{ fontSize: '1rem', padding: '14px 36px' }}
          >
            Upload Your File
          </button>
        </div>
      </section>

      <Footer />
      <StickyUploadButton />
    </div>
  );
}
