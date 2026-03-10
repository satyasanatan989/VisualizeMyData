"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export function CartSidebar() {
    const { items, isOpen, setIsOpen, updateQuantity, cartTotal, itemCount } = useCart();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[100] transition-opacity backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Wrapper */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-background shadow-2xl z-[101] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center gap-2 font-bold text-lg">
                        <ShoppingBag className="w-5 h-5" />
                        Your Cart ({itemCount})
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-full hover:bg-foreground/5 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    {items.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground space-y-4">
                            <ShoppingBag className="w-16 h-16 opacity-20" />
                            <p className="font-medium">Your cart is empty</p>
                            <Button onClick={() => setIsOpen(false)} variant="outline">
                                Browse Restaurants
                            </Button>
                        </div>
                    ) : (
                        <>
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 bg-card border border-border rounded-xl p-3 shadow-sm">
                                    {item.image && (
                                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 relative">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                                        <p className="font-bold text-sm mt-1">₹{item.price}</p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-3 bg-foreground/5 rounded-lg px-2 py-1 shrink-0">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="text-muted-foreground hover:text-foreground hover:bg-white dark:hover:bg-black rounded p-0.5 transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="text-green-600 hover:text-green-700 hover:bg-white dark:hover:bg-black rounded p-0.5 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-4 bg-muted/30 rounded-xl p-4 space-y-3">
                                <h4 className="font-semibold border-b border-border pb-2 mb-2">Bill Details</h4>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Item Total</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Delivery Fee</span>
                                    <span>₹40</span>
                                </div>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Taxes and Charges</span>
                                    <span>₹{Math.round(cartTotal * 0.05)}</span>
                                </div>
                                <div className="flex justify-between font-bold border-t border-border pt-3 mt-3">
                                    <span>To Pay</span>
                                    <span>₹{cartTotal + 40 + Math.round(cartTotal * 0.05)}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer Checkout */}
                {items.length > 0 && (
                    <div className="p-4 border-t border-border bg-background">
                        <Link href="/checkout" onClick={() => setIsOpen(false)}>
                            <Button className="w-full font-bold text-lg h-14 rounded-xl flex items-center justify-between px-6 shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-transform">
                                <span>Checkout</span>
                                <span>₹{cartTotal + 40 + Math.round(cartTotal * 0.05)} <span className="text-sm opacity-80 pl-1 font-normal">➔</span></span>
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
