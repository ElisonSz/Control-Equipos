import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { EquipmentService } from '../services/equipment.service';
import { CreateEquipmentDto, UpdateEquipmentDto, EquipmentFilterDto } from '../dto/equipment.dto';

export class EquipmentController {
  private equipmentService: EquipmentService;

  constructor() {
    this.equipmentService = new EquipmentService();
  }

  createEquipment = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const data = req.body as CreateEquipmentDto;
      const equipment = await this.equipmentService.createEquipment(data);
      res.status(201).json(equipment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  getEquipmentById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const equipment = await this.equipmentService.getEquipmentById(id);
      if (!equipment) {
        res.status(404).json({ message: 'Equipment not found' });
        return;
      }
      res.status(200).json(equipment);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getAllEquipment = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const filter = req.query as EquipmentFilterDto;
      const equipment = await this.equipmentService.getAllEquipment(filter);
      res.status(200).json(equipment);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getAvailableEquipment = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const equipment = await this.equipmentService.getAvailableEquipment();
      res.status(200).json(equipment);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  updateEquipment = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const data = req.body as UpdateEquipmentDto;
      const equipment = await this.equipmentService.updateEquipment(id, data);
      if (!equipment) {
        res.status(404).json({ message: 'Equipment not found' });
        return;
      }
      res.status(200).json(equipment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  deleteEquipment = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await this.equipmentService.deleteEquipment(id);
      if (!deleted) {
        res.status(404).json({ message: 'Equipment not found' });
        return;
      }
      res.status(200).json({ message: 'Equipment deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}


