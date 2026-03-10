"use client";

import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

const galleryImages = [
    "https://images.unsplash.com/photo-1544378730-8b5104b288ee?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1627012046835-24e5fa66d933?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1633504581786-316c8002b1b9?auto=format&fit=crop&q=80",
];

export default function Gallery() {
    return (
        <section className="py-24 bg-[#F6F3EE]">
            <div className="container mx-auto px-4 mb-12">
                <div className="flex flex-col md:flex-row justify-between items-end">
                    <div className="max-w-xl">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="h-px w-8 bg-primary"></div>
                            <span className="text-primary uppercase tracking-[0.2em] font-semibold text-xs">Instagram</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-4">Follow Our Journey</h2>
                        <p className="text-secondary/70">Join our community and share your Dar-Al-Mandi experience with us. Tag @daralmandi to be featured.</p>
                    </div>
                    <a href="#" className="mt-6 md:mt-0 px-6 py-3 border border-secondary text-secondary hover:bg-secondary hover:text-[#F6F3EE] transition-colors flex items-center font-semibold text-sm uppercase tracking-wider">
                        <Instagram size={18} className="mr-2" />
                        @daralmandi
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-1 md:gap-2">
                {galleryImages.map((src, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className={`relative overflow-hidden group ${idx === 2 ? 'col-span-2 md:col-span-1 row-span-2 md:row-span-1 h-64 md:h-80' : 'h-48 md:h-80'}`}
                    >
                        <div className="absolute inset-0 bg-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                            <Instagram size={32} className="text-[#F6F3EE] transform scale-50 group-hover:scale-100 transition-transform duration-300" />
                        </div>
                        <img
                            src={src}
                            alt="Dar-Al-Mandi Instagram Gallery"
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
