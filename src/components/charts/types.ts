export type ChartType =
    | 'bar'
    | 'line'
    | 'pie'
    | 'area'
    | 'scatter'
    | 'radar'
    | 'bubble'
    | 'grouped_bar'
    | 'stacked_bar'
    | 'histogram' // handled via data transformation
    | 'heatmap';  // handled via scatter with specific shapes

export interface ChartConfig {
    id: string;
    type: ChartType;
    title: string;
    xAxisKey: string;
    yAxisKeys: string[]; // Can be multiple for grouped/stacked/multi-line
    zAxisKey?: string; // Used for bubble size or heatmap color intensity
    color?: string; // Base color
    colors?: string[]; // Array of colors for multi-series
}
