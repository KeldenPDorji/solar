import jwt from 'jsonwebtoken';
import type { JWTPayload } from '@/lib/types';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = '1h';
const REFRESH_TOKEN_EXPIRATION = '7d';

if (!JWT_SECRET || JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be set and at least 32 characters long');
}

export function generateAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
        algorithm: 'HS256',
    });
}

export function generateRefreshToken(userId: string): string {
    return jwt.sign({ sub: userId }, JWT_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRATION,
        algorithm: 'HS256',
    });
}

export function verifyToken(token: string): JWTPayload | null {
    try {
        const payload = jwt.verify(token, JWT_SECRET, {
            algorithms: ['HS256'],
        }) as unknown;

        if (
            typeof payload === 'object' &&
            payload !== null &&
            'sub' in payload &&
            'email' in payload &&
            'role' in payload
        ) {
            return payload as JWTPayload;
        }
        return null;
    } catch {
        return null;
    }
}

export function getTokenExpiration(expiresIn: string): Date {
    const now = new Date();
    const match = expiresIn.match(/^(\d+)([hdms])$/);
    if (!match) {
        throw new Error(`Invalid expiration format: ${expiresIn}`);
    }

    const [, amount, unit] = match;
    const num = parseInt(amount, 10);

    switch (unit) {
        case 'h':
            now.setHours(now.getHours() + num);
            break;
        case 'd':
            now.setDate(now.getDate() + num);
            break;
        case 'm':
            now.setMinutes(now.getMinutes() + num);
            break;
        case 's':
            now.setSeconds(now.getSeconds() + num);
            break;
    }

    return now;
}
