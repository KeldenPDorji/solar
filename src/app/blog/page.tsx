'use client';

import { useState, useEffect } from 'react';

interface NewsItem {
    id: string;
    title: string;
    slug: string;
    shortExcerpt: string;
    imageUrl?: string;
    featured: boolean;
    publishedAt: string;
    createdAt: string;
}

export default function BlogPage() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await fetch('/api/news');
            if (response.ok) {
                const data = await response.json();
                setNews(data.data || []);
            }
        } catch (error) {
            console.error('Failed to fetch news:', error);
        } finally {
            setLoading(false);
        }
    };

    const featuredNews = news.filter((n) => n.featured && n.publishedAt) || [];
    const otherNews = news.filter((n) => !n.featured && n.publishedAt) || [];

    if (loading) {
        return (
            <div className="min-h-screen bg-white pt-20">
                <div className="max-w-6xl mx-auto px-4">
                    <p className="text-center text-gray-600">Loading articles...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-20">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog & News</h1>
                    <p className="text-xl text-gray-600">Latest updates and articles from STAR-C</p>
                </div>

                {/* Featured Articles */}
                {featuredNews.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {featuredNews.map((item) => (
                                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    {item.imageUrl && (
                                        <div className="h-48 bg-gray-200 overflow-hidden">
                                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-gray-600 mb-4">{item.shortExcerpt}</p>
                                        <p className="text-sm text-gray-500">
                                            {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : 'Unpublished'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* All Articles */}
                {otherNews.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
                        <div className="grid grid-cols-1 gap-6">
                            {otherNews.map((item) => (
                                <div key={item.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow border-l-4 border-blue-500">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 mb-4">{item.shortExcerpt}</p>
                                    <p className="text-sm text-gray-500">
                                        {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : 'Unpublished'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {news.filter((n) => n.publishedAt).length === 0 && (
                    <div className="bg-gray-50 rounded-lg p-12 text-center">
                        <p className="text-gray-600 text-lg">No published articles yet. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
