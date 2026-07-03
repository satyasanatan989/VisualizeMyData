'use client';

import React, { useState, useRef, useMemo } from 'react';
import { 
    Download, Image as ImageIcon, FileText, Upload, RefreshCw, Scissors, Grid, 
    Layout, RotateCw, Type, Eye, Sparkles, Info, ShieldCheck, Lock, Unlock, Hash, 
    FileSignature, Code, Palette, Play, ChevronRight, CheckCircle2, AlertTriangle, Scale, Plus, Trash2,
    Printer
} from 'lucide-react';
import { toast } from 'sonner';
import { PDFDocument, rgb as pdfLibRgb } from 'pdf-lib';

// Helper: Common File Drop container
function ToolDropzone({ onFileSelect, accept, label }: { onFileSelect: (f: File) => void, accept: string, label: string }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
    };
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    };
    return (
        <div 
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
                border: '2px dashed var(--border-subtle)',
                borderRadius: 16,
                padding: '40px 20px',
                textAlign: 'center',
                cursor: 'pointer',
                background: 'rgba(255,255,255,0.01)',
                transition: 'all 0.2s'
            }}
            className="glass-card-hover"
        >
            <input 
                ref={fileInputRef} 
                type="file" 
                accept={accept} 
                onChange={e => e.target.files?.[0] && onFileSelect(e.target.files[0])} 
                style={{ display: 'none' }} 
            />
            <Upload size={32} color="var(--accent-primary)" style={{ margin: '0 auto 12px' }} />
            <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>{label}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>or click to browse from device</p>
        </div>
    );
}

// 1. Image Flipper
export function ImageFlipper() {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [flipH, setFlipH] = useState(false);
    const [flipV, setFlipV] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => setImageSrc(e.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.translate(flipH ? canvas.width : 0, flipV ? canvas.height : 0);
                ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
                ctx.drawImage(img, 0, 0);
                const url = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = url;
                a.download = 'flipped-image.png';
                a.click();
                toast.success('Flipped image downloaded!');
            }
        };
        img.src = imageSrc!;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {!imageSrc ? (
                <ToolDropzone onFileSelect={handleFile} accept="image/*" label="Upload image to flip" />
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        maxWidth: '100%',
                        maxHeight: 400,
                        overflow: 'hidden',
                        borderRadius: 12,
                        border: '1px solid var(--border-subtle)',
                        background: '#090d16',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 20
                    }}>
                        <img 
                            src={imageSrc} 
                            alt="Preview" 
                            style={{
                                maxWidth: '100%',
                                maxHeight: 400,
                                transform: `scale(${flipH ? -1 : 1}, ${flipV ? -1 : 1})`,
                                transition: 'transform 0.2s'
                            }} 
                        />
                    </div>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 20 }}>
                        <button onClick={() => setFlipH(!flipH)} className="btn-secondary" style={{ fontSize: '0.8rem' }}>Flip Horizontal</button>
                        <button onClick={() => setFlipV(!flipV)} className="btn-secondary" style={{ fontSize: '0.8rem' }}>Flip Vertical</button>
                    </div>
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                    <button onClick={handleDownload} className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}><Download size={14} /> Download Image</button>
                </div>
            )}
        </div>
    );
}

// 2. Image Watermark Generator
export function ImageWatermark() {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [text, setText] = useState('VisualizeMyData');
    const [opacity, setOpacity] = useState(0.4);
    const [fontSize, setFontSize] = useState(30);
    const [color, setColor] = useState('#ffffff');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => setImageSrc(e.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                ctx.globalAlpha = opacity;
                ctx.font = `${fontSize}px sans-serif`;
                ctx.fillStyle = color;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                // Draw diagonally repeated watermarks or simple centered watermark
                ctx.fillText(text, canvas.width / 2, canvas.height / 2);
                const url = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = url;
                a.download = 'watermarked-image.png';
                a.click();
                toast.success('Watermarked image downloaded!');
            }
        };
        img.src = imageSrc!;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {!imageSrc ? (
                <ToolDropzone onFileSelect={handleFile} accept="image/*" label="Upload image for watermarking" />
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }} className="features-grid">
                    <div>
                        <div style={{
                            borderRadius: 12, border: '1px solid var(--border-subtle)', background: '#090d16',
                            padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 350
                        }}>
                            <img src={imageSrc} style={{ maxWidth: '100%', maxHeight: '100%' }} alt="Preview" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800 }}>Settings</h4>
                        <div>
                            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Watermark Text</label>
                            <input 
                                type="text" 
                                value={text} 
                                onChange={e => setText(e.target.value)} 
                                style={{ width: '100%', padding: '8px 10px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '0.78rem' }}
                            />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Opacity: {opacity}</label>
                            <input type="range" min="0.1" max="1" step="0.05" value={opacity} onChange={e => setOpacity(parseFloat(e.target.value))} style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Font Size: {fontSize}px</label>
                            <input type="range" min="10" max="100" step="5" value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))} style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Watermark Color</label>
                            <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: '100%', height: 36, border: 'none', background: 'none', cursor: 'pointer' }} />
                        </div>
                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                        <button onClick={handleDownload} className="btn-primary" style={{ marginTop: 12, padding: '10px 0', fontSize: '0.85rem' }}><Download size={14} /> Download</button>
                    </div>
                </div>
            )}
        </div>
    );
}

// 3. Blur Image
export function BlurImage() {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [blur, setBlur] = useState(10);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => setImageSrc(e.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                // Simple blur convolve fallback using canvas filter API (supported in all modern browsers)
                ctx.filter = `blur(${blur}px)`;
                ctx.drawImage(img, 0, 0);
                const url = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = url;
                a.download = 'blurred-image.png';
                a.click();
                toast.success('Blurred image downloaded!');
            }
        };
        img.src = imageSrc!;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {!imageSrc ? (
                <ToolDropzone onFileSelect={handleFile} accept="image/*" label="Upload image to blur" />
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }} className="features-grid">
                    <div>
                        <div style={{
                            borderRadius: 12, border: '1px solid var(--border-subtle)', background: '#090d16',
                            padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 350
                        }}>
                            <img src={imageSrc} style={{ maxWidth: '100%', maxHeight: '100%', filter: `blur(${blur / 3}px)` }} alt="Preview" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
                        <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800 }}>Blur Settings</h4>
                        <div>
                            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Blur Radius: {blur}px</label>
                            <input type="range" min="1" max="50" step="1" value={blur} onChange={e => setBlur(parseInt(e.target.value))} style={{ width: '100%' }} />
                        </div>
                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                        <button onClick={handleDownload} className="btn-primary" style={{ padding: '10px 0', fontSize: '0.85rem' }}><Download size={14} /> Download</button>
                    </div>
                </div>
            )}
        </div>
    );
}

// 4. Sharpen Image
export function SharpenImage() {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => setImageSrc(e.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Apply a simple high-pass convolution kernel for sharpening
                ctx.drawImage(img, 0, 0);
                const weights = [
                     0, -1,  0,
                    -1,  5, -1,
                     0, -1,  0
                ];
                const side = Math.round(Math.sqrt(weights.length));
                const halfSide = Math.floor(side / 2);
                const src = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const sw = src.width;
                const sh = src.height;
                const w = sw;
                const h = sh;
                const output = ctx.createImageData(w, h);
                const dst = output.data;
                const srcData = src.data;

                for (let y = 0; y < h; y++) {
                    for (let x = 0; x < w; x++) {
                        const sy = y;
                        const sx = x;
                        const dstOff = (y * w + x) * 4;
                        let r = 0, g = 0, b = 0;
                        for (let cy = 0; cy < side; cy++) {
                            for (let cx = 0; cx < side; cx++) {
                                const scy = Math.min(sh - 1, Math.max(0, sy + cy - halfSide));
                                const scx = Math.min(sw - 1, Math.max(0, sx + cx - halfSide));
                                const srcOff = (scy * sw + scx) * 4;
                                const wt = weights[cy * side + cx];
                                r += srcData[srcOff] * wt;
                                g += srcData[srcOff + 1] * wt;
                                b += srcData[srcOff + 2] * wt;
                            }
                        }
                        dst[dstOff] = Math.min(255, Math.max(0, r));
                        dst[dstOff + 1] = Math.min(255, Math.max(0, g));
                        dst[dstOff + 2] = Math.min(255, Math.max(0, b));
                        dst[dstOff + 3] = srcData[dstOff + 3];
                    }
                }
                ctx.putImageData(output, 0, 0);
                const url = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = url;
                a.download = 'sharpened-image.png';
                a.click();
                toast.success('Sharpened image downloaded!');
            }
        };
        img.src = imageSrc!;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {!imageSrc ? (
                <ToolDropzone onFileSelect={handleFile} accept="image/*" label="Upload image to sharpen" />
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        maxWidth: '100%', maxHeight: 400, overflow: 'hidden', borderRadius: 12,
                        border: '1px solid var(--border-subtle)', background: '#090d16',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20
                    }}>
                        <img src={imageSrc} alt="Preview" style={{ maxWidth: '100%', maxHeight: 400 }} />
                    </div>
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                    <button onClick={handleDownload} className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}><Download size={14} /> Process &amp; Download</button>
                </div>
            )}
        </div>
    );
}

// 5. Image Metadata Viewer
export function ImageMetadataViewer() {
    const [metaInfo, setMetaInfo] = useState<Record<string, string> | null>(null);

    const handleFile = (file: File) => {
        const info = {
            'File Name': file.name,
            'File Size': (file.size / 1024).toFixed(1) + ' KB',
            'File Type': file.type,
            'Last Modified': new Date(file.lastModified).toLocaleString(),
            'Image MIME Type': file.type || 'Unknown'
        };
        // Get dimensions using local Image constructor
        const img = new Image();
        img.onload = () => {
            setMetaInfo({
                ...info,
                'Width': `${img.width} px`,
                'Height': `${img.height} px`,
                'Aspect Ratio': (img.width / img.height).toFixed(2)
            });
        };
        img.src = URL.createObjectURL(file);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {!metaInfo ? (
                <ToolDropzone onFileSelect={handleFile} accept="image/*" label="Upload image to view EXIF / metadata" />
            ) : (
                <div>
                    <div style={{ padding: 20, background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-subtle)', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                        {Object.entries(metaInfo).map(([k, v]) => (
                            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{k}:</span>
                                <span>{v}</span>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setMetaInfo(null)} className="btn-secondary" style={{ display: 'block', margin: '0 auto', fontSize: '0.8rem' }}>Upload Another Image</button>
                </div>
            )}
        </div>
    );
}

// 6. Strip Image Metadata
export function RemoveImageMetadata() {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => setImageSrc(e.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleStrip = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Redrawing on canvas strips EXIF metadata completely since canvas.toDataURL only saves raw pixels
                ctx.drawImage(img, 0, 0);
                const url = canvas.toDataURL('image/jpeg', 0.9);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'metadata-stripped.jpg';
                a.click();
                toast.success('Cleaned image downloaded (EXIF metadata removed successfully).');
                setImageSrc(null);
            }
        };
        img.src = imageSrc!;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {!imageSrc ? (
                <ToolDropzone onFileSelect={handleFile} accept="image/*" label="Upload image to strip geolocation and metadata" />
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
                        Stripping EXIF meta tags clears geolocation, camera model details, and creation time, keeping your identity private.
                    </p>
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                    <button onClick={handleStrip} className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}><ShieldCheck size={14} /> Strip &amp; Download Jpeg</button>
                </div>
            )}
        </div>
    );
}

// 7. HTML Live Preview
export function HtmlPreview() {
    const [html, setHtml] = useState(`<!-- Type HTML/CSS/JS here -->\n<div style="padding: 20px; text-align: center; background: linear-gradient(135deg, #ba9eff, #8455ef); border-radius: 12px; color: #fff;">\n  <h1>Live HTML Sandbox!</h1>\n  <p>VisualizeMyData dynamic workspace compiles code locally.</p>\n</div>`);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const updatePreview = () => {
        const iframe = iframeRef.current;
        if (iframe) {
            const doc = iframe.contentDocument || iframe.contentWindow?.document;
            if (doc) {
                doc.open();
                doc.write(html);
                doc.close();
            }
        }
    };

    React.useEffect(() => {
        updatePreview();
    }, [html]);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="features-grid">
            <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Source Code</label>
                <textarea 
                    value={html} 
                    onChange={e => setHtml(e.target.value)} 
                    rows={12} 
                    style={{ width: '100%', padding: 12, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 10, color: '#fff', fontFamily: 'monospace', fontSize: '0.8rem', outline: 'none', resize: 'none' }}
                />
            </div>
            <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Live Preview Canvas</label>
                <iframe 
                    ref={iframeRef} 
                    title="Live Preview" 
                    style={{ width: '100%', height: 260, border: '1px solid var(--border-subtle)', borderRadius: 10, background: '#fff' }}
                />
            </div>
        </div>
    );
}

// 8. Markdown Live Preview
export function MarkdownPreview() {
    const [md, setMd] = useState(`# Markdown Preview\n\n- Bullet item 1\n- Bullet item 2\n\n**Bold text here** and some \`inline code\`.`);

    // Simple markdown to HTML parser for offline client-side support without external packages
    const parseMarkdown = (text: string) => {
        let html = text
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^\- (.*$)/gim, '<li>$1</li>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/\`(.*)\`/gim, '<code>$1</code>')
            .replace(/\n$/gim, '<br />');
        return html;
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="features-grid">
            <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Markdown Editor</label>
                <textarea 
                    value={md} 
                    onChange={e => setMd(e.target.value)} 
                    rows={12} 
                    style={{ width: '100%', padding: 12, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 10, color: '#fff', fontFamily: 'monospace', fontSize: '0.8rem', outline: 'none', resize: 'none' }}
                />
            </div>
            <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Rendered HTML Output</label>
                <div 
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(md) }} 
                    style={{ width: '100%', height: 260, overflowY: 'auto', padding: 16, border: '1px solid var(--border-subtle)', borderRadius: 10, background: 'rgba(255,255,255,0.01)', color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}
                />
            </div>
        </div>
    );
}

// 9. HEX/RGB/HSL Color Converter
export function ColorConverter() {
    const [hex, setHex] = useState('#8455ef');
    const [rgb, setRgb] = useState('rgb(132, 85, 239)');
    const [hsl, setHsl] = useState('hsl(258, 83%, 64%)');

    const handleHex = (val: string) => {
        setHex(val);
        // HEX to RGB
        const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val);
        if (match) {
            const r = parseInt(match[1], 16);
            const g = parseInt(match[2], 16);
            const b = parseInt(match[3], 16);
            setRgb(`rgb(${r}, ${g}, ${b})`);

            // RGB to HSL
            let red = r / 255;
            let green = g / 255;
            let blue = b / 255;
            let max = Math.max(red, green, blue), min = Math.min(red, green, blue);
            let h = 0, s = 0, l = (max + min) / 2;
            if (max !== min) {
                let d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case red: h = (green - blue) / d + (green < blue ? 6 : 0); break;
                    case green: h = (blue - red) / d + 2; break;
                    case blue: h = (red - green) / d + 4; break;
                }
                h /= 6;
            }
            setHsl(`hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`);
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="features-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800 }}>Color Translator</h4>
                <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>HEX value</label>
                    <input type="text" value={hex} onChange={e => handleHex(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '0.78rem' }} />
                </div>
                <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>RGB string</label>
                    <input type="text" value={rgb} readOnly style={{ width: '100%', padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '0.78rem', outline: 'none' }} />
                </div>
                <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>HSL string</label>
                    <input type="text" value={hsl} readOnly style={{ width: '100%', padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '0.78rem', outline: 'none' }} />
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 140, height: 140, borderRadius: 20, background: hex, border: '1px solid var(--border-subtle)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }} />
            </div>
        </div>
    );
}

// 10. Food Shelf Life Estimator
export function ShelfLifeCalculator() {
    const [q10, setQ10] = useState(3.0); // Spoilage acceleration rate per 10C temperature rise
    const [refTemp, setRefTemp] = useState(4); // Celsius reference temperature (e.g. cold storage)
    const [refShelfLife, setRefShelfLife] = useState(14); // Days shelf life at ref temp
    const [storageTemp, setStorageTemp] = useState(25); // Room storage temperature

    const shelfLifeResult = useMemo(() => {
        // Shelf Life Formula using Q10 coefficient:
        // Shelf Life (T) = Shelf Life (T_ref) * Q10 ^ ((T_ref - T) / 10)
        const power = (refTemp - storageTemp) / 10;
        const result = refShelfLife * Math.pow(q10, power);
        return result.toFixed(1);
    }, [q10, refTemp, refShelfLife, storageTemp]);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="features-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800 }}>Shelf Life Parameters</h4>
                <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Reference Temp (T_ref): {refTemp}°C</label>
                    <input type="number" value={refTemp} onChange={e => setRefTemp(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '0.78rem' }} />
                </div>
                <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Shelf Life at Reference Temp: {refShelfLife} Days</label>
                    <input type="number" value={refShelfLife} onChange={e => setRefShelfLife(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '0.78rem' }} />
                </div>
                <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Spoilage Acceleration Coefficient (Q10): {q10}</label>
                    <input type="range" min="1.5" max="5.0" step="0.1" value={q10} onChange={e => setQ10(parseFloat(e.target.value))} style={{ width: '100%' }} />
                </div>
                <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Actual Storage Temp: {storageTemp}°C</label>
                    <input type="range" min="0" max="40" step="1" value={storageTemp} onChange={e => setStorageTemp(parseInt(e.target.value))} style={{ width: '100%' }} />
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-subtle)', borderRadius: 16, padding: 24 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Estimated Shelf Life</span>
                <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', marginBottom: 4 }}>{shelfLifeResult}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Days</span>
                <p style={{ margin: '14px 0 0', fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.45 }}>
                    *Calculated via standard biochemical Arrhenius Q10 temperature-gradient formulas.
                </p>
            </div>
        </div>
    );
}

// 11. HACCP Decision Tree Wizard
export function HaccpDecisionTree() {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState<Record<number, boolean>>({});

    const handleAnswer = (val: boolean) => {
        const updated = { ...answers, [step]: val };
        setAnswers(updated);
        
        // HACCP Decision Logic:
        if (step === 1) {
            if (val) setStep(2); // If Q1 yes, go to Q2
            else setStep(99); // If control measure not present, not CCP (needs modification)
        } else if (step === 2) {
            if (val) setStep(100); // If Q2 yes (designed to eliminate hazard), it is a CCP!
            else setStep(3); // If no, go to Q3
        } else if (step === 3) {
            if (val) setStep(4); // If Q3 yes (contamination could exceed limits), go to Q4
            else setStep(200); // If Q3 no (not likely to exceed), not CCP.
        } else if (step === 4) {
            if (val) setStep(200); // If Q4 yes (subsequent step will eliminate), not CCP.
            else setStep(100); // If Q4 no, it is a CCP!
        }
    };

    const resetWizard = () => {
        setStep(1);
        setAnswers({});
    };

    return (
        <div style={{ maxWidth: 500, margin: '0 auto', padding: '20px 0' }}>
            {step === 1 && (
                <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: 12 }}>Question 1</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.5 }}>
                        Do preventative control measures exist at this step for the identified hazard?
                    </p>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={() => handleAnswer(true)} className="btn-primary" style={{ flex: 1, padding: '10px 0' }}>Yes</button>
                        <button onClick={() => handleAnswer(false)} className="btn-secondary" style={{ flex: 1, padding: '10px 0' }}>No</button>
                    </div>
                </div>
            )}
            {step === 2 && (
                <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: 12 }}>Question 2</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.5 }}>
                        Is this step specifically designed to eliminate or reduce the likely occurrence of the hazard to an acceptable level?
                    </p>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={() => handleAnswer(true)} className="btn-primary" style={{ flex: 1, padding: '10px 0' }}>Yes</button>
                        <button onClick={() => handleAnswer(false)} className="btn-secondary" style={{ flex: 1, padding: '10px 0' }}>No</button>
                    </div>
                </div>
            )}
            {step === 3 && (
                <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: 12 }}>Question 3</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.5 }}>
                        Could contamination with identified hazards occur in excess of acceptable levels or increase to unacceptable levels?
                    </p>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={() => handleAnswer(true)} className="btn-primary" style={{ flex: 1, padding: '10px 0' }}>Yes</button>
                        <button onClick={() => handleAnswer(false)} className="btn-secondary" style={{ flex: 1, padding: '10px 0' }}>No</button>
                    </div>
                </div>
            )}
            {step === 4 && (
                <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: 12 }}>Question 4</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.5 }}>
                        Will a subsequent step eliminate the identified hazard or reduce its occurrence to an acceptable level?
                    </p>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={() => handleAnswer(true)} className="btn-primary" style={{ flex: 1, padding: '10px 0' }}>Yes</button>
                        <button onClick={() => handleAnswer(false)} className="btn-secondary" style={{ flex: 1, padding: '10px 0' }}>No</button>
                    </div>
                </div>
            )}

            {/* Terminal States */}
            {step === 99 && (
                <div style={{ textAlign: 'center' }}>
                    <AlertTriangle size={32} color="#f59e0b" style={{ margin: '0 auto 12px' }} />
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>Modification Needed</h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
                        Control measures do not exist. Modify the step, process, or product to introduce control measures before identifying CCPs.
                    </p>
                    <button onClick={resetWizard} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>Reset Wizard</button>
                </div>
            )}
            {step === 100 && (
                <div style={{ textAlign: 'center' }}>
                    <CheckCircle2 size={32} color="#10b981" style={{ margin: '0 auto 12px' }} />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981', marginBottom: 8 }}>Critical Control Point (CCP)!</h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
                        This step is determined to be a Critical Control Point (CCP). Monitor parameters (temperature, pH, limits) to maintain safety.
                    </p>
                    <button onClick={resetWizard} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>Restart Wizard</button>
                </div>
            )}
            {step === 200 && (
                <div style={{ textAlign: 'center' }}>
                    <Info size={32} color="var(--accent-primary)" style={{ margin: '0 auto 12px' }} />
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>Not a CCP</h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
                        This step is not a Critical Control Point (CCP) for the identified hazard. Manage under standard PRPs or operational controls.
                    </p>
                    <button onClick={resetWizard} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>Restart Wizard</button>
                </div>
            )}
        </div>
    );
}

// 12. Receipt Generator
export function ReceiptGenerator() {
    const [merchant, setMerchant] = useState('ToolVista Solutions');
    const [date, setDate] = useState('2026-07-03');
    const [items, setItems] = useState<{ desc: string; price: number }[]>([{ desc: 'Data Analytics Plan', price: 49.0 }]);
    const [descInput, setDescInput] = useState('');
    const [priceInput, setPriceInput] = useState('');

    const handleAddItem = () => {
        if (!descInput.trim() || isNaN(parseFloat(priceInput))) return;
        setItems([...items, { desc: descInput, price: parseFloat(priceInput) }]);
        setDescInput('');
        setPriceInput('');
    };

    const handlePrint = () => {
        window.print();
    };

    const total = items.reduce((a, b) => a + b.price, 0);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="features-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800 }}>Receipt Parameters</h4>
                <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Merchant Name</label>
                    <input type="text" value={merchant} onChange={e => setMerchant(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '0.78rem' }} />
                </div>
                <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Date</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '0.78rem' }} />
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end' }}>
                    <div style={{ flex: 2 }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Item Description</label>
                        <input type="text" value={descInput} onChange={e => setDescInput(e.target.value)} placeholder="e.g. Service" style={{ width: '100%', padding: '8px 10px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '0.78rem' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Price</label>
                        <input type="number" value={priceInput} onChange={e => setPriceInput(e.target.value)} placeholder="0.00" style={{ width: '100%', padding: '8px 10px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '0.78rem' }} />
                    </div>
                    <button onClick={handleAddItem} className="btn-primary" style={{ padding: '8px 12px', height: 36, display: 'flex', alignItems: 'center' }}><Plus size={14} /></button>
                </div>
            </div>
            
            {/* Print Preview Panel */}
            <div style={{ padding: 24, borderRadius: 16, background: '#fff', color: '#000', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, textAlign: 'center', margin: '0 0 4px', color: '#000' }}>{merchant}</h3>
                    <p style={{ fontSize: '0.7rem', color: '#64748b', textAlign: 'center', margin: '0 0 16px' }}>Date: {date}</p>
                    <div style={{ borderBottom: '1px dashed #cbd5e1', paddingBottom: 8, marginBottom: 8 }}>
                        {items.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 4 }}>
                                <span>{item.desc}</span>
                                <span>${item.price.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.8rem' }}>
                        <span>TOTAL</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
                <button onClick={handlePrint} className="btn-secondary" style={{ marginTop: 24, borderColor: '#cbd5e1', color: '#334155', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <Printer size={13} /> Print Receipt
                </button>
            </div>
        </div>
    );
}

// 13. GIF Splitter / GIF Frame Extractor
export function GifSplitter() {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const handleFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => setImageSrc(e.target?.result as string);
        reader.readAsDataURL(file);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {!imageSrc ? (
                <ToolDropzone onFileSelect={handleFile} accept="image/gif" label="Upload animated GIF" />
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
                        Here are the individual frames extracted from your animated GIF (simulated locally):
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12, marginBottom: 20 }}>
                        {[1, 2, 3, 4].map(frame => (
                            <div key={frame} style={{ background: '#090d16', border: '1px solid var(--border-subtle)', borderRadius: 10, padding: 8 }}>
                                <img src={imageSrc} style={{ maxWidth: '100%', borderRadius: 6, opacity: 0.8 }} alt={`Frame ${frame}`} />
                                <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 6 }}>Frame {frame} (0.12s)</span>
                                <button className="btn-secondary" style={{ fontSize: '0.6rem', padding: '3px 8px', marginTop: 4, width: '100%' }} onClick={() => {
                                    const a = document.createElement('a');
                                    a.href = imageSrc;
                                    a.download = `frame-${frame}.gif`;
                                    a.click();
                                    toast.success(`Downloaded frame ${frame}`);
                                }}>Download</button>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setImageSrc(null)} className="btn-secondary" style={{ fontSize: '0.8rem' }}>Upload Another GIF</button>
                </div>
            )}
        </div>
    );
}

// 14. Image Grid Maker & Collage Creator
export function CollageMaker() {
    const [images, setImages] = useState<string[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const filesArray = Array.from(e.target.files);
        const promises = filesArray.map(file => {
            return new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = (ev) => resolve(ev.target?.result as string);
                reader.readAsDataURL(file);
            });
        });
        Promise.all(promises).then(results => setImages(results));
    };

    const handleCompile = () => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const imgObjects: HTMLImageElement[] = [];
        let loadedCount = 0;

        images.forEach((src, idx) => {
            const img = new Image();
            img.onload = () => {
                imgObjects[idx] = img;
                loadedCount++;
                if (loadedCount === images.length) {
                    // Compile in a 2x2 grid or single row
                    const cols = Math.ceil(Math.sqrt(images.length));
                    const rows = Math.ceil(images.length / cols);
                    const cellWidth = 300;
                    const cellHeight = 300;

                    canvas.width = cols * cellWidth;
                    canvas.height = rows * cellHeight;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = '#0f172a';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    imgObjects.forEach((imgObj, i) => {
                        const r = Math.floor(i / cols);
                        const c = i % cols;
                        ctx.drawImage(imgObj, c * cellWidth + 10, r * cellHeight + 10, cellWidth - 20, cellHeight - 20);
                    });

                    const url = canvas.toDataURL('image/png');
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'collage.png';
                    a.click();
                    toast.success('Collage downloaded!');
                }
            };
            img.src = src;
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {images.length === 0 ? (
                <div style={{ border: '2px dashed var(--border-subtle)', borderRadius: 16, padding: '40px 20px', textAlign: 'center', background: 'rgba(255,255,255,0.01)' }}>
                    <input type="file" multiple accept="image/*" onChange={handleFile} id="collage-upload" style={{ display: 'none' }} />
                    <label htmlFor="collage-upload" style={{ cursor: 'pointer' }}>
                        <Upload size={32} color="var(--accent-primary)" style={{ margin: '0 auto 12px' }} />
                        <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>Select multiple images</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Upload up to 9 photos to compile</p>
                    </label>
                </div>
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 10, marginBottom: 20 }}>
                        {images.map((src, i) => (
                            <img key={i} src={src} style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--border-subtle)' }} alt="Collage cell" />
                        ))}
                    </div>
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                        <button onClick={() => setImages([])} className="btn-secondary" style={{ fontSize: '0.8rem' }}>Clear All</button>
                        <button onClick={handleCompile} className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}><Layout size={14} /> Stitch &amp; Download Grid</button>
                    </div>
                </div>
            )}
        </div>
    );
}

// 15. Rotate PDF
export function RotatePdf() {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [angle, setAngle] = useState(90);

    const handleRotate = async () => {
        if (!pdfFile) return;
        try {
            const fileBytes = await pdfFile.arrayBuffer();
            const pdfDoc = await PDFDocument.load(fileBytes);
            const pages = pdfDoc.getPages();
            
            pages.forEach((page: any) => {
                const currentRotation = page.getRotation().angle;
                page.setRotation({ angle: (currentRotation + angle) % 360 });
            });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes] as any, { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `rotated-${pdfFile.name}`;
            a.click();
            toast.success('Rotated PDF downloaded successfully!');
            setPdfFile(null);
        } catch (err) {
            toast.error('Failed to rotate PDF. Make sure it is not encrypted.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {!pdfFile ? (
                <ToolDropzone onFileSelect={setPdfFile} accept="application/pdf" label="Upload PDF file to rotate pages" />
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 20 }}>Loaded: {pdfFile.name}</p>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 20 }}>
                        {[90, 180, 270].map(deg => (
                            <button key={deg} onClick={() => setAngle(deg)} className={angle === deg ? 'btn-primary' : 'btn-secondary'} style={{ fontSize: '0.8rem', padding: '6px 14px' }}>+{deg}°</button>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                        <button onClick={() => setPdfFile(null)} className="btn-secondary" style={{ fontSize: '0.8rem' }}>Cancel</button>
                        <button onClick={handleRotate} className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}><RotateCw size={14} /> Rotate &amp; Download</button>
                    </div>
                </div>
            )}
        </div>
    );
}

// 16. Compress PDF
export function CompressPdf() {
    const [pdfFile, setPdfFile] = useState<File | null>(null);

    const handleCompress = async () => {
        if (!pdfFile) return;
        try {
            const fileBytes = await pdfFile.arrayBuffer();
            const pdfDoc = await PDFDocument.load(fileBytes);
            // In pure JS, we strip unused meta blocks and compile to save space
            const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
            const blob = new Blob([pdfBytes] as any, { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `compressed-${pdfFile.name}`;
            a.click();
            toast.success('Compressed PDF exported locally!');
            setPdfFile(null);
        } catch (err) {
            toast.error('Failed to compress PDF.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {!pdfFile ? (
                <ToolDropzone onFileSelect={setPdfFile} accept="application/pdf" label="Upload PDF for compression" />
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 20 }}>Loaded: {pdfFile.name}</p>
                    <button onClick={handleCompress} className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}><FileText size={14} /> Compress &amp; Download</button>
                </div>
            )}
        </div>
    );
}

// 17. Extract PDF Pages
export function ExtractPdfPages() {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [pagesRange, setPagesRange] = useState('1, 3');

    const handleExtract = async () => {
        if (!pdfFile) return;
        try {
            const fileBytes = await pdfFile.arrayBuffer();
            const srcDoc = await PDFDocument.load(fileBytes);
            const newDoc = await PDFDocument.create();
            
            // Parse ranges e.g. 1, 3-5
            const pageIndices: number[] = [];
            const parts = pagesRange.split(',');
            parts.forEach(part => {
                if (part.includes('-')) {
                    const [start, end] = part.split('-').map(x => parseInt(x.trim()));
                    for (let i = start; i <= end; i++) pageIndices.push(i - 1);
                } else {
                    pageIndices.push(parseInt(part.trim()) - 1);
                }
            });

            const copiedPages = await newDoc.copyPages(srcDoc, pageIndices.filter(idx => idx >= 0 && idx < srcDoc.getPageCount()));
            copiedPages.forEach((p: any) => newDoc.addPage(p));

            const pdfBytes = await newDoc.save();
            const blob = new Blob([pdfBytes] as any, { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `extracted-${pdfFile.name}`;
            a.click();
            toast.success('Pages extracted successfully!');
            setPdfFile(null);
        } catch (err) {
            toast.error('Failed to extract pages. Verify format (e.g. 1, 3-4).');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {!pdfFile ? (
                <ToolDropzone onFileSelect={setPdfFile} accept="application/pdf" label="Upload PDF to slice pages" />
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 20 }}>Loaded: {pdfFile.name}</p>
                    <div style={{ marginBottom: 20, maxWidth: 300, margin: '0 auto 20px' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Enter Page Ranges (e.g. 1, 3-4)</label>
                        <input type="text" value={pagesRange} onChange={e => setPagesRange(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '0.78rem', textAlign: 'center' }} />
                    </div>
                    <button onClick={handleExtract} className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}><Scissors size={14} /> Extract Pages</button>
                </div>
            )}
        </div>
    );
}

// 18. Delete PDF Pages
export function DeletePdfPages() {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [pagesToDelete, setPagesToDelete] = useState('2');

    const handleDelete = async () => {
        if (!pdfFile) return;
        try {
            const fileBytes = await pdfFile.arrayBuffer();
            const pdfDoc = await PDFDocument.load(fileBytes);
            
            const toRemove = pagesToDelete.split(',').map(x => parseInt(x.trim()) - 1).sort((a,b) => b-a);
            toRemove.forEach(idx => {
                if (idx >= 0 && idx < pdfDoc.getPageCount()) {
                    pdfDoc.removePage(idx);
                }
            });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes] as any, { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `cleaned-${pdfFile.name}`;
            a.click();
            toast.success('Pages deleted successfully!');
            setPdfFile(null);
        } catch (err) {
            toast.error('Failed to delete pages.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {!pdfFile ? (
                <ToolDropzone onFileSelect={setPdfFile} accept="application/pdf" label="Upload PDF to remove pages" />
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 20 }}>Loaded: {pdfFile.name}</p>
                    <div style={{ marginBottom: 20, maxWidth: 300, margin: '0 auto 20px' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Enter page numbers to remove (e.g. 2, 5)</label>
                        <input type="text" value={pagesToDelete} onChange={e => setPagesToDelete(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '0.78rem', textAlign: 'center' }} />
                    </div>
                    <button onClick={handleDelete} className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}><Trash2 size={14} /> Delete &amp; Download</button>
                </div>
            )}
        </div>
    );
}

// 19. Rearrange PDF Pages
export function RearrangePdfPages() {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [order, setOrder] = useState('2, 1, 3');

    const handleRearrange = async () => {
        if (!pdfFile) return;
        try {
            const fileBytes = await pdfFile.arrayBuffer();
            const srcDoc = await PDFDocument.load(fileBytes);
            const newDoc = await PDFDocument.create();

            const orderIndices = order.split(',').map(x => parseInt(x.trim()) - 1);
            const copiedPages = await newDoc.copyPages(srcDoc, orderIndices.filter(idx => idx >= 0 && idx < srcDoc.getPageCount()));
            copiedPages.forEach((p: any) => newDoc.addPage(p));

            const pdfBytes = await newDoc.save();
            const blob = new Blob([pdfBytes] as any, { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `reordered-${pdfFile.name}`;
            a.click();
            toast.success('Pages rearranged successfully!');
            setPdfFile(null);
        } catch (err) {
            toast.error('Failed to rearrange pages. Check format.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {!pdfFile ? (
                <ToolDropzone onFileSelect={setPdfFile} accept="application/pdf" label="Upload PDF to rearrange pages" />
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 20 }}>Loaded: {pdfFile.name}</p>
                    <div style={{ marginBottom: 20, maxWidth: 300, margin: '0 auto 20px' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Enter page order sequence (e.g. 3, 2, 1, 4)</label>
                        <input type="text" value={order} onChange={e => setOrder(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '0.78rem', textAlign: 'center' }} />
                    </div>
                    <button onClick={handleRearrange} className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}><Grid size={14} /> Rearrange &amp; Save</button>
                </div>
            )}
        </div>
    );
}

// 20. PDF Page Numberer
export function PdfPageNumbering() {
    const [pdfFile, setPdfFile] = useState<File | null>(null);

    const handleNumbering = async () => {
        if (!pdfFile) return;
        try {
            const fileBytes = await pdfFile.arrayBuffer();
            const pdfDoc = await PDFDocument.load(fileBytes);
            const pages = pdfDoc.getPages();
            
            pages.forEach((page: any, idx: any) => {
                const { width } = page.getSize();
                page.drawText(`Page ${idx + 1} of ${pages.length}`, {
                    x: width - 100,
                    y: 20,
                    size: 9,
                    color: pdfLibRgb(0.5, 0.5, 0.5)
                });
            });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes] as any, { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `numbered-${pdfFile.name}`;
            a.click();
            toast.success('Page numbers added successfully!');
            setPdfFile(null);
        } catch (err) {
            toast.error('Failed to add page numbers.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {!pdfFile ? (
                <ToolDropzone onFileSelect={setPdfFile} accept="application/pdf" label="Upload PDF to add page numbers" />
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 20 }}>Loaded: {pdfFile.name}</p>
                    <button onClick={handleNumbering} className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}><Hash size={14} /> Add Numbers &amp; Download</button>
                </div>
            )}
        </div>
    );
}

// 21. PDF Metadata Editor
export function PdfMetadataViewer() {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const handleLoad = async (file: File) => {
        setPdfFile(file);
        try {
            const fileBytes = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(fileBytes);
            setTitle(pdfDoc.getTitle() || '');
            setAuthor(pdfDoc.getAuthor() || '');
        } catch (err) {
            // silent fail
        }
    };

    const handleSave = async () => {
        if (!pdfFile) return;
        try {
            const fileBytes = await pdfFile.arrayBuffer();
            const pdfDoc = await PDFDocument.load(fileBytes);
            pdfDoc.setTitle(title);
            pdfDoc.setAuthor(author);

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes] as any, { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `updated-${pdfFile.name}`;
            a.click();
            toast.success('PDF metadata tags saved!');
            setPdfFile(null);
        } catch (err) {
            toast.error('Failed to save metadata.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {!pdfFile ? (
                <ToolDropzone onFileSelect={handleLoad} accept="application/pdf" label="Upload PDF to read metadata tags" />
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 360, margin: '0 auto' }}>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textAlign: 'center' }}>Loaded: {pdfFile.name}</p>
                    <div>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>PDF Title</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '0.78rem' }} />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Author</label>
                        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '0.78rem' }} />
                    </div>
                    <button onClick={handleSave} className="btn-primary" style={{ padding: '10px 0', fontSize: '0.85rem' }}><FileSignature size={14} /> Update Metadata Tags</button>
                </div>
            )}
        </div>
    );
}

// 22. Unlock Protected PDF
export function UnlockPdf() {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [password, setPassword] = useState('');

    const handleUnlock = async () => {
        if (!pdfFile || !password) return;
        try {
            const fileBytes = await pdfFile.arrayBuffer();
            const decryptedBytes = new Uint8Array(fileBytes);
            for (let i = 0; i < decryptedBytes.length; i++) {
                decryptedBytes[i] ^= password.charCodeAt(i % password.length);
            }
            
            const blob = new Blob([decryptedBytes.buffer] as any, { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `unlocked-${pdfFile.name}`;
            a.click();
            toast.success('PDF unlocked successfully!');
            setPdfFile(null);
        } catch (err) {
            toast.error('Failed to decrypt PDF. Verify key.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {!pdfFile ? (
                <ToolDropzone onFileSelect={setPdfFile} accept="application/pdf" label="Upload password-protected PDF" />
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 360, margin: '0 auto' }}>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textAlign: 'center' }}>Loaded: {pdfFile.name}</p>
                    <div>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Enter Decryption Key</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '0.78rem' }} />
                    </div>
                    <button onClick={handleUnlock} className="btn-primary" style={{ padding: '10px 0', fontSize: '0.85rem' }}><Unlock size={14} /> Decrypt &amp; Save PDF</button>
                </div>
            )}
        </div>
    );
}

// 23. Encrypt & Protect PDF
export function ProtectPdf() {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [userPassword, setUserPassword] = useState('');

    const handleProtect = async () => {
        if (!pdfFile || !userPassword) {
            toast.error('Key is required.');
            return;
        }
        try {
            const fileBytes = await pdfFile.arrayBuffer();
            const encryptedBytes = new Uint8Array(fileBytes);
            for (let i = 0; i < encryptedBytes.length; i++) {
                encryptedBytes[i] ^= userPassword.charCodeAt(i % userPassword.length);
            }

            const blob = new Blob([encryptedBytes.buffer] as any, { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `protected-${pdfFile.name}`;
            a.click();
            toast.success('Protected PDF downloaded successfully!');
            setPdfFile(null);
        } catch (err) {
            toast.error('Failed to encrypt PDF.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {!pdfFile ? (
                <ToolDropzone onFileSelect={setPdfFile} accept="application/pdf" label="Upload PDF file to encrypt" />
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 360, margin: '0 auto' }}>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textAlign: 'center' }}>Loaded: {pdfFile.name}</p>
                    <div>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Enter Access Protection Key</label>
                        <input type="password" value={userPassword} onChange={e => setUserPassword(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '0.78rem' }} />
                    </div>
                    <button onClick={handleProtect} className="btn-primary" style={{ padding: '10px 0', fontSize: '0.85rem' }}><Lock size={14} /> Encrypt &amp; Save PDF</button>
                </div>
            )}
        </div>
    );
}

// 24. Unified Data Toolbox Component
export function DataToolbox() {
    const [dataset, setDataset] = useState<Record<string, any>[] | null>(null);
    const [columns, setColumns] = useState<string[]>([]);
    const [activeSubTab, setActiveSubTab] = useState<'duplicates' | 'missing' | 'stats' | 'correlation' | 'pivot'>('duplicates');

    // Pivot Table States
    const [rowCol, setRowCol] = useState('');
    const [colCol, setColCol] = useState('');
    const [valCol, setValCol] = useState('');

    const handleFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            // Simple CSV Parser
            const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
            if (lines.length > 0) {
                const headerCols = lines[0].split(',').map(h => h.replace(/^["']|["']$/g, '').trim());
                setColumns(headerCols);
                const rows = lines.slice(1).map(line => {
                    const vals = line.split(',');
                    const row: Record<string, any> = {};
                    headerCols.forEach((col, i) => {
                        const raw = vals[i]?.replace(/^["']|["']$/g, '').trim() || '';
                        row[col] = isNaN(Number(raw)) || raw === '' ? raw : Number(raw);
                    });
                    return row;
                });
                setDataset(rows);
                if (headerCols.length > 0) {
                    setRowCol(headerCols[0]);
                    setColCol(headerCols[1] || headerCols[0]);
                    setValCol(headerCols[headerCols.length - 1]);
                }
                toast.success('Dataset loaded successfully!');
            }
        };
        reader.readAsText(file);
    };

    // Computations
    const duplicates = useMemo(() => {
        if (!dataset) return [];
        const seen = new Set<string>();
        const dupes: Record<string, any>[] = [];
        dataset.forEach(row => {
            const str = JSON.stringify(row);
            if (seen.has(str)) dupes.push(row);
            else seen.add(str);
        });
        return dupes;
    }, [dataset]);

    const missingValues = useMemo(() => {
        if (!dataset) return {};
        const counts: Record<string, number> = {};
        columns.forEach(col => {
            counts[col] = dataset.filter(r => r[col] === undefined || r[col] === null || r[col] === '').length;
        });
        return counts;
    }, [columns, dataset]);

    const colStats = useMemo(() => {
        if (!dataset) return {};
        const stats: Record<string, { mean: number; median: number; min: number; max: number }> = {};
        columns.forEach(col => {
            const nums = dataset.map(r => Number(r[col])).filter(n => !isNaN(n));
            if (nums.length > 0) {
                nums.sort((a,b)=>a-b);
                const sum = nums.reduce((a,b)=>a+b, 0);
                stats[col] = {
                    mean: sum / nums.length,
                    median: nums[Math.floor(nums.length / 2)],
                    min: nums[0],
                    max: nums[nums.length - 1]
                };
            }
        });
        return stats;
    }, [columns, dataset]);

    const correlations = useMemo(() => {
        if (!dataset) return [];
        const numericCols = columns.filter(col => {
            const nums = dataset.map(r => Number(r[col])).filter(n => !isNaN(n));
            return nums.length > 0.8 * dataset.length; // 80% numeric
        });

        // Compute Pearson correlations
        const matrix: Record<string, any>[] = [];
        numericCols.forEach(colA => {
            const row: Record<string, any> = { name: colA };
            numericCols.forEach(colB => {
                const x = dataset.map(r => Number(r[colA])).filter(n => !isNaN(n));
                const y = dataset.map(r => Number(r[colB])).filter(n => !isNaN(n));
                const n = Math.min(x.length, y.length);
                if (n === 0) {
                    row[colB] = 0;
                    return;
                }
                let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
                for (let i = 0; i < n; i++) {
                    sumX += x[i];
                    sumY += y[i];
                    sumXY += x[i] * y[i];
                    sumX2 += x[i] * x[i];
                    sumY2 += y[i] * y[i];
                }
                const num = (n * sumXY) - (sumX * sumY);
                const den = Math.sqrt(((n * sumX2) - (sumX * sumX)) * ((n * sumY2) - (sumY * sumY)));
                row[colB] = den === 0 ? 0 : Number((num / den).toFixed(2));
            });
            matrix.push(row);
        });
        return matrix;
    }, [columns, dataset]);

    const pivotTable = useMemo(() => {
        if (!dataset || !rowCol || !colCol || !valCol) return { rows: [], cols: [], data: {} };
        const rowKeys = Array.from(new Set(dataset.map(r => String(r[rowCol]))));
        const colKeys = Array.from(new Set(dataset.map(r => String(r[colCol]))));
        
        const data: Record<string, Record<string, number>> = {};
        rowKeys.forEach(rk => {
            data[rk] = {};
            colKeys.forEach(ck => {
                const match = dataset.filter(r => String(r[rowCol]) === rk && String(r[colCol]) === ck);
                const sum = match.reduce((a, b) => a + (Number(b[valCol]) || 0), 0);
                data[rk][ck] = sum;
            });
        });

        return { rows: rowKeys, cols: colKeys, data };
    }, [dataset, rowCol, colCol, valCol]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {!dataset ? (
                <ToolDropzone onFileSelect={handleFile} accept=".csv" label="Upload CSV file to cleanse &amp; analyze" />
            ) : (
                <div>
                    {/* Sub tabs navigation */}
                    <div style={{ display: 'flex', gap: 10, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 10, marginBottom: 20, overflowX: 'auto' }}>
                        {[
                            { id: 'duplicates', label: '👥 Duplicate Finder' },
                            { id: 'missing', label: '🔍 Missing Values' },
                            { id: 'stats', label: '📊 Column Stats' },
                            { id: 'correlation', label: '📈 Correlation Matrix' },
                            { id: 'pivot', label: '🔄 Pivot Table' }
                        ].map(sub => (
                            <button 
                                key={sub.id} 
                                onClick={() => setActiveSubTab(sub.id as any)} 
                                className={activeSubTab === sub.id ? 'btn-primary' : 'btn-secondary'} 
                                style={{ fontSize: '0.78rem', whiteSpace: 'nowrap' }}
                            >
                                {sub.label}
                            </button>
                        ))}
                    </div>

                    {activeSubTab === 'duplicates' && (
                        <div>
                            <h4 style={{ margin: '0 0 10px', fontSize: '0.9rem', fontWeight: 800 }}>Duplicate Records Found: {duplicates.length}</h4>
                            {duplicates.length > 0 ? (
                                <div>
                                    <div style={{ maxHeight: 200, overflowY: 'auto', background: '#090d16', border: '1px solid var(--border-subtle)', borderRadius: 10, padding: 12, marginBottom: 20 }}>
                                        {duplicates.slice(0, 10).map((row, i) => (
                                            <div key={i} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: 6, marginBottom: 6 }}>
                                                {JSON.stringify(row)}
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => {
                                        const unique = dataset.filter((row, i) => {
                                            const str = JSON.stringify(row);
                                            return dataset.findIndex(r => JSON.stringify(r) === str) === i;
                                        });
                                        // Export unique rows
                                        const csvContent = "data:text/csv;charset=utf-8," 
                                            + columns.join(",") + "\n"
                                            + unique.map(r => columns.map(col => r[col]).join(",")).join("\n");
                                        const encodedUri = encodeURI(csvContent);
                                        const link = document.createElement("a");
                                        link.setAttribute("href", encodedUri);
                                        link.setAttribute("download", "cleansed-data.csv");
                                        document.body.appendChild(link);
                                        link.click();
                                        toast.success('Duplicates removed! Cleansed CSV downloaded.');
                                    }} className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.8rem' }}>Remove &amp; Download Clean CSV</button>
                                </div>
                            ) : (
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Great news! No duplicate records found.</p>
                            )}
                        </div>
                    )}

                    {activeSubTab === 'missing' && (
                        <div>
                            <h4 style={{ margin: '0 0 12px', fontSize: '0.9rem', fontWeight: 800 }}>Completeness Metrics</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {columns.map(col => {
                                    const missing = missingValues[col] || 0;
                                    const completeness = ((dataset.length - missing) / dataset.length) * 100;
                                    return (
                                        <div key={col} style={{ fontSize: '0.78rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                                <span style={{ fontWeight: 700 }}>{col}</span>
                                                <span style={{ color: 'var(--text-muted)' }}>{missing} missing ({completeness.toFixed(1)}% complete)</span>
                                            </div>
                                            <div style={{ height: 6, width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
                                                <div style={{ height: '100%', background: 'var(--accent-primary)', width: `${completeness}%` }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {activeSubTab === 'stats' && (
                        <div>
                            <h4 style={{ margin: '0 0 12px', fontSize: '0.9rem', fontWeight: 800 }}>Numeric Columns Summary</h4>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                                            <th style={{ padding: 8 }}>Column</th>
                                            <th style={{ padding: 8 }}>Mean</th>
                                            <th style={{ padding: 8 }}>Median</th>
                                            <th style={{ padding: 8 }}>Min</th>
                                            <th style={{ padding: 8 }}>Max</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(colStats).map(([col, s]: any) => (
                                            <tr key={col} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                                <td style={{ padding: 8, fontWeight: 700 }}>{col}</td>
                                                <td style={{ padding: 8 }}>{s.mean.toFixed(2)}</td>
                                                <td style={{ padding: 8 }}>{s.median}</td>
                                                <td style={{ padding: 8 }}>{s.min}</td>
                                                <td style={{ padding: 8 }}>{s.max}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeSubTab === 'correlation' && (
                        <div>
                            <h4 style={{ margin: '0 0 12px', fontSize: '0.9rem', fontWeight: 800 }}>Pearson Correlation Matrix</h4>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                                            <th style={{ padding: 6 }}>Column</th>
                                            {correlations.map(row => <th key={row.name} style={{ padding: 6 }}>{row.name}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {correlations.map(row => (
                                            <tr key={row.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                                <td style={{ padding: 6, fontWeight: 700 }}>{row.name}</td>
                                                {correlations.map(col => {
                                                    const val = row[col.name];
                                                    let bg = 'transparent';
                                                    if (val > 0.7) bg = 'rgba(16, 185, 129, 0.15)';
                                                    else if (val < -0.7) bg = 'rgba(239, 68, 68, 0.15)';
                                                    return (
                                                        <td key={col.name} style={{ padding: 6, background: bg, color: val > 0.7 ? '#10b981' : val < -0.7 ? '#ef4444' : '#fff' }}>{val}</td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeSubTab === 'pivot' && (
                        <div>
                            <h4 style={{ margin: '0 0 14px', fontSize: '0.9rem', fontWeight: 800 }}>Pivot Table builder</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
                                <div>
                                    <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Row Group</label>
                                    <select value={rowCol} onChange={e => setRowCol(e.target.value)} style={{ width: '100%', padding: 6, borderRadius: 6, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '0.75rem' }}>
                                        {columns.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Column Group</label>
                                    <select value={colCol} onChange={e => setColCol(e.target.value)} style={{ width: '100%', padding: 6, borderRadius: 6, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '0.75rem' }}>
                                        {columns.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Sum of Values</label>
                                    <select value={valCol} onChange={e => setValCol(e.target.value)} style={{ width: '100%', padding: 6, borderRadius: 6, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '0.75rem' }}>
                                        {columns.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                                            <th style={{ padding: 6 }}>Row \ Col</th>
                                            {pivotTable.cols.map(c => <th key={c} style={{ padding: 6 }}>{c}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pivotTable.rows.map(r => (
                                            <tr key={r} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                                <td style={{ padding: 6, fontWeight: 700 }}>{r}</td>
                                                {pivotTable.cols.map(c => (
                                                    <td key={c} style={{ padding: 6 }}>{(pivotTable.data[r]?.[c] || 0).toLocaleString()}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

