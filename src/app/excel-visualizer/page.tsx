import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import DashboardView from '../DashboardView';

export const metadata: Metadata = {
    title: 'Excel Visualizer Online – Free Excel to Chart Converter',
    description: 'Upload Excel files (.xlsx, .xls) and instantly create bar, line, area, and pie charts online. Free, no signup, browser-based Excel data visualizer.',
    openGraph: {
        title: 'Excel Visualizer Online – Free Excel to Chart Converter',
        description: 'Visualize Excel files instantly. No signup required.',
        type: 'website',
    },
};

export default function ExcelVisualizerPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />

            {/* Hero */}
            <section style={{ padding: '64px 0', background: 'linear-gradient(135deg, rgba(16,185,129,0.08), transparent)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'rgba(16,185,129,0.12)', borderRadius: 99, border: '1px solid rgba(16,185,129,0.25)', marginBottom: 20 }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.08em' }}>📗 Excel Visualizer</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 16 }}>
                        Free Excel to Chart Converter Online
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.8 }}>
                        Upload any <strong>.xlsx</strong> or <strong>.xls</strong> file and instantly transform your spreadsheet data into beautiful, interactive charts. No software installation required.
                    </p>
                    <DashboardView />
                </div>
            </section>

            {/* SEO Content */}
            <section className="section">
                <div className="container" style={{ maxWidth: 860 }}>
                    <article className="prose">
                        <h2>What is the Excel Visualizer Tool?</h2>
                        <p>
                            The DataVisualizer Excel tool is a free, browser-based application that allows you to upload Microsoft Excel spreadsheets and instantly convert your tabular data into interactive charts. Whether you have sales data, survey results, financial figures, or any structured dataset, our Excel visualizer handles it automatically — no technical knowledge required.
                        </p>
                        <h2>How to Visualize Excel Data Online</h2>
                        <p>
                            Using the Excel data visualizer is simple. Follow these three steps: First, drag and drop your <strong>.xlsx</strong> or <strong>.xls</strong> file into the upload zone above, or click to browse your computer. Second, our intelligent parser reads your spreadsheet, detects column types (numeric, categorical, date), and selects the most appropriate chart type. Third, explore the auto-generated charts — bar, line, area, or pie — and download them as PNG or PDF.
                        </p>
                        <h2>Supported Excel Chart Types</h2>
                        <p>The Excel visualizer supports four chart types that you can switch between at any time:</p>
                        <ul>
                            <li><strong>Area Charts</strong> – Ideal for showing trends over time with volume context.</li>
                            <li><strong>Bar Charts</strong> – Best for comparing discrete categories side by side.</li>
                            <li><strong>Line Charts</strong> – Perfect for time-series data and trend analysis.</li>
                            <li><strong>Pie / Donut Charts</strong> – Great for showing proportional breakdowns.</li>
                        </ul>
                        <h2>Is My Excel File Safe?</h2>
                        <p>
                            Absolutely. All file processing occurs entirely within your web browser using JavaScript. Your Excel file is never uploaded to any server. Once you close the browser tab, your data is completely gone. We take your privacy seriously — no data is stored, logged, or shared.
                        </p>
                        <h2>Who Uses the Excel Visualizer?</h2>
                        <p>
                            This tool is used by business analysts, students, teachers, data scientists, product managers, and anyone who needs to quickly turn Excel data into a presentable chart. It is especially useful for creating slides, reports, and dashboards without needing to purchase expensive software like Tableau or Power BI.
                        </p>
                        <h2>Excel Visualizer vs. Excel's Built-in Charts</h2>
                        <p>
                            While Microsoft Excel does include charting features, our online visualizer is accessible from any device including smartphones and Chromebooks, requires no installation, and is completely free with no subscription. It also supports importing data from CSV, PDF, and Google Sheets in addition to Excel files, making it a versatile all-in-one tool.
                        </p>
                        <h2>Tips for Better Excel Visualizations</h2>
                        <ul>
                            <li>Ensure the first row of your spreadsheet contains column headers.</li>
                            <li>Keep numeric data in consistent formats (avoid mixing text and numbers in the same column).</li>
                            <li>Clean up any merged cells before uploading for best results.</li>
                            <li>Use the "Data Table" tab to verify your data was parsed correctly before analyzing charts.</li>
                        </ul>
                    </article>
                </div>
            </section>

            <Footer />
        </div>
    );
}
