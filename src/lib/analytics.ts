'use client';

/**
 * Safe wrapper for Google Analytics 4 event tracking.
 * Ensures calls do not throw errors on the server or if blocked by ad-blockers.
 */
export function trackGAEvent(action: string, category: string, label?: string, value?: number) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        try {
            (window as any).gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value,
            });
        } catch (err) {
            console.warn('Failed to send GA event:', err);
        }
    }
}

export function trackToolUsage(toolSlug: string, toolName: string) {
    trackGAEvent('use_tool', 'Tools', `${toolName} (${toolSlug})`);
}

export function trackSearchQuery(query: string) {
    if (query && query.trim()) {
        trackGAEvent('search', 'Engagement', query.trim());
    }
}

export function trackFavoriteToggle(toolSlug: string, isFav: boolean) {
    trackGAEvent(isFav ? 'favorite_add' : 'favorite_remove', 'Favorites', toolSlug);
}

export function trackThemeToggle(theme: string) {
    trackGAEvent('theme_change', 'Preferences', theme);
}

export function trackDownload(toolSlug: string, fileType: string) {
    trackGAEvent('download_asset', 'Downloads', `${toolSlug} - ${fileType}`);
}

export function trackOutboundLink(url: string) {
    trackGAEvent('click_outbound', 'Outbound Links', url);
}
