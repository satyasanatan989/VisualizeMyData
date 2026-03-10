import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoryPill } from "@/components/food/CategoryPill";
import { RestaurantCard } from "@/components/food/RestaurantCard";

// Mock Data
const categories = [
  { name: "Pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400" },
  { name: "Biryani", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=400" },
  { name: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400" },
  { name: "Dessert", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400" },
  { name: "Healthy", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400" },
  { name: "Rolls", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=400" },
];

const trendingRestaurants = [
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
  }
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Banner Section */}
        <section className="bg-gradient-to-r from-primary-900 via-primary-700 to-primary text-white py-16 md:py-24 overflow-hidden relative">
          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
              Discover the best food & drinks
            </h1>
            <p className="text-lg md:text-2xl text-primary-50 max-w-2xl font-medium">
              Find incredible restaurants, cozy cafes, and exquisite bars near your location.
            </p>
            {/* Mobile Search Input */}
            <div className="w-full max-w-md md:hidden mt-8 bg-white rounded-xl shadow-xl overflow-hidden flex p-1">
              <input type="text" placeholder="Search for food..." className="flex-1 px-4 py-3 outline-none text-black" />
              <button className="bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                Search
              </button>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        </section>

        {/* Categories Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Inspiration for your first order</h2>
            <div className="flex items-center gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {categories.map((category) => (
                <div key={category.name} className="snap-start shrink-0">
                  <CategoryPill {...category} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section className="py-12 md:py-16 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Delivery Restaurants in Mumbai</h2>
            <p className="text-muted-foreground mb-8 text-sm md:text-base">Order from the best restaurants in your city.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {trendingRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
              {trendingRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id + "_dup"} {...restaurant} distance={(parseFloat(restaurant.distance) + 1.2).toFixed(1) + " km"} />
              ))}
            </div>
          </div>
        </section>

        {/* App Download Banner */}
        <section className="py-20 bg-background border-t border-border mt-auto">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 max-w-xl space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Get the FoodVerse App</h2>
              <p className="text-lg text-muted-foreground">
                We will send you a link, open it on your phone to download the app. App is available for iOS and Android devices.
              </p>
              <div className="flex gap-4">
                {/* Mock badges */}
                <div className="w-40 h-12 bg-black rounded-xl border border-border flex items-center justify-center shrink-0 cursor-pointer hover:-translate-y-1 transition-transform">
                  <div className="text-white font-semibold text-sm">App Store</div>
                </div>
                <div className="w-40 h-12 bg-black rounded-xl border border-border flex items-center justify-center shrink-0 cursor-pointer hover:-translate-y-1 transition-transform">
                  <div className="text-white font-semibold text-sm">Google Play</div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center relative w-full max-w-[300px] aspect-[1/2]">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <div className="w-[280px] h-[580px] border-8 border-foreground rounded-[40px] bg-card p-4 relative z-10 shadow-2xl flex flex-col overflow-hidden">
                <div className="flex-1 bg-muted rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-primary font-bold text-2xl rotate-45 opacity-20">FOODVERSE</div>
                  <Image src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400" alt="App preview" fill className="object-cover opacity-80" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
