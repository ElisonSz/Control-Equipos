import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { AuthService } from './auth.service';
import { ReservationService } from './reservation.service';
import { ChatService } from './chat.service';
import { EventService, EventType } from './event.service';
import { getRedisClient } from '../config/redis';
import { logger } from '../config/logger';
import { UserRole } from '../types/enums';

export class WebSocketService {
  private io: SocketIOServer;
  private authService: AuthService;
  private reservationService: ReservationService;
  private chatService: ChatService;

  constructor(httpServer: HTTPServer) {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });
    this.authService = new AuthService();
    this.reservationService = new ReservationService();
    this.chatService = new ChatService();
    this.setupSocketHandlers();
  }

  private setupSocketHandlers(): void {
    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');
        if (!token) {
          return next(new Error('Authentication error'));
        }
        const decoded = this.authService.verifyToken(token);
        socket.data.user = decoded;
        next();
      } catch (error) {
        next(new Error('Authentication error'));
      }
    });

    this.io.on('connection', (socket) => {
      const user = socket.data.user;
      logger.info(`User connected: ${user.email}`);
      socket.join(`user:${user.id}`);
      if (user.role === UserRole.OPERATIVO || user.role === UserRole.ADMIN) {
        socket.join('operatives');
      }
      this.setupReservationHandlers(socket, user);
      this.setupChatHandlers(socket, user);
      socket.on('disconnect', () => {
        logger.info(`User disconnected: ${user.email}`);
      });
    });
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    const eventService = EventService.getInstance();
    eventService.on(EventType.NEW_RESERVATION, (reservation) => {
      this.notifyNewReservation(reservation);
    });
  }

  private setupReservationHandlers(socket: any, user: any): void {
    socket.on('subscribe:reservations', async () => {
      if (user.role === UserRole.OPERATIVO || user.role === UserRole.ADMIN) {
        socket.join('reservations');
        const pendingReservations = await this.reservationService.getPendingReservations();
        socket.emit('reservations:update', pendingReservations);
      }
    });

    socket.on('unsubscribe:reservations', () => {
      socket.leave('reservations');
    });
  }

  private setupChatHandlers(socket: any, user: any): void {
    socket.on('chat:message', async (data: { receiverId?: string; message: string; roomId?: string; isSupport?: boolean }) => {
      try {
        const message = await this.chatService.createMessage(user.id, {
          receiverId: data.receiverId,
          message: data.message,
          roomId: data.roomId,
          isSupport: data.isSupport
        });
        if (data.receiverId) {
          this.io.to(`user:${data.receiverId}`).emit('chat:message', message);
        }
        if (data.roomId) {
          this.io.to(`room:${data.roomId}`).emit('chat:message', message);
        }
        if (data.isSupport) {
          this.io.to('operatives').emit('chat:support', message);
        }
        socket.emit('chat:message:sent', message);
      } catch (error: any) {
        socket.emit('chat:error', { message: error.message });
      }
    });

    socket.on('chat:join', (roomId: string) => {
      socket.join(`room:${roomId}`);
    });

    socket.on('chat:leave', (roomId: string) => {
      socket.leave(`room:${roomId}`);
    });
  }

  notifyNewReservation(reservation: any): void {
    this.io.to('reservations').emit('reservation:new', reservation);
    this.io.to('operatives').emit('alert:new-reservation', {
      type: 'new_reservation',
      message: 'Nueva reserva pendiente',
      reservation
    });
  }

  getIO(): SocketIOServer {
    return this.io;
  }
}

