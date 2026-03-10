import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Users, Store, DollarSign, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="flex min-h-screen flex-col bg-muted/20">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
                    <Badge variant="default" className="bg-primary text-white">Live Data</Badge>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                                <h3 className="text-2xl font-bold mt-1">₹1,24,500</h3>
                                <p className="text-xs text-green-600 flex items-center mt-1"><TrendingUp className="w-3 h-3 mr-1" /> +12% from last month</p>
                            </div>
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                                <DollarSign className="w-6 h-6" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Active Orders</p>
                                <h3 className="text-2xl font-bold mt-1">34</h3>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <Activity className="w-6 h-6" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                                <h3 className="text-2xl font-bold mt-1">1,402</h3>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                <Users className="w-6 h-6" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Restaurants</p>
                                <h3 className="text-2xl font-bold mt-1">156</h3>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                                <Store className="w-6 h-6" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Orders Table Mock */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted text-muted-foreground text-xs uppercase">
                                    <tr>
                                        <th className="px-4 py-3 rounded-tl-lg">Order ID</th>
                                        <th className="px-4 py-3">Customer</th>
                                        <th className="px-4 py-3">Restaurant</th>
                                        <th className="px-4 py-3">Amount</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3 rounded-tr-lg">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { id: "#ORD-8432", name: "John Doe", rest: "Burger King", amt: "₹630", status: "Preparing" },
                                        { id: "#ORD-8431", name: "Sarah Smith", rest: "Domino's Pizza", amt: "₹850", status: "Out for Delivery" },
                                        { id: "#ORD-8430", name: "Mike Johnson", rest: "Starbucks Coffee", amt: "₹420", status: "Delivered" },
                                    ].map((order, i) => (
                                        <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                                            <td className="px-4 py-3 font-medium">{order.id}</td>
                                            <td className="px-4 py-3">{order.name}</td>
                                            <td className="px-4 py-3">{order.rest}</td>
                                            <td className="px-4 py-3 font-semibold">{order.amt}</td>
                                            <td className="px-4 py-3">
                                                <Badge variant={order.status === "Delivered" ? "success" : order.status === "Preparing" ? "warning" : "default"}>
                                                    {order.status}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3">
                                                <button className="text-primary hover:underline font-medium">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
