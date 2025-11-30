import { Router } from 'express';
import { MetricsController } from '../controllers/metrics.controller';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';
import { UserRole } from '../types/enums';

const router = Router();
const metricsController = new MetricsController();

router.get('/', authMiddleware, roleMiddleware(UserRole.ADMIN, UserRole.OPERATIVO), metricsController.getMetrics);

export default router;


