import mongoose, { Document, Schema, Model } from 'mongoose';
import { EquipmentStatus } from '../types/enums';

export interface IEquipment extends Document {
  name: string;
  type: string;
  category: string;
  stock: number;
  location: string;
  shelf: string;
  status: EquipmentStatus;
  brand: string;
  equipmentModel: string;
  image?: string;
  branch: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const equipmentSchema = new Schema<IEquipment>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    shelf: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: Object.values(EquipmentStatus),
      required: true,
      default: EquipmentStatus.DISPONIBLE
    },
    brand: {
      type: String,
      required: true,
      trim: true
    },
    equipmentModel: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      trim: true
    },
    branch: {
      type: String,
      required: true,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

equipmentSchema.index({ name: 1 });
equipmentSchema.index({ status: 1 });
equipmentSchema.index({ branch: 1 });
equipmentSchema.index({ category: 1 });

export const Equipment = mongoose.model<IEquipment>('Equipment', equipmentSchema);


