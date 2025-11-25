import { IsString, IsNotEmpty, IsUUID, MinLength, MaxLength } from 'class-validator';

export class JoinRoomDto {
  @IsUUID('4', { message: 'Invalid room ID format' })
  roomId: string;

  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(2, { message: 'Username must be at least 2 characters' })
  @MaxLength(50, { message: 'Username must not exceed 50 characters' })
  username: string;
}
