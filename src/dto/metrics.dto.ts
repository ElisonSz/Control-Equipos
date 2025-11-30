import { IsOptional, IsDateString, IsEnum } from 'class-validator';
import { ReservationStatus } from '../types/enums';
import { EquipmentStatus } from '../types/enums';

export class MetricsFilterDto {
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsEnum(ReservationStatus)
  @IsOptional()
  reservationStatus?: ReservationStatus;

  @IsEnum(EquipmentStatus)
  @IsOptional()
  equipmentStatus?: EquipmentStatus;

  @IsOptional()
  branch?: string;
}


