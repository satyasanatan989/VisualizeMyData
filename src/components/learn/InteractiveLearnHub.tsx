'use client';

import React, { useState } from 'react';
import { LearnArticle } from '@/components/learn/LearnArticleCard';
import LearnGrid from './LearnGrid';
import { BookOpen, Search } from 'lucide-react';

interface InteractiveLearnHubProps {
    articles: LearnArticle[];
}

const LEARN_CATEGORIES = [
    { id: 'All', name: 'All Guides', icon: '⚡' },
    { id: 'Excel', name: 'Excel Sheets', icon: '📗' },
    { id: 'CSV', name: 'CSV Files', icon: '📋' },
    { id: 'Dashboards', name: 'Dashboards', icon: '📊' },
    { id: 'Google Sheets', name: 'Google Sheets', icon: '🔗' },
    { id: 'PDF', name: 'PDF Document', icon: '📕' },
    { id: 'Images', name: 'Images', icon: '🎨' },
    { id: 'Developer', name: 'Developer', icon: '💻' },
    { id: 'Business', name: 'Business', icon: '💼' },
    { id: 'Food Science', name: 'Food Science', icon: '🧪' },
    { id: 'Data Visualization', name: 'Visualization', icon: '✨' }
];

export default function InteractiveLearnHub({ articles }: InteractiveLearnHubProps) {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = articles.filter(a => {
        const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              a.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (activeCategory === 'All') return matchesSearch;
        return a.category === activeCategory && matchesSearch;
    });

    const getCount = (catId: string) => {
        if (catId === 'All') return articles.length;
        return articles.filter(a => a.category === catId).length;
    };

    return (
        <div>
            {/* Search and Filter Row */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
                {/* Search Input */}
                <div style={{
                    display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-subtle)', borderRadius: 14, padding: '10px 16px',
                    maxWidth: 480, margin: '0 auto', width: '100%'
                }}>
                    <Search size={16} color="var(--text-muted)" style={{ marginRight: 10 }} />
                    <input
                        type="text"
                        placeholder="Search guides and tutorials..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%', background: 'none', border: 'none', outline: 'none',
                            color: '#fff', fontSize: '0.88rem'
                        }}
                    />
                </div>

                {/* Category Tags */}
                <div style={{
                    display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8,
                    scrollbarWidth: 'none', msOverflowStyle: 'none', justifyContent: 'center'
                }} className="category-scroll-container">
                    {LEARN_CATEGORIES.map(cat => {
                        const isActive = activeCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 6,
                              padding: '8px 14px', borderRadius: 10, border: '1px solid',
                              borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-subtle)',
                              background: isActive ? 'rgba(132, 85, 239, 0.1)' : 'rgba(255,255,255,0.02)',
                              color: isActive ? '#fff' : 'var(--text-secondary)',
                              fontWeight: isActive ? 600 : 500, fontSize: '0.78rem',
                              cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s'
                            }}
                          >
                            <span>{cat.icon}</span>
                            <span>{cat.name}</span>
                            <span style={{ fontSize: '0.65rem', opacity: 0.5 }}>({getCount(cat.id)})</span>
                          </button>
                        );
                    })}
                </div>
            </div>

            {/* Articles Grid */}
            {filtered.length > 0 ? (
                <LearnGrid articles={filtered} />
            ) : (
                <div style={{ textAlign: 'center', padding: '60px 20px', border: '1px dashed var(--border-subtle)', borderRadius: 20, color: 'var(--text-muted)' }}>
                    <BookOpen size={30} style={{ marginBottom: 12, opacity: 0.6 }} />
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>No learning guides found matching your query.</p>
                </div>
            )}
        </div>
    );
}
