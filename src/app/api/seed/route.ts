import { db } from '@/lib/db';
import { users, events } from '@/lib/db/schema';
import { hashPassword } from '@/lib/auth/password';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
    try {
        console.log('🌱 Starting database seed via API...');

        let admin;
        let sarojAdmin;
        let testUser;

        // Check if admin user exists
        const existingAdmin = await db.query.users.findFirst({
            where: eq(users.email, 'admin@starc.io'),
        });

        if (!existingAdmin) {
            const adminPassword = await hashPassword('Admin@123456');
            const [newAdmin] = await db
                .insert(users)
                .values({
                    email: 'admin@starc.io',
                    passwordHash: adminPassword,
                    firstName: 'Admin',
                    lastName: 'User',
                    role: 'admin',
                    country: 'Bhutan',
                    isActive: true,
                })
                .returning();
            admin = newAdmin;
            console.log('✅ Admin user created:', admin.email);
        } else {
            admin = existingAdmin;
            console.log('ℹ️  Admin user already exists:', admin.email);
        }

        // Check if Saroj exists
        const existingSaroj = await db.query.users.findFirst({
            where: eq(users.email, 'sarojsanyasi.cst@rub.edu.bt'),
        });

        if (!existingSaroj) {
            const sarojPassword = await hashPassword('Saroj@123456');
            const [newSaroj] = await db
                .insert(users)
                .values({
                    email: 'sarojsanyasi.cst@rub.edu.bt',
                    passwordHash: sarojPassword,
                    firstName: 'Saroj',
                    lastName: 'Sanyasi',
                    role: 'admin',
                    country: 'Bhutan',
                    isActive: true,
                })
                .returning();
            sarojAdmin = newSaroj;
            console.log('✅ Saroj admin user created:', sarojAdmin.email);
        } else {
            sarojAdmin = existingSaroj;
            console.log('ℹ️  Saroj user already exists:', sarojAdmin.email);
        }

        // Check if test user exists
        const existingTestUser = await db.query.users.findFirst({
            where: eq(users.email, 'user@example.com'),
        });

        if (!existingTestUser) {
            const userPassword = await hashPassword('User@123456');
            const [newTestUser] = await db
                .insert(users)
                .values({
                    email: 'user@example.com',
                    passwordHash: userPassword,
                    firstName: 'John',
                    lastName: 'Doe',
                    role: 'user',
                    country: 'Bhutan',
                    isActive: true,
                })
                .returning();
            testUser = newTestUser;
            console.log('✅ Test user created:', testUser.email);
        } else {
            testUser = existingTestUser;
            console.log('ℹ️  Test user already exists:', testUser.email);
        }

        console.log('✅ Test user created:', testUser.email);

        // Create sample events (check if they exist first)
        const existingEvent1 = await db.query.events.findFirst({
            where: eq(events.slug, 'solar-panel-installation-workshop'),
        });

        let event1;
        if (!existingEvent1) {
            const [newEvent1] = await db
                .insert(events)
                .values({
                    title: 'Solar Panel Installation Workshop',
                    slug: 'solar-panel-installation-workshop',
                    description: '# Learn Solar Panel Installation\n\nA comprehensive workshop on installing solar panels in Bhutan.',
                    shortDescription: 'Learn to install solar panels efficiently',
                    eventType: 'workshop',
                    status: 'published',
                    startDate: new Date('2026-04-01T09:00:00'),
                    endDate: new Date('2026-04-03T17:00:00'),
                    location: 'Thimphu, Bhutan',
                    maxParticipants: 30,
                    registrationDeadline: new Date('2026-03-25T00:00:00'),
                    createdBy: admin.id,
                })
                .returning();
            event1 = newEvent1;
            console.log('✅ Event created:', event1.title);
        } else {
            event1 = existingEvent1;
            console.log('ℹ️  Event already exists:', event1.title);
        }

        const existingEvent2 = await db.query.events.findFirst({
            where: eq(events.slug, 'solar-energy-seminar'),
        });

        let event2;
        if (!existingEvent2) {
            const [newEvent2] = await db
                .insert(events)
                .values({
                    title: 'Solar Energy Seminar',
                    slug: 'solar-energy-seminar',
                    description: '# Solar Energy Fundamentals\n\nUnderstanding solar energy systems and their applications.',
                    shortDescription: 'Introduction to solar energy systems',
                    eventType: 'seminar',
                    status: 'published',
                    startDate: new Date('2026-05-10T10:00:00'),
                    endDate: new Date('2026-05-10T16:00:00'),
                    location: 'Online',
                    maxParticipants: 100,
                    registrationDeadline: new Date('2026-05-05T00:00:00'),
                    createdBy: admin.id,
                })
                .returning();
            event2 = newEvent2;
            console.log('✅ Event created:', event2.title);
        } else {
            event2 = existingEvent2;
            console.log('ℹ️  Event already exists:', event2.title);
        }

        return Response.json({
            success: true,
            message: '🎉 Database seed completed!',
            admin: { email: admin.email, password: 'Admin@123456' },
            sarojAdmin: { email: sarojAdmin.email, password: 'Saroj@123456' },
            testUser: { email: testUser.email, password: 'User@123456' },
        });
    } catch (error) {
        console.error('❌ Seed error:', error);
        return Response.json(
            { success: false, error: String(error) },
            { status: 500 }
        );
    }
}
