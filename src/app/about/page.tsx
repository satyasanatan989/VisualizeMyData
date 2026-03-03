import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import { BarChart2, Shield, Zap, Globe } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About Us – DataVisualizer | Free Online Data Visualization Tool',
    description: 'Learn about DataVisualizer — a free, browser-based tool to visualize Excel, CSV, PDF, and Google Sheets data. Built for privacy and speed.',
};

const VALUES = [
    { icon: <Shield size={22} />, title: 'Privacy First', desc: 'All file processing happens in your browser. Your data never touches our servers.' },
    { icon: <Zap size={22} />, title: 'Instant Results', desc: 'From upload to chart in under 3 seconds. No waiting, no loading screens.' },
    { icon: <Globe size={22} />, title: 'Universal Access', desc: 'Works on any device — desktop, tablet, or mobile. No installation required.' },
    { icon: <BarChart2 size={22} />, title: 'Powerful Visualization', desc: 'Bar, line, area, and pie charts with color customization and full export support.' },
];

export default function AboutPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />

            {/* Hero */}
            <section style={{ padding: '80px 0 60px', textAlign: 'center', background: 'linear-gradient(180deg, rgba(59,130,246,0.06) 0%, transparent 100%)' }}>
                <div className="container" style={{ maxWidth: 700 }}>
                    <div style={{ width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 0 40px rgba(59,130,246,0.3)' }}>
                        <BarChart2 size={30} color="white" />
                    </div>
                    <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 20 }}>
                        About DataVisualizer
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8 }}>
                        DataVisualizer was built with one goal: make data visualization accessible to everyone — regardless of technical skill, budget, or software access. We believe powerful data insights shouldn't require expensive subscriptions or complex software.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="section">
                <div className="container" style={{ maxWidth: 760 }}>
                    <article className="prose">
                        <h2>Our Mission</h2>
                        <p>
                            Millions of people work with data every day — in spreadsheets, PDFs, and Google Sheets — but lack the tools to quickly turn that data into meaningful visuals. Our mission is to bridge that gap with a tool that is fast, free, private, and works directly in the browser without any signup or software installation.
                        </p>
                        <h2>What Makes Us Different</h2>
                        <p>
                            Unlike most data visualization tools, DataVisualizer processes everything directly in your browser. This means:
                        </p>
                        <ul>
                            <li>Your files never leave your device.</li>
                            <li>There is no server to hack, no database to breach.</li>
                            <li>You get results faster because there is no round-trip to a server.</li>
                            <li>It works completely offline once the page is loaded.</li>
                        </ul>
                        <p>
                            We support Excel (.xlsx, .xls), CSV, PDF (with table extraction), and Google Sheets (via public link) — making it the most versatile free data visualization tool available.
                        </p>
                    </article>

                    {/* Values */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginTop: 48 }}>
                        {VALUES.map(v => (
                            <div key={v.title} className="card" style={{ padding: 24 }}>
                                <div style={{ color: '#60a5fa', marginBottom: 12 }}>{v.icon}</div>
                                <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{v.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8375rem', lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
