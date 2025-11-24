import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async createRoom(@Body() body: { name: string }) {
    return this.roomService.createRoom(body.name);
  }

  @Get()
  async getAllRooms() {
    return this.roomService.getAllRooms();
  }

  @Get(':id')
  async getRoomById(@Param('id') id: string) {
    return this.roomService.getRoomById(id);
  }

  @Get(':id/messages')
  async getRoomMessages(@Param('id') id: string) {
    return this.roomService.getRoomMessages(id);
  }
}
