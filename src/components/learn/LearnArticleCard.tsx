'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

export interface LearnArticle {
    title: string;
    description: string;
    href: string;
    readTime: string;
    icon: string;
    color: string;
}

interface LearnArticleCardProps {
    article: LearnArticle;
}

export default function LearnArticleCard({ article }: LearnArticleCardProps) {
    return (
        <Link href={article.href} style={{ textDecoration: 'none' }}>
            <div style={{
                height: '100%',
                padding: '28px 24px',
                borderRadius: 16,
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'flex',
                flexDirection: 'column',
            }}
                onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 30px ${article.color}15`;
                }}
                onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: `${article.color}15`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.4rem'
                    }}>
                        {article.icon}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
                        <Clock size={14} />
                        <span>{article.readTime}</span>
                    </div>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 10px', lineHeight: 1.4 }}>
                    {article.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 24px', flexGrow: 1 }}>
                    {article.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: article.color, fontSize: '0.85rem', fontWeight: 700, marginTop: 'auto' }}>
                    Read Article <ArrowRight size={16} />
                </div>
            </div>
        </Link>
    );
}
