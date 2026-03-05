'use client';

import React from 'react';
import LearnArticleCard, { LearnArticle } from './LearnArticleCard';

interface LearnGridProps {
    articles: LearnArticle[];
}

export default function LearnGrid({ articles }: LearnGridProps) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
        }}>
            {articles.map(article => (
                <LearnArticleCard key={article.href} article={article} />
            ))}
        </div>
    );
}
