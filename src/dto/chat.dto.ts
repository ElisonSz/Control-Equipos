import { IsNotEmpty, IsString, IsMongoId, IsOptional, IsBoolean } from 'class-validator';

export class CreateChatMessageDto {
  @IsMongoId()
  @IsOptional()
  receiverId?: string;

  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsBoolean()
  @IsOptional()
  isSupport?: boolean;

  @IsString()
  @IsOptional()
  roomId?: string;
}


