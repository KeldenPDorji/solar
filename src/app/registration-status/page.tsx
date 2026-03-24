'use client';

import { useState } from 'react';

interface Registration {
    id: string;
    eventTitle: string;
    status: string;
    registeredAt: string;
    approvedAt?: string;
    eventDate: string;
}

export default function RegistrationStatusPage() {
    const [email, setEmail] = useState('');
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setSearched(true);

        try {
            const response = await fetch(`/api/events/status?email=${encodeURIComponent(email)}`);
            const data = await response.json();

            if (response.ok) {
                setRegistrations(data.data || []);
            } else {
                setError(data.error || 'Failed to fetch status');
            }
        } catch (error) {
            setError('An error occurred');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved':
                return '✓';
            case 'pending':
                return '⏳';
            case 'rejected':
                return '✗';
            default:
                return '•';
        }
    };

    return (
        <div className="min-h-screen bg-white pt-20">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Check Registration Status</h1>
                <p className="text-xl text-gray-600 mb-12">
                    Enter your email address to see the status of your event registrations
                </p>

                <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-8 mb-12">
                    <div className="flex gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            required
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                        >
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                </form>

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8">{error}</div>}

                {searched && !error && (
                    <>
                        {registrations.length > 0 ? (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Registrations</h2>
                                <div className="grid gap-4">
                                    {registrations.map((reg) => (
                                        <div key={reg.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900">{reg.eventTitle}</h3>
                                                    <p className="text-gray-600 mt-2">
                                                        📅 Event Date: {new Date(reg.eventDate).toLocaleDateString()}
                                                    </p>
                                                    <p className="text-gray-600">
                                                        📝 Registered: {new Date(reg.registeredAt).toLocaleDateString()}
                                                    </p>
                                                    {reg.approvedAt && (
                                                        <p className="text-green-600 mt-2">
                                                            ✓ Approved: {new Date(reg.approvedAt).toLocaleDateString()}
                                                        </p>
                                                    )}
                                                </div>
                                                <span className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap ${getStatusColor(reg.status)}`}>
                                                    {getStatusIcon(reg.status)} {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-blue-50 rounded-lg p-8 text-center">
                                <p className="text-gray-600 text-lg">No registrations found for this email address.</p>
                                <p className="text-gray-500 mt-2">Visit the Events page to register for upcoming events.</p>
                            </div>
                        )}
                    </>
                )}

                {!searched && (
                    <div className="bg-blue-50 rounded-lg p-8 text-center">
                        <p className="text-gray-600 text-lg">Enter your email to check your registration status</p>
                    </div>
                )}
            </div>
        </div>
    );
}
