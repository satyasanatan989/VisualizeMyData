import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface ProgrammaticSEOPageProps {
    title: string;
    heroTitle: string;
    heroSubtitle: string;
    toolHref: string;
    toolCta: string;
    accentColor: string;
    accentBg: string;
    h2: string;
    body: string;
    steps: string[];
    related: { label: string; href: string }[];
}

export function ProgrammaticSEOPage({
    title, heroTitle, heroSubtitle, toolHref, toolCta,
    accentColor, accentBg, h2, body, steps, related,
}: ProgrammaticSEOPageProps) {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />
            <section style={{ padding: '60px 0 40px', background: `linear-gradient(135deg, ${accentBg}, transparent)` }}>
                <div className="container" style={{ maxWidth: 720, textAlign: 'center' }}>
                    <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 99, background: `${accentBg.replace('0.07', '0.15')}`, border: `1px solid ${accentColor}30`, fontSize: '0.7rem', fontWeight: 700, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 20 }}>
                        Free Online Tool
                    </span>
                    <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 16 }}>
                        {heroTitle}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 32, maxWidth: 560, margin: '0 auto 32px' }}>
                        {heroSubtitle}
                    </p>
                    <Link href={toolHref} className="btn-primary">{toolCta}</Link>
                </div>
            </section>

            <section style={{ padding: '56px 0', borderTop: '1px solid var(--border-subtle)' }}>
                <div className="container" style={{ maxWidth: 760 }}>
                    <div className="prose">
                        <h2>{h2}</h2>
                        <p>{body}</p>
                        <h2>How to Use This Tool</h2>
                        <ol>{steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
                        <h2>Related Tools</h2>
                        <ul>{related.map(r => <li key={r.href}><Link href={r.href}>→ {r.label}</Link></li>)}</ul>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
