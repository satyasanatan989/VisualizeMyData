'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Download, QrCode, Barcode, Calendar, Activity, Percent, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { QRCode } from '@/lib/qr';
import { drawBarcode } from '@/lib/barcode';

interface ToolProps {
    onDone?: () => void;
}

// 1. QR Code Generator
export function QrCodeGenerator({ onDone }: ToolProps) {
    const [text, setText] = useState('https://visualizemydata.in');
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [scale, setScale] = useState(8);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const generate = () => {
        if (!canvasRef.current || !text) return;
        try {
            const qr = new QRCode(text);
            qr.draw(canvasRef.current, scale, 4, fgColor, bgColor);
            if (onDone) onDone();
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        generate();
    }, [text, fgColor, bgColor, scale]);

    const handleDownload = () => {
        if (!canvasRef.current) return;
        const link = document.createElement('a');
        link.href = canvasRef.current.toDataURL('image/png');
        link.download = 'qr_code.png';
        link.click();
        toast.success('Downloaded QR code!');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={labelStyle}>QR Code Content (Text or URL)</label>
                        <input 
                            type="text" 
                            value={text} 
                            onChange={(e) => setText(e.target.value)} 
                            placeholder="Enter link or text..."
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div>
                            <label style={labelStyle}>Foreground Color</label>
                            <input 
                                type="color" 
                                value={fgColor} 
                                onChange={(e) => setFgColor(e.target.value)} 
                                style={{ width: '100%', height: 38, padding: 2, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 8, cursor: 'pointer' }}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Background Color</label>
                            <input 
                                type="color" 
                                value={bgColor} 
                                onChange={(e) => setBgColor(e.target.value)} 
                                style={{ width: '100%', height: 38, padding: 2, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 8, cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <canvas ref={canvasRef} style={{ border: '1px solid var(--border-subtle)', borderRadius: 12, background: '#fff', maxWidth: '100%', height: 'auto' }} />
                <button onClick={handleDownload} className="btn-primary" style={{ width: '100%', maxWidth: 260 }}>
                    <Download size={14} /> Download QR Code PNG
                </button>
            </div>
        </div>
    );
}

// 2. Barcode Generator
export function BarcodeGenerator({ onDone }: ToolProps) {
    const [text, setText] = useState('12345678');
    const [scale, setScale] = useState(2);
    const [height, setHeight] = useState(80);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [valid, setValid] = useState(true);

    const generate = () => {
        if (!canvasRef.current || !text) return;
        const ok = drawBarcode(canvasRef.current, text, scale, height, '#000000', '#ffffff');
        setValid(ok);
        if (ok && onDone) onDone();
    };

    useEffect(() => {
        generate();
    }, [text, scale, height]);

    const handleDownload = () => {
        if (!canvasRef.current || !valid) return;
        const link = document.createElement('a');
        link.href = canvasRef.current.toDataURL('image/png');
        link.download = `barcode_${text}.png`;
        link.click();
        toast.success('Downloaded barcode!');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={labelStyle}>Barcode Text (Alphanumeric Code 39)</label>
                        <input 
                            type="text" 
                            value={text} 
                            onChange={(e) => setText(e.target.value)} 
                            placeholder="e.g. 12345678"
                            style={inputStyle}
                        />
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Supports: A-Z, 0-9, space, and symbols (-, ., $, /, +, %, *)</span>
                    </div>

                    <div>
                        <label style={labelStyle}>Barcode Height: {height}px</label>
                        <input 
                            type="range" 
                            min="40" 
                            max="150" 
                            value={height} 
                            onChange={(e) => setHeight(parseInt(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
                        />
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                {valid ? (
                    <>
                        <canvas ref={canvasRef} style={{ border: '1px solid var(--border-subtle)', borderRadius: 12, background: '#fff', maxWidth: '100%', height: 'auto' }} />
                        <button onClick={handleDownload} className="btn-primary" style={{ width: '100%', maxWidth: 260 }}>
                            <Download size={14} /> Download Barcode PNG
                        </button>
                    </>
                ) : (
                    <div style={{ padding: '14px 20px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 10, color: '#f87171', fontSize: '0.825rem', textAlign: 'center', width: '100%' }}>
                        ⚠️ Invalid characters detected. Please use only numbers, uppercase letters, spaces, or symbols (-, ., $, /, +, %).
                    </div>
                )}
            </div>
        </div>
    );
}

// 3. Age Calculator
export function AgeCalculator({ onDone }: ToolProps) {
    const [dob, setDob] = useState('2000-01-01');
    const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
    const [ageStats, setAgeStats] = useState<any>(null);

    const calculate = () => {
        if (!dob || !targetDate) return;
        const birth = new Date(dob);
        const target = new Date(targetDate);
        if (birth > target) {
            toast.error('Date of birth cannot be after target date!');
            setAgeStats(null);
            return;
        }

        const diffTime = Math.abs(target.getTime() - birth.getTime());
        
        // Exact years/months/days calculation
        let years = target.getFullYear() - birth.getFullYear();
        let months = target.getMonth() - birth.getMonth();
        let days = target.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            // Find days in previous month
            const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
            days += prevMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        // Totals
        const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = years * 12 + months;
        const totalHours = totalDays * 24;
        const totalMinutes = totalHours * 60;

        // Next birthday countdown
        const nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBday < target) {
            nextBday.setFullYear(target.getFullYear() + 1);
        }
        const bdayDiff = nextBday.getTime() - target.getTime();
        const bdayDays = Math.ceil(bdayDiff / (1000 * 60 * 60 * 24));

        setAgeStats({
            years, months, days,
            totalMonths, totalWeeks, totalDays, totalHours, totalMinutes,
            bdayDays
        });
        if (onDone) onDone();
    };

    useEffect(() => {
        calculate();
    }, [dob, targetDate]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                        <label style={labelStyle}>Date of Birth</label>
                        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Age at the Date of</label>
                        <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} style={inputStyle} />
                    </div>
                </div>
            </div>

            {ageStats && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* Primary Age */}
                    <div style={{ textAlign: 'center', background: 'rgba(186,158,255,0.06)', border: '1px solid rgba(186,158,255,0.2)', padding: '24px', borderRadius: 16 }}>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#cdcdff', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Your Age is</p>
                        <h2 style={{ margin: '8px 0 0', fontWeight: 900, color: '#ba9eff', fontSize: '2rem' }}>
                            {ageStats.years} Years, {ageStats.months} Months, {ageStats.days} Days
                        </h2>
                    </div>

                    {/* Birthday countdown */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', padding: '14px 20px', borderRadius: 12 }}>
                        <span style={{ fontSize: '1.5rem' }}>🎂</span>
                        <div>
                            <p style={{ margin: 0, fontSize: '0.74rem', color: 'var(--text-muted)' }}>Next Birthday Countdown</p>
                            <p style={{ margin: '2px 0 0', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                                {ageStats.bdayDays === 365 || ageStats.bdayDays === 0 ? "Happy Birthday! Today's the day! 🎉" : `${ageStats.bdayDays} days remaining.`}
                            </p>
                        </div>
                    </div>

                    {/* Breakdown totals */}
                    <div>
                        <h4 style={{ margin: '0 0 12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Detailed Age Metrics</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
                            <SubStatCard label="Total Months" value={`${ageStats.totalMonths} months`} />
                            <SubStatCard label="Total Weeks" value={`${ageStats.totalWeeks} weeks`} />
                            <SubStatCard label="Total Days" value={`${ageStats.totalDays} days`} />
                            <SubStatCard label="Total Hours" value={`${ageStats.totalHours.toLocaleString()} hours`} />
                            <SubStatCard label="Total Minutes" value={`${ageStats.totalMinutes.toLocaleString()} min`} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// 4. BMI Calculator
export function BmiCalculator({ onDone }: ToolProps) {
    const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
    const [weight, setWeight] = useState(70); // kg or lbs
    const [height, setHeight] = useState(175); // cm or inches
    
    // Imperial specific
    const [ft, setFt] = useState(5);
    const [inch, setInch] = useState(9);

    const [bmi, setBmi] = useState<number | null>(null);

    const calculate = () => {
        let w = weight;
        let h = height;

        if (unit === 'imperial') {
            const totalInches = ft * 12 + inch;
            h = totalInches * 2.54; // convert to cm
            w = weight * 0.453592; // convert to kg
        }

        if (w > 0 && h > 0) {
            const hMeter = h / 100;
            const score = w / (hMeter * hMeter);
            setBmi(parseFloat(score.toFixed(1)));
            if (onDone) onDone();
        } else {
            setBmi(null);
        }
    };

    useEffect(() => {
        calculate();
    }, [unit, weight, height, ft, inch]);

    const getBmiDetails = () => {
        if (!bmi) return { label: 'N/A', color: 'var(--text-muted)', desc: '' };
        if (bmi < 18.5) return { label: 'Underweight', color: '#60a5fa', desc: 'BMI is less than 18.5. Consider a balanced diet to gain healthy weight.' };
        if (bmi < 25) return { label: 'Normal Weight', color: '#10b981', desc: 'BMI is between 18.5 and 24.9. Maintain your current active lifestyle!' };
        if (bmi < 30) return { label: 'Overweight', color: '#f59e0b', desc: 'BMI is between 25 and 29.9. Regular exercise and nutritional changes can help.' };
        return { label: 'Obese', color: '#ef4444', desc: 'BMI is 30 or greater. Consult with a doctor or health professional for advice.' };
    };

    const details = getBmiDetails();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Unit Toggle */}
            <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => { setUnit('metric'); setWeight(70); setHeight(175); }} style={unit === 'metric' ? tabActiveStyle : tabStyle}>Metric (cm, kg)</button>
                <button onClick={() => { setUnit('imperial'); setWeight(154); }} style={unit === 'imperial' ? tabActiveStyle : tabStyle}>Imperial (ft/in, lbs)</button>
            </div>

            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {unit === 'metric' ? (
                        <>
                            <div>
                                <label style={labelStyle}>Height: {height} cm</label>
                                <input type="range" min="100" max="230" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-primary)' }} />
                            </div>
                            <div>
                                <label style={labelStyle}>Weight: {weight} kg</label>
                                <input type="range" min="30" max="180" value={weight} onChange={(e) => setWeight(parseInt(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-primary)' }} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div>
                                    <label style={labelStyle}>Height (Feet)</label>
                                    <input type="number" min="3" max="8" value={ft} onChange={(e) => setFt(parseInt(e.target.value) || 0)} style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Height (Inches)</label>
                                    <input type="number" min="0" max="11" value={inch} onChange={(e) => setInch(parseInt(e.target.value) || 0)} style={inputStyle} />
                                </div>
                            </div>
                            <div>
                                <label style={labelStyle}>Weight (lbs)</label>
                                <input type="number" min="50" max="400" value={weight} onChange={(e) => setWeight(parseInt(e.target.value) || 0)} style={inputStyle} />
                            </div>
                        </>
                    )}
                </div>
            </div>

            {bmi && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', padding: 20, borderRadius: 16 }}>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>BODY MASS INDEX (BMI) SCORE</p>
                        <h2 style={{ margin: '6px 0', fontSize: '2.5rem', fontWeight: 900, color: details.color }}>{bmi}</h2>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: details.color, textTransform: 'uppercase' }}>{details.label}</span>
                        <p style={{ margin: '10px 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>{details.desc}</p>
                    </div>

                    {/* Scale bar indicator */}
                    <div style={{ position: 'relative', width: '100%', height: 8, background: 'linear-gradient(90deg, #60a5fa 0%, #10b981 30%, #f59e0b 60%, #ef4444 100%)', borderRadius: 4 }}>
                        {/* Dot cursor indicating BMI */}
                        <div style={{
                            position: 'absolute',
                            left: `${Math.min(100, Math.max(0, ((bmi - 15) / 25) * 100))}%`,
                            top: -4,
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            background: '#fff',
                            border: `3px solid ${details.color}`,
                            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                            transform: 'translateX(-50%)',
                            transition: 'left 0.3s ease'
                        }} />
                    </div>
                </div>
            )}
        </div>
    );
}

// 5. Percentage Calculator
export function PercentageCalculator({ onDone }: ToolProps) {
    // Calculator Form 1: What is X% of Y?
    const [f1Pct, setF1Pct] = useState('10');
    const [f1Val, setF1Val] = useState('200');
    const [f1Result, setF1Result] = useState<number | null>(null);

    // Calculator Form 2: X is what percentage of Y?
    const [f2Val1, setF2Val1] = useState('50');
    const [f2Val2, setF2Val2] = useState('200');
    const [f2Result, setF2Result] = useState<number | null>(null);

    // Calculator Form 3: What is the pct change from X to Y?
    const [f3Val1, setF3Val1] = useState('100');
    const [f3Val2, setF3Val2] = useState('150');
    const [f3Result, setF3Result] = useState<{ val: number; dir: 'increase' | 'decrease' | 'none' } | null>(null);

    useEffect(() => {
        const x = parseFloat(f1Pct);
        const y = parseFloat(f1Val);
        if (!isNaN(x) && !isNaN(y)) setF1Result(parseFloat(((x / 100) * y).toFixed(2)));
        else setF1Result(null);
    }, [f1Pct, f1Val]);

    useEffect(() => {
        const x = parseFloat(f2Val1);
        const y = parseFloat(f2Val2);
        if (!isNaN(x) && !isNaN(y) && y !== 0) setF2Result(parseFloat(((x / y) * 100).toFixed(2)));
        else setF2Result(null);
    }, [f2Val1, f2Val2]);

    useEffect(() => {
        const x = parseFloat(f3Val1);
        const y = parseFloat(f3Val2);
        if (!isNaN(x) && !isNaN(y)) {
            if (x === 0) {
                setF3Result(null);
                return;
            }
            const diff = y - x;
            const pct = (diff / x) * 100;
            setF3Result({
                val: parseFloat(Math.abs(pct).toFixed(2)),
                dir: pct > 0 ? 'increase' : pct < 0 ? 'decrease' : 'none'
            });
        } else {
            setF3Result(null);
        }
    }, [f3Val1, f3Val2]);

    useEffect(() => {
        if (onDone) onDone();
    }, [f1Result, f2Result, f3Result]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Form 1 */}
            <div style={cardStyle}>
                <h4 style={{ margin: '0 0 14px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>1. What is X% of Y?</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>What is</span>
                    <input type="number" value={f1Pct} onChange={(e) => setF1Pct(e.target.value)} style={{ ...inputStyle, width: 80 }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>% of</span>
                    <input type="number" value={f1Val} onChange={(e) => setF1Val(e.target.value)} style={{ ...inputStyle, width: 100 }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>= {f1Result !== null ? f1Result : '?'}</span>
                </div>
            </div>

            {/* Form 2 */}
            <div style={cardStyle}>
                <h4 style={{ margin: '0 0 14px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>2. X is what percent of Y?</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <input type="number" value={f2Val1} onChange={(e) => setF2Val1(e.target.value)} style={{ ...inputStyle, width: 90 }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>is what percent of</span>
                    <input type="number" value={f2Val2} onChange={(e) => setF2Val2(e.target.value)} style={{ ...inputStyle, width: 100 }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>= {f2Result !== null ? `${f2Result}%` : '?'}</span>
                </div>
            </div>

            {/* Form 3 */}
            <div style={cardStyle}>
                <h4 style={{ margin: '0 0 14px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>3. Percentage Increase / Decrease</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>From</span>
                    <input type="number" value={f3Val1} onChange={(e) => setF3Val1(e.target.value)} style={{ ...inputStyle, width: 90 }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>to</span>
                    <input type="number" value={f3Val2} onChange={(e) => setF3Val2(e.target.value)} style={{ ...inputStyle, width: 90 }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        = {f3Result !== null ? `${f3Result.val}% ${f3Result.dir}` : '?'}
                    </span>
                </div>
            </div>
        </div>
    );
}

// 6. Unit Converter
const CONVERSIONS: Record<string, { units: string[]; factors: Record<string, number> | ((val: number, from: string, to: string) => number) }> = {
    length: {
        units: ['Meter (m)', 'Kilometer (km)', 'Centimeter (cm)', 'Millimeter (mm)', 'Mile (mi)', 'Yard (yd)', 'Foot (ft)', 'Inch (in)'],
        factors: {
            'Meter (m)': 1,
            'Kilometer (km)': 1000,
            'Centimeter (cm)': 0.01,
            'Millimeter (mm)': 0.001,
            'Mile (mi)': 1609.34,
            'Yard (yd)': 0.9144,
            'Foot (ft)': 0.3048,
            'Inch (in)': 0.0254
        }
    },
    weight: {
        units: ['Kilogram (kg)', 'Gram (g)', 'Milligram (mg)', 'Pound (lb)', 'Ounce (oz)'],
        factors: {
            'Kilogram (kg)': 1,
            'Gram (g)': 0.001,
            'Milligram (mg)': 0.000001,
            'Pound (lb)': 0.453592,
            'Ounce (oz)': 0.0283495
        }
    },
    temperature: {
        units: ['Celsius (°C)', 'Fahrenheit (°F)', 'Kelvin (K)'],
        factors: (val: number, from: string, to: string) => {
            let c = val;
            if (from === 'Fahrenheit (°F)') c = (val - 32) * 5/9;
            if (from === 'Kelvin (K)') c = val - 273.15;

            if (to === 'Celsius (°C)') return c;
            if (to === 'Fahrenheit (°F)') return c * 9/5 + 32;
            if (to === 'Kelvin (K)') return c + 273.15;
            return val;
        }
    },
    area: {
        units: ['Square Meter (㎡)', 'Square Kilometer (㎢)', 'Square Mile (sq mi)', 'Acre (ac)', 'Hectare (ha)'],
        factors: {
            'Square Meter (㎡)': 1,
            'Square Kilometer (㎢)': 1000000,
            'Square Mile (sq mi)': 2589988.11,
            'Acre (ac)': 4046.86,
            'Hectare (ha)': 10000
        }
    },
    volume: {
        units: ['Liter (L)', 'Milliliter (mL)', 'Gallon (gal)', 'Quart (qt)', 'Cup (cup)'],
        factors: {
            'Liter (L)': 1,
            'Milliliter (mL)': 0.001,
            'Gallon (gal)': 3.78541,
            'Quart (qt)': 0.946353,
            'Cup (cup)': 0.236588
        }
    }
};

export function UnitConverter({ onDone }: ToolProps) {
    const [cat, setCat] = useState('length');
    const [val, setVal] = useState('1');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [result, setResult] = useState<number | null>(null);

    // Reset units when category changes
    useEffect(() => {
        const units = CONVERSIONS[cat].units;
        setFrom(units[0]);
        setTo(units[1] || units[0]);
        setResult(null);
    }, [cat]);

    useEffect(() => {
        const inputVal = parseFloat(val);
        if (isNaN(inputVal)) {
            setResult(null);
            return;
        }

        const data = CONVERSIONS[cat];
        if (typeof data.factors === 'function') {
            setResult(parseFloat(data.factors(inputVal, from, to).toFixed(4)));
        } else {
            const fromFactor = data.factors[from];
            const toFactor = data.factors[to];
            if (fromFactor && toFactor) {
                // Convert to base unit, then to target unit
                const baseVal = inputVal * fromFactor;
                setResult(parseFloat((baseVal / toFactor).toFixed(4)));
            }
        }
        if (onDone) onDone();
    }, [val, from, to, cat]);

    const activeCat = CONVERSIONS[cat];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Category selection */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {Object.keys(CONVERSIONS).map((key) => (
                    <button 
                        key={key} 
                        onClick={() => setCat(key)} 
                        style={cat === key ? tabActiveStyle : tabStyle}
                    >
                        {key.toUpperCase()}
                    </button>
                ))}
            </div>

            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={labelStyle}>Value to Convert</label>
                        <input type="number" value={val} onChange={(e) => setVal(e.target.value)} style={inputStyle} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div>
                            <label style={labelStyle}>From Unit</label>
                            <select value={from} onChange={(e) => setFrom(e.target.value)} style={selectStyle} className="full-width">
                                {activeCat.units.map((u) => <option key={u} value={u}>{u}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>To Unit</label>
                            <select value={to} onChange={(e) => setTo(e.target.value)} style={selectStyle} className="full-width">
                                {activeCat.units.map((u) => <option key={u} value={u}>{u}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {result !== null && (
                <div style={{ textAlign: 'center', background: 'rgba(186,158,255,0.06)', border: '1px solid rgba(186,158,255,0.15)', padding: '20px', borderRadius: 16 }}>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#cdcdff', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Result</p>
                    <h2 style={{ margin: '6px 0 0', fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.75rem' }}>
                        {val} {from.split(' ')[0]} = <span style={{ color: '#ba9eff' }}>{result} {to.split(' ')[0]}</span>
                    </h2>
                </div>
            )}
            
            <style>{`
                select.full-width {
                    width: 100% !important;
                }
            `}</style>
        </div>
    );
}

// ── UI Helpers ──

function SubStatCard({ label, value }: { label: string; value: string }) {
    return (
        <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-subtle)', padding: 10, borderRadius: 10, textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{label}</p>
            <p style={{ margin: '2px 0 0', fontWeight: 700, fontSize: '0.825rem', color: 'var(--text-primary)' }}>{value}</p>
        </div>
    );
}

// ── Styles ──

const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: 8,
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

const selectStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderRadius: 8,
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-subtle)',
    color: 'var(--text-primary)',
    fontSize: '0.85rem',
    cursor: 'pointer',
    outline: 'none',
};

const cardStyle: React.CSSProperties = {
    background: 'rgba(23, 26, 30, 0.45)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 16,
    padding: 20,
};

const tabStyle: React.CSSProperties = {
    flex: 1,
    padding: '8px 12px',
    borderRadius: 8,
    background: 'var(--bg-glass)',
    border: '1px solid var(--border-subtle)',
    color: 'var(--text-secondary)',
    fontSize: '0.78rem',
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
