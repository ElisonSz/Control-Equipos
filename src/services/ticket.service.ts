import puppeteer from 'puppeteer';
import { IReservation } from '../models/reservation.model';
import { ReservationRepository } from '../repositories/reservation.repository';

export class TicketService {
  private reservationRepository: ReservationRepository;

  constructor() {
    this.reservationRepository = new ReservationRepository();
  }

  async generateTicketPdf(reservationId: string): Promise<Buffer> {
    const reservation = await this.reservationRepository.findById(reservationId);
    if (!reservation) {
      throw new Error('Reservation not found');
    }
    await reservation.populate('clientId');
    await reservation.populate('equipmentId');
    const html = this.generateTicketHtml(reservation);
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });
    await browser.close();
    return Buffer.from(pdf);
  }

  private generateTicketHtml(reservation: any): string {
    const client = reservation.clientId;
    const equipment = reservation.equipmentId;
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
          }
          .ticket {
            background-color: white;
            border-radius: 8px;
            padding: 30px;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #333;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            margin: 0;
            color: #333;
            font-size: 28px;
          }
          .ticket-number {
            background-color: #333;
            color: white;
            padding: 10px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            margin: 20px 0;
            border-radius: 4px;
          }
          .section {
            margin: 20px 0;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 4px;
          }
          .section h3 {
            margin-top: 0;
            color: #333;
            border-bottom: 2px solid #333;
            padding-bottom: 5px;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            padding: 5px 0;
            border-bottom: 1px dotted #ccc;
          }
          .info-label {
            font-weight: bold;
            color: #666;
          }
          .info-value {
            color: #333;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #333;
            color: #666;
            font-size: 12px;
          }
          .status {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: bold;
            margin-top: 10px;
          }
          .status.pendiente {
            background-color: #ffc107;
            color: #333;
          }
        </style>
      </head>
      <body>
        <div class="ticket">
          <div class="header">
            <h1>Control de Equipos</h1>
            <p>Sistema de Alquiler de Equipos</p>
          </div>
          <div class="ticket-number">
            Ticket: ${reservation.ticketNumber}
          </div>
          <div class="section">
            <h3>Información del Cliente</h3>
            <div class="info-row">
              <span class="info-label">Nombre:</span>
              <span class="info-value">${client?.firstName || 'N/A'} ${client?.lastName || 'N/A'}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email:</span>
              <span class="info-value">${client?.email || 'N/A'}</span>
            </div>
          </div>
          <div class="section">
            <h3>Información del Equipo</h3>
            <div class="info-row">
              <span class="info-label">Equipo:</span>
              <span class="info-value">${equipment?.name || 'N/A'}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Marca:</span>
              <span class="info-value">${equipment?.brand || 'N/A'}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Modelo:</span>
              <span class="info-value">${equipment?.equipmentModel || 'N/A'}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Categoría:</span>
              <span class="info-value">${equipment?.category || 'N/A'}</span>
            </div>
          </div>
          <div class="section">
            <h3>Información de la Reserva</h3>
            <div class="info-row">
              <span class="info-label">Fecha de Reserva:</span>
              <span class="info-value">${new Date(reservation.reservationDate).toLocaleString('es-ES')}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Estado:</span>
              <span class="info-value">
                <span class="status pendiente">${reservation.status.toUpperCase()}</span>
              </span>
            </div>
            ${reservation.notes ? `
            <div class="info-row">
              <span class="info-label">Notas:</span>
              <span class="info-value">${reservation.notes}</span>
            </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>Este ticket debe ser presentado para la entrega del equipo.</p>
            <p>Generado el ${new Date().toLocaleString('es-ES')}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

