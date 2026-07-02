'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Plus, Trash2, Scale, RefreshCw, DollarSign, Activity, Award } from 'lucide-react';

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

// 1. Milk SNF Calculator
export function MilkSnfCalculator() {
    const [clr, setClr] = useState(28); // Corrected Lactometer Reading
    const [fat, setFat] = useState(4.2); // Fat %
    const [snf, setSnf] = useState(0);
    const [ts, setTs] = useState(0);

    useEffect(() => {
        // Standard formula: SNF = (CLR / 4) + (0.21 * FAT) + 0.36
        const snfVal = (clr / 4) + (0.21 * fat) + 0.36;
        setSnf(snfVal);
        setTs(snfVal + fat);
    }, [clr, fat]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={grid2Style}>
                        <div>
                            <label style={labelStyle}>Corrected Lactometer Reading (CLR)</label>
                            <input type="number" value={clr} onChange={(e) => setClr(parseFloat(e.target.value) || 0)} style={inputStyle} step="0.5" />
                        </div>
                        <div>
                            <label style={labelStyle}>Fat Percentage (%)</label>
                            <input type="number" value={fat} onChange={(e) => setFat(parseFloat(e.target.value) || 0)} style={inputStyle} step="0.1" />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ padding: 18, borderRadius: 12, background: 'rgba(132, 85, 239, 0.08)', border: '1px solid rgba(132, 85, 239, 0.2)', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Solids-Not-Fat (SNF)</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ba9eff' }}>{snf.toFixed(2)}%</span>
                </div>
                <div style={{ padding: 18, borderRadius: 12, background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Total Solids (TS)</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#10b981' }}>{ts.toFixed(2)}%</span>
                </div>
            </div>
        </div>
    );
}

// 2. Gerber Fat Calculator
export function GerberFatCalculator() {
    const [reading, setReading] = useState(4.2);
    const [correction, setCorrection] = useState(0.0);
    const [finalFat, setFinalFat] = useState(4.2);

    useEffect(() => {
        setFinalFat(reading + correction);
    }, [reading, correction]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={grid2Style}>
                        <div>
                            <label style={labelStyle}>Butyrometer Reading (%)</label>
                            <input type="number" value={reading} onChange={(e) => setReading(parseFloat(e.target.value) || 0)} style={inputStyle} step="0.1" />
                        </div>
                        <div>
                            <label style={labelStyle}>Calibration Correction Factor</label>
                            <input type="number" value={correction} onChange={(e) => setCorrection(parseFloat(e.target.value) || 0)} style={inputStyle} step="0.05" />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: 20, borderRadius: 12, background: 'rgba(132, 85, 239, 0.08)', border: '1px solid rgba(132, 85, 239, 0.2)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Corrected Fat Percentage</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ba9eff' }}>{finalFat.toFixed(2)}%</span>
            </div>
        </div>
    );
}

// 3. FFA Acidity Calculator
export function FfaCalculator() {
    const [volume, setVolume] = useState(2.4); // Volume of NaOH titrant in mL
    const [normality, setNormality] = useState(0.1); // Normality of NaOH (usually 0.1 N)
    const [weight, setWeight] = useState(10.0); // Sample weight in grams
    const [ffa, setFfa] = useState(0);
    const [acidValue, setAcidValue] = useState(0);

    useEffect(() => {
        if (weight <= 0) return;
        // Formula: FFA % (as Oleic Acid) = (mL of NaOH * Normality of NaOH * 28.2) / Weight of sample
        const ffaPct = (volume * normality * 28.2) / weight;
        setFfa(ffaPct);
        // Acid Value = FFA % * 1.99
        setAcidValue(ffaPct * 1.99);
    }, [volume, normality, weight]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                        <div>
                            <label style={labelStyle}>Titrant Volume (mL)</label>
                            <input type="number" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value) || 0)} style={inputStyle} step="0.1" />
                        </div>
                        <div>
                            <label style={labelStyle}>NaOH Normality (N)</label>
                            <input type="number" value={normality} onChange={(e) => setNormality(parseFloat(e.target.value) || 0)} style={inputStyle} step="0.01" />
                        </div>
                        <div>
                            <label style={labelStyle}>Oil Weight (g)</label>
                            <input type="number" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value) || 0)} style={inputStyle} step="0.1" />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ padding: 18, borderRadius: 12, background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Free Fatty Acids (Oleic Acid %)</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ef4444' }}>{ffa.toFixed(3)}%</span>
                </div>
                <div style={{ padding: 18, borderRadius: 12, background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Acid Value (mg KOH/g)</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#f59e0b' }}>{acidValue.toFixed(3)}</span>
                </div>
            </div>
        </div>
    );
}

// 4. Moisture Basis Converter
export function MoistureBasisConverter() {
    const [moisture, setMoisture] = useState(15.0);
    const [wetToDry, setWetToDry] = useState(true);
    const [result, setResult] = useState(0);

    useEffect(() => {
        if (wetToDry) {
            // DB = WB / (100 - WB) * 100
            if (moisture >= 100) {
                setResult(0);
            } else {
                setResult((moisture / (100 - moisture)) * 100);
            }
        } else {
            // WB = DB / (100 + DB) * 100
            setResult((moisture / (100 + moisture)) * 100);
        }
    }, [moisture, wetToDry]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                        <label style={labelStyle}>Conversion Direction</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, background: 'rgba(255,255,255,0.02)', padding: 4, borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
                            <button onClick={() => setWetToDry(true)} style={{ padding: '8px 0', border: 'none', background: wetToDry ? 'var(--accent-primary)' : 'transparent', color: '#fff', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                                Wet Basis ➔ Dry Basis
                            </button>
                            <button onClick={() => setWetToDry(false)} style={{ padding: '8px 0', border: 'none', background: !wetToDry ? 'var(--accent-primary)' : 'transparent', color: '#fff', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                                Dry Basis ➔ Wet Basis
                            </button>
                        </div>
                    </div>
                    <div>
                        <label style={labelStyle}>Input Moisture Percentage (%)</label>
                        <input type="number" value={moisture} onChange={(e) => setMoisture(parseFloat(e.target.value) || 0)} style={inputStyle} step="0.5" />
                    </div>
                </div>
            </div>

            <div style={{ padding: 20, borderRadius: 12, background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Converted Moisture Percentage</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#10b981' }}>{result.toFixed(2)}% {wetToDry ? 'Dry Basis (DB)' : 'Wet Basis (WB)'}</span>
            </div>
        </div>
    );
}

// 5. Recipe Scaling Calculator
interface Ingredient {
    id: string;
    name: string;
    ratio: number; // percentage of total batch
}
export function RecipeScalingCalculator() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([
        { id: '1', name: 'Wheat Flour', ratio: 60 },
        { id: '2', name: 'Water', ratio: 32 },
        { id: '3', name: 'Sugar', ratio: 6 },
        { id: '4', name: 'Salt', ratio: 2 }
    ]);
    const [targetBatch, setTargetBatch] = useState(500); // Target batch size in kg or g
    const [newIng, setNewIng] = useState({ name: '', ratio: 10 });

    const addIngredient = () => {
        if (!newIng.name.trim()) return;
        setIngredients([
            ...ingredients,
            { id: Date.now().toString(), name: newIng.name, ratio: newIng.ratio }
        ]);
        setNewIng({ name: '', ratio: 10 });
    };

    const deleteIng = (id: string) => {
        setIngredients(ingredients.filter(i => i.id !== id));
    };

    const getSumRatios = () => ingredients.reduce((acc, ing) => acc + ing.ratio, 0);

    const getScaledWeight = (ratio: number) => {
        const totalRatio = getSumRatios();
        if (totalRatio <= 0) return 0;
        return (ratio / totalRatio) * targetBatch;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1rem', color: 'var(--text-primary)' }}>Target Batch Volume</h3>
                <div>
                    <label style={labelStyle}>Total Target Batch Size (e.g. g, kg, lbs)</label>
                    <input type="number" value={targetBatch} onChange={(e) => setTargetBatch(parseFloat(e.target.value) || 0)} style={inputStyle} />
                </div>
            </div>

            <div style={cardStyle}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1rem', color: 'var(--text-primary)' }}>Add Recipe Formulation</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: 12, alignItems: 'end' }}>
                    <div>
                        <label style={labelStyle}>Ingredient Name</label>
                        <input type="text" placeholder="e.g. Yeast" value={newIng.name} onChange={(e) => setNewIng({ ...newIng, name: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Ratio Part (or %)</label>
                        <input type="number" value={newIng.ratio} onChange={(e) => setNewIng({ ...newIng, ratio: parseFloat(e.target.value) || 0 })} style={inputStyle} />
                    </div>
                    <button onClick={addIngredient} className="btn-primary" style={{ height: 42, padding: '0 16px' }}>
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            <div style={cardStyle}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1rem', color: 'var(--text-primary)' }}>Scaled Recipe Formulation</h3>
                {ingredients.length === 0 ? (
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>No ingredients added.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {ingredients.map(ing => (
                            <div key={ing.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-subtle)', borderRadius: 10 }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{ing.name}</span>
                                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Proportion: {ing.ratio} part(s)</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                    <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--accent-primary)' }}>{getScaledWeight(ing.ratio).toFixed(2)} unit(s)</span>
                                    <button onClick={() => deleteIng(ing.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
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

// 6. Food Cost Calculator
export function FoodCostCalculator() {
    const [rawCost, setRawCost] = useState(3.50);
    const [sellingPrice, setSellingPrice] = useState(12.00);
    const [foodCostPct, setFoodCostPct] = useState(0);

    useEffect(() => {
        if (sellingPrice <= 0) return;
        setFoodCostPct((rawCost / sellingPrice) * 100);
    }, [rawCost, sellingPrice]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={grid2Style}>
                        <div>
                            <label style={labelStyle}>Raw Material Cost per Serving ($)</label>
                            <input type="number" value={rawCost} onChange={(e) => setRawCost(parseFloat(e.target.value) || 0)} style={inputStyle} step="0.1" />
                        </div>
                        <div>
                            <label style={labelStyle}>Selling Price per Serving ($)</label>
                            <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)} style={inputStyle} step="0.1" />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: 20, borderRadius: 12, background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Food Cost Percentage</span>
                <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#10b981' }}>{foodCostPct.toFixed(1)}%</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginTop: 4 }}>
                    Ideal range is usually between 28% and 35% for commercial restaurants.
                </span>
            </div>
        </div>
    );
}

// 7. Nutrition facts label calculator
export function NutritionLabelCalculator() {
    const [calories, setCalories] = useState(250);
    const [totalFat, setTotalFat] = useState(9); // grams
    const [sodium, setSodium] = useState(230); // milligrams
    const [carbs, setCarbs] = useState(37); // grams
    const [protein, setProtein] = useState(3); // grams
    const [servingSize, setServingSize] = useState('2/3 cup (55g)');
    const [servingsPerContainer, setServingsPerContainer] = useState('About 8');

    // Daily Value ratios (standard FDA requirements)
    const getFatDV = () => Math.round((totalFat / 78) * 100);
    const getSodiumDV = () => Math.round((sodium / 2300) * 100);
    const getCarbsDV = () => Math.round((carbs / 275) * 100);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={cardStyle}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1rem', color: 'var(--text-primary)' }}>Nutrition Facts Variables</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={grid2Style}>
                        <div>
                            <label style={labelStyle}>Serving Size</label>
                            <input type="text" value={servingSize} onChange={(e) => setServingSize(e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Servings Per Container</label>
                            <input type="text" value={servingsPerContainer} onChange={(e) => setServingsPerContainer(e.target.value)} style={inputStyle} />
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                        <div>
                            <label style={labelStyle}>Calories</label>
                            <input type="number" value={calories} onChange={(e) => setCalories(parseInt(e.target.value) || 0)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Total Fat (g)</label>
                            <input type="number" value={totalFat} onChange={(e) => setTotalFat(parseInt(e.target.value) || 0)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Sodium (mg)</label>
                            <input type="number" value={sodium} onChange={(e) => setSodium(parseInt(e.target.value) || 0)} style={inputStyle} />
                        </div>
                    </div>
                    <div style={grid2Style}>
                        <div>
                            <label style={labelStyle}>Total Carbohydrates (g)</label>
                            <input type="number" value={carbs} onChange={(e) => setCarbs(parseInt(e.target.value) || 0)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Protein (g)</label>
                            <input type="number" value={protein} onChange={(e) => setProtein(parseInt(e.target.value) || 0)} style={inputStyle} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Nutrition facts label render */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ 
                    background: '#ffffff', color: '#000000', padding: '16px 20px', 
                    borderRadius: 4, border: '2px solid #000', width: '280px',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', lineHeight: 1.2
                }}>
                    <h2 style={{ fontSize: '2.1rem', fontWeight: 900, margin: '0 0 4px', letterSpacing: '-0.02em', textAlign: 'left' }}>Nutrition Facts</h2>
                    <p style={{ margin: '0 0 6px', fontSize: '0.8rem', borderBottom: '8px solid #000', paddingBottom: 6 }}>{servingsPerContainer} servings per container</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: 4 }}>
                        <span>Serving size</span>
                        <span>{servingSize}</span>
                    </div>

                    <div style={{ borderBottom: '14px solid #000', paddingBottom: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 900, fontSize: '1.25rem', marginTop: 4 }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.72rem', fontWeight: 'bold' }}>Amount per serving</span>
                            <span>Calories</span>
                        </div>
                        <span style={{ fontSize: '2.2rem' }}>{calories}</span>
                    </div>

                    <div style={{ borderBottom: '1px solid #000', padding: '6px 0', display: 'flex', justifyContent: 'flex-end', fontWeight: 'bold', fontSize: '0.72rem' }}>
                        <span>% Daily Value*</span>
                    </div>

                    <div style={{ borderBottom: '1px solid #000', padding: '8px 0', display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                        <span><strong>Total Fat</strong> {totalFat}g</span>
                        <strong>{getFatDV()}%</strong>
                    </div>

                    <div style={{ borderBottom: '1px solid #000', padding: '8px 0', display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                        <span><strong>Sodium</strong> {sodium}mg</span>
                        <strong>{getSodiumDV()}%</strong>
                    </div>

                    <div style={{ borderBottom: '1px solid #000', padding: '8px 0', display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                        <span><strong>Total Carbohydrate</strong> {carbs}g</span>
                        <strong>{getCarbsDV()}%</strong>
                    </div>

                    <div style={{ borderBottom: '8px solid #000', padding: '8px 0', display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                        <span><strong>Protein</strong> {protein}g</span>
                        <span></span>
                    </div>

                    <p style={{ margin: '8px 0 0', fontSize: '0.62rem', color: '#555', lineHeight: 1.3 }}>
                        * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
                    </p>
                </div>
            </div>
        </div>
    );
}

// 8. Batch Yield Calculator
export function BatchYieldCalculator() {
    const [theoreticalInput, setTheoreticalInput] = useState(120.0); // theoretical input weight in kg
    const [actualOutput, setActualOutput] = useState(105.0); // actual product output weight in kg
    const [yieldPct, setYieldPct] = useState(0);
    const [lossPct, setLossPct] = useState(0);

    useEffect(() => {
        if (theoreticalInput <= 0) return;
        const pct = (actualOutput / theoreticalInput) * 100;
        setYieldPct(pct);
        setLossPct(100 - pct);
    }, [theoreticalInput, actualOutput]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={grid2Style}>
                        <div>
                            <label style={labelStyle}>Theoretical Input Weight (kg)</label>
                            <input type="number" value={theoreticalInput} onChange={(e) => setTheoreticalInput(parseFloat(e.target.value) || 0)} style={inputStyle} step="0.5" />
                        </div>
                        <div>
                            <label style={labelStyle}>Actual Output Weight (kg)</label>
                            <input type="number" value={actualOutput} onChange={(e) => setActualOutput(parseFloat(e.target.value) || 0)} style={inputStyle} step="0.5" />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ padding: 18, borderRadius: 12, background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Yield Efficiency</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#10b981' }}>{yieldPct.toFixed(2)}%</span>
                </div>
                <div style={{ padding: 18, borderRadius: 12, background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Wastage / Process Loss</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ef4444' }}>{lossPct.toFixed(2)}%</span>
                </div>
            </div>
        </div>
    );
}
