'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { 
    Trash2, CheckCircle2, Download, Table2, Sparkles, 
    AlertCircle, RefreshCw, UploadCloud, FileText, Check 
} from 'lucide-react';
import * as xlsx from 'xlsx';
import { toast } from 'sonner';

interface CleanStats {
    originalRows: number;
    cleanedRows: number;
    duplicatesRemoved: number;
    emptyRowsRemoved: number;
    nullsFilled: number;
    datesStandardized: number;
}

export default function DataCleaner() {
    const [fileName, setFileName] = useState<string>('');
    const [headers, setHeaders] = useState<string[]>([]);
    const [rawData, setRawData] = useState<Record<string, any>[]>([]);
    const [cleanedData, setCleanedData] = useState<Record<string, any>[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    // Cleaning configurations
    const [removeDuplicates, setRemoveDuplicates] = useState(true);
    const [removeEmptyRows, setRemoveEmptyRows] = useState(true);
    const [trimSpaces, setTrimSpaces] = useState(true);
    const [normalizeHeaders, setNormalizeHeaders] = useState<string>('none'); // 'none' | 'snake' | 'camel' | 'title'
    const [standardizeDates, setStandardizeDates] = useState(true);
    const [fixNullValues, setFixNullValues] = useState(true);
    const [nullReplacementMode, setNullReplacementMode] = useState<string>('smart'); // 'smart' | 'empty' | 'na' | 'zero'
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const [stats, setStats] = useState<CleanStats | null>(null);

    // Dropzone logic
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;
        const file = acceptedFiles[0];
        setFileName(file.name);
        setIsLoading(true);
        setStats(null);
        
        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = e.target?.result;
                    if (!data) throw new Error("Could not read file");
                    const workbook = xlsx.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const json = xlsx.utils.sheet_to_json<Record<string, any>>(sheet);
                    
                    if (json.length === 0) {
                        throw new Error("The uploaded sheet is empty.");
                    }
                    
                    // Extract headers
                    const allKeys = new Set<string>();
                    json.forEach(row => Object.keys(row).forEach(k => allKeys.add(k)));
                    const headerList = Array.from(allKeys).filter(h => !h.startsWith('__EMPTY'));
                    
                    setHeaders(headerList);
                    setRawData(json);
                    setCleanedData(json); // Initially set cleaned to raw
                    toast.success(`Successfully loaded ${json.length} rows of data.`);
                } catch (err: any) {
                    toast.error(err.message || "Failed to parse file.");
                } finally {
                    setIsLoading(false);
                }
            };
            reader.readAsArrayBuffer(file);
        } catch (err: any) {
            toast.error("File reading error.");
            setIsLoading(false);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-excel': ['.xls'],
            'text/csv': ['.csv'],
        },
        maxFiles: 1,
    });

    // Helper: react's useCallback or direct declaration
    function useCallback<T extends (...args: any[]) => any>(fn: T, deps: any[]): T {
        return useMemo(() => fn, deps);
    }

    // Cleaning processor
    const processCleaning = () => {
        if (rawData.length === 0) return;
        
        setIsLoading(true);
        
        setTimeout(() => {
            let dataCopy = rawData.map(row => ({ ...row }));
            let dupRemoved = 0;
            let emptyRemoved = 0;
            let nullFilled = 0;
            let dateStd = 0;
            
            // 1. Remove empty rows
            if (removeEmptyRows) {
                const beforeCount = dataCopy.length;
                dataCopy = dataCopy.filter(row => {
                    const values = Object.values(row).map(v => String(v ?? '').trim());
                    return values.some(v => v !== '');
                });
                emptyRemoved = beforeCount - dataCopy.length;
            }
            
            // 2. Trim spaces
            if (trimSpaces) {
                dataCopy = dataCopy.map(row => {
                    const newRow: Record<string, any> = {};
                    for (const [k, v] of Object.entries(row)) {
                        newRow[k] = typeof v === 'string' ? v.trim() : v;
                    }
                    return newRow;
                });
            }
            
            // 3. Remove duplicates
            if (removeDuplicates) {
                const beforeCount = dataCopy.length;
                const seen = new Set<string>();
                dataCopy = dataCopy.filter(row => {
                    // Create string signature of row values
                    const sig = JSON.stringify(row);
                    if (seen.has(sig)) {
                        return false;
                    }
                    seen.add(sig);
                    return true;
                });
                dupRemoved = beforeCount - dataCopy.length;
            }
            
            // 4. Fix null values
            if (fixNullValues) {
                dataCopy = dataCopy.map(row => {
                    const newRow: Record<string, any> = {};
                    for (const [k, v] of Object.entries(row)) {
                        if (v === undefined || v === null || String(v).trim() === '') {
                            nullFilled++;
                            if (nullReplacementMode === 'empty') {
                                newRow[k] = '';
                            } else if (nullReplacementMode === 'na') {
                                newRow[k] = 'N/A';
                            } else if (nullReplacementMode === 'zero') {
                                newRow[k] = 0;
                            } else {
                                // Smart mode: 0 if column is numeric elsewhere, 'N/A' if string
                                const isColNumeric = rawData.some(r => typeof r[k] === 'number');
                                newRow[k] = isColNumeric ? 0 : 'N/A';
                            }
                        } else {
                            newRow[k] = v;
                        }
                    }
                    return newRow;
                });
            }

            // 5. Standardize dates
            if (standardizeDates) {
                dataCopy = dataCopy.map(row => {
                    const newRow: Record<string, any> = {};
                    for (const [k, v] of Object.entries(row)) {
                        if (typeof v === 'string' && v.trim() !== '') {
                            const dateParse = Date.parse(v);
                            // Simple check to make sure it's a date and not just a plain number
                            if (!isNaN(dateParse) && v.includes('-') || v.includes('/')) {
                                try {
                                    const dateObj = new Date(dateParse);
                                    const formatted = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD
                                    if (formatted !== v) {
                                        dateStd++;
                                    }
                                    newRow[k] = formatted;
                                } catch {
                                    newRow[k] = v;
                                }
                            } else {
                                newRow[k] = v;
                            }
                        } else if (v instanceof Date) {
                            const formatted = v.toISOString().split('T')[0];
                            dateStd++;
                            newRow[k] = formatted;
                        } else {
                            newRow[k] = v;
                        }
                    }
                    return newRow;
                });
            }

            // 6. Normalize headers
            let finalHeaders = [...headers];
            if (normalizeHeaders !== 'none') {
                const headerMap: Record<string, string> = {};
                finalHeaders = headers.map(h => {
                    let cleaned = h.trim();
                    if (normalizeHeaders === 'snake') {
                        cleaned = cleaned
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '_')
                            .replace(/^_+|_+$/g, '');
                    } else if (normalizeHeaders === 'camel') {
                        cleaned = cleaned
                            .replace(/[^a-zA-Z0-9]+/g, ' ')
                            .split(' ')
                            .map((word, i) => i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                            .join('');
                    } else if (normalizeHeaders === 'title') {
                        cleaned = cleaned
                            .replace(/[^a-zA-Z0-9]+/g, ' ')
                            .split(' ')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                            .join(' ');
                    }
                    headerMap[h] = cleaned || h;
                    return cleaned || h;
                });

                dataCopy = dataCopy.map(row => {
                    const newRow: Record<string, any> = {};
                    for (const [k, v] of Object.entries(row)) {
                        newRow[headerMap[k] || k] = v;
                    }
                    return newRow;
                });
                setHeaders(finalHeaders);
            }

            setCleanedData(dataCopy);
            setStats({
                originalRows: rawData.length,
                cleanedRows: dataCopy.length,
                duplicatesRemoved: dupRemoved,
                emptyRowsRemoved: emptyRemoved,
                nullsFilled: nullFilled,
                datesStandardized: dateStd,
            });
            setCurrentPage(1);
            setIsLoading(false);
            toast.success("Data cleaning completed successfully!");
        }, 600);
    };

    // Download functions
    const downloadFile = (format: 'csv' | 'xlsx') => {
        if (cleanedData.length === 0) return;
        
        const ws = xlsx.utils.json_to_sheet(cleanedData);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, 'CleanedData');
        
        const baseName = fileName.replace(/\.[^.]+$/, '') + '_cleaned';
        if (format === 'csv') {
            xlsx.writeFile(wb, `${baseName}.csv`, { bookType: 'csv' });
        } else {
            xlsx.writeFile(wb, `${baseName}.xlsx`, { bookType: 'xlsx' });
        }
        toast.success(`Cleaned dataset downloaded as ${format.toUpperCase()}!`);
    };

    // Table view values
    const displayedData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return cleanedData.slice(start, start + rowsPerPage);
    }, [cleanedData, currentPage]);

    const totalPages = Math.ceil(cleanedData.length / rowsPerPage);

    return (
        <div style={{ width: '100%' }}>
            {!rawData.length ? (
                <div {...getRootProps()} style={{
                    width: '100%', padding: '60px 32px', borderRadius: 24,
                    border: '2px dashed rgba(186,158,255,0.2)',
                    background: isDragActive ? 'rgba(186,158,255,0.08)' : 'rgba(255,255,255,0.02)',
                    cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)', backdropFilter: 'blur(8px)',
                }}>
                    <input {...getInputProps()} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                        <div style={{
                            width: 60, height: 60, borderRadius: 16,
                            background: 'linear-gradient(135deg, rgba(186,158,255,0.2), rgba(132,85,239,0.2))',
                            border: '1px solid rgba(186,158,255,0.3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <UploadCloud size={24} color="#ba9eff" />
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
                            {isDragActive ? 'Drop your spreadsheet here' : 'Upload Spreadsheet for Cleaning'}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0, maxWidth: 360, lineHeight: 1.5 }}>
                            Drag &amp; drop Excel (.xlsx, .xls) or CSV files here. Processing runs 100% in-browser.
                        </p>
                        <span style={{ fontSize: '0.75rem', color: '#60a5fa', fontWeight: 600 }}>click to browse files</span>
                    </div>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, alignItems: 'start' }}>
                    
                    {/* Settings Side Panel */}
                    <div style={{
                        background: 'rgba(23, 26, 30, 0.4)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-subtle)',
                        borderRadius: 20, padding: 24, boxShadow: 'var(--shadow-ambient)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                            <Sparkles size={18} color="#ba9eff" />
                            <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.05rem', margin: 0 }}>
                                Cleaning Controls
                            </h3>
                        </div>

                        {/* Configurations List */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                                <input type="checkbox" checked={removeDuplicates} onChange={e => setRemoveDuplicates(e.target.checked)} style={{ marginTop: 4 }} />
                                <div>
                                    <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>Remove Duplicates</span>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: '2px 0 0' }}>Remove exact duplicate rows in dataset.</p>
                                </div>
                            </label>

                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                                <input type="checkbox" checked={removeEmptyRows} onChange={e => setRemoveEmptyRows(e.target.checked)} style={{ marginTop: 4 }} />
                                <div>
                                    <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>Remove Empty Rows</span>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: '2px 0 0' }}>Remove rows where every column is empty.</p>
                                </div>
                            </label>

                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                                <input type="checkbox" checked={trimSpaces} onChange={e => setTrimSpaces(e.target.checked)} style={{ marginTop: 4 }} />
                                <div>
                                    <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>Trim Whitespace</span>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: '2px 0 0' }}>Strip spaces from start/end of string cells.</p>
                                </div>
                            </label>

                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                                <input type="checkbox" checked={standardizeDates} onChange={e => setStandardizeDates(e.target.checked)} style={{ marginTop: 4 }} />
                                <div>
                                    <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>Standardize Date Formats</span>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: '2px 0 0' }}>Automatically format identified dates to YYYY-MM-DD.</p>
                                </div>
                            </label>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                                    <input type="checkbox" checked={fixNullValues} onChange={e => setFixNullValues(e.target.checked)} style={{ marginTop: 4 }} />
                                    <div>
                                        <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>Fix Null/Empty Values</span>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: '2px 0 0' }}>Fill empty cells with standard values.</p>
                                    </div>
                                </label>
                                {fixNullValues && (
                                    <select 
                                        value={nullReplacementMode} 
                                        onChange={e => setNullReplacementMode(e.target.value)}
                                        style={{
                                            marginLeft: 26, padding: '6px 10px', background: 'var(--bg-secondary)',
                                            border: '1px solid var(--border-subtle)', borderRadius: 6, color: 'var(--text-secondary)',
                                            fontSize: '0.75rem', cursor: 'pointer', outline: 'none',
                                        }}
                                    >
                                        <option value="smart">Smart replacement (0 for numbers, N/A for text)</option>
                                        <option value="empty">Empty string ("")</option>
                                        <option value="na">"N/A"</option>
                                        <option value="zero">Number zero (0)</option>
                                    </select>
                                )}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>Normalize Headers</span>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: 0 }}>Standardize naming format of column headers.</p>
                                <select 
                                    value={normalizeHeaders} 
                                    onChange={e => setNormalizeHeaders(e.target.value)}
                                    style={{
                                        padding: '8px 12px', background: 'var(--bg-secondary)',
                                        border: '1px solid var(--border-subtle)', borderRadius: 8, color: 'var(--text-secondary)',
                                        fontSize: '0.8rem', cursor: 'pointer', outline: 'none',
                                    }}
                                >
                                    <option value="none">Keep Original Headers</option>
                                    <option value="snake">snake_case (e.g. sales_amount)</option>
                                    <option value="camel">camelCase (e.g. salesAmount)</option>
                                    <option value="title">Title Case (e.g. Sales Amount)</option>
                                </select>
                            </div>
                        </div>

                        <button 
                            onClick={processCleaning} 
                            disabled={isLoading}
                            style={{
                                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                padding: '12px 0', marginTop: 24, borderRadius: 10, background: 'linear-gradient(135deg, #ba9eff, #8455ef)',
                                color: '#000', fontWeight: 700, fontSize: '0.875rem', border: 'none', cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(186, 158, 255, 0.25)',
                            }}
                        >
                            {isLoading ? <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Sparkles size={14} />}
                            {isLoading ? 'Cleaning...' : 'Apply Data Cleaning'}
                        </button>
                    </div>

                    {/* Preview Area */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {/* File Details / Stats */}
                        <div style={{
                            background: 'rgba(23, 26, 30, 0.4)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-subtle)',
                            borderRadius: 20, padding: 20, display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <div>
                                <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>{fileName}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: '2px 0 0' }}>
                                    {rawData.length} rows loaded · {headers.length} columns detected
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <button 
                                    onClick={() => downloadFile('csv')} 
                                    disabled={cleanedData.length === 0}
                                    className="btn-secondary" 
                                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', fontSize: '0.78rem', borderRadius: 8 }}
                                >
                                    <Download size={13} /> CSV
                                </button>
                                <button 
                                    onClick={() => downloadFile('xlsx')} 
                                    disabled={cleanedData.length === 0}
                                    className="btn-primary" 
                                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', fontSize: '0.78rem', borderRadius: 8, color: '#000' }}
                                >
                                    <Download size={13} /> XLSX
                                </button>
                                <button 
                                    onClick={() => { setRawData([]); setCleanedData([]); setFileName(''); setStats(null); }} 
                                    className="btn-secondary" 
                                    style={{ padding: '8px 10px', fontSize: '0.78rem', borderRadius: 8, borderColor: 'rgba(244,63,94,0.3)', color: '#f43f5e' }}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>

                        {/* Statistics comparison card */}
                        {stats && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.98 }} 
                                animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)',
                                    borderRadius: 16, padding: 18,
                                }}
                            >
                                <h4 style={{ color: '#34d399', fontSize: '0.8rem', fontWeight: 700, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    ✓ Data Cleaning Log
                                </h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 10 }}>
                                    {[
                                        { label: 'Duplicates Removed', value: stats.duplicatesRemoved },
                                        { label: 'Empty Rows Removed', value: stats.emptyRowsRemoved },
                                        { label: 'Nulls Filled', value: stats.nullsFilled },
                                        { label: 'Dates Standardized', value: stats.datesStandardized },
                                        { label: 'Final Rows', value: stats.cleanedRows }
                                    ].map(stat => (
                                        <div key={stat.label} style={{ background: 'rgba(0,0,0,0.15)', borderRadius: 10, padding: 10, textAlign: 'center' }}>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.65rem', margin: 0, textTransform: 'uppercase' }}>{stat.label}</p>
                                            <p style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: 800, margin: '4px 0 0' }}>{stat.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Interactive Table Preview */}
                        <div style={{
                            background: 'rgba(23, 26, 30, 0.4)', border: '1px solid var(--border-subtle)',
                            borderRadius: 20, overflow: 'hidden',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 18px', borderBottom: '1px solid var(--border-subtle)' }}>
                                <Table2 size={16} color="var(--text-muted)" />
                                <span style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 700 }}>Cleaned Preview (Showing 10 rows per page)</span>
                            </div>
                            
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                                    <thead>
                                        <tr style={{ background: 'var(--bg-secondary)' }}>
                                            {headers.map(h => (
                                                <th key={h} style={{
                                                    padding: '10px 14px', textAlign: 'left', color: 'var(--text-secondary)',
                                                    borderBottom: '1px solid var(--border-subtle)', whiteSpace: 'nowrap', fontWeight: 700,
                                                }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayedData.map((row, idx) => (
                                            <tr key={idx} style={{ background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                                                {headers.map(h => (
                                                    <td key={h} style={{
                                                        padding: '9px 14px', color: 'var(--text-secondary)',
                                                        borderBottom: '1px solid rgba(255,255,255,0.03)', whiteSpace: 'nowrap',
                                                    }}>
                                                        {row[h] !== undefined && row[h] !== null ? String(row[h]) : '–'}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '12px 18px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(0,0,0,0.1)'
                                }}>
                                    <button 
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        style={{
                                            padding: '4px 10px', fontSize: '0.75rem', borderRadius: 4, cursor: 'pointer',
                                            background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)',
                                            opacity: currentPage === 1 ? 0.5 : 1,
                                        }}
                                    >Prev</button>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Page {currentPage} of {totalPages}</span>
                                    <button 
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        style={{
                                            padding: '4px 10px', fontSize: '0.75rem', borderRadius: 4, cursor: 'pointer',
                                            background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)',
                                            opacity: currentPage === totalPages ? 0.5 : 1,
                                        }}
                                    >Next</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
