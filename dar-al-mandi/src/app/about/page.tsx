import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background pt-32 pb-24">
                <div className="container mx-auto px-4 max-w-5xl">

                    <div className="text-center mb-20 animate-fade-in-up">
                        <h1 className="text-5xl md:text-6xl font-heading font-bold text-secondary mb-6">Our Story</h1>
                        <div className="h-px w-24 bg-primary mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                        <div className="relative h-96 md:h-full min-h-[400px]">
                            <div className="absolute inset-0 bg-primary/20 rotate-3 rounded-sm shadow-xl z-0"></div>
                            <img
                                src="https://images.unsplash.com/photo-1544378730-8b5104b288ee?auto=format&fit=crop&q=80"
                                alt="Chef preparing Mandi"
                                className="absolute inset-0 w-full h-full object-cover -rotate-3 rounded-sm shadow-xl z-10 transition-transform duration-500 hover:rotate-0"
                            />
                        </div>

                        <div className="space-y-6 text-secondary/80 leading-relaxed font-light">
                            <h2 className="text-3xl font-heading font-bold text-secondary">The Roots of Flavor</h2>
                            <p>
                                Dar-Al-Mandi was born from a simple desire: to preserve and share the authentic culinary heritage of Yemen. Our journey began decades ago in the bustling spice markets of Sana&apos;a, where our ancestors traded the finest cardamom, cloves, and saffron.
                            </p>
                            <p>
                                The word "Mandi" essentially means "dew," reflecting the moist, tender texture of the meat, slow-cooked in a unique tandoor trench. We brought this ancient technique to your neighborhood, ensuring every bite carries the unmistakable smoke and spice of history.
                            </p>
                            <p>
                                What started as a family kitchen serving neighbors has grown into a beloved destination for those seeking genuine Arabian luxury dining without compromising on tradition.
                            </p>
                        </div>
                    </div>

                    <div className="bg-secondary text-[#F6F3EE] p-12 md:p-16 rounded-sm text-center shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-pattern mix-blend-overlay"></div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-heading font-bold text-primary mb-6">Our Philosophy</h3>
                            <p className="max-w-3xl mx-auto text-lg font-light leading-relaxed">
                                &quot;We don&apos;t just cook food; we craft experiences. Every grain of rice, every piece of meat, and every spice blend is a testament to our respect for the ingredients and the centuries-old traditions that guide our hands.&quot;
                            </p>
                            <div className="mt-8 font-heading italic text-2xl text-primary/70">
                                - Executive Chef Tariq Al-Hasan
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </>
    );
}
