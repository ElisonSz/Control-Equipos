import { BaseRepository } from './base.repository';
import { Reservation, IReservation } from '../models/reservation.model';
import { ReservationStatus } from '../types/enums';

export class ReservationRepository extends BaseRepository<IReservation> {
  constructor() {
    super(Reservation);
  }

  async findByClient(clientId: string): Promise<IReservation[]> {
    return this.model.find({ clientId }).populate('equipmentId').populate('clientId');
  }

  async findByEquipment(equipmentId: string): Promise<IReservation[]> {
    return this.model.find({ equipmentId }).populate('equipmentId').populate('clientId');
  }

  async findByStatus(status: ReservationStatus): Promise<IReservation[]> {
    return this.model.find({ status }).populate('equipmentId').populate('clientId');
  }

  async findByTicketNumber(ticketNumber: string): Promise<IReservation | null> {
    return this.model.findOne({ ticketNumber }).populate('equipmentId').populate('clientId');
  }

  async findPending(): Promise<IReservation[]> {
    return this.model.find({ status: ReservationStatus.PENDIENTE }).populate('equipmentId').populate('clientId');
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<IReservation[]> {
    return this.model.find({
      reservationDate: {
        $gte: startDate,
        $lte: endDate
      }
    }).populate('equipmentId').populate('clientId');
  }

  async generateTicketNumber(): Promise<string> {
    let ticketNumber: string;
    let exists = true;
    while (exists) {
      const count = await this.model.countDocuments();
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      ticketNumber = `TKT-${timestamp}-${random}-${(count + 1).toString().padStart(4, '0')}`;
      const existing = await this.model.findOne({ ticketNumber });
      exists = !!existing;
    }
    return ticketNumber!;
  }
}

