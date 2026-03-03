import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Privacy Policy – DataVisualizer',
    description: 'DataVisualizer privacy policy. Learn how we protect your data — no file storage, no data sharing, browser-only processing.',
};

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
                        DataVisualizer uses minimal cookies necessary for site functionality, such as remembering your dark/light mode preference. We do not use advertising cookies or tracking cookies. If we display Google AdSense advertisements in the future, they may set their own cookies under Google's privacy policy.
                    </p>

                    <h2>6. Third-Party Services</h2>
                    <p>
                        Our website may be hosted on third-party infrastructure (such as Vercel). These providers have their own privacy policies governing the standard web request logs they process. We encourage you to review their policies.
                    </p>

                    <h2>7. Children's Privacy</h2>
                    <p>
                        DataVisualizer is not directed toward children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided personal information, please contact us.
                    </p>

                    <h2>8. Your Rights</h2>
                    <p>
                        Since we do not store personal data or file content, there is no data to access, correct, or delete. If you have concerns about any information collected through standard web logs, you may contact us and we will address your request within 30 days.
                    </p>

                    <h2>9. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy occasionally to reflect changes in our practices or legal requirements. We will update the "Last updated" date at the top of this page. Continued use of the service after changes constitutes acceptance of the updated policy.
                    </p>

                    <h2>10. Contact Us</h2>
                    <p>
                        If you have questions about this Privacy Policy, please contact us at: <a href="/contact">our contact page</a>.
                    </p>
                </article>
            </div>
            <Footer />
        </div>
    );
}
