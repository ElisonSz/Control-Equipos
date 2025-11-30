import { EquipmentService } from '../services/equipment.service';
import { EquipmentRepository } from '../repositories/equipment.repository';
import { CreateEquipmentDto } from '../dto/equipment.dto';
import { EquipmentStatus } from '../types/enums';

jest.mock('../repositories/equipment.repository');

describe('EquipmentService', () => {
  let equipmentService: EquipmentService;
  let mockEquipmentRepository: jest.Mocked<EquipmentRepository>;

  beforeEach(() => {
    mockEquipmentRepository = new EquipmentRepository() as jest.Mocked<EquipmentRepository>;
    equipmentService = new EquipmentService();
    (equipmentService as any).equipmentRepository = mockEquipmentRepository;
  });

  describe('createEquipment', () => {
    it('should create equipment successfully', async () => {
      const createData: CreateEquipmentDto = {
        name: 'Laptop Dell',
        type: 'Laptop',
        category: 'Computadoras',
        stock: 5,
        location: 'Almacén A',
        shelf: 'A1',
        status: EquipmentStatus.DISPONIBLE,
        brand: 'Dell',
        model: 'Latitude 5520',
        branch: 'Sucursal Central'
      };

      const mockEquipment = {
        _id: '123',
        ...createData,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockEquipmentRepository.create = jest.fn().mockResolvedValue(mockEquipment as any);

      const result = await equipmentService.createEquipment(createData);

      expect(result.name).toBe(createData.name);
      expect(mockEquipmentRepository.create).toHaveBeenCalledWith(createData);
    });
  });

  describe('getAvailableEquipment', () => {
    it('should return available equipment', async () => {
      const mockEquipment = [
        {
          _id: '123',
          name: 'Laptop Dell',
          status: EquipmentStatus.DISPONIBLE,
          stock: 5
        }
      ];

      mockEquipmentRepository.findAvailable = jest.fn().mockResolvedValue(mockEquipment as any);

      const result = await equipmentService.getAvailableEquipment();

      expect(result).toHaveLength(1);
      expect(mockEquipmentRepository.findAvailable).toHaveBeenCalled();
    });
  });
});


