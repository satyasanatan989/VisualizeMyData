import type { Metadata } from 'next';
import MultiChartGeneratorView from '@/components/views/MultiChartGeneratorView';

export const metadata: Metadata = {
    title: 'Advanced Multi-Chart Dashboard Generator Online | ToolVista',
    description: 'Upload Excel, CSV, PDF, or Google Sheets and compare multiple columns side-by-side using scatter plots, radar charts, histograms, bar, line, and pie charts. Build advanced charts client-side.',
    alternates: {
        canonical: 'https://visualizemydata.in/multi-chart-generator/',
    },
    openGraph: {
        title: 'Advanced Multi-Chart Dashboard Generator Online | ToolVista',
        description: 'Upload Excel, CSV, PDF, or Google Sheets and compare multiple columns side-by-side using scatter plots, radar charts, histograms, bar, line, and pie charts. Build advanced charts client-side.',
        url: 'https://visualizemydata.in/multi-chart-generator/',
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
        title: 'Advanced Multi-Chart Dashboard Generator Online | ToolVista',
        description: 'Upload Excel, CSV, PDF, or Google Sheets and compare multiple columns side-by-side using scatter plots, radar charts, histograms, bar, line, and pie charts. Build advanced charts client-side.',
        images: ['/og-image.png'],
    },
};

export default function Page() {
    return <MultiChartGeneratorView />;
}
