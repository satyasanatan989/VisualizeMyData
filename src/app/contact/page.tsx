'use client';

import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import { Mail, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, connect to a form service (Formspree, EmailJS, etc.)
        setSent(true);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />

            <section style={{ padding: '80px 0' }}>
                <div className="container" style={{ maxWidth: 620 }}>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid rgba(59,130,246,0.25)' }}>
                            <MessageSquare size={22} color="#60a5fa" />
                        </div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 12 }}>Contact Us</h1>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                            Have a question, suggestion, or found a bug? We'd love to hear from you.
                        </p>
                    </div>

                    {sent ? (
                        <div style={{ padding: 32, borderRadius: 20, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', textAlign: 'center' }}>
                            <p style={{ fontSize: '2rem', marginBottom: 12 }}>✅</p>
                            <h2 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: 8 }}>Message Sent!</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>Thanks for reaching out. We'll get back to you within 1–2 business days.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div className="card" style={{ padding: 32, borderRadius: 20 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                                    <div>
                                        <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 6 }}>Your Name</label>
                                        <input
                                            value={form.name}
                                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                            required
                                            placeholder="John Doe"
                                            style={{ width: '100%', padding: '11px 14px', borderRadius: 10, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 6 }}>Email Address</label>
                                        <input
                                            value={form.email}
                                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                            required
                                            type="email"
                                            placeholder="you@example.com"
                                            style={{ width: '100%', padding: '11px 14px', borderRadius: 10, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 6 }}>Message</label>
                                    <textarea
                                        value={form.message}
                                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                        required
                                        rows={5}
                                        placeholder="Tell us what's on your mind..."
                                        style={{ width: '100%', padding: '11px 14px', borderRadius: 10, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <button type="submit" className="btn-primary" style={{ marginTop: 20, width: '100%', justifyContent: 'center', fontSize: '0.9375rem' }}>
                                    <Mail size={16} /> Send Message
                                </button>
                            </div>
                        </form>
                    )}

                    <div style={{ marginTop: 32, padding: '20px 24px', borderRadius: 14, background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 500, marginBottom: 8 }}>
                            Prefer to email us directly? Reach out at <a href="mailto:hello@visualizemydata.in" style={{ color: '#60a5fa', textDecoration: 'none' }}>hello@visualizemydata.in</a>
                        </p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                            For general inquiries, you can also visit our <a href="/about" style={{ color: '#60a5fa' }}>About page</a> or review our <a href="/privacy-policy" style={{ color: '#60a5fa' }}>Privacy Policy</a>.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
