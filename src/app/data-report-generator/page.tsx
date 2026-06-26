import type { Metadata } from 'next';
import DataReportGeneratorView from '@/components/views/DataReportGeneratorView';

export const metadata: Metadata = {
    title: 'Free Automatic Data Report Generator Online | ToolVista',
    description: 'Convert spreadsheet data (Excel, CSV, Google Sheets, PDF) into structured analytical reports with summarizations, charts, and key statistical insights in seconds. 100% secure client-side execution.',
    alternates: {
        canonical: 'https://visualizemydata.in/data-report-generator/',
    },
    openGraph: {
        title: 'Free Automatic Data Report Generator Online | ToolVista',
        description: 'Convert spreadsheet data (Excel, CSV, Google Sheets, PDF) into structured analytical reports with summarizations, charts, and key statistical insights in seconds. 100% secure client-side execution.',
        url: 'https://visualizemydata.in/data-report-generator/',
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
        title: 'Free Automatic Data Report Generator Online | ToolVista',
        description: 'Convert spreadsheet data (Excel, CSV, Google Sheets, PDF) into structured analytical reports with summarizations, charts, and key statistical insights in seconds. 100% secure client-side execution.',
        images: ['/og-image.png'],
    },
};

export default function Page() {
    return <DataReportGeneratorView />;
}
