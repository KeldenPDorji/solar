'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Event {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    maxParticipants: number;
}

export default function EventDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchEvent();
    }, [slug]);

    const fetchEvent = async () => {
        try {
            const response = await fetch(`/api/events/${slug}`);
            if (response.ok) {
                const data = await response.json();
                setEvent(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch event:', error);
            setError('Event not found');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setSubmitting(true);

        try {
            const response = await fetch('/api/events/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventId: event?.id,
                    ...formData,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Registration successful! Check your email for confirmation.');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    organization: '',
                });
                setTimeout(() => router.push('/events'), 2000);
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch (error) {
            setError('An error occurred during registration');
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white pt-20">
                <div className="max-w-4xl mx-auto px-4">
                    <p className="text-center text-gray-600">Loading event...</p>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-white pt-20">
                <div className="max-w-4xl mx-auto px-4">
                    <p className="text-center text-red-600">Event not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-20">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <button onClick={() => router.back()} className="text-blue-600 hover:underline mb-6">
                    ← Back
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>

                        <div className="space-y-4 mb-8 text-gray-600">
                            <p>
                                <span className="font-semibold">📅 Start:</span> {new Date(event.startDate).toLocaleString()}
                            </p>
                            <p>
                                <span className="font-semibold">📅 End:</span> {new Date(event.endDate).toLocaleString()}
                            </p>
                            <p>
                                <span className="font-semibold">📍 Location:</span> {event.location}
                            </p>
                            <p>
                                <span className="font-semibold">👥 Max Participants:</span> {event.maxParticipants}
                            </p>
                        </div>

                        <div className="prose max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: event.description }} />
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-8 h-fit">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Register for Event</h2>

                        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
                        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                                <input
                                    type="text"
                                    name="organization"
                                    value={formData.organization}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                            >
                                {submitting ? 'Registering...' : 'Register'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
