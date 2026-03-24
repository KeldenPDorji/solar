import { pgTable, uuid, varchar, text, timestamp, pgEnum, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { events } from './events';
import { users } from './users';

export const registrationStatusEnum = pgEnum('registration_status', ['pending', 'approved', 'rejected', 'cancelled']);

export const eventRegistrations = pgTable(
    'event_registrations',
    {
        id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
        eventId: uuid('event_id').notNull(),
        userId: uuid('user_id'),
        email: varchar('email', { length: 255 }).notNull(),
        firstName: varchar('first_name', { length: 100 }).notNull(),
        lastName: varchar('last_name', { length: 100 }).notNull(),
        phone: varchar('phone', { length: 20 }),
        organization: varchar('organization', { length: 255 }),
        status: registrationStatusEnum('status').notNull().default('pending'),
        notes: text('notes'),
        approvedAt: timestamp('approved_at'),
        rejectedAt: timestamp('rejected_at'),
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
