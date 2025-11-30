import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import { User } from '../models/user.model';
import { UserRole } from '../types/enums';
import { logger } from '../config/logger';

const seedAdmin = async (): Promise<void> => {
  try {
    await connectDatabase();
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@control-equipos.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      logger.info('Admin user already exists');
      return;
    }
    const admin = new User({
      email: adminEmail,
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      isActive: true
    });
    await admin.save();
    logger.info('Admin user created successfully');
    logger.info(`Email: ${adminEmail}`);
    logger.info(`Password: ${adminPassword}`);
  } catch (error) {
    logger.error('Error seeding admin:', error);
  } finally {
    await mongoose.disconnect();
  }
};

if (require.main === module) {
  seedAdmin();
}

export { seedAdmin };


