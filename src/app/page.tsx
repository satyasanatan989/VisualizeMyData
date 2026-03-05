'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardView from './DashboardView';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
          <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 800, height: 800, background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
        </div>
        <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: 760, marginBottom: 60 }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 99, marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#6366f1', display: 'inline-block' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: '#a5b4fc', textTransform: 'uppercase' }}>Free · No Signup · 100% Browser-Based</span>
          </div>
          {/* Headline */}
          <h1 style={{ fontSize: 'clamp(2.25rem, 6vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 20, background: 'linear-gradient(135deg, #e2e8f0 30%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Visualize Your Data Instantly
          </h1>
          {/* Subtext */}
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', lineHeight: 1.75, maxWidth: 580, margin: '0 auto 36px' }}>
            Upload Excel, CSV, PDF, or Google Sheets and instantly generate charts, dashboards, and data insights directly in your browser.
          </p>
          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
            <button
              onClick={() => document.getElementById('upload-zone')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ padding: '13px 28px', borderRadius: 10, fontSize: '0.95rem', fontWeight: 700, background: 'linear-gradient(135deg, #3b82f6, #6366f1)', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(59,130,246,0.4)', transition: 'transform 0.15s, box-shadow 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 30px rgba(59,130,246,0.5)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(59,130,246,0.4)'; }}
            >⬆ Upload Data</button>
            <Link href="/dashboard-generator" style={{ padding: '13px 28px', borderRadius: 10, fontSize: '0.95rem', fontWeight: 700, background: 'rgba(139,92,246,0.15)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.3)', textDecoration: 'none', transition: 'all 0.15s', display: 'inline-block' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(139,92,246,0.25)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(139,92,246,0.15)'; }}
            >📊 Generate Dashboard</Link>
            <Link href="/templates" style={{ padding: '13px 28px', borderRadius: 10, fontSize: '0.95rem', fontWeight: 700, background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.25)', textDecoration: 'none', transition: 'all 0.15s', display: 'inline-block' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(16,185,129,0.22)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(16,185,129,0.12)'; }}
            >✨ Try Templates</Link>
          </div>
          {/* Trust indicators */}
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['✓ 100% Browser Processing', '✓ No Login Required', '✓ Your Data Never Leaves Your Device'].map(t => (
              <span key={t} style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>{t}</span>
            ))}
          </div>
        </div>
        {/* Upload Tool */}
        <div className="container" style={{ position: 'relative' }}>
          <DashboardView />
        </div>
      </section>

      {/* AdSense Banner Placeholder */}
      <div className="container" style={{ marginBottom: 60 }}>
        <div className="adsense-banner">📢 Advertisement · Google AdSense</div>
      </div>

      {/* How It Works */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge badge-blue" style={{ marginBottom: 14 }}>How It Works</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)' }}>
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
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-blue)', letterSpacing: '0.1em', marginBottom: 10, textTransform: 'uppercase' }}>
                  Step {step.step}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge badge-blue" style={{ marginBottom: 14 }}>Features</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)' }}>
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
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{f.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8375rem', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES SECTION ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge badge-blue" style={{ marginBottom: 14 }}>Use Cases</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)' }}>
              Who Is This Tool For?
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '12px auto 0', lineHeight: 1.7 }}>
              Whether you&apos;re a student, researcher, or analyst — visualizing data has never been this easy.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {USE_CASES.map((uc, i) => (
              <div key={uc.title} className="card" style={{ padding: '28px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: i % 2 === 0 ? 'rgba(59,130,246,0.06)' : 'rgba(139,92,246,0.06)' }} />
                <div style={{ fontSize: '2.5rem', marginBottom: 14 }}>{uc.icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>{uc.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Formats */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge badge-blue" style={{ marginBottom: 14 }}>Supported Formats</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)' }}>
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
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{f.name}</h3>
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

      {/* FAQ */}
      <section className="section">
        <div className="container" style={{ maxWidth: 780 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="badge badge-blue" style={{ marginBottom: 14 }}>FAQ</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)' }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQS.map(faq => <FAQItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 16 }}>
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
    </div>
  );
}
