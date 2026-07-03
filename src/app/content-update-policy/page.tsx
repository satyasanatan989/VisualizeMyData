import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Content Update Policy | VisualizeMyData',
    description: 'Learn about VisualizeMyData\'s content review intervals, algorithmic updates, library upgrades, and historical corrections policy.',
    alternates: {
        canonical: 'https://visualizemydata.in/content-update-policy',
    },
    openGraph: {
        title: 'Content Update Policy | VisualizeMyData',
        description: 'Learn about VisualizeMyData\'s content review intervals, algorithmic updates, library upgrades, and historical corrections policy.',
        url: 'https://visualizemydata.in/content-update-policy',
        type: 'website',
        siteName: 'VisualizeMyData',
        locale: 'en_US',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'VisualizeMyData',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Content Update Policy | VisualizeMyData',
        description: 'Learn about VisualizeMyData\'s content review intervals, algorithmic updates, library upgrades, and historical corrections policy.',
        images: ['/og-image.png'],
    },
};

export default function ContentUpdatePolicyPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />
            <div className="container" style={{ maxWidth: 760, padding: '64px 24px' }}>
                <article className="prose">
                    <div style={{ marginBottom: 40 }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Updates &amp; Reviews</span>
                        <h1 style={{ marginTop: 8 }}>Content Update Policy</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Last updated: July 2026</p>
                    </div>

                    <h2>Our Commitment to Current Information</h2>
                    <p>
                        Data visualization, file encoding standards, image compression algorithms, and browser engines evolve continuously. To keep the content on VisualizeMyData (ToolVista) authoritative, useful, and fully functional, we enforce a strict Content Update Policy.
                    </p>

                    <h2>1. Quarterly Content Reviews</h2>
                    <p>
                        Our editorial and technical team reviews all static landing pages, blog articles, and tool documentation every 90 days. During this review:
                    </p>
                    <ul>
                        <li>We check that the screenshots and step-by-step guides match the current user interface.</li>
                        <li>We verify that referenced browser standards (such as WebAssembly compilations, Canvas filters, and SVG specs) conform to modern standard specifications.</li>
                        <li>We ensure that all internal and external links are active and secure.</li>
                    </ul>

                    <h2>2. Algorithmic and Library Upgrades</h2>
                    <p>
                        To guarantee the fastest possible execution speeds and absolute security, the libraries powering our tools (including SheetJS for Excel, PapaParse for CSV, and pdf-lib for PDF manipulation) are scanned and updated monthly. If an upgrade changes the tool's behavior or layout, the tool's usage guidelines are immediately revised.
                    </p>

                    <h2>3. Historical Correction Log</h2>
                    <p>
                        When a significant mathematical formula, layout logic, or text guideline is corrected on our site, we:
                    </p>
                    <ul>
                        <li>Update the "Last Updated" timestamp at the top of the corresponding page.</li>
                        <li>Maintain a clear record of changes within our repository logs to ensure transparency for both our users and search quality assessors.</li>
                    </ul>

                    <h2>4. Community-Driven Corrections</h2>
                    <p>
                        We encourage our users to suggest content improvements. If a reader highlights a bug or points out a formula inconsistency, our technical editors immediately initiate a correction review. Corrected guidelines are deployed directly to the production website.
                    </p>
                </article>
            </div>
            <Footer />
        </div>
    );
}
