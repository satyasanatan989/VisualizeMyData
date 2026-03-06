/**
 * seoPagesConfig.ts
 * Central source-of-truth for all programmatic SEO page combinations.
 * Used for documentation, sitemap generation reference, and future automation.
 */

export type FileType = 'excel' | 'csv' | 'pdf' | 'google-sheets';
export type ActionType =
    | 'chart-generator'
    | 'dashboard-generator'
    | 'data-visualizer'
    | 'graph-maker'
    | 'data-visualization'
    | 'table-visualizer';

export interface SEOPageConfig {
    file: FileType;
    action: ActionType;
    slug: string;
    title: string;
    metaDescription: string;
    toolHref: string;
    accentColor: string;
    priority: number;
}

export const SEO_PAGES: SEOPageConfig[] = [
    // ── Excel pages ─────────────────────────────────────────────────────────
    {
        file: 'excel', action: 'chart-generator', slug: 'excel-chart-generator',
        title: 'Excel Chart Generator Online – Visualize Excel Data Instantly',
        metaDescription: 'Generate bar, line, pie, and area charts from Excel files online for free. Upload .xlsx or .xls and download beautiful charts as PNG or PDF.',
        toolHref: '/excel-visualizer', accentColor: '#10b981', priority: 0.85,
    },
    {
        file: 'excel', action: 'dashboard-generator', slug: 'excel-dashboard-generator',
        title: 'Excel Dashboard Generator – Free Online Dashboard from Excel',
        metaDescription: 'Transform Excel spreadsheets into interactive dashboards with KPI cards, charts, and insights. Free, no signup, browser-based.',
        toolHref: '/dashboard-generator', accentColor: '#10b981', priority: 0.85,
    },
    {
        file: 'excel', action: 'data-visualizer', slug: 'excel-data-visualizer',
        title: 'Excel Data Visualizer Online – Free Excel to Chart Tool',
        metaDescription: 'Visualize Excel data as interactive charts online. Upload any .xlsx file and get instant bar, line, pie, or area charts. 100% free, no login.',
        toolHref: '/excel-visualizer', accentColor: '#10b981', priority: 0.8,
    },
    {
        file: 'excel', action: 'graph-maker', slug: 'excel-graph-maker',
        title: 'Excel Graph Maker Online – Create Graphs from Excel Free',
        metaDescription: 'Make professional graphs from Excel data instantly online. Upload your spreadsheet and generate bar, line, or pie graphs. Free, no software needed.',
        toolHref: '/excel-visualizer', accentColor: '#10b981', priority: 0.8,
    },

    // ── CSV pages ────────────────────────────────────────────────────────────
    {
        file: 'csv', action: 'chart-generator', slug: 'csv-chart-generator',
        title: 'CSV Chart Generator – Convert CSV to Charts Online Free',
        metaDescription: 'Generate beautiful charts from CSV files instantly. Upload any .csv and get bar, line, pie, or area charts. Free online tool, no signup required.',
        toolHref: '/csv-visualizer', accentColor: '#3b82f6', priority: 0.85,
    },
    {
        file: 'csv', action: 'dashboard-generator', slug: 'csv-dashboard-generator',
        title: 'CSV Dashboard Generator – Free Online Dashboard from CSV',
        metaDescription: 'Build an interactive KPI dashboard from a CSV file in seconds. Automatic chart generation, filters, and export. Free, browser-based.',
        toolHref: '/dashboard-generator', accentColor: '#3b82f6', priority: 0.85,
    },
    {
        file: 'csv', action: 'data-visualizer', slug: 'csv-data-visualizer',
        title: 'CSV Data Visualizer Online – Visualize CSV Data Instantly',
        metaDescription: 'Visualize CSV data as interactive charts online for free. Upload your comma-separated file and get instant bar, line, pie charts. No login needed.',
        toolHref: '/csv-visualizer', accentColor: '#3b82f6', priority: 0.8,
    },
    {
        file: 'csv', action: 'graph-maker', slug: 'csv-graph-maker',
        title: 'CSV Graph Maker Online – Create Graphs from CSV Free',
        metaDescription: 'Create professional graphs from CSV data online. Upload your .csv file and generate bar, line, pie or scatter graphs instantly. Free, no signup.',
        toolHref: '/csv-visualizer', accentColor: '#3b82f6', priority: 0.8,
    },

    // ── PDF pages ────────────────────────────────────────────────────────────
    {
        file: 'pdf', action: 'chart-generator', slug: 'pdf-chart-generator',
        title: 'PDF Chart Generator – Convert PDF Tables to Charts Online',
        metaDescription: 'Extract tables from PDF documents and generate charts instantly. Free online PDF-to-chart tool. No signup, no software installation.',
        toolHref: '/pdf-visualizer', accentColor: '#f43f5e', priority: 0.8,
    },
    {
        file: 'pdf', action: 'graph-maker', slug: 'pdf-graph-maker',
        title: 'PDF Graph Maker – Create Graphs from PDF Data Online',
        metaDescription: 'Turn PDF table data into professional graphs online. Upload your PDF, extract tables automatically, and visualize as bar or line charts. Free.',
        toolHref: '/pdf-visualizer', accentColor: '#f43f5e', priority: 0.75,
    },
    {
        file: 'pdf', action: 'dashboard-generator', slug: 'pdf-dashboard-generator',
        title: 'PDF Dashboard Generator – Build Dashboards from PDF Data',
        metaDescription: 'Extract data from PDF reports and build interactive dashboards. Free browser-based PDF dashboard generator — no login, no software needed.',
        toolHref: '/dashboard-generator', accentColor: '#f43f5e', priority: 0.75,
    },
    {
        file: 'pdf', action: 'data-visualizer', slug: 'pdf-data-visualizer',
        title: 'PDF Data Visualizer Online – Visualize PDF Table Data Free',
        metaDescription: 'Visualize tabular data from PDF documents as interactive charts. Free online PDF data visualization tool. Upload and analyze instantly.',
        toolHref: '/pdf-visualizer', accentColor: '#f43f5e', priority: 0.75,
    },

    // ── Google Sheets pages ──────────────────────────────────────────────────
    {
        file: 'google-sheets', action: 'chart-generator', slug: 'google-sheets-chart-generator',
        title: 'Google Sheets Chart Generator – Visualize Sheets Data Free',
        metaDescription: 'Generate charts from Google Sheets data online. Paste your public sheet URL and get instant bar, line, or pie charts. No login required.',
        toolHref: '/google-sheets-visualizer', accentColor: '#8b5cf6', priority: 0.85,
    },
    {
        file: 'google-sheets', action: 'dashboard-generator', slug: 'google-sheets-dashboard-generator',
        title: 'Google Sheets Dashboard Generator – Build Dashboards from Sheets',
        metaDescription: 'Create interactive dashboards from Google Sheets. Paste your spreadsheet link and instantly get KPI cards, charts, and data insights. Free.',
        toolHref: '/google-sheets-dashboard', accentColor: '#8b5cf6', priority: 0.85,
    },
    {
        file: 'google-sheets', action: 'data-visualizer', slug: 'google-sheets-data-visualizer',
        title: 'Google Sheets Data Visualizer – Visualize Sheets Online Free',
        metaDescription: 'Visualize Google Sheets data as interactive charts — no download needed. Paste your public Sheets URL and explore your data visually. Free.',
        toolHref: '/google-sheets-visualizer', accentColor: '#8b5cf6', priority: 0.8,
    },
    {
        file: 'google-sheets', action: 'graph-maker', slug: 'google-sheets-graph-maker',
        title: 'Google Sheets Graph Maker – Create Graphs from Sheets Online',
        metaDescription: 'Make professional graphs from Google Sheets data. Simply paste your spreadsheet URL and generate bar, line, or pie graphs. Free, no signup.',
        toolHref: '/google-sheets-visualizer', accentColor: '#8b5cf6', priority: 0.8,
    },

    // ── General tool pages ───────────────────────────────────────────────────
    {
        file: 'excel', action: 'chart-generator', slug: 'online-chart-maker',
        title: 'Online Chart Maker – Free Chart Generator for Any Data',
        metaDescription: 'Create professional charts online from Excel, CSV, PDF, or Google Sheets. Free chart maker — no signup, no software, instant results.',
        toolHref: '/excel-visualizer', accentColor: '#6366f1', priority: 0.85,
    },
    {
        file: 'csv', action: 'data-visualizer', slug: 'free-data-visualization-tool',
        title: 'Free Data Visualization Tool Online – No Signup Required',
        metaDescription: 'The best free online data visualization tool. Upload Excel, CSV, PDF or Google Sheets and get charts, dashboards and insights instantly.',
        toolHref: '/dashboard-generator', accentColor: '#6366f1', priority: 0.85,
    },
    {
        file: 'excel', action: 'chart-generator', slug: 'spreadsheet-to-chart',
        title: 'Spreadsheet to Chart Online – Convert Sheets to Charts Free',
        metaDescription: 'Convert any spreadsheet (Excel, CSV, Google Sheets) to a professional chart online in seconds. Free, no login, browser-based.',
        toolHref: '/excel-visualizer', accentColor: '#0ea5e9', priority: 0.8,
    },
    {
        file: 'csv', action: 'chart-generator', slug: 'data-to-chart-online',
        title: 'Data to Chart Online – Convert Data to Visual Charts Free',
        metaDescription: 'Turn raw data into beautiful charts online. Upload Excel, CSV, or PDF and get bar, line, pie charts instantly. Free tool, no signup needed.',
        toolHref: '/csv-visualizer', accentColor: '#0ea5e9', priority: 0.8,
    },
];
