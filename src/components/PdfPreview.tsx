'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';

interface PdfPreviewProps {
    file: File;
    pageCount: number;
}

export default function PdfPreview({ file, pageCount }: PdfPreviewProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function renderPage() {
            setLoading(true);
            try {
                const pdfjsLib = await import('pdfjs-dist');
                pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

                const arrayBuffer = await file.arrayBuffer();
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                const page = await pdf.getPage(currentPage);

                const viewport = page.getViewport({ scale: 1.4 });
                const canvas = canvasRef.current;
                if (!canvas || cancelled) return;

                const ctx = canvas.getContext('2d')!;
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                await (page as any).render({ canvasContext: ctx, viewport }).promise;
            } catch (e) {
                console.error('PDF render error', e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        renderPage();
        return () => { cancelled = true; };
    }, [file, currentPage]);

    return (
        <div style={{ borderRadius: 16, border: '1px solid var(--border-subtle)', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
            {/* Header */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>
                    <FileText size={16} color="#f43f5e" />
                    PDF Preview · Page {currentPage} of {pageCount}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        style={{
                            padding: '6px 10px', borderRadius: 8, border: '1px solid var(--border-subtle)',
                            background: 'var(--bg-glass)', color: 'var(--text-secondary)', cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                            opacity: currentPage === 1 ? 0.4 : 1,
                        }}
                    >
                        <ChevronLeft size={14} />
                    </button>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))}
                        disabled={currentPage === pageCount}
                        style={{
                            padding: '6px 10px', borderRadius: 8, border: '1px solid var(--border-subtle)',
                            background: 'var(--bg-glass)', color: 'var(--text-secondary)', cursor: currentPage === pageCount ? 'not-allowed' : 'pointer',
                            opacity: currentPage === pageCount ? 0.4 : 1,
                        }}
                    >
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>

            {/* Canvas */}
            <div style={{ padding: 20, textAlign: 'center', position: 'relative', minHeight: 400 }}>
                {loading && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ width: 36, height: 36, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
                            Rendering page {currentPage}…
                        </div>
                    </div>
                )}
                <canvas
                    ref={canvasRef}
                    style={{ maxWidth: '100%', borderRadius: 8, boxShadow: '0 8px 40px rgba(0,0,0,0.5)', opacity: loading ? 0 : 1, transition: 'opacity 0.3s' }}
                />
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}
