import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-secondary text-[#F6F3EE] pt-20 pb-10 border-t border-primary/20">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="text-2xl md:text-3xl font-heading font-bold text-primary flex flex-col">
                            <span>DAR-AL-MANDI</span>
                            <span className="text-[10px] tracking-widest text-[#F6F3EE]/70 font-body uppercase mt-1">Authentic Arabian Experience</span>
                        </Link>
                        <p className="text-[#F6F3EE]/80 leading-relaxed max-w-sm">
                            Experience the true taste of Yemen and Arabia with our premium mandi, roasted meats, and traditional delicacies prepared with authentic spices.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-secondary transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-secondary transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-secondary transition-colors">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-heading font-semibold text-primary mb-6">Explore</h4>
                        <ul className="space-y-4">
                            {['Home', 'Our Menu', 'About Us', 'Book a Table', 'Order Online', 'Contact'].map((link) => (
                                <li key={link}>
                                    <Link href={`/${link.toLowerCase().replace(/ /g, '-')}`} className="text-[#F6F3EE]/80 hover:text-primary transition-colors flex items-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3"></span>
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xl font-heading font-semibold text-primary mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="text-primary mt-1 mr-3 shrink-0" size={20} />
                                <span className="text-[#F6F3EE]/80">123 Arabian Nights Blvd,<br />Downtown Eatery District,<br />Dubai, UAE</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="text-primary mr-3 shrink-0" size={20} />
                                <span className="text-[#F6F3EE]/80">+971 4 123 4567</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="text-primary mr-3 shrink-0" size={20} />
                                <span className="text-[#F6F3EE]/80">info@dar-al-mandi.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h4 className="text-xl font-heading font-semibold text-primary mb-6">Opening Hours</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Clock className="text-primary mt-1 mr-3 shrink-0" size={20} />
                                <div className="text-[#F6F3EE]/80">
                                    <p className="font-semibold text-[#F6F3EE]">Monday - Thursday</p>
                                    <p>11:00 AM - 11:30 PM</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <Clock className="text-primary mt-1 mr-3 shrink-0 opacity-0" size={20} />
                                <div className="text-[#F6F3EE]/80">
                                    <p className="font-semibold text-[#F6F3EE]">Friday - Sunday</p>
                                    <p>11:00 AM - 1:00 AM</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-primary/20 flex flex-col md:flex-row justify-between items-center text-sm text-[#F6F3EE]/60">
                    <p>&copy; {new Date().getFullYear()} Dar-Al-Mandi. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
