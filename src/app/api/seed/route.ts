import { db } from '@/lib/db';
import { users, events } from '@/lib/db/schema';
import { hashPassword } from '@/lib/auth/password';

export async function POST(request: Request) {
    try {
        console.log('🌱 Starting database seed via API...');

        // Create admin user
        const adminPassword = await hashPassword('Admin@123456');
        const [admin] = await db
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

        console.log('✅ Admin user created:', admin.email);

        // Create test user
        const userPassword = await hashPassword('User@123456');
        const [testUser] = await db
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

        console.log('✅ Test user created:', testUser.email);

        // Create sample events
        const [event1] = await db
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

        console.log('✅ Event created:', event1.title);

        const [event2] = await db
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

        console.log('✅ Event created:', event2.title);

        return Response.json({
            success: true,
            message: '🎉 Database seed completed!',
            admin: { email: admin.email, password: 'Admin@123456' },
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
