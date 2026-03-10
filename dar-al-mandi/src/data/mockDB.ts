export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    featured?: boolean;
}

export const menuItems: MenuItem[] = [
    {
        id: "m1",
        name: "Classic Lamb Mandi",
        description: "Tender, slow-roasted lamb served over aromatic smoked rice with our signature spice blend.",
        price: 85,
        category: "Lamb Mandi",
        image: "https://images.unsplash.com/photo-1633504581786-316c8002b1b9?auto=format&fit=crop&q=80",
        featured: true,
    },
    {
        id: "m2",
        name: "Royal Chicken Mandi",
        description: "Half chicken marinated in special Yemeni spices, slow-cooked to perfection over fragrant basmati rice.",
        price: 65,
        category: "Chicken Mandi",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80",
        featured: true,
    },
    {
        id: "m3",
        name: "Dar-Al-Mandi Mixed Platter",
        description: "A feast of lamb mandi, chicken haneeth, and mixed grilled meats served on a giant platter of aromatic rice. Perfect for sharing.",
        price: 195,
        category: "Mixed Mandi",
        image: "https://images.unsplash.com/photo-1544378730-8b5104b288ee?auto=format&fit=crop&q=80",
        featured: true,
    },
    {
        id: "m4",
        name: "Lamb Kabsa",
        description: "Traditional Arabian rice dish cooked with succulent lamb, tomatoes, carrots, and a special blend of warm spices.",
        price: 80,
        category: "Arabic Rice Dishes",
        image: "https://images.unsplash.com/photo-1627012046835-24e5fa66d933?auto=format&fit=crop&q=80",
    },
    {
        id: "m5",
        name: "Mixed Grill",
        description: "Selection of premium shish tawook, lamb skewers, and beef kofta, served with garlic sauce and fresh Khubz.",
        price: 110,
        category: "Grilled Platters",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80",
        featured: true,
    },
    {
        id: "m6",
        name: "Hummus Beiruti",
        description: "Creamy hummus blended with fresh parsley, garlic, and drizzled with premium olive oil.",
        price: 25,
        category: "Appetizers",
        image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&q=80",
    },
    {
        id: "m7",
        name: "Kunafa",
        description: "Warm, sweet cheese pastry soaked in rose-water syrup and topped with crushed pistachios.",
        price: 35,
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1582650059535-649df2e212f4?auto=format&fit=crop&q=80",
        featured: true,
    },
    {
        id: "m8",
        name: "Fresh Mint Lemonade",
        description: "Refreshing blend of freshly squeezed lemon and crushed mint leaves.",
        price: 20,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80",
    }
];

export const testimonials = [
    {
        id: "t1",
        name: "Ahmed Al-Sayed",
        text: "The most authentic Lamb Mandi I've had outside of Yemen. The meat falls right off the bone and the rice is perfectly smoked.",
        rating: 5,
    },
    {
        id: "t2",
        name: "Sarah Jenkins",
        text: "Every dish is a masterpiece. The ambiance is pure luxury, yet the flavors are deeply traditional. Highly recommended!",
        rating: 5,
    },
    {
        id: "t3",
        name: "Mohammed K.",
        text: "Dar-Al-Mandi is the perfect place for family gatherings. The Mixed Platter is incredible value for the unbelievable quality.",
        rating: 5,
    }
];

export const categories = [
    "Lamb Mandi",
    "Chicken Mandi",
    "Mixed Mandi",
    "Grilled Platters",
    "Arabic Rice Dishes",
    "Appetizers",
    "Desserts",
    "Drinks"
];
