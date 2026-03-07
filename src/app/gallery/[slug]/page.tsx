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
    return {
        title: dash.seoTitle,
        description: dash.seoDesc,
        openGraph: {
            title: dash.seoTitle,
            description: dash.seoDesc,
            type: 'article',
        },
    };
}

export default async function DashboardSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <PublicDashboardViewer slug={slug} />;
}
