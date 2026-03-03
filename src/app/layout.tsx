import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = "https://datavisualizer.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Free Data Visualizer Online | Excel, Google Sheets & PDF Charts",
    template: "%s | DataVisualizer",
  },
  description:
    "Upload Excel, Google Sheets, or PDF files and create instant charts online. Free, secure, and fast data visualization tool. No signup required.",
  keywords: [
    "data visualizer",
    "excel chart maker",
    "google sheets visualizer",
    "pdf data extractor",
    "csv chart generator",
    "free online charts",
    "data visualization tool",
  ],
  authors: [{ name: "DataVisualizer" }],
  creator: "DataVisualizer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "DataVisualizer",
    title: "Free Data Visualizer Online | Excel, Google Sheets & PDF Charts",
    description:
      "Create beautiful charts from Excel, CSV, Google Sheets, and PDF files instantly. Free, secure, browser-based.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DataVisualizer – Free Online Chart Creator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Data Visualizer Online | Excel, Google Sheets & PDF Charts",
    description:
      "Create beautiful charts from Excel, CSV, Google Sheets, and PDF files instantly.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "DataVisualizer",
  url: siteUrl,
  description:
    "Free online data visualization tool. Upload Excel, CSV, Google Sheets, or PDF files and instantly generate interactive charts.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Excel file visualization",
    "CSV chart generation",
    "PDF table extraction",
    "Google Sheets integration",
    "Chart download as PNG/PDF",
    "Browser-based processing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href={siteUrl} />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
