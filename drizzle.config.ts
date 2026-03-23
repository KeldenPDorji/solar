import type { Config } from 'drizzle-kit';

export default {
    schema: './src/lib/db/schema',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    migrations: {
        table: '__drizzle_migrations__',
        schema: 'public',
    },
    casing: 'snake_case',
} satisfies Config;
