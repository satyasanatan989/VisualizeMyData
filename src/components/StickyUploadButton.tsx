'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Sticky upload button that fades in after the user scrolls
 * past the hero section. Scrolls to #upload-zone on click.
 * Zero dependencies — pure CSS transition.
 */
export default function StickyUploadButton() {
    const [visible, setVisible] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => setVisible(!entry.isIntersecting),
            { threshold: 0 }
        );
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* Sentinel placed at the bottom of the hero — once it leaves the viewport the button appears */}
            <div ref={sentinelRef} style={{ position: 'absolute', top: 700, left: 0, height: 1, pointerEvents: 'none' }} />

            <button
                aria-label="Upload data file"
                onClick={() => document.getElementById('upload-zone')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                    position: 'fixed',
                    bottom: 28,
                    right: 24,
                    zIndex: 100,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    padding: '11px 20px',
                    borderRadius: 50,
                    background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 6px 24px rgba(59,130,246,0.45)',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(12px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    pointerEvents: visible ? 'auto' : 'none',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                }}
            >
                <span style={{ fontSize: '1rem' }}>⬆</span>
                Upload Data
            </button>
        </>
    );
}
