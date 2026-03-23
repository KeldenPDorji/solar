'use client';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="text-center max-w-md">
                <div className="mb-6">
                    <h1 className="text-6xl font-bold text-blue-600 mb-2">404</h1>
                    <p className="text-2xl font-semibold text-gray-900">Page Not Found</p>
                </div>
                <p className="text-gray-600 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="flex gap-4 justify-center">
                    <a
                        href="/"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                    >
                        Go Home
                    </a>
                    <a
                        href="/dashboard"
                        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold"
                    >
                        Dashboard
                    </a>
                </div>
            </div>
        </div>
    );
}
