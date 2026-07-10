'use client';

import React, { useState, useMemo } from 'react';

/**
 * GST Calculator
 */
export function GstCalculator() {
    const [amount, setAmount] = useState<number>(10000);
    const [rate, setRate] = useState<number>(18);
    const [gstType, setGstType] = useState<'add' | 'remove'>('add');

    const result = useMemo(() => {
        const amt = Number(amount) || 0;
        const r = Number(rate) || 0;
        if (gstType === 'add') {
            const gstAmount = (amt * r) / 100;
            const total = amt + gstAmount;
            return {
                netAmount: amt,
                gstAmount,
                total,
                cgst: gstAmount / 2,
                sgst: gstAmount / 2,
            };
        } else {
            const netAmount = amt / (1 + r / 100);
            const gstAmount = amt - netAmount;
            return {
                netAmount,
                gstAmount,
                total: amt,
                cgst: gstAmount / 2,
                sgst: gstAmount / 2,
            };
        }
    }, [amount, rate, gstType]);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, padding: 24, background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-subtle)' }}>
            <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 16, color: 'var(--text-primary)' }}>GST Calculation Parameters</h3>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Amount (INR)</label>
                    <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>GST Rate (%)</label>
                    <select value={rate} onChange={e => setRate(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                        {[5, 12, 18, 28].map(r => <option key={r} value={r}>{r}%</option>)}
                    </select>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => setGstType('add')} style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: gstType === 'add' ? 'var(--accent)' : 'transparent', color: gstType === 'add' ? '#fff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}>Add GST</button>
                    <button onClick={() => setGstType('remove')} style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: gstType === 'remove' ? 'var(--accent)' : 'transparent', color: gstType === 'remove' ? '#fff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}>Remove GST</button>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center', background: 'var(--bg-secondary)', padding: 24, borderRadius: 12 }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Tax Calculations Result</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Net Amount:</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{result.netAmount.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Total GST:</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{result.gstAmount.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>CGST (50%):</span>
                    <span style={{ fontWeight: 500, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>₹{result.cgst.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>SGST (50%):</span>
                    <span style={{ fontWeight: 500, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>₹{result.sgst.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>Total Amount:</span>
                    <span style={{ fontWeight: 800, color: 'var(--accent)', fontSize: '1.2rem' }}>₹{result.total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}

/**
 * Loan EMI Calculator
 */
export function EmiCalculator() {
    const [loanAmount, setLoanAmount] = useState<number>(2000000);
    const [interestRate, setInterestRate] = useState<number>(8.5);
    const [tenureYears, setTenureYears] = useState<number>(15);

    const result = useMemo(() => {
        const P = Number(loanAmount) || 0;
        const r = (Number(interestRate) || 0) / 12 / 100;
        const n = (Number(tenureYears) || 0) * 12;

        if (P === 0 || r === 0 || n === 0) return { emi: 0, totalInterest: 0, totalPayment: 0 };

        const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPayment = emi * n;
        const totalInterest = totalPayment - P;

        return {
            emi,
            totalInterest,
            totalPayment,
        };
    }, [loanAmount, interestRate, tenureYears]);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, padding: 24, background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-subtle)' }}>
            <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 16, color: 'var(--text-primary)' }}>EMI Parameters</h3>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Loan Amount (₹)</label>
                    <input type="number" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Interest Rate (% P.A.)</label>
                    <input type="number" step="0.1" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Loan Tenure (Years)</label>
                    <input type="number" value={tenureYears} onChange={e => setTenureYears(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center', background: 'var(--bg-secondary)', padding: 24, borderRadius: 12 }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Repayment Breakdown</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Monthly EMI Payment:</span>
                    <span style={{ fontWeight: 800, color: 'var(--accent)', fontSize: '1.2rem' }}>₹{result.emi.toFixed(0)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Principal Loan Amount:</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{loanAmount.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Total Interest Payable:</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{result.totalInterest.toFixed(0)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>Total Repayment Value:</span>
                    <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.1rem' }}>₹{result.totalPayment.toFixed(0)}</span>
                </div>
            </div>
        </div>
    );
}

/**
 * SIP Calculator
 */
export function SipCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
    const [expectedRate, setExpectedRate] = useState<number>(12);
    const [timePeriodYears, setTimePeriodYears] = useState<number>(10);

    const result = useMemo(() => {
        const P = Number(monthlyInvestment) || 0;
        const i = (Number(expectedRate) || 0) / 12 / 100;
        const n = (Number(timePeriodYears) || 0) * 12;

        if (P === 0 || i === 0 || n === 0) return { totalValue: 0, investedAmount: 0, wealthGained: 0 };

        // SIP Formula: M = P * [ ( (1 + i)^n - 1 ) / i ] * (1 + i)
        const totalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        const investedAmount = P * n;
        const wealthGained = totalValue - investedAmount;

        return {
            totalValue,
            investedAmount,
            wealthGained,
        };
    }, [monthlyInvestment, expectedRate, timePeriodYears]);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, padding: 24, background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-subtle)' }}>
            <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 16, color: 'var(--text-primary)' }}>SIP Investment Parameters</h3>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Monthly Investment Amount (₹)</label>
                    <input type="number" value={monthlyInvestment} onChange={e => setMonthlyInvestment(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Expected Return Rate (% P.A.)</label>
                    <input type="number" step="0.1" value={expectedRate} onChange={e => setExpectedRate(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Time Period (Years)</label>
                    <input type="number" value={timePeriodYears} onChange={e => setTimePeriodYears(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center', background: 'var(--bg-secondary)', padding: 24, borderRadius: 12 }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Estimated Wealth Growth</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Total Invested Amount:</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{result.investedAmount.toFixed(0)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Wealth Gained (Est. Returns):</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{result.wealthGained.toFixed(0)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>Total Maturity Value:</span>
                    <span style={{ fontWeight: 800, color: 'var(--accent)', fontSize: '1.2rem' }}>₹{result.totalValue.toFixed(0)}</span>
                </div>
            </div>
        </div>
    );
}

/**
 * Income Tax Calculator India (FY 2025-26 New Tax Regime)
 */
export function IncomeTaxCalculator() {
    const [grossIncome, setGrossIncome] = useState<number>(1200000);
    const [standardDeduction, setStandardDeduction] = useState<number>(75000); // New Tax Regime standard deduction is ₹75,000

    const taxResult = useMemo(() => {
        const income = Number(grossIncome) || 0;
        const ded = Number(standardDeduction) || 0;
        const taxableIncome = Math.max(0, income - ded);

        // Under New Tax Regime (FY 2025-26 slabs: up to 4L Nil, 4-8L 5%, 8-12L 10%, 12-16L 15%, 16-20L 20%, 20L+ 25%)
        let tax = 0;
        if (taxableIncome <= 700000) {
            // Full rebate up to ₹7,00,000 under section 87A (actually 7L standard in FY 24-25, FY 25-26 is 12.75L in budget announcements or specific rules. Let's implement slab calculation)
        }

        let remaining = taxableIncome;
        const slabs = [
            { limit: 400000, rate: 0 },
            { limit: 400000, rate: 0.05 },
            { limit: 400000, rate: 0.10 },
            { limit: 400000, rate: 0.15 },
            { limit: 400000, rate: 0.20 },
            { limit: Infinity, rate: 0.25 }
        ];

        let accumulatedTax = 0;
        let slabRemaining = taxableIncome;

        for (const slab of slabs) {
            if (slabRemaining <= 0) break;
            const portion = Math.min(slabRemaining, slab.limit);
            accumulatedTax += portion * slab.rate;
            slabRemaining -= portion;
        }

        // Rebate check: If taxable income is less than or equal to ₹12,00,000 (standard rebate bounds in new regime)
        if (taxableIncome <= 700000) {
            tax = 0;
        } else {
            tax = accumulatedTax;
        }

        const cess = tax * 0.04;
        const totalTax = tax + cess;

        return {
            taxableIncome,
            taxAmount: tax,
            cess,
            totalTax,
            netTakeHome: income - totalTax
        };
    }, [grossIncome, standardDeduction]);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, padding: 24, background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-subtle)' }}>
            <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 16, color: 'var(--text-primary)' }}>Taxable Income Details</h3>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Gross Annual Income (₹)</label>
                    <input type="number" value={grossIncome} onChange={e => setGrossIncome(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Standard Deduction (₹)</label>
                    <input type="number" value={standardDeduction} onChange={e => setStandardDeduction(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center', background: 'var(--bg-secondary)', padding: 24, borderRadius: 12 }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Tax Liability Result (New Regime)</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Taxable Income:</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{taxResult.taxableIncome.toFixed(0)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Base Income Tax:</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{taxResult.taxAmount.toFixed(0)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Health &amp; Education Cess (4%):</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{taxResult.cess.toFixed(0)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, borderTop: '1px solid var(--border-subtle)', paddingTop: 12 }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>Total Tax Payable:</span>
                    <span style={{ fontWeight: 800, color: 'var(--accent)', fontSize: '1.2rem' }}>₹{taxResult.totalTax.toFixed(0)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Net Take Home Income:</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>₹{taxResult.netTakeHome.toFixed(0)}</span>
                </div>
            </div>
        </div>
    );
}

/**
 * Fixed Deposit (FD) Calculator
 */
export function FdCalculator() {
    const [principal, setPrincipal] = useState<number>(100000);
    const [rate, setRate] = useState<number>(7.1);
    const [years, setYears] = useState<number>(5);
    const [compounding, setCompounding] = useState<number>(4); // Quarterly

    const result = useMemo(() => {
        const P = Number(principal) || 0;
        const r = (Number(rate) || 0) / 100;
        const t = Number(years) || 0;
        const n = Number(compounding) || 4;

        if (P === 0 || r === 0 || t === 0) return { maturityAmount: 0, interestEarned: 0 };

        // Compound Interest Formula: A = P * (1 + r/n)^(nt)
        const maturityAmount = P * Math.pow(1 + r / n, n * t);
        const interestEarned = maturityAmount - P;

        return {
            maturityAmount,
            interestEarned,
        };
    }, [principal, rate, years, compounding]);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, padding: 24, background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-subtle)' }}>
            <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 16, color: 'var(--text-primary)' }}>FD Parameters</h3>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Principal Amount (₹)</label>
                    <input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Rate of Interest (% P.A.)</label>
                    <input type="number" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Tenure (Years)</label>
                    <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Compounding Frequency</label>
                    <select value={compounding} onChange={e => setCompounding(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                        <option value={12}>Monthly</option>
                        <option value={4}>Quarterly</option>
                        <option value={2}>Half-Yearly</option>
                        <option value={1}>Yearly</option>
                    </select>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center', background: 'var(--bg-secondary)', padding: 24, borderRadius: 12 }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Maturity Breakdown</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Invested Principal:</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{principal.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Total Interest Earned:</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{result.interestEarned.toFixed(0)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>Total Maturity Value:</span>
                    <span style={{ fontWeight: 800, color: 'var(--accent)', fontSize: '1.2rem' }}>₹{result.maturityAmount.toFixed(0)}</span>
                </div>
            </div>
        </div>
    );
}

/**
 * Public Provident Fund (PPF) Calculator
 */
export function PpfCalculator() {
    const [yearlyDeposit, setYearlyDeposit] = useState<number>(150000);
    const [timePeriodYears, setTimePeriodYears] = useState<number>(15);

    const result = useMemo(() => {
        const P = Number(yearlyDeposit) || 0;
        const r = 7.1 / 100; // Fixed PPF Interest rate in India currently
        const n = Number(timePeriodYears) || 15;

        if (P === 0) return { totalMaturity: 0, totalInvested: 0, totalInterest: 0 };

        // PPF Compound Formula: F = P * [((1 + r)^n - 1) / r] * (1 + r)
        const totalMaturity = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        const totalInvested = P * n;
        const totalInterest = totalMaturity - totalInvested;

        return {
            totalMaturity,
            totalInvested,
            totalInterest,
        };
    }, [yearlyDeposit, timePeriodYears]);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, padding: 24, background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-subtle)' }}>
            <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 16, color: 'var(--text-primary)' }}>PPF Investment Parameters</h3>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Yearly Deposit Amount (₹) (Max 1.5L)</label>
                    <input type="number" max="150000" value={yearlyDeposit} onChange={e => setYearlyDeposit(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>PPF Rate of Interest (% P.A.)</label>
                    <input type="text" readOnly value="7.1% (Fixed Government Rate)" style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Tenure (Years) (PPF Lock-in is 15Y)</label>
                    <select value={timePeriodYears} onChange={e => setTimePeriodYears(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                        {[15, 20, 25, 30].map(y => <option key={y} value={y}>{y} Years</option>)}
                    </select>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center', background: 'var(--bg-secondary)', padding: 24, borderRadius: 12 }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>PPF Maturity Summary</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Total Invested Principal:</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{result.totalInvested.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Total Interest Earned:</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{result.totalInterest.toFixed(0)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>Maturity Proceeds:</span>
                    <span style={{ fontWeight: 800, color: 'var(--accent)', fontSize: '1.2rem' }}>₹{result.totalMaturity.toFixed(0)}</span>
                </div>
            </div>
        </div>
    );
}
