'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileType2, Search, Link2, FileText, Sheet, X } from 'lucide-react';
import { parseExcelFile, parseGoogleSheet, ParsedData } from '@/lib/excelParser';
import { parsePdfFile, PdfParseResult } from '@/lib/pdfParser';

interface FileUploadZoneProps {
    onDataParsed: (data: ParsedData, isPdf?: boolean, pdfResult?: PdfParseResult) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

type Tab = 'upload' | 'sheets';

const FORMATS = [
    { label: 'Excel', icon: <FileType2 size={14} />, color: '#10b981' },
    { label: 'CSV', icon: <FileText size={14} />, color: '#3b82f6' },
    { label: 'PDF', icon: <FileText size={14} />, color: '#f43f5e' },
    { label: 'Sheets', icon: <Sheet size={14} />, color: '#8b5cf6' },
];

const TRUST = ['🔒 Secure', '⚡ Instant', '🗑️ Auto-Deleted', '📵 No Signup'];

export default function FileUploadZone({ onDataParsed, isLoading, setIsLoading }: FileUploadZoneProps) {
    const [error, setError] = useState<string | null>(null);
    const [tab, setTab] = useState<Tab>('upload');
    const [sheetsUrl, setSheetsUrl] = useState('');

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;
        const file = acceptedFiles[0];
        setIsLoading(true);
        setError(null);
        try {
            if (file.name.toLowerCase().endsWith('.pdf')) {
                const pdfResult = await parsePdfFile(file);
                onDataParsed(pdfResult, true, pdfResult);
            } else {
                const parsed = await parseExcelFile(file);
                onDataParsed(parsed, false);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to parse file.');
        } finally {
            setIsLoading(false);
        }
    }, [onDataParsed, setIsLoading]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-excel': ['.xls'],
            'text/csv': ['.csv'],
            'application/pdf': ['.pdf'],
        },
        maxFiles: 1,
    });

    const handleSheetLoad = async () => {
        if (!sheetsUrl.trim()) return;
        setIsLoading(true);
        setError(null);
        try {
            const parsed = await parseGoogleSheet(sheetsUrl.trim());
            onDataParsed(parsed, false);
        } catch (err: any) {
            setError(err.message || 'Failed to load Google Sheet.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div id="upload-zone" style={{ width: '100%', maxWidth: 680, margin: '0 auto' }}>
            {/* Headline */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: 'center', marginBottom: 36 }}
            >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 14px', background: 'rgba(99,102,241,0.12)', borderRadius: 99, border: '1px solid rgba(99,102,241,0.25)', marginBottom: 20 }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', color: '#a5b4fc', textTransform: 'uppercase' }}>Free Online Tool</span>
                </div>
                <h1 style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 900,
                    lineHeight: 1.1,
                    marginBottom: 16,
                    background: 'linear-gradient(135deg, #e2e8f0, #a78bfa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}>
                    Free Online Data Visualizer – Excel, Google Sheets & PDF
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
                    Upload any spreadsheet or PDF and instantly generate beautiful, interactive charts. No signup required.
                </p>

                {/* Trust badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 20 }}>
                    {TRUST.map(t => (
                        <span key={t} style={{
                            fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)',
                            padding: '4px 12px', background: 'var(--bg-glass)',
                            border: '1px solid var(--border-subtle)', borderRadius: 99,
                        }}>{t}</span>
                    ))}
                </div>
            </motion.div>

            {/* Tab switcher */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <div style={{
                    display: 'flex', background: 'var(--bg-secondary)', borderRadius: 12,
                    padding: 4, marginBottom: 16, border: '1px solid var(--border-subtle)',
                }}>
                    {(['upload', 'sheets'] as Tab[]).map(t => (
                        <button key={t} onClick={() => setTab(t)} style={{
                            flex: 1, padding: '9px 0', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600,
                            fontSize: '0.875rem', transition: 'all 0.2s',
                            background: tab === t ? 'linear-gradient(135deg, #3b82f6, #6366f1)' : 'transparent',
                            color: tab === t ? '#fff' : 'var(--text-secondary)',
                            boxShadow: tab === t ? '0 4px 12px rgba(59,130,246,0.3)' : 'none',
                        }}>
                            {t === 'upload' ? '📁  Upload File' : '🔗  Google Sheets Link'}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {tab === 'upload' ? (
                        <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div
                                {...getRootProps()}
                                style={{
                                    width: '100%', padding: '48px 32px', borderRadius: 24,
                                    border: `2px dashed ${isDragActive ? '#6366f1' : 'rgba(255,255,255,0.1)'}`,
                                    background: isDragActive ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.02)',
                                    cursor: 'pointer', textAlign: 'center',
                                    transition: 'all 0.3s', position: 'relative', overflow: 'hidden',
                                }}
                            >
                                <input {...getInputProps()} />
                                {/* Glow */}
                                <div style={{
                                    position: 'absolute', inset: 0, pointerEvents: 'none',
                                    background: 'radial-gradient(ellipse at 50% -20%, rgba(99,102,241,0.12) 0%, transparent 70%)',
                                }} />

                                {isLoading ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                                        <div style={{ position: 'relative', width: 60, height: 60 }}>
                                            <div style={{ position: 'absolute', inset: 0, border: '3px solid rgba(255,255,255,0.1)', borderRadius: '50%' }} />
                                            <div style={{ position: 'absolute', inset: 0, border: '3px solid transparent', borderTopColor: '#3b82f6', borderRightColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                                            <Search size={22} color="#3b82f6" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                                        </div>
                                        <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Analyzing your data…</p>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Detecting columns, types, and patterns</p>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                                        <div style={{
                                            width: 64, height: 64, borderRadius: 16,
                                            background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))',
                                            border: '1px solid rgba(99,102,241,0.3)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            marginBottom: 4,
                                        }}>
                                            <UploadCloud size={28} color="#818cf8" />
                                        </div>
                                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                                            {isDragActive ? 'Drop your file here' : 'Drag & Drop your file'}
                                        </h2>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>
                                            or <span style={{ color: '#60a5fa', fontWeight: 600 }}>click to browse</span>
                                        </p>

                                        {/* Format chips */}
                                        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                                            {FORMATS.map(f => (
                                                <span key={f.label} style={{
                                                    display: 'flex', alignItems: 'center', gap: 5,
                                                    padding: '4px 12px', borderRadius: 99, fontSize: '0.75rem', fontWeight: 600,
                                                    background: `${f.color}14`, color: f.color,
                                                    border: `1px solid ${f.color}30`,
                                                }}>
                                                    {f.icon} {f.label}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="sheets" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div style={{
                                padding: 28, borderRadius: 24, border: '1px solid var(--border-subtle)',
                                background: 'rgba(255,255,255,0.02)',
                            }}>
                                <div style={{ marginBottom: 12 }}>
                                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: 8 }}>
                                        <Link2 size={14} style={{ display: 'inline', marginRight: 6 }} />
                                        Paste your Google Sheets link
                                    </label>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <input
                                            value={sheetsUrl}
                                            onChange={e => setSheetsUrl(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && handleSheetLoad()}
                                            placeholder="https://docs.google.com/spreadsheets/d/..."
                                            style={{
                                                flex: 1, padding: '12px 16px', borderRadius: 10,
                                                background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
                                                color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none',
                                            }}
                                        />
                                        <button onClick={handleSheetLoad} disabled={isLoading} style={{
                                            padding: '12px 20px', borderRadius: 10, fontWeight: 600, fontSize: '0.875rem',
                                            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                                            color: 'white', border: 'none', cursor: 'pointer',
                                            opacity: isLoading ? 0.6 : 1,
                                        }}>
                                            {isLoading ? '...' : 'Load'}
                                        </button>
                                    </div>
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>
                                    ⚠️ Make sure your sheet is set to <strong style={{ color: 'var(--text-secondary)' }}>"Anyone with the link can view"</strong>
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Error */}
            {error && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    style={{
                        marginTop: 16, padding: '12px 16px', borderRadius: 12,
                        background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.25)',
                        color: '#fda4af', fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                    {error}
                    <button onClick={() => setError(null)} style={{ background: 'none', border: 'none', color: '#fda4af', cursor: 'pointer', padding: 2 }}>
                        <X size={14} />
                    </button>
                </motion.div>
            )}

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}
