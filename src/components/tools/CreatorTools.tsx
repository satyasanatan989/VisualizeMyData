'use client';

import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';

/**
 * Fancy Text Generator
 */
export function FancyTextGenerator() {
    const [text, setText] = useState<string>('VisualiseMyData is awesome');

    const stylesMap = useMemo(() => {
        const t = text || '';
        
        // Character mappings for unicode styling
        const convertText = (str: string, normal: string, styled: string) => {
            return str.split('').map(char => {
                const idx = normal.indexOf(char);
                return idx !== -1 ? styled.substring(idx * 2, idx * 2 + 2) || styled[idx] : char;
            }).join('');
        };

        const normalChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        // Double struck
        const doubleStruck = "?? ?????????? ??? ? ??????????????"; // Unicode maps
        // Bold sans
        const boldSans = "??????????????????????????";
        // Cursive / script
        const script = "??????????????????????????";

        const simpleStyles = [
            {
                name: '𝒮𝓉𝓎𝓁𝒾𝓈𝒽 𝒞𝓊𝓇𝓈𝒾𝓋𝑒',
                value: t.split('').map(c => {
                    const code = c.charCodeAt(0);
                    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d49c + (code - 65));
                    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d4b6 + (code - 97));
                    return c;
                }).join(''),
            },
            {
                name: '𝔊𝔬𝔱𝔥𝔦𝔠 𝔖𝔱𝔶𝔩𝔢',
                value: t.split('').map(c => {
                    const code = c.charCodeAt(0);
                    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d504 + (code - 65));
                    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d51e + (code - 97));
                    return c;
                }).join(''),
            },
            {
                name: '𝔻𝕠𝕦𝕓𝕝𝕖 𝕊𝕥𝕣𝕦𝕔𝕜',
                value: t.split('').map(c => {
                    const code = c.charCodeAt(0);
                    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d538 + (code - 65));
                    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d54f + (code - 97));
                    return c;
                }).join(''),
            },
            {
                name: 'Ｂｏｌｄ  Ｓａｎｓ',
                value: t.split('').map(c => {
                    const code = c.charCodeAt(0);
                    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d5d4 + (code - 65));
                    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d5ee + (code - 97));
                    return c;
                }).join(''),
            },
            {
                name: '🆂🆀🆄🅰🆁🅴 🅱🅾🆇🅴🆂',
                value: t.toUpperCase().split('').map(c => {
                    const code = c.charCodeAt(0);
                    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1f170 + (code - 65));
                    return c;
                }).join(''),
            },
            {
                name: 'Ⓑⓤⓑⓑⓛⓔ Ⓣⓔⓧⓣ',
                value: t.split('').map(c => {
                    const code = c.charCodeAt(0);
                    if (code >= 65 && code <= 90) return String.fromCodePoint(0x24b6 + (code - 65));
                    if (code >= 97 && code <= 122) return String.fromCodePoint(0x24d0 + (code - 97));
                    if (code >= 49 && code <= 57) return String.fromCodePoint(0x24f5 + (code - 49));
                    return c;
                }).join(''),
            }
        ];

        return simpleStyles;
    }, [text]);

    const handleCopy = (val: string) => {
        navigator.clipboard.writeText(val);
        toast.success("Copied to clipboard!");
    };

    return (
        <div style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 16, color: 'var(--text-primary)' }}>Fancy Text Generator</h3>
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Type your text here..." style={{ width: '100%', minHeight: 100, padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', marginBottom: 24, fontSize: '1rem', resize: 'vertical' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {stylesMap.map(style => (
                    <div key={style.name} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16, border: '1px solid var(--border-subtle)', borderRadius: 10, background: 'var(--bg-secondary)' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{style.name}</span>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.1rem', color: 'var(--text-primary)', wordBreak: 'break-all' }}>{style.value || '...'}</span>
                            <button onClick={() => handleCopy(style.value)} style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: 6, border: '1px solid var(--border-subtle)', background: 'var(--accent)', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Copy</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/**
 * Viral Hashtag Generator
 */
export function HashtagGenerator() {
    const [keyword, setKeyword] = useState<string>('data science');
    const [hashtags, setHashtags] = useState<string[]>([]);

    const handleGenerate = () => {
        if (!keyword.trim()) {
            toast.error("Please enter a keyword.");
            return;
        }

        const cleanKey = keyword.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').trim();
        const baseWord = cleanKey.replace(/\s+/g, '');
        
        // Deterministic viral hashtag sets based on the key
        const generated = [
            `#${baseWord}`,
            `#${baseWord}tips`,
            `#${baseWord}guide`,
            `#${baseWord}trends`,
            `#${baseWord}life`,
            `#${baseWord}community`,
            `#${baseWord}hacks`,
            `#trending${baseWord}`,
            `#best${baseWord}`,
            `#howtostart${baseWord}`,
            `#viral`,
            `#foryou`,
            `#education`,
            `#marketing`,
            `#hustle`,
            `#strategy`
        ];

        setHashtags(generated.slice(0, 12));
        toast.success("Hashtags generated successfully!");
    };

    const handleCopyAll = () => {
        if (hashtags.length === 0) return;
        navigator.clipboard.writeText(hashtags.join(' '));
        toast.success("All hashtags copied to clipboard!");
    };

    return (
        <div style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 16, color: 'var(--text-primary)' }}>Viral Hashtag Generator</h3>
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Enter a keyword or niche (e.g. fitness, tech)" style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                <button onClick={handleGenerate} style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--accent)', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Generate</button>
            </div>

            {hashtags.length > 0 && (
                <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                        {hashtags.map(tag => (
                            <span key={tag} onClick={() => {
                                navigator.clipboard.writeText(tag);
                                toast.success(`Copied ${tag}`);
                            }} style={{ padding: '6px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 20, color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s' }}>{tag}</span>
                        ))}
                    </div>
                    <button onClick={handleCopyAll} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'rgba(16,185,129,0.1)', color: '#10b981', cursor: 'pointer', fontWeight: 600 }}>Copy All Hashtags</button>
                </div>
            )}
        </div>
    );
}

/**
 * YouTube Title Generator
 */
export function YoutubeTitleGenerator() {
    const [topic, setTopic] = useState<string>('Excel Charts');
    const [titles, setTitles] = useState<string[]>([]);

    const handleGenerate = () => {
        if (!topic.trim()) {
            toast.error("Please enter a video topic.");
            return;
        }

        const t = topic.trim();
        // Dynamic title formula pattern injectors
        const suggestions = [
            `How to master ${t} (Step-by-Step Tutorial)`,
            `Stop doing ${t} this way! (Try this instead)`,
            `I tried ${t} for 30 Days. Here is what happened!`,
            `The Ultimate Guide to ${t} for Beginners`,
            `5 ${t} Hacks you wish you knew sooner`,
            `Why 99% of people fail at ${t} (And how to fix it)`,
            `Mastering ${t} in under 10 minutes!`,
            `${t} explained to a 5-year-old`,
            `Before you start ${t}, watch this video!`,
            `The secret formula to ${t} success`
        ];

        setTitles(suggestions);
        toast.success("Video title templates generated!");
    };

    return (
        <div style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 16, color: 'var(--text-primary)' }}>YouTube Title &amp; Idea Generator</h3>
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="Enter video topic (e.g. React hooks, finance)" style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                <button onClick={handleGenerate} style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--accent)', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Generate Titles</button>
            </div>

            {titles.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {titles.map(title => (
                        <div key={title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 8 }}>
                            <span style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}>{title}</span>
                            <button onClick={() => {
                                navigator.clipboard.writeText(title);
                                toast.success("Title copied!");
                            }} style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: 6, border: '1px solid var(--border-subtle)', background: 'var(--accent)', color: '#fff', cursor: 'pointer', fontWeight: 600, marginLeft: 12 }}>Copy</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
