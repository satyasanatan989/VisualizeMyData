'use client';

import React from 'react';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { AlertCircle, Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <NavbarWrapper />

            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
                <div style={{ maxWidth: 560, width: '100%', textAlign: 'center' }}>
                    <div style={{ 
                        width: 72, 
                        height: 72, 
                        borderRadius: 20, 
                        background: 'rgba(239, 68, 68, 0.08)', 
                        border: '1px solid rgba(239, 68, 68, 0.2)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        margin: '0 auto 24px' 
                    }}>
                        <AlertCircle size={32} color="#ef4444" />
                    </div>

                    <h1 style={{ 
                        fontSize: 'clamp(2rem, 6vw, 3rem)', 
                        fontWeight: 900, 
                        marginBottom: 16, 
                        lineHeight: 1.15,
                        fontFamily: 'var(--font-manrope)',
                        letterSpacing: '-0.02em'
                    }}>
                        Page Not Found
                    </h1>

                    <p style={{ 
                        color: 'var(--text-secondary)', 
                        fontSize: '1.05rem', 
                        lineHeight: 1.7, 
                        marginBottom: 32 
                    }}>
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. 
                        All calculations and conversions run 100% in your local browser sandbox.
                    </p>

                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 12, 
                        marginBottom: 40 
                    }}>
                        <Link href="/" style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: 8, 
                            padding: '12px 24px', 
                            borderRadius: 10, 
                            background: 'var(--accent)', 
                            color: '#fff', 
                            fontWeight: 600, 
                            textDecoration: 'none',
                            transition: 'all 0.2s'
                        }}>
                            <Home size={16} /> Back to Homepage
                        </Link>

                        <Link href="/tools" style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: 8, 
                            padding: '12px 24px', 
                            borderRadius: 10, 
                            border: '1px solid var(--border-subtle)', 
                            background: 'var(--bg-secondary)', 
                            color: 'var(--text-primary)', 
                            fontWeight: 600, 
                            textDecoration: 'none',
                            transition: 'all 0.2s'
                        }}>
                            Browse All Utilities
                        </Link>
                    </div>

                    <div style={{ 
                        borderTop: '1px solid var(--border-subtle)', 
                        paddingTop: 32, 
                        textAlign: 'left' 
                    }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>
                            Popular Categories
                        </h4>
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: '1fr 1fr', 
                            gap: 12 
                        }}>
                            <Link href="/category/excel-tools" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>→ Excel Tools</Link>
                            <Link href="/category/csv-tools" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>→ CSV Tools</Link>
                            <Link href="/category/pdf-tools" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>→ PDF Tools</Link>
                            <Link href="/category/developer-tools" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>→ Developer Tools</Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
