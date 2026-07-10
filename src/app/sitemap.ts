import type { MetadataRoute } from 'next';
import { GALLERY_DASHBOARDS } from '@/lib/galleryRegistry';
import { QUICK_TOOLS } from '@/lib/toolsRegistry';

// Required for Next.js `output: "export"` to statically render the sitemap
export const dynamic = 'force-static';

const BASE_URL = 'https://visualizemydata.in';

// ── Canonical landing pages (one per intent, no duplicates) ──────────────────
const canonicalLandingPages = [
    { path: '/',                         priority: 1.0,  changeFrequency: 'weekly'  },
    { path: '/csv-visualizer',           priority: 0.95, changeFrequency: 'monthly' },
    { path: '/excel-visualizer',         priority: 0.95, changeFrequency: 'monthly' },
    { path: '/pdf-table-to-chart',       priority: 0.9,  changeFrequency: 'monthly' },
    { path: '/google-sheets-visualizer', priority: 0.9,  changeFrequency: 'monthly' },
    { path: '/online-chart-maker',       priority: 0.9,  changeFrequency: 'monthly' },
    { path: '/multi-chart-generator',    priority: 0.9,  changeFrequency: 'weekly'  },
    { path: '/dashboard-generator',      priority: 0.95, changeFrequency: 'weekly'  },
    { path: '/data-report-generator',    priority: 0.9,  changeFrequency: 'weekly'  },
    { path: '/data-analysis-tool',       priority: 0.85, changeFrequency: 'monthly' },
    { path: '/data-cleaning-tool',       priority: 0.85, changeFrequency: 'monthly' },
    { path: '/survey-visualizer',        priority: 0.85, changeFrequency: 'monthly' },
    { path: '/dashboard-templates',      priority: 0.85, changeFrequency: 'weekly'  },
    { path: '/excel-formula-generator',  priority: 0.8,  changeFrequency: 'monthly' },
    { path: '/csv-cleaner',              priority: 0.8,  changeFrequency: 'monthly' },
    { path: '/templates',                priority: 0.8,  changeFrequency: 'weekly'  },
] as const;

// ── Learn / Blog ─────────────────────────────────────────────────────────────
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
    '/blog/how-to-create-professional-dashboards',
    '/blog/best-excel-dashboard-templates',
    '/blog/data-visualization-best-practices',
    '/blog/bar-chart-vs-line-chart',
    '/blog/dashboard-design-principles',
    '/blog/excel-tips',
    '/blog/google-sheets-guide',
    '/blog/csv-guide',
    '/blog/data-cleaning-guide',
    '/blog/image-optimization-guide',
    '/blog/pdf-workflow-guide',
    '/blog/developer-utilities-guide',
    // Phase 2 new blog posts
    '/blog/how-to-make-chart-from-excel-free',
    '/blog/csv-data-cleaning-guide',
    '/blog/create-dashboard-without-excel',
    '/blog/free-invoice-generator-india',
    '/blog/food-costing-calculation-guide',
];

// ── Category pages ────────────────────────────────────────────────────────────
const categoryPages = [
    '/category/dashboard-tools',
    '/category/excel-tools',
    '/category/csv-tools',
    '/category/google-sheets-tools',
    '/category/image-tools',
    '/category/pdf-tools',
    '/category/developer-tools',
    '/category/business-tools',
    '/category/student-tools',
    '/category/food-science-tools',
];

// ── Trust / Info pages ────────────────────────────────────────────────────────
const infoPages = [
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
    '/editorial-policy',
    '/how-we-test-tools',
    '/content-update-policy',
];

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // Canonical landing pages — highest authority
    const landingEntries: MetadataRoute.Sitemap = canonicalLandingPages.map((p) => ({
        url: `${BASE_URL}${p.path}`,
        lastModified: now,
        changeFrequency: p.changeFrequency as MetadataRoute.Sitemap[0]['changeFrequency'],
        priority: p.priority,
    }));

    // Learn / Blog — 0.7–0.8 priority
    const contentEntries: MetadataRoute.Sitemap = [
        ...[...learnPages, ...blogPages].map((path) => ({
            url: `${BASE_URL}${path}`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: path === '/blog' || path === '/learn' ? 0.8 : 0.7,
        })),
    ];

    // Category pages — 0.85 priority
    const categoryEntries: MetadataRoute.Sitemap = categoryPages.map((path) => ({
        url: `${BASE_URL}${path}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }));

    // Gallery pages — 0.8 priority
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
        })),
    ];

    // Quick tools — 0.8 priority
    const quickToolsEntries: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/tools`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        ...QUICK_TOOLS.map((t) => ({
            url: `${BASE_URL}/tools/${t.slug}`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })),
    ];

    // Info pages — lowest priority
    const infoEntries: MetadataRoute.Sitemap = infoPages.map((path) => ({
        url: `${BASE_URL}${path}`,
        lastModified: now,
        changeFrequency: 'yearly' as const,
        priority: path === '/about' || path === '/contact' ? 0.6 : 0.3,
    }));

    return [
        ...landingEntries,
        ...contentEntries,
        ...categoryEntries,
        ...galleryEntries,
        ...quickToolsEntries,
        ...infoEntries,
    ];
}
