import Link from 'next/link';

interface DiscoveryLink {
    label: string;
    href: string;
    icon: string;
}

const DISCOVERY_LINKS: DiscoveryLink[] = [
    { icon: '🏠', label: 'Home', href: '/' },
    { icon: '📊', label: 'Dashboard Generator', href: '/dashboard-generator' },
    { icon: '📈', label: 'Excel Visualizer', href: '/excel-visualizer' },
    { icon: '📋', label: 'CSV Visualizer', href: '/csv-visualizer' },
    { icon: '📕', label: 'PDF Table to Chart', href: '/pdf-table-to-chart' },
    { icon: '🔗', label: 'Google Sheets Visualizer', href: '/google-sheets-visualizer' },
    { icon: '🌐', label: 'Online Chart Maker', href: '/online-chart-maker' },
    { icon: '🧹', label: 'Data Cleaning Tool', href: '/data-cleaning-tool' },
    { icon: '✨', label: 'Templates', href: '/templates' },
    { icon: '📝', label: 'Blog', href: '/blog' },
    { icon: '📑', label: 'Data Report', href: '/data-report-generator' },
    { icon: '📉', label: 'Multi-Chart Generator', href: '/multi-chart-generator' },
];

interface DiscoveryLinksProps {
    /** Optionally exclude the current page's href so it doesn't link to itself */
    currentHref?: string;
}

export default function DiscoveryLinks({ currentHref }: DiscoveryLinksProps) {
    const links = DISCOVERY_LINKS.filter((l) => l.href !== currentHref);

    return (
        <section
            aria-label="Browse More Data Visualization Tools"
            style={{
                padding: '36px 0 48px',
                borderTop: '1px solid var(--border-subtle)',
                background: 'var(--bg-secondary)',
            }}
        >
            <div className="container" style={{ maxWidth: 900 }}>
                <p style={{
                    fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.08em', color: 'var(--text-muted)',
                    marginBottom: 16, textAlign: 'center',
                }}>
                    More Data Visualization Tools
                </p>
                <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center',
                }}>
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                padding: '7px 14px', borderRadius: 8,
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-subtle)',
                                color: 'var(--text-secondary)',
                                fontSize: '0.8rem', fontWeight: 500,
                                textDecoration: 'none',
                                transition: 'border-color 0.15s, color 0.15s',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <span>{link.icon}</span>
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
