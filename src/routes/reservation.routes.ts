import { Router } from 'express';
import { ReservationController } from '../controllers/reservation.controller';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';
import { validationMiddleware } from '../middleware/validation.middleware';
import { CreateReservationDto, UpdateReservationDto } from '../dto/reservation.dto';
import { UserRole } from '../types/enums';

const router = Router();
const reservationController = new ReservationController();

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Crear nueva reserva
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - equipmentId
 *             properties:
 *               equipmentId:
 *                 type: string
 *               reservationDate:
 *                 type: string
 *                 format: date-time
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *       400:
 *         description: Error de validación o equipo no disponible
 */
router.post('/', authMiddleware, validationMiddleware(CreateReservationDto), reservationController.createReservation);

/**
 * @swagger
 * /api/reservations/my-reservations:
 *   get:
 *     summary: Obtener mis reservas
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas del usuario
 */
router.get('/my-reservations', authMiddleware, reservationController.getMyReservations);

/**
 * @swagger
 * /api/reservations/pending:
 *   get:
 *     summary: Obtener reservas pendientes
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas pendientes
 */
router.get('/pending', authMiddleware, roleMiddleware(UserRole.ADMIN, UserRole.OPERATIVO), reservationController.getPendingReservations);
router.get('/ticket/:ticketNumber', authMiddleware, reservationController.getReservationByTicket);
router.get('/', authMiddleware, roleMiddleware(UserRole.ADMIN, UserRole.OPERATIVO), reservationController.getAllReservations);
router.get('/:id', authMiddleware, reservationController.getReservationById);
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN, UserRole.OPERATIVO),
  validationMiddleware(UpdateReservationDto),
  reservationController.updateReservation
);
router.post('/:id/cancel', authMiddleware, reservationController.cancelReservation);

export default router;


