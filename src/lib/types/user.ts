export type UserRole = 'user' | 'admin' | 'superadmin' | 'instructor';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    organization?: string;
    phone?: string;
    country?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserWithoutPassword {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
}

export interface JWTPayload {
    sub: string; // user id
    email: string;
    role: UserRole;
    iat: number;
    exp: number;
    version: number;
}
