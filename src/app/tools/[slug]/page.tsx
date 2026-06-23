import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import ToolClientRenderer from '@/components/tools/ToolClientRenderer';
import { QUICK_TOOLS, getToolBySlug } from '@/lib/toolsRegistry';

interface Params {
    slug: string;
}

// Statically generate all 29 tool routes during build
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

    const title = `${tool.name} – Free Online Utility Tool | VisualizeMyData`;
    const desc = `${tool.description} Fast, secure, and 100% client-side. No signups, no database, files never leave your device.`;

    return {
        title,
        description: desc,
        alternates: {
            canonical: `https://visualizemydata.in/tools/${tool.slug}/`,
        },
        openGraph: {
            title,
            description: desc,
            url: `https://visualizemydata.in/tools/${tool.slug}/`,
            type: 'website',
        },
    };
}

export default async function ToolSlugPage({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const tool = getToolBySlug(slug);

    if (!tool) {
        notFound();
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />
            
            <main>
                <ToolClientRenderer tool={tool} />
            </main>

            <Footer />
        </div>
    );
}
