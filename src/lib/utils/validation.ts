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

// Event Registration schemas
export const eventRegistrationSchema = z.object({
    eventId: z.string().uuid('Invalid event ID'),
    email: z.string().email('Invalid email address'),
    firstName: z.string().min(2, 'First name required'),
    lastName: z.string().min(2, 'Last name required'),
    phone: z.string().optional(),
    organization: z.string().optional(),
});

// News schemas
export const createNewsSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    slug: z.string().min(3, 'Slug required').regex(/^[a-z0-9-]+$/, 'Invalid slug format'),
    content: z.string().min(20, 'Content required'),
    shortExcerpt: z.string().max(500).optional(),
    imageUrl: z.string().url('Invalid image URL').optional(),
    status: z.enum(['draft', 'published']),
    featured: z.boolean().optional(),
});

// Announcement schemas
export const createAnnouncementSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    content: z.string().min(10, 'Content required'),
    status: z.enum(['draft', 'published']),
    priority: z.enum(['low', 'normal', 'high', 'urgent']),
    expiresAt: z.coerce.date().optional(),
});

// Registration status check
export const registrationStatusCheckSchema = z.object({
    email: z.string().email('Invalid email address'),
});

export type EventRegistrationInput = z.infer<typeof eventRegistrationSchema>;
export type CreateNewsInput = z.infer<typeof createNewsSchema>;
export type CreateAnnouncementInput = z.infer<typeof createAnnouncementSchema>;
export type RegistrationStatusCheckInput = z.infer<typeof registrationStatusCheckSchema>;
