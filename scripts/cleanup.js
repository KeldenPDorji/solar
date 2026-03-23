import { db } from '../src/lib/db/index.js';
import { users } from '../src/lib/db/schema/index.js';

const cleanupDb = async () => {
    try {
        console.log('🧹 Cleaning up database...');

        // Delete all users
        await db.delete(users);
        console.log('✅ All users deleted');

        console.log('🎉 Database cleanup completed!');
    } catch (error) {
        console.error('❌ Cleanup error:', error);
        process.exit(1);
    }
};

cleanupDb();
