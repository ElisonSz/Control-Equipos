import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { ReservationService } from '../services/reservation.service';
import { CreateReservationDto, UpdateReservationDto, ReservationFilterDto } from '../dto/reservation.dto';

export class ReservationController {
  private reservationService: ReservationService;

  constructor() {
    this.reservationService = new ReservationService();
  }

  createReservation = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      const data = req.body as CreateReservationDto;
      const reservation = await this.reservationService.createReservation(req.user.id, data);
      res.status(201).json(reservation);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  getReservationById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const reservation = await this.reservationService.getReservationById(id);
      if (!reservation) {
        res.status(404).json({ message: 'Reservation not found' });
        return;
      }
      res.status(200).json(reservation);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getReservationByTicket = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { ticketNumber } = req.params;
      const reservation = await this.reservationService.getReservationByTicket(ticketNumber);
      if (!reservation) {
        res.status(404).json({ message: 'Reservation not found' });
        return;
      }
      res.status(200).json(reservation);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getAllReservations = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const filter = req.query as ReservationFilterDto;
      const reservations = await this.reservationService.getAllReservations(filter);
      res.status(200).json(reservations);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getPendingReservations = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const reservations = await this.reservationService.getPendingReservations();
      res.status(200).json(reservations);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getMyReservations = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      const reservations = await this.reservationService.getReservationsByClient(req.user.id);
      res.status(200).json(reservations);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  updateReservation = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const data = req.body as UpdateReservationDto;
      const reservation = await this.reservationService.updateReservation(id, data);
      if (!reservation) {
        res.status(404).json({ message: 'Reservation not found' });
        return;
      }
      res.status(200).json(reservation);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  cancelReservation = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const reservation = await this.reservationService.cancelReservation(id);
      if (!reservation) {
        res.status(404).json({ message: 'Reservation not found' });
        return;
      }
      res.status(200).json(reservation);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}


