'use client';

import React, { useState } from 'react';
import html2canvas from 'html2canvas';

interface PublishModalProps {
    onClose: () => void;
    onPublish: (title: string, tags: string[], thumbnailBase64: string) => void;
}

export default function PublishModal({ onClose, onPublish }: PublishModalProps) {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [isPublishing, setIsPublishing] = useState(false);
    const [error, setError] = useState('');

    const handlePublish = async () => {
        if (!title.trim()) {
            setError('Please enter a dashboard title.');
            return;
        }

        setIsPublishing(true);
        try {
            // Capture the dashboard content
            const element = document.getElementById('dashboard-export-area');
            if (!element) throw new Error("Could not find dashboard to capture.");

            const canvas = await html2canvas(element, { scale: 0.5 });
            const thumbnailBase64 = canvas.toDataURL('image/jpeg', 0.5); // compress to keep localStorage lean

            const tagArray = tags.split(',').map(t => t.trim()).filter(Boolean);
            if (tagArray.length === 0) tagArray.push('User Generated');

            onPublish(title.trim(), tagArray, thumbnailBase64);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to capture dashboard.');
            setIsPublishing(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: 500, padding: 32, background: 'var(--bg-primary)' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 8 }}>Publish Dashboard</h2>
                <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '12px 16px', borderRadius: 8, marginBottom: 20 }}>
                    <p style={{ color: '#f59e0b', fontSize: '0.85rem', margin: 0, fontWeight: 600 }}>
                        ⚠️ Privacy Warning
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: '4px 0 0' }}>
                        Please ensure your dataset does not contain personal or sensitive information before publishing. Published dashboards will be publicly accessible.
                    </p>
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Dashboard Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Q3 Sales Analysis"
                        style={{
                            width: '100%', padding: '10px 14px', borderRadius: 8,
                            background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
                            color: 'var(--text-primary)', fontSize: '0.9rem'
                        }}
                    />
                </div>

                <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Tags (comma separated)</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="e.g., Sales, Finance, Q3"
                        style={{
                            width: '100%', padding: '10px 14px', borderRadius: 8,
                            background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
                            color: 'var(--text-primary)', fontSize: '0.9rem'
                        }}
                    />
                </div>

                {error && <p style={{ color: '#f43f5e', fontSize: '0.85rem', marginBottom: 16 }}>{error}</p>}

                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                    <button onClick={onClose} disabled={isPublishing} className="btn-secondary">
                        Cancel
                    </button>
                    <button onClick={handlePublish} disabled={isPublishing} className="btn-primary">
                        {isPublishing ? 'Publishing...' : 'Confirm & Publish'}
                    </button>
                </div>
            </div>
        </div>
    );
}
