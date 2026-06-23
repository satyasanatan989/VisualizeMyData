'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw, Clipboard, Trash2, ListFilter, Key, Hash, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface ToolProps {
    onDone?: () => void;
}

// 1. Word Counter
export function WordCounter({ onDone }: ToolProps) {
    const [text, setText] = useState('');
    const [stats, setStats] = useState({
        words: 0,
        charsWithSpaces: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 0,
        readingTime: 0,
        speakingTime: 0
    });

    useEffect(() => {
        const cleaned = text.trim();
        const words = cleaned === '' ? 0 : cleaned.split(/\s+/).length;
        const charsWithSpaces = text.length;
        const charsNoSpaces = text.replace(/\s/g, '').length;
        const sentences = cleaned === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
        const paragraphs = cleaned === '' ? 0 : text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
        const lines = text === '' ? 0 : text.split('\n').length;
        
        // standard metrics: reading speed = 200 wpm, speaking speed = 130 wpm
        const readingTime = Math.ceil(words / 200);
        const speakingTime = Math.ceil(words / 130);

        setStats({
            words,
            charsWithSpaces,
            charsNoSpaces,
            sentences,
            paragraphs,
            lines,
            readingTime,
            speakingTime
        });
        if (onDone && text.length > 10) onDone();
    }, [text]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <textarea 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Type or paste your text here..." 
                style={textareaStyle}
            />
            
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button onClick={() => setText('')} style={secondaryBtnStyle}><Trash2 size={13} /> Clear Text</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 14 }}>
                <StatCard label="Words" value={stats.words} />
                <StatCard label="Chars (with spaces)" value={stats.charsWithSpaces} />
                <StatCard label="Chars (no spaces)" value={stats.charsNoSpaces} />
                <StatCard label="Sentences" value={stats.sentences} />
                <StatCard label="Paragraphs" value={stats.paragraphs} />
                <StatCard label="Lines" value={stats.lines} />
                <StatCard label="Reading Time" value={`${stats.readingTime} min`} color="#ba9eff" />
                <StatCard label="Speaking Time" value={`${stats.speakingTime} min`} color="#40ceed" />
            </div>
        </div>
    );
}

// 2. Character Counter
export function CharacterCounter({ onDone }: ToolProps) {
    const [text, setText] = useState('');
    const [density, setDensity] = useState<{ char: string; count: number; percent: number }[]>([]);

    useEffect(() => {
        if (!text) {
            setDensity([]);
            return;
        }

        const counts: Record<string, number> = {};
        let total = 0;
        
        // Count alphanumeric characters case-insensitively
        for (let i = 0; i < text.length; i++) {
            const char = text[i].toLowerCase();
            if (/[a-z0-9]/i.test(char)) {
                counts[char] = (counts[char] || 0) + 1;
                total++;
            }
        }

        const sortedDensity = Object.entries(counts)
            .map(([char, count]) => ({
                char: char.toUpperCase(),
                count,
                percent: total > 0 ? Math.round((count / total) * 100) : 0
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 8); // top 8 characters

        setDensity(sortedDensity);
        if (onDone && text.length > 10) onDone();
    }, [text]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <textarea 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Paste text to analyze character count & density..." 
                style={textareaStyle}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14 }}>
                <StatCard label="Total Characters" value={text.length} />
                <StatCard label="Alphanumeric Only" value={text.replace(/[^a-z0-9]/gi, '').length} />
                <StatCard label="Letters Count" value={text.replace(/[^a-z]/gi, '').length} />
                <StatCard label="Numbers Count" value={text.replace(/[^0-9]/g, '').length} />
            </div>

            {density.length > 0 && (
                <div style={cardStyle}>
                    <h4 style={{ margin: '0 0 14px', fontSize: '0.9rem', color: 'var(--text-primary)' }}>🔤 Top Character Density</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {density.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ width: 20, fontWeight: 700, fontSize: '0.85rem' }}>{item.char}</span>
                                <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                                    <div style={{ width: `${item.percent}%`, height: '100%', background: 'linear-gradient(90deg, #ba9eff, #8455ef)', borderRadius: 4 }} />
                                </div>
                                <span style={{ fontSize: '0.75rem', width: 65, textAlign: 'right', color: 'var(--text-muted)' }}>{item.count} ({item.percent}%)</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// 3. Remove Duplicate Lines
export function RemoveDuplicateLines({ onDone }: ToolProps) {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);
    
    // Checkbox rules
    const [sortAlpha, setSortAlpha] = useState(false);
    const [trimSpaces, setTrimSpaces] = useState(true);
    const [ignoreEmpty, setIgnoreEmpty] = useState(true);

    const cleanLines = () => {
        if (!input) {
            setOutput('');
            return;
        }

        let lines = input.split('\n');
        
        if (trimSpaces) {
            lines = lines.map(line => line.trim());
        }
        if (ignoreEmpty) {
            lines = lines.filter(line => line.length > 0);
        }

        // De-duplicate keeping order
        const uniqueLines = Array.from(new Set(lines));

        if (sortAlpha) {
            uniqueLines.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
        }

        setOutput(uniqueLines.join('\n'));
        toast.success(`Removed ${lines.length - uniqueLines.length} duplicate lines!`);
        if (onDone) onDone();
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        toast.success('Cleaned lines copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Raw Input List</label>
                    <textarea 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="Paste list here (one item per line)..." 
                        style={{ ...textareaStyle, height: 200 }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Cleaned List Output</label>
                    <textarea 
                        value={output} 
                        readOnly 
                        placeholder="Cleaned list will display here..." 
                        style={{ ...textareaStyle, height: 200, background: 'rgba(0,0,0,0.15)', cursor: 'default' }}
                    />
                </div>
            </div>

            {/* Checkbox settings */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 24px', background: 'rgba(255,255,255,0.02)', padding: 14, borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
                <label style={checkboxLabelStyle}>
                    <input type="checkbox" checked={trimSpaces} onChange={(e) => setTrimSpaces(e.target.checked)} style={checkboxStyle} />
                    Trim Whitespace
                </label>
                <label style={checkboxLabelStyle}>
                    <input type="checkbox" checked={ignoreEmpty} onChange={(e) => setIgnoreEmpty(e.target.checked)} style={checkboxStyle} />
                    Ignore Blank Lines
                </label>
                <label style={checkboxLabelStyle}>
                    <input type="checkbox" checked={sortAlpha} onChange={(e) => setSortAlpha(e.target.checked)} style={checkboxStyle} />
                    Sort Alphabetically
                </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <button onClick={cleanLines} className="btn-primary">
                    <ListFilter size={14} /> Remove Duplicates
                </button>
                <button onClick={copyToClipboard} disabled={!output} style={!output ? disabledSecondaryBtnStyle : secondaryBtnStyle}>
                    {copied ? <Check size={14} color="#10b981" /> : <Clipboard size={14} />}
                    {copied ? 'Copied!' : 'Copy Result'}
                </button>
            </div>
        </div>
    );
}

// 4. Password Generator
export function PasswordGenerator({ onDone }: ToolProps) {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [includeUpper, setIncludeUpper] = useState(true);
    const [includeLower, setIncludeLower] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [copied, setCopied] = useState(false);

    const generate = () => {
        let chars = '';
        if (includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLower) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) chars += '0123456789';
        if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (chars === '') {
            toast.error('Select at least one character set!');
            return;
        }

        let result = '';
        // Crytographically secure random numbers
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);
        
        for (let i = 0; i < length; i++) {
            result += chars[array[i] % chars.length];
        }

        setPassword(result);
        if (onDone) onDone();
    };

    useEffect(() => {
        generate();
    }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

    const copyToClipboard = () => {
        if (!password) return;
        navigator.clipboard.writeText(password);
        setCopied(true);
        toast.success('Secure password copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    // Entropy strength calculation
    const getStrength = () => {
        if (password.length === 0) return { label: 'Empty', color: '#ef4444', pct: 0 };
        let poolSize = 0;
        if (includeLower) poolSize += 26;
        if (includeUpper) poolSize += 26;
        if (includeNumbers) poolSize += 10;
        if (includeSymbols) poolSize += 26;

        const entropy = password.length * Math.log2(poolSize || 2);
        
        if (entropy < 40) return { label: 'Weak', color: '#ef4444', pct: 25 };
        if (entropy < 60) return { label: 'Medium', color: '#f59e0b', pct: 50 };
        if (entropy < 80) return { label: 'Strong', color: '#10b981', pct: 75 };
        return { label: 'Excellent', color: '#8455ef', pct: 100 };
    };

    const strength = getStrength();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Password Display Box */}
            <div style={{
                background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)',
                borderRadius: 14, padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14,
            }}>
                <code style={{
                    color: '#ba9eff', fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', fontWeight: 800,
                    fontFamily: 'monospace', wordBreak: 'break-all', userSelect: 'all'
                }}>
                    {password}
                </code>
                <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={generate} style={miniBtnStyle} title="Generate New"><RefreshCw size={13} /></button>
                    <button onClick={copyToClipboard} style={miniBtnStyle} title="Copy">{copied ? <Check size={13} color="#10b981" /> : <Clipboard size={13} />}</button>
                </div>
            </div>

            {/* Strength meter */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 6, fontWeight: 600 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Entropy Strength</span>
                    <span style={{ color: strength.color }}>{strength.label}</span>
                </div>
                <div style={{ height: 6, width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${strength.pct}%`, height: '100%', background: strength.color, transition: 'all 0.3s' }} />
                </div>
            </div>

            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {/* Length slider */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Length: {length} characters</span>
                        </div>
                        <input 
                            type="range" 
                            min="6" 
                            max="64" 
                            value={length} 
                            onChange={(e) => setLength(parseInt(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
                        />
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '4px 0' }} />

                    {/* Checkboxes */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
                        <label style={checkboxLabelStyle}>
                            <input type="checkbox" checked={includeUpper} onChange={(e) => setIncludeUpper(e.target.checked)} style={checkboxStyle} />
                            Uppercase (A-Z)
                        </label>
                        <label style={checkboxLabelStyle}>
                            <input type="checkbox" checked={includeLower} onChange={(e) => setIncludeLower(e.target.checked)} style={checkboxStyle} />
                            Lowercase (a-z)
                        </label>
                        <label style={checkboxLabelStyle}>
                            <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} style={checkboxStyle} />
                            Numbers (0-9)
                        </label>
                        <label style={checkboxLabelStyle}>
                            <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} style={checkboxStyle} />
                            Symbols (&amp;%!...)
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── UI Components ──

function StatCard({ label, value, color }: { label: string; value: string | number; color?: string }) {
    return (
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', padding: 14, borderRadius: 12, textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
            <h3 style={{ margin: '4px 0 0', fontWeight: 800, fontSize: '1.25rem', color: color || 'var(--text-primary)' }}>{value}</h3>
        </div>
    );
}

// ── Styles ──

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

const checkboxLabelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
};

const checkboxStyle: React.CSSProperties = {
    accentColor: 'var(--accent-primary)',
};

const miniBtnStyle: React.CSSProperties = {
    width: 32,
    height: 32,
    borderRadius: 6,
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-subtle)',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
};
