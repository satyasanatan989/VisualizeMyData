import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RestaurantCard } from "@/components/food/RestaurantCard";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

const mockRestaurants = [
    {
        id: "1",
        name: "Burger King",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=600",
        rating: 4.2,
        ratingCount: "10K+",
        cuisines: ["Burger", "American"],
        priceForTwo: "₹350 for two",
        deliveryTime: "25 min",
        distance: "1.5 km",
        offer: "60% OFF up to ₹120",
    },
    {
        id: "2",
        name: "Behrouz Biryani",
        image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=600",
        rating: 4.4,
        ratingCount: "5K+",
        cuisines: ["Biryani", "Mughlai", "North Indian"],
        priceForTwo: "₹700 for two",
        deliveryTime: "40 min",
        distance: "3.2 km",
        promoted: true,
    },
    {
        id: "3",
        name: "Domino's Pizza",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=600",
        rating: 4.1,
        ratingCount: "25K+",
        cuisines: ["Pizza", "Fast Food"],
        priceForTwo: "₹400 for two",
        deliveryTime: "30 min",
        distance: "2.1 km",
        offer: "₹150 OFF above ₹499",
    },
    {
        id: "4",
        name: "Kwality Wall's",
        image: "https://images.unsplash.com/photo-1559703248-dcaaec9fab78?auto=format&fit=crop&q=80&w=600",
        rating: 4.5,
        ratingCount: "12K+",
        cuisines: ["Desserts", "Ice Cream"],
        priceForTwo: "₹200 for two",
        deliveryTime: "20 min",
        distance: "1.8 km",
    },
    {
        id: "5",
        name: "Starbucks Coffee",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600",
        rating: 4.3,
        ratingCount: "4K+",
        cuisines: ["Beverages", "Desserts", "Bakery"],
        priceForTwo: "₹600 for two",
        deliveryTime: "35 min",
        distance: "4.5 km",
    },
    {
        id: "6",
        name: "Taco Bell",
        image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&q=80&w=600",
        rating: 4.0,
        ratingCount: "15K+",
        cuisines: ["Mexican", "Fast Food"],
        priceForTwo: "₹450 for two",
        deliveryTime: "45 min",
        distance: "5.1 km",
    }
];

const filters = [
    "Filters",
    "Rating: 4.0+",
    "Pure Veg",
    "Cuisines",
    "Less than 30 mins",
    "Price",
];

export default function RestaurantListing() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 bg-background pt-8 pb-16">
                <div className="container mx-auto px-4">

                    {/* Breadcrumbs & Title */}
                    <div className="text-xs text-muted-foreground mb-4">
                        Home / India / Mumbai / Restaurants
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mb-8">Delivery Restaurants in Mumbai</h1>

                    {/* Filters Bar */}
                    <div className="flex flex-wrap items-center gap-3 mb-8 pb-4 border-b border-border sticky top-16 bg-background z-40 py-2">
                        {filters.map((filter, index) => (
                            <button
                                key={index}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-sm font-medium hover:bg-foreground/5 hover:border-foreground/20 transition-colors bg-card shadow-sm"
                            >
                                {filter === "Filters" && <SlidersHorizontal className="w-4 h-4" />}
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Listing Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
                        {mockRestaurants.map((restaurant) => (
                            <RestaurantCard key={restaurant.id} {...restaurant} />
                        ))}
                        {/* Duplicating just to fill screen for aesthetics */}
                        {mockRestaurants.map((restaurant) => (
                            <RestaurantCard key={restaurant.id + "_2"} {...restaurant} distance={(parseFloat(restaurant.distance) + 2.3).toFixed(1) + " km"} />
                        ))}
                        {mockRestaurants.slice(0, 4).map((restaurant) => (
                            <RestaurantCard key={restaurant.id + "_3"} {...restaurant} distance={(parseFloat(restaurant.distance) + 1.1).toFixed(1) + " km"} />
                        ))}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
