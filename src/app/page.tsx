import type { Metadata } from 'next';
import HomeView from '@/components/views/HomeView';

export const metadata: Metadata = {
    title: 'ToolVista — Free Online Utility Tools & Data Visualizer',
    description: 'Access 35+ free online utility tools. Upload Excel, CSV, PDF, or Google Sheets to instantly build interactive charts and dashboards. 100% private, client-side, and secure.',
    alternates: {
        canonical: 'https://visualizemydata.in/',
    },
    openGraph: {
        title: 'ToolVista — Free Online Utility Tools & Data Visualizer',
        description: 'Access 35+ free online utility tools. Upload Excel, CSV, PDF, or Google Sheets to instantly build interactive charts and dashboards. 100% private, client-side, and secure.',
        url: 'https://visualizemydata.in/',
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
        title: 'ToolVista — Free Online Utility Tools & Data Visualizer',
        description: 'Access 35+ free online utility tools. Upload Excel, CSV, PDF, or Google Sheets to instantly build interactive charts and dashboards. 100% private, client-side, and secure.',
        images: ['/og-image.png'],
    },
};

export default function Page() {
    return <HomeView />;
}
