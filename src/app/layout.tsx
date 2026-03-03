import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = "https://visualizemydata.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Free Excel, CSV & PDF Data Visualizer Online (No Login)",
    template: "%s | VisualizeMyData",
  },
  description:
    "Upload Excel, CSV, PDF or Google Sheets and instantly create beautiful charts online. 100% free, no signup required, files never leave your device.",
  keywords: [
    "free excel data visualizer without login",
    "convert excel file to graph online free",
    "csv to interactive chart generator",
    "visualize google sheets data instantly",
    "pdf table to chart online free",
    "private spreadsheet chart generator",
    "no signup excel graph tool",
    "data visualizer online free",
    "excel chart maker",
    "csv chart generator",
    "pdf data extractor",
  ],
  authors: [{ name: "VisualizeMyData" }],
  creator: "VisualizeMyData",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "VisualizeMyData",
    title: "Free Excel, CSV & PDF Data Visualizer Online (No Login)",
    description:
      "Create beautiful charts from Excel, CSV, Google Sheets, and PDF files instantly. Free, secure, browser-based — no signup needed.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VisualizeMyData – Free Online Chart Creator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Excel, CSV & PDF Data Visualizer Online (No Login)",
    description:
      "Create charts from Excel, CSV, PDF or Google Sheets instantly. Free & private — files stay on your device.",
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
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "VisualizeMyData",
  url: siteUrl,
  description:
    "Free online data visualization tool. Upload Excel, CSV, Google Sheets, or PDF files and instantly generate interactive charts. No login required.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Excel file visualization",
    "CSV chart generation",
    "PDF table extraction and visualization",
    "Google Sheets integration via URL",
    "Chart download as PNG and PDF",
    "100% browser-based processing — no file uploads to server",
    "Bar, line, area, and pie charts",
    "Color palette customization",
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
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className="antialiased">
        {children}
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K9YT82L55H"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K9YT82L55H');
          `}
        </Script>
      </body>
    </html>
  );
}
