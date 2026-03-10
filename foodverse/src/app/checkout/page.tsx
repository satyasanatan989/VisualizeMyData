"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, CreditCard, Banknote, MapPin } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const [isSuccess, setIsSuccess] = useState(false);

    const deliveryFee = 40;
    const taxes = Math.round(cartTotal * 0.05);
    const total = cartTotal + deliveryFee + taxes;

    const handlePlaceOrder = () => {
        // Simulate order placement
        setTimeout(() => {
            setIsSuccess(true);
            clearCart();
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="flex min-h-screen flex-col bg-background">
                <Navbar />
                <main className="flex-1 flex items-center justify-center p-4">
                    <div className="max-w-md w-full text-center space-y-6">
                        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BadgeCheck className="w-12 h-12" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Order Placed Successfully!</h1>
                        <p className="text-muted-foreground">Your delicious food is being prepared and will be delivered shortly.</p>
                        <div className="pt-8">
                            <Link href="/">
                                <Button className="w-full">Back to Home</Button>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="flex min-h-screen flex-col bg-background">
                <Navbar />
                <main className="flex-1 flex items-center justify-center p-4">
                    <div className="max-w-md w-full text-center space-y-6">
                        <h1 className="text-2xl font-bold">Your cart is empty</h1>
                        <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                        <Link href="/restaurants">
                            <Button>Browse Restaurants</Button>
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Secure Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Address and Payment */}
                    <div className="flex-1 space-y-6">
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" /> Delivery Address
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input placeholder="First Name" />
                                    <Input placeholder="Last Name" />
                                </div>
                                <Input placeholder="Phone Number" />
                                <Input placeholder="Flat, House no., Building, Company, Apartment" />
                                <Input placeholder="Area, Street, Sector, Village" />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input placeholder="Town/City" />
                                    <Input placeholder="Pincode" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-primary" /> Payment Method
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <label className="flex items-center p-4 border border-border rounded-xl cursor-pointer hover:bg-foreground/5 transition-colors">
                                        <input type="radio" name="payment" className="w-4 h-4 text-primary focus:ring-primary accent-primary" defaultChecked />
                                        <div className="ml-3 flex flex-col">
                                            <span className="font-semibold block">UPI (GPay, PhonePe, Paytm)</span>
                                            <span className="text-xs text-muted-foreground">Pay via any UPI app</span>
                                        </div>
                                    </label>
                                    <label className="flex items-center p-4 border border-border rounded-xl cursor-pointer hover:bg-foreground/5 transition-colors">
                                        <input type="radio" name="payment" className="w-4 h-4 text-primary focus:ring-primary accent-primary" />
                                        <div className="ml-3 flex flex-col">
                                            <span className="font-semibold block">Credit / Debit Card</span>
                                            <span className="text-xs text-muted-foreground">Visa, MasterCard, Amex</span>
                                        </div>
                                    </label>
                                    <label className="flex items-center p-4 border border-border rounded-xl cursor-pointer hover:bg-foreground/5 transition-colors">
                                        <input type="radio" name="payment" className="w-4 h-4 text-primary focus:ring-primary accent-primary" />
                                        <div className="ml-3 flex flex-col">
                                            <span className="font-semibold block flex items-center gap-2"><Banknote className="w-4 h-4" /> Cash on Delivery</span>
                                            <span className="text-xs text-muted-foreground">Pay at your doorstep</span>
                                        </div>
                                    </label>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="w-full lg:w-[400px] shrink-0">
                        <Card className="sticky top-24">
                            <CardHeader className="bg-muted/30 pb-4 border-b border-border">
                                <CardTitle className="text-xl">Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4 mb-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <div className="flex gap-2">
                                                <span className="font-medium">{item.quantity} x</span>
                                                <span className="truncate max-w-[180px]">{item.name}</span>
                                            </div>
                                            <span className="font-medium shrink-0">₹{item.price * item.quantity}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3 border-t border-border pt-4">
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>Item Total</span>
                                        <span>₹{cartTotal}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>Delivery Fee</span>
                                        <span>₹{deliveryFee}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>Taxes & Charges</span>
                                        <span>₹{taxes}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end border-t border-border pt-4 mt-4 mb-6">
                                    <span className="font-bold text-lg">To Pay</span>
                                    <span className="font-bold text-2xl text-primary">₹{total}</span>
                                </div>

                                <Button
                                    onClick={handlePlaceOrder}
                                    className="w-full h-14 text-lg font-bold shadow-md hover:-translate-y-0.5 transition-transform"
                                >
                                    Place Order
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
