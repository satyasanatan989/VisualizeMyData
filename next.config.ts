import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      // ── CSV variants → /csv-visualizer ──────────────────────────────
      { source: '/csv-chart-generator',       destination: '/csv-visualizer',          permanent: true },
      { source: '/csv-chart-generator/',      destination: '/csv-visualizer/',         permanent: true },
      { source: '/csv-data-visualizer',       destination: '/csv-visualizer',          permanent: true },
      { source: '/csv-data-visualizer/',      destination: '/csv-visualizer/',         permanent: true },
      { source: '/csv-graph-maker',           destination: '/csv-visualizer',          permanent: true },
      { source: '/csv-graph-maker/',          destination: '/csv-visualizer/',         permanent: true },
      { source: '/csv-to-bar-chart',          destination: '/csv-visualizer',          permanent: true },
      { source: '/csv-to-bar-chart/',         destination: '/csv-visualizer/',         permanent: true },
      { source: '/csv-to-line-chart',         destination: '/csv-visualizer',          permanent: true },
      { source: '/csv-to-line-chart/',        destination: '/csv-visualizer/',         permanent: true },
      { source: '/csv-to-pie-chart',          destination: '/csv-visualizer',          permanent: true },
      { source: '/csv-to-pie-chart/',         destination: '/csv-visualizer/',         permanent: true },
      { source: '/csv-dashboard-generator',   destination: '/csv-visualizer',          permanent: true },
      { source: '/csv-dashboard-generator/',  destination: '/csv-visualizer/',         permanent: true },

      // ── Excel variants → /excel-visualizer ──────────────────────────
      { source: '/excel-chart-generator',     destination: '/excel-visualizer',        permanent: true },
      { source: '/excel-chart-generator/',    destination: '/excel-visualizer/',       permanent: true },
      { source: '/excel-data-visualizer',     destination: '/excel-visualizer',        permanent: true },
      { source: '/excel-data-visualizer/',    destination: '/excel-visualizer/',       permanent: true },
      { source: '/excel-graph-maker',         destination: '/excel-visualizer',        permanent: true },
      { source: '/excel-graph-maker/',        destination: '/excel-visualizer/',       permanent: true },
      { source: '/excel-to-bar-chart',        destination: '/excel-visualizer',        permanent: true },
      { source: '/excel-to-bar-chart/',       destination: '/excel-visualizer/',       permanent: true },
      { source: '/excel-to-line-chart',       destination: '/excel-visualizer',        permanent: true },
      { source: '/excel-to-line-chart/',      destination: '/excel-visualizer/',       permanent: true },
      { source: '/excel-to-pie-chart',        destination: '/excel-visualizer',        permanent: true },
      { source: '/excel-to-pie-chart/',       destination: '/excel-visualizer/',       permanent: true },
      { source: '/excel-to-scatter-plot',     destination: '/excel-visualizer',        permanent: true },
      { source: '/excel-to-scatter-plot/',    destination: '/excel-visualizer/',       permanent: true },
      { source: '/excel-dashboard-generator', destination: '/excel-visualizer',        permanent: true },
      { source: '/excel-dashboard-generator/', destination: '/excel-visualizer/',      permanent: true },

      // ── PDF variants → /pdf-table-to-chart ──────────────────────────
      { source: '/pdf-chart-generator',       destination: '/pdf-table-to-chart',      permanent: true },
      { source: '/pdf-chart-generator/',      destination: '/pdf-table-to-chart/',     permanent: true },
      { source: '/pdf-data-visualization',    destination: '/pdf-table-to-chart',      permanent: true },
      { source: '/pdf-data-visualization/',   destination: '/pdf-table-to-chart/',     permanent: true },
      { source: '/pdf-data-visualizer',       destination: '/pdf-table-to-chart',      permanent: true },
      { source: '/pdf-data-visualizer/',      destination: '/pdf-table-to-chart/',     permanent: true },
      { source: '/pdf-dashboard-generator',   destination: '/pdf-table-to-chart',      permanent: true },
      { source: '/pdf-dashboard-generator/',  destination: '/pdf-table-to-chart/',     permanent: true },
      { source: '/pdf-graph-maker',           destination: '/pdf-table-to-chart',      permanent: true },
      { source: '/pdf-graph-maker/',          destination: '/pdf-table-to-chart/',     permanent: true },
      { source: '/pdf-to-bar-chart',          destination: '/pdf-table-to-chart',      permanent: true },
      { source: '/pdf-to-bar-chart/',         destination: '/pdf-table-to-chart/',     permanent: true },
      { source: '/pdf-visualizer',            destination: '/pdf-table-to-chart',      permanent: true },
      { source: '/pdf-visualizer/',           destination: '/pdf-table-to-chart/',     permanent: true },

      // ── Google Sheets variants → /google-sheets-visualizer ──────────
      { source: '/google-sheets-chart-generator',      destination: '/google-sheets-visualizer', permanent: true },
      { source: '/google-sheets-chart-generator/',     destination: '/google-sheets-visualizer/', permanent: true },
      { source: '/google-sheets-dashboard',            destination: '/google-sheets-visualizer', permanent: true },
      { source: '/google-sheets-dashboard/',           destination: '/google-sheets-visualizer/', permanent: true },
      { source: '/google-sheets-dashboard-generator',  destination: '/google-sheets-visualizer', permanent: true },
      { source: '/google-sheets-dashboard-generator/', destination: '/google-sheets-visualizer/', permanent: true },
      { source: '/google-sheets-data-visualizer',      destination: '/google-sheets-visualizer', permanent: true },
      { source: '/google-sheets-data-visualizer/',     destination: '/google-sheets-visualizer/', permanent: true },
      { source: '/google-sheets-graph-maker',          destination: '/google-sheets-visualizer', permanent: true },
      { source: '/google-sheets-graph-maker/',         destination: '/google-sheets-visualizer/', permanent: true },

      // ── Generic charting variants → /online-chart-maker ─────────────
      { source: '/create-charts-online',      destination: '/online-chart-maker',      permanent: true },
      { source: '/create-charts-online/',     destination: '/online-chart-maker/',     permanent: true },
      { source: '/data-to-chart-online',      destination: '/online-chart-maker',      permanent: true },
      { source: '/data-to-chart-online/',     destination: '/online-chart-maker/',     permanent: true },
      { source: '/free-data-visualization-tool', destination: '/online-chart-maker',   permanent: true },
      { source: '/free-data-visualization-tool/', destination: '/online-chart-maker/', permanent: true },
      { source: '/spreadsheet-to-chart',      destination: '/online-chart-maker',      permanent: true },
      { source: '/spreadsheet-to-chart/',     destination: '/online-chart-maker/',     permanent: true },

      // ── Misc near-duplicate → canonical ──────────────────────────────
      { source: '/data-visualization-tool',   destination: '/data-analysis-tool',      permanent: true },
      { source: '/data-visualization-tool/',  destination: '/data-analysis-tool/',     permanent: true },
      { source: '/data-dashboard-builder',    destination: '/dashboard-generator',     permanent: true },
      { source: '/data-dashboard-builder/',   destination: '/dashboard-generator/',    permanent: true },

      // ── Duplicate tools → canonical tool ─────────────────────────────
      { source: '/tools/qr-code-generator',   destination: '/tools/qr-generator-pro', permanent: true },
      { source: '/tools/qr-code-generator/',  destination: '/tools/qr-generator-pro/', permanent: true },
      { source: '/tools/barcode-generator',   destination: '/tools/barcode-generator-pro', permanent: true },
      { source: '/tools/barcode-generator/',  destination: '/tools/barcode-generator-pro/', permanent: true },
    ];
  },
};

export default nextConfig;
