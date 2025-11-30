import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { IUser } from '../models/user.model';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data: CreateUserDto): Promise<IUser> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }
    return this.userRepository.create(data as Partial<IUser>);
  }

  async getUserById(id: string): Promise<IUser | null> {
    return this.userRepository.findById(id);
  }

  async getAllUsers(): Promise<IUser[]> {
    return this.userRepository.findActiveUsers();
  }

  async getUsersByRole(role: string): Promise<IUser[]> {
    return this.userRepository.findUsersByRole(role as any);
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<IUser | null> {
    if (data.email) {
      const existingUser = await this.userRepository.findByEmail(data.email);
      if (existingUser && existingUser._id.toString() !== id) {
        throw new Error('Email already in use');
      }
    }
    return this.userRepository.update(id, data);
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}


