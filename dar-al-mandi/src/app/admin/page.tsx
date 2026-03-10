"use client";

import { useState } from 'react';
import { menuItems } from '@/data/mockDB';
import { ShoppingBag, Users, Calendar, Settings, Edit, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('menu');
    const [items, setItems] = useState(menuItems);

    // Stats mock data
    const stats = [
        { label: 'Today Orders', value: '24', icon: <ShoppingBag size={20} /> },
        { label: 'Reservations', value: '12', icon: <Calendar size={20} /> },
        { label: 'Total Revenue', value: '$1,420', icon: <ShoppingBag size={20} /> },
        { label: 'Active Users', value: '156', icon: <Users size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">

            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-secondary text-white shrink-0">
                <div className="p-6">
                    <Link href="/" className="text-2xl font-heading font-bold text-primary flex flex-col">
                        <span>DAR-AL-MANDI</span>
                        <span className="text-[9px] tracking-widest text-white/50 font-body uppercase mt-1">Admin Panel</span>
                    </Link>
                </div>

                <nav className="mt-8">
                    <button
                        onClick={() => setActiveTab('menu')}
                        className={`w-full flex items-center px-6 py-4 text-left transition-colors ${activeTab === 'menu' ? 'bg-primary/20 text-primary border-r-4 border-primary' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <Settings size={20} className="mr-4" /> Menu Items
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`w-full flex items-center px-6 py-4 text-left transition-colors ${activeTab === 'orders' ? 'bg-primary/20 text-primary border-r-4 border-primary' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <ShoppingBag size={20} className="mr-4" /> Orders (Active)
                    </button>
                    <button
                        onClick={() => setActiveTab('reservations')}
                        className={`w-full flex items-center px-6 py-4 text-left transition-colors ${activeTab === 'reservations' ? 'bg-primary/20 text-primary border-r-4 border-primary' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <Calendar size={20} className="mr-4" /> Reservations
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-heading font-bold text-secondary capitalize">{activeTab} Management</h1>
                    <div className="flex items-center gap-4 text-sm font-semibold text-secondary/60">
                        <span>Admin</span>
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">A</div>
                    </div>
                </header>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-500 mb-1">{stat.label}</p>
                                <p className="text-3xl font-bold text-secondary">{stat.value}</p>
                            </div>
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                                {stat.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-6 min-h-[500px]">

                    {activeTab === 'menu' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-secondary font-heading">Menu Inventory</h2>
                                <button className="bg-primary hover:bg-primary-hover text-secondary px-4 py-2 font-semibold text-sm rounded-sm flex items-center transition-colors">
                                    <Plus size={16} className="mr-2" /> Add New Item
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-100 text-gray-500 text-sm">
                                            <th className="pb-3 px-4 font-semibold uppercase tracking-wider">Item Name</th>
                                            <th className="pb-3 px-4 font-semibold uppercase tracking-wider">Category</th>
                                            <th className="pb-3 px-4 font-semibold uppercase tracking-wider text-right">Price</th>
                                            <th className="pb-3 px-4 font-semibold uppercase tracking-wider text-center">Featured</th>
                                            <th className="pb-3 px-4 font-semibold uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item) => (
                                            <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-4 font-semibold text-secondary flex items-center">
                                                    <img src={item.image} alt="" className="w-10 h-10 rounded-full mr-3 object-cover" />
                                                    {item.name}
                                                </td>
                                                <td className="py-4 px-4 text-gray-600">{item.category}</td>
                                                <td className="py-4 px-4 font-bold text-primary text-right">${item.price}</td>
                                                <td className="py-4 px-4 text-center">
                                                    {item.featured ? (
                                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-sm font-semibold">Yes</span>
                                                    ) : (
                                                        <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-sm font-semibold">No</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-4 text-right">
                                                    <button className="text-blue-500 hover:text-blue-700 mr-3"><Edit size={18} /></button>
                                                    <button className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-400">
                            <ShoppingBag size={48} className="mb-4 text-gray-300" />
                            <p className="text-xl font-heading mb-2">Order Management Module</p>
                            <p className="text-sm">Connect to a live database to view incoming orders.</p>
                        </div>
                    )}

                    {activeTab === 'reservations' && (
                        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-400">
                            <Calendar size={48} className="mb-4 text-gray-300" />
                            <p className="text-xl font-heading mb-2">Reservation Management Module</p>
                            <p className="text-sm">Connect to a live database to view table bookings.</p>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}
