import type { Metadata } from 'next';
import GalleryView from '@/components/views/GalleryView';

export const metadata: Metadata = {
    title: 'Interactive Data Dashboard Examples & Gallery | ToolVista',
    description: 'Explore public, community-generated, and interactive data dashboards built with VisualizeMyData. View ROI calculators, sales reports, financial charts, and student surveys.',
    alternates: {
        canonical: 'https://visualizemydata.in/gallery/',
    },
    openGraph: {
        title: 'Interactive Data Dashboard Examples & Gallery | ToolVista',
        description: 'Explore public, community-generated, and interactive data dashboards built with VisualizeMyData. View ROI calculators, sales reports, financial charts, and student surveys.',
        url: 'https://visualizemydata.in/gallery/',
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
        title: 'Interactive Data Dashboard Examples & Gallery | ToolVista',
        description: 'Explore public, community-generated, and interactive data dashboards built with VisualizeMyData. View ROI calculators, sales reports, financial charts, and student surveys.',
        images: ['/og-image.png'],
    },
};

export default function Page() {
    return <GalleryView />;
}
