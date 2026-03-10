import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-card border-t border-border pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-3xl tracking-tighter text-foreground">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                                <span className="font-extrabold text-xl">F</span>
                            </div>
                            FoodVerse
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Discover the best food & drinks in your city. From swanky upscale restaurants to the cosiest hidden gems serving the most incredible food.
                        </p>
                    </div>

                    {/* About */}
                    <div>
                        <h4 className="font-semibold mb-4 tracking-tight">About FoodVerse</h4>
                        <ul className="space-y-2 text-sm text-foreground/80">
                            <li><Link href="#" className="hover:text-primary transition-colors">Who We Are</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Work With Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Investor Relations</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Discover */}
                    <div>
                        <h4 className="font-semibold mb-4 tracking-tight">Discover</h4>
                        <ul className="space-y-2 text-sm text-foreground/80">
                            <li><Link href="#" className="hover:text-primary transition-colors">Trending Restaurants</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Super Savers</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Restaurant Owners</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">FoodVerse For Work</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-semibold mb-4 tracking-tight">Social Links</h4>
                        <div className="flex gap-4">
                            <Link href="#" className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                <Youtube className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} FoodVerse Inc. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-foreground">Privacy</Link>
                        <Link href="#" className="hover:text-foreground">Terms</Link>
                        <Link href="#" className="hover:text-foreground">Security</Link>
                        <Link href="#" className="hover:text-foreground">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
