export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-2">Manage events, users, and registrations</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
                    <p className="text-gray-600 text-sm font-medium">Total Users</p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">2</p>
                    <p className="text-xs text-gray-500 mt-1">Registered users</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
                    <p className="text-gray-600 text-sm font-medium">Active Events</p>
                    <p className="text-3xl font-bold text-green-600 mt-2">2</p>
                    <p className="text-xs text-gray-500 mt-1">Published events</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
                    <p className="text-gray-600 text-sm font-medium">Total Registrations</p>
                    <p className="text-3xl font-bold text-purple-600 mt-2">0</p>
                    <p className="text-xs text-gray-500 mt-1">Event registrations</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-600">
                    <p className="text-gray-600 text-sm font-medium">Pending Approvals</p>
                    <p className="text-3xl font-bold text-orange-600 mt-2">0</p>
                    <p className="text-xs text-gray-500 mt-1">Awaiting review</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                        href="/admin/events"
                        className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                        <p className="font-semibold text-blue-600">📅 Manage Events</p>
                        <p className="text-sm text-gray-600">Create, edit, and publish events</p>
                    </a>
                    <a
                        href="/admin/users"
                        className="p-4 bg-green-50 border-2 border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                    >
                        <p className="font-semibold text-green-600">👥 Manage Users</p>
                        <p className="text-sm text-gray-600">View and manage user accounts</p>
                    </a>
                    <a
                        href="/admin/registrations"
                        className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                        <p className="font-semibold text-purple-600">📋 Registrations</p>
                        <p className="text-sm text-gray-600">Review and approve registrations</p>
                    </a>
                    <a
                        href="/admin/news"
                        className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors"
                    >
                        <p className="font-semibold text-yellow-600">📰 Blog & News</p>
                        <p className="text-sm text-gray-600">Create and manage articles</p>
                    </a>
                    <a
                        href="/admin/announcements"
                        className="p-4 bg-red-50 border-2 border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                    >
                        <p className="font-semibold text-red-600">📢 Announcements</p>
                        <p className="text-sm text-gray-600">Create platform announcements</p>
                    </a>
                </div>
            </div>
        </div>
    );
}
