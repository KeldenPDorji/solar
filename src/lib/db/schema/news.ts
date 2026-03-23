import { pgTable, uuid, varchar, text, boolean, timestamp, pgEnum, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './users';

export const contentStatusEnum = pgEnum('content_status', ['draft', 'published']);

export const news = pgTable(
    'news',
    {
        id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
        title: varchar('title', { length: 255 }).notNull(),
        slug: varchar('slug', { length: 255 }).notNull().unique(),
        content: text('content').notNull(),
        shortExcerpt: varchar('short_excerpt', { length: 500 }),
        imageUrl: varchar('image_url', { length: 500 }),
        status: contentStatusEnum('status').notNull().default('draft'),
        featured: boolean('featured').notNull().default(false),
        publishedAt: timestamp('published_at'),
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
