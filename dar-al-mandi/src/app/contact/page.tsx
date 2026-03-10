import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background pt-32 pb-24">
                <div className="container mx-auto px-4 max-w-6xl">

                    <div className="text-center mb-16 animate-fade-in-up">
                        <h1 className="text-5xl font-heading font-bold text-secondary mb-4">Contact Us</h1>
                        <p className="text-secondary/70 max-w-2xl mx-auto">We'd love to hear from you. For reservations, private events, or catering inquiries, please reach out.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">

                        {/* Contact Info */}
                        <div>
                            <div className="mb-12">
                                <h2 className="text-2xl font-heading font-bold text-secondary mb-6 border-b border-primary/20 pb-4">Get in Touch</h2>
                                <div className="space-y-6 text-secondary/80">
                                    <div className="flex items-start">
                                        <MapPin className="text-primary mt-1 mr-4 shrink-0" size={24} />
                                        <div>
                                            <h4 className="font-bold text-secondary">Address</h4>
                                            <p>123 Arabian Nights Blvd,<br />Downtown Eatery District,<br />Dubai, UAE</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Phone className="text-primary mt-1 mr-4 shrink-0" size={24} />
                                        <div>
                                            <h4 className="font-bold text-secondary">Phone & WhatsApp</h4>
                                            <p>+971 4 123 4567<br />+971 50 987 6543 (WhatsApp)</p>

                                            <a href="https://wa.me/971509876543" target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-3 text-sm font-semibold text-[#25D366] hover:text-[#128C7E] transition-colors">
                                                Message us on WhatsApp &rarr;
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Mail className="text-primary mt-1 mr-4 shrink-0" size={24} />
                                        <div>
                                            <h4 className="font-bold text-secondary">Email</h4>
                                            <p>reservations@dar-al-mandi.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-heading font-bold text-secondary mb-6 border-b border-primary/20 pb-4">Opening Hours</h2>
                                <div className="space-y-4 text-secondary/80">
                                    <div className="flex justify-between items-center py-2 border-b border-secondary/5">
                                        <span className="font-semibold text-secondary">Monday - Thursday</span>
                                        <span>11:00 AM - 11:30 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-secondary/5">
                                        <span className="font-semibold text-secondary">Friday - Sunday</span>
                                        <span>11:00 AM - 1:00 AM</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-8 rounded-sm shadow-xl border border-primary/10">
                            <h2 className="text-2xl font-heading font-bold text-primary mb-6">Send a Message</h2>
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-xs uppercase tracking-wider font-semibold text-secondary mb-2">Full Name</label>
                                    <input type="text" id="name" className="w-full px-4 py-3 bg-background border border-secondary/20 rounded-sm focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="email" className="block text-xs uppercase tracking-wider font-semibold text-secondary mb-2">Email Address</label>
                                        <input type="email" id="email" className="w-full px-4 py-3 bg-background border border-secondary/20 rounded-sm focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-xs uppercase tracking-wider font-semibold text-secondary mb-2">Phone Number</label>
                                        <input type="tel" id="phone" className="w-full px-4 py-3 bg-background border border-secondary/20 rounded-sm focus:outline-none focus:border-primary transition-colors" placeholder="+1 234 567 890" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-xs uppercase tracking-wider font-semibold text-secondary mb-2">Subject</label>
                                    <select id="subject" className="w-full px-4 py-3 bg-background border border-secondary/20 rounded-sm focus:outline-none focus:border-primary transition-colors text-secondary/80">
                                        <option>General Inquiry</option>
                                        <option>Private Event</option>
                                        <option>Catering</option>
                                        <option>Feedback</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-xs uppercase tracking-wider font-semibold text-secondary mb-2">Message</label>
                                    <textarea id="message" rows={5} className="w-full px-4 py-3 bg-background border border-secondary/20 rounded-sm focus:outline-none focus:border-primary transition-colors resize-none" placeholder="How can we help you?"></textarea>
                                </div>

                                <button type="button" className="w-full bg-primary hover:bg-primary-hover text-secondary py-4 rounded-sm font-semibold uppercase tracking-wider transition-colors mt-4">
                                    Send Message
                                </button>
                            </form>
                        </div>

                    </div>

                    {/* Map Embed (Placeholder visual) */}
                    <div className="mt-24 h-96 bg-secondary/10 relative flex items-center justify-center overflow-hidden rounded-sm border border-primary/20">
                        <div className="absolute inset-0 z-0 opacity-50 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Dubai&zoom=13&size=1000x400&maptype=roadmap&style=feature:all%7Celement:geometry%7Ccolor:0x242f3e&style=feature:water%7Celement:geometry%7Ccolor:0x17263c')] bg-cover bg-center mix-blend-multiply"></div>
                        <div className="z-10 bg-white p-6 rounded-sm shadow-xl text-center flex flex-col items-center">
                            <MapPin className="text-primary mb-2" size={32} />
                            <h3 className="font-heading font-bold text-lg text-secondary">Dar-Al-Mandi</h3>
                            <p className="text-secondary/70 text-sm">Downtown Eatery District, Dubai</p>
                            <a href="#" className="mt-4 text-xs font-bold uppercase text-primary hover:text-primary-hover transition-colors">Get Directions</a>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </>
    );
}
