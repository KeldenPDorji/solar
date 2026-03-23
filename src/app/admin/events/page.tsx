export default function AdminEventsPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manage Events</h1>
                    <p className="text-gray-600 mt-2">Create and manage training events</p>
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                    + Create Event
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Solar Panel Installation Workshop</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Workshop</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Apr 1-3, 2026</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Published</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                <button className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                                <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Solar Energy Seminar</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Seminar</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">May 10, 2026</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Published</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                <button className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                                <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
