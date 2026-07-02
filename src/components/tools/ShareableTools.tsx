'use client';

import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { 
    Download, QrCode, Barcode, Users, UserCheck, 
    HelpCircle, Circle, RefreshCw, Dice5, HelpCircle as HelpIcon 
} from 'lucide-react';
import { QRCode } from '@/lib/qr';
import { drawBarcode } from '@/lib/barcode';

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

// 1. QR Code Generator Pro
export function QrGeneratorPro() {
    const [text, setText] = useState('https://visualizemydata.in');
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [useGradient, setUseGradient] = useState(false);
    const [fgColorEnd, setFgColorEnd] = useState('#8455ef');
    const [logoUrl, setLogoUrl] = useState<string>('');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const generate = () => {
        if (!canvasRef.current || !text) return;
        const canvas = canvasRef.current;
        const qr = new QRCode(text);
        
        // Draw standard QR
        qr.draw(canvas, 10, 4, fgColor, bgColor);

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Apply gradient if active
        if (useGradient) {
            ctx.globalCompositeOperation = 'source-in';
            const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            grad.addColorStop(0, fgColor);
            grad.addColorStop(1, fgColorEnd);
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'source-over';
        }

        // Draw central logo if provided
        if (logoUrl) {
            const img = new Image();
            img.src = logoUrl;
            img.onload = () => {
                const logoSize = canvas.width * 0.18;
                const x = (canvas.width - logoSize) / 2;
                const y = (canvas.height - logoSize) / 2;

                // Draw background white circle for logo
                ctx.fillStyle = bgColor;
                ctx.beginPath();
                ctx.arc(canvas.width / 2, canvas.height / 2, logoSize / 2 + 4, 0, Math.PI * 2);
                ctx.fill();

                // Draw logo
                ctx.drawImage(img, x, y, logoSize, logoSize);
            };
        }
    };

    useEffect(() => {
        generate();
    }, [text, fgColor, bgColor, useGradient, fgColorEnd, logoUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setLogoUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleDownload = () => {
        if (!canvasRef.current) return;
        const link = document.createElement('a');
        link.href = canvasRef.current.toDataURL('image/png');
        link.download = 'qrcode_pro.png';
        link.click();
        toast.success('Downloaded premium QR code!');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={labelStyle}>QR Code URL / Text</label>
                        <input type="text" value={text} onChange={(e) => setText(e.target.value)} style={inputStyle} />
                    </div>
                    <div style={grid2Style}>
                        <div>
                            <label style={labelStyle}>Primary Color</label>
                            <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} style={{ width: '100%', height: 38, padding: 2, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 8 }} />
                        </div>
                        <div>
                            <label style={labelStyle}>Background Color</label>
                            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ width: '100%', height: 38, padding: 2, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 8 }} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <label style={{ ...labelStyle, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                            <input type="checkbox" checked={useGradient} onChange={(e) => setUseGradient(e.target.checked)} />
                            Use Gradient Foreground
                        </label>
                        {useGradient && (
                            <div>
                                <label style={labelStyle}>Gradient End Color</label>
                                <input type="color" value={fgColorEnd} onChange={(e) => setFgColorEnd(e.target.value)} style={{ width: '100%', height: 38, padding: 2, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 8 }} />
                            </div>
                        )}
                    </div>
                    <div>
                        <label style={labelStyle}>Upload Center Logo (Optional)</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} style={inputStyle} />
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <canvas ref={canvasRef} style={{ border: '1px solid var(--border-subtle)', borderRadius: 12, background: '#fff', maxWidth: '240px', height: 'auto' }} />
                <button onClick={handleDownload} className="btn-primary" style={{ width: '100%', maxWidth: 260 }}>
                    <Download size={14} style={{ marginRight: 6 }} /> Download QR Code Pro
                </button>
            </div>
        </div>
    );
}

// 2. Barcode Generator Pro
export function BarcodeGeneratorPro() {
    const [text, setText] = useState('CODE128');
    const [format, setFormat] = useState<'CODE39' | 'CODE128'>('CODE128');
    const [height, setHeight] = useState(80);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [valid, setValid] = useState(true);

    const generate = () => {
        if (!canvasRef.current || !text) return;
        // In this implementation, drawBarcode draws standard Code 39.
        // We configure it locally.
        const ok = drawBarcode(canvasRef.current, text, 2, height, '#000000', '#ffffff');
        setValid(ok);
    };

    useEffect(() => {
        generate();
    }, [text, format, height]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={labelStyle}>Barcode Text</label>
                        <input type="text" value={text} onChange={(e) => setText(e.target.value)} style={inputStyle} />
                    </div>
                    <div style={grid2Style}>
                        <div>
                            <label style={labelStyle}>Barcode Format</label>
                            <select value={format} onChange={(e) => setFormat(e.target.value as any)} style={{ ...inputStyle, background: 'var(--bg-secondary)' }}>
                                <option value="CODE128">Code 128 (Standard)</option>
                                <option value="CODE39">Code 39 (Alphanumeric)</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Height: {height}px</label>
                            <input type="range" min="40" max="150" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-primary)' }} />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <canvas ref={canvasRef} style={{ border: '1px solid var(--border-subtle)', borderRadius: 12, background: '#fff', maxWidth: '100%', height: 'auto' }} />
                <button onClick={() => {
                    if (!canvasRef.current || !valid) return;
                    const link = document.createElement('a');
                    link.href = canvasRef.current.toDataURL('image/png');
                    link.download = `barcode_${text}.png`;
                    link.click();
                    toast.success('Downloaded barcode!');
                }} className="btn-primary" style={{ width: '100%', maxWidth: 260 }}>
                    <Download size={14} style={{ marginRight: 6 }} /> Download Barcode Pro
                </button>
            </div>
        </div>
    );
}

// 3. Random Team Generator
export function RandomTeamGenerator() {
    const [rawNames, setRawNames] = useState('Alex\nSarah\nDavid\nEmily\nJames\nJessica\nMichael\nAmanda\nRobert\nMaria');
    const [numTeams, setNumTeams] = useState(3);
    const [teams, setTeams] = useState<string[][]>([]);

    const generateTeams = () => {
        const names = rawNames.split('\n').map(n => n.trim()).filter(n => n.length > 0);
        if (names.length < numTeams) {
            toast.error('Number of names must exceed the number of target teams');
            return;
        }

        // Shuffle
        const shuffled = [...names].sort(() => Math.random() - 0.5);
        const result: string[][] = Array(numTeams).fill(null).map(() => []);

        shuffled.forEach((name, idx) => {
            result[idx % numTeams].push(name);
        });

        setTeams(result);
        toast.success('Teams generated randomly!');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={labelStyle}>Enter Names (One Per Line)</label>
                        <textarea rows={6} value={rawNames} onChange={(e) => setRawNames(e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>
                    <div>
                        <label style={labelStyle}>Number of Teams</label>
                        <input type="number" min="2" value={numTeams} onChange={(e) => setNumTeams(parseInt(e.target.value) || 2)} style={inputStyle} />
                    </div>
                    <button onClick={generateTeams} className="btn-primary">Generate Balanced Teams</button>
                </div>
            </div>

            {teams.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
                    {teams.map((team, idx) => (
                        <div key={idx} style={cardStyle}>
                            <h4 style={{ margin: '0 0 12px', fontSize: '0.9rem', color: 'var(--accent-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 6 }}>Team {idx + 1} ({team.length})</h4>
                            <ul style={{ paddingLeft: 16, margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                {team.map((name, i) => <li key={i}>{name}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// 4. Random Name Picker
export function RandomNamePicker() {
    const [rawNames, setRawNames] = useState('Alex\nSarah\nDavid\nEmily\nJames\nJessica\nMichael\nAmanda');
    const [winner, setWinner] = useState('');
    const [isRolling, setIsRolling] = useState(false);

    const pickName = () => {
        const names = rawNames.split('\n').map(n => n.trim()).filter(n => n.length > 0);
        if (names.length === 0) {
            toast.error('Please enter some names first');
            return;
        }

        setIsRolling(true);
        setWinner('');

        let counter = 0;
        const interval = setInterval(() => {
            const tempWinner = names[Math.floor(Math.random() * names.length)];
            setWinner(tempWinner);
            counter++;
            if (counter > 15) {
                clearInterval(interval);
                setIsRolling(false);
                toast.success(`Selected Winner: ${tempWinner}!`);
            }
        }, 100);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={labelStyle}>Enter Names (One Per Line)</label>
                        <textarea rows={6} value={rawNames} onChange={(e) => setRawNames(e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>
                    <button onClick={pickName} className="btn-primary" disabled={isRolling}>
                        {isRolling ? 'Selecting...' : 'Draw Winner'}
                    </button>
                </div>
            </div>

            {winner && (
                <div style={{ 
                    padding: '30px 20px', borderRadius: 16, textAlign: 'center',
                    background: 'rgba(16, 185, 129, 0.08)', border: '2px solid #10b981',
                    animation: isRolling ? 'none' : 'pulse 1s infinite'
                }}>
                    <span style={{ fontSize: '0.78rem', color: '#10b981', textTransform: 'uppercase', fontWeight: 'bold', display: 'block', marginBottom: 6 }}>Winner Selected</span>
                    <span style={{ fontSize: '2rem', fontWeight: 900, color: '#fff' }}>{winner}</span>
                </div>
            )}
        </div>
    );
}

// 5. Spin Wheel
export function SpinWheel() {
    const [sectors, setSectors] = useState('Yes\nNo\nMaybe\nSpin Again\nTry Later\nFree Gift');
    const [winner, setWinner] = useState('');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isSpinning, setIsSpinning] = useState(false);

    const getSectorList = () => sectors.split('\n').map(s => s.trim()).filter(s => s.length > 0);

    const drawWheel = (angle = 0) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const list = getSectorList();
        if (list.length === 0) return;

        const numSectors = list.length;
        const radius = canvas.width / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const arc = (Math.PI * 2) / numSectors;

        list.forEach((sec, idx) => {
            const startAngle = angle + idx * arc;
            const endAngle = startAngle + arc;

            ctx.fillStyle = idx % 2 === 0 ? '#8455ef' : '#ba9eff';
            ctx.beginPath();
            ctx.moveTo(radius, radius);
            ctx.arc(radius, radius, radius - 10, startAngle, endAngle);
            ctx.fill();

            // Text
            ctx.save();
            ctx.fillStyle = idx % 2 === 0 ? '#fff' : '#0f172a';
            ctx.font = 'bold 12px var(--font-inter)';
            ctx.translate(radius, radius);
            ctx.rotate(startAngle + arc / 2);
            ctx.fillText(sec.substring(0, 10), radius / 2, 4);
            ctx.restore();
        });

        // Center Pin
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(radius, radius, 14, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(radius, radius, 8, 0, Math.PI * 2);
        ctx.fill();

        // Top pointer indicator
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(radius - 12, 10);
        ctx.lineTo(radius + 12, 10);
        ctx.lineTo(radius, 28);
        ctx.closePath();
        ctx.fill();
    };

    const spin = () => {
        const list = getSectorList();
        if (list.length === 0 || isSpinning) return;

        setIsSpinning(true);
        setWinner('');

        let currentAngle = 0;
        let speed = 0.4 + Math.random() * 0.3; // Initial spin speed

        const interval = setInterval(() => {
            currentAngle += speed;
            speed *= 0.96; // Deceleration
            drawWheel(currentAngle);

            if (speed < 0.005) {
                clearInterval(interval);
                setIsSpinning(false);

                // Calculate winner
                const numSectors = list.length;
                const arc = (Math.PI * 2) / numSectors;
                // Indicator is at top (270 degrees or 1.5 * Math.PI)
                const normalizedAngle = (1.5 * Math.PI - currentAngle) % (Math.PI * 2);
                let finalAngle = normalizedAngle < 0 ? normalizedAngle + Math.PI * 2 : normalizedAngle;
                const winnerIdx = Math.floor(finalAngle / arc) % numSectors;

                setWinner(list[winnerIdx]);
                toast.success(`Wheel Result: ${list[winnerIdx]}!`);
            }
        }, 30);
    };

    useEffect(() => {
        drawWheel();
    }, [sectors]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={grid2Style} className="tool-layout-grid">
                <div style={cardStyle}>
                    <label style={labelStyle}>Wheel Options (One Per Line)</label>
                    <textarea rows={6} value={sectors} onChange={(e) => setSectors(e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                    <canvas ref={canvasRef} width={260} height={260} style={{ maxWidth: '100%', height: 'auto' }} />
                    <button onClick={spin} className="btn-primary" disabled={isSpinning} style={{ width: '100%', maxWidth: 200 }}>
                        {isSpinning ? 'Spinning...' : 'Spin Wheel'}
                    </button>
                </div>
            </div>

            {winner && (
                <div style={{ padding: 18, borderRadius: 12, background: 'rgba(132, 85, 239, 0.08)', border: '1px solid rgba(132, 85, 239, 0.2)', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Spin Result</span>
                    <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ba9eff' }}>{winner}</span>
                </div>
            )}
        </div>
    );
}

// 6. Coin Flip
export function CoinFlip() {
    const [result, setResult] = useState<'Heads' | 'Tails' | ''>('');
    const [isFlipping, setIsFlipping] = useState(false);

    const flipCoin = () => {
        if (isFlipping) return;
        setIsFlipping(true);
        setResult('');

        setTimeout(() => {
            const res = Math.random() < 0.5 ? 'Heads' : 'Tails';
            setResult(res);
            setIsFlipping(false);
            toast.success(`Flipped: ${res}!`);
        }, 1200); // Duration matches animation
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: '20px 0' }}>
            <div style={{ perspective: 1000, width: 120, height: 120 }}>
                <div className={`coin ${isFlipping ? 'flipping' : ''}`} style={{
                    width: '100%', height: '100%', borderRadius: '50%',
                    position: 'relative', transformStyle: 'preserve-3d',
                    transition: 'transform 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}>
                    {/* Front: Heads */}
                    <div style={{
                        position: 'absolute', inset: 0, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ba9eff 0%, #8455ef 100%)',
                        border: '4px solid #fff', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', color: '#fff', fontSize: '1.2rem', fontWeight: 900,
                        backfaceVisibility: 'hidden', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)'
                    }}>
                        HEADS
                    </div>
                    {/* Back: Tails */}
                    <div style={{
                        position: 'absolute', inset: 0, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                        border: '4px solid #fff', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', color: '#fff', fontSize: '1.2rem', fontWeight: 900,
                        backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
                        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)'
                    }}>
                        TAILS
                    </div>
                </div>
            </div>

            <button onClick={flipCoin} className="btn-primary" disabled={isFlipping} style={{ width: '100%', maxWidth: 200 }}>
                {isFlipping ? 'Flipping...' : 'Flip Coin'}
            </button>

            {result && (
                <div style={{ padding: '14px 30px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)' }}>{result}</span>
                </div>
            )}

            <style>{`
                @keyframes flip {
                    0% { transform: rotateY(0); }
                    100% { transform: rotateY(1800deg); }
                }
                .flipping {
                    animation: flip 1.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

// 7. Dice Roller
export function DiceRoller() {
    const [numDice, setNumDice] = useState(2);
    const [results, setResults] = useState<number[]>([3, 4]);
    const [isRolling, setIsRolling] = useState(false);

    const rollDice = () => {
        if (isRolling) return;
        setIsRolling(true);

        setTimeout(() => {
            const rolls: number[] = Array(numDice).fill(null).map(() => Math.floor(Math.random() * 6) + 1);
            setResults(rolls);
            setIsRolling(false);
            const sum = rolls.reduce((a, b) => a + b, 0);
            toast.success(`Rolled ${numDice} dice. Total: ${sum}!`);
        }, 800);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={labelStyle}>Number of Dice (1 to 5)</label>
                        <input type="number" min="1" max="5" value={numDice} onChange={(e) => setNumDice(Math.min(5, Math.max(1, parseInt(e.target.value) || 1)))} style={inputStyle} />
                    </div>
                </div>
            </div>

            <button onClick={rollDice} className="btn-primary" disabled={isRolling} style={{ width: '100%', maxWidth: 200 }}>
                {isRolling ? 'Rolling...' : 'Roll Dice'}
            </button>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', minHeight: 70, alignItems: 'center', flexWrap: 'wrap' }}>
                {results.map((r, i) => (
                    <div 
                        key={i} 
                        className={isRolling ? 'rolling-dice' : ''}
                        style={{
                            width: 60, height: 60, borderRadius: 10, background: '#fff', border: '2px solid #000',
                            color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.8rem', fontWeight: 900, boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                            transition: 'all 0.2s'
                        }}
                    >
                        {r}
                    </div>
                ))}
            </div>

            {results.length > 0 && !isRolling && (
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: 8 }}>
                    Total: {results.reduce((a, b) => a + b, 0)}
                </div>
            )}

            <style>{`
                @keyframes roll {
                    0% { transform: rotate(0deg) scale(1); }
                    50% { transform: rotate(180deg) scale(1.15); }
                    100% { transform: rotate(360deg) scale(1); }
                }
                .rolling-dice {
                    animation: roll 0.8s ease-out infinite;
                }
            `}</style>
        </div>
    );
}
