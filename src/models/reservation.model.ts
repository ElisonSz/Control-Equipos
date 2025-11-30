import mongoose, { Document, Schema } from 'mongoose';
import { ReservationStatus } from '../types/enums';

export interface IReservation extends Document {
  clientId: mongoose.Types.ObjectId;
  equipmentId: mongoose.Types.ObjectId;
  status: ReservationStatus;
  reservationDate: Date;
  deliveryDate?: Date;
  returnDate?: Date;
  ticketNumber: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const reservationSchema = new Schema<IReservation>(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    equipmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Equipment',
      required: true
    },
    status: {
      type: String,
      enum: Object.values(ReservationStatus),
      required: true,
      default: ReservationStatus.PENDIENTE
    },
    reservationDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    deliveryDate: {
      type: Date
    },
    returnDate: {
      type: Date
    },
    ticketNumber: {
      type: String,
      required: true,
      unique: true
    },
    notes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

reservationSchema.index({ clientId: 1 });
reservationSchema.index({ equipmentId: 1 });
reservationSchema.index({ status: 1 });
reservationSchema.index({ ticketNumber: 1 });
reservationSchema.index({ reservationDate: 1 });

export const Reservation = mongoose.model<IReservation>('Reservation', reservationSchema);


