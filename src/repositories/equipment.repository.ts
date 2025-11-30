import { BaseRepository } from './base.repository';
import { Equipment, IEquipment } from '../models/equipment.model';
import { EquipmentStatus } from '../types/enums';

export class EquipmentRepository extends BaseRepository<IEquipment> {
  constructor() {
    super(Equipment);
  }

  async findAvailable(): Promise<IEquipment[]> {
    return this.model.find({ status: EquipmentStatus.DISPONIBLE, isActive: true, stock: { $gt: 0 } });
  }

  async findByStatus(status: EquipmentStatus): Promise<IEquipment[]> {
    return this.model.find({ status, isActive: true });
  }

  async findByCategory(category: string): Promise<IEquipment[]> {
    return this.model.find({ category, isActive: true });
  }

  async findByBranch(branch: string): Promise<IEquipment[]> {
    return this.model.find({ branch, isActive: true });
  }

  async search(searchTerm: string): Promise<IEquipment[]> {
    return this.model.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
        { equipmentModel: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } }
      ],
      isActive: true
    });
  }

  async updateStock(id: string, quantity: number): Promise<IEquipment | null> {
    return this.model.findByIdAndUpdate(id, { $inc: { stock: quantity } }, { new: true });
  }

  async updateStatus(id: string, status: EquipmentStatus): Promise<IEquipment | null> {
    return this.model.findByIdAndUpdate(id, { status }, { new: true });
  }
}


