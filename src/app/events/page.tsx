'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Event {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    startDate: string;
    endDate: string;
    location: string;
    maxParticipants: number;
    status: string;
}

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/events');
            if (response.ok) {
                const data = await response.json();
                setEvents(data.data || []);
            }
        } catch (error) {
            console.error('Failed to fetch events:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white pt-20">
                <div className="max-w-6xl mx-auto px-4">
                    <p className="text-center text-gray-600">Loading events...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-20">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
                    <p className="text-xl text-gray-600">Register for STAR-C training programs and seminars</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h2 className="text-2xl font-bold text-gray-900 flex-1">{event.title}</h2>
                                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                                            {event.status}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 mb-4">{event.shortDescription}</p>

                                    <div className="space-y-2 mb-6 text-sm text-gray-600">
                                        <p>
                                            <span className="font-semibold">📅 Date:</span>{' '}
                                            {new Date(event.startDate).toLocaleDateString()} -{' '}
                                            {new Date(event.endDate).toLocaleDateString()}
                                        </p>
                                        <p>
                                            <span className="font-semibold">📍 Location:</span> {event.location}
                                        </p>
                                        <p>
                                            <span className="font-semibold">👥 Max Participants:</span> {event.maxParticipants}
                                        </p>
                                    </div>

                                    <Link
                                        href={`/events/${event.slug}`}
                                        className="inline-block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Register Now
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-600 text-lg">No events available at the moment.</p>
                        </div>
                    )}
                </div>

                <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Check Your Registration Status</h3>
                    <p className="text-gray-600 mb-6">Track your event registration status using your email address</p>
                    <Link
                        href="/registration-status"
                        className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Check Status
                    </Link>
                </div>
            </div>
        </div>
    );
}
