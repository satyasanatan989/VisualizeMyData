import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Privacy Policy | VisualizeMyData',
    description: 'Privacy Policy for VisualizeMyData (ToolVista). Learn how we protect your privacy through 100% browser-based local file processing.',
    alternates: {
        canonical: 'https://visualizemydata.in/privacy-policy',
    },
    openGraph: {
        title: 'Privacy Policy | VisualizeMyData',
        description: 'Privacy Policy for VisualizeMyData (ToolVista). Learn how we protect your privacy through 100% browser-based local file processing.',
        url: 'https://visualizemydata.in/privacy-policy',
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
        title: 'Privacy Policy | VisualizeMyData',
        description: 'Privacy Policy for VisualizeMyData (ToolVista). Learn how we protect your privacy through 100% browser-based local file processing.',
        images: ['/og-image.png'],
    },
};;

export default function PrivacyPolicyPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />
            <div className="container" style={{ maxWidth: 760, padding: '64px 24px' }}>
                <article className="prose">
                    <div style={{ marginBottom: 40 }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Legal</span>
                        <h1 style={{ marginTop: 8 }}>Privacy Policy</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Last updated: March 2026</p>
                    </div>

                    <p>
                        At <strong>DataVisualizer</strong> ("we", "us", or "our"), your privacy is our top priority. This Privacy Policy explains what information we collect (if any), how we handle your files, and what rights you have regarding your data.
                    </p>

                    <h2>1. Overview</h2>
                    <p>
                        DataVisualizer is a browser-based data visualization tool. The core principle of our service is that <strong>all file processing happens entirely within your web browser</strong>. We do not operate a file upload server. Your files are never transmitted to our infrastructure.
                    </p>

                    <h2>2. File Processing & No Permanent Storage</h2>
                    <p>
                        When you upload an Excel, CSV, or PDF file, or connect a Google Sheets link, all data parsing and chart rendering occurs locally in your browser using JavaScript and WebAssembly. We confirm the following:
                    </p>
                    <ul>
                        <li>Your files are <strong>never sent to any server</strong> operated by DataVisualizer.</li>
                        <li>No file contents are <strong>permanently stored</strong> anywhere — on our systems or third-party services.</li>
                        <li>All data in memory is <strong>automatically cleared</strong> when you close or refresh the tab.</li>
                        <li>For Google Sheets links, we fetch a publicly available CSV export URL — only public data accessible without authentication is fetched.</li>
                    </ul>

                    <h2>3. No Data Sharing</h2>
                    <p>
                        We do not sell, rent, trade, or share any data with third parties. Since we do not collect file data, there is nothing to share. We do not integrate third-party analytics services that receive file content or user data from within the visualization tool.
                    </p>

                    <h2>4. Information We May Collect</h2>
                    <p>
                        Like most websites, our hosting infrastructure may automatically collect standard server log data when you visit the site. This may include:
                    </p>
                    <ul>
                        <li>IP address (anonymized)</li>
                        <li>Browser type and version</li>
                        <li>Page URL requested</li>
                        <li>Referring URL</li>
                        <li>Date and time of visit</li>
                    </ul>
                    <p>
                        This data is used solely to maintain site security, diagnose technical issues, and understand aggregate traffic patterns. It is not linked to any personal identity.
                    </p>

                    <h2>5. Cookies</h2>
                    <p>
                        We use cookies to enhance your experience, remember preferences (such as light or dark mode), and compile aggregate traffic data. Cookies are small text files stored on your device. You can control or disable cookies through your browser settings at any time.
                    </p>

                    <h2>6. Google Analytics</h2>
                    <p>
                        We use Google Analytics (specifically Google Analytics 4) to monitor website traffic, analyze user behavior, and improve our services. Google Analytics utilizes cookies to collect standard web log information and visitor behavior in an anonymous form. Crucially, **no files, raw data, or spreadsheet contents** you process in our tools are ever shared with or tracked by Google Analytics.
                    </p>

                    <h2>7. Google AdSense & Third-Party Advertising</h2>
                    <p>
                        We partner with third-party advertising companies, including Google AdSense, to serve ads when you visit our website. These companies may use cookies, web beacons, and other tracking technologies (such as Google's DART cookie) to serve personalized ads based on your visits to this and other sites on the internet.
                    </p>
                    <p>
                        You can opt out of personalized advertising by visiting Google's <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Ads Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting the <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">About Ads Choices</a> portal.
                    </p>

                    <h2>8. Browser-Based Processing & Data Privacy</h2>
                    <p>
                        To reiterate, all file modifications, conversions, and visual charting tools run purely client-side. Our **browser-based processing** model ensures that your files never hit any server. We perform **no permanent storage** or caching of your uploads, which guarantees total user privacy.
                    </p>

                    <h2>9. Third-Party Services & Hosting</h2>
                    <p>
                        Our hosting infrastructure (Vercel) may collect standard web server logs (such as user-agents and IP addresses) for security and performance diagnostics. These logs do not contain any personal data or file content. We encourage you to review Vercel's privacy policy for details.
                    </p>

                    <h2>10. Your Rights</h2>
                    <p>
                        Since we do not store personal data or file content, there is no data to access, correct, or delete. If you have concerns about any information collected through standard web logs, you may contact us and we will address your request within 30 days.
                    </p>

                    <h2>11. Contact Us</h2>
                    <p>
                        If you have questions about this Privacy Policy, please contact us at: <a href="/contact">our contact page</a>.
                    </p>
                </article>
            </div>
            <Footer />
        </div>
    );
}
