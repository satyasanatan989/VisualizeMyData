import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedDishes from '@/components/home/FeaturedDishes';
import Testimonials from '@/components/home/Testimonials';
import Gallery from '@/components/home/Gallery';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <HeroSection />

        {/* About Preview Section */}
        <section className="py-24 bg-[#F6F3EE] relative">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="h-px w-12 bg-primary"></div>
              <span className="text-primary uppercase tracking-[0.2em] font-semibold text-sm">Our Story</span>
              <div className="h-px w-12 bg-primary"></div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center text-secondary mb-12 max-w-3xl mx-auto leading-tight">
              A Legacy of Spices & Tradition
            </h2>

            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg md:text-xl text-secondary/80 font-light leading-relaxed mb-12">
                Rooted in the ancient culinary traditions of Yemen, Dar-Al-Mandi brings the authentic taste of the Arabian peninsula to your table. Our secret family spice blend and traditional underground tandoor cooking method guarantee meat that falls off the bone, served over perfectly smoked rice.
              </p>

              <div className="flex justify-center flex-col items-center">
                {/* Decorative element instead of image for simplicity but keeping structure */}
                <div className="w-16 h-px bg-primary/50 mb-4 block md:hidden"></div>
                {/* Fake Signature for aesthetics */}
                <div className="font-heading italic text-3xl text-secondary/30">Chef Al-Hasan</div>
              </div>
            </div>
          </div>
        </section>

        <FeaturedDishes />
        <Testimonials />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
