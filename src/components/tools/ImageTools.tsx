'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
    Download, Image as ImageIcon, RefreshCw, AlertCircle, 
    Check, Crop, Minimize, RotateCw, Maximize 
} from 'lucide-react';
import { toast } from 'sonner';

// Helper: Convert File to Image Element
const fileToImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error('Failed to load image.'));
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    });
};

interface ToolProps {
    onDone?: () => void;
}

// 1. JPG to PNG
export function JpgToPng({ onDone }: ToolProps) {
    const [file, setFile] = useState<File | null>(null);
    const [converting, setConverting] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const onDrop = async (accepted: File[]) => {
        if (accepted.length === 0) return;
        const f = accepted[0];
        setFile(f);
        setResult(null);
        setConverting(true);
        try {
            const img = await fileToImage(f);
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
            const url = canvas.toDataURL('image/png');
            setResult(url);
            toast.success('Successfully converted to PNG!');
            if (onDone) onDone();
        } catch (e) {
            toast.error('Error converting image.');
        } finally {
            setConverting(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/jpeg': ['.jpg', '.jpeg'] },
        maxFiles: 1
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div {...getRootProps()} style={dropzoneStyle(isDragActive)}>
                <input {...getInputProps()} />
                <ImageIcon size={36} color="var(--accent-primary)" style={{ marginBottom: 12 }} />
                <p style={{ margin: 0, fontWeight: 600 }}>{isDragActive ? 'Drop the JPG image here' : 'Drag & drop a JPG/JPEG image here'}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 6 }}>or click to browse files</span>
            </div>
            {file && (
                <div style={cardStyle}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Selected file: <strong>{file.name}</strong></p>
                    {converting && <p style={{ color: 'var(--text-muted)', margin: '10px 0 0', fontSize: '0.8rem' }}><RefreshCw size={12} className="spin" /> Processing...</p>}
                    {result && (
                        <div style={{ marginTop: 14 }}>
                            <img src={result} alt="Converted" style={previewStyle} />
                            <a href={result} download={file.name.replace(/\.[^/.]+$/, "") + ".png"} className="btn-primary" style={btnLinkStyle}>
                                <Download size={14} /> Download PNG
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// 2. PNG to JPG
export function PngToJpg({ onDone }: ToolProps) {
    const [file, setFile] = useState<File | null>(null);
    const [converting, setConverting] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const onDrop = async (accepted: File[]) => {
        if (accepted.length === 0) return;
        const f = accepted[0];
        setFile(f);
        setResult(null);
        setConverting(true);
        try {
            const img = await fileToImage(f);
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Handle transparency by filling with white background
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
            }
            const url = canvas.toDataURL('image/jpeg', 0.92);
            setResult(url);
            toast.success('Successfully converted to JPG!');
            if (onDone) onDone();
        } catch (e) {
            toast.error('Error converting image.');
        } finally {
            setConverting(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/png': ['.png'] },
        maxFiles: 1
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div {...getRootProps()} style={dropzoneStyle(isDragActive)}>
                <input {...getInputProps()} />
                <ImageIcon size={36} color="var(--accent-primary)" style={{ marginBottom: 12 }} />
                <p style={{ margin: 0, fontWeight: 600 }}>{isDragActive ? 'Drop the PNG image here' : 'Drag & drop a PNG image here'}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 6 }}>or click to browse files</span>
            </div>
            {file && (
                <div style={cardStyle}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Selected file: <strong>{file.name}</strong></p>
                    {converting && <p style={{ color: 'var(--text-muted)', margin: '10px 0 0', fontSize: '0.8rem' }}><RefreshCw size={12} className="spin" /> Processing...</p>}
                    {result && (
                        <div style={{ marginTop: 14 }}>
                            <img src={result} alt="Converted" style={previewStyle} />
                            <a href={result} download={file.name.replace(/\.[^/.]+$/, "") + ".jpg"} className="btn-primary" style={btnLinkStyle}>
                                <Download size={14} /> Download JPG
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// 3. WEBP to PNG
export function WebpToPng({ onDone }: ToolProps) {
    const [file, setFile] = useState<File | null>(null);
    const [converting, setConverting] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const onDrop = async (accepted: File[]) => {
        if (accepted.length === 0) return;
        const f = accepted[0];
        setFile(f);
        setResult(null);
        setConverting(true);
        try {
            const img = await fileToImage(f);
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
            const url = canvas.toDataURL('image/png');
            setResult(url);
            toast.success('Successfully converted to PNG!');
            if (onDone) onDone();
        } catch (e) {
            toast.error('Error converting image.');
        } finally {
            setConverting(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/webp': ['.webp'] },
        maxFiles: 1
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div {...getRootProps()} style={dropzoneStyle(isDragActive)}>
                <input {...getInputProps()} />
                <ImageIcon size={36} color="var(--accent-primary)" style={{ marginBottom: 12 }} />
                <p style={{ margin: 0, fontWeight: 600 }}>{isDragActive ? 'Drop the WEBP image here' : 'Drag & drop a WEBP image here'}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 6 }}>or click to browse files</span>
            </div>
            {file && (
                <div style={cardStyle}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Selected file: <strong>{file.name}</strong></p>
                    {converting && <p style={{ color: 'var(--text-muted)', margin: '10px 0 0', fontSize: '0.8rem' }}><RefreshCw size={12} className="spin" /> Processing...</p>}
                    {result && (
                        <div style={{ marginTop: 14 }}>
                            <img src={result} alt="Converted" style={previewStyle} />
                            <a href={result} download={file.name.replace(/\.[^/.]+$/, "") + ".png"} className="btn-primary" style={btnLinkStyle}>
                                <Download size={14} /> Download PNG
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// 4. PNG to WEBP
export function PngToWebp({ onDone }: ToolProps) {
    const [file, setFile] = useState<File | null>(null);
    const [converting, setConverting] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const onDrop = async (accepted: File[]) => {
        if (accepted.length === 0) return;
        const f = accepted[0];
        setFile(f);
        setResult(null);
        setConverting(true);
        try {
            const img = await fileToImage(f);
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
            const url = canvas.toDataURL('image/webp', 0.9);
            setResult(url);
            toast.success('Successfully converted to WEBP!');
            if (onDone) onDone();
        } catch (e) {
            toast.error('Error converting image.');
        } finally {
            setConverting(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/png': ['.png'] },
        maxFiles: 1
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div {...getRootProps()} style={dropzoneStyle(isDragActive)}>
                <input {...getInputProps()} />
                <ImageIcon size={36} color="var(--accent-primary)" style={{ marginBottom: 12 }} />
                <p style={{ margin: 0, fontWeight: 600 }}>{isDragActive ? 'Drop the PNG image here' : 'Drag & drop a PNG image here'}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 6 }}>or click to browse files</span>
            </div>
            {file && (
                <div style={cardStyle}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Selected file: <strong>{file.name}</strong></p>
                    {converting && <p style={{ color: 'var(--text-muted)', margin: '10px 0 0', fontSize: '0.8rem' }}><RefreshCw size={12} className="spin" /> Processing...</p>}
                    {result && (
                        <div style={{ marginTop: 14 }}>
                            <img src={result} alt="Converted" style={previewStyle} />
                            <a href={result} download={file.name.replace(/\.[^/.]+$/, "") + ".webp"} className="btn-primary" style={btnLinkStyle}>
                                <Download size={14} /> Download WEBP
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// 5. Image Compressor
export function ImageCompressor({ onDone }: ToolProps) {
    const [file, setFile] = useState<File | null>(null);
    const [quality, setQuality] = useState(0.6);
    const [result, setResult] = useState<{ url: string; size: number } | null>(null);
    const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);

    const onDrop = async (accepted: File[]) => {
        if (accepted.length === 0) return;
        const f = accepted[0];
        setFile(f);
        setResult(null);
        try {
            const img = await fileToImage(f);
            setImgElement(img);
            compress(img, quality);
        } catch (e) {
            toast.error('Failed to load image.');
        }
    };

    const compress = (img: HTMLImageElement, q: number) => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);

        // Compress using JPEG
        const url = canvas.toDataURL('image/jpeg', q);
        // Estimate byte size from base64 length
        const base64Length = url.split(',')[1].length;
        const sizeInBytes = Math.round(base64Length * 0.75);
        setResult({ url, size: sizeInBytes });
        if (onDone) onDone();
    };

    useEffect(() => {
        if (imgElement) {
            compress(imgElement, quality);
        }
    }, [quality, imgElement]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 1
    });

    const savedPercent = file && result ? Math.round(((file.size - result.size) / file.size) * 100) : 0;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div {...getRootProps()} style={dropzoneStyle(isDragActive)}>
                <input {...getInputProps()} />
                <Minimize size={36} color="var(--accent-primary)" style={{ marginBottom: 12 }} />
                <p style={{ margin: 0, fontWeight: 600 }}>{isDragActive ? 'Drop image here' : 'Drag & drop image here'}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 6 }}>Supports JPG, PNG, WEBP</span>
            </div>

            {file && result && (
                <div style={cardStyle}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Selected: <strong>{file.name}</strong></p>

                    <div style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600 }}>
                            <span>Compression Quality: {Math.round(quality * 100)}%</span>
                        </div>
                        <input 
                            type="range" 
                            min="0.1" 
                            max="1.0" 
                            step="0.05" 
                            value={quality} 
                            onChange={(e) => setQuality(parseFloat(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20, textAlign: 'center' }}>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 10 }}>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Original Size</p>
                            <p style={{ margin: '4px 0 0', fontWeight: 700 }}>{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <div style={{ background: 'rgba(186,158,255,0.08)', padding: 12, borderRadius: 10, border: '1px solid rgba(186,158,255,0.2)' }}>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: '#cdcdff' }}>Compressed Size</p>
                            <p style={{ margin: '4px 0 0', fontWeight: 700, color: '#ba9eff' }}>{(result.size / 1024).toFixed(1)} KB</p>
                        </div>
                    </div>

                    {savedPercent > 0 ? (
                        <div style={{ padding: '8px 12px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, color: '#10b981', fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
                            <Check size={14} /> Saved {savedPercent}% of file size!
                        </div>
                    ) : (
                        <div style={{ padding: '8px 12px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8, color: '#f59e0b', fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
                            <AlertCircle size={14} /> Try a lower quality slider to reduce the size.
                        </div>
                    )}

                    <img src={result.url} alt="Compressed preview" style={previewStyle} />
                    
                    <a href={result.url} download={file.name.replace(/\.[^/.]+$/, "") + "_compressed.jpg"} className="btn-primary" style={btnLinkStyle}>
                        <Download size={14} /> Download Compressed JPG
                    </a>
                </div>
            )}
        </div>
    );
}

// 6. Image Resizer
export function ImageResizer({ onDone }: ToolProps) {
    const [file, setFile] = useState<File | null>(null);
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(600);
    const [lockAspect, setLockAspect] = useState(true);
    const [ratio, setRatio] = useState(1);
    const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
    const [result, setResult] = useState<string | null>(null);

    const onDrop = async (accepted: File[]) => {
        if (accepted.length === 0) return;
        const f = accepted[0];
        setFile(f);
        setResult(null);
        try {
            const img = await fileToImage(f);
            setImgElement(img);
            setWidth(img.width);
            setHeight(img.height);
            setRatio(img.width / img.height);
        } catch (e) {
            toast.error('Failed to load image.');
        }
    };

    const handleWidthChange = (w: number) => {
        setWidth(w);
        if (lockAspect && ratio) {
            setHeight(Math.round(w / ratio));
        }
    };

    const handleHeightChange = (h: number) => {
        setHeight(h);
        if (lockAspect && ratio) {
            setWidth(Math.round(h * ratio));
        }
    };

    const resize = () => {
        if (!imgElement) return;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(imgElement, 0, 0, width, height);
        const url = canvas.toDataURL(file?.type || 'image/png');
        setResult(url);
        toast.success(`Resized successfully to ${width}x${height}px!`);
        if (onDone) onDone();
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 1
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div {...getRootProps()} style={dropzoneStyle(isDragActive)}>
                <input {...getInputProps()} />
                <Maximize size={36} color="var(--accent-primary)" style={{ marginBottom: 12 }} />
                <p style={{ margin: 0, fontWeight: 600 }}>{isDragActive ? 'Drop image here' : 'Drag & drop image to resize'}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Resize dimensions visually</span>
            </div>

            {file && imgElement && (
                <div style={cardStyle}>
                    <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Original: <strong>{imgElement.width} x {imgElement.height} px</strong></p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>Width (px)</label>
                            <input 
                                type="number" 
                                value={width} 
                                onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>Height (px)</label>
                            <input 
                                type="number" 
                                value={height} 
                                onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: 20 }}>
                        <input 
                            type="checkbox" 
                            checked={lockAspect} 
                            onChange={(e) => setLockAspect(e.target.checked)}
                            style={{ accentColor: 'var(--accent-primary)' }}
                        />
                        Lock Aspect Ratio ({ratio.toFixed(2)}:1)
                    </label>

                    <button onClick={resize} className="btn-primary" style={{ width: '100%', marginBottom: 16 }}>
                        ⚡ Resize Image
                    </button>

                    {result && (
                        <div>
                            <img src={result} alt="Resized preview" style={previewStyle} />
                            <a href={result} download={file.name.replace(/\.[^/.]+$/, "") + `_${width}x${height}` + (file.name.slice(file.name.lastIndexOf('.')))} className="btn-primary" style={btnLinkStyle}>
                                <Download size={14} /> Download Resized Image
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// 7. Image Cropper (Clean local bounding box cropper)
export function ImageCropper({ onDone }: ToolProps) {
    const [file, setFile] = useState<File | null>(null);
    const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
    const [crop, setCrop] = useState({ x: 10, y: 10, w: 80, h: 80 }); // in percentages
    const [result, setResult] = useState<string | null>(null);

    const onDrop = async (accepted: File[]) => {
        if (accepted.length === 0) return;
        const f = accepted[0];
        setFile(f);
        setResult(null);
        try {
            const img = await fileToImage(f);
            setImgElement(img);
            setCrop({ x: 15, y: 15, w: 70, h: 70 });
        } catch (e) {
            toast.error('Failed to load image.');
        }
    };

    const handleCrop = () => {
        if (!imgElement || !file) return;
        const canvas = document.createElement('canvas');

        // Map percentage to actual pixels
        const realX = (crop.x / 100) * imgElement.width;
        const realY = (crop.y / 100) * imgElement.height;
        const realW = (crop.w / 100) * imgElement.width;
        const realH = (crop.h / 100) * imgElement.height;

        canvas.width = realW;
        canvas.height = realH;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(imgElement, realX, realY, realW, realH, 0, 0, realW, realH);

        const url = canvas.toDataURL(file.type || 'image/png');
        setResult(url);
        toast.success('Cropped successfully!');
        if (onDone) onDone();
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 1
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div {...getRootProps()} style={dropzoneStyle(isDragActive)}>
                <input {...getInputProps()} />
                <Crop size={36} color="var(--accent-primary)" style={{ marginBottom: 12 }} />
                <p style={{ margin: 0, fontWeight: 600 }}>{isDragActive ? 'Drop image here' : 'Drag & drop image to crop'}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Adjust crop borders locally</span>
            </div>

            {file && imgElement && (
                <div style={cardStyle}>
                    <p style={{ margin: '0 0 14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Use sliders below to adjust the crop box area:</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                        <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Horizontal Position (X): {crop.x}%</span>
                            <input type="range" min="0" max={100 - crop.w} value={crop.x} onChange={(e) => setCrop(prev => ({ ...prev, x: parseInt(e.target.value) }))} style={{ width: '100%', accentColor: '#ba9eff' }} />
                        </div>
                        <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Vertical Position (Y): {crop.y}%</span>
                            <input type="range" min="0" max={100 - crop.h} value={crop.y} onChange={(e) => setCrop(prev => ({ ...prev, y: parseInt(e.target.value) }))} style={{ width: '100%', accentColor: '#ba9eff' }} />
                        </div>
                        <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Crop Width: {crop.w}%</span>
                            <input type="range" min="10" max={100 - crop.x} value={crop.w} onChange={(e) => setCrop(prev => ({ ...prev, w: parseInt(e.target.value) }))} style={{ width: '100%', accentColor: '#ba9eff' }} />
                        </div>
                        <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Crop Height: {crop.h}%</span>
                            <input type="range" min="10" max={100 - crop.y} value={crop.h} onChange={(e) => setCrop(prev => ({ ...prev, h: parseInt(e.target.value) }))} style={{ width: '100%', accentColor: '#ba9eff' }} />
                        </div>
                    </div>

                    {/* Relative Box Visualizer */}
                    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#000', borderRadius: 8, marginBottom: 20 }}>
                        <img src={imgElement.src} alt="Source" style={{ width: '100%', display: 'block', opacity: 0.35 }} />
                        <div style={{
                            position: 'absolute',
                            left: `${crop.x}%`,
                            top: `${crop.y}%`,
                            width: `${crop.w}%`,
                            height: `${crop.h}%`,
                            border: '2px dashed #ba9eff',
                            boxShadow: '0 0 0 9999px rgba(0,0,0,0.4)',
                            backgroundImage: `url(${imgElement.src})`,
                            backgroundSize: `${100 / (crop.w / 100)}% ${100 / (crop.h / 100)}%`,
                            backgroundPosition: `${crop.x / (100 - crop.w) * 100}% ${crop.y / (100 - crop.h) * 100}%`,
                            pointerEvents: 'none'
                        }} />
                    </div>

                    <button onClick={handleCrop} className="btn-primary" style={{ width: '100%', marginBottom: 20 }}>
                        ⚡ Crop Image
                    </button>

                    {result && (
                        <div>
                            <img src={result} alt="Cropped output" style={previewStyle} />
                            <a href={result} download={file.name.replace(/\.[^/.]+$/, "") + "_cropped" + (file.name.slice(file.name.lastIndexOf('.')))} className="btn-primary" style={btnLinkStyle}>
                                <Download size={14} /> Download Cropped Image
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// 8. Image Rotator
export function ImageRotator({ onDone }: ToolProps) {
    const [file, setFile] = useState<File | null>(null);
    const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
    const [rotation, setRotation] = useState(0); // 0, 90, 180, 270 degrees
    const [flipH, setFlipH] = useState(false);
    const [flipV, setFlipV] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const onDrop = async (accepted: File[]) => {
        if (accepted.length === 0) return;
        const f = accepted[0];
        setFile(f);
        setResult(null);
        try {
            const img = await fileToImage(f);
            setImgElement(img);
            setRotation(0);
            setFlipH(false);
            setFlipV(false);
        } catch (e) {
            toast.error('Failed to load image.');
        }
    };

    const processImage = () => {
        if (!imgElement || !file) return;
        const canvas = document.createElement('canvas');
        const isOrtho = rotation === 90 || rotation === 270;
        
        canvas.width = isOrtho ? imgElement.height : imgElement.width;
        canvas.height = isOrtho ? imgElement.width : imgElement.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Translate origin to center
        ctx.translate(canvas.width / 2, canvas.height / 2);
        
        // Rotate
        ctx.rotate((rotation * Math.PI) / 180);
        
        // Flip
        const scaleH = flipH ? -1 : 1;
        const scaleV = flipV ? -1 : 1;
        ctx.scale(scaleH, scaleV);

        // Draw image offset to center
        ctx.drawImage(imgElement, -imgElement.width / 2, -imgElement.height / 2);

        const url = canvas.toDataURL(file.type || 'image/png');
        setResult(url);
        toast.success('Successfully rotated image!');
        if (onDone) onDone();
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 1
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div {...getRootProps()} style={dropzoneStyle(isDragActive)}>
                <input {...getInputProps()} />
                <RotateCw size={36} color="var(--accent-primary)" style={{ marginBottom: 12 }} />
                <p style={{ margin: 0, fontWeight: 600 }}>{isDragActive ? 'Drop image here' : 'Drag & drop image to rotate/flip'}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Process files entirely in browser</span>
            </div>

            {file && imgElement && (
                <div style={cardStyle}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 10, marginBottom: 20 }}>
                        <button onClick={() => setRotation(r => (r + 90) % 360)} style={btnOptionStyle}>
                            🔄 Rotate 90°
                        </button>
                        <button onClick={() => setRotation(r => (r + 270) % 360)} style={btnOptionStyle}>
                            🔄 Rotate -90°
                        </button>
                        <button onClick={() => setFlipH(f => !f)} style={flipH ? btnOptionActiveStyle : btnOptionStyle}>
                            ↔️ Flip Horiz
                        </button>
                        <button onClick={() => setFlipV(f => !f)} style={flipV ? btnOptionActiveStyle : btnOptionStyle}>
                            ↕️ Flip Vert
                        </button>
                    </div>

                    <div style={{ textAlign: 'center', padding: 14, background: 'rgba(0,0,0,0.2)', borderRadius: 8, marginBottom: 20, minHeight: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img 
                            src={imgElement.src} 
                            alt="Rotated preview" 
                            style={{
                                maxWidth: '100%',
                                maxHeight: 300,
                                objectFit: 'contain',
                                transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
                                transition: 'transform 0.2s ease',
                                borderRadius: 6
                            }} 
                        />
                    </div>

                    <button onClick={processImage} className="btn-primary" style={{ width: '100%', marginBottom: 16 }}>
                        ⚡ Apply &amp; Generate Image
                    </button>

                    {result && (
                        <div>
                            <a href={result} download={file.name.replace(/\.[^/.]+$/, "") + "_rotated" + (file.name.slice(file.name.lastIndexOf('.')))} className="btn-primary" style={btnLinkStyle}>
                                <Download size={14} /> Download Image
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ── Shared UI Styles ──

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

const previewStyle: React.CSSProperties = {
    maxWidth: '100%',
    maxHeight: 220,
    borderRadius: 8,
    border: '1px solid var(--border-subtle)',
    display: 'block',
    margin: '0 auto 16px',
    objectFit: 'contain',
};

const btnLinkStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '10px 0',
    borderRadius: 8,
    fontWeight: 700,
    fontSize: '0.85rem',
    textDecoration: 'none',
    width: '100%',
};

const btnOptionStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderRadius: 8,
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-subtle)',
    color: 'var(--text-secondary)',
    fontSize: '0.78rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
};

const btnOptionActiveStyle: React.CSSProperties = {
    ...btnOptionStyle,
    background: 'rgba(186,158,255,0.15)',
    border: '1px solid rgba(186,158,255,0.3)',
    color: '#ba9eff',
};

// Helper style declarations for new tools
const dropzoneStyleNew = (active: boolean): React.CSSProperties => ({
    border: '2px dashed var(--border-subtle)',
    borderRadius: 16,
    padding: 32,
    textAlign: 'center',
    background: active ? 'rgba(132, 85, 239, 0.05)' : 'rgba(255,255,255,0.01)',
    cursor: 'pointer',
    transition: 'all 0.2s',
});

const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.82rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: 8
};

const grid2Style: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16
};

// 9. Passport Photo Maker
export function PassportPhotoMaker() {
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [size, setSize] = useState<'2x2' | '35x45'>('2x2');
    const [scale, setScale] = useState(100);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => setImage(img);
            img.src = reader.result as string;
        };
        reader.readAsDataURL(file);
    };

    const drawPhoto = () => {
        if (!image || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = size === '2x2' ? 600 : 413;
        const height = size === '2x2' ? 600 : 531;

        canvas.width = width;
        canvas.height = height;

        ctx.clearRect(0, 0, width, height);

        const s = scale / 100;
        const drawWidth = image.width * s;
        const drawHeight = image.height * s;
        const x = (width - drawWidth) / 2;
        const y = (height - drawHeight) / 2;

        ctx.drawImage(image, x, y, drawWidth, drawHeight);

        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.ellipse(width / 2, height * 0.45, width * 0.25, height * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
    };

    useEffect(() => {
        drawPhoto();
    }, [image, size, scale]);

    const handleDownload = () => {
        if (!canvasRef.current) return;
        const link = document.createElement('a');
        link.href = canvasRef.current.toDataURL('image/png');
        link.download = `passport_photo_${size}.png`;
        link.click();
        toast.success('Downloaded passport photo!');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={labelStyle}>Select Image File</label>
                        <input type="file" accept="image/*" onChange={handleFile} style={inputStyle} />
                    </div>
                    <div style={grid2Style}>
                        <div>
                            <label style={labelStyle}>Standard Ratio Size</label>
                            <select value={size} onChange={(e) => setSize(e.target.value as any)} style={{ ...inputStyle, background: 'var(--bg-secondary)' }}>
                                <option value="2x2">US Standard (2x2 Inches)</option>
                                <option value="35x45">EU Standard (35x45 mm)</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Zoom Scale: {scale}%</label>
                            <input type="range" min="20" max="200" value={scale} onChange={(e) => setScale(parseInt(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-primary)' }} />
                        </div>
                    </div>
                </div>
            </div>

            {image && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                    <div style={{ position: 'relative', border: '1px solid var(--border-subtle)', borderRadius: 12, overflow: 'hidden' }}>
                        <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '240px', height: 'auto', background: '#fff' }} />
                    </div>
                    <button onClick={handleDownload} className="btn-primary" style={{ width: '100%', maxWidth: 260 }}>
                        <Download size={14} style={{ marginRight: 6 }} /> Download Photo PNG
                    </button>
                </div>
            )}
        </div>
    );
}

// 10. Screenshot Beautifier
export function ScreenshotBeautifier() {
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [padding, setPadding] = useState(40);
    const [radius, setRadius] = useState(12);
    const [shadow, setShadow] = useState(15);
    const [gradient, setGradient] = useState('sunset');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => setImage(img);
            img.src = reader.result as string;
        };
        reader.readAsDataURL(file);
    };

    const drawBeautified = () => {
        if (!image || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = image.width + padding * 2;
        const h = image.height + padding * 2;

        canvas.width = w;
        canvas.height = h;

        const grad = ctx.createLinearGradient(0, 0, w, h);
        if (gradient === 'sunset') {
            grad.addColorStop(0, '#f97316');
            grad.addColorStop(1, '#ec4899');
        } else if (gradient === 'ocean') {
            grad.addColorStop(0, '#0ea5e9');
            grad.addColorStop(1, '#10b981');
        } else if (gradient === 'purple') {
            grad.addColorStop(0, '#8455ef');
            grad.addColorStop(1, '#ec4899');
        } else {
            grad.addColorStop(0, '#0f172a');
            grad.addColorStop(1, '#334155');
        }

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = shadow;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(padding, padding, image.width, image.height, radius);
        ctx.clip();
        ctx.drawImage(image, padding, padding);
        ctx.restore();
    };

    useEffect(() => {
        drawBeautified();
    }, [image, padding, radius, shadow, gradient]);

    const handleDownload = () => {
        if (!canvasRef.current) return;
        const link = document.createElement('a');
        link.href = canvasRef.current.toDataURL('image/png');
        link.download = 'screenshot_beautified.png';
        link.click();
        toast.success('Downloaded beautified screenshot!');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={labelStyle}>Upload Screenshot</label>
                        <input type="file" accept="image/*" onChange={handleFile} style={inputStyle} />
                    </div>
                    {image && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            <div>
                                <label style={labelStyle}>Frame Padding: {padding}px</label>
                                <input type="range" min="10" max="80" value={padding} onChange={(e) => setPadding(parseInt(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-primary)' }} />
                            </div>
                            <div>
                                <label style={labelStyle}>Rounded Corners: {radius}px</label>
                                <input type="range" min="0" max="30" value={radius} onChange={(e) => setRadius(parseInt(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-primary)' }} />
                            </div>
                        </div>
                    )}
                    {image && (
                        <div style={grid2Style}>
                            <div>
                                <label style={labelStyle}>Gradient Background Theme</label>
                                <select value={gradient} onChange={(e) => setGradient(e.target.value)} style={{ ...inputStyle, background: 'var(--bg-secondary)' }}>
                                    <option value="sunset">Sunset (Orange/Pink)</option>
                                    <option value="ocean">Ocean (Blue/Green)</option>
                                    <option value="purple">Dreamy Purple (Violet/Pink)</option>
                                    <option value="slate">Minimalist Slate (Dark Grey)</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Shadow Depth: {shadow}px</label>
                                <input type="range" min="0" max="40" value={shadow} onChange={(e) => setShadow(parseInt(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-primary)' }} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {image && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                    <canvas ref={canvasRef} style={{ border: '1px solid var(--border-subtle)', borderRadius: 12, maxWidth: '100%', height: 'auto', display: 'block', background: '#000' }} />
                    <button onClick={handleDownload} className="btn-primary" style={{ width: '100%', maxWidth: 260 }}>
                        <Download size={14} style={{ marginRight: 6 }} /> Download Beautified Image
                    </button>
                </div>
            )}
        </div>
    );
}

// 11. Favicon Generator
export function FaviconGenerator() {
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => setImage(img);
            img.src = reader.result as string;
        };
        reader.readAsDataURL(file);
    };

    const downloadIcon = (size: number) => {
        if (!image || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = size;
        canvas.height = size;
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(image, 0, 0, size, size);

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `favicon-${size}x${size}.png`;
        link.click();
        toast.success(`Downloaded ${size}x${size} icon!`);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <label style={labelStyle}>Upload Base Icon Image</label>
                <input type="file" accept="image/*" onChange={handleFile} style={inputStyle} />
            </div>

            {image && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, width: '100%' }}>
                        {[16, 32, 192, 512].map(size => (
                            <div key={size} style={{ ...cardStyle, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{size} × {size}</span>
                                <div style={{ width: size > 48 ? 48 : size, height: size > 48 ? 48 : size, overflow: 'hidden', border: '1px solid var(--border-subtle)', background: '#fff' }}>
                                    <img src={image.src} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="favicon" />
                                </div>
                                <button onClick={() => downloadIcon(size)} className="btn-secondary" style={{ width: '100%', fontSize: '0.75rem', padding: '6px 0' }}>
                                    Download
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// 12. Color Palette Extractor
export function ColorPaletteExtractor() {
    const [imageSrc, setImageSrc] = useState<string>('');
    const [colors, setColors] = useState<string[]>([]);
    const imageRef = useRef<HTMLImageElement>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result as string);
            setColors([]);
        };
        reader.readAsDataURL(file);
    };

    const extractColors = () => {
        const img = imageRef.current;
        if (!img) return;

        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, 100, 100);
        const data = ctx.getImageData(0, 0, 100, 100).data;

        const colorCounts: Record<string, number> = {};

        const rgbToHex = (r: number, g: number, b: number) => {
            const clamp = (val: number) => Math.max(0, Math.min(255, val));
            const round = (val: number) => Math.round(val / 15) * 15;
            const rh = clamp(round(r)).toString(16).padStart(2, '0');
            const gh = clamp(round(g)).toString(16).padStart(2, '0');
            const bh = clamp(round(b)).toString(16).padStart(2, '0');
            return `#${rh}${gh}${bh}`;
        };

        for (let i = 0; i < data.length; i += 40) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const hex = rgbToHex(r, g, b);
            colorCounts[hex] = (colorCounts[hex] || 0) + 1;
        }

        const sortedColors = Object.keys(colorCounts)
            .sort((a, b) => colorCounts[b] - colorCounts[a])
            .slice(0, 6);

        setColors(sortedColors);
        toast.success('Successfully extracted dominant color palette!');
    };

    const copyToClipboard = (hex: string) => {
        navigator.clipboard.writeText(hex);
        toast.success(`Copied: ${hex}`);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <label style={labelStyle}>Upload Image for Palette Extraction</label>
                <input type="file" accept="image/*" onChange={handleFile} style={inputStyle} />
            </div>

            {imageSrc && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                    <img 
                        ref={imageRef} 
                        src={imageSrc} 
                        onLoad={extractColors} 
                        style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: 12, border: '1px solid var(--border-subtle)' }} 
                        alt="source"
                    />

                    {colors.length > 0 && (
                        <div style={cardStyle}>
                            <h3 style={{ margin: '0 0 16px', fontSize: '0.9rem', color: 'var(--text-primary)', textAlign: 'center' }}>Dominant Colors</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                                {colors.map(color => (
                                    <div 
                                        key={color} 
                                        onClick={() => copyToClipboard(color)}
                                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', gap: 6 }}
                                    >
                                        <div style={{ width: '100%', height: 48, borderRadius: 8, background: color, border: '1px solid rgba(255,255,255,0.08)' }} />
                                        <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', fontWeight: 'bold' }}>{color.toUpperCase()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

