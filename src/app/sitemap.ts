import type { MetadataRoute } from 'next';
import { GALLERY_DASHBOARDS } from '@/lib/galleryRegistry';

// Required for Next.js `output: "export"` to statically render the sitemap
export const dynamic = 'force-static';

const BASE_URL = 'https://visualizemydata.in';

/**
 * Generates sitemap.xml at build time.
 * Adding a new app/[route]/page.tsx automatically adds its entry here
 * just by including its slug in the appropriate category array.
 */

const coreTools = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/excel-visualizer', priority: 0.95, changeFrequency: 'monthly' },
    { path: '/csv-visualizer', priority: 0.95, changeFrequency: 'monthly' },
    { path: '/pdf-visualizer', priority: 0.95, changeFrequency: 'monthly' },
    { path: '/google-sheets-visualizer', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/multi-chart-generator', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/dashboard-generator', priority: 0.95, changeFrequency: 'weekly' },
    { path: '/data-report-generator', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/templates', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/data-analysis-tool', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/data-visualization-tool', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/data-dashboard-builder', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/create-charts-online', priority: 0.8, changeFrequency: 'monthly' },
] as const;

const excelSeoPages = [
    '/excel-chart-generator',
    '/excel-dashboard-generator',
    '/excel-data-visualizer',
    '/excel-graph-maker',
    '/excel-to-bar-chart',
    '/excel-to-line-chart',
    '/excel-to-pie-chart',
    '/excel-to-scatter-plot',
];

const csvSeoPages = [
    '/csv-chart-generator',
    '/csv-dashboard-generator',
    '/csv-data-visualizer',
    '/csv-graph-maker',
    '/csv-to-bar-chart',
    '/csv-to-line-chart',
    '/csv-to-pie-chart',
];

const pdfSeoPages = [
    '/pdf-chart-generator',
    '/pdf-data-visualization',
    '/pdf-data-visualizer',
    '/pdf-dashboard-generator',
    '/pdf-graph-maker',
    '/pdf-table-to-chart',
    '/pdf-to-bar-chart',
];

const googleSheetsSeoPages = [
    '/google-sheets-chart-generator',
    '/google-sheets-dashboard',
    '/google-sheets-dashboard-generator',
    '/google-sheets-data-visualizer',
    '/google-sheets-graph-maker',
];

const generalSeoPages = [
    '/online-chart-maker',
    '/free-data-visualization-tool',
    '/spreadsheet-to-chart',
    '/data-to-chart-online',
];

const learnPages = [
    '/learn',
    '/learn/what-is-data-visualization',
    '/learn/how-to-create-charts-from-excel',
    '/learn/best-data-visualization-techniques',
    '/learn/dashboard-design-best-practices',
    '/learn/common-chart-types',
];

const blogPages = [
    '/blog',
    '/blog/how-to-visualize-excel-data',
    '/blog/csv-data-visualization-guide',
    '/blog/best-free-data-visualization-tools',
    '/blog/how-to-create-dashboard-from-excel',
    '/blog/convert-data-to-charts-online',
    '/blog/csv-to-chart-guide',
    '/blog/pdf-data-visualization-guide',
    '/blog/create-dashboard-from-csv',
];

const infoPages = [
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
];

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // Core tools — highest authority
    const coreEntries: MetadataRoute.Sitemap = coreTools.map((p) => ({
        url: `${BASE_URL}${p.path}`,
        lastModified: now,
        changeFrequency: p.changeFrequency as MetadataRoute.Sitemap[0]['changeFrequency'],
        priority: p.priority,
    }));

    // SEO landing pages — 0.75–0.85 priority
    const allSeoPages = [
        ...excelSeoPages,
        ...csvSeoPages,
        ...pdfSeoPages,
        ...googleSheetsSeoPages,
        ...generalSeoPages,
    ];
    const seoEntries: MetadataRoute.Sitemap = allSeoPages.map((path) => ({
        url: `${BASE_URL}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    // Learn / blog — 0.7 priority
    const contentEntries: MetadataRoute.Sitemap = [
        ...[...learnPages, ...blogPages].map((path) => ({
            url: `${BASE_URL}${path}`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: path === '/blog' || path === '/learn' ? 0.8 : 0.7,
        })),
    ];

    // Gallery Pages — 0.8 priority
    const galleryEntries: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/gallery`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        ...GALLERY_DASHBOARDS.map((dash) => ({
            url: `${BASE_URL}/gallery/${dash.slug}`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        }))
    ];

    // Info pages — low priority
    const infoEntries: MetadataRoute.Sitemap = infoPages.map((path) => ({
        url: `${BASE_URL}${path}`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: path === '/about' || path === '/contact' ? 0.6 : 0.3,
    }));

    return [...coreEntries, ...seoEntries, ...contentEntries, ...galleryEntries, ...infoEntries];
}
