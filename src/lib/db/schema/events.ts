import { pgTable, uuid, varchar, text, integer, timestamp, pgEnum, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './users';

export const eventTypeEnum = pgEnum('event_type', ['workshop', 'seminar', 'training', 'conference']);
export const eventStatusEnum = pgEnum('event_status', ['draft', 'published', 'cancelled', 'completed']);

export const events = pgTable(
    'events',
    {
        id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
        title: varchar('title', { length: 255 }).notNull(),
        slug: varchar('slug', { length: 255 }).notNull().unique(),
        description: text('description').notNull(),
        shortDescription: varchar('short_description', { length: 500 }),
        eventType: eventTypeEnum('event_type').notNull(),
        status: eventStatusEnum('status').notNull().default('draft'),
        startDate: timestamp('start_date').notNull(),
        endDate: timestamp('end_date').notNull(),
        location: varchar('location', { length: 255 }),
        maxParticipants: integer('max_participants'),
        registrationDeadline: timestamp('registration_deadline'),
        imageUrl: varchar('image_url', { length: 500 }),
        createdBy: uuid('created_by').notNull(),
        createdAt: timestamp('created_at').notNull().default(sql`now()`),
        updatedAt: timestamp('updated_at').notNull().default(sql`now()`),
    },
    (table) => [
        foreignKey({
            columns: [table.createdBy],
            foreignColumns: [users.id],
        }),
    ]
);
