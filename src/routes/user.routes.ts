import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';
import { validationMiddleware } from '../middleware/validation.middleware';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { UserRole } from '../types/enums';

const router = Router();
const userController = new UserController();

router.post(
  '/',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  validationMiddleware(CreateUserDto),
  userController.createUser
);
router.get('/', authMiddleware, roleMiddleware(UserRole.ADMIN, UserRole.OPERATIVO), userController.getAllUsers);
router.get('/role/:role', authMiddleware, roleMiddleware(UserRole.ADMIN, UserRole.OPERATIVO), userController.getUsersByRole);
router.get('/:id', authMiddleware, userController.getUserById);
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  validationMiddleware(UpdateUserDto),
  userController.updateUser
);
router.delete('/:id', authMiddleware, roleMiddleware(UserRole.ADMIN), userController.deleteUser);

export default router;


