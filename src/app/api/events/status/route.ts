import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { eventRegistrations, events } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import type { ApiResponse } from '@/lib/types';

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        const searchParams = request.nextUrl.searchParams;
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json(
                { success: false, error: 'Email is required' },
                { status: 400 }
            );
        }

        // Find all registrations for this email
        const registrations = await db
            .select({
                id: eventRegistrations.id,
                eventTitle: events.title,
                eventDate: events.startDate,
                status: eventRegistrations.status,
                registeredAt: eventRegistrations.createdAt,
                approvedAt: eventRegistrations.approvedAt,
            })
            .from(eventRegistrations)
            .innerJoin(events, eq(eventRegistrations.eventId, events.id))
            .where(eq(eventRegistrations.email, email.toLowerCase()));

        if (registrations.length === 0) {
            return NextResponse.json(
                {
                    success: true,
                    data: [],
                    message: 'No registrations found for this email',
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: registrations,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Status check error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to check registration status',
            },
            { status: 500 }
        );
    }
}
