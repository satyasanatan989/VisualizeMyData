'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Eye, RefreshCw, Files, Scissors, Key, Binary, Globe, Activity, Percent, Calendar,
  ChevronDown, ChevronUp, Star, Laptop, Shield, MessageSquare, Play, HelpCircle, ChevronRight
} from 'lucide-react';
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

const tooltipCfg = {
  contentStyle: { background: '#0f172a', border: '1px solid #334155', borderRadius: 8, fontSize: 11, color: '#fff' },
};

const DATA_TOOLS_LIST = [
  { slug: 'excel-visualizer', name: 'Excel Data Visualizer', description: 'Upload Excel files (.xlsx/.xls) to instantly build interactive dashboards and charts.', category: 'Data Tools', icon: 'FileText', badge: 'POPULAR' as const, href: '/excel-visualizer' },
  { slug: 'csv-visualizer', name: 'CSV Data Visualizer', description: 'Convert CSV files to charts, clean data, and export dashboards offline.', category: 'Data Tools', icon: 'FileText', badge: 'POPULAR' as const, href: '/csv-visualizer' },
  { slug: 'pdf-visualizer', name: 'PDF Table Extractor & Visualizer', description: 'Extract tabular data from PDF files and convert them to interactive graphs.', category: 'Data Tools', icon: 'FileText', badge: 'POPULAR' as const, href: '/pdf-visualizer' },
  { slug: 'google-sheets-visualizer', name: 'Google Sheets Live Visualizer', description: 'Paste a public Google Sheets link to sync and plot data dynamically.', category: 'Data Tools', icon: 'Globe', badge: 'FREE' as const, href: '/google-sheets-visualizer' },
  { slug: 'multi-chart-generator', name: 'Multi-Chart Dashboard Generator', description: 'Plot multiple metrics on various charts in a side-by-side dashboard.', category: 'Data Tools', icon: 'Layout', badge: 'NEW' as const, href: '/multi-chart-generator' },
  { slug: 'dashboard-generator', name: 'Interactive Dashboard Builder', description: 'Auto-detect columns, categorize data, and build comprehensive analytical reports.', category: 'Data Tools', icon: 'Layout', badge: 'POPULAR' as const, href: '/dashboard-generator' }
];

const HOMEPAGE_CATEGORIES = [
  { id: 'All', name: 'All Tools', countKey: 'all', description: 'Explore our full suite of 40+ browser utilities.', icon: '⚡' },
  { id: 'Data Tools', name: 'Dashboard Tools', countKey: 'data', description: 'Create charts, dashboards, and reports.', icon: '📊' },
  { id: 'Excel Tools', name: 'Excel Tools', countKey: 'excel', description: 'Formulas and spreadsheet visualizers.', icon: '📗' },
  { id: 'CSV Tools', name: 'CSV Tools', countKey: 'csv', description: 'Clean and visualize CSV files.', icon: '📋' },
  { id: 'PDF Tools', name: 'PDF Tools', countKey: 'pdf', description: 'Merge, split, extract, and convert PDFs.', icon: '📕' },
  { id: 'Image Tools', name: 'Image Tools', countKey: 'image', description: 'Compress, resize, and crop images.', icon: '🎨' },
  { id: 'Developer Tools', name: 'Developer Tools', countKey: 'dev', description: 'Validators, testers, decoders, and formatters.', icon: '💻' },
  { id: 'Student Tools', name: 'Student Tools', countKey: 'student', description: 'Timers, GPA calculators, and resume builders.', icon: '🎓' },
  { id: 'Business Tools', name: 'Business Tools', countKey: 'business', description: 'Invoices, quotes, letterheads, and certificates.', icon: '💼' },
  { id: 'Food Technology', name: 'Food Science Tools', countKey: 'food', description: 'Milk SNF, costing, recipe portion calculators.', icon: '🧪' },
  { id: 'Shareable Tools', name: 'Shareable Tools', countKey: 'shareable', description: 'QR Pro, barcode, team pickers, spin wheels.', icon: '🤝' }
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

const FAQS = [
  { q: 'Is ToolVista really free?', a: 'Yes, 100% free! No signup, no credit card, and no limits. Just upload and visualize your data.' },
  { q: 'Can I use it on mobile devices?', a: 'Absolutely. The interface is optimized with custom bottom-sheet layouts and touch-friendly controls.' },
  { q: 'Is my data safe and private?', a: 'All file processing happens directly in your browser. Your spreadsheets, documents, and credentials never touch a server.' },
  { q: 'What file formats are supported?', a: 'We support Excel (.xlsx, .xls), CSV, PDFs (for table extraction), and live public Google Sheets links.' },
  { q: 'Can I download visual charts?', a: 'Yes! You can download generated charts as high-resolution PNGs or presentation-ready PDF reports.' }
];

const TESTIMONIALS = [
  { name: 'Sarah Jenkins', role: 'Business Analyst', text: 'I converted my client CSV report into a full presentation dashboard in 30 seconds. No login, just instant charts.', avatar: '💼' },
  { name: 'Rajesh Kumar', role: 'Food Technology Specialist', text: 'The Milk SNF and Costing calculators save us hours in the processing plant. It is private and loads instantly.', avatar: '🧪' },
  { name: 'Emily Chen', role: 'Data Science Student', text: 'Being able to extract tables from lecture PDFs and plot them directly is awesome. The CGPA tool is a great bonus.', avatar: '🎓' }
];

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

const getCategoryColor = (cat: string) => {
  switch (cat) {
    case 'Image Tools': return '#ec4899';
    case 'PDF Tools': return '#ef4444';
    case 'Text Tools': return '#f59e0b';
    case 'Developer Tools': return '#10b981';
    case 'Student Tools': return '#6366f1';
    case 'Business Tools': return '#f43f5e';
    case 'Food Technology': return '#8b5cf6';
    case 'Shareable Tools': return '#0ea5e9';
    default: return '#3b82f6';
  }
};

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [recentTools, setRecentTools] = useState<string[]>([]);
  const [faves, setFaves] = useState<string[]>([]);
  const [recentDashes, setRecentDashes] = useState<string[]>([]);
  const [trendingTab, setTrendingTab] = useState<'trending' | 'recent_added' | 'most_used' | 'editors_picks' | 'popular_week' | 'recent' | 'favorites'>('trending');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load states on client render
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
        setDarkMode(storedTheme === 'dark' || storedTheme === 'system');
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

  // Keyboard shortcut listener ('/' to focus search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
    
    const toolDef = allCombinedTools.find(t => t.slug === slug);
    if (toolDef) {
      trackToolUsage(slug, toolDef.name);
    }
  };

  const allCombinedTools = React.useMemo(() => {
    return [
      ...QUICK_TOOLS.map(t => ({ ...t, href: `/tools/${t.slug}` })),
      ...DATA_TOOLS_LIST
    ];
  }, []);

  const filteredTools = React.useMemo(() => {
    return allCombinedTools.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            t.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeCategory === 'All') return matchesSearch;
      
      let categoryMatches = false;
      if (activeCategory === 'Image Tools') categoryMatches = t.category === 'Image Tools';
      else if (activeCategory === 'PDF Tools') categoryMatches = t.category === 'PDF Tools';
      else if (activeCategory === 'Data Tools') categoryMatches = t.category === 'Data Tools' || t.category === 'Excel Tools' || t.category === 'CSV Tools';
      else if (activeCategory === 'Excel Tools') categoryMatches = t.category === 'Excel Tools';
      else if (activeCategory === 'CSV Tools') categoryMatches = t.category === 'CSV Tools';
      else if (activeCategory === 'Developer Tools') categoryMatches = t.category === 'Developer Tools';
      else if (activeCategory === 'Text Tools') categoryMatches = t.category === 'Text Tools';
      else if (activeCategory === 'Student Tools') categoryMatches = t.category === 'Student Tools';
      else if (activeCategory === 'Business Tools') categoryMatches = t.category === 'Business Tools';
      else if (activeCategory === 'Food Science Tools') categoryMatches = t.category === 'Food Technology';
      else if (activeCategory === 'Shareable Tools') categoryMatches = t.category === 'Shareable Tools';
      else if (activeCategory === 'Productivity Tools') categoryMatches = t.category === 'Student Tools' || t.category === 'Business Tools' || t.category === 'Shareable Tools';
      
      return categoryMatches && matchesSearch;
    });
  }, [searchQuery, activeCategory, allCombinedTools]);

  const trendingTools = React.useMemo(() => {
    return allCombinedTools.filter(t => t.badge === 'POPULAR' || (t as any).isPopular);
  }, [allCombinedTools]);

  const recentlyAddedTools = React.useMemo(() => {
    return allCombinedTools.filter(t => t.badge === 'NEW');
  }, [allCombinedTools]);

  const mostUsedTools = React.useMemo(() => {
    return allCombinedTools.filter(t => t.slug === 'image-compressor' || t.slug === 'excel-visualizer' || t.slug === 'csv-visualizer' || t.slug === 'qr-code-generator');
  }, [allCombinedTools]);

  const editorsPicksTools = React.useMemo(() => {
    return allCombinedTools.filter(t => (t as any).isFeatured);
  }, [allCombinedTools]);

  const popularWeekTools = React.useMemo(() => {
    return allCombinedTools.filter(t => t.slug === 'invoice-generator' || t.slug === 'pdf-merger' || t.slug === 'cgpa-calculator' || t.slug === 'word-counter');
  }, [allCombinedTools]);

  const getToolCountForCategory = (catId: string) => {
    if (catId === 'All') return allCombinedTools.length;
    return allCombinedTools.filter(t => {
      if (catId === 'Data Tools') return t.category === 'Data Tools' || t.category === 'Excel Tools' || t.category === 'CSV Tools';
      if (catId === 'Excel Tools') return t.category === 'Excel Tools';
      if (catId === 'CSV Tools') return t.category === 'CSV Tools';
      if (catId === 'PDF Tools') return t.category === 'PDF Tools';
      if (catId === 'Image Tools') return t.category === 'Image Tools';
      if (catId === 'Developer Tools') return t.category === 'Developer Tools';
      if (catId === 'Student Tools') return t.category === 'Student Tools';
      if (catId === 'Business Tools') return t.category === 'Business Tools';
      if (catId === 'Food Science Tools') return t.category === 'Food Technology';
      if (catId === 'Shareable Tools') return t.category === 'Shareable Tools';
      if (catId === 'Productivity Tools') return t.category === 'Student Tools' || t.category === 'Business Tools' || t.category === 'Shareable Tools';
    }).length;
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "VisualizeMyData",
    "url": "https://visualizemydata.in",
    "logo": "https://visualizemydata.in/logo.png",
    "sameAs": [
      "https://twitter.com/visualizemydata",
      "https://github.com/satyasanatan989/VisualizeMyData"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "VisualizeMyData",
    "url": "https://visualizemydata.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://visualizemydata.in/tools?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className={darkMode ? '' : 'light'} style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Dynamic JSON-LD schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <Navbar darkMode={darkMode} onToggleDark={handleToggleTheme} />

      {/* ── 1. HERO SECTION (SaaS Polish) ── */}
      <section style={{ padding: '100px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div className="ambient-blob" style={{ position: 'absolute', top: '-10%', left: '-5%', width: 800, height: 800, background: 'radial-gradient(circle, rgba(132,85,239,0.12) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div className="ambient-blob-delayed" style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
        </div>
        
        <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', background: 'rgba(186,158,255,0.06)', border: '1px solid rgba(186,158,255,0.2)', borderRadius: 99, marginBottom: 24, backdropFilter: 'blur(8px)' }}>
            <Zap size={12} color="#ba9eff" className="pulse-icon" />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: '#cdcdff', textTransform: 'uppercase' }}>Visualize, Analyze, Convert, Create</span>
          </div>
          
          <h1 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(2.5rem, 6.5vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20, background: 'linear-gradient(135deg, #f8f9fe 30%, #ba9eff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Transform Data Into<br />Beautiful Insights.
          </h1>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)', lineHeight: 1.6, maxWidth: 660, margin: '0 auto 36px' }}>
            Create dashboards, visualize spreadsheets, convert files, and use powerful browser-based productivity tools—all in one place. No uploads, no signup, 100% private.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginBottom: 40 }}>
            <button 
              onClick={() => document.getElementById('data-visualizer-suite')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary" 
              style={{ fontSize: '0.95rem', padding: '14px 32px' }}
            >
              Start Visualizing <Play size={14} fill="#000" />
            </button>
            <button 
              onClick={() => document.getElementById('tools-catalog')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary" 
              style={{ fontSize: '0.95rem', padding: '14px 32px' }}
            >
              Browse Tools
            </button>
          </div>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', opacity: 0.9 }}>
            <span style={trustBadgeStyle}><Lock size={12} color="#10b981" /> Files stay on your device</span>
            <span style={trustBadgeStyle}><ShieldCheck size={12} color="#10b981" /> No login required</span>
            <span style={trustBadgeStyle}><Cpu size={12} color="#ba9eff" /> Privacy-first</span>
            <span style={trustBadgeStyle}><Zap size={12} color="#ba9eff" /> Lightning fast</span>
          </div>
        </div>
      </section>

      {/* ── 2. INTERACTIVE CSS LAPTOP MOCKUP ── */}
      <section style={{ padding: '20px 0 60px', background: 'rgba(2, 8, 23, 0.15)' }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <ScrollReveal>
            {/* CSS Laptop Frame */}
            <div style={{ margin: '0 auto', maxWidth: '840px', position: 'relative' }}>
              {/* Laptop Screen Wrapper */}
              <div style={{
                background: '#1e293b',
                borderRadius: '16px 16px 0 0',
                border: '10px solid #0f172a',
                borderBottom: 'none',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6)',
                aspectRatio: '16/10',
                overflow: 'hidden',
                position: 'relative'
              }}>
                {/* Screen Content: Live Interactive Dashboard Mockup */}
                <div style={{
                  background: '#0c0e12',
                  height: '100%',
                  width: '100%',
                  padding: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  fontSize: '0.75rem',
                  color: '#fff',
                  overflowY: 'auto'
                }}>
                  {/* Dashboard Header Mock */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
                      <span style={{ fontWeight: 700, letterSpacing: '0.04em' }}>SAMPLE SALES PERFORMANCE DASHBOARD</span>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span style={{ background: 'rgba(186,158,255,0.1)', color: '#ba9eff', padding: '2px 8px', borderRadius: 4, fontSize: '0.65rem' }}>Updated Just Now</span>
                    </div>
                  </div>

                  {/* Mock KPI cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                    {[
                      { title: 'Total Revenue', value: '$84,250', desc: '+12.4% vs last month', color: '#ba9eff' },
                      { title: 'Active Customers', value: '1,420', desc: '+8.2% new users', color: '#40ceed' },
                      { title: 'Conversion Rate', value: '4.85%', desc: '+0.6% improvement', color: '#9093ff' }
                    ].map(kpi => (
                      <div key={kpi.title} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: 10 }}>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.65rem' }}>{kpi.title}</p>
                        <p style={{ margin: '4px 0 2px', fontSize: '1.1rem', fontWeight: 800, color: kpi.color }}>{kpi.value}</p>
                        <p style={{ margin: 0, color: '#10b981', fontSize: '0.6rem' }}>{kpi.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recharts Live Chart Preview */}
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10, flex: 1 }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: 10 }}>
                      <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: '0.68rem', color: '#cdcdff' }}>Sales Revenue Trend</p>
                      <ResponsiveContainer width="100%" height={110}>
                        <AreaChart data={DASH_AREA}>
                          <defs>
                            <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ba9eff" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#ba9eff" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="rev" stroke="#ba9eff" strokeWidth={1.5} fillOpacity={1} fill="url(#areaColor)" />
                          <Tooltip {...tooltipCfg} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: 10, display: 'flex', flexDirection: 'column' }}>
                      <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: '0.68rem', color: '#cdcdff' }}>Device Breakdown</p>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ResponsiveContainer width="100%" height={80}>
                          <PieChart>
                            <Pie data={DASH_PIE} cx="50%" cy="50%" innerRadius={14} outerRadius={28} dataKey="value" stroke="none">
                              {DASH_PIE.map((_: any, i: number) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                            </Pie>
                            <Tooltip {...tooltipCfg} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Laptop Keyboard Base */}
              <div style={{
                height: 14,
                background: '#475569',
                borderRadius: '0 0 12px 12px',
                borderBottom: '4px solid #334155',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                position: 'relative',
                zIndex: 10
              }}>
                {/* Display Open Indicator Notch */}
                <div style={{
                  width: 60,
                  height: 4,
                  background: '#1e293b',
                  borderRadius: '0 0 4px 4px',
                  margin: '0 auto',
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)'
                }} />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 3. GENERAL SEARCH HUB (Primary Interaction) ── */}
      <section style={{ padding: '40px 0 30px', position: 'relative' }} id="tools-catalog">
        <div className="container" style={{ maxWidth: 740, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: 99, marginBottom: 16 }}>
            <Search size={11} color="#60a5fa" />
            <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.04rem', color: '#90cdf4' }}>Instant Access Engine</span>
          </div>
          
          <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.75rem', fontWeight: 800, margin: '0 0 20px', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Find the Tool You Need Instantly
          </h2>

          {/* SaaS Search Box */}
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <div style={{
              display: 'flex', alignItems: 'center', background: 'rgba(15, 23, 42, 0.45)',
              border: '1px solid var(--border-subtle)', borderRadius: 16, padding: '6px 18px',
              boxShadow: 'var(--shadow-ambient)', backdropFilter: 'blur(8px)',
              transition: 'border-color 0.2s, box-shadow 0.2s'
            }} className="search-bar-container">
              <Search size={18} color="var(--text-muted)" style={{ marginRight: 12, flexShrink: 0 }} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search 40+ tools... (Press '/' to focus)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%', background: 'none', border: 'none', color: '#fff',
                  outline: 'none', fontSize: '0.93rem', height: 46,
                  fontFamily: 'var(--font-inter)'
                }}
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'rgba(255,255,255,0.06)', border: 'none', color: 'var(--text-muted)',
                    width: 22, height: 22, borderRadius: '50%', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem'
                  }}
                >
                  ✕
                </button>
              ) : (
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)', padding: '2px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.02)' }}>/</span>
              )}
            </div>
          </div>

          {/* Popular searches tags */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Popular:</span>
            {[
              { query: 'excel-visualizer', label: 'Excel Dashboard' },
              { query: 'csv-visualizer', label: 'CSV Viz' },
              { query: 'pdf-visualizer', label: 'PDF Table Extractor' },
              { query: 'invoice-generator', label: 'Invoice Maker' },
              { query: 'qr-generator-pro', label: 'QR Pro' }
            ].map(tag => (
              <button 
                key={tag.query}
                onClick={() => {
                  const quickTool = QUICK_TOOLS.find(t => t.slug === tag.query);
                  if (quickTool) {
                    setSearchQuery(quickTool.name);
                  } else {
                    setSearchQuery(tag.label);
                  }
                }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 6,
                  padding: '3px 8px',
                  fontSize: '0.72rem',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
                className="popular-tool-card"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. DYNAMIC PERSONALIZED & TRENDING TABS ── */}
      {!searchQuery && activeCategory === 'All' && (
        <section style={{ padding: '20px 0' }}>
          <div className="container">
            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: 12, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 10, marginBottom: 20, overflowX: 'auto', scrollbarWidth: 'none' }} className="category-scroll-container">
              {[
                { id: 'trending', label: '🔥 Trending' },
                { id: 'recent_added', label: '⏰ Recently Added' },
                { id: 'most_used', label: '📈 Most Used' },
                { id: 'editors_picks', label: '⭐ Editor\'s Picks' },
                { id: 'popular_week', label: '📅 Popular This Week' },
                { id: 'recent', label: '⏰ Recently Used', count: recentTools.length },
                { id: 'favorites', label: '⭐ Favorites', count: faves.length }
              ].map(tab => {
                const isActive = trendingTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setTrendingTab(tab.id as any)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '4px 8px',
                      fontSize: '0.85rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      position: 'relative',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.2s'
                    }}
                  >
                    {tab.label} {tab.count !== undefined && <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>({tab.count})</span>}
                    {isActive && (
                      <span style={{ position: 'absolute', bottom: -12, left: 0, right: 0, height: 2, background: 'var(--accent-primary)', borderRadius: 1 }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab Grids */}
            {trendingTab === 'trending' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                {trendingTools.slice(0, 4).map(tool => {
                  const IconComponent = TOOL_ICON_MAP[tool.icon] || Settings;
                  return (
                    <Link key={tool.slug} href={tool.href} style={{ textDecoration: 'none' }} onClick={() => trackClick(tool.slug)}>
                      <div className="glass-card popular-tool-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(132, 85, 239, 0.2)', background: 'rgba(132, 85, 239, 0.02)', borderRadius: 14 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(132, 85, 239, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconComponent size={16} color="#ba9eff" />
                          </div>
                          <div>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{tool.name}</h4>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{tool.category}</span>
                          </div>
                        </div>
                        <ChevronRight size={14} color="var(--text-muted)" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {trendingTab === 'recent_added' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                {recentlyAddedTools.slice(0, 4).map(tool => {
                  const IconComponent = TOOL_ICON_MAP[tool.icon] || Settings;
                  return (
                    <Link key={tool.slug} href={tool.href} style={{ textDecoration: 'none' }} onClick={() => trackClick(tool.slug)}>
                      <div className="glass-card popular-tool-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.01)', borderRadius: 14 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconComponent size={16} color="var(--text-secondary)" />
                          </div>
                          <div>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{tool.name}</h4>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{tool.category}</span>
                          </div>
                        </div>
                        <ChevronRight size={14} color="var(--text-muted)" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {trendingTab === 'most_used' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                {mostUsedTools.slice(0, 4).map(tool => {
                  const IconComponent = TOOL_ICON_MAP[tool.icon] || Settings;
                  return (
                    <Link key={tool.slug} href={tool.href} style={{ textDecoration: 'none' }} onClick={() => trackClick(tool.slug)}>
                      <div className="glass-card popular-tool-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.01)', borderRadius: 14 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconComponent size={16} color="var(--text-secondary)" />
                          </div>
                          <div>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{tool.name}</h4>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{tool.category}</span>
                          </div>
                        </div>
                        <ChevronRight size={14} color="var(--text-muted)" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {trendingTab === 'editors_picks' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                {editorsPicksTools.slice(0, 4).map(tool => {
                  const IconComponent = TOOL_ICON_MAP[tool.icon] || Settings;
                  return (
                    <Link key={tool.slug} href={tool.href} style={{ textDecoration: 'none' }} onClick={() => trackClick(tool.slug)}>
                      <div className="glass-card popular-tool-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.01)', borderRadius: 14 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconComponent size={16} color="var(--text-secondary)" />
                          </div>
                          <div>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{tool.name}</h4>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{tool.category}</span>
                          </div>
                        </div>
                        <ChevronRight size={14} color="var(--text-muted)" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {trendingTab === 'popular_week' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                {popularWeekTools.slice(0, 4).map(tool => {
                  const IconComponent = TOOL_ICON_MAP[tool.icon] || Settings;
                  return (
                    <Link key={tool.slug} href={tool.href} style={{ textDecoration: 'none' }} onClick={() => trackClick(tool.slug)}>
                      <div className="glass-card popular-tool-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.01)', borderRadius: 14 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconComponent size={16} color="var(--text-secondary)" />
                          </div>
                          <div>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{tool.name}</h4>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{tool.category}</span>
                          </div>
                        </div>
                        <ChevronRight size={14} color="var(--text-muted)" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {trendingTab === 'recent' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                {recentTools.length > 0 ? (
                  recentTools.slice(0, 4).map(slug => {
                    const tool = allCombinedTools.find(t => t.slug === slug);
                    if (!tool) return null;
                    const IconComponent = TOOL_ICON_MAP[tool.icon] || Settings;
                    return (
                      <Link key={slug} href={tool.href} style={{ textDecoration: 'none' }} onClick={() => trackClick(slug)}>
                        <div className="glass-card popular-tool-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.01)', borderRadius: 14 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <IconComponent size={16} color="var(--text-secondary)" />
                            </div>
                            <div>
                              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{tool.name}</h4>
                              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{tool.category}</span>
                            </div>
                          </div>
                          <ChevronRight size={14} color="var(--text-muted)" />
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border-subtle)', borderRadius: 12, width: '100%', gridColumn: '1 / -1' }}>
                    No tools recently used. Get started by exploring the tools below!
                  </div>
                )}
              </div>
            )}

            {trendingTab === 'favorites' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                {faves.length > 0 ? (
                  faves.slice(0, 4).map(slug => {
                    const tool = allCombinedTools.find(t => t.slug === slug);
                    if (!tool) return null;
                    const IconComponent = TOOL_ICON_MAP[tool.icon] || Settings;
                    return (
                      <Link key={slug} href={tool.href} style={{ textDecoration: 'none' }} onClick={() => trackClick(slug)}>
                        <div className="glass-card popular-tool-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(245, 158, 11, 0.25)', background: 'rgba(245, 158, 11, 0.02)', borderRadius: 14 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(245, 158, 11, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <IconComponent size={16} color="#f59e0b" />
                            </div>
                            <div>
                              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{tool.name}</h4>
                              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{tool.category}</span>
                            </div>
                          </div>
                          <Star size={14} fill="#f59e0b" color="#f59e0b" />
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border-subtle)', borderRadius: 12, width: '100%', gridColumn: '1 / -1' }}>
                    No favorites bookmarked. Click the star icon next to a tool name to save it here!
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 5. TOOL CATEGORIES SECTIONS (Grid of Cards) ── */}
      {!searchQuery && activeCategory === 'All' && (
        <section style={{ padding: '40px 0 20px' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <Layout size={16} color="var(--accent-primary)" />
              <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Browse Utility Categories
              </h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {HOMEPAGE_CATEGORIES.filter(cat => cat.id !== 'All').map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    trackGAEvent('category_select', 'Categories', cat.id);
                    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    background: 'rgba(23, 26, 30, 0.45)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 16,
                    padding: 20,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                    width: '100%'
                  }}
                  className="glass-card-hover"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: '1.8rem' }}>{cat.icon}</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', background: 'rgba(255,255,255,0.03)', padding: '2px 8px', borderRadius: 20, border: '1px solid var(--border-subtle)' }}>
                      {getToolCountForCategory(cat.id)} Tools
                    </span>
                  </div>
                  <h4 style={{ margin: '0 0 6px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-manrope)' }}>{cat.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>{cat.description}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. DYNAMIC MAIN TOOLS DIRECTORY ── */}
      <section style={{ padding: '40px 0 60px' }} id="catalog-section">
        <div className="container">
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
                  onClick={() => {
                    setActiveCategory(cat.id);
                    trackGAEvent('category_select', 'Categories', cat.id);
                  }}
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

      {/* ── 7. FLAGSHIP DATA VISUALIZATION SECTION ── */}
      <section style={{
        padding: '80px 0',
        background: 'rgba(2, 8, 23, 0.25)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative'
      }} id="data-visualizer-suite">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="badge" style={{ marginBottom: 12, background: 'rgba(64,206,237,0.08)', color: '#40ceed', border: '1px solid rgba(64,206,237,0.2)' }}>Flagship Dashboard Builder</span>
            <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
              Interactive Offline Data Visualizer
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 580, margin: '0 auto 24px', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Upload Excel, CSV, PDF table data, or paste public Google Sheets links. Build visual graphs, filter fields, and compile reports entirely inside your browser.
            </p>
          </div>

          <div style={{ position: 'relative' }} id="upload-zone">
            <DashboardView />
          </div>
        </div>
      </section>

      {/* ── 8. MODERN WORKFLOW TIMELINE ── */}
      <section className="section" style={{ background: 'var(--surface-low)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge" style={{ marginBottom: 14, background: 'rgba(186,158,255,0.08)', color: '#ba9eff', border: '1px solid rgba(186,158,255,0.2)' }}>Data Workflow</span>
            <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Instant Visualizations in 4 Steps
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '12px auto 0', lineHeight: 1.7 }}>
              Secure browser compilation takes you from raw numbers to customizable exported PDF graphs in seconds.
            </p>
          </div>

          {/* Workflow Cards Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, position: 'relative' }} className="timeline-grid">
            {[
              { num: '01', title: '1. Select Source', desc: 'Drag spreadsheet or paste public Google Sheets URL locally.', icon: '📁' },
              { num: '02', title: '2. Auto-Detect Schema', desc: 'Columns, numbers, and categories are parsed instantly.', icon: '🔍' },
              { num: '03', title: '3. Customize Layout', desc: 'Toggle colors, select bar/line/pie metrics, edit tags.', icon: '🎨' },
              { num: '04', title: '4. Local PDF Export', desc: 'Download charts as high-resolution PNGs or PDF reports.', icon: '📥' }
            ].map((step, idx) => (
              <div key={step.num} className="card" style={{ padding: 24, position: 'relative', border: '1px solid var(--border-subtle)', background: 'rgba(23, 26, 30, 0.4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: '2rem' }}>{step.icon}</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'rgba(186,158,255,0.15)' }}>{step.num}</span>
                </div>
                <h4 style={{ fontFamily: 'var(--font-manrope)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{step.title}</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. WHY CHOOSE US (SaaS Highlights) ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge" style={{ marginBottom: 14, background: 'rgba(16,185,129,0.08)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>Platform DNA</span>
            <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Why Work With Us?
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '12px auto 0', lineHeight: 1.7 }}>
              Professional data utilities engineered with an absolute zero-tracking privacy guarantee.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {[
              { icon: <Lock size={20} color="#10b981" />, title: 'Files Stay on Your Device', desc: 'No files are ever uploaded. Data processing happens 100% locally inside your web browser sandbox.' },
              { icon: <Shield size={20} color="#10b981" />, title: 'No Signups Required', desc: 'Zero authentication layers. Get immediate access to CGPA tools, invoices, and chart makers.' },
              { icon: <Cpu size={20} color="#ba9eff" />, title: 'Fast Client Processing', desc: 'Powered by local WebAssembly and JS engines for instant conversions without server wait times.' },
              { icon: <Check size={20} color="#ba9eff" />, title: 'Premium Responsive UI', desc: 'A consistent, unified design system engineered for fast keyboard access and mobile bottom-sheets.' }
            ].map((f, i) => (
              <div key={i} className="card" style={{ padding: '24px 28px', display: 'flex', gap: 16, alignItems: 'flex-start', background: 'rgba(23, 26, 30, 0.3)' }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {f.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-manrope)', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{f.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. STATISTICS DASHBOARD ── */}
      <section style={{ padding: '36px 0', background: 'var(--surface-mid)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px 60px', textAlign: 'center' }}>
          {[
            { value: '40+', label: 'Local Utilities', color: '#ba9eff' },
            { value: '1.2M+', label: 'Charts Generated', color: '#8455ef' },
            { value: '100k+', label: 'Monthly Visitors', color: '#9093ff' },
            { value: '100%', label: 'Local Execution', color: '#40ceed' }
          ].map(stat => (
            <div key={stat.label}>
              <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '2.1rem', fontWeight: 950, color: stat.color, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{stat.value}</p>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 11. CUSTOMER TESTIMONIALS ── */}
      <section className="section" style={{ background: 'rgba(2, 8, 23, 0.1)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="badge" style={{ marginBottom: 14, background: 'rgba(186,158,255,0.08)', color: '#ba9eff', border: '1px solid rgba(186,158,255,0.2)' }}>Reviews</span>
            <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              What Our Users Say
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'rgba(23, 26, 30, 0.3)' }}>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 16px', fontStyle: 'italic' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>
                    {t.avatar}
                  </div>
                  <div>
                    <h5 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>{t.name}</h5>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. LEARNING CENTER / DYNAMIC GUIDES ── */}
      <section className="section" style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span className="badge" style={{ marginBottom: 12, background: 'rgba(186,158,255,0.08)', color: '#ba9eff', border: '1px solid rgba(186,158,255,0.2)' }}>Resources</span>
              <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
                Spreadsheet &amp; Data Guides
              </h2>
            </div>
            <Link href="/learn" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
              Explore Learning Hub
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              { slug: 'how-to-visualize-excel-data', title: 'How to Visualize Excel Data Instantly', desc: 'A step-by-step guide to plotting spreadsheets without writing macro scripts or formulas.', tag: 'Excel' },
              { slug: 'csv-data-visualization-guide', title: 'The Ultimate CSV Data Visualization Guide', desc: 'Learn how to parse comma-separated text files, resolve encoding tags, and render clean line/bar graphs.', tag: 'CSV' },
              { slug: 'pdf-data-visualization-guide', title: 'Extracting and Visualizing Tables from PDF Reports', desc: 'Stop copying tabular details manually. Learn how our browser table extractor parses PDF lines into charts.', tag: 'PDF' }
            ].map(article => (
              <Link key={article.slug} href={`/blog/${article.slug}`} style={{ textDecoration: 'none' }}>
                <div className="glass-card glass-card-hover" style={{ padding: 20, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.62rem', fontWeight: 800, color: 'var(--accent-primary)', background: 'rgba(186,158,255,0.08)', border: '1px solid rgba(186,158,255,0.15)', padding: '2px 8px', borderRadius: 4, display: 'inline-block', marginBottom: 12, textTransform: 'uppercase' }}>
                      {article.tag}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-manrope)', fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.35 }}>
                      {article.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {article.desc}
                    </p>
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent-primary)', marginTop: 16 }}>
                    Read Guide <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13. FAQ ACCORDION ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 780 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="badge" style={{ marginBottom: 14, background: 'rgba(186,158,255,0.08)', color: '#ba9eff', border: '1px solid rgba(186,158,255,0.2)' }}>FAQ</span>
            <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Frequently Asked Questions
            </h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  style={{
                    padding: '18px 24px', borderRadius: 14, border: '1px solid var(--border-subtle)',
                    background: isOpen ? 'rgba(132,85,239,0.03)' : 'var(--bg-glass)',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                    <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{faq.q}</h3>
                    {isOpen ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                  </div>
                  {isOpen && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: 12, marginBottom: 0, lineHeight: 1.6 }}>{faq.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 14. BOTTOM CALL-TO-ACTION (CTA) ── */}
      <section style={{ padding: '80px 0', background: 'var(--surface-low)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '-0.02em' }}>
            Start Visualizing Your Data — Free
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.6 }}>
            Convert Excel, CSV, PDF table data locally inside your web browser. No credit cards, no signups.
          </p>
          <button
            onClick={() => document.getElementById('data-visualizer-suite')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
            style={{ fontSize: '1rem', padding: '14px 36px' }}
          >
            Upload Your File
          </button>
        </div>
      </section>

      {/* ── 15. ABOUT THE PLATFORM (EEAT / AdSense Trust Section) ── */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-low)' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge" style={{ marginBottom: 14, background: 'rgba(16,185,129,0.08)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>About the Platform</span>
            <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
              Built for Privacy. Engineered for Productivity.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginBottom: 48 }}>
            {[
              {
                icon: '🔒',
                title: 'Zero-Server Architecture',
                body: 'Every tool on VisualizeMyData operates entirely inside your browser using Web APIs and client-side JavaScript. Your files are never uploaded to any server, database, or cloud. Processing happens in a sandboxed memory context that is automatically cleared when you close the tab.'
              },
              {
                icon: '🛠️',
                title: 'Built by Engineers, Tested Rigorously',
                body: 'All 40+ tools are designed, coded, and stress-tested by Prabhash Kumar, a full-stack systems engineer focused on privacy-first productivity software. Each tool undergoes accuracy verification, cross-browser compatibility testing, and performance benchmarking before release.'
              },
              {
                icon: '📋',
                title: 'Editorial & Content Standards',
                body: 'Every guide, article, and tool description on this platform follows a strict editorial process. Information is researched from primary sources, verified for technical accuracy, and updated quarterly. We publish our editorial policy and testing methodology transparently.'
              }
            ].map(card => (
              <div key={card.title} className="glass-card" style={{ padding: 24, borderRadius: 16 }}>
                <div style={{ fontSize: '2rem', marginBottom: 14 }}>{card.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>{card.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{card.body}</p>
              </div>
            ))}
          </div>

          <div style={{ padding: 28, borderRadius: 16, border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.01)', display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 300px' }}>
              <h3 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>Who This Platform Is For</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 12px' }}>
                VisualizeMyData is used by data analysts, small business owners, students, finance teams, HR professionals, and developers who need fast, private, and reliable browser-based tools without paying for premium SaaS subscriptions.
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                Whether you need to create a dashboard from an Excel report, compress images for a web project, generate a professional invoice, or validate JSON — every tool is free, instant, and works offline after load.
              </p>
            </div>
            <div style={{ flex: '1 1 240px' }}>
              <h3 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>Transparency & Trust</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'Editorial Policy', href: '/editorial-policy' },
                  { label: 'How We Test Tools', href: '/how-we-test-tools' },
                  { label: 'Content Update Policy', href: '/content-update-policy' },
                  { label: 'Privacy Policy', href: '/privacy-policy' },
                  { label: 'About the Founder', href: '/about' },
                ].map(l => (
                  <a key={l.href} href={l.href} style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', textDecoration: 'underline', fontWeight: 500 }}>
                    → {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <StickyUploadButton />
    </div>
  );
}
