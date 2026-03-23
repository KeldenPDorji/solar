'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'user' | 'admin' | 'superadmin';
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/auth/me');
                if (!response.ok) {
                    router.push('/login');
                    return;
                }
                const data = await response.json();
                setUser(data.data);
            } catch (err) {
                setError('Failed to load user information');
                console.error(err);
                router.push('/login');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/');
        } catch (err) {
            setError('Failed to logout');
            console.error(err);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-red-600 font-semibold">Unable to load user information</p>
                    <button
                        onClick={() => router.push('/login')}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Return to Login
                    </button>
                </div>
            </div>
        );
    }

    const isAdmin = user.role === 'admin' || user.role === 'superadmin';

    return (
        <div className="min-h-screen flex">
            <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">STAR-C</h1>
                    <p className="text-sm text-gray-400 mt-1">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>

                <nav className="space-y-2 flex-1">
                    {isAdmin ? (
                        <>
                            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin Panel</div>
                            <Link href="/admin" className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors">📊 Dashboard</Link>
                            <Link href="/admin/events" className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors">📅 Events</Link>
                            <Link href="/admin/registrations" className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors">📋 Registrations</Link>
                            <Link href="/admin/users" className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors">👥 Users</Link>
                            <hr className="my-4 border-gray-700" />
                        </>
                    ) : null}

                    <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">User Area</div>
                    <Link href="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors">🏠 Dashboard</Link>
                    <Link href="/dashboard/registrations" className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors">✓ My Registrations</Link>
                    <Link href="/dashboard/profile" className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors">⚙️ Profile</Link>
                </nav>

                <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                    🚪 Logout
                </button>
            </aside>

            <main className="flex-1 p-8 bg-gray-50 overflow-auto">
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-800 rounded-md">
                        {error}
                    </div>
                )}
                {children}
            </main>
        </div>
    );
}
