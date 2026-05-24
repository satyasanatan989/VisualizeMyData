'use client';

import React, { useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    UploadCloud, BarChart3, PieChart as PieIcon, Table2, 
    Download, FileText, Check, AlertCircle, RefreshCw, BarChart2, Star 
} from 'lucide-react';
import { 
    ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';
import * as xlsx from 'xlsx';
import { toast } from 'sonner';

interface SurveyQuestion {
    key: string;
    type: 'multiple-choice' | 'scale' | 'text';
    choices: { name: string; count: number; percentage: string }[];
    average?: number;
    textResponses?: string[];
}

const SAMPLE_SURVEY_CSV = `Timestamp,What is your department?,How satisfied are you with our platform? (1-5),Would you recommend us to a colleague?,What is your primary use case?,Any additional feedback?
2026-05-24 10:00:00,Engineering,4,Yes,Productivity,Very easy to use!
2026-05-24 10:15:00,Sales,5,Yes,Sales outreach,Fills all our needs perfectly.
2026-05-24 10:20:00,Marketing,3,Maybe,Campaign tracking,Need more templates.
2026-05-24 10:30:00,Engineering,5,Yes,Productivity,Love the clean UI!
2026-05-24 11:00:00,HR,4,Yes,Employee surveys,No issues so far.
2026-05-24 11:15:00,Engineering,2,No,Productivity,Chart exporting was buggy at first.
2026-05-24 11:30:00,Marketing,4,Yes,Campaign tracking,Excellent support.
2026-05-24 11:45:00,Sales,5,Yes,Sales outreach,A great time saver!
2026-05-24 12:00:00,Engineering,5,Yes,Productivity,Framer motion animations are so smooth.
2026-05-24 12:15:00,HR,3,Yes,Employee surveys,Simple and clean.`;

const COLORS = ['#ba9eff', '#8455ef', '#9093ff', '#40ceed', '#3b82f6', '#06b6d4', '#ec4899', '#f59e0b'];

export default function SurveyVisualizer() {
    const [fileName, setFileName] = useState('');
    const [surveyData, setSurveyData] = useState<Record<string, any>[]>([]);
    const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState<SurveyQuestion | null>(null);

    // Classification function
    const analyzeSurveyData = (data: Record<string, any>[]) => {
        if (data.length === 0) return [];
        
        const firstRow = data[0];
        const questionKeys = Object.keys(firstRow).filter(k => k.toLowerCase() !== 'timestamp');
        
        const analyzed: SurveyQuestion[] = questionKeys.map(key => {
            const values = data.map(r => r[key]).filter(v => v !== undefined && v !== null && String(v).trim() !== '');
            
            // Check if numeric / rating scale (e.g. values are numbers or parseable to 1-5, 1-10)
            const numericValues = values.map(v => Number(v)).filter(n => !isNaN(n));
            const isScale = numericValues.length > 0 && numericValues.every(n => n >= 1 && n <= 10);
            
            if (isScale) {
                // Compute averages
                const sum = numericValues.reduce((a, b) => a + b, 0);
                const avg = sum / numericValues.length;
                
                // Count frequencies
                const freqs: Record<number, number> = {};
                numericValues.forEach(n => freqs[n] = (freqs[n] || 0) + 1);
                
                const choices = Object.entries(freqs).map(([score, count]) => ({
                    name: `Rating ${score}`,
                    count,
                    percentage: ((count / numericValues.length) * 100).toFixed(1)
                })).sort((a, b) => b.name.localeCompare(a.name));

                return {
                    key,
                    type: 'scale',
                    choices,
                    average: avg
                };
            }

            // Check unique items to see if it is multiple-choice or open text
            const uniqueVals = new Set(values.map(v => String(v).trim()));
            const isMultipleChoice = uniqueVals.size > 0 && uniqueVals.size <= Math.min(10, data.length * 0.4);

            if (isMultipleChoice) {
                const freqs: Record<string, number> = {};
                values.forEach(v => {
                    const cleanStr = String(v).trim();
                    freqs[cleanStr] = (freqs[cleanStr] || 0) + 1;
                });

                const choices = Object.entries(freqs).map(([name, count]) => ({
                    name,
                    count,
                    percentage: ((count / values.length) * 100).toFixed(1)
                })).sort((a, b) => b.count - a.count);

                return {
                    key,
                    type: 'multiple-choice',
                    choices
                };
            }

            // Open-ended / Text
            return {
                key,
                type: 'text',
                choices: [],
                textResponses: values.map(v => String(v).trim())
            };
        });

        return analyzed;
    };

    const loadData = (rawJson: Record<string, any>[], name: string) => {
        setFileName(name);
        setSurveyData(rawJson);
        const analyzed = analyzeSurveyData(rawJson);
        setQuestions(analyzed);
        if (analyzed.length > 0) {
            setActiveQuestion(analyzed[0]);
        }
        toast.success(`Parsed ${rawJson.length} survey responses.`);
    };

    // Dropzone config
    const onDrop = React.useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;
        const file = acceptedFiles[0];
        setIsLoading(true);

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const buffer = e.target?.result;
                if (!buffer) throw new Error("Could not load file buffer.");
                const workbook = xlsx.read(buffer, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const json = xlsx.utils.sheet_to_json<Record<string, any>>(worksheet);
                loadData(json, file.name);
            } catch (err: any) {
                toast.error(err.message || "Failed to load spreadsheet.");
            } finally {
                setIsLoading(false);
            }
        };
        reader.readAsArrayBuffer(file);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        },
        maxFiles: 1,
    });

    const handleLoadSample = () => {
        setIsLoading(true);
        setTimeout(() => {
            const workbook = xlsx.read(SAMPLE_SURVEY_CSV, { type: 'string' });
            const json = xlsx.utils.sheet_to_json<Record<string, any>>(workbook.Sheets[workbook.SheetNames[0]]);
            loadData(json, 'Google_Forms_Sample_Export.csv');
            setIsLoading(false);
        }, 400);
    };

    const handleReset = () => {
        setFileName('');
        setSurveyData([]);
        setQuestions([]);
        setActiveQuestion(null);
    };

    const tooltipStyle = {
        contentStyle: { backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 10, color: '#fff', fontSize: 12 },
        itemStyle: { color: '#fff' },
    };

    const renderChart = (q: SurveyQuestion) => {
        const chartData = q.choices.map(c => ({ name: c.name, value: c.count }));

        if (q.type === 'multiple-choice') {
            return (
                <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                        <Pie data={chartData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value" stroke="none">
                            {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip {...tooltipStyle} />
                        <Legend wrapperStyle={{ fontSize: 11, color: 'var(--text-secondary)' }} />
                    </PieChart>
                </ResponsiveContainer>
            );
        }

        if (q.type === 'scale') {
            return (
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="name" stroke="#475569" tick={{ fill: '#64748b', fontSize: 11 }} />
                        <YAxis stroke="#475569" tick={{ fill: '#64748b', fontSize: 11 }} />
                        <Tooltip {...tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                        <Bar dataKey="value" fill="#ba9eff" radius={[4, 4, 0, 0]}>
                            {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            );
        }

        return null;
    };

    return (
        <div style={{ width: '100%' }}>
            {!surveyData.length ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
                                {isDragActive ? 'Drop your survey file' : 'Upload Google Forms Export'}
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0, maxWidth: 380, lineHeight: 1.5 }}>
                                Drag &amp; drop your survey CSV or Excel spreadsheet. The visualizer auto-detects multiple choice, ratings, and open feedback.
                            </p>
                            <span style={{ fontSize: '0.75rem', color: '#60a5fa', fontWeight: 600 }}>click to browse files</span>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Don&apos;t have a file? </span>
                        <button 
                            onClick={handleLoadSample}
                            style={{
                                background: 'rgba(186,158,255,0.08)', border: '1px solid rgba(186,158,255,0.25)',
                                color: '#ba9eff', padding: '6px 14px', borderRadius: 8, fontSize: '0.8rem',
                                fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(186,158,255,0.15)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(186,158,255,0.08)'; }}
                        >
                            📊 Try Sample Survey Dataset
                        </button>
                    </div>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'start' }}>
                    
                    {/* Questions Directory */}
                    <div style={{
                        background: 'rgba(23, 26, 30, 0.4)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-subtle)',
                        borderRadius: 20, padding: 20, display: 'flex', flexDirection: 'column', gap: 16
                    }}>
                        <div>
                            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 800, margin: 0 }}>
                                📋 Survey Questions
                            </h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '2px 0 0' }}>
                                {surveyData.length} responses · {questions.length} questions
                            </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 400, overflowY: 'auto' }}>
                            {questions.map((q, idx) => (
                                <div 
                                    key={idx}
                                    onClick={() => setActiveQuestion(q)}
                                    style={{
                                        padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
                                        background: activeQuestion?.key === q.key ? 'rgba(255,255,255,0.04)' : 'transparent',
                                        border: `1px solid ${activeQuestion?.key === q.key ? 'rgba(186,158,255,0.2)' : 'transparent'}`,
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                        <span style={{
                                            fontSize: '0.62rem', fontWeight: 800, padding: '2px 6px', borderRadius: 4,
                                            background: q.type === 'scale' ? 'rgba(144,147,255,0.15)' : q.type === 'multiple-choice' ? 'rgba(16,185,129,0.15)' : 'rgba(244,63,94,0.15)',
                                            color: q.type === 'scale' ? '#9093ff' : q.type === 'multiple-choice' ? '#10b981' : '#f43f5e',
                                            textTransform: 'uppercase'
                                        }}>
                                            {q.type}
                                        </span>
                                    </div>
                                    <p style={{
                                        color: activeQuestion?.key === q.key ? 'var(--text-primary)' : 'var(--text-secondary)',
                                        fontSize: '0.78rem', fontWeight: 600, margin: '6px 0 0', lineHeight: 1.4,
                                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                                    }}>
                                        {q.key}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <button 
                            onClick={handleReset}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                                padding: '10px 0', border: '1px solid rgba(244,63,94,0.25)', borderRadius: 10,
                                background: 'rgba(244,63,94,0.05)', color: '#f43f5e', fontSize: '0.8rem',
                                fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(244,63,94,0.1)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(244,63,94,0.05)'; }}
                        >
                            <RefreshCw size={13} /> Reset Dataset
                        </button>
                    </div>

                    {/* Chart / Report Panel */}
                    {activeQuestion && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div style={{
                                background: 'rgba(23, 26, 30, 0.4)', border: '1px solid var(--border-subtle)',
                                borderRadius: 20, padding: 24,
                            }}>
                                <span style={{
                                    fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: 4,
                                    background: 'rgba(186,158,255,0.08)', color: '#ba9eff', textTransform: 'uppercase', letterSpacing: '0.04em'
                                }}>
                                    Question Visualization
                                </span>
                                <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.15rem', fontWeight: 800, margin: '8px 0 20px', lineHeight: 1.4 }}>
                                    {activeQuestion.key}
                                </h3>

                                {/* Render Chart */}
                                {activeQuestion.type !== 'text' ? (
                                    <div style={{ minHeight: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {renderChart(activeQuestion)}
                                    </div>
                                ) : (
                                    <div style={{
                                        background: 'rgba(244,63,94,0.03)', border: '1px solid rgba(244,63,94,0.1)',
                                        borderRadius: 12, padding: 14, display: 'flex', gap: 10, alignItems: 'flex-start',
                                    }}>
                                        <AlertCircle size={16} color="#f43f5e" style={{ flexShrink: 0, marginTop: 2 }} />
                                        <div>
                                            <span style={{ color: '#fda4af', fontSize: '0.8rem', fontWeight: 700 }}>Open-ended Text Field</span>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.74rem', lineHeight: 1.4, margin: '2px 0 0' }}>
                                                Graphs are not rendered for free-text answers. Review raw feedback responses in the summary below.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Details table or list of comments */}
                            <div style={{
                                background: 'rgba(23, 26, 30, 0.4)', border: '1px solid var(--border-subtle)',
                                borderRadius: 20, padding: 20,
                            }}>
                                {activeQuestion.type === 'scale' && activeQuestion.average && (
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(186,158,255,0.05)',
                                        border: '1px solid rgba(186,158,255,0.15)', borderRadius: 12, padding: '12px 16px', marginBottom: 16
                                    }}>
                                        <Star size={18} fill="#ba9eff" stroke="none" />
                                        <div>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.68rem', margin: 0, textTransform: 'uppercase' }}>Average Rating Score</p>
                                            <p style={{ color: '#ba9eff', fontSize: '1.4rem', fontWeight: 900, margin: 0 }}>
                                                {activeQuestion.average.toFixed(2)} / 5.00
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <h4 style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 800, margin: '0 0 12px' }}>
                                    {activeQuestion.type === 'text' ? '📝 Raw Responses' : '📊 Response Breakdown'}
                                </h4>

                                {activeQuestion.type !== 'text' ? (
                                    <div style={{ overflow: 'hidden', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.76rem' }}>
                                            <thead>
                                                <tr style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                                                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700 }}>Option</th>
                                                    <th style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 700 }}>Responses</th>
                                                    <th style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 700 }}>Percentage</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {activeQuestion.choices.map((c, idx) => (
                                                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                                        <td style={{ padding: '8px 12px', color: 'var(--text-primary)', fontWeight: 600 }}>{c.name}</td>
                                                        <td style={{ padding: '8px 12px', color: 'var(--text-secondary)', textAlign: 'center' }}>{c.count}</td>
                                                        <td style={{ padding: '8px 12px', color: 'var(--accent-primary)', textAlign: 'right', fontWeight: 700 }}>{c.percentage}%</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 260, overflowY: 'auto' }}>
                                        {activeQuestion.textResponses?.map((resp, idx) => (
                                            <div 
                                                key={idx}
                                                style={{
                                                    padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.02)',
                                                    border: '1px solid var(--border-subtle)', fontSize: '0.76rem', color: 'var(--text-secondary)',
                                                    lineHeight: 1.45,
                                                }}
                                            >
                                                {resp}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
