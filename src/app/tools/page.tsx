import type { Metadata } from 'next';
import ToolsCatalogView from '@/components/views/ToolsCatalogView';

export const metadata: Metadata = {
    title: 'Complete Online Utility Tools Catalog | ToolVista',
    description: 'Browse and search our directory of 30+ free online utility tools. Includes Image, PDF, Text, Developer, and Calculator tools — 100% free and secure.',
    alternates: {
        canonical: 'https://visualizemydata.in/tools/',
    },
    openGraph: {
        title: 'Complete Online Utility Tools Catalog | ToolVista',
        description: 'Browse and search our directory of 30+ free online utility tools. Includes Image, PDF, Text, Developer, and Calculator tools — 100% free and secure.',
        url: 'https://visualizemydata.in/tools/',
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
        title: 'Complete Online Utility Tools Catalog | ToolVista',
        description: 'Browse and search our directory of 30+ free online utility tools. Includes Image, PDF, Text, Developer, and Calculator tools — 100% free and secure.',
        images: ['/og-image.png'],
    },
};

export default function Page() {
    return <ToolsCatalogView />;
}
