"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image & Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1633504581786-316c8002b1b9?auto=format&fit=crop&q=80')",
                }}
            >
                <div className="absolute inset-0 bg-secondary/70"></div>
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-20 bg-pattern mix-blend-overlay"></div>
            </div>

            {/* Content */}
            <div className="container relative z-10 mx-auto px-4 text-center mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="flex items-center justify-center space-x-4 mb-6">
                        <div className="h-px w-12 bg-primary"></div>
                        <span className="text-primary uppercase tracking-[0.2em] font-semibold text-sm">Welcome to</span>
                        <div className="h-px w-12 bg-primary"></div>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6 leading-tight">
                        Dar-<span className="text-primary">Al</span>-Mandi
                    </h1>

                    <p className="text-xl md:text-2xl text-[#F6F3EE]/90 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
                        Experience the royal taste of authentic Arabian Mandi, slow-cooked to perfection in traditional tandoors.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/order"
                            className="px-8 py-4 bg-primary hover:bg-primary-hover text-secondary font-semibold uppercase tracking-wider transition-colors w-full sm:w-auto text-center"
                        >
                            Order Online
                        </Link>
                        <Link
                            href="/menu"
                            className="px-8 py-4 border border-primary text-primary hover:bg-primary/10 font-semibold uppercase tracking-wider transition-colors w-full sm:w-auto text-center"
                        >
                            View Menu
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            >
                <span className="text-[#F6F3EE]/60 text-xs uppercase tracking-widest mb-2">Scroll Down</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
                />
            </motion.div>
        </div>
    );
}
