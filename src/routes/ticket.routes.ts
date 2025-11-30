import { Router } from 'express';
import { TicketController } from '../controllers/ticket.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const ticketController = new TicketController();

router.get('/:reservationId', authMiddleware, ticketController.generateTicket);

export default router;


