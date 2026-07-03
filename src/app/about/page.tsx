import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import { BarChart2, Shield, Zap, Globe, Award, Check, User, Mail, Eye } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'About Us & Editorial EEAT Guidelines | VisualizeMyData',
    description: 'Learn about VisualizeMyData (ToolVista) — our privacy promise, founder credentials, editorial policies, content update policies, and tool testing guidelines.',
    alternates: {
        canonical: 'https://visualizemydata.in/about',
    },
    openGraph: {
        title: 'About Us & Editorial EEAT Guidelines | VisualizeMyData',
        description: 'Learn about VisualizeMyData (ToolVista) — our privacy promise, founder credentials, editorial policies, content update policies, and tool testing guidelines.',
        url: 'https://visualizemydata.in/about',
        type: 'website',
        siteName: 'VisualizeMyData',
        locale: 'en_US',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'VisualizeMyData',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Us & Editorial EEAT Guidelines | VisualizeMyData',
        description: 'Learn about VisualizeMyData (ToolVista) — our privacy promise, founder credentials, editorial policies, content update policies, and tool testing guidelines.',
        images: ['/og-image.png'],
    },
};;

const VALUES = [
    { icon: <Shield size={22} />, title: 'Privacy First Policy', desc: 'All file processing happens inside your browser local sandbox. Your data is never transmitted to any external server.' },
    { icon: <Zap size={22} />, title: 'Sub-Second Rendering', desc: 'Powered by local WebAssembly and optimized JavaScript loops. Converts raw sheets to dashboards instantly.' },
    { icon: <Globe size={22} />, title: 'Universal Offline Access', desc: 'Once the page loads, all code runs offline. Works on desktop, mobile, and tablet viewports.' },
    { icon: <BarChart2 size={22} />, title: 'Actionable Reporting', desc: 'Generate line, bar, pie, and area charts dynamically with simple PDF report exports.' },
];

export default function AboutPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <NavbarWrapper />

            {/* Hero */}
            <section style={{ padding: '80px 0 50px', textAlign: 'center', background: 'linear-gradient(180deg, rgba(132,85,239,0.06) 0%, transparent 100%)' }}>
                <div className="container" style={{ maxWidth: 740, margin: '0 auto' }}>
                    <div style={{ width: 60, height: 60, borderRadius: 16, background: 'linear-gradient(135deg, #ba9eff, #8455ef)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 0 30px rgba(186,158,255,0.3)' }}>
                        <BarChart2 size={26} color="white" />
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 18, fontFamily: 'var(--font-manrope)', letterSpacing: '-0.02em' }}>
                        About VisualizeMyData
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8 }}>
                        VisualizeMyData was founded to make data visualization, spreadsheet analysis, and web productivity accessible to everyone—completely free, requiring no signups, and keeping files fully private in-browser.
                    </p>
                </div>
            </section>

            {/* Main Content EEAT Hub */}
            <section className="section" style={{ padding: '20px 0 80px' }}>
                <div className="container" style={{ maxWidth: 780 }}>
                    <article className="prose">
                        
                        {/* 1. About Website & Mission */}
                        <h2>Our Mission &amp; Purpose</h2>
                        <p>
                            Every day, millions of students, business analysts, food quality managers, and developers work with raw spreadsheets, CSV logs, PDFs, and developer syntax. Yet, converting these into actionable visuals or clean configurations often requires expensive corporate software or uploading files to insecure third-party cloud servers.
                        </p>
                        <p>
                            VisualizeMyData offers a fast, zero-installation browser workspace. Our mission is to democratize data storytelling and digital conversion by running 100% of the tools locally inside your browser memory.
                        </p>

                        {/* 2. About Founder */}
                        <div style={{ margin: '40px 0', padding: 24, borderRadius: 16, border: '1px solid var(--border-subtle)', background: 'rgba(186,158,255,0.02)', display: 'flex', gap: 20 }} className="features-grid">
                            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(186,158,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.8rem' }}>
                                👤
                            </div>
                            <div>
                                <h3 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>Prabhdeep Singh</h3>
                                <p style={{ margin: '0 0 10px', fontSize: '0.72rem', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Founder &amp; Senior Product Engineer</p>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                    Prabhdeep Singh is an experienced Full-Stack Developer, SEO Architect, and Information Systems Engineer. He designed and engineered VisualizeMyData with the goal of creating a client-side productivity platform that operates with zero database footprints, ensuring 100% privacy compliance.
                                </p>
                            </div>
                        </div>

                        {/* 3. Vision & Mission */}
                        <h2>Our Long-Term Vision</h2>
                        <p>
                            We envision an internet where working with data is safe and frictionless. By replacing heavy server-side applications with optimized in-browser JavaScript engines, we make data visualization fast and accessible. We believe privacy should not be a premium feature—it should be the default for all online operations.
                        </p>

                        {/* 4. Editorial Policy */}
                        <h2>Editorial &amp; Technical Review Policy</h2>
                        <p>
                            To maintain the highest standards of mathematical and scientific accuracy, all content, guides, and tools hosted on VisualizeMyData undergo strict internal reviews:
                        </p>
                        <ul>
                            <li><strong>Formula Verification:</strong> Every calculator (e.g., GPA converter, Gerber SNF calculations, recipe portioning) is verified against official academic and industrial standards before deployment.</li>
                            <li><strong>No AI Hallucinations:</strong> All articles and guides are written by human experts and cross-checked for accuracy.</li>
                            <li><strong>Continuous Updates:</strong> Tools and libraries (like xlsx, pdfjs, and lucide) are regularly updated to ensure speed and security.</li>
                        </ul>

                        {/* 5. Privacy Promise */}
                        <h2>Privacy Promise &amp; Security Shield</h2>
                        <p>
                            VisualizeMyData operates on a strict zero-database, zero-collection policy. We do not store, view, or parse your uploaded spreadsheets, raw CSV lists, PDF records, or images on any remote server. The files remain temporarily inside your browser sandbox and are automatically cleared from RAM when you close the tab.
                        </p>

                        {/* 6. Content Update Policy */}
                        <h2>Content Update Policy</h2>
                        <p>
                            The digital landscape, web protocols, and educational guidelines change regularly. We review our learning guides, code validators, and converter tools quarterly to ensure they match current standards and remain fully operational.
                        </p>

                        {/* 7. How We Test Tools */}
                        <h2>How We Test Our Utilities</h2>
                        <p>
                            Before a new tool is deployed to the VisualizeMyData catalog:
                        </p>
                        <ol>
                            <li>It undergoes sandboxed local testing across Chrome, Safari, Edge, and Firefox.</li>
                            <li>It is tested with corrupted file inputs to ensure it displays helpful error messages instead of crashing.</li>
                            <li>Performance is measured using Google Lighthouse, targeting scores of 90+ for speed and accessibility.</li>
                        </ol>

                    </article>

                    {/* Platform values grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginTop: 50 }}>
                        {VALUES.map(v => (
                            <div key={v.title} className="card" style={{ padding: 24, background: 'rgba(23, 26, 30, 0.3)' }}>
                                <div style={{ color: 'var(--accent-primary)', marginBottom: 12 }}>{v.icon}</div>
                                <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{v.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 60, paddingTop: 30, borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>
                            VisualizeMyData (ToolVista) · Free Browser Productivity Hub. Established 2025.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
