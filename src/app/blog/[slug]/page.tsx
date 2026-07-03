import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getBlogArticle, BLOG_REGISTRY } from '@/lib/blogRegistry';
import { Clock, User, Check, ArrowRight, Sparkles, BookOpen, Lock, Shield } from 'lucide-react';

interface Params {
    slug: string;
}

const requestedSlugs = [
    'how-to-create-professional-dashboards',
    'best-excel-dashboard-templates',
    'data-visualization-best-practices',
    'bar-chart-vs-line-chart',
    'dashboard-design-principles',
    'excel-tips',
    'google-sheets-guide',
    'csv-guide',
    'data-cleaning-guide',
    'image-optimization-guide',
    'pdf-workflow-guide',
    'developer-utilities-guide'
];

export async function generateStaticParams() {
    return requestedSlugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { slug } = await params;
    const article = getBlogArticle(slug);

    if (!article) {
        return {
            title: 'Article Not Found | VisualizeMyData Blog',
            description: 'The requested educational guide was not found.',
        };
    }

    return {
        title: {
            absolute: `${article.title} | VisualizeMyData Blog`,
        },
        description: article.description,
        alternates: {
            canonical: `https://visualizemydata.in/blog/${article.slug}/`,
        },
        openGraph: {
            title: article.title,
            description: article.description,
            url: `https://visualizemydata.in/blog/${article.slug}/`,
            type: 'article',
            siteName: 'VisualizeMyData',
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.description,
            images: ['/og-image.png'],
        },
    };
}

export default async function BlogSlugPage({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const article = getBlogArticle(slug);

    if (!article) {
        notFound();
    }

    // JSON-LD Article Schema
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": article.title,
        "description": article.description,
        "datePublished": "2026-07-03T00:00:00Z",
        "dateModified": "2026-07-03T00:00:00Z",
        "author": {
            "@type": "Person",
            "name": "Prabhdeep Singh",
            "url": "https://visualizemydata.in/about"
        },
        "publisher": {
            "@type": "Organization",
            "name": "VisualizeMyData",
            "logo": {
                "@type": "ImageObject",
                "url": "https://visualizemydata.in/og-image.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://visualizemydata.in/blog/${article.slug}/`
        }
    };

    // FAQ schema
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": article.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    // Breadcrumb schema
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
                "name": "Blog",
                "item": "https://visualizemydata.in/blog"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": article.title,
                "item": `https://visualizemydata.in/blog/${article.slug}`
            }
        ]
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <NavbarWrapper />

            <article style={{ padding: '56px 0 80px' }}>
                <div className="container" style={{ maxWidth: 780 }}>
                    
                    {/* Back link */}
                    <div style={{ marginBottom: 32 }}>
                        <Link href="/blog" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }} className="glass-card-hover">
                            ← Back to Blog
                        </Link>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', background: 'rgba(186,158,255,0.08)', border: '1px solid rgba(186,158,255,0.15)', borderRadius: 99, fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-primary)', marginLeft: 12 }}>
                            {article.category}
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 16, fontFamily: 'var(--font-manrope)', letterSpacing: '-0.02em' }}>
                        {article.title}
                    </h1>

                    {/* EEAT Author / Time block */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 40, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 16, alignItems: 'center' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><User size={12} /> By Prabhdeep Singh (Founder)</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Check size={12} color="#10b981" /> Peer Reviewed for Accuracy</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {article.readTime}</span>
                    </div>

                    <div className="prose">
                        {/* Introduction */}
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-primary)', marginBottom: 30 }}>
                            {article.intro}
                        </p>

                        {/* Article body sections */}
                        {article.sections.map((sec, idx) => (
                            <div key={idx} style={{ marginBottom: 36 }}>
                                <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: 32, marginBottom: 12 }}>
                                    {sec.heading}
                                </h2>
                                <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                                    {sec.content}
                                </p>
                            </div>
                        ))}

                        {/* Practical Examples */}
                        {article.examples.length > 0 && (
                            <div style={{ margin: '40px 0', padding: 24, borderRadius: 16, background: 'rgba(23,26,30,0.4)', border: '1px solid var(--border-subtle)' }}>
                                <h3 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Sparkles size={16} color="var(--accent-primary)" /> Practical Visualization Examples
                                </h3>
                                {article.examples.map((ex, idx) => (
                                    <div key={idx} style={{ marginBottom: 20 }}>
                                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{ex.title}</h4>
                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.2)', padding: 12, borderRadius: 10, fontFamily: 'monospace', marginBottom: 6, lineHeight: 1.5 }}>
                                            <strong>Input Data:</strong> {ex.input}<br />
                                            <strong>Output Visual:</strong> {ex.output}
                                        </div>
                                        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>{ex.analysis}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* FAQ Block */}
                        <div style={{ marginTop: 48, borderTop: '1px solid var(--border-subtle)', paddingTop: 32 }}>
                            <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24 }}>
                                Frequently Asked Questions
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {article.faqs.map((faq, idx) => (
                                    <div key={idx} style={{ padding: 20, borderRadius: 14, background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-subtle)' }}>
                                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{faq.question}</h4>
                                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Conclusion */}
                        <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>
                            Conclusion
                        </h2>
                        <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--text-secondary)', marginBottom: 40 }}>
                            {article.conclusion}
                        </p>

                        {/* Cross-linking navigation blocks (Phase 5 internal linking) */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, borderTop: '1px solid var(--border-subtle)', paddingTop: 40, marginTop: 40 }} className="features-grid">
                            {/* Related Guides */}
                            <div style={{ padding: 20, background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-subtle)', borderRadius: 14 }}>
                                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <BookOpen size={13} color="var(--accent-primary)" /> Related Guides
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {article.relatedGuides.map(g => (
                                        <Link key={g.slug} href={`/blog/${g.slug}`} style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', textDecoration: 'underline' }}>
                                            {g.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Try Related Tools */}
                            <div style={{ padding: 20, background: 'rgba(16,185,129,0.01)', border: '1px solid rgba(16,185,129,0.12)', borderRadius: 14 }}>
                                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <Lock size={13} color="#10b981" /> Try Free Tools
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {article.relatedTools.map(t => (
                                        <Link key={t.slug} href={t.slug.includes('-visualizer') || t.slug === 'dashboard-generator' ? `/${t.slug}` : `/tools/${t.slug}`} style={{ fontSize: '0.8rem', color: '#10b981', textDecoration: 'underline' }}>
                                            Use {t.name} (100% Local) →
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </article>
            
            <style>{`
                p { margin-bottom: 16px; }
            `}</style>

            <Footer />
        </div>
    );
}
