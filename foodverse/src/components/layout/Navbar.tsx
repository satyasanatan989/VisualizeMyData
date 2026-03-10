"use client";

import Link from "next/link";
import { Search, MapPin, ShoppingBag, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useCart } from "@/context/CartContext";

export function Navbar() {
    const { setIsOpen, itemCount } = useCart();

    return (
        <nav className="sticky top-0 z-[60] w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-primary">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                        <span className="font-extrabold text-xl">F</span>
                    </div>
                    FoodVerse
                </Link>

                {/* Desktop Search Center */}
                <div className="hidden md:flex flex-1 max-w-2xl mx-auto shadow-sm shadow-black/5 rounded-full border border-border p-1 bg-card hover:border-primary/50 transition-colors">
                    <div className="flex items-center px-3 border-r border-border gap-2 text-muted-foreground w-1/3 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <input type="text" placeholder="Mumbai" className="w-full bg-transparent outline-none truncate" />
                    </div>
                    <div className="flex items-center px-3 gap-2 text-muted-foreground flex-1 text-sm bg-transparent">
                        <Search className="w-4 h-4" />
                        <input type="text" placeholder="Search for restaurant, cuisine or a dish" className="w-full bg-transparent outline-none truncate" />
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <ThemeToggle />
                    <Link href="/login" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                        <User className="w-5 h-5" />
                        <span>Log in</span>
                    </Link>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center gap-2 text-sm font-medium bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-600 transition-colors shadow-sm shadow-primary/20 relative"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        <span className="hidden sm:inline">Cart</span>
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                {itemCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}
