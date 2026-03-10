"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '@/data/mockDB';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="py-24 bg-secondary text-[#F6F3EE] relative overflow-hidden">
            {/* Subtle Pattern Background */}
            <div className="absolute inset-0 opacity-5 bg-pattern mix-blend-overlay"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="flex items-center justify-center space-x-4 mb-4">
                        <div className="h-px w-8 bg-primary"></div>
                        <span className="text-primary uppercase tracking-[0.2em] font-semibold text-xs text-center">Reviews</span>
                        <div className="h-px w-8 bg-primary"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Guest Experiences</h2>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    <div className="absolute top-0 left-0 text-primary/20 -translate-x-4 -translate-y-8 pointer-events-none">
                        <Quote size={80} className="fill-current" />
                    </div>

                    <div className="relative h-64 md:h-48">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 flex flex-col items-center justify-center text-center px-12"
                            >
                                <p className="text-xl md:text-2xl font-light italic text-[#F6F3EE]/90 leading-relaxed mb-8">
                                    "{testimonials[currentIndex].text}"
                                </p>
                                <div className="flex flex-col items-center">
                                    <div className="flex space-x-1 mb-3">
                                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                            <Star key={i} size={16} className="text-primary fill-primary" />
                                        ))}
                                    </div>
                                    <span className="font-heading font-bold tracking-wide text-lg text-primary">
                                        {testimonials[currentIndex].name}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-center mt-12 space-x-6">
                        <button
                            onClick={prev}
                            className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-secondary transition-colors"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={next}
                            className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-secondary transition-colors"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
