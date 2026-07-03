import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import ToolClientRenderer from '@/components/tools/ToolClientRenderer';
import { QUICK_TOOLS, getToolBySlug } from '@/lib/toolsRegistry';
import { getDynamicSEOContent } from '@/lib/seoGenerator';

interface Params {
    slug: string;
}

// Statically generate all quick tool routes during build
export async function generateStaticParams() {
    return QUICK_TOOLS.map((t) => ({
        slug: t.slug,
    }));
}

// Dynamically generate metadata per tool
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { slug } = await params;
    const tool = getToolBySlug(slug);

    if (!tool) {
        return {
            title: 'Tool Not Found | VisualizeMyData',
            description: 'The requested utility tool was not found.',
        };
    }

    const seoData = getDynamicSEOContent(slug);
    const title = seoData.seoTitle;
    const desc = seoData.seoDescription;

    return {
        title: {
            absolute: title,
        },
        description: desc,
        alternates: {
            canonical: `https://visualizemydata.in/tools/${tool.slug}/`,
        },
        openGraph: {
            title,
            description: desc,
            url: `https://visualizemydata.in/tools/${tool.slug}/`,
            type: 'website',
            siteName: 'VisualizeMyData',
            locale: 'en_US',
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: desc,
            images: ['/og-image.png'],
        },
    };
}

export default async function ToolSlugPage({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const tool = getToolBySlug(slug);

    if (!tool) {
        notFound();
    }

    const seoData = getDynamicSEOContent(slug);

    // 1. SoftwareApplication Schema
    const softwareAppSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': tool.name,
        'operatingSystem': 'All',
        'applicationCategory': seoData.applicationCategory,
        'browserRequirements': 'Requires JavaScript. Requires HTML5.',
        'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD',
        },
        'description': seoData.seoDescription,
    };

    // 2. FAQPage Schema
    const faqSchema = seoData.faqs && seoData.faqs.length > 0 ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': seoData.faqs.map((faq: { question: string; answer: string }) => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer,
            },
        })),
    } : null;

    // 3. BreadcrumbList Schema
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://visualizemydata.in',
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Tools',
                'item': 'https://visualizemydata.in/tools',
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": tool.category,
                "item": `https://visualizemydata.in/category/${tool.category.toLowerCase().replace(' ', '-')}`
            },
            {
                '@type': 'ListItem',
                'position': 4,
                'name': tool.name,
                'item': `https://visualizemydata.in/tools/${tool.slug}`,
            },
        ],
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* Inject JSON-LD Schema Markups */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <NavbarWrapper />
            
            <main>
                <ToolClientRenderer tool={tool} />
            </main>

            <Footer />
        </div>
    );
}
