import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsePipes, Logger } from '@nestjs/common';
import { RoomService } from '../room/room.service';
import { RedisService } from '../redis/redis.service';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { SendMessageDto } from '../room/dto/send-message.dto';
import { JoinRoomDto } from '../room/dto/join-room.dto';
import { SanitizeUtil } from '../common/utils/sanitize.util';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    private readonly roomService: RoomService,
    private readonly redisService: RedisService,
  ) {}

  async handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  @UsePipes(ValidationPipe)
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinRoomDto,
  ) {
    try {
      const { roomId, username } = payload;
      const sanitizedUsername = SanitizeUtil.sanitizeUsername(username);
      
      await client.join(roomId);
      
      const room = await this.roomService.getRoomById(roomId);
      client.emit('roomHistory', room);
      
      client.to(roomId).emit('userJoined', {
        username: sanitizedUsername,
        timestamp: new Date().toISOString(),
      });

      this.logger.log(`${sanitizedUsername} joined room ${roomId}`);
    } catch (error) {
      this.logger.error(`Error in joinRoom: ${error.message}`);
      client.emit('error', { message: 'Failed to join room' });
    }
  }

  @SubscribeMessage('leaveRoom')
  @UsePipes(ValidationPipe)
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinRoomDto,
  ) {
    try {
      const { roomId, username } = payload;
      const sanitizedUsername = SanitizeUtil.sanitizeUsername(username);
      
      await client.leave(roomId);
      
      client.to(roomId).emit('userLeft', {
        username: sanitizedUsername,
        timestamp: new Date().toISOString(),
      });

      this.logger.log(`${sanitizedUsername} left room ${roomId}`);
    } catch (error) {
      this.logger.error(`Error in leaveRoom: ${error.message}`);
      client.emit('error', { message: 'Failed to leave room' });
    }
  }

  @SubscribeMessage('sendMessage')
  @UsePipes(ValidationPipe)
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: SendMessageDto,
  ) {
    try {
      const { roomId, username, content } = payload;
      
      // Sanitize inputs
      const sanitizedUsername = SanitizeUtil.sanitizeUsername(username);
      const sanitizedContent = SanitizeUtil.sanitizeHtml(content);

      const message = await this.roomService.createMessage(
        roomId,
        sanitizedUsername,
        sanitizedContent,
      );

      const messagePayload = {
        id: message.id,
        content: message.content,
        username: message.username,
        createdAt: message.createdAt,
      };

      this.server.to(roomId).emit('newMessage', messagePayload);

      await this.redisService.publish(
        `room:${roomId}`,
        JSON.stringify(messagePayload),
      );
    } catch (error) {
      this.logger.error(`Error in sendMessage: ${error.message}`);
      client.emit('error', { message: 'Failed to send message' });
    }
  }

  @SubscribeMessage('typing')
  async handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { roomId: string; username: string; isTyping: boolean },
  ) {
    try {
      const { roomId, username, isTyping } = payload;
      const sanitizedUsername = SanitizeUtil.sanitizeUsername(username);
      
      client.to(roomId).emit('userTyping', {
        username: sanitizedUsername,
        isTyping,
      });
    } catch (error) {
      this.logger.error(`Error in handleTyping: ${error.message}`);
    }
  }
}
