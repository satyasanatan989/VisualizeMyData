import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'How We Test Tools | VisualizeMyData',
    description: 'Learn about VisualizeMyData\'s tool testing methodologies, offline capabilities check, performance targets, and security sandbox audits.',
    alternates: {
        canonical: 'https://visualizemydata.in/how-we-test-tools',
    },
    openGraph: {
        title: 'How We Test Tools | VisualizeMyData',
        description: 'Learn about VisualizeMyData\'s tool testing methodologies, offline capabilities check, performance targets, and security sandbox audits.',
        url: 'https://visualizemydata.in/how-we-test-tools',
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
        title: 'How We Test Tools | VisualizeMyData',
        description: 'Learn about VisualizeMyData\'s tool testing methodologies, offline capabilities check, performance targets, and security sandbox audits.',
        images: ['/og-image.png'],
    },
};

export default function HowWeTestToolsPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />
            <div className="container" style={{ maxWidth: 760, padding: '64px 24px' }}>
                <article className="prose">
                    <div style={{ marginBottom: 40 }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Testing &amp; QA</span>
                        <h1 style={{ marginTop: 8 }}>How We Test Tools</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Last updated: July 2026</p>
                    </div>

                    <h2>Our Testing Philosophy</h2>
                    <p>
                        Every tool published on VisualizeMyData (ToolVista) must be 100% reliable, fast, private, and easy to use. To ensure a premium user experience and maintain Google AdSense compliance, we subject all browser utilities to a rigorous quality control check before release.
                    </p>

                    <h2>1. 100% In-Browser Privacy Audit</h2>
                    <p>
                        Our primary value is data sovereignty. We run strict network interception tests using browser developer consoles on every new release:
                    </p>
                    <ul>
                        <li>We verify that no network fetch or XHR requests are initiated when a user drags and drops a spreadsheet, image, or PDF document into the workspace.</li>
                        <li>We confirm that data streams remain strictly inside the local tab's sandboxed JavaScript memory.</li>
                    </ul>

                    <h2>2. Offline Functionality &amp; Performance Verification</h2>
                    <p>
                        We measure client-side performance under varying device capacities:
                    </p>
                    <ul>
                        <li><strong>Offline Verification:</strong> We completely cut the network connection and verify that all calculations, file parsing, formatting, and file exports complete without error.</li>
                        <li><strong>Performance Audits:</strong> Using Google Lighthouse, we target scores of <strong>95+</strong> for performance, accessibility, best practices, and SEO.</li>
                        <li><strong>File Stress Testing:</strong> We test converters with large files (up to 50MB) and verify that our algorithms gracefully handle memory allocations without browser tabs crashing.</li>
                    </ul>

                    <h2>3. Error Handling and Resiliency</h2>
                    <p>
                        A tool is only as good as its error handling. We explicitly inject corrupted inputs—such as misaligned CSV rows, binary streams instead of text, encrypted PDFs, or invalid grade scales—to verify that the tools display user-friendly troubleshooting instructions instead of locking the browser window.
                    </p>

                    <h2>4. Cross-Browser &amp; Accessibility Verification</h2>
                    <p>
                        We test on Chrome, Firefox, Safari, and Microsoft Edge across multiple viewports (iPhone, Android mobile, iPad, and wide desktops) to verify responsive scaling. All layouts are designed in accordance with Web Content Accessibility Guidelines (WCAG) AA standards, ensuring clear color contrasts and accessible font scaling.
                    </p>
                </article>
            </div>
            <Footer />
        </div>
    );
}
