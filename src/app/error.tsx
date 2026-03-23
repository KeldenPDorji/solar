'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="text-center max-w-md">
                <div className="mb-6">
                    <h1 className="text-6xl font-bold text-red-600 mb-2">Oops!</h1>
                    <p className="text-2xl font-semibold text-gray-900">Something went wrong</p>
                </div>
                <p className="text-gray-600 mb-8">
                    {error.message || 'An unexpected error occurred. Please try again.'}
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => reset()}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                    >
                        Try Again
                    </button>
                    <a
                        href="/"
                        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold"
                    >
                        Go Home
                    </a>
                </div>
            </div>
        </div>
    );
}
