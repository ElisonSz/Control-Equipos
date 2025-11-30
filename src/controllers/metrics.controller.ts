import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { MetricsService } from '../services/metrics.service';
import { MetricsFilterDto } from '../dto/metrics.dto';

export class MetricsController {
  private metricsService: MetricsService;

  constructor() {
    this.metricsService = new MetricsService();
  }

  getMetrics = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const filter = req.query as MetricsFilterDto;
      const metrics = await this.metricsService.getMetrics(filter);
      res.status(200).json(metrics);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}


