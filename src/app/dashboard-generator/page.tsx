import type { Metadata } from 'next';
import DashboardGeneratorView from '@/components/views/DashboardGeneratorView';

export const metadata: Metadata = {
    title: 'Free Interactive Data Dashboard Builder & Generator Online | ToolVista',
    description: 'Upload Excel, CSV, PDF, or Google Sheets and instantly generate interactive analytical dashboards with KPI cards, charts, and statistics. Free, secure, client-side.',
    alternates: {
        canonical: 'https://visualizemydata.in/dashboard-generator/',
    },
    openGraph: {
        title: 'Free Interactive Data Dashboard Builder & Generator Online | ToolVista',
        description: 'Upload Excel, CSV, PDF, or Google Sheets and instantly generate interactive analytical dashboards with KPI cards, charts, and statistics. Free, secure, client-side.',
        url: 'https://visualizemydata.in/dashboard-generator/',
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
        title: 'Free Interactive Data Dashboard Builder & Generator Online | ToolVista',
        description: 'Upload Excel, CSV, PDF, or Google Sheets and instantly generate interactive analytical dashboards with KPI cards, charts, and statistics. Free, secure, client-side.',
        images: ['/og-image.png'],
    },
};

export default function Page() {
    return <DashboardGeneratorView />;
}
