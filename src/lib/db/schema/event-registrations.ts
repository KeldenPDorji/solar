import { pgTable, uuid, text, timestamp, pgEnum, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { events } from './events';
import { users } from './users';

export const registrationStatusEnum = pgEnum('registration_status', ['pending', 'approved', 'rejected', 'cancelled']);

export const eventRegistrations = pgTable(
    'event_registrations',
    {
        id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
        eventId: uuid('event_id').notNull(),
        userId: uuid('user_id').notNull(),
        status: registrationStatusEnum('status').notNull().default('pending'),
        notes: text('notes'),
        createdAt: timestamp('created_at').notNull().default(sql`now()`),
        updatedAt: timestamp('updated_at').notNull().default(sql`now()`),
    },
    (table) => [
        foreignKey({
            columns: [table.eventId],
            foreignColumns: [events.id],
        }),
        foreignKey({
            columns: [table.userId],
            foreignColumns: [users.id],
        }),
    ]
);
