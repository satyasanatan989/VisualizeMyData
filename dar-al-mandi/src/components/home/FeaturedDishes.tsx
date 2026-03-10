"use client";

import { motion } from 'framer-motion';
import { menuItems } from '@/data/mockDB';
import MenuCard from '../menu/MenuCard';

export default function FeaturedDishes() {
    const featured = menuItems.filter(item => item.featured).slice(0, 3);

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center space-x-4 mb-4"
                    >
                        <div className="h-px w-8 bg-primary"></div>
                        <span className="text-primary uppercase tracking-[0.2em] font-semibold text-xs text-center">Chef's Recommendations</span>
                        <div className="h-px w-8 bg-primary"></div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-6"
                    >
                        Signature Dishes
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-secondary/70 leading-relaxed"
                    >
                        Discover our masterpieces, crafted with authentic spices imported directly from Yemen and slow-cooked to perfection in traditional style.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {featured.map((item, index) => (
                        <MenuCard key={item.id} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
