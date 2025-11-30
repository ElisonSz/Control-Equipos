import { Router } from 'express';
import { EquipmentController } from '../controllers/equipment.controller';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';
import { validationMiddleware } from '../middleware/validation.middleware';
import { CreateEquipmentDto, UpdateEquipmentDto } from '../dto/equipment.dto';
import { UserRole } from '../types/enums';

const router = Router();
const equipmentController = new EquipmentController();

/**
 * @swagger
 * /api/equipment/available:
 *   get:
 *     summary: Obtener equipos disponibles
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de equipos disponibles
 */
router.get('/available', authMiddleware, equipmentController.getAvailableEquipment);

/**
 * @swagger
 * /api/equipment:
 *   get:
 *     summary: Obtener todos los equipos
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filtrar por estado
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrar por categoría
 *       - in: query
 *         name: branch
 *         schema:
 *           type: string
 *         description: Filtrar por sucursal
 *     responses:
 *       200:
 *         description: Lista de equipos
 */
router.get('/', authMiddleware, equipmentController.getAllEquipment);

/**
 * @swagger
 * /api/equipment/{id}:
 *   get:
 *     summary: Obtener equipo por ID
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del equipo
 *     responses:
 *       200:
 *         description: Equipo encontrado
 *       404:
 *         description: Equipo no encontrado
 */
router.get('/:id', authMiddleware, equipmentController.getEquipmentById);
/**
 * @swagger
 * /api/equipment:
 *   post:
 *     summary: Crear nuevo equipo
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - category
 *               - stock
 *               - location
 *               - shelf
 *               - status
 *               - brand
 *               - equipmentModel
 *               - branch
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               category:
 *                 type: string
 *               stock:
 *                 type: number
 *               location:
 *                 type: string
 *               shelf:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [disponible, reservado, danado, en_mantenimiento]
 *               brand:
 *                 type: string
 *               equipmentModel:
 *                 type: string
 *               branch:
 *                 type: string
 *     responses:
 *       201:
 *         description: Equipo creado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post(
  '/',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN, UserRole.OPERATIVO),
  validationMiddleware(CreateEquipmentDto),
  equipmentController.createEquipment
);

/**
 * @swagger
 * /api/equipment/{id}:
 *   put:
 *     summary: Actualizar equipo
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Equipo actualizado
 *       404:
 *         description: Equipo no encontrado
 */
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN, UserRole.OPERATIVO),
  validationMiddleware(UpdateEquipmentDto),
  equipmentController.updateEquipment
);

/**
 * @swagger
 * /api/equipment/{id}:
 *   delete:
 *     summary: Eliminar equipo
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Equipo eliminado
 *       404:
 *         description: Equipo no encontrado
 */
router.delete('/:id', authMiddleware, roleMiddleware(UserRole.ADMIN), equipmentController.deleteEquipment);

export default router;


