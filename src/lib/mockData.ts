export interface Trend {
    id: string;
    title: string;
    description: string;
    category: string;
    growth: number; // Percentage growth
    volume: string; // Search volume
}

export const MOCK_TRENDS: Trend[] = [
    {
        id: "1",
        title: "Precision Fermentation",
        description: "Microbes programmed to produce specific functional ingredients like dairy proteins and fats without animals.",
        category: "Alternative Proteins",
        growth: 125,
        volume: "High",
    },
    {
        id: "2",
        title: "Upcycled Food Waste",
        description: "Turning food byproducts into high-value ingredients to reduce waste and improve sustainability.",
        category: "Sustainability",
        growth: 85,
        volume: "Medium",
    },
    {
        id: "3",
        title: "AI in Food Supply Chain",
        description: "Using artificial intelligence to optimize logistics, reduce spoilage, and predict consumer demand.",
        category: "Technology",
        growth: 200,
        volume: "Very High",
    },
    {
        id: "4",
        title: "Personalized Nutrition",
        description: "Diets tailored to individual genetic profiles and gut microbiome analysis.",
        category: "Health & Wellness",
        growth: 60,
        volume: "Medium",
    },
    {
        id: "5",
        title: "Lab-Grown Meat Scaling",
        description: "Challenges and breakthroughs in scaling cultivated meat production for mass markets.",
        category: "Alternative Proteins",
        growth: 95,
        volume: "High",
    },
];
