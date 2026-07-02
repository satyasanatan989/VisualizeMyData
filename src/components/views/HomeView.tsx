'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardView from '@/app/DashboardView';
import StickyUploadButton from '@/components/StickyUploadButton';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { toast } from 'sonner';
import { AdBannerTop, AdBannerMiddle, AdBannerBottom } from '@/components/AdBanners';
import { trackSearchQuery, trackThemeToggle, trackGAEvent, trackFavoriteToggle, trackToolUsage } from '@/lib/analytics';
import { QUICK_TOOLS } from '@/lib/toolsRegistry';
import { 
  Search, Image as ImageIcon, FileText, Layout, Code, Calculator, Hash, 
  Sparkles, ShieldCheck, Cpu, Zap, Settings, Lock, Server, Check, ArrowRight,
  Eye, RefreshCw, Files, Scissors, Key, Binary, Globe, Activity, Percent, Calendar
} from 'lucide-react';
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

const DATA_TOOLS_LIST = [
  { slug: 'excel-visualizer', name: 'Excel Data Visualizer', description: 'Upload Excel files (.xlsx/.xls) to instantly build interactive dashboards and charts.', category: 'Data Tools', icon: 'FileText', badge: 'POPULAR' as const, href: '/excel-visualizer' },
  { slug: 'csv-visualizer', name: 'CSV Data Visualizer', description: 'Convert CSV files to charts, clean data, and export dashboards offline.', category: 'Data Tools', icon: 'FileText', badge: 'POPULAR' as const, href: '/csv-visualizer' },
  { slug: 'pdf-visualizer', name: 'PDF Table Extractor & Visualizer', description: 'Extract tabular data from PDF files and convert them to interactive graphs.', category: 'Data Tools', icon: 'FileText', badge: 'POPULAR' as const, href: '/pdf-visualizer' },
  { slug: 'google-sheets-visualizer', name: 'Google Sheets Live Visualizer', description: 'Paste a public Google Sheets link to sync and plot data dynamically.', category: 'Data Tools', icon: 'Globe', badge: 'FREE' as const, href: '/google-sheets-visualizer' },
  { slug: 'multi-chart-generator', name: 'Multi-Chart Dashboard Generator', description: 'Plot multiple metrics on various charts in a side-by-side dashboard.', category: 'Data Tools', icon: 'Layout', badge: 'NEW' as const, href: '/multi-chart-generator' },
  { slug: 'dashboard-generator', name: 'Interactive Dashboard Builder', description: 'Auto-detect columns, categorize data, and build comprehensive analytical reports.', category: 'Data Tools', icon: 'Layout', badge: 'POPULAR' as const, href: '/dashboard-generator' }
];

const HOMEPAGE_CATEGORIES = [
  { id: 'All', name: 'All Tools', icon: '⚡' },
  { id: 'Image Tools', name: 'Image Tools', icon: '🎨' },
  { id: 'PDF Tools', name: 'PDF Tools', icon: '📕' },
  { id: 'Data Tools', name: 'Data Tools', icon: '📊' },
  { id: 'Developer Tools', name: 'Developer Tools', icon: '💻' },
  { id: 'Text Tools', name: 'Text Tools', icon: '📝' },
  { id: 'Utility Tools', name: 'Utility Tools', icon: '🧮' },
  { id: 'Student Tools', name: 'Student Tools', icon: '🎓' },
  { id: 'Business Tools', name: 'Business Tools', icon: '💼' },
  { id: 'Food Technology', name: 'Food Tech Tools', icon: '🧪' },
  { id: 'Shareable Tools', name: 'Shareable Tools', icon: '🤝' }
];

const TOOL_ICON_MAP: Record<string, any> = {
  'Image': ImageIcon,
  'FileImage': ImageIcon,
  'Maximize': ImageIcon,
  'Crop': ImageIcon,
  'RotateCw': ImageIcon,
  'UserSquare': FileText,
  'Laptop': Layout,
  'Globe': Globe,
  'Palette': ImageIcon,
  'FileText': FileText,
  'Eye': Eye,
  'Files': Files,
  'Scissors': Scissors,
  'FileSpreadsheet': FileText,
  'Hash': Hash,
  'ListFilter': Hash,
  'Key': Key,
  'Code': Code,
  'FolderTree': Code,
  'Binary': Binary,
  'ShieldAlert': ShieldCheck,
  'CheckSquare': Check,
  'Regex': Code,
  'CalendarClock': Calendar,
  'QrCode': Code,
  'Barcode': Code,
  'Calendar': Calendar,
  'Activity': Activity,
  'Percent': Percent,
  'RefreshCw': RefreshCw,
  'Layout': Layout,
  'CalendarCheck': Calendar,
  'GraduationCap': Cpu,
  'Clock': RefreshCw,
  'Timer': RefreshCw,
  'Hourglass': RefreshCw,
  'FileUser': FileText,
  'Briefcase': FileText,
  'Receipt': FileText,
  'Contact': Globe,
  'FileSignature': FileText,
  'PenTool': Code,
  'Award': Sparkles,
  'Droplet': ImageIcon,
  'Flame': Zap,
  'Thermometer': Activity,
  'Scale': Calculator,
  'DollarSign': Calculator,
  'Heart': Activity,
  'Combine': Layout,
  'Users': Globe,
  'UserCheck': ShieldCheck,
  'HelpCircle': Settings,
  'CircleDot': Lock,
  'Dices': Hash
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Image Tools': return '#ec4899';
    case 'PDF Tools': return '#ef4444';
    case 'Data Tools': return '#ba9eff';
    case 'Developer Tools': return '#10b981';
    case 'Text Tools': return '#f59e0b';
    case 'Utility Tools': return '#3b82f6';
    case 'Student Tools': return '#6366f1';
    case 'Business Tools': return '#f43f5e';
    case 'Food Technology': return '#8b5cf6';
    case 'Shareable Tools': return '#0ea5e9';
    default: return '#3b82f6';
  }
};

const trustBadgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  fontSize: '0.78rem',
  fontWeight: 600,
  color: 'var(--text-muted)',
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid var(--border-subtle)',
  padding: '6px 12px',
  borderRadius: 8
};

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [recentTools, setRecentTools] = useState<string[]>([]);
  const [faves, setFaves] = useState<string[]>([]);
  const [recentDashes, setRecentDashes] = useState<string[]>([]);

  // Load local storage states on client render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRecent = localStorage.getItem('recently_used_tools');
      if (storedRecent) setRecentTools(JSON.parse(storedRecent));

      const storedFaves = localStorage.getItem('favourite_tools');
      if (storedFaves) setFaves(JSON.parse(storedFaves));

      const storedDashes = localStorage.getItem('recent_dashboards');
      if (storedDashes) setRecentDashes(JSON.parse(storedDashes));

      const storedTheme = localStorage.getItem('theme-preference');
      if (storedTheme) {
        setDarkMode(storedTheme === 'dark');
      }
    }
  }, []);

  // Listen to cross-page updates for favourites
  useEffect(() => {
    const handleFavsUpdate = () => {
      const storedFaves = localStorage.getItem('favourite_tools');
      if (storedFaves) setFaves(JSON.parse(storedFaves));
    };
    window.addEventListener('favourites-updated', handleFavsUpdate);
    return () => window.removeEventListener('favourites-updated', handleFavsUpdate);
  }, []);

  // Debounced search queries tracker
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        trackSearchQuery(searchQuery);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleToggleTheme = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    localStorage.setItem('theme-preference', nextDark ? 'dark' : 'light');
    trackThemeToggle(nextDark ? 'dark' : 'light');
  };

  const toggleFave = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = faves.includes(slug) ? faves.filter(s => s !== slug) : [...faves, slug];
    setFaves(updated);
    localStorage.setItem('favourite_tools', JSON.stringify(updated));
    const nextIsFav = !faves.includes(slug);
    toast.success(nextIsFav ? 'Added to favourites!' : 'Removed from favourites');
    trackFavoriteToggle(slug, nextIsFav);
  };

  const trackClick = (slug: string) => {
    const updated = [slug, ...recentTools.filter(s => s !== slug)].slice(0, 5);
    setRecentTools(updated);
    localStorage.setItem('recently_used_tools', JSON.stringify(updated));
    
    // Track usage in GA
    const toolDef = allCombinedTools.find(t => t.slug === slug);
    if (toolDef) {
      trackToolUsage(slug, toolDef.name);
    }
  };

  // Combine all tools (29 quick + 6 core data tools)
  const allCombinedTools = React.useMemo(() => {
    return [
      ...QUICK_TOOLS.map(t => ({ ...t, href: `/tools/${t.slug}` })),
      ...DATA_TOOLS_LIST
    ];
  }, []);

  // Filter tools based on query and selected category
  const filteredTools = React.useMemo(() => {
    return allCombinedTools.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            t.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeCategory === 'All') return matchesSearch;
      
      let categoryMatches = false;
      if (activeCategory === 'Image Tools') categoryMatches = t.category === 'Image Tools';
      else if (activeCategory === 'PDF Tools') categoryMatches = t.category === 'PDF Tools';
      else if (activeCategory === 'Data Tools') categoryMatches = t.category === 'Data Tools';
      else if (activeCategory === 'Developer Tools') categoryMatches = t.category === 'Developer Tools';
      else if (activeCategory === 'Text Tools') categoryMatches = t.category === 'Text Tools';
      else if (activeCategory === 'Utility Tools') categoryMatches = t.category === 'Utility Tools';
      else if (activeCategory === 'Student Tools') categoryMatches = t.category === 'Student Tools';
      else if (activeCategory === 'Business Tools') categoryMatches = t.category === 'Business Tools';
      else if (activeCategory === 'Food Technology') categoryMatches = t.category === 'Food Technology';
      else if (activeCategory === 'Shareable Tools') categoryMatches = t.category === 'Shareable Tools';
      
      return categoryMatches && matchesSearch;
    });
  }, [searchQuery, activeCategory, allCombinedTools]);

  // Filter popular tools (featured ones)
  const popularTools = React.useMemo(() => {
    return allCombinedTools.filter(t => t.badge === 'POPULAR' || t.slug === 'image-compressor' || t.slug === 'pdf-merger' || t.slug === 'excel-visualizer');
  }, [allCombinedTools]);

  // Helper to count items per category
  const getToolCountForCategory = (catId: string) => {
    if (catId === 'All') return allCombinedTools.length;
    return allCombinedTools.filter(t => {
      if (catId === 'Image Tools') return t.category === 'Image Tools';
      if (catId === 'PDF Tools') return t.category === 'PDF Tools';
      if (catId === 'Data Tools') return t.category === 'Data Tools';
      if (catId === 'Developer Tools') return t.category === 'Developer Tools';
      if (catId === 'Text Tools') return t.category === 'Text Tools';
      if (catId === 'Utility Tools') return t.category === 'Utility Tools';
      if (catId === 'Student Tools') return t.category === 'Student Tools';
      if (catId === 'Business Tools') return t.category === 'Business Tools';
      if (catId === 'Food Technology') return t.category === 'Food Technology';
      if (catId === 'Shareable Tools') return t.category === 'Shareable Tools';
      return false;
    }).length;
  };


  return (
    <div className={darkMode ? '' : 'light'} style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar darkMode={darkMode} onToggleDark={handleToggleTheme} />

      {/* ── HERO SECTION ── */}
      <section style={{ padding: '80px 0 30px', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient blobs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div className="ambient-blob" style={{ position: 'absolute', top: '-10%', left: '-5%', width: 800, height: 800, background: 'radial-gradient(circle, rgba(132,85,239,0.12) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div className="ambient-blob-delayed" style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
        </div>
        
        <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: 840, margin: '0 auto' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', background: 'rgba(186,158,255,0.06)', border: '1px solid rgba(186,158,255,0.2)', borderRadius: 99, marginBottom: 24, backdropFilter: 'blur(8px)' }}>
            <Zap size={12} color="#ba9eff" className="pulse-icon" />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: '#cdcdff', textTransform: 'uppercase' }}>Smart Tools for Everyday Tasks</span>
          </div>
          
          {/* Headline */}
          <h1 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(2.25rem, 5.5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 16, background: 'linear-gradient(135deg, #f8f9fe 30%, #ba9eff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Instantly Visualize Data & Solve Everyday PDF, Image & Dev Tasks Offline
          </h1>
          
          {/* Subtext */}
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.95rem, 2.2vw, 1.05rem)', lineHeight: 1.6, maxWidth: 680, margin: '0 auto 32px' }}>
            An offline-first platform featuring premium browser calculators, e-signatures, invoice builders, image beautifiers, and dynamic data visualizers. No logins, no databases, 100% secure.
          </p>

          {/* Search bar */}
          <div style={{ maxWidth: 600, margin: '0 auto 24px', position: 'relative' }}>
            <div style={{
              display: 'flex', alignItems: 'center', background: 'rgba(15, 23, 42, 0.45)',
              border: '1px solid var(--border-subtle)', borderRadius: 16, padding: '6px 16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)', backdropFilter: 'blur(8px)',
              transition: 'border-color 0.2s, box-shadow 0.2s'
            }} className="search-bar-container">
              <Search size={18} color="var(--text-muted)" style={{ marginRight: 12, flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search tools... (e.g. compress, pdf merger, json, word counter)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%', background: 'none', border: 'none', color: '#fff',
                  outline: 'none', fontSize: '0.93rem', height: 44,
                  fontFamily: 'var(--font-inter)'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'rgba(255,255,255,0.06)', border: 'none', color: 'var(--text-muted)',
                    width: 20, height: 20, borderRadius: '50%', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', opacity: 0.9 }}>
            <span style={trustBadgeStyle}><Lock size={12} color="#10b981" /> Files never leave your device</span>
            <span style={trustBadgeStyle}><ShieldCheck size={12} color="#10b981" /> No login required</span>
            <span style={trustBadgeStyle}><Cpu size={12} color="#ba9eff" /> Fast processing</span>
            <span style={trustBadgeStyle}><Zap size={12} color="#ba9eff" /> Privacy-first</span>
          </div>
        </div>
      </section>

      {/* ── MAIN DIRECTORY GRID ── */}
      <section style={{ padding: '0 0 60px', position: 'relative' }}>
        <div className="container">
          
          {/* Top AdSense Banner (Disabled by default) */}
          <AdBannerTop />

          {/* Personalized Hub */}
          {!searchQuery && activeCategory === 'All' && (recentTools.length > 0 || faves.length > 0 || recentDashes.length > 0) && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
              marginBottom: 44,
              padding: 20,
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 16
            }}>
              {/* Favourites */}
              {faves.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    ★ Favourites ({faves.length})
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {faves.map(slug => {
                      const t = allCombinedTools.find(tool => tool.slug === slug);
                      if (!t) return null;
                      return (
                        <Link key={slug} href={t.href} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid var(--border-subtle)' }} onClick={() => trackClick(slug)}>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t.name}</span>
                          <button onClick={(e) => toggleFave(e, slug)} style={{ background: 'none', border: 'none', color: '#f59e0b', cursor: 'pointer', fontSize: '0.8rem' }}>✕</button>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Recently Used */}
              {recentTools.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    ⏱ Recently Used
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {recentTools.map(slug => {
                      const t = allCombinedTools.find(tool => tool.slug === slug);
                      if (!t) return null;
                      return (
                        <Link key={slug} href={t.href} style={{ textDecoration: 'none', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid var(--border-subtle)' }} onClick={() => trackClick(slug)}>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Recent Dashboard Templates */}
              {recentDashes.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    📊 Recent Dashboards
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {recentDashes.map(slug => {
                      const d = GALLERY_DASHBOARDS.find(dash => dash.slug === slug);
                      if (!d) return null;
                      return (
                        <Link key={slug} href={`/gallery/${slug}`} style={{ textDecoration: 'none', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{d.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Popular Tools Section */}
          {!searchQuery && activeCategory === 'All' && (
            <div style={{ marginBottom: 44 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                <Sparkles size={16} color="#ba9eff" />
                <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  Popular Tools
                </h2>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 16
              }}>
                {popularTools.slice(0, 4).map(tool => {
                  const IconComponent = TOOL_ICON_MAP[tool.icon] || Settings;
                  return (
                    <Link key={tool.slug} href={tool.href} style={{ textDecoration: 'none' }} onClick={() => trackClick(tool.slug)}>
                      <div style={{
                        padding: '16px 20px', borderRadius: 14,
                        border: '1px solid rgba(132, 85, 239, 0.25)',
                        background: 'rgba(132, 85, 239, 0.04)',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
                        transition: 'all 0.2s', cursor: 'pointer'
                      }} className="popular-tool-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <div style={{
                            width: 34, height: 34, borderRadius: 8,
                            background: 'rgba(132, 85, 239, 0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                          }}>
                            <IconComponent size={16} color="#ba9eff" />
                          </div>
                          <div>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 2px' }}>{tool.name}</h4>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{tool.category}</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => toggleFave(e, tool.slug)}
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: faves.includes(tool.slug) ? '#f59e0b' : 'var(--text-muted)',
                            padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem'
                          }}
                        >
                          ★
                        </button>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Popular Productivity Tools Section */}
          {!searchQuery && activeCategory === 'All' && (
            <div style={{ marginBottom: 44 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                <Zap size={16} color="#ef4444" />
                <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  Popular Productivity Tools
                </h2>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 16
              }}>
                {[
                  { slug: 'cgpa-calculator', name: 'CGPA Calculator', category: 'Student Tools', icon: 'GraduationCap' },
                  { slug: 'invoice-generator', name: 'PDF Invoice Generator', category: 'Business Tools', icon: 'Receipt' },
                  { slug: 'qr-generator-pro', name: 'QR Code Generator Pro', category: 'Shareable Tools', icon: 'QrCode' },
                  { slug: 'attendance-calculator', name: 'Attendance Calculator', category: 'Student Tools', icon: 'CalendarCheck' }
                ].map(tool => {
                  const IconComponent = TOOL_ICON_MAP[tool.icon] || Settings;
                  const fullTool = allCombinedTools.find(t => t.slug === tool.slug) || { ...tool, href: `/tools/${tool.slug}` };
                  return (
                    <Link key={tool.slug} href={fullTool.href} style={{ textDecoration: 'none' }} onClick={() => trackClick(tool.slug)}>
                      <div style={{
                        padding: '16px 20px', borderRadius: 14,
                        border: '1px solid rgba(239, 68, 68, 0.25)',
                        background: 'rgba(239, 68, 68, 0.04)',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
                        transition: 'all 0.2s', cursor: 'pointer'
                      }} className="popular-tool-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <div style={{
                            width: 34, height: 34, borderRadius: 8,
                            background: 'rgba(239, 68, 68, 0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                          }}>
                            <IconComponent size={16} color="#f43f5e" />
                          </div>
                          <div>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 2px' }}>{tool.name}</h4>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{tool.category}</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => toggleFave(e, tool.slug)}
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: faves.includes(tool.slug) ? '#f59e0b' : 'var(--text-muted)',
                            padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem'
                          }}
                        >
                          ★
                        </button>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Categories Tab Row */}
          <div style={{
            display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 12,
            marginBottom: 32, borderBottom: '1px solid var(--border-subtle)',
            scrollbarWidth: 'none', msOverflowStyle: 'none'
          }} className="category-scroll-container">
            {HOMEPAGE_CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 18px', borderRadius: 12, border: '1px solid',
                    borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-subtle)',
                    background: isActive ? 'rgba(132, 85, 239, 0.12)' : 'rgba(23, 26, 30, 0.35)',
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                    fontWeight: isActive ? 600 : 500, fontSize: '0.85rem',
                    cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
                    boxShadow: isActive ? '0 0 16px rgba(132,85,239,0.15)' : 'none'
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span style={{
                    fontSize: '0.7rem', padding: '1px 6px', borderRadius: 6,
                    background: isActive ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                    color: 'var(--text-muted)'
                  }}>
                    {getToolCountForCategory(cat.id)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tools Grid */}
          {filteredTools.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 20
            }}>
              {filteredTools.map(tool => {
                const IconComponent = TOOL_ICON_MAP[tool.icon] || Settings;
                return (
                  <Link key={tool.slug} href={tool.href} style={{ textDecoration: 'none' }} onClick={() => trackClick(tool.slug)}>
                    <div 
                      className="glass-card glass-card-hover toolvista-card" 
                      style={{ 
                        padding: 22, height: '100%', display: 'flex', flexDirection: 'column',
                        justifyContent: 'space-between', border: '1px solid var(--border-subtle)',
                        borderRadius: 18, background: 'rgba(23, 26, 30, 0.35)',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <div>
                        {/* Card Header: Icon & Badge */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                          <div style={{
                            width: 38, height: 38, borderRadius: 10,
                            background: getCategoryColor(tool.category) + '12',
                            border: '1px solid ' + getCategoryColor(tool.category) + '22',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>
                            <IconComponent size={18} color={getCategoryColor(tool.category)} />
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <button
                              onClick={(e) => toggleFave(e, tool.slug)}
                              style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                color: faves.includes(tool.slug) ? '#f59e0b' : 'var(--text-muted)',
                                padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem'
                              }}
                            >
                              ★
                            </button>
                            {tool.badge && (
                              <span style={{
                                fontSize: '0.62rem', fontWeight: 800, color: '#000',
                                background: tool.badge === 'NEW' ? '#10b981' : (tool.badge === 'POPULAR' ? 'linear-gradient(135deg, #ba9eff, #8455ef)' : 'rgba(255,255,255,0.2)'),
                                padding: '2px 6px', borderRadius: 4, textTransform: 'uppercase'
                              }}>
                                {tool.badge}
                              </span>
                            )}
                          </div>
                        </div>


                        {/* Title */}
                        <h3 style={{
                          fontFamily: 'var(--font-manrope)', fontSize: '0.92rem',
                          fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px'
                        }}>
                          {tool.name}
                        </h3>

                        {/* Description */}
                        <p style={{
                          color: 'var(--text-secondary)', fontSize: '0.78rem',
                          lineHeight: 1.5, margin: 0, overflow: 'hidden',
                          textOverflow: 'ellipsis', display: '-webkit-box',
                          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'
                        }}>
                          {tool.description}
                        </p>
                      </div>

                      {/* Footer link */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 14, fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent-primary)' }}>
                        <span>Open Tool</span>
                        <ArrowRight size={12} className="arrow-icon" style={{ transition: 'transform 0.2s' }} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div style={{
              textAlign: 'center', padding: '60px 20px', borderRadius: 20,
              background: 'rgba(23, 26, 30, 0.2)', border: '1px solid var(--border-subtle)'
            }}>
              <Server size={32} color="var(--text-muted)" style={{ marginBottom: 12 }} />
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>
                No tools found matching &ldquo;{searchQuery}&rdquo;. Try another search term.
              </p>
            </div>
          )}

          {/* Related Suggestions Ribbon */}
          {activeCategory !== 'All' && (
            <div style={{
              marginTop: 40, padding: '20px 24px', borderRadius: 16,
              background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-subtle)',
              display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16
            }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px' }}>Looking for other utilities?</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>Check out similar categories or browse our comprehensive utility list.</p>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {HOMEPAGE_CATEGORIES.filter(c => c.id !== 'All' && c.id !== activeCategory).slice(0, 3).map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)',
                      borderRadius: 8, padding: '6px 12px', color: 'var(--text-secondary)',
                      fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.2s'
                    }}
                    className="popular-tool-card"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── FEATURED DATA VISUALIZATION SECTION ── */}
      <section style={{
        padding: '60px 0',
        background: 'rgba(2, 8, 23, 0.25)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative'
      }} id="data-visualizer-suite">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="badge" style={{ marginBottom: 12, background: 'rgba(64,206,237,0.08)', color: '#40ceed', border: '1px solid rgba(64,206,237,0.2)' }}>Featured Suite</span>
            <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
              Flagship Data &amp; Spreadsheet Visualizer
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 540, margin: '0 auto 24px', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Upload Excel, CSV, PDF, or Google Sheets below to analyze trends, generate beautiful charts, and build dynamic multi-chart dashboards directly in-browser.
            </p>
          </div>

          {/* ── Live Preview Chart Strip ── */}
          <div style={{ position: 'relative', marginBottom: 40 }}>
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

          <div style={{ position: 'relative' }}>
            <DashboardView />
          </div>
        </div>
      </section>

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

      {/* Middle AdSense Banner (Disabled by default) */}
      <AdBannerMiddle className="container" style={{ marginBottom: 60 }} />

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

      {/* Bottom AdSense Banner (Disabled by default) */}
      <AdBannerBottom className="container" style={{ margin: '40px auto 0' }} />

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
