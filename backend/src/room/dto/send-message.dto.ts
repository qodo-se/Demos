import { IsString, IsNotEmpty, IsUUID, MinLength, MaxLength } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @IsNotEmpty({ message: 'Message content cannot be empty' })
  @MinLength(1)
  @MaxLength(5000, { message: 'Message must not exceed 5000 characters' })
  content: string;

  @IsUUID('4', { message: 'Invalid room ID format' })
  roomId: string;

  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(2)
  @MaxLength(50)
  username: string;
}
