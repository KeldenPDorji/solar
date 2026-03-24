import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { news } from '@/lib/db/schema';
import { createNewsSchema } from '@/lib/utils/validation';
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
        const validation = createNewsSchema.safeParse(body);
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

        const { title, slug, content, shortExcerpt, imageUrl, status, featured } = validation.data;

        // Create news
        const [newsItem] = await db
            .insert(news)
            .values({
                title,
                slug,
                content,
                shortExcerpt,
                imageUrl,
                status,
                featured: featured || false,
                publishedAt: status === 'published' ? new Date() : null,
                createdBy: tokenData.sub,
            })
            .returning();

        return NextResponse.json(
            {
                success: true,
                message: 'News created successfully',
                data: newsItem,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('News creation error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to create news',
            },
            { status: 500 }
        );
    }
}

export async function GET(): Promise<NextResponse<ApiResponse>> {
    try {
        const allNews = await db.query.news.findMany({
            orderBy: (news, { desc }) => [desc(news.publishedAt), desc(news.createdAt)],
        });

        return NextResponse.json(
            {
                success: true,
                data: allNews,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('News fetch error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch news',
            },
            { status: 500 }
        );
    }
}
