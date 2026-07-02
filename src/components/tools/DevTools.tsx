'use client';

import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Copy, Check, Clipboard, RefreshCw, Code, Eye, Binary, Globe, FileText, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ToolProps {
    onDone?: () => void;
}

// 1. JSON Formatter
export function JsonFormatter({ onDone }: ToolProps) {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [indent, setIndent] = useState('2');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleFormat = () => {
        if (!input.trim()) {
            setOutput('');
            setError(null);
            return;
        }
        try {
            const parsed = JSON.parse(input);
            const spaces = indent === 'tab' ? '\t' : parseInt(indent);
            setOutput(JSON.stringify(parsed, null, spaces));
            setError(null);
            toast.success('Formatted JSON successfully!');
            if (onDone) onDone();
        } catch (e: any) {
            setError(e.message || 'Invalid JSON syntax.');
        }
    };

    const handleMinify = () => {
        if (!input.trim()) return;
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
            setError(null);
            toast.success('Minified JSON successfully!');
            if (onDone) onDone();
        } catch (e: any) {
            setError(e.message || 'Invalid JSON syntax.');
        }
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        toast.success('JSON copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                <div>
                    <label style={labelStyle}>Raw JSON Input</label>
                    <textarea 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder='{"key": "value", "list": [1, 2, 3]}'
                        style={{ ...textareaStyle, height: 250 }}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Formatted Output</label>
                    <textarea 
                        value={output} 
                        readOnly 
                        placeholder="Formatted output will display here..." 
                        style={{ ...textareaStyle, height: 250, background: 'rgba(0,0,0,0.15)', cursor: 'default' }}
                    />
                </div>
            </div>

            {error && (
                <div style={{ padding: '10px 14px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 10, color: '#f87171', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <AlertCircle size={14} />
                    <strong>Parse Error:</strong> {error}
                </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Indentation:</span>
                    <select value={indent} onChange={(e) => setIndent(e.target.value)} style={selectStyle}>
                        <option value="2">2 Spaces</option>
                        <option value="4">4 Spaces</option>
                        <option value="tab">Tab Character</option>
                    </select>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={handleFormat} className="btn-primary"><Code size={14} /> Format</button>
                    <button onClick={handleMinify} style={secondaryBtnStyle}>Minify</button>
                    <button onClick={copyToClipboard} disabled={!output} style={!output ? disabledSecondaryBtnStyle : secondaryBtnStyle}>
                        {copied ? <Check size={14} color="#10b981" /> : <Clipboard size={14} />}
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
}

// 2. JSON Viewer ( collapsable tree browser )
export function JsonViewer({ onDone }: ToolProps) {
    const [input, setInput] = useState('');
    const [parsedJson, setParsedJson] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleParse = () => {
        if (!input.trim()) {
            setParsedJson(null);
            setError(null);
            return;
        }
        try {
            setParsedJson(JSON.parse(input));
            setError(null);
            if (onDone) onDone();
        } catch (e: any) {
            setError(e.message || 'Invalid JSON syntax.');
            setParsedJson(null);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {!parsedJson ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <textarea 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder='Paste your JSON code here to inspect...' 
                        style={{ ...textareaStyle, height: 200 }}
                    />
                    {error && (
                        <div style={{ padding: '10px 14px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 10, color: '#f87171', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <AlertCircle size={14} />
                            <strong>Parse Error:</strong> {error}
                        </div>
                    )}
                    <button onClick={handleParse} className="btn-primary" style={{ width: '100%' }}>
                        ⚡ Inspect JSON Tree
                    </button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Collapsible Tree View</span>
                        <button onClick={() => setParsedJson(null)} style={secondaryBtnStyle}>Load Different JSON</button>
                    </div>

                    <div style={{ background: '#0e1117', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: '20px 24px', maxHeight: 400, overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', color: '#abb2bf' }}>
                        <JsonTreeNode value={parsedJson} name="Root" isLast={true} />
                    </div>
                </div>
            )}
        </div>
    );
}

// Collapsible Tree Helper Component
function JsonTreeNode({ value, name, isLast }: { value: any; name: string; isLast: boolean }) {
    const [collapsed, setCollapsed] = useState(false);
    const type = typeof value;

    if (value === null) {
        return <div style={nodeStyle}><span style={keyStyle}>{name}</span>: <span style={{ color: '#56b6c2' }}>null</span>{!isLast && ','}</div>;
    }

    if (Array.isArray(value)) {
        return (
            <div style={nodeStyle}>
                <span onClick={() => setCollapsed(c => !c)} style={collapsibleHeaderStyle}>
                    <span style={{ color: '#d19a66', marginRight: 4 }}>{collapsed ? '▶' : '▼'}</span>
                    <span style={keyStyle}>{name}</span>: <span style={{ color: 'var(--text-muted)' }}>Array({value.length})</span>
                </span>
                {!collapsed && (
                    <div style={indentedStyle}>
                        {value.map((item, idx) => (
                            <JsonTreeNode key={idx} value={item} name={idx.toString()} isLast={idx === value.length - 1} />
                        ))}
                    </div>
                )}
                {!collapsed && <div style={{ opacity: 0.5 }}>{']'}{!isLast && ','}</div>}
            </div>
        );
    }

    if (type === 'object') {
        const keys = Object.keys(value);
        return (
            <div style={nodeStyle}>
                <span onClick={() => setCollapsed(c => !c)} style={collapsibleHeaderStyle}>
                    <span style={{ color: '#d19a66', marginRight: 4 }}>{collapsed ? '▶' : '▼'}</span>
                    <span style={keyStyle}>{name}</span>: <span style={{ color: 'var(--text-muted)' }}>Object</span>
                </span>
                {!collapsed && (
                    <div style={indentedStyle}>
                        {keys.map((key, idx) => (
                            <JsonTreeNode key={key} value={value[key]} name={key} isLast={idx === keys.length - 1} />
                        ))}
                    </div>
                )}
                {!collapsed && <div style={{ opacity: 0.5 }}>{'}'}{!isLast && ','}</div>}
            </div>
        );
    }

    let renderedValue = String(value);
    let valColor = '#d19a66'; // numbers / fallback
    if (type === 'string') {
        renderedValue = `"${value}"`;
        valColor = '#98c379'; // string green
    } else if (type === 'boolean') {
        valColor = '#56b6c2'; // boolean cyan
    }

    return (
        <div style={nodeStyle}>
            <span style={keyStyle}>{name}</span>: <span style={{ color: valColor }}>{renderedValue}</span>{!isLast && ','}
        </div>
    );
}

// 3. Base64 Encoder
export function Base64Encoder({ onDone }: ToolProps) {
    const [mode, setMode] = useState<'text' | 'file'>('text');
    const [text, setText] = useState('');
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);

    const onDrop = async (accepted: File[]) => {
        if (accepted.length === 0) return;
        const f = accepted[0];
        try {
            const url = await fileToDataURL(f);
            // Extract raw base64 string
            const base64 = url.split(',')[1] || url;
            setResult(base64);
            toast.success('File encoded to Base64 successfully!');
            if (onDone) onDone();
        } catch (e) {
            toast.error('Error encoding file.');
        }
    };

    const handleEncodeText = () => {
        try {
            const base64 = btoa(unescape(encodeURIComponent(text)));
            setResult(base64);
            toast.success('Text encoded to Base64!');
            if (onDone) onDone();
        } catch (e) {
            toast.error('Encoding error.');
        }
    };

    const copyToClipboard = () => {
        if (!result) return;
        navigator.clipboard.writeText(result);
        setCopied(true);
        toast.success('Base64 copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1
    });

    const fileToDataURL = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.onerror = () => reject(new Error('Read error'));
            reader.readAsDataURL(file);
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Toggle */}
            <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => { setMode('text'); setResult(''); }} style={mode === 'text' ? tabActiveStyle : tabStyle}>Encode Text</button>
                <button onClick={() => { setMode('file'); setResult(''); }} style={mode === 'file' ? tabActiveStyle : tabStyle}>Encode File</button>
            </div>

            {mode === 'text' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <textarea 
                        value={text} 
                        onChange={(e) => setText(e.target.value)} 
                        placeholder="Type text here to encode..." 
                        style={textareaStyle}
                    />
                    <button onClick={handleEncodeText} className="btn-primary">⚡ Encode text to Base64</button>
                </div>
            ) : (
                <div {...getRootProps()} style={dropzoneStyle(isDragActive)}>
                    <input {...getInputProps()} />
                    <Binary size={36} color="var(--accent-primary)" style={{ marginBottom: 12 }} />
                    <p style={{ margin: 0, fontWeight: 600 }}>{isDragActive ? 'Drop file here' : 'Drag & drop any file to encode'}</p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Reads files locally using HTML5 FileReader</span>
                </div>
            )}

            {result && (
                <div style={cardStyle}>
                    <label style={labelStyle}>Base64 Encoded Result</label>
                    <textarea 
                        value={result} 
                        readOnly 
                        style={{ ...textareaStyle, height: 120, background: 'rgba(0,0,0,0.15)', wordBreak: 'break-all' }}
                    />
                    <button onClick={copyToClipboard} className="btn-primary" style={{ width: '100%', marginTop: 10 }}>
                        {copied ? <Check size={14} color="#000" /> : <Copy size={14} />}
                        {copied ? 'Copied!' : 'Copy Base64 Output'}
                    </button>
                </div>
            )}
        </div>
    );
}

// 4. Base64 Decoder
export function Base64Decoder({ onDone }: ToolProps) {
    const [mode, setMode] = useState<'text' | 'file'>('text');
    const [base64, setBase64] = useState('');
    const [textResult, setTextResult] = useState('');
    const [fileName, setFileName] = useState('decoded_file.bin');

    const handleDecodeText = () => {
        try {
            const decoded = decodeURIComponent(escape(atob(base64)));
            setTextResult(decoded);
            toast.success('Base64 decoded to text!');
            if (onDone) onDone();
        } catch (e) {
            toast.error('Invalid Base64 string.');
        }
    };

    const handleDecodeFile = () => {
        try {
            const cleanBase64 = base64.replace(/^data:.*?;base64,/, '').trim();
            const binaryString = atob(cleanBase64);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            
            const blob = new Blob([bytes], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            link.click();
            
            toast.success('Downloaded decoded file!');
            if (onDone) onDone();
        } catch (e) {
            toast.error('Invalid Base64 string or failed to build file.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Toggle */}
            <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => { setMode('text'); setTextResult(''); }} style={mode === 'text' ? tabActiveStyle : tabStyle}>Decode to Text</button>
                <button onClick={() => { setMode('file'); }} style={mode === 'file' ? tabActiveStyle : tabStyle}>Decode to File</button>
            </div>

            <textarea 
                value={base64} 
                onChange={(e) => setBase64(e.target.value)} 
                placeholder="Paste Base64 code here to decode..." 
                style={textareaStyle}
            />

            {mode === 'text' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <button onClick={handleDecodeText} className="btn-primary">⚡ Decode Base64 to Text</button>
                    {textResult && (
                        <div style={cardStyle}>
                            <label style={labelStyle}>Decoded Text Output</label>
                            <textarea 
                                value={textResult} 
                                readOnly 
                                style={{ ...textareaStyle, height: 120, background: 'rgba(0,0,0,0.15)' }}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={{ ...labelStyle, marginBottom: 4 }}>Save File As (with extension)</label>
                        <input 
                            type="text" 
                            value={fileName} 
                            onChange={(e) => setFileName(e.target.value)} 
                            placeholder="e.g. document.pdf, image.png"
                            style={inputStyle}
                        />
                    </div>
                    <button onClick={handleDecodeFile} className="btn-primary">💾 Decode &amp; Download File</button>
                </div>
            )}
        </div>
    );
}

// 5. URL Encoder
export function UrlEncoder({ onDone }: ToolProps) {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const handleEncode = () => {
        setOutput(encodeURIComponent(input));
        if (onDone) onDone();
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        toast.success('Encoded URL copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <textarea 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Paste URL or parameter strings here to encode..." 
                style={textareaStyle}
            />

            <button onClick={handleEncode} className="btn-primary">⚡ Encode URL</button>

            {output && (
                <div style={cardStyle}>
                    <label style={labelStyle}>Encoded Output</label>
                    <textarea 
                        value={output} 
                        readOnly 
                        style={{ ...textareaStyle, height: 80, background: 'rgba(0,0,0,0.15)' }}
                    />
                    <button onClick={copyToClipboard} className="btn-primary" style={{ width: '100%', marginTop: 10 }}>
                        {copied ? <Check size={14} color="#000" /> : <Copy size={14} />}
                        Copy URL
                    </button>
                </div>
            )}
        </div>
    );
}

// 6. URL Decoder
export function UrlDecoder({ onDone }: ToolProps) {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const handleDecode = () => {
        try {
            setOutput(decodeURIComponent(input));
            if (onDone) onDone();
        } catch (e) {
            toast.error('Invalid URL encoded format.');
        }
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        toast.success('Decoded URL copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <textarea 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Paste URL string here to decode..." 
                style={textareaStyle}
            />

            <button onClick={handleDecode} className="btn-primary">⚡ Decode URL</button>

            {output && (
                <div style={cardStyle}>
                    <label style={labelStyle}>Decoded Output</label>
                    <textarea 
                        value={output} 
                        readOnly 
                        style={{ ...textareaStyle, height: 80, background: 'rgba(0,0,0,0.15)' }}
                    />
                    <button onClick={copyToClipboard} className="btn-primary" style={{ width: '100%', marginTop: 10 }}>
                        {copied ? <Check size={14} color="#000" /> : <Copy size={14} />}
                        Copy URL
                    </button>
                </div>
            )}
        </div>
    );
}

// ── UI Styles ──

const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: 8,
};

const selectStyle: React.CSSProperties = {
    padding: '6px 12px',
    borderRadius: 8,
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-subtle)',
    color: 'var(--text-primary)',
    fontSize: '0.8rem',
    cursor: 'pointer',
    outline: 'none',
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

const textareaStyle: React.CSSProperties = {
    width: '100%',
    height: 150,
    padding: 14,
    borderRadius: 12,
    background: 'rgba(255,255,255,0.01)',
    border: '1px solid var(--border-subtle)',
    color: 'var(--text-primary)',
    fontSize: '0.85rem',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    lineHeight: 1.5,
};

const cardStyle: React.CSSProperties = {
    background: 'rgba(23, 26, 30, 0.45)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 16,
    padding: 20,
};

const secondaryBtnStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: 8,
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-subtle)',
    color: 'var(--text-secondary)',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    transition: 'all 0.2s',
};

const disabledSecondaryBtnStyle: React.CSSProperties = {
    ...secondaryBtnStyle,
    opacity: 0.35,
    cursor: 'not-allowed',
};

const tabStyle: React.CSSProperties = {
    flex: 1,
    padding: '8px 0',
    borderRadius: 8,
    background: 'var(--bg-glass)',
    border: '1px solid var(--border-subtle)',
    color: 'var(--text-secondary)',
    fontSize: '0.825rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
};

const tabActiveStyle: React.CSSProperties = {
    ...tabStyle,
    background: 'rgba(186,158,255,0.15)',
    border: '1px solid rgba(186,158,255,0.3)',
    color: '#ba9eff',
};

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

// JSON Tree styles
const nodeStyle: React.CSSProperties = {
    margin: '4px 0',
    paddingLeft: 10,
    borderLeft: '1px solid rgba(255,255,255,0.03)',
};

const keyStyle: React.CSSProperties = {
    color: '#e06c75',
    fontWeight: 600,
};

const collapsibleHeaderStyle: React.CSSProperties = {
    cursor: 'pointer',
    userSelect: 'none',
    display: 'inline-flex',
    alignItems: 'center',
};

const indentedStyle: React.CSSProperties = {
    paddingLeft: 14,
    borderLeft: '1px dashed rgba(255,255,255,0.08)',
};

const grid2Style: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
};

// 7. UUID Generator
export function UuidGenerator() {
    const [version, setVersion] = useState<'v4' | 'v1'>('v4');
    const [qty, setQty] = useState(5);
    const [uuids, setUuids] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);

    const generateUUIDs = () => {
        const list: string[] = [];
        for (let i = 0; i < qty; i++) {
            if (version === 'v4') {
                if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
                    list.push(window.crypto.randomUUID());
                } else {
                    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                        const r = (Math.random() * 16) | 0;
                        const v = c === 'x' ? r : (r & 0x3) | 0x8;
                        return v.toString(16);
                    });
                    list.push(uuid);
                }
            } else {
                // Mock v1 UUID (timestamp-based)
                const now = Date.now();
                const uuid = `11ed${now.toString(16)}-xxxx-1xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
                    const r = (Math.random() * 16) | 0;
                    const v = c === 'x' ? r : (r & 0x3) | 0x8;
                    return v.toString(16);
                });
                list.push(uuid);
            }
        }
        setUuids(list);
        toast.success(`Generated ${qty} UUIDs!`);
    };

    useEffect(() => {
        generateUUIDs();
    }, [version]);

    const handleCopy = () => {
        if (uuids.length === 0) return;
        navigator.clipboard.writeText(uuids.join('\n'));
        setCopied(true);
        toast.success('UUIDs copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, alignItems: 'end' }}>
                    <div>
                        <label style={labelStyle}>UUID Version</label>
                        <select value={version} onChange={(e) => setVersion(e.target.value as any)} style={selectStyle}>
                            <option value="v4">UUID v4 (Random)</option>
                            <option value="v1">UUID v1 (Timestamp)</option>
                        </select>
                    </div>
                    <div>
                        <label style={labelStyle}>Quantity</label>
                        <input type="number" min="1" max="100" value={qty} onChange={(e) => setQty(parseInt(e.target.value) || 1)} style={inputStyle} />
                    </div>
                    <button onClick={generateUUIDs} className="btn-primary" style={{ height: 42 }}>
                        Generate
                    </button>
                </div>
            </div>

            {uuids.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <textarea 
                        readOnly 
                        value={uuids.join('\n')} 
                        style={{ ...textareaStyle, height: 200, fontFamily: 'monospace' }} 
                    />
                    <button onClick={handleCopy} className="btn-secondary" style={{ width: '100%' }}>
                        {copied ? <Check size={14} color="#10b981" /> : <Clipboard size={14} />} Copy UUIDs
                    </button>
                </div>
            )}
        </div>
    );
}

// 8. JWT Decoder
export function JwtDecoder() {
    const [jwt, setJwt] = useState('');
    const [header, setHeader] = useState('');
    const [payload, setPayload] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!jwt.trim()) {
            setHeader('');
            setPayload('');
            setError(null);
            return;
        }

        const parts = jwt.split('.');
        if (parts.length !== 3) {
            setError('Invalid JWT structure. It must consist of header, payload, and signature separated by dots.');
            setHeader('');
            setPayload('');
            return;
        }

        try {
            const decodePart = (part: string) => {
                const normalized = part.replace(/-/g, '+').replace(/_/g, '/');
                return JSON.stringify(JSON.parse(atob(normalized)), null, 2);
            };

            setHeader(decodePart(parts[0]));
            setPayload(decodePart(parts[1]));
            setError(null);
        } catch (e: any) {
            setError('Failed to base64 decode JWT. Please check if your token is valid.');
            setHeader('');
            setPayload('');
        }
    }, [jwt]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <label style={labelStyle}>Paste JSON Web Token (JWT)</label>
                <textarea 
                    value={jwt} 
                    onChange={(e) => setJwt(e.target.value)} 
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    style={{ ...textareaStyle, height: 100 }}
                />
            </div>

            {error && (
                <div style={{ padding: '10px 14px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 10, color: '#f87171', fontSize: '0.8rem' }}>
                    <strong>Decoding Error:</strong> {error}
                </div>
            )}

            {!error && payload && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                    <div>
                        <label style={labelStyle}>Header (Algorithm & Token Type)</label>
                        <textarea readOnly value={header} style={{ ...textareaStyle, height: 180, fontFamily: 'monospace', background: 'rgba(0,0,0,0.1)' }} />
                    </div>
                    <div>
                        <label style={labelStyle}>Payload (Claims / Data)</label>
                        <textarea readOnly value={payload} style={{ ...textareaStyle, height: 180, fontFamily: 'monospace', background: 'rgba(0,0,0,0.1)' }} />
                    </div>
                </div>
            )}
        </div>
    );
}

// 9. JSON Validator & Linter
export function JsonValidator() {
    const [input, setInput] = useState('');
    const [status, setStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const validate = () => {
        if (!input.trim()) {
            setStatus('idle');
            setErrorMsg('');
            return;
        }
        try {
            JSON.parse(input);
            setStatus('valid');
            setErrorMsg('');
        } catch (e: any) {
            setStatus('invalid');
            setErrorMsg(e.message || 'Invalid JSON syntax.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <label style={labelStyle}>Enter JSON to Validate</label>
                <textarea 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder='{"key": "value"}'
                    style={{ ...textareaStyle, height: 220 }}
                />
            </div>
            <button onClick={validate} className="btn-primary">Validate JSON</button>

            {status === 'valid' && (
                <div style={{ padding: '14px 20px', borderRadius: 12, background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10b981', fontWeight: 600, textAlign: 'center' }}>
                    ✓ Valid JSON Structure.
                </div>
            )}

            {status === 'invalid' && (
                <div style={{ padding: '14px 20px', borderRadius: 12, background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171', fontSize: '0.85rem' }}>
                    <strong>Invalid JSON syntax:</strong> {errorMsg}
                </div>
            )}
        </div>
    );
}

// 10. Regex Match Tester
export function RegexTester() {
    const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
    const [flags, setFlags] = useState('g');
    const [text, setText] = useState('Contact us at support@visualizemydata.in or sales@example.com for queries.');
    const [matches, setMatches] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const testRegex = () => {
        if (!pattern) {
            setMatches([]);
            setError(null);
            return;
        }
        try {
            const regex = new RegExp(pattern, flags);
            const found = text.match(regex);
            setMatches(found ? Array.from(found) : []);
            setError(null);
        } catch (e: any) {
            setError(e.message || 'Invalid regular expression.');
            setMatches([]);
        }
    };

    useEffect(() => {
        testRegex();
    }, [pattern, flags, text]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={grid2Style}>
                        <div>
                            <label style={labelStyle}>Regex Pattern (Without slashes)</label>
                            <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Flags</label>
                            <input type="text" value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="g, i, m" style={inputStyle} />
                        </div>
                    </div>
                    <div>
                        <label style={labelStyle}>Test Text</label>
                        <textarea rows={4} value={text} onChange={(e) => setText(e.target.value)} style={inputStyle} />
                    </div>
                </div>
            </div>

            {error && (
                <div style={{ padding: '10px 14px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 10, color: '#f87171', fontSize: '0.8rem' }}>
                    <strong>Regex Error:</strong> {error}
                </div>
            )}

            {!error && (
                <div style={cardStyle}>
                    <h3 style={{ margin: '0 0 12px', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Matches found: {matches.length}</h3>
                    {matches.length === 0 ? (
                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.82rem' }}>No matches found in text.</p>
                    ) : (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {matches.map((m, idx) => (
                                <span key={idx} style={{ padding: '4px 10px', borderRadius: 8, background: 'rgba(132, 85, 239, 0.1)', border: '1px solid rgba(132, 85, 239, 0.2)', fontSize: '0.8rem', color: '#ba9eff', fontFamily: 'monospace' }}>
                                    {m}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// 11. Epoch Timestamp Converter
export function TimestampConverter() {
    const [epoch, setEpoch] = useState(Math.floor(Date.now() / 1000).toString());
    const [localTime, setLocalTime] = useState('');
    const [utcTime, setUtcTime] = useState('');
    const [isoTime, setIsoTime] = useState('');

    const convert = () => {
        let val = parseInt(epoch) || 0;
        // Detect milliseconds
        if (epoch.length > 11) {
            val = Math.floor(val / 1000);
        }
        try {
            const date = new Date(val * 1000);
            setLocalTime(date.toString());
            setUtcTime(date.toUTCString());
            setIsoTime(date.toISOString());
        } catch (e) {}
    };

    useEffect(() => {
        convert();
    }, [epoch]);

    const setNow = () => {
        setEpoch(Math.floor(Date.now() / 1000).toString());
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={labelStyle}>Unix Epoch Timestamp (Seconds)</label>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <input type="text" value={epoch} onChange={(e) => setEpoch(e.target.value)} style={inputStyle} />
                            <button onClick={setNow} className="btn-secondary" style={{ whiteSpace: 'nowrap' }}>Current Time</button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={cardStyle}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1rem', color: 'var(--text-primary)' }}>Converted Timestamps</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                        <span style={labelStyle}>ISO 8601 Format</span>
                        <input type="text" readOnly value={isoTime} style={{ ...inputStyle, background: 'rgba(0,0,0,0.1)' }} />
                    </div>
                    <div>
                        <span style={labelStyle}>Greenwich Mean Time (GMT / UTC)</span>
                        <input type="text" readOnly value={utcTime} style={{ ...inputStyle, background: 'rgba(0,0,0,0.1)' }} />
                    </div>
                    <div>
                        <span style={labelStyle}>Your Local Time Zone</span>
                        <input type="text" readOnly value={localTime} style={{ ...inputStyle, background: 'rgba(0,0,0,0.1)' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

