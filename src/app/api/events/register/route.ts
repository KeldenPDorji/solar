import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { eventRegistrations, events } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { eventRegistrationSchema } from '@/lib/utils/validation';
import type { ApiResponse } from '@/lib/types';

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        const body = await request.json();

        // Validate input
        const validation = eventRegistrationSchema.safeParse(body);
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

        const { eventId, email, firstName, lastName, phone, organization } = validation.data;

        // Check if event exists
        const event = await db.query.events.findFirst({
            where: eq(events.id, eventId),
        });

        if (!event) {
            return NextResponse.json(
                { success: false, error: 'Event not found' },
                { status: 404 }
            );
        }

        // Check if already registered
        const existingRegistration = await db.query.eventRegistrations.findFirst({
            where: eq(eventRegistrations.email, email.toLowerCase()),
        });

        if (existingRegistration && existingRegistration.eventId === eventId) {
            return NextResponse.json(
                { success: false, error: 'You are already registered for this event' },
                { status: 409 }
            );
        }

        // Create registration
        const [registration] = await db
            .insert(eventRegistrations)
            .values({
                eventId,
                email: email.toLowerCase(),
                firstName,
                lastName,
                phone,
                organization,
                status: 'pending',
            })
            .returning({
                id: eventRegistrations.id,
                email: eventRegistrations.email,
                firstName: eventRegistrations.firstName,
                lastName: eventRegistrations.lastName,
                status: eventRegistrations.status,
            });

        return NextResponse.json(
            {
                success: true,
                message: 'Registration submitted successfully. Pending admin approval.',
                data: registration,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to register for event',
            },
            { status: 500 }
        );
    }
}
