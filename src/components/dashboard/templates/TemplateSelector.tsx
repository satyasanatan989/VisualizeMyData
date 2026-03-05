'use client';

import React from 'react';
import { DASHBOARD_TEMPLATES, DashboardTemplate } from '@/lib/dashboardTemplates';
import { motion } from 'framer-motion';

interface TemplateSelectorProps {
    onSelect: (templateId: string) => void;
}

export default function TemplateSelector({ onSelect }: TemplateSelectorProps) {
    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>
                    Choose a Dashboard Layout
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 600, margin: '0 auto' }}>
                    Select a template that matches your use case. Our engine will map your columns to the layout automatically.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 20
            }}>
                {DASHBOARD_TEMPLATES.map((template, index) => (
                    <motion.button
                        key={template.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => onSelect(template.id)}
                        style={{
                            background: 'var(--bg-card)',
                            border: template.id === 'default' ? '2px solid var(--accent-blue)' : '1px solid var(--border-subtle)',
                            borderRadius: 16,
                            padding: 24,
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: template.id === 'default' ? '0 10px 30px rgba(59,130,246,0.1)' : '0 4px 12px rgba(0,0,0,0.02)',
                            transition: 'all 0.2s ease',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = template.id === 'default' ? '0 10px 30px rgba(59,130,246,0.1)' : '0 4px 12px rgba(0,0,0,0.02)';
                        }}
                    >
                        {template.id === 'default' && (
                            <span style={{
                                position: 'absolute', top: 12, right: 12, background: 'var(--accent-blue)', color: '#fff',
                                fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 99, textTransform: 'uppercase'
                            }}>
                                Recommended
                            </span>
                        )}

                        <div style={{ fontSize: '2rem', marginBottom: 12 }}>{template.icon}</div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
                            {template.name}
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                            {template.description}
                        </p>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
