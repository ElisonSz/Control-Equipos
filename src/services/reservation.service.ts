import mongoose from 'mongoose';
import { ReservationRepository } from '../repositories/reservation.repository';
import { EquipmentRepository } from '../repositories/equipment.repository';
import { CreateReservationDto, UpdateReservationDto, ReservationFilterDto } from '../dto/reservation.dto';
import { IReservation } from '../models/reservation.model';
import { ReservationStatus } from '../types/enums';
import { EquipmentStatus } from '../types/enums';
import { EventService, EventType } from './event.service';

export class ReservationService {
  private reservationRepository: ReservationRepository;
  private equipmentRepository: EquipmentRepository;

  constructor() {
    this.reservationRepository = new ReservationRepository();
    this.equipmentRepository = new EquipmentRepository();
  }

  async createReservation(clientId: string, data: CreateReservationDto): Promise<IReservation> {
    const equipment = await this.equipmentRepository.findById(data.equipmentId);
    if (!equipment) {
      throw new Error('Equipment not found');
    }
    if (equipment.status !== EquipmentStatus.DISPONIBLE || equipment.stock <= 0) {
      throw new Error('Equipment not available');
    }
    const ticketNumber = await this.reservationRepository.generateTicketNumber();
    const reservation = await this.reservationRepository.create({
      clientId: new mongoose.Types.ObjectId(clientId),
      equipmentId: new mongoose.Types.ObjectId(data.equipmentId),
      status: ReservationStatus.PENDIENTE,
      reservationDate: data.reservationDate ? new Date(data.reservationDate) : new Date(),
      ticketNumber,
      notes: data.notes
    } as Partial<IReservation>);
    await this.equipmentRepository.updateStatus(data.equipmentId, EquipmentStatus.RESERVADO);
    await this.equipmentRepository.updateStock(data.equipmentId, -1);
    const eventService = EventService.getInstance();
    eventService.emitReservationCreated(reservation);
    return reservation;
  }

  async getReservationById(id: string): Promise<IReservation | null> {
    return this.reservationRepository.findById(id);
  }

  async getReservationByTicket(ticketNumber: string): Promise<IReservation | null> {
    return this.reservationRepository.findByTicketNumber(ticketNumber);
  }

  async getAllReservations(filter?: ReservationFilterDto): Promise<IReservation[]> {
    if (!filter) {
      return this.reservationRepository.find({} as any);
    }
    let query: any = {};
    if (filter.status) {
      query.status = filter.status;
    }
    if (filter.clientId) {
      query.clientId = filter.clientId;
    }
    if (filter.equipmentId) {
      query.equipmentId = filter.equipmentId;
    }
    if (filter.startDate && filter.endDate) {
      return this.reservationRepository.findByDateRange(
        new Date(filter.startDate),
        new Date(filter.endDate)
      );
    }
    return this.reservationRepository.find(query);
  }

  async getPendingReservations(): Promise<IReservation[]> {
    return this.reservationRepository.findPending();
  }

  async getReservationsByClient(clientId: string): Promise<IReservation[]> {
    return this.reservationRepository.findByClient(clientId);
  }

  async updateReservation(id: string, data: UpdateReservationDto): Promise<IReservation | null> {
    const reservation = await this.reservationRepository.findById(id);
    if (!reservation) {
      throw new Error('Reservation not found');
    }
    const updateData: any = {};
    if (data.status) {
      updateData.status = data.status;
      if (data.status === ReservationStatus.ENTREGADA && !reservation.deliveryDate) {
        updateData.deliveryDate = new Date();
      }
      if (data.status === ReservationStatus.DEVUELTA && !reservation.returnDate) {
        updateData.returnDate = new Date();
        const equipment = await this.equipmentRepository.findById(reservation.equipmentId.toString());
        if (equipment) {
          await this.equipmentRepository.updateStatus(equipment._id.toString(), EquipmentStatus.DISPONIBLE);
          await this.equipmentRepository.updateStock(equipment._id.toString(), 1);
        }
      }
    }
    if (data.deliveryDate) {
      updateData.deliveryDate = new Date(data.deliveryDate);
    }
    if (data.returnDate) {
      updateData.returnDate = new Date(data.returnDate);
    }
    if (data.notes !== undefined) {
      updateData.notes = data.notes;
    }
    return this.reservationRepository.update(id, updateData);
  }

  async cancelReservation(id: string): Promise<IReservation | null> {
    const reservation = await this.reservationRepository.findById(id);
    if (!reservation) {
      throw new Error('Reservation not found');
    }
    if (reservation.status === ReservationStatus.DEVUELTA) {
      throw new Error('Cannot cancel a returned reservation');
    }
    const equipment = await this.equipmentRepository.findById(reservation.equipmentId.toString());
    if (equipment) {
      await this.equipmentRepository.updateStatus(equipment._id.toString(), EquipmentStatus.DISPONIBLE);
      await this.equipmentRepository.updateStock(equipment._id.toString(), 1);
    }
    return this.reservationRepository.update(id, { status: ReservationStatus.CANCELADA });
  }
}

