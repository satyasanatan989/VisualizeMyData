import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free PDF Invoice Generator online for Indian Businesses | VisualizeMyData',
    description: 'Learn how to generate professional, GST-compliant invoice PDF reports online for free. Ideal for Indian freelancers, consultants, and SMBs.',
    alternates: {
        canonical: 'https://visualizemydata.in/blog/free-invoice-generator-india/',
    },
    openGraph: {
        title: 'Free PDF Invoice Generator online for Indian Businesses | VisualizeMyData',
        description: 'Learn how to generate professional, GST-compliant invoice PDF reports online for free. Ideal for Indian freelancers, consultants, and SMBs.',
        url: 'https://visualizemydata.in/blog/free-invoice-generator-india/',
        type: 'article',
        siteName: 'VisualizeMyData',
        locale: 'en_US',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Free Invoice Generator India' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free PDF Invoice Generator online for Indian Businesses',
        description: 'Create GST-compliant invoices online for free. No signup required, fully secure and client-side.',
        images: ['/og-image.png'],
    },
};

export default function Page() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />
            <article style={{ padding: '56px 0 80px' }}>
                <div className="container" style={{ maxWidth: 760 }}>
                    <div style={{ marginBottom: 40 }}>
                        <Link href="/blog" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>← Blog</Link>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: 99, fontSize: '0.7rem', fontWeight: 700, color: '#f43f5e', marginLeft: 12 }}>Business Guides</span>
                    </div>

                    <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.4rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 16 }}>
                        How to Generate GST-Compliant Invoices for Free in India
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 40 }}>July 2026 · 11 min read · By Prabhash Kumar</p>

                    <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
                        <p style={{ marginBottom: 24 }}>
                            If you are a freelancer, independent consultant, or small business owner in India, billing your clients professionally is essential. Under Indian tax laws, invoices must contain specific details to be GST-compliant, such as GSTIN numbers, state codes, HSNSAC codes, and separate CGST/SGST/IGST tax breakdowns.
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            In this guide, we will show you how to generate professional, printable, and fully compliant GST invoices online for free.
                        </p>

                        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginTop: 40, marginBottom: 16 }}>
                            What Makes an Invoice GST-Compliant in India?
                        </h2>
                        <p style={{ marginBottom: 24 }}>
                            To comply with the Central Board of Indirect Taxes and Customs (CBIC) rules, your invoice must clearly state:
                        </p>
                        <ul style={{ paddingLeft: 20, marginBottom: 24, listStyleType: 'disc' }}>
                            <li style={{ marginBottom: 8 }}><strong>Seller &amp; Buyer Details:</strong> Full legal names, addresses, and GSTINs (if registered).</li>
                            <li style={{ marginBottom: 8 }}><strong>Invoice Number &amp; Date:</strong> A unique consecutive serial number for the financial year.</li>
                            <li style={{ marginBottom: 8 }}><strong>Place of Supply:</strong> The state name (vital to determine CGST/SGST vs IGST).</li>
                            <li style={{ marginBottom: 8 }}><strong>HSN or SAC Codes:</strong> Harmonised System of Nomenclature for goods, or Services Accounting Codes for services.</li>
                            <li style={{ marginBottom: 8 }}><strong>Tax Breakdown:</strong> Split CGST (Central Tax) and SGST (State Tax) for intra-state supply, or IGST (Integrated Tax) for inter-state supply.</li>
                        </ul>

                        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginTop: 40, marginBottom: 16 }}>
                            How to Generate Your Invoice Client-Side
                        </h2>
                        <p style={{ marginBottom: 24 }}>
                            Rather than using offline word processors or sharing your financial figures with cloud-based invoicing apps, you can use browser-based tools:
                        </p>
                        <ol style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: 20, marginBottom: 24 }}>
                            <li>Navigate to the **PDF Invoice Generator** under our Business category (to be added in Phase 3).</li>
                            <li>Fill in your business details, client details, and transaction items.</li>
                            <li>Specify HSN/SAC codes and tax rates (typically 18% for most services in India).</li>
                            <li>The tool automatically computes the GST splits and total invoice value locally.</li>
                            <li>Click "Download PDF" to save a clean, print-ready document directly.</li>
                        </ol>

                        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginTop: 40, marginBottom: 16 }}>
                            Why Local Processing Matters
                        </h2>
                        <p style={{ marginBottom: 24 }}>
                            Your client records, billing values, and personal PAN/GSTIN details should remain secure. By using client-side tools like VisualizeMyData, all calculation and PDF formatting occur on your device memory. No database logs are created, maintaining complete business privacy.
                        </p>
                    </div>
                </div>
            </article>
            <Footer />
        </div>
    );
}
