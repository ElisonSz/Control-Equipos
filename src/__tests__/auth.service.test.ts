import { AuthService } from '../services/auth.service';
import { UserRepository } from '../repositories/user.repository';
import { RegisterDto } from '../dto/auth.dto';
import { UserRole } from '../types/enums';

jest.mock('../repositories/user.repository');

describe('AuthService', () => {
  let authService: AuthService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
    authService = new AuthService();
    (authService as any).userRepository = mockUserRepository;
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const registerData: RegisterDto = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
      };

      const mockUser = {
        _id: '123',
        email: registerData.email,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        role: UserRole.CLIENTE,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockUserRepository.findByEmail = jest.fn().mockResolvedValue(null);
      mockUserRepository.create = jest.fn().mockResolvedValue(mockUser as any);

      const result = await authService.register(registerData);

      expect(result.user.email).toBe(registerData.email);
      expect(result.token).toBeDefined();
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(registerData.email);
      expect(mockUserRepository.create).toHaveBeenCalled();
    });

    it('should throw error if user already exists', async () => {
      const registerData: RegisterDto = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
      };

      mockUserRepository.findByEmail = jest.fn().mockResolvedValue({} as any);

      await expect(authService.register(registerData)).rejects.toThrow('User already exists');
    });
  });
});


