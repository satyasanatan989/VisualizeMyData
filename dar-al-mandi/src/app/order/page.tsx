"use client";

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { menuItems } from '@/data/mockDB';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function OrderPage() {
    // Simple cart state simulating a global store for this page demonstration
    const [cart, setCart] = useState([
        { ...menuItems[0], quantity: 2 },
        { ...menuItems[5], quantity: 1 }
    ]);

    const updateQuantity = (id: string, delta: number) => {
        setCart(cart.map(item => {
            if (item.id === id) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) };
            }
            return item;
        }));
    };

    const removeItem = (id: string) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 15;
    const total = subtotal + deliveryFee;

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background pt-32 pb-24">
                <div className="container mx-auto px-4 max-w-6xl">

                    <div className="text-center mb-16 animate-fade-in-up">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-4">Complete Your Order</h1>
                        <p className="text-secondary/70">Review your royal feast before checkout.</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Cart Items */}
                        <div className="lg:w-2/3">
                            <div className="bg-white p-6 md:p-8 rounded-sm shadow-sm border border-primary/10">
                                <h2 className="text-2xl font-heading font-bold text-secondary mb-6 pb-4 border-b border-primary/10">Your Cart</h2>

                                {cart.length === 0 ? (
                                    <div className="text-center py-12">
                                        <p className="text-secondary/60 mb-6">Your cart is empty.</p>
                                        <Link href="/menu" className="inline-block bg-primary text-secondary px-8 py-3 uppercase tracking-wider font-semibold text-sm hover:bg-primary-hover transition-colors rounded-sm">
                                            Browse Menu
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {cart.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-secondary/5 last:border-0 last:pb-0"
                                            >
                                                <div className="w-24 h-24 rounded-sm overflow-hidden shrink-0">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                </div>

                                                <div className="flex-grow">
                                                    <h3 className="font-heading font-bold text-lg text-secondary">{item.name}</h3>
                                                    <p className="text-sm text-secondary/60 line-clamp-1 mb-2">{item.description}</p>
                                                    <div className="text-primary font-bold">${item.price}</div>
                                                </div>

                                                <div className="flex items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0 justify-between sm:justify-end">
                                                    <div className="flex items-center border border-secondary/20 rounded-sm">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                            className="w-8 h-8 flex items-center justify-center text-secondary/60 hover:text-primary transition-colors"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="w-8 text-center font-semibold text-secondary">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                            className="w-8 h-8 flex items-center justify-center text-secondary/60 hover:text-primary transition-colors"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-accent/70 hover:text-accent transition-colors"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-1/3">
                            <div className="bg-white p-6 md:p-8 rounded-sm shadow-sm border border-primary/10 sticky top-32">
                                <h2 className="text-xl font-heading font-bold text-secondary mb-6 pb-4 border-b border-primary/10">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-secondary/80">
                                        <span>Subtotal</span>
                                        <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-secondary/80">
                                        <span>Delivery Fee</span>
                                        <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="border-t border-primary/20 pt-4 mb-8">
                                    <div className="flex justify-between items-center text-secondary">
                                        <span className="font-heading font-bold text-lg">Total</span>
                                        <span className="font-heading font-bold text-2xl text-primary">${total.toFixed(2)}</span>
                                    </div>
                                    <p className="text-xs text-secondary/50 mt-1 text-right">Includes VAT</p>
                                </div>

                                <button
                                    disabled={cart.length === 0}
                                    className="w-full bg-primary hover:bg-primary-hover text-secondary py-4 rounded-sm font-semibold uppercase tracking-wider transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    Proceed to Checkout
                                    <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                </button>

                                <p className="text-xs text-center text-secondary/50 mt-4 flex items-center justify-center">
                                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                    Kitchen is currently accepting orders
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
