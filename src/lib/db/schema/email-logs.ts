import { pgTable, uuid, varchar, text, timestamp, pgEnum, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './users';

export const emailStatusEnum = pgEnum('email_status', ['sent', 'failed', 'bounced']);

export const emailLogs = pgTable(
    'email_logs',
    {
        id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
        userId: uuid('user_id'),
        email: varchar('email', { length: 255 }).notNull(),
        template: varchar('template', { length: 100 }).notNull(),
        subject: varchar('subject', { length: 255 }).notNull(),
        status: emailStatusEnum('status').notNull().default('sent'),
        errorMessage: text('error_message'),
        createdAt: timestamp('created_at').notNull().default(sql`now()`),
    },
    (table) => [
        foreignKey({
            columns: [table.userId],
            foreignColumns: [users.id],
        }),
    ]
);
