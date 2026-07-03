import { ChartType } from '@/components/charts/types';

export interface DashboardMetricConfig {
    id: string;
    label: string;
    type: 'sum' | 'average' | 'count' | 'top_category' | 'min' | 'max';
    targetColumnHint: string[];
}

export interface DashboardChartConfig {
    id: string;
    title: string;
    type: ChartType;
    xAxisHint: string[];
    yAxisHint: string[];
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
        name: 'Auto-Detect AI Dashboard',
        description: 'Our rule-based recommendation engine maps metrics and visualizes trends automatically.',
        icon: '✨',
        metrics: [],
        charts: []
    },
    {
        id: 'sales_dashboard',
        name: 'Sales Performance Dashboard',
        description: 'Track individual product performance, sales volume, and regional market share.',
        icon: '🛍️',
        metrics: [
            { id: 'm1', label: 'Total Sales', type: 'sum', targetColumnHint: ['sales', 'revenue', 'amount', 'total'] },
            { id: 'm2', label: 'Average Order Value', type: 'average', targetColumnHint: ['order', 'cart', 'sales', 'amount', 'price'] },
            { id: 'm3', label: 'Top Product category', type: 'top_category', targetColumnHint: ['product', 'item', 'category', 'sku'] }
        ],
        charts: [
            { id: 'c1', title: 'Sales Trend Over Time', type: 'line', xAxisHint: ['date', 'month', 'week', 'year'], yAxisHint: ['sales', 'revenue', 'amount'] },
            { id: 'c2', title: 'Product Breakdown', type: 'bar', xAxisHint: ['product', 'item', 'category'], yAxisHint: ['sales', 'revenue', 'quantity', 'qty'] },
            { id: 'c3', title: 'Sales Shares', type: 'pie', xAxisHint: ['region', 'country', 'state', 'channel'], yAxisHint: ['sales', 'revenue', 'percentage'] }
        ]
    },
    {
        id: 'financial_analysis',
        name: 'Finance Dashboard',
        description: 'Deep dive into revenue, operational expenses, cash flow, and profit margins.',
        icon: '💰',
        metrics: [
            { id: 'm1', label: 'Total Revenue', type: 'sum', targetColumnHint: ['revenue', 'income', 'sales', 'amount'] },
            { id: 'm2', label: 'Total Expense', type: 'sum', targetColumnHint: ['expense', 'cost', 'spend', 'outflow'] },
            { id: 'm3', label: 'Net Profit Margin', type: 'sum', targetColumnHint: ['profit', 'net', 'margin'] }
        ],
        charts: [
            { id: 'c1', title: 'Revenue vs expenses', type: 'line', xAxisHint: ['date', 'month', 'quarter'], yAxisHint: ['revenue', 'expense', 'income', 'cost'] },
            { id: 'c2', title: 'Expense Categories', type: 'pie', xAxisHint: ['category', 'merchant', 'department'], yAxisHint: ['expense', 'cost', 'amount'] },
            { id: 'c3', title: 'Operating Profit margin', type: 'bar', xAxisHint: ['date', 'month', 'year'], yAxisHint: ['profit', 'revenue', 'margin'] }
        ]
    },
    {
        id: 'student_performance',
        name: 'Student Dashboard',
        description: 'Evaluate grades, average marks, attendance progress, and test distributions.',
        icon: '🎓',
        metrics: [
            { id: 'm1', label: 'Average Score', type: 'average', targetColumnHint: ['score', 'grade', 'mark', 'percentage', 'gpa'] },
            { id: 'm2', label: 'Highest Score', type: 'max', targetColumnHint: ['score', 'grade', 'mark'] },
            { id: 'm3', label: 'Student Count', type: 'count', targetColumnHint: ['id', 'student', 'roll', 'name'] }
        ],
        charts: [
            { id: 'c1', title: 'Score by Subjects', type: 'bar', xAxisHint: ['subject', 'course', 'class'], yAxisHint: ['score', 'grade', 'mark'] },
            { id: 'c2', title: 'Academic Progress', type: 'line', xAxisHint: ['date', 'semester', 'term', 'exam'], yAxisHint: ['score', 'grade', 'gpa'] },
            { id: 'c3', title: 'Grade Distribution', type: 'pie', xAxisHint: ['grade', 'letter', 'rating'], yAxisHint: ['count', 'score'] }
        ]
    },
    {
        id: 'attendance_dashboard',
        name: 'Attendance Dashboard',
        description: 'Monitor daily attendance rates, employee logs, leaves, and trends.',
        icon: '📅',
        metrics: [
            { id: 'm1', label: 'Average Attendance Rate', type: 'average', targetColumnHint: ['attendance', 'present', 'rate', 'percentage'] },
            { id: 'm2', label: 'Total Present Days', type: 'sum', targetColumnHint: ['present', 'days', 'count'] },
            { id: 'm3', label: 'Total Leave Days', type: 'sum', targetColumnHint: ['leave', 'absent', 'sick'] }
        ],
        charts: [
            { id: 'c1', title: 'Attendance Trend', type: 'line', xAxisHint: ['date', 'day', 'week', 'month'], yAxisHint: ['attendance', 'present', 'rate'] },
            { id: 'c2', title: 'Department Attendance', type: 'bar', xAxisHint: ['department', 'division', 'team'], yAxisHint: ['attendance', 'present', 'rate'] },
            { id: 'c3', title: 'Status Distribution', type: 'pie', xAxisHint: ['status', 'type', 'reason'], yAxisHint: ['count', 'days'] }
        ]
    },
    {
        id: 'hr_dashboard',
        name: 'HR & People Dashboard',
        description: 'Track headcount distributions, employee satisfaction scores, and turnover.',
        icon: '👥',
        metrics: [
            { id: 'm1', label: 'Total Headcount', type: 'count', targetColumnHint: ['id', 'employee', 'name', 'staff'] },
            { id: 'm2', label: 'Avg Tenure Years', type: 'average', targetColumnHint: ['tenure', 'experience', 'years'] },
            { id: 'm3', label: 'Employee NPS Rating', type: 'average', targetColumnHint: ['satisfaction', 'nps', 'score', 'rating'] }
        ],
        charts: [
            { id: 'c1', title: 'Headcount by Department', type: 'bar', xAxisHint: ['department', 'role', 'division'], yAxisHint: ['count', 'id'] },
            { id: 'c2', title: 'Satisfaction over time', type: 'line', xAxisHint: ['date', 'survey', 'quarter'], yAxisHint: ['satisfaction', 'nps', 'score'] },
            { id: 'c3', title: 'Gender Diversity', type: 'pie', xAxisHint: ['gender', 'sex', 'diversity'], yAxisHint: ['count', 'id'] }
        ]
    },
    {
        id: 'inventory_dashboard',
        name: 'Inventory Dashboard',
        description: 'Monitor warehouse stock levels, cost evaluations, and restock volumes.',
        icon: '📦',
        metrics: [
            { id: 'm1', label: 'Total Items in Stock', type: 'sum', targetColumnHint: ['stock', 'quantity', 'qty', 'inventory'] },
            { id: 'm2', label: 'Average Cost Per Item', type: 'average', targetColumnHint: ['cost', 'price', 'value'] },
            { id: 'm3', label: 'Top Stocked SKU', type: 'top_category', targetColumnHint: ['sku', 'product', 'item', 'name'] }
        ],
        charts: [
            { id: 'c1', title: 'Stock by Category', type: 'bar', xAxisHint: ['category', 'product', 'warehouse'], yAxisHint: ['stock', 'quantity', 'qty'] },
            { id: 'c2', title: 'Cost Trend', type: 'line', xAxisHint: ['date', 'month', 'purchased'], yAxisHint: ['cost', 'price', 'value'] },
            { id: 'c3', title: 'Warehouse Allocation', type: 'pie', xAxisHint: ['warehouse', 'location', 'rack'], yAxisHint: ['stock', 'quantity'] }
        ]
    },
    {
        id: 'marketing_analytics',
        name: 'Marketing Dashboard',
        description: 'Track visitor traffic channels, click-through rates (CTR), and lead capture.',
        icon: '🎯',
        metrics: [
            { id: 'm1', label: 'Total Traffic', type: 'sum', targetColumnHint: ['lead', 'visitor', 'traffic', 'session'] },
            { id: 'm2', label: 'Average CTR %', type: 'average', targetColumnHint: ['ctr', 'conversion', 'rate'] },
            { id: 'm3', label: 'Cost Per Lead (CPL)', type: 'average', targetColumnHint: ['cpl', 'cost', 'spend', 'cac'] }
        ],
        charts: [
            { id: 'c1', title: 'Traffic Channels', type: 'bar', xAxisHint: ['channel', 'source', 'medium'], yAxisHint: ['visitor', 'lead', 'session'] },
            { id: 'c2', title: 'Leads Timeline', type: 'line', xAxisHint: ['date', 'week', 'month'], yAxisHint: ['lead', 'conversion', 'visitor'] },
            { id: 'c3', title: 'Campaign Budgets', type: 'pie', xAxisHint: ['campaign', 'ad', 'source'], yAxisHint: ['spend', 'cost', 'budget'] }
        ]
    },
    {
        id: 'business_performance',
        name: 'Business Dashboard',
        description: 'Analyze overall enterprise KPIs, operating cost structures, and ROI charts.',
        icon: '🏢',
        metrics: [
            { id: 'm1', label: 'Total Revenue', type: 'sum', targetColumnHint: ['revenue', 'sales', 'turnover'] },
            { id: 'm2', label: 'Operational Margin', type: 'average', targetColumnHint: ['margin', 'percentage', 'roi'] },
            { id: 'm3', label: 'Top Business unit', type: 'top_category', targetColumnHint: ['unit', 'branch', 'region', 'category'] }
        ],
        charts: [
            { id: 'c1', title: 'Enterprise Revenue Trend', type: 'line', xAxisHint: ['date', 'month', 'year'], yAxisHint: ['revenue', 'sales', 'turnover'] },
            { id: 'c2', title: 'Regional Business Units', type: 'bar', xAxisHint: ['region', 'branch', 'unit'], yAxisHint: ['revenue', 'sales'] },
            { id: 'c3', title: 'Revenue Share by Segments', type: 'pie', xAxisHint: ['segment', 'category', 'product'], yAxisHint: ['revenue', 'sales'] }
        ]
    },
    {
        id: 'manufacturing_dashboard',
        name: 'Manufacturing Dashboard',
        description: 'Track plant output units, defect ratios, and equipment utilization metrics.',
        icon: '🏭',
        metrics: [
            { id: 'm1', label: 'Total Produced Units', type: 'sum', targetColumnHint: ['produced', 'output', 'units', 'yield'] },
            { id: 'm2', label: 'Average Defect Rate', type: 'average', targetColumnHint: ['defect', 'reject', 'failure', 'waste'] },
            { id: 'm3', label: 'Top Production line', type: 'top_category', targetColumnHint: ['line', 'shift', 'operator', 'machine'] }
        ],
        charts: [
            { id: 'c1', title: 'Produced Yield Timeline', type: 'line', xAxisHint: ['date', 'shift', 'hour', 'day'], yAxisHint: ['produced', 'output', 'units'] },
            { id: 'c2', title: 'Defect Analysis', type: 'bar', xAxisHint: ['defect_reason', 'category', 'machine'], yAxisHint: ['defect', 'reject', 'count'] },
            { id: 'c3', title: 'Shift Efficiency', type: 'pie', xAxisHint: ['shift', 'line', 'operator'], yAxisHint: ['produced', 'output'] }
        ]
    },
    {
        id: 'food_industry_dashboard',
        name: 'Food Industry Dashboard',
        description: 'Evaluate milk Gerber fat values, recipe scaling proportions, and temperature logs.',
        icon: '🥛',
        metrics: [
            { id: 'm1', label: 'Average Gerber Fat %', type: 'average', targetColumnHint: ['fat', 'gerber', 'fat_percent'] },
            { id: 'm2', label: 'Average SNF %', type: 'average', targetColumnHint: ['snf', 'solids'] },
            { id: 'm3', label: 'Total Batch volume', type: 'sum', targetColumnHint: ['volume', 'liters', 'qty', 'batch'] }
        ],
        charts: [
            { id: 'c1', title: 'Fat and SNF Trend', type: 'line', xAxisHint: ['date', 'time', 'batch'], yAxisHint: ['fat', 'snf', 'solids'] },
            { id: 'c2', title: 'Portion Yield by Supplier', type: 'bar', xAxisHint: ['supplier', 'vendor', 'source'], yAxisHint: ['volume', 'liters', 'qty'] },
            { id: 'c3', title: 'Quality Status Breakdown', type: 'pie', xAxisHint: ['status', 'grade', 'qc'], yAxisHint: ['volume', 'count'] }
        ]
    },
    {
        id: 'healthcare_dashboard',
        name: 'Healthcare Dashboard',
        description: 'Track patient admission counts, average recovery duration, and doctor schedules.',
        icon: '🏥',
        metrics: [
            { id: 'm1', label: 'Total Admitted Patients', type: 'count', targetColumnHint: ['id', 'patient', 'name'] },
            { id: 'm2', label: 'Avg Recovery Days', type: 'average', targetColumnHint: ['recovery', 'days', 'stay'] },
            { id: 'm3', label: 'Top Admission Category', type: 'top_category', targetColumnHint: ['diagnosis', 'ward', 'department', 'type'] }
        ],
        charts: [
            { id: 'c1', title: 'Patient Admissions Trend', type: 'line', xAxisHint: ['date', 'week', 'month'], yAxisHint: ['count', 'id'] },
            { id: 'c2', title: 'Diagnosis Breakdown', type: 'bar', xAxisHint: ['diagnosis', 'department', 'ward'], yAxisHint: ['count', 'id'] },
            { id: 'c3', title: 'Ward Capacity Distribution', type: 'pie', xAxisHint: ['ward', 'room', 'status'], yAxisHint: ['count', 'id'] }
        ]
    },
    {
        id: 'research_data',
        name: 'Research Dashboard',
        description: 'Statistical analysis for scientific variables, showing outliers and distributions.',
        icon: '🔬',
        metrics: [
            { id: 'm1', label: 'Total Samples Analyzed', type: 'count', targetColumnHint: ['id', 'sample', 'row'] },
            { id: 'm2', label: 'Mean Measurement', type: 'average', targetColumnHint: ['value', 'measurement', 'score', 'temperature'] },
            { id: 'm3', label: 'Standard Deviation Proxy', type: 'average', targetColumnHint: ['variance', 'error', 'deviation'] }
        ],
        charts: [
            { id: 'c1', title: 'Variables Scatter Plot', type: 'scatter', xAxisHint: ['variable1', 'x', 'control'], yAxisHint: ['variable2', 'y', 'measurement'] },
            { id: 'c2', title: 'Measurement Distribution', type: 'histogram', xAxisHint: ['value', 'measurement'], yAxisHint: ['value', 'measurement'] },
            { id: 'c3', title: 'Category Distributions', type: 'pie', xAxisHint: ['group', 'condition', 'category'], yAxisHint: ['count', 'id'] }
        ]
    },
    {
        id: 'ecommerce_dashboard',
        name: 'E-commerce Dashboard',
        description: 'Monitor shopping cart metrics, sales funnel stages, conversion rates, and revenue.',
        icon: '🛒',
        metrics: [
            { id: 'm1', label: 'Gross Revenue', type: 'sum', targetColumnHint: ['revenue', 'sales', 'total', 'amount'] },
            { id: 'm2', label: 'Avg Order Value (AOV)', type: 'average', targetColumnHint: ['aov', 'order_value', 'sales', 'price'] },
            { id: 'm3', label: 'Checkout Conversion Rate', type: 'average', targetColumnHint: ['conversion', 'rate', 'funnel'] }
        ],
        charts: [
            { id: 'c1', title: 'Daily Revenue Timeline', type: 'line', xAxisHint: ['date', 'day', 'hour'], yAxisHint: ['revenue', 'sales', 'amount'] },
            { id: 'c2', title: 'Traffic to Checkout Funnel', type: 'bar', xAxisHint: ['stage', 'step', 'funnel'], yAxisHint: ['visitors', 'count', 'sessions'] },
            { id: 'c3', title: 'Product Category Shares', type: 'pie', xAxisHint: ['category', 'department', 'type'], yAxisHint: ['revenue', 'sales'] }
        ]
    },
    {
        id: 'expense_tracking',
        name: 'Expense Dashboard',
        description: 'Monitor personal budgets, operational spends, and category costs.',
        icon: '🧾',
        metrics: [
            { id: 'm1', label: 'Total Expenses Logged', type: 'sum', targetColumnHint: ['expense', 'amount', 'cost', 'spend'] },
            { id: 'm2', label: 'Average Transaction Cost', type: 'average', targetColumnHint: ['expense', 'amount', 'cost'] },
            { id: 'm3', label: 'Largest Expense Category', type: 'top_category', targetColumnHint: ['category', 'merchant', 'vendor'] }
        ],
        charts: [
            { id: 'c1', title: 'Spending Categories', type: 'pie', xAxisHint: ['category', 'merchant', 'vendor'], yAxisHint: ['amount', 'expense', 'cost'] },
            { id: 'c2', title: 'Expenses Timeline', type: 'line', xAxisHint: ['date', 'month', 'week'], yAxisHint: ['amount', 'expense'] },
            { id: 'c3', title: 'Cost Centers Comparison', type: 'bar', xAxisHint: ['center', 'department', 'merchant'], yAxisHint: ['amount', 'expense', 'cost'] }
        ]
    },
    {
        id: 'project_dashboard',
        name: 'Project & Tasks Dashboard',
        description: 'Track task completion times, active sprints, milestones, and status metrics.',
        icon: '📋',
        metrics: [
            { id: 'm1', label: 'Total Tracked Tasks', type: 'count', targetColumnHint: ['id', 'task', 'ticket'] },
            { id: 'm2', label: 'Task Completion Rate', type: 'average', targetColumnHint: ['completion', 'done', 'rate', 'percentage'] },
            { id: 'm3', label: 'Most Active Assignee', type: 'top_category', targetColumnHint: ['assignee', 'user', 'owner', 'developer'] }
        ],
        charts: [
            { id: 'c1', title: 'Task Count by Status', type: 'bar', xAxisHint: ['status', 'state', 'stage'], yAxisHint: ['count', 'id'] },
            { id: 'c2', title: 'Task Completions Timeline', type: 'line', xAxisHint: ['date', 'week', 'milestone'], yAxisHint: ['completed', 'done', 'count'] },
            { id: 'c3', title: 'Assignee Allocation', type: 'pie', xAxisHint: ['assignee', 'user', 'owner'], yAxisHint: ['count', 'id'] }
        ]
    }
];
