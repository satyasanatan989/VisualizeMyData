'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
    Download, FileText, RefreshCw, ChevronLeft, ChevronRight, 
    Plus, Trash2, Files, Scissors, Eye, AlertCircle, ZoomIn, ZoomOut 
} from 'lucide-react';
import { toast } from 'sonner';

// Lazy load jsPDF to prevent Next.js SSR document undefined errors
const getJsPDF = async () => {
    const { jsPDF } = await import('jspdf');
    return jsPDF;
};

// Lazy load pdfjs-dist
const getPdfjs = async () => {
    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
    return pdfjsLib;
};

interface ToolProps {
    onDone?: () => void;
}

// Helper: Convert File to Image URL
const fileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
    });
};

// Helper: Convert Image URL to HTMLImageElement
const urlToImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Failed to load image.'));
        img.src = url;
    });
};

// 1. Image to PDF
export function ImageToPdf({ onDone }: ToolProps) {
    const [images, setImages] = useState<{ id: string; name: string; url: string }[]>([]);
    const [generating, setGenerating] = useState(false);

    const onDrop = async (accepted: File[]) => {
        const newImages = await Promise.all(
            accepted.map(async (file) => {
                const url = await fileToDataURL(file);
                return { id: Math.random().toString(), name: file.name, url };
            })
        );
        setImages(prev => [...prev, ...newImages]);
    };

    const removeImage = (id: string) => {
        setImages(prev => prev.filter(img => img.id !== id));
    };

    const generatePdf = async () => {
        if (images.length === 0) return;
        setGenerating(true);
        try {
            const jsPDF = await getJsPDF();
            const doc = new jsPDF({ unit: 'pt', format: 'a4' });
            
            for (let i = 0; i < images.length; i++) {
                if (i > 0) doc.addPage();
                const img = await urlToImage(images[i].url);
                // standard A4 size: 595 x 842 pt
                const pageWidth = 595;
                const pageHeight = 842;
                
                // Scale image to fit A4 keeping aspect ratio
                let w = img.width;
                let h = img.height;
                const ratio = w / h;
                
                if (w > pageWidth) {
                    w = pageWidth;
                    h = w / ratio;
                }
                if (h > pageHeight) {
                    h = pageHeight;
                    w = h * ratio;
                }
                
                // Center image on page
                const x = (pageWidth - w) / 2;
                const y = (pageHeight - h) / 2;
                
                doc.addImage(images[i].url, 'JPEG', x, y, w, h);
            }
            
            doc.save('converted_images.pdf');
            toast.success('PDF successfully generated!');
            if (onDone) onDone();
        } catch (e) {
            console.error(e);
            toast.error('Error generating PDF.');
        } finally {
            setGenerating(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] }
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div {...getRootProps()} style={dropzoneStyle(isDragActive)}>
                <input {...getInputProps()} />
                <Plus size={36} color="var(--accent-primary)" style={{ marginBottom: 12 }} />
                <p style={{ margin: 0, fontWeight: 600 }}>Drag &amp; drop images to compile into a PDF</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Supports JPG, PNG, WEBP, etc.</span>
            </div>

            {images.length > 0 && (
                <div style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <h4 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Selected Images ({images.length})</h4>
                        <button onClick={() => setImages([])} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Trash2 size={12} /> Clear All
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 10, marginBottom: 20 }}>
                        {images.map((img) => (
                            <div key={img.id} style={{ position: 'relative', border: '1px solid var(--border-subtle)', borderRadius: 8, overflow: 'hidden', paddingBottom: '100%', background: '#000' }}>
                                <img src={img.url} alt={img.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                <button 
                                    onClick={() => removeImage(img.id)}
                                    style={{ position: 'absolute', top: 2, right: 2, background: 'rgba(239, 68, 68, 0.85)', border: 'none', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={generatePdf} 
                        disabled={generating} 
                        className="btn-primary" 
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                    >
                        {generating ? <RefreshCw size={14} className="spin" /> : <FileText size={14} />}
                        {generating ? 'Compiling PDF...' : '⚡ Generate &amp; Download PDF'}
                    </button>
                </div>
            )}
        </div>
    );
}

// 2. PDF to Image
export function PdfToImage({ onDone }: ToolProps) {
    const [file, setFile] = useState<File | null>(null);
    const [pages, setPages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const onDrop = async (accepted: File[]) => {
        if (accepted.length === 0) return;
        const f = accepted[0];
        setFile(f);
        setPages([]);
        setLoading(true);

        try {
            const pdfjsLib = await getPdfjs();
            const arrayBuffer = await f.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            
            const numPages = pdf.numPages;
            const urls: string[] = [];
            
            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                
                await (page as any).render({ canvasContext: ctx, viewport }).promise;
                urls.push(canvas.toDataURL('image/png'));
            }
            
            setPages(urls);
            toast.success(`Successfully rendered ${numPages} PDF pages as images!`);
            if (onDone) onDone();
        } catch (e) {
            console.error(e);
            toast.error('Failed to parse PDF.');
        } finally {
            setLoading(false);
        }
    };

    const downloadImage = (url: string, index: number) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = `${file?.name.replace(/\.[^/.]+$/, "") || 'page'}_page_${index + 1}.png`;
        link.click();
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        maxFiles: 1
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div {...getRootProps()} style={dropzoneStyle(isDragActive)}>
                <input {...getInputProps()} />
                <FileText size={36} color="#ef4444" style={{ marginBottom: 12 }} />
                <p style={{ margin: 0, fontWeight: 600 }}>{isDragActive ? 'Drop PDF here' : 'Drag & drop a PDF here'}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Each page will be rendered as a PNG image</span>
            </div>

            {loading && (
                <div style={{ textAlign: 'center', padding: 20, color: 'var(--text-muted)' }}>
                    <RefreshCw size={24} className="spin" style={{ margin: '0 auto 8px' }} />
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>Rendering PDF pages. Please wait...</p>
                </div>
            )}

            {pages.length > 0 && (
                <div style={cardStyle}>
                    <h4 style={{ margin: '0 0 14px', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Extracted Pages ({pages.length})</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 14 }}>
                        {pages.map((url, idx) => (
                            <div key={idx} style={{ border: '1px solid var(--border-subtle)', borderRadius: 10, padding: 8, background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 6, overflow: 'hidden', maxHeight: 150 }}>
                                    <img src={url} alt={`Page ${idx + 1}`} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} />
                                </div>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Page {idx + 1}</span>
                                <button onClick={() => downloadImage(url, idx)} className="btn-secondary" style={{ padding: '6px 0', width: '100%', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                                    <Download size={11} /> Save PNG
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// 3. PDF Merger
export function PdfMerger({ onDone }: ToolProps) {
    const [files, setFiles] = useState<{ id: string; file: File; name: string }[]>([]);
    const [merging, setMerging] = useState(false);

    const onDrop = (accepted: File[]) => {
        const newFiles = accepted.map(f => ({ id: Math.random().toString(), file: f, name: f.name }));
        setFiles(prev => [...prev, ...newFiles]);
    };

    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const mergePdfs = async () => {
        if (files.length < 2) {
            toast.error('Please select at least 2 PDF files to merge.');
            return;
        }
        setMerging(true);
        try {
            const jsPDF = await getJsPDF();
            const pdfjsLib = await getPdfjs();
            const doc = new jsPDF({ unit: 'pt', format: 'a4' });
            let isFirstPage = true;

            for (let fIdx = 0; fIdx < files.length; fIdx++) {
                const file = files[fIdx].file;
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                
                for (let pIdx = 1; pIdx <= pdf.numPages; pIdx++) {
                    if (!isFirstPage) {
                        doc.addPage();
                    } else {
                        isFirstPage = false;
                    }

                    const page = await pdf.getPage(pIdx);
                    const viewport = page.getViewport({ scale: 1.5 });
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    
                    await (page as any).render({ canvasContext: ctx, viewport }).promise;
                    
                    // Fit to standard A4 size (595 x 842 pt)
                    doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 595, 842);
                }
            }

            doc.save('merged_document.pdf');
            toast.success('PDF files merged successfully!');
            if (onDone) onDone();
        } catch (e) {
            console.error(e);
            toast.error('Failed to merge PDFs.');
        } finally {
            setMerging(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] }
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div {...getRootProps()} style={dropzoneStyle(isDragActive)}>
                <input {...getInputProps()} />
                <Files size={36} color="var(--accent-primary)" style={{ marginBottom: 12 }} />
                <p style={{ margin: 0, fontWeight: 600 }}>Drag &amp; drop multiple PDFs to merge</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Reorder files and merge into one PDF</span>
            </div>

            {files.length > 0 && (
                <div style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <h4 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Selected Documents ({files.length})</h4>
                        <button onClick={() => setFiles([])} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.8rem', cursor: 'pointer' }}>Clear All</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                        {files.map((item, idx) => (
                            <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 8 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem' }}>
                                    <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>{idx + 1}.</span>
                                    <span style={{ color: 'var(--text-primary)', wordBreak: 'break-all' }}>{item.name}</span>
                                </div>
                                <button onClick={() => removeFile(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 4 }}>
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={mergePdfs} 
                        disabled={merging || files.length < 2} 
                        className="btn-primary" 
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                    >
                        {merging ? <RefreshCw size={14} className="spin" /> : <Files size={14} />}
                        {merging ? 'Merging PDFs...' : '⚡ Merge &amp; Download PDF'}
                    </button>
                </div>
            )}
        </div>
    );
}

// 4. PDF Splitter
export function PdfSplitter({ onDone }: ToolProps) {
    const [file, setFile] = useState<File | null>(null);
    const [pageCount, setPageCount] = useState(0);
    const [splitRange, setSplitRange] = useState('');
    const [splitting, setSplitting] = useState(false);

    const onDrop = async (accepted: File[]) => {
        if (accepted.length === 0) return;
        const f = accepted[0];
        setFile(f);
        setPageCount(0);
        setSplitRange('');
        try {
            const pdfjsLib = await getPdfjs();
            const arrayBuffer = await f.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            setPageCount(pdf.numPages);
            setSplitRange(`1-${Math.min(3, pdf.numPages)}`);
        } catch (e) {
            toast.error('Failed to analyze PDF file.');
        }
    };

    const handleSplit = async () => {
        if (!file || !splitRange) return;
        setSplitting(true);
        try {
            // Parse ranges: support e.g. "1-3, 5"
            const pagesToKeep: number[] = [];
            const parts = splitRange.split(',');
            
            for (const part of parts) {
                const range = part.trim().split('-');
                if (range.length === 2) {
                    const start = parseInt(range[0]);
                    const end = parseInt(range[1]);
                    if (!isNaN(start) && !isNaN(end)) {
                        for (let p = start; p <= end; p++) {
                            if (p >= 1 && p <= pageCount) pagesToKeep.push(p);
                        }
                    }
                } else if (range.length === 1) {
                    const single = parseInt(range[0]);
                    if (!isNaN(single) && single >= 1 && single <= pageCount) {
                        pagesToKeep.push(single);
                    }
                }
            }

            if (pagesToKeep.length === 0) {
                toast.error('Please enter a valid page range (e.g. 1-2, 4).');
                return;
            }

            const jsPDF = await getJsPDF();
            const pdfjsLib = await getPdfjs();
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            
            const doc = new jsPDF({ unit: 'pt', format: 'a4' });
            let isFirst = true;

            for (const pageNum of pagesToKeep) {
                if (!isFirst) {
                    doc.addPage();
                } else {
                    isFirst = false;
                }

                const page = await pdf.getPage(pageNum);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                
                await (page as any).render({ canvasContext: ctx, viewport }).promise;
                doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 595, 842);
            }

            doc.save(`${file.name.replace(/\.[^/.]+$/, "")}_split.pdf`);
            toast.success('PDF split completed!');
            if (onDone) onDone();
        } catch (e) {
            console.error(e);
            toast.error('Failed to split PDF.');
        } finally {
            setSplitting(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        maxFiles: 1
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div {...getRootProps()} style={dropzoneStyle(isDragActive)}>
                <input {...getInputProps()} />
                <Scissors size={36} color="var(--accent-primary)" style={{ marginBottom: 12 }} />
                <p style={{ margin: 0, fontWeight: 600 }}>{isDragActive ? 'Drop PDF here' : 'Drag & drop a PDF to split'}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Separate pages into a new file</span>
            </div>

            {file && pageCount > 0 && (
                <div style={cardStyle}>
                    <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Selected: <strong>{file.name}</strong> ({pageCount} pages)</p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Enter Pages to Extract</span>
                        <input 
                            type="text" 
                            placeholder="e.g. 1-2, 5" 
                            value={splitRange} 
                            onChange={(e) => setSplitRange(e.target.value)}
                            style={inputStyle}
                        />
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Use commas and hyphens (e.g. "1-3, 5" will extract pages 1, 2, 3, and 5)</span>
                    </div>

                    <button 
                        onClick={handleSplit} 
                        disabled={splitting || !splitRange} 
                        className="btn-primary" 
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                    >
                        {splitting ? <RefreshCw size={14} className="spin" /> : <Scissors size={14} />}
                        {splitting ? 'Splitting PDF...' : '⚡ Extract Pages &amp; Download'}
                    </button>
                </div>
            )}
        </div>
    );
}

// 5. PDF Previewer
export function PdfPreview({ onDone }: ToolProps) {
    const [file, setFile] = useState<File | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [scale, setScale] = useState(1.2);
    const [loading, setLoading] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [pdfInstance, setPdfInstance] = useState<any>(null);

    const onDrop = async (accepted: File[]) => {
        if (accepted.length === 0) return;
        const f = accepted[0];
        setFile(f);
        setPageCount(0);
        setCurrentPage(1);
        setLoading(true);

        try {
            const pdfjsLib = await getPdfjs();
            const arrayBuffer = await f.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            setPdfInstance(pdf);
            setPageCount(pdf.numPages);
            if (onDone) onDone();
        } catch (e) {
            toast.error('Failed to load PDF.');
        } finally {
            setLoading(false);
        }
    };

    const renderPage = async (pageIndex: number, scaleVal: number) => {
        if (!pdfInstance || !canvasRef.current) return;
        setLoading(true);
        try {
            const page = await pdfInstance.getPage(pageIndex);
            const viewport = page.getViewport({ scale: scaleVal });
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                await (page as any).render({ canvasContext: ctx, viewport }).promise;
            }
        } catch (e) {
            console.error('Error rendering page:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (pdfInstance) {
            renderPage(currentPage, scale);
        }
    }, [currentPage, scale, pdfInstance]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        maxFiles: 1
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {!file ? (
                <div {...getRootProps()} style={dropzoneStyle(isDragActive)}>
                    <input {...getInputProps()} />
                    <Eye size={36} color="var(--accent-primary)" style={{ marginBottom: 12 }} />
                    <p style={{ margin: 0, fontWeight: 600 }}>{isDragActive ? 'Drop PDF here' : 'Drag & drop PDF to preview'}</p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Load and read any PDF document locally</span>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 10, background: 'rgba(23, 26, 30, 0.45)', padding: '10px 20px', borderRadius: 14, border: '1px solid var(--border-subtle)' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', wordBreak: 'break-all' }}>{file.name}</span>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                            {/* Zoom controls */}
                            <div style={{ display: 'flex', gap: 4 }}>
                                <button onClick={() => setScale(s => Math.max(0.6, s - 0.2))} style={miniBtnStyle} title="Zoom Out">
                                    <ZoomOut size={12} />
                                </button>
                                <button onClick={() => setScale(s => Math.min(2.5, s + 0.2))} style={miniBtnStyle} title="Zoom In">
                                    <ZoomIn size={12} />
                                </button>
                            </div>

                            {/* Page navigation */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} style={currentPage === 1 ? disabledMiniBtnStyle : miniBtnStyle}>
                                    <ChevronLeft size={12} />
                                </button>
                                <span>{currentPage} / {pageCount}</span>
                                <button onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))} disabled={currentPage === pageCount} style={currentPage === pageCount ? disabledMiniBtnStyle : miniBtnStyle}>
                                    <ChevronRight size={12} />
                                </button>
                            </div>

                            <button onClick={() => setFile(null)} style={{ ...miniBtnStyle, color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}>Close</button>
                        </div>
                    </div>

                    <div style={{ position: 'relative', width: '100%', border: '1px solid var(--border-subtle)', borderRadius: 14, overflow: 'auto', maxHeight: '600px', display: 'flex', justifyContent: 'center', padding: 20, background: '#0e1117' }}>
                        {loading && (
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(14,17,23,0.7)', color: 'var(--text-muted)' }}>
                                <RefreshCw className="spin" size={24} />
                            </div>
                        )}
                        <canvas ref={canvasRef} style={{ maxWidth: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', background: '#fff' }} />
                    </div>
                </div>
            )}
        </div>
    );
}

// ── UI Styles ──

const dropzoneStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '40px 24px',
    borderRadius: 16,
    border: '2px dashed rgba(186,158,255,0.25)',
    background: isActive ? 'rgba(186,158,255,0.06)' : 'rgba(255,255,255,0.02)',
    cursor: 'pointer',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'all 0.25s',
});

const cardStyle: React.CSSProperties = {
    background: 'rgba(23, 26, 30, 0.45)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 16,
    padding: 20,
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: 8,
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-subtle)',
    color: 'var(--text-primary)',
    fontSize: '0.85rem',
    outline: 'none',
};

const miniBtnStyle: React.CSSProperties = {
    padding: '5px 8px',
    borderRadius: 6,
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-subtle)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'all 0.2s',
};

const disabledMiniBtnStyle: React.CSSProperties = {
    ...miniBtnStyle,
    opacity: 0.35,
    cursor: 'not-allowed',
};
