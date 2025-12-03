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
import { RoomService } from '../room/room.service';
import { RedisService } from '../redis/redis.service';

interface JoinRoomPayload {
  roomId: string;
  username: string;
}

interface SendMessagePayload {
  roomId: string;
  username: string;
  content: string;
}

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly roomService: RoomService,
    private readonly redisService: RedisService,
  ) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinRoomPayload,
  ) {
    const { roomId, username } = payload;
    
    await client.join(roomId);
    
    // Send room history to the joining user
    const room = await this.roomService.getRoomById(roomId);
    client.emit('roomHistory', room);
    
    // Notify others in the room
    client.to(roomId).emit('userJoined', {
      username,
      timestamp: new Date().toISOString(),
    });

    console.log(`${username} joined room ${roomId}`);
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinRoomPayload,
  ) {
    const { roomId, username } = payload;
    
    await client.leave(roomId);
    
    client.to(roomId).emit('userLeft', {
      username,
      timestamp: new Date().toISOString(),
    });

    console.log(`${username} left room ${roomId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: SendMessagePayload,
  ) {
    const { roomId, username, content } = payload;

    // Validation
    if (!content || typeof content !== 'string') {
      client.emit('error', { messageKey: 'error.message.required' });
      return;
    }

    const trimmedContent = content.trim();
    if (trimmedContent.length === 0) {
      client.emit('error', { messageKey: 'error.message.empty' });
      return;
    }

    if (trimmedContent.length > 1000) {
      client.emit('error', { messageKey: 'error.message.tooLong', params: { maxLength: 1000 } });
      return;
    }

    // Save message to database
    const message = await this.roomService.createMessage(roomId, username, trimmedContent);

    // Broadcast to all users in the room (including sender)
    this.server.to(roomId).emit('newMessage', {
      id: message.id,
      content: message.content,
      username: message.username,
      createdAt: message.createdAt,
    });

    // Publish to Redis for multi-instance support
    await this.redisService.publish(
      `room:${roomId}`,
      JSON.stringify({
        id: message.id,
        content: message.content,
        username: message.username,
        createdAt: message.createdAt,
      }),
    );
  }

  @SubscribeMessage('typing')
  async handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { roomId: string; username: string; isTyping: boolean },
  ) {
    const { roomId, username, isTyping } = payload;
    
    client.to(roomId).emit('userTyping', {
      username,
      isTyping,
    });
  }
}
