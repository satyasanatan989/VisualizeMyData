'use client';

import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { 
    Download, Printer, Plus, Trash2, PenTool, Award, Briefcase, 
    FileText, User, Mail, Phone, MapPin, Globe, CreditCard 
} from 'lucide-react';

// Common card and input styling
const cardStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 16,
    padding: 24,
    width: '100%'
};

const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.82rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: 8
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    background: 'rgba(15, 23, 42, 0.4)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 10,
    color: '#fff',
    outline: 'none',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-inter)',
    transition: 'border-color 0.2s'
};

const grid2Style: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16
};

// 1. Invoice Generator
interface InvoiceItem {
    id: string;
    desc: string;
    qty: number;
    price: number;
}
export function InvoiceGenerator({ isQuote = false }: { isQuote?: boolean }) {
    const [sender, setSender] = useState('My Business Inc.\n123 Corporate Dr, NY');
    const [client, setClient] = useState('Client Company\n456 Client St, CA');
    const [number, setNumber] = useState(isQuote ? 'QT-2026-001' : 'INV-2026-001');
    const [date, setDate] = useState('2026-07-03');
    const [dueDate, setDueDate] = useState('2026-08-03');
    const [items, setItems] = useState<InvoiceItem[]>([
        { id: '1', desc: 'Web Development Services', qty: 1, price: 1200 },
        { id: '2', desc: 'Consulting Hour', qty: 5, price: 150 }
    ]);
    const [taxRate, setTaxRate] = useState(8);
    const [discountRate, setDiscountRate] = useState(5);
    const [newItem, setNewItem] = useState({ desc: '', qty: 1, price: 100 });

    const addItem = () => {
        if (!newItem.desc.trim()) return;
        setItems([
            ...items,
            { id: Date.now().toString(), desc: newItem.desc, qty: newItem.qty, price: newItem.price }
        ]);
        setNewItem({ desc: '', qty: 1, price: 100 });
    };

    const deleteItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const getSubtotal = () => items.reduce((acc, item) => acc + item.qty * item.price, 0);
    const getTax = () => (getSubtotal() * taxRate) / 100;
    const getDiscount = () => (getSubtotal() * discountRate) / 100;
    const getTotal = () => getSubtotal() + getTax() - getDiscount();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={cardStyle}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {isQuote ? 'Quotation Configurations' : 'Invoice Configurations'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={grid2Style}>
                        <div>
                            <label style={labelStyle}>Bill From (Issuer)</label>
                            <textarea rows={3} value={sender} onChange={(e) => setSender(e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
                        </div>
                        <div>
                            <label style={labelStyle}>Bill To (Recipient)</label>
                            <textarea rows={3} value={client} onChange={(e) => setClient(e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                        <div>
                            <label style={labelStyle}>{isQuote ? 'Quotation #' : 'Invoice #'}</label>
                            <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Issue Date</label>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>{isQuote ? 'Valid Until' : 'Due Date'}</label>
                            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={inputStyle} />
                        </div>
                    </div>
                </div>
            </div>

            <div style={cardStyle}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1rem', color: 'var(--text-primary)' }}>Line Items</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr auto', gap: 12, alignItems: 'end', marginBottom: 16 }}>
                    <div>
                        <label style={labelStyle}>Item / Service Description</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Design Services"
                            value={newItem.desc} 
                            onChange={(e) => setNewItem({ ...newItem, desc: e.target.value })} 
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Qty</label>
                        <input 
                            type="number" 
                            value={newItem.qty} 
                            onChange={(e) => setNewItem({ ...newItem, qty: parseInt(e.target.value) || 0 })} 
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Rate ($)</label>
                        <input 
                            type="number" 
                            value={newItem.price} 
                            onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })} 
                            style={inputStyle}
                        />
                    </div>
                    <button onClick={addItem} className="btn-primary" style={{ height: 42, padding: '0 16px' }}>
                        <Plus size={16} />
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {items.map(item => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-subtle)', borderRadius: 10 }}>
                            <div style={{ flex: 1 }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.desc}</span>
                            </div>
                            <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.qty} × ${item.price.toFixed(2)}</span>
                                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>${(item.qty * item.price).toFixed(2)}</span>
                                <button onClick={() => deleteItem(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 20 }}>
                    <div>
                        <label style={labelStyle}>Tax Rate (%)</label>
                        <input type="number" value={taxRate} onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)} style={inputStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Discount Rate (%)</label>
                        <input type="number" value={discountRate} onChange={(e) => setDiscountRate(parseFloat(e.target.value) || 0)} style={inputStyle} />
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={() => window.print()} className="btn-primary">
                    <Printer size={14} style={{ marginRight: 6 }} /> Print / Export PDF
                </button>
            </div>

            {/* Printable Preview layout */}
            <div id="printable-invoice-preview" style={{ 
                background: '#ffffff', color: '#000000', padding: '40px 32px', 
                borderRadius: 12, border: '1px solid var(--border-subtle)',
                fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '0.85rem',
                lineHeight: 1.4, boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #2563eb', paddingBottom: 16, marginBottom: 24 }}>
                    <div>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#2563eb', margin: '0 0 6px' }}>{isQuote ? 'PRICE QUOTATION' : 'INVOICE'}</h2>
                        <p style={{ margin: 0, fontWeight: 700 }}>{number}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '0 0 4px', fontWeight: 600 }}>Date: {date}</p>
                        <p style={{ margin: 0, fontWeight: 600 }}>{isQuote ? 'Valid Till' : 'Due Date'}: {dueDate}</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 28 }}>
                    <div>
                        <p style={{ fontWeight: 'bold', margin: '0 0 6px', color: '#555' }}>ISSUED BY:</p>
                        <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{sender}</p>
                    </div>
                    <div>
                        <p style={{ fontWeight: 'bold', margin: '0 0 6px', color: '#555' }}>PREPARED FOR:</p>
                        <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{client}</p>
                    </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
                    <thead>
                        <tr style={{ background: '#f3f4f6', borderBottom: '2px solid #d1d5db' }}>
                            <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 'bold' }}>Description</th>
                            <th style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 'bold', width: '80px' }}>Qty</th>
                            <th style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 'bold', width: '120px' }}>Rate</th>
                            <th style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 'bold', width: '120px' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '10px 12px' }}>{item.desc}</td>
                                <td style={{ padding: '10px 12px', textAlign: 'right' }}>{item.qty}</td>
                                <td style={{ padding: '10px 12px', textAlign: 'right' }}>${item.price.toFixed(2)}</td>
                                <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600 }}>${(item.qty * item.price).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ width: '240px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Subtotal:</span>
                            <span>${getSubtotal().toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#dc2626' }}>
                            <span>Discount ({discountRate}%):</span>
                            <span>-${getDiscount().toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Tax ({taxRate}%):</span>
                            <span>+${getTax().toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #2563eb', padding: '8px 0 0', fontWeight: 'bold', fontSize: '1rem', color: '#2563eb' }}>
                            <span>Total Due:</span>
                            <span>${getTotal().toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #printable-invoice-preview, #printable-invoice-preview * {
                        visibility: visible;
                    }
                    #printable-invoice-preview {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        border: none !important;
                        box-shadow: none !important;
                        padding: 0 !important;
                    }
                }
            `}</style>
        </div>
    );
}

export function QuotationGenerator() {
    return <InvoiceGenerator isQuote={true} />;
}

// 2. Business Card Designer
export function BusinessCardGenerator() {
    const [company, setCompany] = useState('Quantum Nexus LLC');
    const [name, setName] = useState('Sarah Carter');
    const [title, setTitle] = useState('Chief Technology Officer');
    const [email, setEmail] = useState('sarah@quantumnexus.io');
    const [phone, setPhone] = useState('+1 (312) 555-0144');
    const [address, setAddress] = useState('900 Tech Plaza, Chicago, IL');
    const [theme, setTheme] = useState('dark'); // 'dark' | 'light' | 'ocean' | 'purple'

    const getCardStyle = (): React.CSSProperties => {
        const base: React.CSSProperties = {
            width: '100%', maxWidth: '380px', height: '220px', borderRadius: 12, padding: 24,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            fontFamily: 'var(--font-inter)', position: 'relative', overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)'
        };

        if (theme === 'dark') {
            return { ...base, background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff' };
        } else if (theme === 'light') {
            return { ...base, background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', color: '#0f172a', borderColor: '#e2e8f0' };
        } else if (theme === 'ocean') {
            return { ...base, background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#fff' };
        } else {
            return { ...base, background: 'linear-gradient(135deg, #8455ef 0%, #ba9eff 100%)', color: '#fff' };
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={cardStyle}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1rem', color: 'var(--text-primary)' }}>Business Card Configurations</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={grid2Style}>
                        <div>
                            <label style={labelStyle}>Company Name</label>
                            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Full Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
                        </div>
                    </div>
                    <div style={grid2Style}>
                        <div>
                            <label style={labelStyle}>Job Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
                        </div>
                    </div>
                    <div style={grid2Style}>
                        <div>
                            <label style={labelStyle}>Phone Number</label>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Office Address</label>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} style={inputStyle} />
                        </div>
                    </div>
                    <div>
                        <label style={labelStyle}>Card Style / Color Theme</label>
                        <div style={{ display: 'flex', gap: 10 }}>
                            {['dark', 'light', 'ocean', 'purple'].map(t => (
                                <button 
                                    key={t}
                                    onClick={() => setTheme(t)}
                                    style={{
                                        flex: 1, padding: '8px 12px', border: '1px solid var(--border-subtle)',
                                        borderRadius: 8, background: theme === t ? 'var(--accent-primary)' : 'rgba(255,255,255,0.02)',
                                        color: '#fff', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize'
                                    }}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={() => window.print()} className="btn-primary">
                    <Printer size={14} style={{ marginRight: 6 }} /> Print Business Cards
                </button>
            </div>

            {/* Preview Card */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div id="printable-card-preview" style={getCardStyle()}>
                    {/* Top row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>{company}</h4>
                            <span style={{ fontSize: '0.62rem', opacity: 0.8 }}>Enterprise Solutions</span>
                        </div>
                        <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'currentColor', opacity: 0.3 }} />
                    </div>

                    {/* Bottom Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>{name}</h3>
                            <p style={{ fontSize: '0.65rem', margin: 0, opacity: 0.9, letterSpacing: '0.04em' }}>{title}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, fontSize: '0.58rem', opacity: 0.8, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 6 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={8} /> {email}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Phone size={8} /> {phone}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={8} /> {address}</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #printable-card-preview, #printable-card-preview * {
                        visibility: visible;
                    }
                    #printable-card-preview {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%) scale(1.5);
                        border: none !important;
                        box-shadow: none !important;
                    }
                }
            `}</style>
        </div>
    );
}

// 3. Letterhead Generator
export function LetterheadGenerator() {
    const [company, setCompany] = useState('Quantum Nexus LLC');
    const [contact, setContact] = useState('Email: contact@quantumnexus.io | Phone: +1 555-0144 | Web: quantumnexus.io');
    const [title, setTitle] = useState('Official Memorandum');
    const [body, setBody] = useState('Dear Team,\n\nWe are pleased to announce that our new productivity and analytics modules are fully live. All tools process data client-side in the browser to maintain strict privacy standards.\n\nPlease update your bookmarks accordingly.\n\nSincerely,\nExecutive Office');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={cardStyle}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1rem', color: 'var(--text-primary)' }}>Letterhead Configurations</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={grid2Style}>
                        <div>
                            <label style={labelStyle}>Company Name</label>
                            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Document Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
                        </div>
                    </div>
                    <div>
                        <label style={labelStyle}>Header Contact Details</label>
                        <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Letter Content</label>
                        <textarea rows={6} value={body} onChange={(e) => setBody(e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={() => window.print()} className="btn-primary">
                    <Printer size={14} style={{ marginRight: 6 }} /> Print Letter
                </button>
            </div>

            {/* Letterhead Print Area */}
            <div id="printable-letterhead-preview" style={{ 
                background: '#ffffff', color: '#000000', padding: '48px 36px', 
                borderRadius: 12, border: '1px solid var(--border-subtle)',
                fontFamily: 'Georgia, serif', fontSize: '0.88rem',
                lineHeight: 1.6, boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                minHeight: '620px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }}>
                {/* Header Letterhead */}
                <div style={{ borderBottom: '3px solid #1e3a8a', paddingBottom: 12, marginBottom: 24, textAlign: 'center' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e3a8a', margin: '0 0 4px', letterSpacing: '-0.02em', fontFamily: 'Helvetica, Arial, sans-serif' }}>{company}</h1>
                    <p style={{ fontSize: '0.72rem', color: '#555', margin: 0, letterSpacing: '0.04em' }}>{contact}</p>
                </div>

                {/* Body Content */}
                <div style={{ flex: 1, padding: '0 10px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 16px', color: '#1e3a8a', fontFamily: 'Helvetica, Arial, sans-serif' }}>{title}</h3>
                    <p style={{ whiteSpace: 'pre-line', margin: 0 }}>{body}</p>
                </div>

                {/* Footer Letterhead */}
                <div style={{ borderTop: '1px solid #ddd', paddingTop: 12, marginTop: 40, textAlign: 'center', fontSize: '0.68rem', color: '#777' }}>
                    This document is officially generated by {company}.
                </div>
            </div>

            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #printable-letterhead-preview, #printable-letterhead-preview * {
                        visibility: visible;
                    }
                    #printable-letterhead-preview {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        border: none !important;
                        box-shadow: none !important;
                        padding: 0 !important;
                    }
                }
            `}</style>
        </div>
    );
}

// 4. Draw Signature Pad
export function SignatureGenerator() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [typeText, setTypeText] = useState('Sarah Carter');
    const [signMode, setSignMode] = useState<'draw' | 'type'>('draw');

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const downloadSignature = () => {
        if (signMode === 'draw') {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'signature.png';
            link.click();
            toast.success('Downloaded signature PNG!');
        } else {
            // Type mode - draw typed signature onto temporary canvas
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = 400;
            tempCanvas.height = 150;
            const ctx = tempCanvas.getContext('2d');
            if (!ctx) return;
            ctx.fillStyle = 'rgba(0,0,0,0)';
            ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
            ctx.font = 'italic bold 32px "Caveat", "Brush Script MT", cursive';
            ctx.fillStyle = '#0f172a';
            ctx.textAlign = 'center';
            ctx.fillText(typeText, 200, 80);

            const link = document.createElement('a');
            link.href = tempCanvas.toDataURL('image/png');
            link.download = 'signature.png';
            link.click();
            toast.success('Downloaded typed signature PNG!');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Mode selection */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, background: 'rgba(255,255,255,0.02)', padding: 4, borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
                <button onClick={() => setSignMode('draw')} style={{ padding: '8px 0', border: 'none', background: signMode === 'draw' ? 'var(--accent-primary)' : 'transparent', color: '#fff', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                    Draw Signature
                </button>
                <button onClick={() => setSignMode('type')} style={{ padding: '8px 0', border: 'none', background: signMode === 'type' ? 'var(--accent-primary)' : 'transparent', color: '#fff', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                    Type Signature
                </button>
            </div>

            {signMode === 'draw' ? (
                <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                    <canvas 
                        ref={canvasRef} 
                        width={400} 
                        height={160}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                        style={{ border: '1px solid var(--border-subtle)', borderRadius: 12, background: '#fff', cursor: 'crosshair', maxWidth: '100%' }}
                    />
                    <div style={{ display: 'flex', gap: 12, width: '100%', maxWidth: 300 }}>
                        <button onClick={clearCanvas} className="btn-secondary" style={{ flex: 1 }}>Clear</button>
                        <button onClick={downloadSignature} className="btn-primary" style={{ flex: 1 }}><Download size={14} /> Download</button>
                    </div>
                </div>
            ) : (
                <div style={cardStyle}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                            <label style={labelStyle}>Type Your Name</label>
                            <input type="text" value={typeText} onChange={(e) => setTypeText(e.target.value)} style={inputStyle} />
                        </div>
                        <div style={{ padding: '30px 20px', borderRadius: 12, border: '1px dotted var(--border-subtle)', textAlign: 'center', background: '#fff', color: '#0f172a' }}>
                            <span style={{ fontSize: '2.2rem', fontStyle: 'italic', fontFamily: '"Brush Script MT", cursive' }}>
                                {typeText || 'Signature Preview'}
                            </span>
                        </div>
                        <button onClick={downloadSignature} className="btn-primary" style={{ width: '100%' }}><Download size={14} /> Download signature PNG</button>
                    </div>
                </div>
            )}
        </div>
    );
}

// 5. Certificate Maker
export function CertificateGenerator() {
    const [title, setTitle] = useState('CERTIFICATE OF APPRECIATION');
    const [recipient, setRecipient] = useState('Alex Harrison');
    const [reason, setReason] = useState('for successfully completing the 2026 Advanced Data Visualization & Full-Stack Engineering Bootcamp.');
    const [issuer, setIssuer] = useState('VisualizeMyData Inc.');
    const [date, setDate] = useState('July 3, 2026');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={cardStyle}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1rem', color: 'var(--text-primary)' }}>Certificate Details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={labelStyle}>Certificate Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Recipient Name</label>
                        <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Achievement details</label>
                        <textarea rows={2} value={reason} onChange={(e) => setReason(e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>
                    <div style={grid2Style}>
                        <div>
                            <label style={labelStyle}>Issuer / Presenter</label>
                            <input type="text" value={issuer} onChange={(e) => setIssuer(e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Date</label>
                            <input type="text" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={() => window.print()} className="btn-primary">
                    <Printer size={14} style={{ marginRight: 6 }} /> Print / Export PDF
                </button>
            </div>

            {/* Certificate Preview Frame */}
            <div id="printable-certificate-preview" style={{ 
                background: '#ffffff', color: '#000000', padding: '60px 48px', 
                borderRadius: 12, border: '1px solid var(--border-subtle)',
                fontFamily: 'Georgia, serif', textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)', minHeight: '520px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                position: 'relative'
            }}>
                {/* Border Frame */}
                <div style={{ position: 'absolute', inset: 15, border: '6px double #c5a85c' }} />
                <div style={{ position: 'absolute', inset: 22, border: '1px solid #c5a85c' }} />

                <div style={{ zIndex: 1, marginTop: 30 }}>
                    <Award size={48} color="#c5a85c" style={{ margin: '0 auto 12px' }} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '0.08em', color: '#c5a85c', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                        {title}
                    </h2>
                </div>

                <div style={{ zIndex: 1, margin: '20px 0' }}>
                    <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#666' }}>This certificate is proudly presented to</p>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', fontStyle: 'italic', margin: '14px 0', fontFamily: 'Times New Roman, serif' }}>
                        {recipient}
                    </h1>
                    <p style={{ fontSize: '0.92rem', color: '#333', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
                        {reason}
                    </p>
                </div>

                <div style={{ zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, width: '70%', margin: '0 auto 20px', borderTop: '1px solid #eee', paddingTop: 20 }}>
                    <div>
                        <p style={{ fontSize: '0.85rem', fontWeight: 'bold', margin: '0 0 4px' }}>{issuer}</p>
                        <p style={{ fontSize: '0.72rem', color: '#777', margin: 0 }}>ISSUER AUTHORIZED</p>
                    </div>
                    <div>
                        <p style={{ fontSize: '0.85rem', fontWeight: 'bold', margin: '0 0 4px' }}>{date}</p>
                        <p style={{ fontSize: '0.72rem', color: '#777', margin: 0 }}>DATE PRESENTED</p>
                    </div>
                </div>
            </div>

            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #printable-certificate-preview, #printable-certificate-preview * {
                        visibility: visible;
                    }
                    #printable-certificate-preview {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        border: none !important;
                        box-shadow: none !important;
                        padding: 40px !important;
                    }
                }
            `}</style>
        </div>
    );
}
