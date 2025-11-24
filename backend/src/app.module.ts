import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { PrismaService } from './prisma/prisma.service';
import { RoomService } from './room/room.service';
import { RoomController } from './room/room.controller';
import { RedisService } from './redis/redis.service';

@Module({
  imports: [],
  controllers: [AppController, RoomController],
  providers: [AppService, ChatGateway, PrismaService, RoomService, RedisService],
})
export class AppModule {}
