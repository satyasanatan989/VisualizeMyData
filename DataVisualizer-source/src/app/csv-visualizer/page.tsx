import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import DashboardView from '../DashboardView';

export const metadata: Metadata = {
    title: 'CSV Visualizer Online – Free CSV to Chart Converter',
    description: 'Upload CSV files and instantly create charts online. Free browser-based CSV data visualizer with bar, line, area, and pie chart support. No signup needed.',
    openGraph: {
        title: 'CSV Visualizer Online – Free CSV to Chart Converter',
        description: 'Turn CSV files into beautiful charts instantly. No signup required.',
        type: 'website',
    },
};

export default function CsvVisualizerPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />

            <section style={{ padding: '64px 0', background: 'linear-gradient(135deg, rgba(59,130,246,0.08), transparent)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'rgba(59,130,246,0.12)', borderRadius: 99, border: '1px solid rgba(59,130,246,0.25)', marginBottom: 20 }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>📋 CSV Visualizer</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 16 }}>
                        Free Online CSV Chart Generator
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.8 }}>
                        Upload a <strong>.csv</strong> file and instantly create beautiful interactive charts. Parse data, detect columns automatically, and export your charts as PNG or PDF.
                    </p>
                    <DashboardView />
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ maxWidth: 860 }}>
                    <article className="prose">
                        <h2>What is the CSV Visualizer Tool?</h2>
                        <p>
                            The CSV Visualizer is a free online tool that reads comma-separated value files and converts them into interactive charts in seconds. CSV is the most widely used data format in analytics, databases, and data science workflows. Our tool makes it easy to explore CSV datasets visually without writing a single line of code.
                        </p>
                        <h2>How to Create Charts from a CSV File</h2>
                        <p>
                            To visualize your CSV data, simply drag and drop your file into the upload zone above. The tool reads the file header row to identify column names, then automatically detects which columns are numeric or categorical. Based on this analysis, it suggests the best chart type and renders it immediately. You can then switch between bar, line, area, and pie charts to explore different perspectives on your data.
                        </p>
                        <h2>What Makes a Good CSV File?</h2>
                        <p>
                            For the best visualization results, your CSV file should have a header row as the first row, with each column having a distinct name. Numeric columns should contain clean numbers without currency symbols or commas inside numbers (though our parser handles many of these cases). Text columns work best for categorical data like product names, regions, or status labels.
                        </p>
                        <h2>Popular CSV Use Cases</h2>
                        <ul>
                            <li><strong>E-commerce Analytics</strong> – Order data, revenue by product, conversion metrics.</li>
                            <li><strong>Scientific Research</strong> – Experimental results, measurement data, survey responses.</li>
                            <li><strong>Financial Reporting</strong> – Budget tracking, expense categorization, portfolio performance.</li>
                            <li><strong>Marketing Data</strong> – Campaign performance, click-through rates, channel attribution.</li>
                            <li><strong>HR Analytics</strong> – Headcount trends, salary distributions, department breakdowns.</li>
                        </ul>
                        <h2>CSV vs. Excel: Which Should You Use?</h2>
                        <p>
                            CSV files are simpler and more universal than Excel files. They can be opened by virtually any programming language, database, or spreadsheet application. If you are working with data from APIs, database exports, or command-line tools, you will most likely receive CSV files. Our tool supports both formats equally well.
                        </p>
                        <h2>Download CSV Charts as PNG or PDF</h2>
                        <p>
                            Once you have generated a chart from your CSV data, you can download it as a high-resolution PNG image for embedding in documents or presentations, or export it as a PDF for professional reports. Both export options are available with a single click directly from the dashboard.
                        </p>
                        <h2>Privacy and Security</h2>
                        <p>
                            Your CSV data never leaves your browser. All parsing and chart rendering happens entirely on the client side using JavaScript. No data is sent to any server, logged, or stored. You can safely visualize sensitive business or personal data without any risk of exposure.
                        </p>
                    </article>
                </div>
            </section>

            <Footer />
        </div>
    );
}
