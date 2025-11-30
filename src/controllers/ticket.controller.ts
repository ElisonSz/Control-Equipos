import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { TicketService } from '../services/ticket.service';

export class TicketController {
  private ticketService: TicketService;

  constructor() {
    this.ticketService = new TicketService();
  }

  generateTicket = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { reservationId } = req.params;
      const pdf = await this.ticketService.generateTicketPdf(reservationId);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=ticket-${reservationId}.pdf`);
      res.send(pdf);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}


