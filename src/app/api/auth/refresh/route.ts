import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { verifyToken, generateAccessToken, generateRefreshToken } from '@/lib/auth/jwt';
import type { ApiResponse } from '@/lib/types';

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        const refreshToken = request.cookies.get('refresh_token')?.value;

        if (!refreshToken) {
            return NextResponse.json(
                { success: false, error: 'Refresh token not found' },
                { status: 401 }
            );
        }

        // Verify refresh token
        const payload = verifyToken(refreshToken);
        if (!payload || !payload.sub) {
            return NextResponse.json(
                { success: false, error: 'Invalid refresh token' },
                { status: 401 }
            );
        }

        // Get user to check token version
        const user = await db.query.users.findFirst({
            where: eq(users.id, payload.sub),
        });

        if (!user || !user.isActive) {
            return NextResponse.json(
                { success: false, error: 'User not found or inactive' },
                { status: 401 }
            );
        }

        // Generate new tokens
        const newAccessToken = generateAccessToken({
            sub: user.id,
            email: user.email,
            role: user.role,
            version: user.tokenVersion,
        });

        const newRefreshToken = generateRefreshToken(user.id);

        // Set new cookies
        const response = NextResponse.json(
            {
                success: true,
                data: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                },
            },
            { status: 200 }
        );

        response.cookies.set('auth_token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60, // 1 hour
            path: '/',
        });

        response.cookies.set('refresh_token', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Refresh error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
