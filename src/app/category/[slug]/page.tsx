import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { QUICK_TOOLS, ToolDef } from '@/lib/toolsRegistry';
import { getDynamicSEOContent } from '@/lib/seoGenerator';
import { ArrowRight, Sparkles, Layout, Database, BookOpen, ShieldCheck, HelpCircle } from 'lucide-react';

interface Params {
    slug: string;
}

const CATEGORIES_DATA: Record<string, {
    name: string;
    originalId: string;
    description: string;
    intro: string;
    benefits: string[];
    faqs: { q: string; a: string }[];
    relatedSlugs: string[];
}> = {
    'dashboard-tools': {
        name: 'Dashboard Tools',
        originalId: 'Data Tools',
        description: 'Auto-detect columns, analyze variables, and create comprehensive business dashboards offline.',
        intro: 'Dashboard Tools are designed to help you transform complex data tables, raw database logs, and daily metrics into clear, visual dashboards. By building interactive panels directly in the browser, these tools eliminate the need for complicated database setups, licensing fees, or server deployments. Your private corporate files remain entirely inside your local device memory.',
        benefits: [
            'Instant metric compilation (totals, averages, min, max).',
            'Interactive filters by dates, category labels, or range thresholds.',
            'Multiple side-by-side charts (bar, line, area, and pie).',
            '100% private in-browser client execution.'
        ],
        faqs: [
            { q: 'How does the dashboard builder work offline?', a: 'Once the dashboard page loads, all script compilation and graphic rendering are handled by local React state loops. No data is sent back to a server.' },
            { q: 'Can I export the dashboards?', a: 'Yes. You can export generated dashboards as presentation-ready PDF reports or high-resolution PNG image panels.' }
        ],
        relatedSlugs: ['excel-tools', 'csv-tools', 'google-sheets-tools']
    },
    'excel-tools': {
        name: 'Excel Spreadsheet Tools',
        originalId: 'Excel Tools',
        description: 'Convert Excel files to charts, calculate GPA, and create dashboards without macro configurations.',
        intro: 'Excel spreadsheet tools simplify working with Microsoft Excel files (.xlsx/.xls). Whether you want to convert raw sheets to visual bar graphs or generate advanced mathematical grade averages, these browser utilities execute the parsing processes in-memory using standard client-side JS compilers.',
        benefits: [
            'Reads standard .xlsx and .xls file streams locally.',
            'Automatic numerical and date category detection.',
            'Bypasses Excel macro setups and formula configurations.',
            'Files never upload to third-party servers.'
        ],
        faqs: [
            { q: 'Do I need Excel installed on my device?', a: 'No. The browser parses sheets directly using local library instances. You do not need Microsoft Office installed.' },
            { q: 'What sheet is read in a workbook?', a: 'By default, the converter reads the first sheet in a uploaded workbook file.' }
        ],
        relatedSlugs: ['dashboard-tools', 'csv-tools']
    },
    'csv-tools': {
        name: 'CSV Data Tools',
        originalId: 'CSV Tools',
        description: 'Clean raw comma-separated files, convert values to graphs, and format metrics instantly.',
        intro: 'CSV Data Tools process comma-separated values—the universal standard for databases and software. These browser utilities let you upload, clean, and visualize raw CSV logs without exposure to corporate security leaks.',
        benefits: [
            'Supports standard delimiters (comma, semicolon, tab).',
            'Data cleaner detects empty cells and standardizes headers.',
            'Fast processing for large datasets (up to 50MB).',
            'Generates download links instantly.'
        ],
        faqs: [
            { q: 'What delimit formats are parsed?', a: 'The parser auto-detects commas, semicolons, and tabs. You can also select the delimiter manually.' },
            { q: 'Are my CSV records safe?', a: 'Absolutely. All data parsing executes in-browser, making it ideal for confidential corporate files.' }
        ],
        relatedSlugs: ['excel-tools', 'dashboard-tools']
    },
    'google-sheets-tools': {
        name: 'Google Sheets Integration Tools',
        originalId: 'Google Sheets Tools',
        description: 'Sync public spreadsheet URLs and build interactive, live-updating dashboards offline.',
        intro: 'Google Sheets Integration tools allow you to connect public spreadsheets directly to local visualization components. Instead of manual exporting, paste a link to sync and plot your metrics in real-time.',
        benefits: [
            'Live spreadsheet sync via fetch APIs.',
            'Maintains standard data ranges and date columns.',
            'Zero credentials required (requires public link sharing).',
            'Fast rendering on change refreshes.'
        ],
        faqs: [
            { q: 'How do I share a Google Sheet?', a: 'In Google Sheets, click Share, select "Anyone with the link can view", and copy the browser URL.' },
            { q: 'Does the tool edit my Google Sheet?', a: 'No. The integration is read-only, ensuring no accidental modifications to your sheets.' }
        ],
        relatedSlugs: ['dashboard-tools', 'excel-tools']
    },
    'image-tools': {
        name: 'Image Processing Tools',
        originalId: 'Image Tools',
        description: 'Compress, crop, rotate, and convert WEBP, JPG, and PNG files offline.',
        intro: 'Image Processing tools let you optimize your digital assets for web performance. Compress, crop, rotate, and convert graphic files locally using standard browser canvas layers.',
        benefits: [
            'Zero quality degradation on lossless formats.',
            'Real-time compression size previews.',
            'Processes files locally in milliseconds.',
            'Maintains alpha-channel transparency.'
        ],
        faqs: [
            { q: 'How does the image compressor work locally?', a: 'It utilizes HTML5 canvas rendering contexts to compress pixels and outputs base64 arrays in-browser.' },
            { q: 'Does it support bulk conversion?', a: 'You can convert and optimize images one-by-one instantly, getting downloads in less than a second.' }
        ],
        relatedSlugs: ['pdf-tools', 'developer-tools']
    },
    'pdf-tools': {
        name: 'PDF Workspace Tools',
        originalId: 'PDF Tools',
        description: 'Extract tabular details from PDF files, convert tables to graphs, and split files locally.',
        intro: 'PDF Workspace Tools let you extract and visualize tables from PDF reports without copy-pasting. Split, extract, and convert documents locally in your browser.',
        benefits: [
            'Auto-extracts tabular grids from PDF pages.',
            'Visual preview layer for document validation.',
            'No file data is transmitted online.',
            'Outputs clean bar/line charts from PDF values.'
        ],
        faqs: [
            { q: 'What happens if a PDF has no tables?', a: 'The tool falls back to a preview layout so you can read and manage the document page.' },
            { q: 'Is there a page limit for extraction?', a: 'We support PDF uploads up to 25MB, and extraction is processed in seconds depending on your device.' }
        ],
        relatedSlugs: ['image-tools', 'business-tools']
    },
    'developer-tools': {
        name: 'Developer Utilities',
        originalId: 'Developer Tools',
        description: 'Validator compilers, JSON formatters, base64 converters, and regex check environments.',
        intro: 'Developer Utilities are designed for software engineers and systems administrators. Format JSON, generate UUIDs, encode URLs, and validate regex patterns locally.',
        benefits: [
            'Validates syntax error coordinates instantly.',
            'Safe formatting for production credentials.',
            'Sub-second local computation speeds.',
            'Offline support once loaded.'
        ],
        faqs: [
            { q: 'Are my developer inputs secure?', a: 'Yes. All data remains in your local browser sandbox, preventing credentials or keys from leaking.' },
            { q: 'Can I format nested JSON blocks?', a: 'Yes. The formatter recursively tree-parses JSON and renders expandable indent nodes.' }
        ],
        relatedSlugs: ['image-tools', 'shareable-tools']
    },
    'business-tools': {
        name: 'Business Administration Tools',
        originalId: 'Business Tools',
        description: 'Draft professional invoices, signature cards, and certificates offline.',
        intro: 'Business Administration Tools simplify corporate document creation. Draft, sign, and print invoices, quotations, and business cards locally using clean CSS layouts.',
        benefits: [
            'Print-ready PDF exports with proper margins.',
            'Custom branding and local logo uploads.',
            'Interactive signature drawing pad.',
            'Saves preferences in localStorage.'
        ],
        faqs: [
            { q: 'Are my signatures secure?', a: 'Yes. The signature pad draws on a local canvas element. No image data is sent to a server.' },
            { q: 'Can I customize tax rates on invoices?', a: 'Yes. The tool features customizable tax rates, discounts, and currency settings.' }
        ],
        relatedSlugs: ['pdf-tools', 'student-tools']
    },
    'student-tools': {
        name: 'Student Productivity Tools',
        originalId: 'Student Tools',
        description: 'Calculate GPA scores, manage Pomodoro intervals, and build print resumes locally.',
        intro: 'Student Productivity tools help you stay organized and manage grades. Calculate CGPA, build resumes, and set study timers offline without distraction.',
        benefits: [
            'Calculates grades using standard international scales.',
            'Saves resume data locally in your browser.',
            'Print-ready PDF formatting.',
            'Offline study timer integration.'
        ],
        faqs: [
            { q: 'Does the GPA tool support percentage conversions?', a: 'Yes. It converts between GPA, CGPA, and percentage metrics.' },
            { q: 'Are my resume drafts saved?', a: 'Yes, drafts are cached in your browser\'s localStorage for future updates.' }
        ],
        relatedSlugs: ['business-tools', 'shareable-tools']
    },
    'food-science-tools': {
        name: 'Food Technology Tools',
        originalId: 'Food Technology',
        description: 'Gerber fat Milk SNF calculators, recipe scaling math, and packaging label generators.',
        intro: 'Food Technology tools are built for quality control managers and product developers. Calculate Milk SNF, scale recipes, and generate FDA-compliant nutrition panels locally.',
        benefits: [
            'Standard biochemical equations for titration and Gerber calculations.',
            'Scales recipes proportionally by batch size.',
            'Generates print-ready FDA nutrition fact panels.',
            'No server dependencies.'
        ],
        faqs: [
            { q: 'What formula is used for Milk SNF?', a: 'It uses the standard Indian Dairy Association formula: SNF = (CLR/4) + (0.21 * Fat %) + 0.36.' },
            { q: 'Are the nutrition panels FDA-compliant?', a: 'Yes. The layout matches standard FDA packaging guidelines.' }
        ],
        relatedSlugs: ['business-tools', 'developer-tools']
    }
};

export async function generateStaticParams() {
    return Object.keys(CATEGORIES_DATA).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { slug } = await params;
    const cat = CATEGORIES_DATA[slug];

    if (!cat) {
        return {
            title: 'Category Not Found | VisualizeMyData',
            description: 'The requested category of tools was not found.',
        };
    }

    return {
        title: {
            absolute: `${cat.name} – Free Browser-Based Utilities | VisualizeMyData`,
        },
        description: cat.description,
        alternates: {
            canonical: `https://visualizemydata.in/category/${slug}/`,
        },
        openGraph: {
            title: `${cat.name} – Free Browser-Based Utilities`,
            description: cat.description,
            url: `https://visualizemydata.in/category/${slug}/`,
            type: 'website',
            siteName: 'VisualizeMyData',
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: cat.name,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${cat.name} – Free Browser-Based Utilities`,
            description: cat.description,
            images: ['/og-image.png'],
        },
    };
}

export default async function CategorySlugPage({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const cat = CATEGORIES_DATA[slug];

    if (!cat) {
        notFound();
    }

    // Filter tools matching category originalId
    const matchingTools = [
        ...QUICK_TOOLS.map(t => ({ ...t, href: `/tools/${t.slug}` })),
        { slug: 'excel-visualizer', name: 'Excel Data Visualizer', description: 'Upload Excel files (.xlsx/.xls) to instantly build interactive dashboards and charts.', category: 'Data Tools', icon: 'FileText', badge: 'POPULAR', href: '/excel-visualizer' },
        { slug: 'csv-visualizer', name: 'CSV Data Visualizer', description: 'Convert CSV files to charts, clean data, and export dashboards offline.', category: 'Data Tools', icon: 'FileText', badge: 'POPULAR', href: '/csv-visualizer' },
        { slug: 'pdf-visualizer', name: 'PDF Table Extractor & Visualizer', description: 'Extract tabular data from PDF files and convert them to interactive graphs.', category: 'Data Tools', icon: 'FileText', badge: 'POPULAR', href: '/pdf-visualizer' },
        { slug: 'google-sheets-visualizer', name: 'Google Sheets Live Visualizer', description: 'Paste a public Google Sheets link to sync and plot data dynamically.', category: 'Data Tools', icon: 'Globe', badge: 'FREE', href: '/google-sheets-visualizer' },
        { slug: 'multi-chart-generator', name: 'Multi-Chart Dashboard Generator', description: 'Plot multiple metrics on various charts in a side-by-side dashboard.', category: 'Data Tools', icon: 'Layout', badge: 'NEW', href: '/multi-chart-generator' },
        { slug: 'dashboard-generator', name: 'Interactive Dashboard Builder', description: 'Auto-detect columns, categorize data, and build comprehensive analytical reports.', category: 'Data Tools', icon: 'Layout', badge: 'POPULAR', href: '/dashboard-generator' }
    ].filter(tool => {
        if (cat.originalId === 'Data Tools') {
            return tool.category === 'Data Tools' || tool.category === 'Excel Tools' || tool.category === 'CSV Tools';
        }
        return tool.category === cat.originalId;
    });

    // Category FAQ System (10 detailed, schema-enabled FAQs)
    const categoryFaqs = [
        {
            q: `What is the primary purpose of the ${cat.name} category?`,
            a: `The ${cat.name} category provides a suite of high-performance, browser-based applications designed to process local files, compile data structures, format code, and generate visual reports. These tools eliminate the need for complicated database setups, licensing fees, or server deployments.`
        },
        {
            q: `How do these ${cat.name} process files and parameters offline?`,
            a: `Once you open the tools in this category, their underlying scripts are fully cached in your browser. All spreadsheet parsing, canvas manipulations, and mathematical computations are handled locally in-memory using JavaScript client-side APIs, requiring no internet connection.`
        },
        {
            q: `Are my private corporate records secure when using ${cat.name}?`,
            a: `Yes. VisualizeMyData operates a strict zero-upload, zero-server policy. All records are processed inside your browser's sandboxed memory and are immediately cleared when you close the browser tab. Your files never travel across the network.`
        },
        {
            q: `Do I need to sign up or pay to use the tools under ${cat.name}?`,
            a: `No. All tools in the ${cat.name} ecosystem are 100% free with no registration, email requirements, or premium paywalls.`
        },
        {
            q: `Can I download or export the visualizations built with these tools?`,
            a: `Yes. You can export dashboards as presentation-ready PDF reports or high-resolution PNG image panels. Spreadsheets and code utilities allow downloading cleaned standard CSV, XLSX, or formatted text files directly to your device.`
        },
        {
            q: `What is the maximum file size that these local browser tools can handle?`,
            a: `Since computations happen in your browser memory, the maximum size depends on your machine's physical RAM. For the smoothest experience, we recommend uploading spreadsheets or documents under 50MB.`
        },
        {
            q: `Are the spreadsheet exports compatible with standard office suites?`,
            a: `Yes. Spreadsheet-derived utilities export standard CSV and XLSX files that are fully readable by Microsoft Excel, Google Sheets, Apple Numbers, and LibreOffice.`
        },
        {
            q: `How do client-side utilities help with GDPR and regulatory compliance?`,
            a: `By eliminating data transmission. Since no personal identifiable information (PII) or files are uploaded to third-party databases, using our local sandbox keeps your organization fully compliant with GDPR, HIPAA, and corporate security guidelines.`
        },
        {
            q: `What should I do if a tool in the ${cat.name} category fails to parse my document?`,
            a: `Ensure your document is not corrupted and conforms to the supported file formats (e.g. valid .csv, .xlsx, or .pdf). Check for missing headers or nested column structures. You can send pre-filled bug emails using the links on the tool pages.`
        },
        {
            q: `How often are the tools in this category updated?`,
            a: `We update our utilities regularly to optimize parsing speeds, add chart types, and support modern browser engine formats. All updates are pushed directly to our serverless static front-end.`
        }
    ];

    // Category Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://visualizemydata.in"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Categories",
                "item": "https://visualizemydata.in/tools"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": cat.name,
                "item": `https://visualizemydata.in/category/${slug}`
            }
        ]
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "VisualizeMyData",
        "url": "https://visualizemydata.in",
        "logo": "https://visualizemydata.in/logo.png"
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

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": categoryFaqs.map((faq) => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <NavbarWrapper />

            {/* Category Hero */}
            <section style={{ padding: '70px 0 50px', position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, rgba(132,85,239,0.06) 0%, transparent 100%)' }}>
                <div className="container" style={{ position: 'relative', maxWidth: 780, textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', background: 'rgba(132,85,239,0.08)', border: '1px solid rgba(132,85,239,0.15)', borderRadius: 99, marginBottom: 20 }}>
                        <Layout size={12} color="#ba9eff" />
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#cdcdff', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Visual Solutions Category</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 16, fontFamily: 'var(--font-manrope)', letterSpacing: '-0.02em' }}>
                        {cat.name}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 640, margin: '0 auto' }}>
                        {cat.intro}
                    </p>
                </div>
            </section>

            {/* Main Category Workspace: Best Tools Grid */}
            <section style={{ paddingBottom: 60 }}>
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                        <Sparkles size={16} color="var(--accent-primary)" />
                        <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, fontFamily: 'var(--font-manrope)' }}>Best Free Browser Tools in {cat.name}</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                        {matchingTools.map(tool => (
                            <Link key={tool.slug} href={tool.href} style={{ textDecoration: 'none' }}>
                                <div className="glass-card glass-card-hover" style={{ padding: 22, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--border-subtle)', background: 'rgba(23, 26, 30, 0.35)', borderRadius: 16 }}>
                                    <div>
                                        <h3 style={{ fontFamily: 'var(--font-manrope)', fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px' }}>{tool.name}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>{tool.description}</p>
                                    </div>
                                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent-primary)', marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 4 }}>Open Tool <ArrowRight size={11} /></span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Block */}
            <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-low)' }}>
                <div className="container" style={{ maxWidth: 780 }}>
                    <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Database size={16} color="var(--accent-primary)" /> Key Benefits of Using Our Local Browser Tools
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="features-grid">
                        {cat.benefits.map((benefit, idx) => (
                            <div key={idx} style={{ padding: 20, background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-subtle)', borderRadius: 12, display: 'flex', gap: 12 }}>
                                <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 1: Detailed Overview (Technical SEO Copy expansion for 1500+ words target) */}
            <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-mid)' }}>
                <div className="container" style={{ maxWidth: 780 }}>
                    <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>
                        Comprehensive Guide to {cat.name}
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
                        In the modern digital workspace, professionals, students, and businesses handle massive volumes of proprietary data daily. Traditionally, converting or visualizing these datasets required uploading documents to cloud-based servers. However, this introduces substantial security vulnerabilities, exposure of sensitive intellectual property, and network latency. The <strong>{cat.name}</strong> collection solves this challenge by implementing a serverless, client-side execution framework.
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
                        By leveraging advanced browser compilers and standard Web APIs, these utilities read your input parameters and file streams directly into your device's local memory (RAM). This ensures that your files never travel across the internet, protecting you from data breaches and third-party trackers. Once loaded, the utilities are completely self-contained, offering sub-second render speeds and stable offline operations.
                    </p>
                </div>
            </section>

            {/* Section 2: How It Works */}
            <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-subtle)' }}>
                <div className="container" style={{ maxWidth: 780 }}>
                    <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>
                        Technical Specifications &amp; In-Browser Execution
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
                        Our local processing engine uses specialized JavaScript parsers (such as PapaParse for CSV streams, SheetJS for binary Excel files, and pdf-lib for document manipulation) to decode data structures in real-time. Because the computations bypass server round-trips, the performance of <strong>{cat.name}</strong> scales with your local machine's processing power.
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
                        When you upload a file in this category, the browser initiates a standard File Reader thread that parses the raw bytes into structured JSON arrays in-memory. For graphics and image formatting, HTML5 Canvas rendering contexts compress pixels locally, ensuring instant conversions without compromise.
                    </p>
                </div>
            </section>

            {/* Section 3: Privacy & Security Standards */}
            <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-low)' }}>
                <div className="container" style={{ maxWidth: 780 }}>
                    <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>
                        Privacy Shield &amp; Regulatory Compliance
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
                        VisualizeMyData is built with a privacy-first posture. Organizations handling financial charts, personal student grades, or proprietary industrial recipes face strict regulatory compliance frameworks, including GDPR, HIPAA, and corporate data protection policies.
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
                        Since the tools in the <strong>{cat.name}</strong> category do not create database logs, compile cookies, or upload records, they are completely safe to use within secure corporate networks. Your files remain on your local disk, and all cache memory is cleared as soon as the browser tab is closed.
                    </p>
                </div>
            </section>

            {/* FAQs section */}
            <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-subtle)' }}>
                <div className="container" style={{ maxWidth: 780 }}>
                    <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 30, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <HelpCircle size={16} color="var(--accent-primary)" /> Category FAQs
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {categoryFaqs.map((faq, idx) => (
                            <div key={idx} style={{ padding: '18px 24px', borderRadius: 14, border: '1px solid var(--border-subtle)', background: 'var(--bg-glass)' }}>
                                <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px' }}>{faq.q}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', margin: 0, lineHeight: 1.6 }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cross Navigation Chips (Phase 5 internal linking) */}
            <section style={{ padding: '40px 0', borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-mid)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 16 }}>Related Tool Categories</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                        {cat.relatedSlugs.map(relSlug => {
                            const relCat = CATEGORIES_DATA[relSlug];
                            if (!relCat) return null;
                            return (
                                <Link key={relSlug} href={`/category/${relSlug}`} style={{
                                    display: 'inline-flex', alignItems: 'center',
                                    padding: '8px 16px', borderRadius: 10, border: '1px solid var(--border-subtle)',
                                    background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)',
                                    fontSize: '0.8rem', textDecoration: 'none', transition: 'all 0.2s'
                                }} className="glass-card-hover">
                                    {relCat.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
