export default function AdminRegistrationsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold text-gray-900">Event Registrations</h1>
                <p className="text-gray-600 mt-2">Review and approve event registrations</p>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Event</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Registered Date</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200 hover:bg-gray-50">
                            <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                Loading registrations...
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">📝 Phase 2 Features</h3>
                <p className="text-blue-700">This page allows you to:</p>
                <ul className="text-blue-700 list-disc list-inside mt-2">
                    <li>View all event registrations (pending, approved, rejected)</li>
                    <li>Approve or reject registrations via email</li>
                    <li>Filter by event or status</li>
                    <li>Send approval/rejection emails</li>
                </ul>
            </div>
        </div>
    );
}
