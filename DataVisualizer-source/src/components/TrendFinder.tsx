"use client";

import { useState } from "react";
import { MOCK_TRENDS, Trend } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { TrendingUp, ArrowRight } from "lucide-react";

interface TrendFinderProps {
    onSelectTrend: (trend: Trend) => void;
}

export default function TrendFinder({ onSelectTrend }: TrendFinderProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleSelect = (trend: Trend) => {
        setSelectedId(trend.id);
        onSelectTrend(trend);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                    Discover Food Tech Trends
                </h2>
                <p className="text-gray-600">
                    Select a trending topic to generate a viral LinkedIn post.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_TRENDS.map((trend) => (
                    <div
                        key={trend.id}
                        onClick={() => handleSelect(trend)}
                        className={cn(
                            "cursor-pointer group relative p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg",
                            selectedId === trend.id
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-100 bg-white hover:border-blue-200"
                        )}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                                {trend.category}
                            </span>
                            <span className="flex items-center text-green-600 text-sm font-medium">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                +{trend.growth}%
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700">
                            {trend.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">{trend.description}</p>
                        <div className="flex items-center text-blue-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            Generate Post <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
