import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Editorial Policy | VisualizeMyData',
    description: 'Learn about VisualizeMyData\'s editorial policies, scientific verification methods, author accountability, and technical correctness reviews.',
    alternates: {
        canonical: 'https://visualizemydata.in/editorial-policy',
    },
    openGraph: {
        title: 'Editorial Policy | VisualizeMyData',
        description: 'Learn about VisualizeMyData\'s editorial policies, scientific verification methods, author accountability, and technical correctness reviews.',
        url: 'https://visualizemydata.in/editorial-policy',
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
        title: 'Editorial Policy | VisualizeMyData',
        description: 'Learn about VisualizeMyData\'s editorial policies, scientific verification methods, author accountability, and technical correctness reviews.',
        images: ['/og-image.png'],
    },
};

export default function EditorialPolicyPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />
            <div className="container" style={{ maxWidth: 760, padding: '64px 24px' }}>
                <article className="prose">
                    <div style={{ marginBottom: 40 }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Trust &amp; EEAT</span>
                        <h1 style={{ marginTop: 8 }}>Editorial Policy</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Last updated: July 2026</p>
                    </div>

                    <h2>Our Editorial Standard</h2>
                    <p>
                        At VisualizeMyData, we are committed to providing our users with highly accurate, technically correct, and mathematically verified content. Our educational articles, user guides, use cases, and tool documentations are designed to help developers, analysts, and students make sense of their data safely and efficiently.
                    </p>

                    <h2>Accuracy and Peer Verification</h2>
                    <p>
                        Every piece of content and tool manual on our platform undergoes a strict multi-step review process:
                    </p>
                    <ul>
                        <li><strong>Mathematical Checking:</strong> All formulas used in calculators, converters, and visualizers (such as GPA grade conversions, Gerber fat SNF milk calculations, or financial invoice calculations) are audited against official textbooks, state regulatory criteria, and industrial documentation.</li>
                        <li><strong>Code Validation:</strong> Technical developer tools, parser explanations, and data cleaning tutorials are verified by practicing software engineers to ensure code snippets are valid, up-to-date, and performant.</li>
                        <li><strong>Human-Written Content:</strong> We strictly oppose AI-generated filler text or thin explanations. Every sentence is written, structured, and polished by human data experts who understand the challenges of data manipulation.</li>
                    </ul>

                    <h2>Author Accountability and Credentials</h2>
                    <p>
                        Our authors and technical reviewers are certified practitioners with degrees in computer science, statistics, or visual communication. We display clear author details (name, role, short biography) alongside update timestamps on all educational resources, ensuring our users know they are learning from authoritative industry professionals.
                    </p>

                    <h2>Feedback and Corrections</h2>
                    <p>
                        If you spot an error, unclear formula, or outdated instruction in our guides, we encourage you to request corrections immediately. You can contact us via our official support email or use the "Suggest Correction" links available at the footer of our articles. We commit to reviewing and updating verified content issues within 48 business hours.
                    </p>
                </article>
            </div>
            <Footer />
        </div>
    );
}
