"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export interface MenuItemCardProps {
    id: string;
    name: string;
    description: string;
    price: string;
    rating?: number;
    votes?: string;
    image?: string;
    isBestseller?: boolean;
    isVeg?: boolean;
}

export function MenuItemCard({
    id,
    name,
    description,
    price,
    rating,
    votes,
    image,
    isBestseller,
    isVeg = true,
}: MenuItemCardProps) {
    const { addItem } = useCart();

    const handleAdd = () => {
        // parse fixed price like ₹180 -> 180
        const numericPrice = parseInt(price.replace(/[^0-9]/g, "")) || 100;
        addItem({
            id,
            name,
            price: numericPrice,
            quantity: 1,
            image,
        });
    };

    return (
        <Card className="overflow-hidden border-border hover:border-primary/20 transition-colors">
            <CardContent className="p-0 flex flex-col sm:flex-row gap-4">
                {/* Content Side */}
                <div className="flex-1 p-4 sm:p-6 pr-0 sm:pr-4 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                        <div className={`w-4 h-4 rounded-sm border ${isVeg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center`}>
                            <div className={`w-2 h-2 rounded-full ${isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                        </div>
                        {isBestseller && (
                            <span className="text-xs font-bold text-[#b91c1c] bg-[#fee2e2] px-2 py-0.5 rounded-full">
                                Bestseller
                            </span>
                        )}
                    </div>

                    <h3 className="font-bold text-lg mb-1">{name}</h3>
                    <p className="font-semibold text-foreground/90 mb-2">{price}</p>

                    {rating && (
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1 text-[#b91c1c]">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-current' : 'text-muted-foreground opacity-30'}`} />
                                ))}
                            </div>
                            <span className="text-xs text-muted-foreground font-medium">{votes} votes</span>
                        </div>
                    )}

                    <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-3">
                        {description}
                    </p>
                </div>

                {/* Image & Action Side */}
                {image && (
                    <div className="relative w-full sm:w-[150px] aspect-[4/3] sm:aspect-square shrink-0 p-4 sm:p-6 sm:pl-0">
                        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-sm">
                            <Image
                                src={image}
                                alt={name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-2 sm:bottom-2 left-1/2 -translate-x-1/2 w-[80%]">
                            <Button onClick={handleAdd} className="w-full h-9 rounded-lg bg-white text-green-700 hover:text-green-800 hover:bg-gray-50 border border-border shadow font-extrabold uppercase text-xs tracking-wider">
                                Add
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
