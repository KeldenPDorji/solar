import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { announcements } from '@/lib/db/schema';
import { createAnnouncementSchema } from '@/lib/utils/validation';
import { verifyToken } from '@/lib/auth/jwt';
import type { ApiResponse } from '@/lib/types';

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        // Check authorization
        const authToken = request.cookies.get('auth_token')?.value;
        if (!authToken) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const tokenData = verifyToken(authToken);
        if (!tokenData || (tokenData.role !== 'admin' && tokenData.role !== 'superadmin' && tokenData.role !== 'content_manager')) {
            return NextResponse.json(
                { success: false, error: 'Forbidden: Content manager or admin access required' },
                { status: 403 }
            );
        }

        const body = await request.json();

        // Validate input
        const validation = createAnnouncementSchema.safeParse(body);
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

        const { title, content, status, priority, expiresAt } = validation.data;

        // Create announcement
        const [announcement] = await db
            .insert(announcements)
            .values({
                title,
                content,
                status,
                priority,
                expiresAt,
                publishedAt: status === 'published' ? new Date() : null,
                createdBy: tokenData.sub,
            })
            .returning();

        return NextResponse.json(
            {
                success: true,
                message: 'Announcement created successfully',
                data: announcement,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Announcement creation error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to create announcement',
            },
            { status: 500 }
        );
    }
}

export async function GET(): Promise<NextResponse<ApiResponse>> {
    try {
        const allAnnouncements = await db.query.announcements.findMany({
            orderBy: (ann, { desc }) => [desc(ann.publishedAt), desc(ann.createdAt)],
        });

        return NextResponse.json(
            {
                success: true,
                data: allAnnouncements,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Announcement fetch error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch announcements',
            },
            { status: 500 }
        );
    }
}
