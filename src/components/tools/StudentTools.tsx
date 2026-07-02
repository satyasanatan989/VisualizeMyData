'use client';

import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { 
    Clock, Timer, Calendar, Plus, Trash2, Printer, 
    BookOpen, Percent, RefreshCw, Play, Pause, RotateCcw, AlertTriangle 
} from 'lucide-react';

interface ToolProps {
    onDone?: () => void;
}

// Universal premium card and input styling
const cardStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 16,
    padding: 24,
    width: '100%'
};

const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.82rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: 8
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    background: 'rgba(15, 23, 42, 0.4)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 10,
    color: '#fff',
    outline: 'none',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-inter)',
    transition: 'border-color 0.2s'
};

const grid2Style: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16
};

// 1. Attendance Calculator
export function AttendanceCalculator() {
    const [conducted, setConducted] = useState(40);
    const [attended, setAttended] = useState(30);
    const [target, setTarget] = useState(75);
    const [result, setResult] = useState<string>('');

    useEffect(() => {
        if (conducted < 0 || attended < 0 || conducted < attended) {
            setResult('Please check your inputs. Conducted classes must exceed or equal attended.');
            return;
        }

        const currentPct = (attended / conducted) * 100;
        if (currentPct >= target) {
            // Can skip classes
            // Formula: attended / (conducted + x) = target/100 -> x = (attended * 100 / target) - conducted
            const maxSkip = Math.floor((attended * 100) / target - conducted);
            if (maxSkip <= 0) {
                setResult(`Your current attendance is ${currentPct.toFixed(1)}%. You are exactly on track. You cannot skip any classes.`);
            } else {
                setResult(`Your current attendance is ${currentPct.toFixed(1)}%. You can skip the next ${maxSkip} class(es) and remain above ${target}%.`);
            }
        } else {
            // Need to attend classes
            // Formula: (attended + x) / (conducted + x) = target/100 -> x = (target * conducted - 100 * attended) / (100 - target)
            if (target >= 100) {
                setResult(`To reach 100% attendance, you can never skip. You must attend all subsequent classes.`);
            } else {
                const reqClasses = Math.ceil((target * conducted - 100 * attended) / (100 - target));
                setResult(`Your current attendance is ${currentPct.toFixed(1)}%. You need to attend the next ${reqClasses} class(es) straight to reach ${target}%.`);
            }
        }
    }, [conducted, attended, target]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={grid2Style}>
                        <div>
                            <label style={labelStyle}>Total Classes Conducted</label>
                            <input 
                                type="number" 
                                value={conducted} 
                                onChange={(e) => setConducted(parseInt(e.target.value) || 0)} 
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Total Classes Attended</label>
                            <input 
                                type="number" 
                                value={attended} 
                                onChange={(e) => setAttended(parseInt(e.target.value) || 0)} 
                                style={inputStyle}
                            />
                        </div>
                    </div>
                    <div>
                        <label style={labelStyle}>Target Attendance Percentage (%)</label>
                        <input 
                            type="number" 
                            value={target} 
                            onChange={(e) => setTarget(parseInt(e.target.value) || 0)} 
                            style={inputStyle}
                            max="100"
                            min="1"
                        />
                    </div>
                </div>
            </div>
            <div style={{ padding: 20, borderRadius: 12, background: 'rgba(132, 85, 239, 0.08)', border: '1px solid rgba(132, 85, 239, 0.2)', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '0.92rem', fontWeight: 600, color: '#e9e4ff', lineHeight: 1.6 }}>{result}</p>
            </div>
        </div>
    );
}

// 2. CGPA Calculator
interface Course {
    id: string;
    name: string;
    credits: number;
    gradePoint: number;
}
export function CgpaCalculator() {
    const [courses, setCourses] = useState<Course[]>([
        { id: '1', name: 'Mathematics', credits: 4, gradePoint: 9 },
        { id: '2', name: 'Computer Science', credits: 3, gradePoint: 10 },
        { id: '3', name: 'Physics Lab', credits: 2, gradePoint: 8 }
    ]);
    const [newCourse, setNewCourse] = useState({ name: '', credits: 3, gradePoint: 9 });
    const [gpa, setGpa] = useState<number | null>(null);

    const addCourse = () => {
        if (!newCourse.name.trim()) {
            toast.error('Please enter a course name');
            return;
        }
        setCourses([
            ...courses,
            { id: Date.now().toString(), name: newCourse.name, credits: newCourse.credits, gradePoint: newCourse.gradePoint }
        ]);
        setNewCourse({ name: '', credits: 3, gradePoint: 9 });
    };

    const removeCourse = (id: string) => {
        setCourses(courses.filter(c => c.id !== id));
    };

    useEffect(() => {
        let totalCredits = 0;
        let weightedPoints = 0;
        courses.forEach(c => {
            totalCredits += c.credits;
            weightedPoints += c.credits * c.gradePoint;
        });
        if (totalCredits > 0) {
            setGpa(weightedPoints / totalCredits);
        } else {
            setGpa(0);
        }
    }, [courses]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1rem', color: 'var(--text-primary)' }}>Add Course Grade</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: 12, alignItems: 'end' }}>
                    <div>
                        <label style={labelStyle}>Course Name</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Chemistry"
                            value={newCourse.name} 
                            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })} 
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Credits</label>
                        <input 
                            type="number" 
                            value={newCourse.credits} 
                            onChange={(e) => setNewCourse({ ...newCourse, credits: parseInt(e.target.value) || 0 })} 
                            style={inputStyle}
                            min="1"
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Grade Point</label>
                        <input 
                            type="number" 
                            value={newCourse.gradePoint} 
                            onChange={(e) => setNewCourse({ ...newCourse, gradePoint: parseFloat(e.target.value) || 0 })} 
                            style={inputStyle}
                            step="0.1"
                            min="0"
                            max="10"
                        />
                    </div>
                    <button onClick={addCourse} className="btn-primary" style={{ height: 42, padding: '0 16px' }}>
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            <div style={cardStyle}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1rem', color: 'var(--text-primary)' }}>Course List</h3>
                {courses.length === 0 ? (
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>No courses added yet.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {courses.map(c => (
                            <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-subtle)', borderRadius: 10 }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</span>
                                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{c.credits} Credits</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-primary)' }}>{c.gradePoint}</span>
                                    <button onClick={() => removeCourse(c.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {gpa !== null && (
                <div style={{ padding: '16px 20px', borderRadius: 12, background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Calculated CGPA / GPA:</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#10b981' }}>{gpa.toFixed(2)}</span>
                </div>
            )}
        </div>
    );
}

// 3. GPA Converter
export function GpaConverter() {
    const [scale10, setScale10] = useState('8.5');
    const [scale4, setScale4] = useState('3.4');
    const [pct, setPct] = useState('80.75');

    const handleConvert = (val: string, fromType: '10' | '4' | 'pct') => {
        const num = parseFloat(val) || 0;
        if (fromType === '10') {
            setScale10(val);
            setScale4((num * 0.4).toFixed(2));
            setPct((num * 9.5).toFixed(2));
        } else if (fromType === '4') {
            setScale4(val);
            setScale10((num * 2.5).toFixed(2));
            setPct((num * 23.75).toFixed(2));
        } else if (fromType === 'pct') {
            setPct(val);
            setScale10((num / 9.5).toFixed(2));
            setScale4((num / 23.75).toFixed(2));
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                        <label style={labelStyle}>10.0 Scale GPA / CGPA</label>
                        <input 
                            type="number" 
                            value={scale10} 
                            onChange={(e) => handleConvert(e.target.value, '10')} 
                            style={inputStyle}
                            step="0.1"
                            min="0"
                            max="10"
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>4.0 Scale GPA</label>
                        <input 
                            type="number" 
                            value={scale4} 
                            onChange={(e) => handleConvert(e.target.value, '4')} 
                            style={inputStyle}
                            step="0.01"
                            min="0"
                            max="4"
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Equivalent Percentage (%)</label>
                        <input 
                            type="number" 
                            value={pct} 
                            onChange={(e) => handleConvert(e.target.value, 'pct')} 
                            style={inputStyle}
                            step="0.1"
                            min="0"
                            max="100"
                        />
                    </div>
                </div>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5, textAlign: 'center' }}>
                Note: Standard conversion multipliers applied (e.g. Percentage = CGPA (10) * 9.5). Actual scales may vary depending on university regulations.
            </div>
        </div>
    );
}

// 4. Study Timer (Stopwatch and Basic Timer)
export function StudyTimer() {
    const [timerMode, setTimerMode] = useState<'stopwatch' | 'countdown'>('stopwatch');
    
    // Stopwatch
    const [swActive, setSwActive] = useState(false);
    const [swTime, setSwTime] = useState(0);
    const swRef = useRef<NodeJS.Timeout | null>(null);

    // Countdown
    const [cdMinutes, setCdMinutes] = useState(15);
    const [cdTime, setCdTime] = useState(900); // 15 mins in sec
    const [cdActive, setCdActive] = useState(false);
    const cdRef = useRef<NodeJS.Timeout | null>(null);

    // Stopwatch logic
    useEffect(() => {
        if (swActive) {
            swRef.current = setInterval(() => {
                setSwTime(t => t + 1);
            }, 1000);
        } else {
            if (swRef.current) clearInterval(swRef.current);
        }
        return () => { if (swRef.current) clearInterval(swRef.current); };
    }, [swActive]);

    // Countdown logic
    useEffect(() => {
        if (cdActive) {
            cdRef.current = setInterval(() => {
                setCdTime(t => {
                    if (t <= 1) {
                        setCdActive(false);
                        try {
                            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-500.wav');
                            audio.play();
                        } catch(e){}
                        toast.success('Study session complete!');
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);
        } else {
            if (cdRef.current) clearInterval(cdRef.current);
        }
        return () => { if (cdRef.current) clearInterval(cdRef.current); };
    }, [cdActive]);

    const formatTime = (totalSec: number) => {
        const h = Math.floor(totalSec / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;
        return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, background: 'rgba(255,255,255,0.02)', padding: 4, borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
                <button 
                    onClick={() => setTimerMode('stopwatch')} 
                    style={{ padding: '8px 0', border: 'none', background: timerMode === 'stopwatch' ? 'var(--accent-primary)' : 'transparent', color: '#fff', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                >
                    Stopwatch
                </button>
                <button 
                    onClick={() => setTimerMode('countdown')} 
                    style={{ padding: '8px 0', border: 'none', background: timerMode === 'countdown' ? 'var(--accent-primary)' : 'transparent', color: '#fff', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                >
                    Countdown
                </button>
            </div>

            {timerMode === 'stopwatch' ? (
                <div style={{ ...cardStyle, textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', fontFamily: 'monospace', fontWeight: 'bold', margin: '20px 0', color: 'var(--text-primary)' }}>
                        {formatTime(swTime)}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                        <button 
                            onClick={() => setSwActive(!swActive)} 
                            className={swActive ? 'btn-secondary' : 'btn-primary'}
                            style={{ padding: '10px 24px' }}
                        >
                            {swActive ? <Pause size={14} style={{ marginRight: 6 }} /> : <Play size={14} style={{ marginRight: 6 }} />}
                            {swActive ? 'Pause' : 'Start'}
                        </button>
                        <button 
                            onClick={() => { setSwActive(false); setSwTime(0); }} 
                            className="btn-secondary"
                            style={{ padding: '10px 24px' }}
                        >
                            <RotateCcw size={14} style={{ marginRight: 6 }} /> Reset
                        </button>
                    </div>
                </div>
            ) : (
                <div style={{ ...cardStyle, textAlign: 'center' }}>
                    {cdActive ? (
                        <div style={{ fontSize: '3rem', fontFamily: 'monospace', fontWeight: 'bold', margin: '20px 0', color: 'var(--text-primary)' }}>
                            {formatTime(cdTime)}
                        </div>
                    ) : (
                        <div style={{ margin: '20px 0' }}>
                            <label style={labelStyle}>Study Duration (Minutes)</label>
                            <input 
                                type="number" 
                                value={cdMinutes} 
                                onChange={(e) => {
                                    const min = parseInt(e.target.value) || 0;
                                    setCdMinutes(min);
                                    setCdTime(min * 60);
                                }}
                                style={{ ...inputStyle, width: '120px', textAlign: 'center', fontSize: '1.25rem' }}
                                min="1"
                            />
                        </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                        <button 
                            onClick={() => setCdActive(!cdActive)} 
                            className={cdActive ? 'btn-secondary' : 'btn-primary'}
                            style={{ padding: '10px 24px' }}
                        >
                            {cdActive ? <Pause size={14} style={{ marginRight: 6 }} /> : <Play size={14} style={{ marginRight: 6 }} />}
                            {cdActive ? 'Pause' : 'Start'}
                        </button>
                        <button 
                            onClick={() => { setCdActive(false); setCdTime(cdMinutes * 60); }} 
                            className="btn-secondary"
                            style={{ padding: '10px 24px' }}
                        >
                            <RotateCcw size={14} style={{ marginRight: 6 }} /> Reset
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// 5. Pomodoro Timer
export function PomodoroTimer() {
    const [mode, setMode] = useState<'work' | 'short' | 'long'>('work');
    const [timeLeft, setTimeLeft] = useState(1500); // 25 min in sec
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const presets = {
        work: 1500, // 25 mins
        short: 300,  // 5 mins
        long: 900    // 15 mins
    };

    const switchMode = (newMode: 'work' | 'short' | 'long') => {
        setIsActive(false);
        setMode(newMode);
        setTimeLeft(presets[newMode]);
    };

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(t => {
                    if (t <= 1) {
                        setIsActive(false);
                        try {
                            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-500.wav');
                            audio.play();
                        } catch(e){}
                        
                        if (mode === 'work') {
                            toast.success('Work session complete! Time for a short break.');
                            switchMode('short');
                        } else {
                            toast.success('Break complete! Back to work.');
                            switchMode('work');
                        }
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isActive, mode]);

    const formatMins = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Mode Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, background: 'rgba(255,255,255,0.02)', padding: 4, borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
                {(['work', 'short', 'long'] as const).map(m => (
                    <button 
                        key={m}
                        onClick={() => switchMode(m)} 
                        style={{ padding: '8px 0', border: 'none', background: mode === m ? 'var(--accent-primary)' : 'transparent', color: '#fff', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}
                    >
                        {m === 'work' ? 'Focus' : (m === 'short' ? 'Short Break' : 'Long Break')}
                    </button>
                ))}
            </div>

            <div style={{ ...cardStyle, textAlign: 'center', background: mode === 'work' ? 'rgba(132, 85, 239, 0.03)' : 'rgba(16, 185, 129, 0.03)' }}>
                <div style={{ fontSize: '4.5rem', fontFamily: 'monospace', fontWeight: 900, margin: '20px 0', color: mode === 'work' ? 'var(--accent-primary)' : '#10b981' }}>
                    {formatMins(timeLeft)}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                    <button 
                        onClick={() => setIsActive(!isActive)} 
                        className={isActive ? 'btn-secondary' : 'btn-primary'}
                        style={{ padding: '12px 30px' }}
                    >
                        {isActive ? <Pause size={14} style={{ marginRight: 6 }} /> : <Play size={14} style={{ marginRight: 6 }} />}
                        {isActive ? 'Pause' : 'Start Focus'}
                    </button>
                    <button 
                        onClick={() => switchMode(mode)} 
                        className="btn-secondary"
                        style={{ padding: '12px 30px' }}
                    >
                        <RotateCcw size={14} style={{ marginRight: 6 }} /> Reset
                    </button>
                </div>
            </div>
        </div>
    );
}

// 6. Exam Countdown Timer
interface Exam {
    id: string;
    name: string;
    date: string;
}
export function ExamCountdown() {
    const [exams, setExams] = useState<Exam[]>([]);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [now, setNow] = useState(Date.now());

    // Load/Save from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('exam_countdowns');
        if (stored) setExams(JSON.parse(stored));

        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const addExam = () => {
        if (!name.trim() || !date) {
            toast.error('Please enter exam name and date');
            return;
        }
        const updated = [...exams, { id: Date.now().toString(), name, date }];
        setExams(updated);
        localStorage.setItem('exam_countdowns', JSON.stringify(updated));
        setName('');
        setDate('');
        toast.success('Exam Countdown added!');
    };

    const deleteExam = (id: string) => {
        const updated = exams.filter(e => e.id !== id);
        setExams(updated);
        localStorage.setItem('exam_countdowns', JSON.stringify(updated));
    };

    const getRemaining = (targetDateStr: string) => {
        const target = new Date(targetDateStr).getTime();
        const diff = target - now;
        if (diff <= 0) return 'Passed';
        
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        return `${d}d ${h}h ${m}m ${s}s`;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1rem', color: 'var(--text-primary)' }}>Set Exam Countdown</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr auto', gap: 12, alignItems: 'end' }}>
                    <div>
                        <label style={labelStyle}>Exam / Deadline Name</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Physics Final Exam"
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Date & Time</label>
                        <input 
                            type="datetime-local" 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                            style={inputStyle}
                        />
                    </div>
                    <button onClick={addExam} className="btn-primary" style={{ height: 42, padding: '0 16px' }}>
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            <div style={cardStyle}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1rem', color: 'var(--text-primary)' }}>Countdowns</h3>
                {exams.length === 0 ? (
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>No countdowns set. Add one above.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {exams.map(e => (
                            <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-subtle)', borderRadius: 12 }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{e.name}</span>
                                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{new Date(e.date).toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                    <span style={{ fontSize: '0.92rem', fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                                        {getRemaining(e.date)}
                                    </span>
                                    <button onClick={() => deleteExam(e.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// 7 & 8. Resume Builder & Internship Resume Builder (Combined, with internship specific tags)
interface ResumeData {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    education: string;
    skills: string;
    projects: string;
    experience: string;
}
export function ResumeBuilder({ isInternship = false }: { isInternship?: boolean }) {
    const [data, setData] = useState<ResumeData>({
        name: 'Alex Johnson',
        title: isInternship ? 'Aspiring Software Engineering Intern' : 'Junior Web Developer',
        email: 'alex.j@example.com',
        phone: '+1 (555) 019-2834',
        location: 'Chicago, IL',
        education: 'B.S. in Computer Science - University of Chicago (Graduation May 2027)\nGPA: 3.8/4.0',
        skills: 'JavaScript, React, Node.js, Next.js, Python, Git, HTML/CSS',
        projects: 'VisualizeMyData (Personal Project) - Built a browser-based analytics panel using React & Recharts.\nStudyTimer extension - Created a productivity Chrome extension with 5k active users.',
        experience: isInternship 
            ? 'Coding Club Tutor - Mentored 30+ freshmen students in introductory Python and data structures.\nFreelance Frontend Developer - Designed standard web landing pages for local startup companies.'
            : 'Software Engineer Co-op - Tech Solutions Inc. (6 months co-op position building APIs).\nFreelance Frontend Developer - Designed standard web landing pages for local startup companies.'
    });

    const handlePrint = () => {
        window.print();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={cardStyle}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {isInternship ? 'Internship Resume Details' : 'Resume Details'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={grid2Style}>
                        <div>
                            <label style={labelStyle}>Full Name</label>
                            <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Target Title</label>
                            <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} style={inputStyle} />
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                        <div>
                            <label style={labelStyle}>Email</label>
                            <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Phone</label>
                            <input type="text" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Location</label>
                            <input type="text" value={data.location} onChange={(e) => setData({ ...data, location: e.target.value })} style={inputStyle} />
                        </div>
                    </div>
                    <div>
                        <label style={labelStyle}>Education</label>
                        <textarea rows={3} value={data.education} onChange={(e) => setData({ ...data, education: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>
                    <div>
                        <label style={labelStyle}>Skills (Comma Separated)</label>
                        <textarea rows={2} value={data.skills} onChange={(e) => setData({ ...data, skills: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>
                    <div>
                        <label style={labelStyle}>Key Projects</label>
                        <textarea rows={3} value={data.projects} onChange={(e) => setData({ ...data, projects: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>
                    <div>
                        <label style={labelStyle}>Experience / Extra-Curriculars</label>
                        <textarea rows={3} value={data.experience} onChange={(e) => setData({ ...data, experience: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>
                </div>
            </div>

            {/* Print/Preview area */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                <button onClick={handlePrint} className="btn-primary">
                    <Printer size={14} style={{ marginRight: 6 }} /> Print / Export to PDF
                </button>
            </div>

            {/* Live Resume Layout preview matching resume styling */}
            <div id="printable-resume-preview" style={{ 
                background: '#ffffff', color: '#000000', padding: '40px 32px', 
                borderRadius: 12, border: '1px solid var(--border-subtle)',
                fontFamily: 'Georgia, serif', lineHeight: 1.5, boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
                <div style={{ textAlign: 'center', borderBottom: '2px solid #333', paddingBottom: 12, marginBottom: 20 }}>
                    <h2 style={{ fontSize: '1.65rem', margin: '0 0 4px', fontWeight: 'bold', fontFamily: 'Helvetica, Arial, sans-serif' }}>{data.name}</h2>
                    <p style={{ fontSize: '0.85rem', color: '#555', margin: '0 0 6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{data.title}</p>
                    <p style={{ fontSize: '0.8rem', color: '#444', margin: 0 }}>
                        {data.email} | {data.phone} | {data.location}
                    </p>
                </div>

                <div style={{ marginBottom: 16 }}>
                    <h4 style={resumeHeadingStyle}>EDUCATION</h4>
                    <div style={{ fontSize: '0.85rem', whiteSpace: 'pre-line' }}>{data.education}</div>
                </div>

                <div style={{ marginBottom: 16 }}>
                    <h4 style={resumeHeadingStyle}>TECHNICAL SKILLS</h4>
                    <div style={{ fontSize: '0.85rem' }}>{data.skills}</div>
                </div>

                <div style={{ marginBottom: 16 }}>
                    <h4 style={resumeHeadingStyle}>PROJECTS</h4>
                    <div style={{ fontSize: '0.85rem', whiteSpace: 'pre-line' }}>{data.projects}</div>
                </div>

                <div>
                    <h4 style={resumeHeadingStyle}>EXPERIENCE</h4>
                    <div style={{ fontSize: '0.85rem', whiteSpace: 'pre-line' }}>{data.experience}</div>
                </div>
            </div>

            {/* Embed print-only CSS override */}
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #printable-resume-preview, #printable-resume-preview * {
                        visibility: visible;
                    }
                    #printable-resume-preview {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        border: none !important;
                        box-shadow: none !important;
                        padding: 0 !important;
                    }
                }
            `}</style>
        </div>
    );
}

const resumeHeadingStyle: React.CSSProperties = {
    fontSize: '0.82rem',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd',
    paddingBottom: 4,
    marginBottom: 8,
    color: '#222',
    letterSpacing: '0.08em',
    fontFamily: 'Helvetica, Arial, sans-serif'
};

export function InternshipResumeBuilder() {
    return <ResumeBuilder isInternship={true} />;
}

// 9. Cover Page Generator
export function CoverPageGenerator() {
    const [title, setTitle] = useState('DETERMINATION OF LIQUID MOISTURE CONTENT');
    const [subject, setSubject] = useState('Food Processing Lab (FT-302)');
    const [submittedTo, setSubmittedTo] = useState('Dr. Sarah Bennett\nAssistant Professor');
    const [submittedBy, setSubmittedBy] = useState('James C. R.\nRoll Number: 26038291');
    const [date, setDate] = useState('July 15, 2026');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={cardStyle}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1rem', color: 'var(--text-primary)' }}>Cover Page Variables</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={labelStyle}>Assignment Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Subject / Course</label>
                        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} style={inputStyle} />
                    </div>
                    <div style={grid2Style}>
                        <div>
                            <label style={labelStyle}>Submitted To</label>
                            <textarea rows={2} value={submittedTo} onChange={(e) => setSubmittedTo(e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
                        </div>
                        <div>
                            <label style={labelStyle}>Submitted By</label>
                            <textarea rows={2} value={submittedBy} onChange={(e) => setSubmittedBy(e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
                        </div>
                    </div>
                    <div>
                        <label style={labelStyle}>Date of Submission</label>
                        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={() => window.print()} className="btn-primary">
                    <Printer size={14} style={{ marginRight: 6 }} /> Print / Export PDF
                </button>
            </div>

            {/* Printable Preview layout */}
            <div id="printable-cover-preview" style={{ 
                background: '#ffffff', color: '#000000', padding: '60px 50px', 
                borderRadius: 12, border: '1px solid var(--border-subtle)',
                fontFamily: 'Times New Roman, Times, serif', textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)', minHeight: '600px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                position: 'relative'
            }}>
                {/* Border Frame */}
                <div style={{ position: 'absolute', inset: 15, border: '4px double #333' }} />

                <div style={{ zIndex: 1, marginTop: 40 }}>
                    <p style={{ fontSize: '1rem', fontWeight: 'bold', letterSpacing: '0.1em', margin: 0 }}>ASSIGNMENT REPORT</p>
                </div>

                <div style={{ zIndex: 1, padding: '0 20px' }}>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '20px 0 10px', lineHeight: 1.3 }}>{title}</h1>
                    <div style={{ width: '80px', height: '2px', background: '#333', margin: '20px auto' }} />
                    <p style={{ fontSize: '1.15rem', fontStyle: 'italic', margin: 0 }}>Subject: {subject}</p>
                </div>

                <div style={{ zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, textAlign: 'left', width: '85%', margin: '0 auto 60px' }}>
                    <div>
                        <p style={{ fontSize: '0.85rem', fontWeight: 'bold', margin: '0 0 6px', color: '#555' }}>SUBMITTED TO:</p>
                        <p style={{ fontSize: '0.95rem', margin: 0, whiteSpace: 'pre-line', lineHeight: 1.4 }}>{submittedTo}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.85rem', fontWeight: 'bold', margin: '0 0 6px', color: '#555' }}>SUBMITTED BY:</p>
                        <p style={{ fontSize: '0.95rem', margin: 0, whiteSpace: 'pre-line', lineHeight: 1.4 }}>{submittedBy}</p>
                    </div>
                </div>

                <div style={{ zIndex: 1, marginBottom: 30 }}>
                    <p style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>DATE OF SUBMISSION: {date}</p>
                </div>
            </div>

            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #printable-cover-preview, #printable-cover-preview * {
                        visibility: visible;
                    }
                    #printable-cover-preview {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        border: none !important;
                        box-shadow: none !important;
                        padding: 40px !important;
                    }
                }
            `}</style>
        </div>
    );
}
