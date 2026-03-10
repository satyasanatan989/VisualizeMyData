import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface RestaurantCardProps {
    id: string;
    name: string;
    image: string;
    rating: number;
    ratingCount: string;
    cuisines: string[];
    priceForTwo: string;
    deliveryTime: string;
    distance: string;
    promoted?: boolean;
    offer?: string;
}

export function RestaurantCard({
    id,
    name,
    image,
    rating,
    ratingCount,
    cuisines,
    priceForTwo,
    deliveryTime,
    distance,
    promoted,
    offer,
}: RestaurantCardProps) {
    return (
        <Link href={`/restaurant/${id}`}>
            <Card className="group h-full cursor-pointer overflow-hidden border-transparent hover:border-border hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Top Tags */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {promoted && (
                            <Badge variant="secondary" className="bg-white/90 text-black shadow-sm text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 w-fit">
                                Promoted
                            </Badge>
                        )}
                    </div>

                    {/* Bottom Info Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                        {offer ? (
                            <div className="font-extrabold text-white text-lg tracking-tight bg-blue-600/90 px-2 py-1 rounded-md max-w-[70%] leading-tight shadow-sm hover:scale-105 transition-transform">
                                {offer}
                            </div>
                        ) : <div />}
                        <div className="text-white text-xs font-semibold bg-white/20 backdrop-blur-md px-2 py-1 rounded">
                            {deliveryTime}
                        </div>
                    </div>
                </div>

                <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-lg truncate pr-2 text-foreground group-hover:text-primary transition-colors">{name}</h3>
                        <div className="flex flex-col items-end shrink-0">
                            <div className="flex items-center gap-1 bg-green-700 text-white px-1.5 py-0.5 rounded text-xs font-bold shadow-sm">
                                <span>{rating}</span>
                                <Star className="w-3 h-3 fill-current" />
                            </div>
                            <span className="text-[10px] text-muted-foreground mt-0.5">{ratingCount}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-muted-foreground mt-1 mb-3">
                        <p className="truncate pr-4">{cuisines.join(", ")}</p>
                        <p className="shrink-0">{priceForTwo}</p>
                    </div>

                    <div className="border-t border-border pt-3 flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Image src="/icons/delivery.svg" width={12} height={12} alt="Delivery" className="opacity-70" />
                        </div>
                        <span className="text-xs text-muted-foreground truncate">
                            {distance} • Free delivery on certain orders
                        </span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
