import { ChartType } from '@/components/charts/types';

export interface DashboardMetricConfig {
    id: string;
    label: string;
    type: 'sum' | 'average' | 'count' | 'top_category' | 'min' | 'max';
    targetColumnHint: string[]; // keywords to look for in dataset columns
}

export interface DashboardChartConfig {
    id: string;
    title: string;
    type: ChartType;
    xAxisHint: string[]; // hints for the category or date column
    yAxisHint: string[]; // hints for the numeric value column
}

export interface DashboardTemplate {
    id: string;
    name: string;
    description: string;
    icon: string;
    metrics: DashboardMetricConfig[];
    charts: DashboardChartConfig[];
}

export const DASHBOARD_TEMPLATES: DashboardTemplate[] = [
    {
        id: 'default',
        name: 'Auto-Detect',
        description: 'Our AI will automatically build a generic dashboard based on everything it finds.',
        icon: '✨',
        metrics: [],
        charts: []
    },
    {
        id: 'business_performance',
        name: 'Business Performance',
        description: 'Track overall company health with revenue trends and category breakdowns.',
        icon: '📈',
        metrics: [
            { id: 'm1', label: 'Total Revenue', type: 'sum', targetColumnHint: ['revenue', 'sales', 'total', 'amount', 'profit'] },
            { id: 'm2', label: 'Average Sales', type: 'average', targetColumnHint: ['revenue', 'sales', 'total', 'amount'] },
            { id: 'm3', label: 'Top Category', type: 'top_category', targetColumnHint: ['category', 'product', 'type', 'region', 'department'] }
        ],
        charts: [
            { id: 'c1', title: 'Revenue Trend', type: 'line', xAxisHint: ['date', 'month', 'year', 'day', 'time'], yAxisHint: ['revenue', 'sales', 'total', 'amount'] },
            { id: 'c2', title: 'Sales by Category', type: 'bar', xAxisHint: ['category', 'product', 'type', 'department'], yAxisHint: ['revenue', 'sales', 'total', 'amount'] },
            { id: 'c3', title: 'Regional Distribution', type: 'pie', xAxisHint: ['region', 'country', 'state', 'city', 'location'], yAxisHint: ['revenue', 'sales', 'count', 'total'] }
        ]
    },
    {
        id: 'marketing_analytics',
        name: 'Marketing Analytics',
        description: 'Monitor lead generation, conversion rates, and channel performance.',
        icon: '🎯',
        metrics: [
            { id: 'm1', label: 'Total Leads', type: 'sum', targetColumnHint: ['lead', 'visitor', 'traffic', 'user', 'signups'] },
            { id: 'm2', label: 'Average Conversion', type: 'average', targetColumnHint: ['conversion', 'rate', 'ctr', 'roi'] },
            { id: 'm3', label: 'Top Channel', type: 'top_category', targetColumnHint: ['channel', 'source', 'medium', 'campaign'] }
        ],
        charts: [
            { id: 'c1', title: 'Leads by Channel', type: 'bar', xAxisHint: ['channel', 'source', 'medium'], yAxisHint: ['lead', 'visitor', 'count', 'user'] },
            { id: 'c2', title: 'Conversion Trend', type: 'line', xAxisHint: ['date', 'month', 'week'], yAxisHint: ['conversion', 'rate', 'lead'] },
            { id: 'c3', title: 'Traffic Distribution', type: 'pie', xAxisHint: ['channel', 'source', 'device'], yAxisHint: ['traffic', 'visitor', 'session'] }
        ]
    },
    {
        id: 'financial_analysis',
        name: 'Financial Analysis',
        description: 'Deep dive into revenue, expenses, and net profit margins.',
        icon: '💰',
        metrics: [
            { id: 'm1', label: 'Total Revenue', type: 'sum', targetColumnHint: ['revenue', 'income', 'sales'] },
            { id: 'm2', label: 'Total Expenses', type: 'sum', targetColumnHint: ['expense', 'cost', 'spend', 'out'] },
            { id: 'm3', label: 'Net Profit', type: 'sum', targetColumnHint: ['profit', 'net', 'margin', 'revenue'] } // Fallback to revenue if profit missing
        ],
        charts: [
            { id: 'c1', title: 'Revenue vs Expenses', type: 'line', xAxisHint: ['date', 'month', 'quarter'], yAxisHint: ['revenue', 'expense', 'income', 'cost'] },
            { id: 'c2', title: 'Expense Breakdown', type: 'pie', xAxisHint: ['category', 'department', 'type'], yAxisHint: ['expense', 'cost', 'spend'] },
            { id: 'c3', title: 'Monthly Profit', type: 'bar', xAxisHint: ['date', 'month', 'period'], yAxisHint: ['profit', 'net', 'margin'] }
        ]
    },
    {
        id: 'sales_dashboard',
        name: 'Sales Dashboard',
        description: 'Track individual product performance and market share.',
        icon: '🛍️',
        metrics: [
            { id: 'm1', label: 'Total Sales', type: 'sum', targetColumnHint: ['sales', 'revenue', 'amount', 'total'] },
            { id: 'm2', label: 'Average Order Value', type: 'average', targetColumnHint: ['order', 'cart', 'sales', 'amount'] },
            { id: 'm3', label: 'Best Selling Product', type: 'top_category', targetColumnHint: ['product', 'item', 'sku', 'name'] }
        ],
        charts: [
            { id: 'c1', title: 'Sales Trend', type: 'line', xAxisHint: ['date', 'month', 'week'], yAxisHint: ['sales', 'revenue', 'total'] },
            { id: 'c2', title: 'Top Products', type: 'bar', xAxisHint: ['product', 'item', 'sku'], yAxisHint: ['sales', 'qty', 'quantity', 'revenue'] },
            { id: 'c3', title: 'Market Share', type: 'pie', xAxisHint: ['brand', 'competitor', 'company'], yAxisHint: ['share', 'sales', 'percentage'] }
        ]
    },
    {
        id: 'survey_results',
        name: 'Survey Results',
        description: 'Analyze questionnaire feedback, ratings, and response distribution.',
        icon: '📋',
        metrics: [
            { id: 'm1', label: 'Total Responses', type: 'count', targetColumnHint: ['response', 'id', 'user', 'email'] },
            { id: 'm2', label: 'Average Rating', type: 'average', targetColumnHint: ['rating', 'score', 'satisfaction', 'nps'] },
            { id: 'm3', label: 'Most Selected Option', type: 'top_category', targetColumnHint: ['answer', 'option', 'choice', 'feedback'] }
        ],
        charts: [
            { id: 'c1', title: 'Response Distribution', type: 'pie', xAxisHint: ['answer', 'option', 'status', 'gender'], yAxisHint: ['count', 'response'] },
            { id: 'c2', title: 'Rating Breakdown', type: 'bar', xAxisHint: ['rating', 'score', 'nps'], yAxisHint: ['count', 'response'] },
            { id: 'c3', title: 'Response Trend', type: 'line', xAxisHint: ['date', 'time', 'submitted'], yAxisHint: ['count', 'response'] }
        ]
    },
    {
        id: 'student_performance',
        name: 'Student Performance',
        description: 'Evaluate grades, test scores, and academic progress over time.',
        icon: '🎓',
        metrics: [
            { id: 'm1', label: 'Average Score', type: 'average', targetColumnHint: ['score', 'grade', 'mark', 'percentage'] },
            { id: 'm2', label: 'Highest Score', type: 'max', targetColumnHint: ['score', 'grade', 'mark'] },
            { id: 'm3', label: 'Lowest Score', type: 'min', targetColumnHint: ['score', 'grade', 'mark'] }
        ],
        charts: [
            { id: 'c1', title: 'Subject Scores', type: 'bar', xAxisHint: ['subject', 'course', 'class'], yAxisHint: ['score', 'grade', 'mark'] },
            { id: 'c2', title: 'Score Distribution', type: 'histogram', xAxisHint: ['score', 'grade', 'percentage'], yAxisHint: ['score', 'grade'] },
            { id: 'c3', title: 'Progress Over Time', type: 'line', xAxisHint: ['date', 'semester', 'term', 'month'], yAxisHint: ['score', 'grade', 'gpa'] }
        ]
    },
    {
        id: 'website_analytics',
        name: 'Website Analytics',
        description: 'Detailed view of web traffic, session durations, and bounce rates.',
        icon: '🌐',
        metrics: [
            { id: 'm1', label: 'Total Visitors', type: 'sum', targetColumnHint: ['visitor', 'user', 'session', 'traffic'] },
            { id: 'm2', label: 'Avg Session Duration', type: 'average', targetColumnHint: ['duration', 'time', 'session_length'] },
            { id: 'm3', label: 'Bounce Rate', type: 'average', targetColumnHint: ['bounce', 'rate', 'exit'] }
        ],
        charts: [
            { id: 'c1', title: 'Traffic Trend', type: 'line', xAxisHint: ['date', 'day', 'month'], yAxisHint: ['visitor', 'session', 'user', 'pageview'] },
            { id: 'c2', title: 'Traffic Sources', type: 'pie', xAxisHint: ['source', 'medium', 'referrer', 'channel'], yAxisHint: ['visitor', 'session'] },
            { id: 'c3', title: 'Page Views by Page', type: 'bar', xAxisHint: ['page', 'path', 'url'], yAxisHint: ['pageview', 'view', 'visitor'] }
        ]
    },
    {
        id: 'expense_tracking',
        name: 'Expense Tracking',
        description: 'Personal or corporate expense visualization by category and time.',
        icon: '🧾',
        metrics: [
            { id: 'm1', label: 'Total Expenses', type: 'sum', targetColumnHint: ['expense', 'amount', 'cost', 'spend'] },
            { id: 'm2', label: 'Largest Category', type: 'top_category', targetColumnHint: ['category', 'type', 'merchant', 'vendor'] },
            { id: 'm3', label: 'Average Expense', type: 'average', targetColumnHint: ['expense', 'amount', 'cost'] }
        ],
        charts: [
            { id: 'c1', title: 'Spending by Category', type: 'pie', xAxisHint: ['category', 'type', 'merchant'], yAxisHint: ['amount', 'expense', 'cost'] },
            { id: 'c2', title: 'Monthly Expenses', type: 'line', xAxisHint: ['date', 'month', 'year'], yAxisHint: ['amount', 'expense', 'cost'] },
            { id: 'c3', title: 'Top Expense Categories', type: 'bar', xAxisHint: ['category', 'type', 'group'], yAxisHint: ['amount', 'expense', 'cost'] }
        ]
    },
    {
        id: 'research_data',
        name: 'Research Data',
        description: 'Statistical dashboard for empirical data, highlighting distributions and correlations.',
        icon: '🔬',
        metrics: [
            { id: 'm1', label: 'Sample Size', type: 'count', targetColumnHint: ['id', 'subject', 'participant', 'row'] },
            { id: 'm2', label: 'Mean Value', type: 'average', targetColumnHint: ['value', 'measurement', 'result', 'variable'] },
            { id: 'm3', label: 'Max Value', type: 'max', targetColumnHint: ['value', 'measurement', 'result'] }
        ],
        charts: [
            { id: 'c1', title: 'Variable Correlation', type: 'scatter', xAxisHint: ['variable1', 'x', 'control'], yAxisHint: ['variable2', 'y', 'result'] },
            { id: 'c2', title: 'Data Distribution', type: 'histogram', xAxisHint: ['value', 'measurement', 'result'], yAxisHint: ['value', 'measurement'] },
            { id: 'c3', title: 'Category Comparison', type: 'bar', xAxisHint: ['group', 'condition', 'treatment', 'category'], yAxisHint: ['value', 'measurement', 'result'] }
        ]
    },
    {
        id: 'inventory_dashboard',
        name: 'Inventory Dashboard',
        description: 'Monitor stock levels, warehouse distribution, and restock timing.',
        icon: '📦',
        metrics: [
            { id: 'm1', label: 'Total Items', type: 'sum', targetColumnHint: ['stock', 'quantity', 'qty', 'inventory'] },
            { id: 'm2', label: 'Average Stock', type: 'average', targetColumnHint: ['stock', 'quantity', 'qty'] },
            { id: 'm3', label: 'Most Stocked Product', type: 'top_category', targetColumnHint: ['product', 'item', 'sku', 'name'] }
        ],
        charts: [
            { id: 'c1', title: 'Stock Levels', type: 'bar', xAxisHint: ['product', 'item', 'sku'], yAxisHint: ['stock', 'quantity', 'qty'] },
            { id: 'c2', title: 'Inventory Distribution', type: 'pie', xAxisHint: ['warehouse', 'location', 'category'], yAxisHint: ['stock', 'quantity', 'value'] },
            { id: 'c3', title: 'Restock Trend', type: 'line', xAxisHint: ['date', 'month', 'received'], yAxisHint: ['restock', 'quantity', 'order'] }
        ]
    }
];
