"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';

const links = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-secondary/95 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="text-2xl md:text-3xl font-heading font-bold text-primary flex flex-col items-center">
                        <span>DAR-AL-MANDI</span>
                        <span className="text-[10px] tracking-widest text-[#F6F3EE]/70 font-body uppercase mt-1">Authentic Arabian Experience</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm uppercase tracking-wider font-semibold transition-colors ${pathname === link.href ? 'text-primary' : 'text-[#F6F3EE] hover:text-primary'}`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Quick Actions */}
                        <div className="flex items-center space-x-4 border-l border-primary/30 pl-4">
                            <Link href="/order" className="text-[#F6F3EE] hover:text-primary transition-colors">
                                <ShoppingBag size={20} />
                            </Link>
                            <Link href="/reservation" className="bg-primary hover:bg-primary-hover text-secondary px-5 py-2 rounded-sm font-semibold text-sm uppercase tracking-wider transition-colors">
                                Book Table
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center space-x-4">
                        <Link href="/order" className="text-[#F6F3EE] hover:text-primary transition-colors">
                            <ShoppingBag size={20} />
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-primary hover:text-primary-hover focus:outline-none"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-secondary/95 backdrop-blur-md shadow-lg border-t border-primary/20 md:hidden"
                    >
                        <div className="flex flex-col items-center py-8 space-y-6">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-lg uppercase tracking-wider font-semibold ${pathname === link.href ? 'text-primary' : 'text-[#F6F3EE] hover:text-primary'}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/reservation"
                                onClick={() => setIsOpen(false)}
                                className="bg-primary text-secondary px-8 py-3 rounded-sm font-semibold text-base uppercase tracking-wider mt-4"
                            >
                                Book a Table
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
