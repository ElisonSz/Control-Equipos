import { EventEmitter } from 'events';

export enum EventType {
  NEW_RESERVATION = 'new_reservation',
  RESERVATION_UPDATED = 'reservation_updated',
  RESERVATION_CANCELLED = 'reservation_cancelled'
}

export class EventService extends EventEmitter {
  private static instance: EventService;

  private constructor() {
    super();
  }

  static getInstance(): EventService {
    if (!EventService.instance) {
      EventService.instance = new EventService();
    }
    return EventService.instance;
  }

  emitReservationCreated(reservation: any): void {
    this.emit(EventType.NEW_RESERVATION, reservation);
  }

  emitReservationUpdated(reservation: any): void {
    this.emit(EventType.RESERVATION_UPDATED, reservation);
  }

  emitReservationCancelled(reservation: any): void {
    this.emit(EventType.RESERVATION_CANCELLED, reservation);
  }
}


