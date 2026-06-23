import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import { Toaster } from 'sonner';
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const siteUrl = "https://visualizemydata.in";

export const viewport: Viewport = {
  themeColor: "#0c0e12",
};

export const metadata: Metadata = {
  other: {
    "google-adsense-account": "ca-pub-9327674045083855",
  },
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
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9327674045083855"
          crossOrigin="anonymous"
        />
        <Toaster position="top-center" richColors theme="dark" closeButton duration={3000} />
        <PageTransition>
          {children}
        </PageTransition>
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
