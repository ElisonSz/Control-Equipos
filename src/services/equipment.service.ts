import { EquipmentRepository } from '../repositories/equipment.repository';
import { CreateEquipmentDto, UpdateEquipmentDto, EquipmentFilterDto } from '../dto/equipment.dto';
import { IEquipment } from '../models/equipment.model';
import { EquipmentStatus } from '../types/enums';

export class EquipmentService {
  private equipmentRepository: EquipmentRepository;

  constructor() {
    this.equipmentRepository = new EquipmentRepository();
  }

  async createEquipment(data: CreateEquipmentDto): Promise<IEquipment> {
    return this.equipmentRepository.create(data as Partial<IEquipment>);
  }

  async getEquipmentById(id: string): Promise<IEquipment | null> {
    return this.equipmentRepository.findById(id);
  }

  async getAllEquipment(filter?: EquipmentFilterDto): Promise<IEquipment[]> {
    if (!filter) {
      return this.equipmentRepository.find({ isActive: true } as any);
    }
    let query: any = { isActive: true };
    if (filter.status) {
      query.status = filter.status;
    }
    if (filter.category) {
      query.category = filter.category;
    }
    if (filter.branch) {
      query.branch = filter.branch;
    }
    if (filter.search) {
      return this.equipmentRepository.search(filter.search);
    }
    return this.equipmentRepository.find(query);
  }

  async getAvailableEquipment(): Promise<IEquipment[]> {
    return this.equipmentRepository.findAvailable();
  }

  async updateEquipment(id: string, data: UpdateEquipmentDto): Promise<IEquipment | null> {
    return this.equipmentRepository.update(id, data);
  }

  async deleteEquipment(id: string): Promise<boolean> {
    return this.equipmentRepository.delete(id);
  }

  async updateStock(id: string, quantity: number): Promise<IEquipment | null> {
    return this.equipmentRepository.updateStock(id, quantity);
  }

  async updateStatus(id: string, status: EquipmentStatus): Promise<IEquipment | null> {
    return this.equipmentRepository.update(id, { status });
  }
}


