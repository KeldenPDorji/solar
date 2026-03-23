import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';

const adminRoutes = ['/admin'];
const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/', '/about', '/programs', '/news', '/contact'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get auth token from cookies
    const authToken = request.cookies.get('auth_token')?.value;
    const refreshToken = request.cookies.get('refresh_token')?.value;

    // Check if route is admin-only
    const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

    // Check if route requires authentication
    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

    // Check if route is auth page
    const isAuth = pathname.startsWith('/login') || pathname.startsWith('/register');

    // Admin route protection
    if (isAdminRoute) {
        if (!authToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        const tokenData = verifyToken(authToken);
        if (!tokenData) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Check if user is admin
        if (tokenData.role !== 'admin' && tokenData.role !== 'superadmin') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    // Protected route (dashboard)
    if (isProtected && !authToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If user is logged in and tries to access auth pages, redirect to dashboard
    if (isAuth && authToken) {
        const token = verifyToken(authToken);
        if (token) {
            // Redirect to appropriate dashboard based on role
            const redirectUrl = token.role === 'admin' || token.role === 'superadmin' ? '/admin' : '/dashboard';
            return NextResponse.redirect(new URL(redirectUrl, request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Protected routes
        '/dashboard/:path*',
        '/admin/:path*',
        // Auth routes
        '/login',
        '/register',
        // Public routes with middleware check
        '/',
    ],
};
