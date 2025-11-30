import { ReservationRepository } from '../repositories/reservation.repository';
import { EquipmentRepository } from '../repositories/equipment.repository';
import { UserRepository } from '../repositories/user.repository';
import { MetricsFilterDto } from '../dto/metrics.dto';
import { ReservationStatus } from '../types/enums';
import { EquipmentStatus } from '../types/enums';

export interface MetricsResponse {
  reservations: {
    total: number;
    byStatus: Record<ReservationStatus, number>;
    pending: number;
    confirmed: number;
    delivered: number;
    returned: number;
    cancelled: number;
  };
  equipment: {
    total: number;
    byStatus: Record<EquipmentStatus, number>;
    available: number;
    reserved: number;
    damaged: number;
    maintenance: number;
  };
  users: {
    total: number;
    clients: number;
    admins: number;
    operatives: number;
  };
  recentReservations: any[];
}

export class MetricsService {
  private reservationRepository: ReservationRepository;
  private equipmentRepository: EquipmentRepository;
  private userRepository: UserRepository;

  constructor() {
    this.reservationRepository = new ReservationRepository();
    this.equipmentRepository = new EquipmentRepository();
    this.userRepository = new UserRepository();
  }

  async getMetrics(filter?: MetricsFilterDto): Promise<MetricsResponse> {
    const query: any = {};
    if (filter?.startDate && filter?.endDate) {
      query.reservationDate = {
        $gte: new Date(filter.startDate),
        $lte: new Date(filter.endDate)
      };
    }
    if (filter?.reservationStatus) {
      query.status = filter.reservationStatus;
    }
    const allReservations = await this.reservationRepository.find(query);
    const reservationsByStatus = this.groupReservationsByStatus(allReservations);
    const equipmentQuery: any = { isActive: true };
    if (filter?.equipmentStatus) {
      equipmentQuery.status = filter.equipmentStatus;
    }
    if (filter?.branch) {
      equipmentQuery.branch = filter.branch;
    }
    const allEquipment = await this.equipmentRepository.find(equipmentQuery);
    const equipmentByStatus = this.groupEquipmentByStatus(allEquipment);
    const allUsers = await this.userRepository.findActiveUsers();
    const usersByRole = this.groupUsersByRole(allUsers);
    const recentReservations = await this.reservationRepository.find({} as any);
    recentReservations.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return {
      reservations: {
        total: allReservations.length,
        byStatus: reservationsByStatus,
        pending: reservationsByStatus[ReservationStatus.PENDIENTE] || 0,
        confirmed: reservationsByStatus[ReservationStatus.CONFIRMADA] || 0,
        delivered: reservationsByStatus[ReservationStatus.ENTREGADA] || 0,
        returned: reservationsByStatus[ReservationStatus.DEVUELTA] || 0,
        cancelled: reservationsByStatus[ReservationStatus.CANCELADA] || 0
      },
      equipment: {
        total: allEquipment.length,
        byStatus: equipmentByStatus,
        available: equipmentByStatus[EquipmentStatus.DISPONIBLE] || 0,
        reserved: equipmentByStatus[EquipmentStatus.RESERVADO] || 0,
        damaged: equipmentByStatus[EquipmentStatus.DANADO] || 0,
        maintenance: equipmentByStatus[EquipmentStatus.EN_MANTENIMIENTO] || 0
      },
      users: {
        total: allUsers.length,
        clients: usersByRole.cliente || 0,
        admins: usersByRole.admin || 0,
        operatives: usersByRole.operativo || 0
      },
      recentReservations: recentReservations.slice(0, 10).map(r => ({
        id: r._id.toString(),
        ticketNumber: r.ticketNumber,
        status: r.status,
        reservationDate: r.reservationDate,
        clientId: r.clientId.toString(),
        equipmentId: r.equipmentId.toString()
      }))
    };
  }

  private groupReservationsByStatus(reservations: any[]): Record<ReservationStatus, number> {
    const grouped: any = {};
    Object.values(ReservationStatus).forEach(status => {
      grouped[status] = 0;
    });
    reservations.forEach(reservation => {
      grouped[reservation.status] = (grouped[reservation.status] || 0) + 1;
    });
    return grouped;
  }

  private groupEquipmentByStatus(equipment: any[]): Record<EquipmentStatus, number> {
    const grouped: any = {};
    Object.values(EquipmentStatus).forEach(status => {
      grouped[status] = 0;
    });
    equipment.forEach(eq => {
      grouped[eq.status] = (grouped[eq.status] || 0) + 1;
    });
    return grouped;
  }

  private groupUsersByRole(users: any[]): Record<string, number> {
    const grouped: any = {};
    users.forEach(user => {
      grouped[user.role] = (grouped[user.role] || 0) + 1;
    });
    return grouped;
  }
}


