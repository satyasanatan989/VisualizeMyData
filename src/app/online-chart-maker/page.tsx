import type { Metadata } from 'next';
import { ProgrammaticSEOPage } from '@/components/ProgrammaticSEOPage';
export const metadata: Metadata = {
    title: 'Online Chart Maker – Free Chart Generator for Any Data | VisualizeMyData',
    description: 'Create professional charts online from Excel, CSV, PDF, or Google Sheets. Free online chart maker — no signup, no software, instant bar, line, pie, and area charts.',
    alternates: { canonical: 'https://visualizemydata.in/online-chart-maker/' },
};
export default function Page() {
    return <ProgrammaticSEOPage
        title="Online Chart Maker"
        heroTitle="Online Chart Maker – Free, No Signup, Instant Results"
        heroSubtitle="The easiest way to create charts online. Upload Excel, CSV, or PDF — or paste a Google Sheets link — and generate professional bar, line, pie, and area charts in seconds."
        toolHref="/excel-visualizer"
        toolCta="→ Create Chart Online"
        accentColor="#6366f1"
        accentBg="rgba(99,102,241,0.07)"
        canonicalUrl="https://visualizemydata.in/online-chart-maker/"
        h2="The Best Free Online Chart Maker"
        body="VisualizeMyData is a free online chart maker that supports every major data format: Excel spreadsheets (.xlsx, .xls), CSV files, PDF documents with tables, and public Google Sheets links. Upload your data and the chart maker auto-detects your columns, selects the most appropriate chart type, and renders a polished, interactive chart in seconds. No account creation, no subscription, no software download. Just data in, chart out — with beautiful color choices and one-click export to PNG or PDF."
        steps={[
            'Choose your data format: Excel, CSV, PDF, or Google Sheets',
            'Upload the file or paste your Google Sheets URL',
            'View the auto-generated chart',
            'Switch between Bar, Line, Area, and Pie chart types',
            'Customize colors and download as PNG or PDF',
        ]}
        faqs={[
            { q: 'What data formats does the online chart maker support?', a: 'Excel (.xlsx, .xls), CSV (.csv), PDF (text-based with tables), and public Google Sheets URLs are all supported.' },
            { q: 'Is the online chart maker really free?', a: 'Yes, completely. No signup, no credit card, no usage limits. VisualizeMyData is 100% free for personal and commercial use.' },
            { q: 'Can I create a chart for a presentation?', a: 'Yes. Download the chart as a high-resolution PNG for PowerPoint/Google Slides, or as a PDF for document insertion.' },
            { q: 'Does the chart maker work on mobile?', a: 'Yes. The interface is fully responsive and works on phones, tablets, and desktop browsers alike.' },
            { q: 'Can I share the chart online?', a: 'Yes. Download the chart as PNG or PDF and share via email, Slack, Google Drive, or any platform.' },
        ]}
        related={[
            { label: 'Excel Chart Generator', href: '/excel-chart-generator' },
            { label: 'CSV Chart Generator', href: '/csv-chart-generator' },
            { label: 'PDF Chart Generator', href: '/pdf-chart-generator' },
            { label: 'Google Sheets Chart Generator', href: '/google-sheets-chart-generator' },
            { label: 'Dashboard Generator', href: '/dashboard-generator' },
        ]}
    />;
}
