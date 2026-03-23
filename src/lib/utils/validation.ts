import { z } from 'zod';

// Auth schemas
export const registerSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters').regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain uppercase, lowercase, and number'
    ),
    firstName: z.string().min(2, 'First name required'),
    lastName: z.string().min(2, 'Last name required'),
    organization: z.string().optional(),
    phone: z.string().optional(),
    country: z.string().optional(),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password required'),
});

// Event schemas
export const createEventSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    slug: z.string().min(3, 'Slug required').regex(/^[a-z0-9-]+$/, 'Invalid slug format'),
    description: z.string().min(10, 'Description required'),
    shortDescription: z.string().max(500).optional(),
    eventType: z.enum(['workshop', 'seminar', 'training', 'conference']),
    status: z.enum(['draft', 'published', 'cancelled', 'completed']),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    location: z.string().optional(),
    maxParticipants: z.coerce.number().min(1).optional(),
    registrationDeadline: z.coerce.date().optional(),
    imageUrl: z.string().url('Invalid image URL').optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
