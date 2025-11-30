import { IsNotEmpty, IsString, IsMongoId, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { ReservationStatus } from '../types/enums';

export class CreateReservationDto {
  @IsMongoId()
  @IsNotEmpty()
  equipmentId!: string;

  @IsDateString()
  @IsOptional()
  reservationDate?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateReservationDto {
  @IsEnum(ReservationStatus)
  @IsOptional()
  status?: ReservationStatus;

  @IsDateString()
  @IsOptional()
  deliveryDate?: string;

  @IsDateString()
  @IsOptional()
  returnDate?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class ReservationFilterDto {
  @IsEnum(ReservationStatus)
  @IsOptional()
  status?: ReservationStatus;

  @IsMongoId()
  @IsOptional()
  clientId?: string;

  @IsMongoId()
  @IsOptional()
  equipmentId?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;
}


