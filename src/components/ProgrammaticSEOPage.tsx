import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import DiscoveryLinks from '@/components/DiscoveryLinks';
import Link from 'next/link';

export interface FAQItem {
    q: string;
    a: string;
}

export interface FeatureItem {
    icon: string;
    title: string;
    desc: string;
}

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
    faqs?: FAQItem[];
    features?: FeatureItem[];
    canonicalUrl?: string;
}

const DEFAULT_FEATURES: FeatureItem[] = [
    { icon: '🔒', title: 'Privacy First', desc: 'Your files are processed entirely in your browser — never uploaded to any server.' },
    { icon: '⚡', title: 'Instant Results', desc: 'Charts render within seconds of uploading. No waiting, no loading screen.' },
    { icon: '💾', title: 'Export Anywhere', desc: 'Download charts as high-resolution PNG or print-ready PDF in one click.' },
    { icon: '🎨', title: 'Customizable', desc: 'Switch between bar, line, area, and pie charts. Choose color palettes to match your style.' },
    { icon: '📱', title: 'Works on Any Device', desc: 'Fully responsive — works on desktop, tablet, and mobile. No app download needed.' },
    { icon: '✅', title: '100% Free', desc: 'No signup, no credit card, no limits. Use as many times as you want, forever free.' },
];

export function ProgrammaticSEOPage({
    title, heroTitle, heroSubtitle, toolHref, toolCta,
    accentColor, accentBg, h2, body, steps, related,
    faqs, features, canonicalUrl,
}: ProgrammaticSEOPageProps) {
    const displayFeatures = features ?? DEFAULT_FEATURES;
    const accentBgStrong = accentBg.replace('0.07', '0.15');

    const softwareSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: `VisualizeMyData – ${title}`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript',
        url: canonicalUrl ?? 'https://visualizemydata.in',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        featureList: steps,
    };

    const faqSchema = faqs && faqs.length > 0
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(f => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
        }
        : null;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* Structured data */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            {faqSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            )}

            <NavbarWrapper />

            {/* ── Hero ── */}
            <section style={{ padding: '60px 0 48px', background: `linear-gradient(135deg, ${accentBg}, transparent)` }}>
                <div className="container" style={{ maxWidth: 720, textAlign: 'center' }}>
                    <span style={{
                        display: 'inline-block', padding: '4px 14px', borderRadius: 99,
                        background: accentBgStrong, border: `1px solid ${accentColor}30`,
                        fontSize: '0.7rem', fontWeight: 700, color: accentColor,
                        textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 20,
                    }}>
                        Free Online Tool
                    </span>
                    <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 16 }}>
                        {heroTitle}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 32, maxWidth: 560, margin: '0 auto 32px' }}>
                        {heroSubtitle}
                    </p>
                    <Link href={toolHref} className="btn-primary">{toolCta}</Link>
                    <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginTop: 28 }}>
                        {['✓ 100% Free', '✓ No Signup', '✓ Files Stay in Your Browser'].map(t => (
                            <span key={t} style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>{t}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How It Works + Body ── */}
            <section style={{ padding: '56px 0', borderTop: '1px solid var(--border-subtle)' }}>
                <div className="container" style={{ maxWidth: 760 }}>
                    <div className="prose">
                        <h2>{h2}</h2>
                        <p>{body}</p>
                        <h2>How to Use This Tool</h2>
                        <ol>{steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
                    </div>
                </div>
            </section>

            {/* ── Features Grid ── */}
            <section style={{ padding: '48px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 36 }}>
                        Why Use This Tool?
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                        {displayFeatures.map(f => (
                            <div key={f.title} style={{
                                padding: '20px 24px', borderRadius: 14,
                                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                                display: 'flex', gap: 14, alignItems: 'flex-start',
                            }}>
                                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{f.icon}</span>
                                <div>
                                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4, marginTop: 0 }}>{f.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            {faqs && faqs.length > 0 && (
                <section style={{ padding: '56px 0', borderTop: '1px solid var(--border-subtle)' }}>
                    <div className="container" style={{ maxWidth: 760 }}>
                        <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 32, textAlign: 'center' }}>
                            Frequently Asked Questions
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {faqs.map((faq, i) => (
                                <div key={i} style={{
                                    padding: '20px 24px', borderRadius: 14,
                                    border: '1px solid var(--border-subtle)', background: 'var(--bg-glass)',
                                }}>
                                    <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px' }}>{faq.q}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Related Tools ── */}
            <section style={{ padding: '48px 0 64px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ maxWidth: 760 }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Related Tools</h2>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        {related.map(r => (
                            <Link
                                key={r.href} href={r.href}
                                style={{
                                    padding: '8px 16px', borderRadius: 8,
                                    background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                                    color: accentColor, fontSize: '0.85rem', fontWeight: 600,
                                    textDecoration: 'none', transition: 'border-color 0.2s',
                                }}
                            >
                                → {r.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <DiscoveryLinks />
            <Footer />
        </div>
    );
}
