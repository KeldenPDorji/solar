import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@/lib/types';

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    const response = NextResponse.json(
        { success: true, data: null },
        { status: 200 }
    );

    // Clear auth cookies
    response.cookies.delete('auth_token');
    response.cookies.delete('refresh_token');

    return response;
}
