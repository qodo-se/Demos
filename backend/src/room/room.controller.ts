import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  UsePipes,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { ValidationPipe } from '../common/pipes/validation.pipe';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto.name);
  }

  @Get()
  async getAllRooms() {
    return this.roomService.getAllRooms();
  }

  @Get(':id')
  async getRoomById(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomService.getRoomById(id);
  }

  @Get(':id/messages')
  async getRoomMessages(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomService.getRoomMessages(id);
  }
}
