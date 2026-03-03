import { Trend } from "./mockData";

export interface GeneratedPost {
    headline: string;
    content: string;
    hashtags: string[];
    imagePrompts: string[];
}

export async function generatePost(trend: Trend): Promise<GeneratedPost> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
        headline: `The Future of ${trend.category}: Why ${trend.title} Matters`,
        content: `🚀 ${trend.title} is revolutionizing the ${trend.category} industry!\n\n${trend.description}\n\nWith a growth of ${trend.growth}% this year, it's clear that consumers are demanding more sustainable and innovative solutions.\n\nHere's why you should be paying attention:\n1️⃣ Impact on sustainability\n2️⃣ Changing consumer preferences\n3️⃣ Investment opportunities\n\nAre you ready for this shift? 👇`,
        hashtags: ["#FoodTech", `#${trend.title.replace(/\s+/g, "")}`, "#Innovation", "#Sustainability", "#FutureOfFood"],
        imagePrompts: [
            `Futuristic representation of ${trend.title} in a high-tech lab setting, professional photography style`,
            `Infographic showing the ${trend.growth}% growth of ${trend.title} vs traditional methods`,
            `Happy consumers enjoying products made with ${trend.title}, bright and airy atmosphere`,
        ],
    };
}
