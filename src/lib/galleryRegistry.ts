export interface GalleryDashboard {
    slug: string;
    title: string;
    description: string;
    seoTitle: string;
    seoDesc: string;
    tags: string[];
    thumbnail: string;
    data: {
        columns: string[];
        rows: any[];
    };
}

export const GALLERY_DASHBOARDS: GalleryDashboard[] = [
    {
        slug: 'sales-performance-dashboard',
        title: 'Q3 Sales Performance & Regional Analysis',
        description: 'A comprehensive interactive dashboard visualizing Q3 sales revenue across different regions, top-performing product categories, and monthly growth trends.',
        seoTitle: 'Sales Dashboard Visualization Example | VisualizeMyData',
        seoDesc: 'Interactive sales dashboard generated with VisualizeMyData. Explore sales performance, regional analysis, and growth trends instantly.',
        tags: ['Sales', 'Finance', 'Q3', 'Performance'],
        thumbnail: '/previews/sales-dash.png', // Fallback handled in UI
        data: {
            columns: ['Month', 'Region', 'Category', 'Revenue', 'Units Sold'],
            rows: [
                { Month: 'Jul', Region: 'North America', Category: 'Electronics', Revenue: 145000, 'Units Sold': 1200 },
                { Month: 'Jul', Region: 'Europe', Category: 'Electronics', Revenue: 98000, 'Units Sold': 850 },
                { Month: 'Jul', Region: 'Asia', Category: 'Software', Revenue: 210000, 'Units Sold': 3500 },
                { Month: 'Aug', Region: 'North America', Category: 'Software', Revenue: 185000, 'Units Sold': 1400 },
                { Month: 'Aug', Region: 'Europe', Category: 'Furniture', Revenue: 65000, 'Units Sold': 400 },
                { Month: 'Aug', Region: 'Asia', Category: 'Electronics', Revenue: 310000, 'Units Sold': 5200 },
                { Month: 'Sep', Region: 'North America', Category: 'Electronics', Revenue: 165000, 'Units Sold': 1350 },
                { Month: 'Sep', Region: 'Europe', Category: 'Software', Revenue: 110000, 'Units Sold': 920 },
                { Month: 'Sep', Region: 'Asia', Category: 'Software', Revenue: 280000, 'Units Sold': 4800 },
            ]
        }
    },
    {
        slug: 'marketing-campaign-roi',
        title: 'Digital Marketing Campaign ROI Overview',
        description: 'Track return on ad spend (ROAS), conversion rates, and cost per acquisition (CPA) across multiple digital channels including Social, Search, and Email.',
        seoTitle: 'Marketing Campaign ROI Dashboard | VisualizeMyData',
        seoDesc: 'Example marketing dashboard tracking ROI, conversion rates, and channel performance. Generated for free with VisualizeMyData.',
        tags: ['Marketing', 'ROI', 'Digital', 'Campaign'],
        thumbnail: '/previews/marketing-dash.png',
        data: {
            columns: ['Channel', 'Spend', 'Conversions', 'CPA', 'Revenue', 'ROAS'],
            rows: [
                { Channel: 'Google Ads', Spend: 15000, Conversions: 450, CPA: 33.33, Revenue: 67500, ROAS: 4.5 },
                { Channel: 'Facebook', Spend: 12000, Conversions: 320, CPA: 37.50, Revenue: 48000, ROAS: 4.0 },
                { Channel: 'LinkedIn', Spend: 8000, Conversions: 115, CPA: 69.56, Revenue: 34500, ROAS: 4.31 },
                { Channel: 'Email Promo', Spend: 2000, Conversions: 800, CPA: 2.50, Revenue: 40000, ROAS: 20.0 },
                { Channel: 'Affiliate', Spend: 5000, Conversions: 180, CPA: 27.77, Revenue: 18000, ROAS: 3.6 },
            ]
        }
    },
    {
        slug: 'financial-overview-dashboard',
        title: 'Annual Financial & Expense Overview',
        description: 'High-level visualization of annual operational expenses, profit margins, and departmental budget allocations.',
        seoTitle: 'Financial Overview Dashboard Example | VisualizeMyData',
        seoDesc: 'Interactive financial dashboard showing expenses, margins, and budgets. Build your own instantly with VisualizeMyData.',
        tags: ['Finance', 'Budget', 'Annual', 'Expenses'],
        thumbnail: '/previews/finance-dash.png',
        data: {
            columns: ['Department', 'Budget Allocated', 'Actual Spend', 'Variance', 'Headcount'],
            rows: [
                { Department: 'Engineering', 'Budget Allocated': 2500000, 'Actual Spend': 2450000, Variance: 50000, Headcount: 42 },
                { Department: 'Marketing', 'Budget Allocated': 850000, 'Actual Spend': 920000, Variance: -70000, Headcount: 12 },
                { Department: 'Sales', 'Budget Allocated': 1200000, 'Actual Spend': 1050000, Variance: 150000, Headcount: 28 },
                { Department: 'Operations', 'Budget Allocated': 600000, 'Actual Spend': 580000, Variance: 20000, Headcount: 15 },
                { Department: 'HR', 'Budget Allocated': 300000, 'Actual Spend': 310000, Variance: -10000, Headcount: 5 },
            ]
        }
    },
    {
        slug: 'employee-satisfaction-survey',
        title: 'Q2 Employee Satisfaction Survey Results',
        description: 'Dashboard breaking down survey results regarding workplace satisfaction, management approval ratings, and work-life balance feedback.',
        seoTitle: 'Survey Results Dashboard Example | VisualizeMyData',
        seoDesc: 'Visualize survey and questionnaire data easily. See this employee satisfaction dashboard generated with VisualizeMyData.',
        tags: ['Survey', 'HR', 'Feedback', 'Internal'],
        thumbnail: '/previews/survey-dash.png',
        data: {
            columns: ['Department', 'Satisfaction Score', 'Work-Life Balance', 'Management Approval', 'Responses'],
            rows: [
                { Department: 'Engineering', 'Satisfaction Score': 8.2, 'Work-Life Balance': 7.5, 'Management Approval': 8.8, Responses: 40 },
                { Department: 'Marketing', 'Satisfaction Score': 7.6, 'Work-Life Balance': 6.8, 'Management Approval': 7.2, Responses: 12 },
                { Department: 'Sales', 'Satisfaction Score': 8.9, 'Work-Life Balance': 8.1, 'Management Approval': 9.0, Responses: 28 },
                { Department: 'Operations', 'Satisfaction Score': 7.1, 'Work-Life Balance': 7.0, 'Management Approval': 6.5, Responses: 15 },
                { Department: 'HR', 'Satisfaction Score': 9.2, 'Work-Life Balance': 8.5, 'Management Approval': 9.5, Responses: 5 },
            ]
        }
    }
];

export function getPublicDashboard(slug: string): GalleryDashboard | undefined {
    return GALLERY_DASHBOARDS.find(d => d.slug === slug);
}
