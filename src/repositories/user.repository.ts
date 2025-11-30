import { BaseRepository } from './base.repository';
import { User, IUser } from '../models/user.model';
import { UserRole } from '../types/enums';

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ email: email.toLowerCase() }).select('+password') as Promise<IUser | null>;
  }

  async findActiveUsers(): Promise<IUser[]> {
    return this.model.find({ isActive: true });
  }

  async findUsersByRole(role: UserRole): Promise<IUser[]> {
    return this.model.find({ role, isActive: true });
  }
}


