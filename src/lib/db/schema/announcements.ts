import { pgTable, uuid, varchar, text, timestamp, pgEnum, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './users';
import { contentStatusEnum } from './news';

export const announcementPriorityEnum = pgEnum('announcement_priority', ['low', 'normal', 'high', 'urgent']);

export const announcements = pgTable(
    'announcements',
    {
        id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
        title: varchar('title', { length: 255 }).notNull(),
        content: text('content').notNull(),
        status: contentStatusEnum('status').notNull().default('draft'),
        priority: announcementPriorityEnum('priority').notNull().default('normal'),
        publishedAt: timestamp('published_at'),
        expiresAt: timestamp('expires_at'),
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
