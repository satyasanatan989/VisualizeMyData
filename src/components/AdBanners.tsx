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

    if (!ADS_ENABLED) {
        return (
            <div className={className} style={{ width: '100%', margin: '16px 0', ...style }}>
                <div className="adsense-banner" style={{ minHeight: 90 }}>
                    📢 Advertisement Space (Top Banner) - Disabled
                </div>
            </div>
        );
    }

    return (
        <div className={className} style={{ width: '100%', margin: '16px 0', overflow: 'hidden', ...style }}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', minHeight: 90 }}
                data-ad-client={AD_CLIENT}
                data-ad-slot={adSlot || "top-banner-slot"}
                data-ad-format="auto"
                data-full-width-responsive="true"
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

    if (!ADS_ENABLED) {
        return (
            <div className={className} style={{ width: '100%', margin: '24px 0', ...style }}>
                <div className="adsense-banner" style={{ minHeight: 180 }}>
                    📢 Advertisement Space (Middle Banner) - Disabled
                </div>
            </div>
        );
    }

    return (
        <div className={className} style={{ width: '100%', margin: '24px 0', overflow: 'hidden', ...style }}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', minHeight: 180 }}
                data-ad-client={AD_CLIENT}
                data-ad-slot={adSlot || "middle-banner-slot"}
                data-ad-format="auto"
                data-full-width-responsive="true"
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

    if (!ADS_ENABLED) {
        return (
            <div className={className} style={{ width: '100%', margin: '16px 0', ...style }}>
                <div className="adsense-banner" style={{ minHeight: 90 }}>
                    📢 Advertisement Space (Bottom Banner) - Disabled
                </div>
            </div>
        );
    }

    return (
        <div className={className} style={{ width: '100%', margin: '16px 0', overflow: 'hidden', ...style }}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', minHeight: 90 }}
                data-ad-client={AD_CLIENT}
                data-ad-slot={adSlot || "bottom-banner-slot"}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
}
