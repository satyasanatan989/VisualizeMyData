import type { Metadata } from 'next';
import { ProgrammaticSEOPage } from '@/components/ProgrammaticSEOPage';
export const metadata: Metadata = {
    title: 'Google Sheets Dashboard Generator – Build Interactive Dashboards | VisualizeMyData',
    description: 'Create interactive dashboards from Google Sheets. Paste your spreadsheet link and instantly get KPI cards, charts, and data insights. Free, no login required.',
    alternates: { canonical: 'https://visualizemydata.in/google-sheets-dashboard-generator/' },
};
export default function Page() {
    return <ProgrammaticSEOPage
        title="Google Sheets Dashboard Generator"
        heroTitle="Google Sheets Dashboard Generator – Free Online"
        heroSubtitle="Paste a public Google Sheets URL and instantly generate a complete interactive dashboard: KPI cards, charts, AI data insights, and filters. 100% free, no login."
        toolHref="/google-sheets-dashboard"
        toolCta="→ Build Dashboard from Google Sheets"
        accentColor="#8b5cf6"
        accentBg="rgba(139,92,246,0.07)"
        canonicalUrl="https://visualizemydata.in/google-sheets-dashboard-generator/"
        h2="Go Beyond Charts — Build Dashboards from Google Sheets"
        body="Charts are great, but dashboards are better. VisualizeMyData's Google Sheets dashboard generator reads your public spreadsheet and automatically generates a complete, professional dashboard: KPI summary cards (totals, averages, max/min values), multiple chart types, AI-style insights about your data trends, and interactive filters. Share the dashboard externally with a screenshot or PDF export. Everything is processed in your browser, so your Google Sheets data stays completely private."
        steps={[
            'Share your Google Sheet publicly (File → Share → Anyone with the link)',
            'Copy the Google Sheets share URL',
            'Paste the URL into the Google Sheets Dashboard tool',
            'Explore KPI cards, charts, and insights automatically generated',
            'Export the dashboard as PNG or PDF',
        ]}
        faqs={[
            { q: 'Does the dashboard update live when my Google Sheet changes?', a: 'Not automatically. The dashboard reflects the data at the time you paste the link. Reload the page with the same link to get updated data.' },
            { q: 'What does the dashboard include?', a: 'The dashboard includes KPI cards (sum, average, max, min per numeric column), a primary bar/line chart, a distribution chart, AI-style insights, and interactive data filters.' },
            { q: 'Can I use private Google Sheets?', a: 'The sheet must be set to public ("Anyone with the link can view"). For private data, export as CSV and use the CSV Dashboard Generator.' },
            { q: 'How do I export the dashboard?', a: 'Use the Export PNG or Export PDF buttons in the dashboard view. The full dashboard with KPI cards and charts is captured in the export.' },
        ]}
        related={[
            { label: 'Google Sheets Chart Generator', href: '/google-sheets-chart-generator' },
            { label: 'Google Sheets Visualizer', href: '/google-sheets-visualizer' },
            { label: 'Excel Dashboard Generator', href: '/excel-dashboard-generator' },
            { label: 'CSV Dashboard Generator', href: '/csv-dashboard-generator' },
            { label: 'Dashboard Generator', href: '/dashboard-generator' },
        ]}
    />;
}
