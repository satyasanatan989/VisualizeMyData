import type { Metadata } from 'next';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'How to Calculate Recipe Food Costs and Profit Margins | VisualizeMyData',
    description: 'Learn the exact formulas to calculate recipe portion costs, waste yield factors, and food cost percentages for your restaurant or food startup.',
    alternates: {
        canonical: 'https://visualizemydata.in/blog/food-costing-calculation-guide/',
    },
    openGraph: {
        title: 'How to Calculate Recipe Food Costs and Profit Margins | VisualizeMyData',
        description: 'Learn the exact formulas to calculate recipe portion costs, waste yield factors, and food cost percentages for your restaurant or food startup.',
        url: 'https://visualizemydata.in/blog/food-costing-calculation-guide/',
        type: 'article',
        siteName: 'VisualizeMyData',
        locale: 'en_US',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Food Costing Calculation Guide' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'How to Calculate Recipe Food Costs and Profit Margins',
        description: 'Calculate portion pricing, waste factors, and profit margins. Free guide for food tech startups.',
        images: ['/og-image.png'],
    },
};

export default function Page() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavbarWrapper />
            <article style={{ padding: '56px 0 80px' }}>
                <div className="container" style={{ maxWidth: 760 }}>
                    <div style={{ marginBottom: 40 }}>
                        <Link href="/blog" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>← Blog</Link>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 99, fontSize: '0.7rem', fontWeight: 700, color: '#8b5cf6', marginLeft: 12 }}>Food Technology</span>
                    </div>

                    <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.4rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 16 }}>
                        How to Calculate Recipe Portion Costs and Profit Margins
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 40 }}>July 2026 · 11 min read · By Prabhash Kumar</p>

                    <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
                        <p style={{ marginBottom: 24 }}>
                            In the food service and food technology industry, understanding your exact margins is what separates successful startups from failures. With raw material prices shifting, calculating the recipe food cost percentage is vital to pricing your menu items or retail packaging correctly.
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            In this guide, we will break down the essential formulas for recipe costing, portion splits, wastage adjustments, and profit margin analysis.
                        </p>

                        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginTop: 40, marginBottom: 16 }}>
                            1. The Portioned Ingredient Cost Formula
                        </h2>
                        <p style={{ marginBottom: 24 }}>
                            Before calculating overall recipe cost, you must calculate the cost of each portioned ingredient. 
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            **Formula:** 
                            {"$$\\text{Ingredient Cost} = \\left(\\frac{\\text{Recipe Qty}}{\\text{Purchase Qty}}\\right) \\times \\text{Purchase Cost}$$"}
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            For example, if you buy 10 kg of sugar for ₹600, and your recipe uses 250 g (0.25 kg), the sugar cost is:
                            {"$$(0.25 / 10) \\times 600 = \\text{₹15}$$"}
                        </p>

                        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginTop: 40, marginBottom: 16 }}>
                            2. Accounting for Wastage (Yield Percentage)
                        </h2>
                        <p style={{ marginBottom: 24 }}>
                            Raw ingredients often require trimming, peeling, or cooking, which reduces their weight before serving. This difference is your **Yield Percentage**.
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            **Formula:** 
                            {"$$\\text{Yield \\%} = \\left(\\frac{\\text{Edible Weight}}{\\text{As-Purchased Weight}}\\right) \\times 100$$"}
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            If you purchase 1 kg of onions and get 800 g of usable chopped onions after peeling, your yield is 80%. You must adjust your costing to reflect this:
                            {"$$\\text{Actual Cost} = \\frac{\\text{Purchased Cost}}{\\text{Yield \\%}}$$"}
                        </p>

                        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginTop: 40, marginBottom: 16 }}>
                            3. Food Cost Percentage &amp; Portion Pricing
                        </h2>
                        <p style={{ marginBottom: 24 }}>
                            Once you compile the sum of all portion costs (total recipe cost divided by portions yielded), you can evaluate pricing and margins:
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            **Formula:** 
                            {"$$\\text{Food Cost \\%} = \\left(\\frac{\\text{Portion Cost}}{\\text{Selling Price}}\\right) \times 100$$"}
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            **Standard Target:** Most restaurants and food production facilities aim for a food cost percentage of **28% to 35%**.
                        </p>

                        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginTop: 40, marginBottom: 16 }}>
                            Conclusion
                        </h2>
                        <p style={{ marginBottom: 24 }}>
                            Tracking recipe margins doesn't require complicated ERP databases. By using food science costing calculators client-side, chefs and entrepreneurs can dynamically update ingredient unit costs and portion margins in seconds.
                        </p>
                    </div>
                </div>
            </article>
            <Footer />
        </div>
    );
}
