import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Package, Heart, Settings, MapPin, Clock } from "lucide-react";

export default function UserDashboard() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar */}
                    <div className="w-full md:w-64 shrink-0 space-y-2">
                        <div className="flex items-center gap-4 p-4 border border-border rounded-xl mb-6 bg-card shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xl">
                                JD
                            </div>
                            <div>
                                <h2 className="font-bold">John Doe</h2>
                                <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                            </div>
                        </div>

                        {[
                            { icon: Package, label: "Orders", active: true },
                            { icon: Heart, label: "Favorites" },
                            { icon: MapPin, label: "Addresses" },
                            { icon: Settings, label: "Settings" },
                        ].map((item, i) => (
                            <button
                                key={i}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${item.active ? "bg-primary text-white shadow-sm" : "hover:bg-foreground/5 text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Main Content: Orders */}
                    <div className="flex-1 space-y-6">
                        <h1 className="text-2xl font-bold tracking-tight">Recent Orders</h1>

                        <div className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <Card key={i} className="hover:border-foreground/20 transition-colors">
                                    <CardHeader className="p-4 md:p-6 pb-2 border-b border-border flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg">Burger King</CardTitle>
                                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                                <Clock className="w-3 h-3" /> Delivered on {new Date().toLocaleDateString()}
                                            </p>
                                        </div>
                                        <Badge variant="success" className="h-6">Delivered</Badge>
                                    </CardHeader>
                                    <CardContent className="p-4 md:p-6 flex flex-col md:flex-row justify-between gap-4 items-center">
                                        <div className="flex-1 text-sm text-muted-foreground">
                                            2 x Classic Chicken Burger, 1 x Chocolate Shake, 1 x French Fries (Large)
                                        </div>
                                        <div className="flex items-center gap-4 w-full md:w-auto mt-2 md:mt-0">
                                            <span className="font-bold whitespace-nowrap">Total: ₹630</span>
                                            <Button variant="outline" size="sm" className="hidden md:flex">Reorder</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
