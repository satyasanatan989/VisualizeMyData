"use client";

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Calendar as CalendarIcon, Clock, Users, User, Phone } from 'lucide-react';

export default function ReservationPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        guests: '2',
        date: '',
        time: '',
        specialRequests: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would send an API request
        console.log("Reservation requested:", formData);
        setSubmitted(true);
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">

                {/* Background Decorative Pattern */}
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 bg-pattern mix-blend-overlay pointer-events-none"></div>

                <div className="container mx-auto px-4 max-w-4xl relative z-10">

                    <div className="text-center mb-16 animate-fade-in-up">
                        <h1 className="text-5xl font-heading font-bold text-secondary mb-4">Reserve Your Table</h1>
                        <p className="text-secondary/70 max-w-xl mx-auto">Experience the royal ambiance of Dar-Al-Mandi. Book your table for an unforgettable authentic Arabian dining experience.</p>
                    </div>

                    <div className="bg-white p-8 md:p-12 rounded-sm shadow-xl border border-primary/20 relative">

                        {/* Ornate corner decorations */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary -translate-x-1 -translate-y-1"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary translate-x-1 -translate-y-1"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary -translate-x-1 translate-y-1"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary translate-x-1 translate-y-1"></div>

                        {submitted ? (
                            <div className="text-center py-16 animate-fade-in-up">
                                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <div className="w-4 h-8 border-b-4 border-r-4 border-primary transform rotate-45 -translate-y-1"></div>
                                </div>
                                <h2 className="text-3xl font-heading font-bold text-secondary mb-4">Request Received</h2>
                                <p className="text-secondary/70 mb-8 max-w-md mx-auto">
                                    Thank you, {formData.name}. We have received your reservation request for {formData.date} at {formData.time} for {formData.guests} guests.
                                </p>
                                <p className="text-sm font-semibold text-primary uppercase tracking-wider">
                                    Our team will contact you shortly to confirm.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-12 text-sm text-secondary/50 hover:text-primary transition-colors underline underline-offset-4"
                                >
                                    Make another reservation
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in-up">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Name */}
                                    <div className="relative">
                                        <label htmlFor="name" className="block text-xs uppercase tracking-wider font-semibold text-secondary mb-2">Full Name</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary/50">
                                                <User size={18} />
                                            </div>
                                            <input
                                                type="text"
                                                id="name"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full pl-12 pr-4 py-3 bg-background border border-secondary/20 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="relative">
                                        <label htmlFor="phone" className="block text-xs uppercase tracking-wider font-semibold text-secondary mb-2">Phone Number</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary/50">
                                                <Phone size={18} />
                                            </div>
                                            <input
                                                type="tel"
                                                id="phone"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full pl-12 pr-4 py-3 bg-background border border-secondary/20 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                                placeholder="+971 50 XXXXXXX"
                                            />
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div className="relative">
                                        <label htmlFor="date" className="block text-xs uppercase tracking-wider font-semibold text-secondary mb-2">Date</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary/50">
                                                <CalendarIcon size={18} />
                                            </div>
                                            <input
                                                type="date"
                                                id="date"
                                                required
                                                value={formData.date}
                                                min={new Date().toISOString().split('T')[0]}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                className="w-full pl-12 pr-4 py-3 bg-background border border-secondary/20 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-secondary"
                                            />
                                        </div>
                                    </div>

                                    {/* Time */}
                                    <div className="relative">
                                        <label htmlFor="time" className="block text-xs uppercase tracking-wider font-semibold text-secondary mb-2">Time</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary/50">
                                                <Clock size={18} />
                                            </div>
                                            <select
                                                id="time"
                                                required
                                                value={formData.time}
                                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                                className="w-full pl-12 pr-4 py-3 bg-background border border-secondary/20 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-secondary appearance-none"
                                            >
                                                <option value="" disabled>Select a time</option>
                                                <option value="12:00">12:00 PM</option>
                                                <option value="13:00">1:00 PM</option>
                                                <option value="14:00">2:00 PM</option>
                                                <option value="18:00">6:00 PM</option>
                                                <option value="19:00">7:00 PM</option>
                                                <option value="20:00">8:00 PM</option>
                                                <option value="21:00">9:00 PM</option>
                                                <option value="22:00">10:00 PM</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Guests */}
                                    <div className="relative md:col-span-2">
                                        <label htmlFor="guests" className="block text-xs uppercase tracking-wider font-semibold text-secondary mb-2">Number of Guests</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary/50">
                                                <Users size={18} />
                                            </div>
                                            <select
                                                id="guests"
                                                value={formData.guests}
                                                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                                                className="w-full pl-12 pr-4 py-3 bg-background border border-secondary/20 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-secondary appearance-none"
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "10+"].map(num => (
                                                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Special Requests */}
                                    <div className="relative md:col-span-2">
                                        <label htmlFor="requests" className="block text-xs uppercase tracking-wider font-semibold text-secondary mb-2">Special Requests (Optional)</label>
                                        <textarea
                                            id="requests"
                                            rows={3}
                                            value={formData.specialRequests}
                                            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                                            className="w-full px-4 py-3 bg-background border border-secondary/20 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                            placeholder="Allergies, seating preferences, occasions..."
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-primary/20">
                                    <button
                                        type="submit"
                                        className="w-full bg-primary hover:bg-primary-hover text-secondary py-4 rounded-sm font-semibold uppercase tracking-widest transition-colors shadow-lg shadow-primary/20"
                                    >
                                        Confirm Reservation Request
                                    </button>
                                    <p className="text-center text-xs text-secondary/50 mt-4">
                                        By submitting this form, you acknowledge that this is a request. Your table is not reserved until confirmed by our staff.
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>

                </div>
            </main>
            <Footer />
        </>
    );
}
