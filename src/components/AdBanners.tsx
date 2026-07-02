'use client';

import React, { useEffect } from 'react';

// Set this to true (or set NEXT_PUBLIC_ENABLE_ADSENSE="true" in env vars) to enable ads
const ADS_ENABLED = false || process.env.NEXT_PUBLIC_ENABLE_ADSENSE === 'true'; 

const AD_CLIENT = "ca-pub-9327674045083855";

interface AdBannerProps {
    className?: string;
    style?: React.CSSProperties;
    adSlot?: string;
}

const initializeAd = () => {
    if (typeof window !== 'undefined') {
        try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (e) {
            console.error('AdSense initialization error:', e);
        }
    }
};

export function AdBannerTop({ className, style, adSlot }: AdBannerProps) {
    useEffect(() => {
        if (ADS_ENABLED) {
            initializeAd();
        }
    }, []);

    // Reserve layout space to prevent CLS
    const height = 90;

    if (!ADS_ENABLED) {
        return (
            <div className={className} style={{ width: '100%', margin: '16px 0', height, overflow: 'hidden', ...style }}>
                <div className="adsense-banner" style={{ height, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(23, 26, 30, 0.25)', border: '1px dashed var(--border-subtle)', borderRadius: 12, fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.5 }}>Sponsored Link</span>
                </div>
            </div>
        );
    }

    return (
        <div className={className} style={{ width: '100%', margin: '16px 0', height, overflow: 'hidden', ...style }}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', height }}
                data-ad-client={AD_CLIENT}
                data-ad-slot={adSlot || "top-banner-slot"}
                data-ad-format="horizontal"
                data-full-width-responsive="false"
            />
        </div>
    );
}

export function AdBannerMiddle({ className, style, adSlot }: AdBannerProps) {
    useEffect(() => {
        if (ADS_ENABLED) {
            initializeAd();
        }
    }, []);

    const height = 250; // Standard medium rectangle size

    if (!ADS_ENABLED) {
        return (
            <div className={className} style={{ width: '100%', margin: '24px 0', height, overflow: 'hidden', ...style }}>
                <div className="adsense-banner" style={{ height, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(23, 26, 30, 0.25)', border: '1px dashed var(--border-subtle)', borderRadius: 12, fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.5 }}>Sponsored Link</span>
                </div>
            </div>
        );
    }

    return (
        <div className={className} style={{ width: '100%', margin: '24px 0', height, overflow: 'hidden', ...style }}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', height }}
                data-ad-client={AD_CLIENT}
                data-ad-slot={adSlot || "middle-banner-slot"}
                data-ad-format="rectangle"
                data-full-width-responsive="false"
            />
        </div>
    );
}

export function AdBannerBottom({ className, style, adSlot }: AdBannerProps) {
    useEffect(() => {
        if (ADS_ENABLED) {
            initializeAd();
        }
    }, []);

    const height = 90;

    if (!ADS_ENABLED) {
        return (
            <div className={className} style={{ width: '100%', margin: '16px 0', height, overflow: 'hidden', ...style }}>
                <div className="adsense-banner" style={{ height, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(23, 26, 30, 0.25)', border: '1px dashed var(--border-subtle)', borderRadius: 12, fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.5 }}>Sponsored Link</span>
                </div>
            </div>
        );
    }

    return (
        <div className={className} style={{ width: '100%', margin: '16px 0', height, overflow: 'hidden', ...style }}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', height }}
                data-ad-client={AD_CLIENT}
                data-ad-slot={adSlot || "bottom-banner-slot"}
                data-ad-format="horizontal"
                data-full-width-responsive="false"
            />
        </div>
    );
}
