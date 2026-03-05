'use client';

import React, { useRef } from 'react';
import { Download, Trash2, Maximize2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

interface ChartContainerProps {
    id: string;
    title: string;
    subtitle?: string;
    onRemove: (id: string) => void;
    children: React.ReactNode;
}

export default function ChartContainer({ id, title, subtitle, onRemove, children }: ChartContainerProps) {
    const chartRef = useRef<HTMLDivElement>(null);

    const exportAsPng = async () => {
        if (!chartRef.current) return;
        try {
            const dataUrl = await toPng(chartRef.current, { backgroundColor: '#ffffff', pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `${title.replace(/\s+/g, '_')}_chart.png`;
            link.href = dataUrl;
            link.click();
        } catch (e) {
            console.error('Failed to export PNG', e);
        }
    };

    const exportAsPdf = async () => {
        if (!chartRef.current) return;
        try {
            const dataUrl = await toPng(chartRef.current, { backgroundColor: '#ffffff', pixelRatio: 2 });
            const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [800, 500] });
            pdf.text(title, 40, 40);
            if (subtitle) {
                pdf.setFontSize(10);
                pdf.text(subtitle, 40, 55);
            }
            pdf.addImage(dataUrl, 'PNG', 40, 70, 720, 380);
            pdf.save(`${title.replace(/\s+/g, '_')}_chart.pdf`);
        } catch (e) {
            console.error('Failed to export PDF', e);
        }
    };

    return (
        <div style={{
            background: 'var(--bg-card)',
            borderRadius: 16,
            border: '1px solid var(--border-subtle)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            position: 'relative',
            height: '100%',
            minHeight: 400
        }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{ paddingRight: 40 }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px' }}>{title}</h3>
                    {subtitle && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>{subtitle}</p>}
                </div>

                {/* Actions Menu */}
                <div style={{ display: 'flex', gap: 6 }}>
                    <div className="dropdown" style={{ position: 'relative', display: 'inline-block' }}>
                        <button
                            style={{
                                background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
                                width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'var(--text-secondary)', cursor: 'pointer'
                            }}
                            title="Export Chart"
                            onClick={(e) => {
                                const menu = e.currentTarget.nextElementSibling as HTMLElement;
                                menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                            }}
                        >
                            <Download size={16} />
                        </button>
                        <div style={{
                            display: 'none', position: 'absolute', right: 0, top: '100%', marginTop: 4,
                            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                            borderRadius: 8, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            zIndex: 10, minWidth: 140
                        }}>
                            <button onClick={exportAsPng} style={{ display: 'block', width: '100%', padding: '10px 16px', textAlign: 'left', border: 'none', background: 'transparent', fontSize: '0.85rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer' }}>Download PNG</button>
                            <button onClick={exportAsPdf} style={{ display: 'block', width: '100%', padding: '10px 16px', textAlign: 'left', border: 'none', background: 'transparent', fontSize: '0.85rem', color: 'var(--text-primary)', cursor: 'pointer' }}>Download PDF</button>
                        </div>
                    </div>
                    <button
                        onClick={() => onRemove(id)}
                        style={{
                            background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)',
                            width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#f43f5e', cursor: 'pointer'
                        }}
                        title="Remove Chart"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Chart Body */}
            <div
                ref={chartRef}
                style={{
                    flexGrow: 1,
                    background: 'var(--bg-card)', /* required for PNG export */
                    padding: '10px 0',
                    position: 'relative'
                }}
            >
                {children}
            </div>
        </div>
    );
}
