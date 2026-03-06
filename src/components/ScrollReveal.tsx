'use client';

import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    delay?: number; // ms
    className?: string;
    style?: React.CSSProperties;
}

/**
 * Lightweight scroll reveal wrapper using IntersectionObserver.
 * No external library — only CSS transitions.
 */
export default function ScrollReveal({ children, delay = 0, className, style }: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setVisible(true), delay);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
                ...style,
            }}
        >
            {children}
        </div>
    );
}
