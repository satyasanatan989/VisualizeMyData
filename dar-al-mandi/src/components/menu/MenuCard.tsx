"use client";

import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import Image from 'next/image';
import { MenuItem } from '@/data/mockDB';

interface MenuCardProps {
    item: MenuItem;
    index: number;
}

export default function MenuCard({ item, index }: MenuCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white border border-primary/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 rounded-sm"
        >
            {/* Featured Badge */}
            {item.featured && (
                <div className="absolute top-4 right-4 z-10 bg-primary text-secondary text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm flex items-center shadow-md">
                    <Star size={12} className="mr-1 fill-secondary" /> Featured
                </div>
            )}

            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                {/* Placeholder for actual next/image, using img for now with Unsplash */}
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
            </div>

            {/* Content Container */}
            <div className="p-6 relative">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="font-heading font-bold text-xl text-secondary pr-4 line-clamp-2">
                        {item.name}
                    </h3>
                    <span className="font-heading font-bold text-lg text-primary bg-primary/10 px-3 py-1 rounded-sm whitespace-nowrap">
                        ${item.price}
                    </span>
                </div>

                <p className="text-secondary/70 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {item.description}
                </p>

                {/* Action Area */}
                <div className="pt-4 border-t border-primary/10 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                        {item.category}
                    </span>

                    <button className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/5 hover:bg-primary text-secondary hover:text-white transition-all transform hover:scale-110">
                        <ShoppingBag size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
