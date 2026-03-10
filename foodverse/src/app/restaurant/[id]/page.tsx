import Image from "next/image";
import { Star, MapPin, Clock, Info, Phone, ArrowLeft, Share } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MenuItemCard } from "@/components/food/MenuItemCard";
import { Badge } from "@/components/ui/badge";

const mockMenuItems = [
    {
        id: "m1",
        name: "Classic Chicken Burger",
        description: "Our signature chicken burger with crispy patty, fresh lettuce, tomatoes, and secret sauce.",
        price: "₹180",
        rating: 4.5,
        votes: "842",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400",
        isBestseller: true,
        isVeg: false,
    },
    {
        id: "m2",
        name: "Veggie Delight Burger",
        description: "A delightful mix of fresh veggies, potato patty, and cheese.",
        price: "₹150",
        rating: 4.2,
        votes: "320",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=400",
        isVeg: true,
    },
    {
        id: "m3",
        name: "French Fries (Large)",
        description: "Crispy golden french fries salted to perfection.",
        price: "₹110",
        rating: 4.8,
        votes: "1.2K+",
        isVeg: true,
    },
    {
        id: "m4",
        name: "Chocolate Shake",
        description: "Thick and creamy chocolate shake with chocolate chips.",
        price: "₹160",
        rating: 4.6,
        votes: "450",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400",
        isBestseller: true,
        isVeg: true,
    }
];

export default function RestaurantDetail({ params }: { params: { id: string } }) {
    // In a real app we would fetch the data using the ID

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />

            <main className="flex-1">
                {/* Breadcrumb & Navigation */}
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <span>/</span>
                        <Link href="/restaurants" className="hover:text-primary">Mumbai</Link>
                        <span>/</span>
                        <span className="text-foreground">Burger King</span>
                    </div>
                </div>

                {/* Restaurant Banner Gallery */}
                <div className="container mx-auto px-4 mb-8">
                    <div className="flex gap-2 h-[200px] md:h-[350px] rounded-2xl overflow-hidden shadow-sm">
                        <div className="relative w-full md:w-2/3 h-full cursor-pointer hover:opacity-95 transition-opacity">
                            <Image src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1200" alt="Restaurant Interior" fill className="object-cover" />
                        </div>
                        <div className="hidden md:flex flex-col gap-2 w-1/3 h-full">
                            <div className="relative w-full h-1/2 cursor-pointer hover:opacity-95 transition-opacity">
                                <Image src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600" alt="Food 1" fill className="object-cover" />
                            </div>
                            <div className="relative w-full h-1/2 cursor-pointer hover:opacity-95 transition-opacity">
                                <Image src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600" alt="Food 2" fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <span className="text-white font-bold text-lg border-2 border-white px-4 py-2 rounded-lg">View Gallery</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Restaurant Info */}
                <div className="container mx-auto px-4 mb-8 border-b border-border pb-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex-1 space-y-2">
                            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Burger King</h1>
                            <p className="text-lg text-muted-foreground">Burger, Fast Food, Beverages, Desserts</p>
                            <p className="text-muted-foreground">Andheri West, Mumbai</p>
                            <div className="flex items-center gap-4 text-sm mt-4 text-primary font-medium">
                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Open now - 11am to 11pm</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 shrink-0">
                            <div className="flex flex-col items-center justify-center bg-green-700 text-white rounded-xl p-3 shadow-md min-w-[80px]">
                                <div className="flex items-center gap-1 font-bold text-xl">
                                    4.2 <Star className="w-5 h-5 fill-current" />
                                </div>
                                <div className="text-[10px] opacity-90 border-t border-white/20 mt-1 pt-1 w-full text-center">
                                    10K+ Delivery Reviews
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-6">
                        <button className="flex items-center gap-2 border border-border px-4 py-2 rounded-lg hover:bg-foreground/5 transition-colors font-medium text-sm">
                            <Info className="w-4 h-4 text-primary" /> Info
                        </button>
                        <button className="flex items-center gap-2 border border-border px-4 py-2 rounded-lg hover:bg-foreground/5 transition-colors font-medium text-sm">
                            <Share className="w-4 h-4 text-primary" /> Share
                        </button>
                        <button className="flex items-center gap-2 border border-border px-4 py-2 rounded-lg hover:bg-foreground/5 transition-colors font-medium text-sm">
                            <Phone className="w-4 h-4 text-primary" /> Contact
                        </button>
                    </div>
                </div>

                {/* Menu Section */}
                <div className="container mx-auto px-4 mb-16 flex flex-col md:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <div className="w-full md:w-64 shrink-0 hidden md:block">
                        <div className="sticky top-24 space-y-1">
                            <h3 className="font-bold text-lg mb-4 pl-4 border-l-4 border-primary">Categories</h3>
                            {["Recommended", "Burgers", "Sides", "Beverages", "Desserts"].map((cat, i) => (
                                <button key={cat} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${i === 0 ? 'bg-primary/10 text-primary' : 'hover:bg-foreground/5 text-muted-foreground hover:text-foreground'}`}>
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="flex-1 space-y-8">
                        <section id="recommended">
                            <h2 className="text-2xl font-bold mb-6">Recommended <Badge variant="secondary" className="ml-2 font-normal">{mockMenuItems.length}</Badge></h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {mockMenuItems.map((item) => (
                                    <MenuItemCard key={item.id} {...item} />
                                ))}
                                {mockMenuItems.map((item) => (
                                    <MenuItemCard key={item.id + "_2"} {...item} />
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
