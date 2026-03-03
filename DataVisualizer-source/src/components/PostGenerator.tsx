"use client";

import { useState, useEffect } from "react";
import { Trend } from "@/lib/mockData";
import { generatePost, GeneratedPost } from "@/lib/generator";
import { ArrowLeft, Copy, RefreshCw, Check, Share2, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostGeneratorProps {
    trend: Trend;
    onBack: () => void;
}

export default function PostGenerator({ trend, onBack }: PostGeneratorProps) {
    const [post, setPost] = useState<GeneratedPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const loadPost = async () => {
        setLoading(true);
        try {
            const data = await generatePost(trend);
            setPost(data);
        } catch (error) {
            console.error("Failed to generate post", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPost();
    }, [trend]);

    const handleCopy = () => {
        if (!post) return;
        const fullText = `${post.headline}\n\n${post.content}\n\n${post.hashtags.join(" ")}`;
        navigator.clipboard.writeText(fullText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="w-full max-w-4xl mx-auto p-12 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Generating Viral Content...</h2>
                <p className="text-gray-600">Analyzing {trend.title} trends and crafting the perfect hook.</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="text-center p-12">
                <p className="text-red-500">Failed to generate content. Please try again.</p>
                <button onClick={onBack} className="mt-4 text-blue-600 hover:underline">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Trends
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Post Preview */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-700 flex items-center">
                                <Share2 className="w-4 h-4 mr-2 text-blue-600" />
                                LinkedIn Preview
                            </h3>
                            <button
                                onClick={handleCopy}
                                className="text-sm flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4 mr-1 text-green-600" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4 mr-1" />
                                        Copy Text
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="font-bold text-lg text-gray-900">{post.headline}</div>
                            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                {post.content}
                            </div>
                            <div className="text-blue-600 font-medium">
                                {post.hashtags.join(" ")}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={loadPost}
                        className="w-full py-3 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Regenerate Content
                    </button>
                </div>

                {/* Right Column: Visuals */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <ImageIcon className="w-5 h-5 mr-2 text-blue-600" />
                            Suggested Visuals
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">
                            These image prompts are optimized for AI image generators like Midjourney or DALL-E.
                        </p>

                        <div className="space-y-4">
                            {post.imagePrompts.map((prompt, idx) => (
                                <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex justify-between items-start gap-3">
                                        <p className="text-sm text-gray-700 italic">"{prompt}"</p>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(prompt);
                                                // Optional: Add toast notification here
                                            }}
                                            className="text-gray-400 hover:text-blue-600 shrink-0"
                                            title="Copy prompt"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <h4 className="font-semibold text-blue-900 mb-2">Pro Tip</h4>
                        <p className="text-sm text-blue-800">
                            Carousel posts perform 3x better on LinkedIn. Use the suggested visuals to create a 3-5 slide PDF carousel explaining "{trend.title}".
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
