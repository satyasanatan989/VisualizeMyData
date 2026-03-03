import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import DashboardView from '../DashboardView';

export const metadata: Metadata = {
    title: 'Google Sheets Visualizer – Free Online Charts from Google Sheets',
    description: 'Paste a Google Sheets link and instantly create bar, line, area, or pie charts online for free. No download needed. Browser-based Google Sheets data visualizer.',
    openGraph: {
        title: 'Google Sheets Visualizer – Free Online Charts from Google Sheets',
        description: 'Visualize Google Sheets data with interactive charts. Instant and free.',
        type: 'website',
    },
};

export default function GoogleSheetsVisualizerPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />

            <section style={{ padding: '64px 0', background: 'linear-gradient(135deg, rgba(139,92,246,0.08), transparent)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'rgba(139,92,246,0.12)', borderRadius: 99, border: '1px solid rgba(139,92,246,0.25)', marginBottom: 20 }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#c4b5fd', textTransform: 'uppercase', letterSpacing: '0.08em' }}>📊 Google Sheets Visualizer</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 16 }}>
                        Free Google Sheets Chart Generator Online
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.8 }}>
                        Paste your public Google Sheets link — no download required. We fetch the data, detect columns, and render beautiful interactive charts in seconds.
                    </p>
                    <DashboardView />
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ maxWidth: 860 }}>
                    <article className="prose">
                        <h2>What is the Google Sheets Visualizer?</h2>
                        <p>
                            The Google Sheets Visualizer allows you to connect any publicly accessible Google Sheets spreadsheet and visualize its data as interactive charts — without downloading the file or leaving your browser. It is perfect for teams that collaborate in Google Sheets and need to share quick visual summaries of their data.
                        </p>
                        <h2>How to Visualize Google Sheets Data</h2>
                        <p>
                            Using the Google Sheets tab in the upload panel above, paste your Google Sheets URL. The link must be to a sheet that is shared with "Anyone with the link can view." Once you submit, our tool fetches the spreadsheet data via Google's built-in CSV export endpoint, parses it client-side, and renders charts automatically. No OAuth, no login, no API keys required.
                        </p>
                        <h2>Setting Up Your Google Sheet for Visualization</h2>
                        <p>
                            To make your Google Sheet compatible, follow these steps: Open your spreadsheet in Google Sheets, click <strong>File → Share → Anyone with the link</strong>, set the permission to <strong>Viewer</strong>, and copy the link. Paste this link into the Google Sheets input on this page. That is all you need to do.
                        </p>
                        <h2>Data Format Requirements</h2>
                        <ul>
                            <li>The first row of your sheet should contain column headers.</li>
                            <li>Numeric or date data in columns produces the best chart results.</li>
                            <li>Avoid using formulas that pull data from other Google services as they may not export correctly.</li>
                            <li>Multiple sheets are supported — we visualize the first (default) sheet.</li>
                        </ul>
                        <h2>Benefits Over Google Sheets Built-in Charts</h2>
                        <p>
                            While Google Sheets has its own charting tools, our visualizer offers several advantages. You can access the visualization from any device without needing a Google account. The interface is cleaner and optimized purely for chart creation and export. You can also download charts as PNG or PDF directly, which is more convenient for report generation than Google Sheets' built-in share options.
                        </p>
                        <h2>Real-Time Data Refresh</h2>
                        <p>
                            If your Google Sheet data changes, simply re-paste the link and click Load to get a fresh visualization with the updated data. This makes our tool useful for live dashboards and regularly updated reports — just re-paste and refresh whenever you need the latest view.
                        </p>
                        <h2>Use Cases for Google Sheets Visualization</h2>
                        <ul>
                            <li><strong>Team Dashboards</strong> – Share live data charts with collaborators and stakeholders.</li>
                            <li><strong>Classroom Data</strong> – Teachers can visualize student performance data stored in Sheets.</li>
                            <li><strong>Project Tracking</strong> – Visual project timelines and progress metrics from Sheets.</li>
                            <li><strong>Marketing Reports</strong> – Visualize ad campaign data tracked in Google Sheets.</li>
                        </ul>
                        <h2>Security Notes for Google Sheets</h2>
                        <p>
                            This tool only works with <strong>publicly accessible</strong> Google Sheets. We never ask for your Google login or access token. The tool fetches a publicly available CSV export URL — the same URL any browser can access without authentication. Private or restricted sheets are not supported and will result in an error.
                        </p>
                    </article>
                </div>
            </section>

            <Footer />
        </div>
    );
}
