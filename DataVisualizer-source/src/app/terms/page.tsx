import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Terms & Conditions – DataVisualizer',
    description: 'Terms and conditions for using DataVisualizer. Free browser-based data visualization tool.',
};

export default function TermsPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />
            <div className="container" style={{ maxWidth: 760, padding: '64px 24px' }}>
                <article className="prose">
                    <div style={{ marginBottom: 40 }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Legal</span>
                        <h1 style={{ marginTop: 8 }}>Terms &amp; Conditions</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Last updated: March 2026</p>
                    </div>

                    <p>
                        These Terms and Conditions ("Terms") govern your use of the DataVisualizer website and services. By accessing or using DataVisualizer, you agree to be bound by these Terms. If you do not agree, please do not use the service.
                    </p>

                    <h2>1. Use of Service</h2>
                    <p>
                        DataVisualizer is a free, browser-based tool for visualizing spreadsheet and document data. You may use the service for personal, educational, or commercial data analysis purposes, provided that:
                    </p>
                    <ul>
                        <li>You do not use the service for any unlawful, fraudulent, or harmful purpose.</li>
                        <li>You do not attempt to reverse engineer, scrape, or overload the service.</li>
                        <li>You do not upload files containing illegal content or malicious code.</li>
                        <li>You are responsible for ensuring you have the right to process the data you upload.</li>
                    </ul>

                    <h2>2. Intellectual Property</h2>
                    <p>
                        All content on the DataVisualizer website, including the interface design, code, and branding, is the property of DataVisualizer and is protected by applicable intellectual property laws. The charts and visualizations generated from <em>your</em> data belong to you.
                    </p>

                    <h2>3. Disclaimer of Warranties</h2>
                    <p>
                        DataVisualizer is provided on an "as is" and "as available" basis without any warranties, express or implied. We do not warrant that the service will be uninterrupted, error-free, or that results from chart generation or PDF table extraction will be perfectly accurate.
                    </p>

                    <h2>4. Limitation of Liability</h2>
                    <p>
                        To the fullest extent permitted by applicable law, DataVisualizer and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service, including but not limited to loss of data, loss of revenue, or inaccurate chart output.
                    </p>

                    <h2>5. User Data and Privacy</h2>
                    <p>
                        Your use of the service is also governed by our <a href="/privacy-policy">Privacy Policy</a>, which describes how we handle (or specifically, how we do <em>not</em> handle) your data. All file processing is browser-based and no files are stored on our servers.
                    </p>

                    <h2>6. Acceptable Use</h2>
                    <p>You agree not to use DataVisualizer to:</p>
                    <ul>
                        <li>Violate any local, state, national, or international laws.</li>
                        <li>Process data belonging to others without appropriate authorization.</li>
                        <li>Attempt to gain unauthorized access to any part of the service.</li>
                        <li>Introduce viruses, malware, or any other malicious software.</li>
                    </ul>

                    <h2>7. Modifications</h2>
                    <p>
                        We reserve the right to modify or discontinue the service at any time without notice. We may also revise these Terms. Your continued use of the service following any changes constitutes acceptance of the new Terms.
                    </p>

                    <h2>8. Governing Law</h2>
                    <p>
                        These Terms are governed by the laws of the jurisdiction in which DataVisualizer operates, without regard to conflict of law principles.
                    </p>

                    <h2>9. Contact</h2>
                    <p>
                        For questions about these Terms, please visit our <a href="/contact">contact page</a>.
                    </p>
                </article>
            </div>
            <Footer />
        </div>
    );
}
