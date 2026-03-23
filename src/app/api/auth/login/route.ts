import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { comparePassword } from '@/lib/auth/password';
import { generateAccessToken, generateRefreshToken } from '@/lib/auth/jwt';
import { loginSchema } from '@/lib/utils/validation';
import type { ApiResponse } from '@/lib/types';

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        const body = await request.json();

        // Validate input
        const validation = loginSchema.safeParse(body);
        if (!validation.success) {
            const errorMessage = validation.error.issues[0]?.message || 'Validation failed';
            return NextResponse.json(
                { success: false, error: errorMessage },
                { status: 400 }
            );
        }

        const { email, password } = validation.data;

        // Find user
        const user = await db.query.users.findFirst({
            where: eq(users.email, email.toLowerCase()),
        });

        if (!user || !user.isActive) {
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Verify password
        const passwordValid = await comparePassword(password, user.passwordHash);
        if (!passwordValid) {
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Generate tokens
        const accessToken = generateAccessToken({
            sub: user.id,
            email: user.email,
            role: user.role,
            version: user.tokenVersion,
        });

        const refreshToken = generateRefreshToken(user.id);

        // Set cookies and return response
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

        response.cookies.set('auth_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60, // 1 hour
            path: '/',
        });

        response.cookies.set('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
