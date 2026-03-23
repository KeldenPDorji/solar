import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword } from '@/lib/auth/password';
import { generateAccessToken, generateRefreshToken } from '@/lib/auth/jwt';
import { registerSchema } from '@/lib/utils/validation';
import type { ApiResponse } from '@/lib/types';

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        const body = await request.json();

        // Validate input
        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            const errorMessage = validation.error.issues[0]?.message || 'Validation failed';
            return NextResponse.json(
                {
                    success: false,
                    error: errorMessage,
                },
                { status: 400 }
            );
        }

        const { email, password, firstName, lastName, organization, phone, country } = validation.data;

        // Check if user exists
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email.toLowerCase()),
        });

        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'Email already registered' },
                { status: 409 }
            );
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Create user
        const [newUser] = await db
            .insert(users)
            .values({
                email: email.toLowerCase(),
                passwordHash,
                firstName,
                lastName,
                organization,
                phone,
                country,
                role: 'user',
            })
            .returning({
                id: users.id,
                email: users.email,
                firstName: users.firstName,
                lastName: users.lastName,
                role: users.role,
            });

        // Generate tokens
        const accessToken = generateAccessToken({
            sub: newUser.id,
            email: newUser.email,
            role: newUser.role,
            version: 0,
        });

        const refreshToken = generateRefreshToken(newUser.id);

        // Set cookies
        const response = NextResponse.json(
            {
                success: true,
                data: newUser,
            },
            { status: 201 }
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
        console.error('Registration error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
