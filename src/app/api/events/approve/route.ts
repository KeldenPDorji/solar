import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { eventRegistrations, eventRegistrations as registrationsTable } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { verifyToken } from '@/lib/auth/jwt';
import type { ApiResponse } from '@/lib/types';

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        // Check admin authorization
        const authToken = request.cookies.get('auth_token')?.value;
        if (!authToken) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const tokenData = verifyToken(authToken);
        if (!tokenData || (tokenData.role !== 'admin' && tokenData.role !== 'superadmin')) {
            return NextResponse.json(
                { success: false, error: 'Forbidden: Admin access required' },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { registrationId, status, notes } = body;

        if (!registrationId || !status) {
            return NextResponse.json(
                { success: false, error: 'Registration ID and status are required' },
                { status: 400 }
            );
        }

        if (!['approved', 'rejected'].includes(status)) {
            return NextResponse.json(
                { success: false, error: 'Invalid status. Must be "approved" or "rejected"' },
                { status: 400 }
            );
        }

        // Update registration
        const [updated] = await db
            .update(registrationsTable)
            .set({
                status: status === 'approved' ? 'approved' : 'rejected',
                ...(status === 'approved' && { approvedAt: new Date() }),
                ...(status === 'rejected' && { rejectedAt: new Date() }),
                notes,
                updatedAt: new Date(),
            })
            .where(eq(registrationsTable.id, registrationId))
            .returning();

        if (!updated) {
            return NextResponse.json(
                { success: false, error: 'Registration not found' },
                { status: 404 }
            );
        }

        // TODO: Send email notification to registered user
        // Email service will be implemented next

        return NextResponse.json(
            {
                success: true,
                message: `Registration ${status} successfully`,
                data: updated,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Approval error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to update registration status',
            },
            { status: 500 }
        );
    }
}
