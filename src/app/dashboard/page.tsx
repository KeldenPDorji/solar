'use client';

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard</h1>
                    <p className="text-gray-600 text-lg">Explore training programs and manage your registrations</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 border-l-4 border-blue-600">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                <span className="text-blue-600 text-xl font-bold">📅</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
                        </div>
                        <p className="text-gray-600 mb-4">View and register for upcoming training events and workshops</p>
                        <a href="#events" className="inline-block text-blue-600 font-semibold hover:text-blue-700">Explore Events →</a>
                    </div>

                    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 border-l-4 border-green-600">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                                <span className="text-green-600 text-xl font-bold">✓</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Your Registrations</h2>
                        </div>
                        <p className="text-gray-600 mb-4">Track your event registrations and approval status</p>
                        <a href="#registrations" className="inline-block text-blue-600 font-semibold hover:text-blue-700">View Registrations →</a>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 border border-blue-200">
                        <p className="text-gray-600 text-sm font-medium mb-2">Total Events</p>
                        <p className="text-3xl font-bold text-blue-600">2</p>
                        <p className="text-xs text-gray-500 mt-2">Available for registration</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-6 border border-green-200">
                        <p className="text-gray-600 text-sm font-medium mb-2">Your Registrations</p>
                        <p className="text-3xl font-bold text-green-600">0</p>
                        <p className="text-xs text-gray-500 mt-2">Active registrations</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-50 to-white rounded-lg p-6 border border-yellow-200">
                        <p className="text-gray-600 text-sm font-medium mb-2">Certificates</p>
                        <p className="text-3xl font-bold text-yellow-600">0</p>
                        <p className="text-xs text-gray-500 mt-2">Earned certifications</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-md p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a href="/register" className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-center">
                            <p className="font-semibold text-blue-600">Browse Events</p>
                            <p className="text-sm text-gray-600">View all available training programs</p>
                        </a>
                        <a href="/login" className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-center">
                            <p className="font-semibold text-gray-700">Profile Settings</p>
                            <p className="text-sm text-gray-600">Update your personal information</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
