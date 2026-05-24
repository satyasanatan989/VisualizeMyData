'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Copy, Check, HelpCircle, Code, ListFilter, ArrowRight, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface FormulaDef {
    name: string;
    description: string;
    category: string;
    syntax: string;
    parameters: { name: string; desc: string; required: boolean }[];
    example: string;
    exampleExplanation: string;
    pitfall: string;
}

const FORMULA_DATABASE: FormulaDef[] = [
    {
        name: 'XLOOKUP',
        description: 'The modern successor to VLOOKUP. Finds a value in a range or array and returns the corresponding value from another range or array. Safer, simpler, and searches in any direction.',
        category: 'Lookup & Reference',
        syntax: '=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])',
        parameters: [
            { name: 'lookup_value', desc: 'The value you want to search for (e.g. a product ID or name).', required: true },
            { name: 'lookup_array', desc: 'The column or row range containing the search keys (e.g. A2:A50).', required: true },
            { name: 'return_array', desc: 'The column or row range containing the values to return (e.g. C2:C50).', required: true },
            { name: 'if_not_found', desc: 'Text or value to return if no match is found (e.g. "Not Found"). Defaults to error if empty.', required: false },
            { name: 'match_mode', desc: 'Specify match type: 0 for exact match (default), -1 for exact/next smallest, 1 for exact/next largest, 2 for wildcard.', required: false },
        ],
        example: '=XLOOKUP("Widget A", A2:A10, B2:B10, "Out of Stock")',
        exampleExplanation: 'Searches for "Widget A" in column A (A2:A10) and returns the matching price from column B (B2:B10). If "Widget A" isn\'t found, it returns "Out of Stock".',
        pitfall: 'XLOOKUP is only available in newer versions of Excel (Excel 365, Excel 2021+). If you share spreadsheets with users running older Excel versions, they will see a #NAME? error.'
    },
    {
        name: 'VLOOKUP',
        description: 'Looks up a value in the first column of a table array and returns a value in the same row from another column. Searches from left to right only.',
        category: 'Lookup & Reference',
        syntax: '=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])',
        parameters: [
            { name: 'lookup_value', desc: 'The value to search for in the first column of the table (e.g. A2).', required: true },
            { name: 'table_array', desc: 'The entire table range containing the lookup value and the return value (e.g. A2:D100).', required: true },
            { name: 'col_index_num', desc: 'The column number in the table (1-indexed) containing the return value (e.g. 3 for column C).', required: true },
            { name: 'range_lookup', desc: 'Use FALSE for exact match (recommended) or TRUE for approximate match. Defaults to TRUE if empty.', required: false }
        ],
        example: '=VLOOKUP(A2, Sheet2!A2:C50, 3, FALSE)',
        exampleExplanation: 'Looks up the value inside cell A2 in the first column of sheet 2 (range A2:A50) and returns the corresponding value in the 3rd column (column C) of that row. Matches exactly.',
        pitfall: 'VLOOKUP always searches the leftmost column of the range. You cannot retrieve data from columns to the left of your search column. Also, adding/deleting columns breaks the hardcoded col_index_num.'
    },
    {
        name: 'INDEX MATCH',
        description: 'A powerful combination of two formulas (INDEX and MATCH) that performs leftward lookups, handles column insertions safely, and runs faster than VLOOKUP on large datasets.',
        category: 'Lookup & Reference',
        syntax: '=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))',
        parameters: [
            { name: 'return_range', desc: 'The range containing the values you want to extract (e.g. B2:B100).', required: true },
            { name: 'lookup_value', desc: 'The search key you want to look up (e.g. A2).', required: true },
            { name: 'lookup_range', desc: 'The column range where the lookup value is searched (e.g. C2:C100).', required: true }
        ],
        example: '=INDEX(B2:B20, MATCH(A2, C2:C20, 0))',
        exampleExplanation: 'MATCH finds the row index of A2 within the C2:C20 range. INDEX then grabs the value from that exact row number within the B2:B20 range. Works even if column B is to the left of column C.',
        pitfall: 'Ensure both return_range and lookup_range start and end on the exact same row numbers (e.g., row 2 to 20). If the ranges are misaligned, INDEX will return the wrong row\'s data.'
    },
    {
        name: 'SUMIF',
        description: 'Sums the cells in a range that meet a single specific condition or criterion.',
        category: 'Math & Trigonometry',
        syntax: '=SUMIF(range, criteria, [sum_range])',
        parameters: [
            { name: 'range', desc: 'The range of cells to evaluate using the criteria (e.g. B2:B50).', required: true },
            { name: 'criteria', desc: 'The condition that defines which cells to add (e.g. ">1000", "Sales", or cell references).', required: true },
            { name: 'sum_range', desc: 'The actual cells to sum. If omitted, Excel sums the cells in the first parameter.', required: false }
        ],
        example: '=SUMIF(B2:B10, "Software", C2:C10)',
        exampleExplanation: 'Scans column B (B2:B10) for rows matching the word "Software", and sums the corresponding values in column C (C2:C10).',
        pitfall: 'SUMIF only supports a single condition. If you need to sum based on multiple criteria (e.g. "Software" AND "Region North"), use the SUMIFS formula instead.'
    },
    {
        name: 'COUNTIF',
        description: 'Counts the number of cells within a range that meet a single specific condition.',
        category: 'Statistical',
        syntax: '=COUNTIF(range, criteria)',
        parameters: [
            { name: 'range', desc: 'The range of cells to search and count (e.g. A2:A100).', required: true },
            { name: 'criteria', desc: 'The condition (number, text, expression) specifying which cells to count (e.g. ">=90", "Absent").', required: true }
        ],
        example: '=COUNTIF(D2:D50, ">=500")',
        exampleExplanation: 'Examines cells in column D (D2:D50) and counts how many contain a value greater than or equal to 500.',
        pitfall: 'COUNTIF is not case-sensitive. Searching for "software" will also count "SOFTWARE" or "Software". Use SUMPRODUCT/EXACT combinations if you need case sensitivity.'
    }
];

export default function FormulaGenerator() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeFormula, setActiveFormula] = useState<FormulaDef>(FORMULA_DATABASE[0]);
    const [activeTab, setActiveTab] = useState<'browse' | 'builder'>('browse');

    // Builder State
    const [builderFormula, setBuilderFormula] = useState<'XLOOKUP' | 'VLOOKUP' | 'INDEX_MATCH' | 'SUMIF' | 'COUNTIF'>('XLOOKUP');
    const [builderInputs, setBuilderInputs] = useState<Record<string, string>>({
        lookupValue: 'A2',
        lookupRange: 'Sheet2!A2:A100',
        returnRange: 'Sheet2!B2:B100',
        ifNotFound: '""',
        
        vLookupValue: 'A2',
        vTableArray: 'Sheet2!A2:C100',
        vColIndex: '2',
        vExactMatch: 'FALSE',

        imReturnRange: 'B2:B100',
        imLookupValue: 'A2',
        imLookupRange: 'C2:C100',

        siCriteriaRange: 'A2:A50',
        siCriteria: '"Active"',
        siSumRange: 'B2:B50',

        ciRange: 'A2:A100',
        ciCriteria: '">80"',
    });

    const [copied, setCopied] = useState(false);

    // Categories list
    const categories = useMemo(() => {
        const cats = new Set<string>();
        FORMULA_DATABASE.forEach(f => cats.add(f.category));
        return ['All', ...Array.from(cats)];
    }, []);

    // Filtered formulas
    const filteredFormulas = useMemo(() => {
        return FORMULA_DATABASE.filter(f => {
            const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  f.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCat = selectedCategory === 'All' || f.category === selectedCategory;
            return matchesSearch && matchesCat;
        });
    }, [searchQuery, selectedCategory]);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success("Formula copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    // Calculate formula output for the builder
    const generatedFormula = useMemo(() => {
        const bi = builderInputs;
        switch (builderFormula) {
            case 'XLOOKUP':
                return `=XLOOKUP(${bi.lookupValue}, ${bi.lookupRange}, ${bi.returnRange}${bi.ifNotFound ? `, ${bi.ifNotFound}` : ''})`;
            case 'VLOOKUP':
                return `=VLOOKUP(${bi.vLookupValue}, ${bi.vTableArray}, ${bi.vColIndex}, ${bi.vExactMatch})`;
            case 'INDEX_MATCH':
                return `=INDEX(${bi.imReturnRange}, MATCH(${bi.imLookupValue}, ${bi.imLookupRange}, 0))`;
            case 'SUMIF':
                return `=SUMIF(${bi.siCriteriaRange}, ${bi.siCriteria}${bi.siSumRange ? `, ${bi.siSumRange}` : ''})`;
            case 'COUNTIF':
                return `=COUNTIF(${bi.ciRange}, ${bi.ciCriteria})`;
            default:
                return '';
        }
    }, [builderFormula, builderInputs]);

    const handleInputChange = (key: string, val: string) => {
        setBuilderInputs(prev => ({ ...prev, [key]: val }));
    };

    return (
        <div style={{ width: '100%' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
                <button 
                    onClick={() => setActiveTab('browse')}
                    style={{
                        flex: 1, padding: '12px 0', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem',
                        transition: 'all 0.2s',
                        background: activeTab === 'browse' ? 'linear-gradient(135deg, #ba9eff, #8455ef)' : 'var(--bg-glass)',
                        color: activeTab === 'browse' ? '#000' : 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)',
                        boxShadow: activeTab === 'browse' ? '0 4px 15px rgba(186,158,255,0.25)' : 'none',
                    }}
                >
                    📖 Search &amp; Learn Formulas
                </button>
                <button 
                    onClick={() => setActiveTab('builder')}
                    style={{
                        flex: 1, padding: '12px 0', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem',
                        transition: 'all 0.2s',
                        background: activeTab === 'builder' ? 'linear-gradient(135deg, #ba9eff, #8455ef)' : 'var(--bg-glass)',
                        color: activeTab === 'builder' ? '#000' : 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)',
                        boxShadow: activeTab === 'builder' ? '0 4px 15px rgba(186,158,255,0.25)' : 'none',
                    }}
                >
                    ⚡ Interactive Formula Builder
                </button>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'browse' ? (
                    <motion.div 
                        key="browse" 
                        initial={{ opacity: 0, y: 15 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -15 }}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'start' }}
                    >
                        {/* Directory Panel */}
                        <div style={{
                            background: 'rgba(23, 26, 30, 0.4)', border: '1px solid var(--border-subtle)',
                            borderRadius: 20, padding: 20, display: 'flex', flexDirection: 'column', gap: 16
                        }}>
                            {/* Search bar */}
                            <div style={{ position: 'relative' }}>
                                <input 
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Search formulas (VLOOKUP, SUMIF...)"
                                    style={{
                                        width: '100%', padding: '10px 14px 10px 38px', borderRadius: 8,
                                        background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
                                        color: 'var(--text-primary)', fontSize: '0.8rem', outline: 'none',
                                    }}
                                />
                                <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: 14, top: '52%', transform: 'translateY(-50%)' }} />
                            </div>

                            {/* Category Filters */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {categories.map(cat => (
                                    <button 
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        style={{
                                            padding: '4px 10px', borderRadius: 6, fontSize: '0.7rem', fontWeight: 600,
                                            background: selectedCategory === cat ? 'rgba(186,158,255,0.15)' : 'transparent',
                                            border: `1px solid ${selectedCategory === cat ? 'rgba(186,158,255,0.3)' : 'var(--border-subtle)'}`,
                                            color: selectedCategory === cat ? '#ba9eff' : 'var(--text-secondary)',
                                            cursor: 'pointer', transition: 'all 0.2s',
                                        }}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Formulas List */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 300, overflowY: 'auto', paddingRight: 4 }}>
                                {filteredFormulas.map(f => (
                                    <div 
                                        key={f.name}
                                        onClick={() => setActiveFormula(f)}
                                        style={{
                                            padding: '12px 14px', borderRadius: 8, cursor: 'pointer',
                                            background: activeFormula.name === f.name ? 'rgba(255,255,255,0.04)' : 'transparent',
                                            border: `1px solid ${activeFormula.name === f.name ? 'rgba(186,158,255,0.2)' : 'transparent'}`,
                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={e => { if (activeFormula.name !== f.name) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                                        onMouseLeave={e => { if (activeFormula.name !== f.name) e.currentTarget.style.background = 'transparent'; }}
                                    >
                                        <div>
                                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{f.name}</span>
                                            <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>{f.category}</p>
                                        </div>
                                        <ArrowRight size={12} color="var(--text-muted)" style={{ opacity: activeFormula.name === f.name ? 1 : 0, transition: 'opacity 0.2s' }} />
                                    </div>
                                ))}
                                {filteredFormulas.length === 0 && (
                                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.78rem', padding: 20 }}>
                                        No formulas match your search query.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Formula Details Panel */}
                        <div style={{
                            background: 'rgba(23, 26, 30, 0.4)', border: '1px solid var(--border-subtle)',
                            borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 20
                        }}>
                            <div>
                                <span style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {activeFormula.category}
                                </span>
                                <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 800, margin: '4px 0 8px' }}>
                                    {activeFormula.name} Formula
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                                    {activeFormula.description}
                                </p>
                            </div>

                            {/* Syntax Box */}
                            <div style={{
                                background: 'rgba(0, 0, 0, 0.25)', border: '1px solid var(--border-subtle)',
                                borderRadius: 10, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            }}>
                                <code style={{ color: '#ba9eff', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'Courier New, monospace' }}>
                                    {activeFormula.syntax}
                                </code>
                                <button 
                                    onClick={() => handleCopy(activeFormula.example)}
                                    style={{
                                        background: 'transparent', border: 'none', cursor: 'pointer',
                                        padding: 6, borderRadius: 6, display: 'flex', alignItems: 'center', gap: 4,
                                        color: 'var(--text-secondary)'
                                    }}
                                >
                                    {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                                </button>
                            </div>

                            {/* Parameters */}
                            <div>
                                <h4 style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 700, marginBottom: 10 }}>Parameters</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {activeFormula.parameters.map(p => (
                                        <div key={p.name} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.78rem' }}>
                                            <span style={{
                                                background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: 4,
                                                color: '#cdcdff', fontWeight: 700, fontFamily: 'monospace'
                                            }}>
                                                {p.name}
                                            </span>
                                            <span style={{ color: p.required ? '#f43f5e' : 'var(--text-muted)', fontSize: '0.65rem', fontWeight: 700, marginTop: 3 }}>
                                                {p.required ? 'REQUIRED' : 'OPTIONAL'}
                                            </span>
                                            <p style={{ color: 'var(--text-secondary)', margin: '0 0 0 4px', flex: 1, lineHeight: 1.4 }}>{p.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Practical Example */}
                            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
                                <h4 style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 700, margin: '0 0 6px' }}>Example Usage</h4>
                                <code style={{ display: 'block', color: '#40ceed', background: 'rgba(0,0,0,0.15)', padding: '8px 12px', borderRadius: 8, fontSize: '0.75rem', fontFamily: 'monospace', marginBottom: 8 }}>
                                    {activeFormula.example}
                                </code>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>
                                    {activeFormula.exampleExplanation}
                                </p>
                            </div>

                            {/* Pitfalls */}
                            <div style={{ background: 'rgba(239, 68, 68, 0.03)', border: '1px solid rgba(239, 68, 68, 0.12)', borderRadius: 12, padding: 14 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f87171', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                                    <AlertCircle size={14} />
                                    Common Mistake / Pitfall
                                </div>
                                <p style={{ color: '#fda4af', fontSize: '0.74rem', lineHeight: 1.4, margin: 0 }}>
                                    {activeFormula.pitfall}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="builder" 
                        initial={{ opacity: 0, y: 15 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -15 }}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'start' }}
                    >
                        {/* Selector & Inputs */}
                        <div style={{
                            background: 'rgba(23, 26, 30, 0.4)', border: '1px solid var(--border-subtle)',
                            borderRadius: 20, padding: 20, display: 'flex', flexDirection: 'column', gap: 16
                        }}>
                            <div>
                                <label style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: 6 }}>
                                    Select Formula to Build
                                </label>
                                <select 
                                    value={builderFormula}
                                    onChange={e => setBuilderFormula(e.target.value as any)}
                                    style={{
                                        width: '100%', padding: '10px 12px', background: 'var(--bg-secondary)',
                                        border: '1px solid var(--border-subtle)', borderRadius: 8, color: 'var(--text-secondary)',
                                        fontSize: '0.8rem', cursor: 'pointer', outline: 'none',
                                    }}
                                >
                                    <option value="XLOOKUP">XLOOKUP — Modern lookup</option>
                                    <option value="VLOOKUP">VLOOKUP — Left-to-right lookup</option>
                                    <option value="INDEX_MATCH">INDEX MATCH — Two-way lookups</option>
                                    <option value="SUMIF">SUMIF — Conditional sum</option>
                                    <option value="COUNTIF">COUNTIF — Conditional count</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
                                <h4 style={{ color: 'var(--text-primary)', fontSize: '0.825rem', fontWeight: 700, margin: 0 }}>Configure Parameters</h4>
                                
                                {builderFormula === 'XLOOKUP' && (
                                    <>
                                        {renderBuilderInput('Lookup Value', 'lookupValue', 'Cell reference or text to find (e.g. A2)')}
                                        {renderBuilderInput('Lookup Array', 'lookupRange', 'Column range containing keys (e.g. B2:B100)')}
                                        {renderBuilderInput('Return Array', 'returnRange', 'Column range containing values (e.g. C2:C100)')}
                                        {renderBuilderInput('If Not Found (Optional)', 'ifNotFound', 'Fallback text if missing (e.g. "Not Found")')}
                                    </>
                                )}

                                {builderFormula === 'VLOOKUP' && (
                                    <>
                                        {renderBuilderInput('Lookup Value', 'vLookupValue', 'Cell containing value to match (e.g. A2)')}
                                        {renderBuilderInput('Table Array', 'vTableArray', 'Table range (e.g. Sheet2!A2:D500)')}
                                        {renderBuilderInput('Col Index Number', 'vColIndex', 'Index column to extract, e.g. 3')}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 600 }}>Exact Match Required?</span>
                                            <select 
                                                value={builderInputs.vExactMatch}
                                                onChange={e => handleInputChange('vExactMatch', e.target.value)}
                                                style={{
                                                    padding: '8px 12px', background: 'var(--bg-secondary)',
                                                    border: '1px solid var(--border-subtle)', borderRadius: 8, color: 'var(--text-secondary)',
                                                    fontSize: '0.8rem', cursor: 'pointer', outline: 'none',
                                                }}
                                            >
                                                <option value="FALSE">Exact Match (FALSE) — Recommended</option>
                                                <option value="TRUE">Approximate Match (TRUE)</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {builderFormula === 'INDEX_MATCH' && (
                                    <>
                                        {renderBuilderInput('Return Range', 'imReturnRange', 'Column containing target values (e.g. B2:B100)')}
                                        {renderBuilderInput('Lookup Value', 'imLookupValue', 'Cell reference to find (e.g. A2)')}
                                        {renderBuilderInput('Lookup Range', 'imLookupRange', 'Column searched for lookup value (e.g. C2:C100)')}
                                    </>
                                )}

                                {builderFormula === 'SUMIF' && (
                                    <>
                                        {renderBuilderInput('Criteria Range', 'siCriteriaRange', 'Range evaluated by criteria (e.g. A2:A50)')}
                                        {renderBuilderInput('Criteria', 'siCriteria', 'Rule to match (e.g. "Paid", ">1000")')}
                                        {renderBuilderInput('Sum Range (Optional)', 'siSumRange', 'Values to sum if condition matches (e.g. B2:B50)')}
                                    </>
                                )}

                                {builderFormula === 'COUNTIF' && (
                                    <>
                                        {renderBuilderInput('Range to Count', 'ciRange', 'Cells to scan (e.g. D2:D200)')}
                                        {renderBuilderInput('Criteria', 'ciCriteria', 'Condition to count (e.g. ">=90", "Absent")')}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Generated Output */}
                        <div style={{
                            background: 'rgba(23, 26, 30, 0.4)', border: '1px solid var(--border-subtle)',
                            borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 20
                        }}>
                            <div>
                                <h3 style={{ fontFamily: 'var(--font-manrope)', color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                                    Generated Excel Formula
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', margin: '4px 0 0' }}>
                                    Paste this string directly into your Excel or Google Sheets cells.
                                </p>
                            </div>

                            {/* Large Formula Display */}
                            <div style={{
                                background: 'rgba(0, 0, 0, 0.3)', border: '1px solid var(--border-subtle)',
                                borderRadius: 14, padding: '24px 20px', position: 'relative', display: 'flex',
                                flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14,
                                textAlign: 'center',
                            }}>
                                <code style={{
                                    color: '#ba9eff', fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)', fontWeight: 800,
                                    fontFamily: 'Courier New, monospace', wordBreak: 'break-all',
                                }}>
                                    {generatedFormula}
                                </code>
                                <button 
                                    onClick={() => handleCopy(generatedFormula)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px', borderRadius: 8,
                                        background: 'linear-gradient(135deg, #ba9eff, #8455ef)', border: 'none', color: '#000',
                                        fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
                                    }}
                                >
                                    {copied ? <Check size={14} color="#000" /> : <Copy size={14} />}
                                    {copied ? 'Copied!' : 'Copy Formula'}
                                </button>
                            </div>

                            {/* Breakdown explanation */}
                            <div>
                                <h4 style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 700, marginBottom: 8 }}>How this formula works:</h4>
                                <ul style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', paddingLeft: 18, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {builderFormula === 'XLOOKUP' && (
                                        <>
                                            <li>Excel will find cell <strong>{builderInputs.lookupValue}</strong> in column range <strong>{builderInputs.lookupRange}</strong>.</li>
                                            <li>It will retrieve the value from the matching row in return range <strong>{builderInputs.returnRange}</strong>.</li>
                                            {builderInputs.ifNotFound && <li>If not found, it returns the custom message: <strong>{builderInputs.ifNotFound}</strong>.</li>}
                                        </>
                                    )}
                                    {builderFormula === 'VLOOKUP' && (
                                        <>
                                            <li>Excel looks up the value in <strong>{builderInputs.vLookupValue}</strong> in the very first column of table <strong>{builderInputs.vTableArray}</strong>.</li>
                                            <li>It moves across to index column number <strong>{builderInputs.vColIndex}</strong> to fetch the result.</li>
                                            <li>It maps rows using exact matches only, since <strong>range_lookup</strong> is {builderInputs.vExactMatch}.</li>
                                        </>
                                    )}
                                    {builderFormula === 'INDEX_MATCH' && (
                                        <>
                                            <li>The inner MATCH locates the relative row position of <strong>{builderInputs.imLookupValue}</strong> inside array <strong>{builderInputs.imLookupRange}</strong>.</li>
                                            <li>The outer INDEX returns the cell at that specific position from return range <strong>{builderInputs.imReturnRange}</strong>.</li>
                                        </>
                                    )}
                                    {builderFormula === 'SUMIF' && (
                                        <>
                                            <li>Excel scans the cells inside range <strong>{builderInputs.siCriteriaRange}</strong>.</li>
                                            <li>For rows matching query <strong>{builderInputs.siCriteria}</strong>, it aggregates the numeric sum from range <strong>{builderInputs.siSumRange || builderInputs.siCriteriaRange}</strong>.</li>
                                        </>
                                    )}
                                    {builderFormula === 'COUNTIF' && (
                                        <>
                                            <li>Excel scans the cells in range <strong>{builderInputs.ciRange}</strong>.</li>
                                            <li>It counts how many items strictly satisfy condition <strong>{builderInputs.ciCriteria}</strong>.</li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    // Render parameters inputs helper
    function renderBuilderInput(label: string, stateKey: string, placeholder: string) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 600 }}>{label}</span>
                <input 
                    value={builderInputs[stateKey] || ''}
                    onChange={e => handleInputChange(stateKey, e.target.value)}
                    placeholder={placeholder}
                    style={{
                        padding: '8px 12px', borderRadius: 6, background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)', color: 'var(--text-primary)',
                        fontSize: '0.8rem', outline: 'none',
                    }}
                />
            </div>
        );
    }
}
