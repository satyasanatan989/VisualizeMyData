import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import ContactView from '@/components/ContactView';

export const metadata: Metadata = {
    title: 'Contact Us | VisualizeMyData',
    description: 'Contact VisualizeMyData (ToolVista) support. Reach out with questions, bug reports, feature suggestions, or feedback about our free, 100% client-side utility tools.',
    alternates: {
        canonical: 'https://visualizemydata.in/contact',
    },
    openGraph: {
        title: 'Contact Us | VisualizeMyData',
        description: 'Contact VisualizeMyData (ToolVista) support. Reach out with questions, bug reports, or suggestions.',
        url: 'https://visualizemydata.in/contact',
        type: 'website',
    },
};

export default function ContactPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />
            <ContactView />
            <Footer />
        </div>
    );
}
