import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MenuCard from '@/components/menu/MenuCard';
import { menuItems, categories } from '@/data/mockDB';

export default function MenuPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background pt-32 pb-24">
                <div className="container mx-auto px-4">

                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
                        <div className="flex items-center justify-center space-x-4 mb-6">
                            <div className="h-px w-12 bg-primary"></div>
                            <span className="text-primary uppercase tracking-[0.2em] font-semibold text-sm cursor-default">Our Offerings</span>
                            <div className="h-px w-12 bg-primary"></div>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-heading font-bold text-secondary mb-6">
                            The Royal Menu
                        </h1>
                        <p className="text-lg text-secondary/70 leading-relaxed font-light">
                            Explore our extensive selection of authentic premium dishes. Every recipe is crafted with the finest ingredients and our signature Yemeni spice blends.
                        </p>
                    </div>

                    {/* Menu Categories Grid */}
                    <div className="space-y-24">
                        {categories.map((category) => {
                            const itemsInCategory = menuItems.filter(item => item.category === category);
                            if (itemsInCategory.length === 0) return null;

                            return (
                                <section key={category} id={category.toLowerCase().replace(/ /g, '-')}>
                                    <div className="flex items-center space-x-6 mb-12">
                                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary">{category}</h2>
                                        <div className="flex-grow h-px bg-primary/20"></div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                                        {itemsInCategory.map((item, index) => (
                                            <MenuCard key={item.id} item={item} index={index} />
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>

                </div>
            </main>
            <Footer />
        </>
    );
}
