import { Router } from 'express';
import { ChatController } from '../controllers/chat.controller';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';
import { validationMiddleware } from '../middleware/validation.middleware';
import { CreateChatMessageDto } from '../dto/chat.dto';
import { UserRole } from '../types/enums';

const router = Router();
const chatController = new ChatController();

router.post('/', authMiddleware, validationMiddleware(CreateChatMessageDto), chatController.createMessage);
router.get('/my-messages', authMiddleware, chatController.getMyMessages);
router.get('/conversation/:receiverId', authMiddleware, chatController.getConversation);
router.get('/support', authMiddleware, roleMiddleware(UserRole.ADMIN, UserRole.OPERATIVO), chatController.getSupportMessages);
router.get('/room/:roomId', authMiddleware, chatController.getRoomMessages);

export default router;


