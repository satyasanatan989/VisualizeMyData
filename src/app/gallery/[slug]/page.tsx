import React from 'react';
import { GALLERY_DASHBOARDS, getPublicDashboard } from '@/lib/galleryRegistry';
import PublicDashboardViewer from '@/components/gallery/PublicDashboardViewer';

// Generate static params for SEO-indexed dashboards
export async function generateStaticParams() {
    return GALLERY_DASHBOARDS.map((dash) => ({
        slug: dash.slug,
    }));
}

// Dynamic metadata per dashboard
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const dash = getPublicDashboard(slug);
    if (!dash) {
        return {
            title: 'User Dashboard | VisualizeMyData',
            description: 'A user-generated data dashboard on VisualizeMyData.',
        };
    }
    const url = `https://visualizemydata.in/gallery/${dash.slug}/`;
    return {
        title: dash.seoTitle,
        description: dash.seoDesc,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: dash.seoTitle,
            description: dash.seoDesc,
            url: url,
            type: 'article',
            siteName: 'VisualizeMyData',
            locale: 'en_US',
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: dash.seoTitle,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: dash.seoTitle,
            description: dash.seoDesc,
            images: ['/og-image.png'],
        },
    };
}

export default async function DashboardSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <PublicDashboardViewer slug={slug} />;
}
