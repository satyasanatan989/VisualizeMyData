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
