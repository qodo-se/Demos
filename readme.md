# Real-Time Collaboration Tool

A real-time team collaboration tool built with React, NestJS, Socket.io, PostgreSQL, and Redis. Designed for small-scale teams (< 100 concurrent users) with Docker containerization.

## Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** - Fast build tool
- **TailwindCSS** - Utility-first CSS
- **Socket.io Client** - Real-time communication

### Backend

- **NestJS** with TypeScript
- **Socket.io** - WebSocket server
- **Prisma ORM** - Type-safe database access
- **PostgreSQL** - Primary database
- **Redis** - Caching and pub/sub

### Infrastructure

- **Docker** & **Docker Compose** - Containerization
- **PostgreSQL 16** - Database container
- **Redis 7** - Cache container

## Features

- ✅ Real-time messaging with WebSocket
- ✅ Multiple chat rooms
- ✅ Typing indicators
- ✅ Message persistence
- ✅ No authentication (as per requirements)
- ✅ Hot reload in development
- ✅ Fully containerized with Docker

## Prerequisites

- [Docker](https://www.docker.com/get-started) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0 or higher)

## Quick Start

1. **Clone or navigate to the project directory**

   ```bash
   cd collaboration-tool
   ```

2. **Start all services with Docker Compose**

   ```bash
   docker-compose up --build
   ```

   **First-time setup:** The `--build` flag ensures containers are built. Subsequent runs can use just `docker-compose up`.

   This will start:
   - PostgreSQL on `localhost:5432`
   - Redis on `localhost:6379`
   - Backend API on `http://localhost:3000`
   - Frontend on `http://localhost:5173`

   **Note:** Initial startup may take 2-3 minutes as npm packages are installed inside containers.

3. **Wait for services to be ready**
   Look for these messages in the logs:
   
   ```
   collaboration-backend  | Backend server is running on http://localhost:3000
   collaboration-frontend | VITE ready in X ms
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

5. **Start collaborating!**
   - Enter your username
   - Create or join a room
   - Start messaging in real-time

## Development

### Hot Reload

Both frontend and backend support hot reload in development mode:

- Frontend: Changes to React components will auto-refresh
- Backend: Changes to NestJS code will auto-restart the server

### Project Structure

```
collaboration-tool/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ChatRoom.tsx
│   │   │   └── RoomList.tsx
│   │   ├── App.tsx          # Main app component
│   │   ├── main.tsx         # Entry point
│   │   ├── types.ts         # TypeScript types
│   │   └── index.css        # Global styles
│   ├── Dockerfile
│   └── package.json
│
├── backend/                  # NestJS backend
│   ├── src/
│   │   ├── chat/            # WebSocket gateway
│   │   ├── room/            # Room management
│   │   ├── prisma/          # Database service
│   │   └── redis/           # Redis service
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   ├── Dockerfile
│   └── package.json
│
└── docker-compose.yml        # Docker orchestration
```

### Database Schema

The application uses Prisma ORM with the following models:

**Room**

- id (UUID)
- name (String)
- createdAt (DateTime)
- updatedAt (DateTime)
- messages (Relation)

**Message**

- id (UUID)
- content (String)
- username (String)
- roomId (UUID)
- createdAt (DateTime)

## Available Commands

### Start the application

```bash
docker-compose up
```

### Start in detached mode

```bash
docker-compose up -d
```

### Stop the application

```bash
docker-compose down
```

### Stop and remove volumes (clear database)

```bash
docker-compose down -v
```

### View logs
```bash
docker-compose logs -f
```

### View logs for specific service

```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Rebuild containers

```bash
docker-compose up --build
```

## Environment Variables

### Frontend (.env)

```
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

### Backend (.env)

```
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/collaboration_db?schema=public
REDIS_HOST=redis
REDIS_PORT=6379
PORT=3000
FRONTEND_URL=http://localhost:5173
```

## API Endpoints

### REST API

- `GET /` - Health check
- `GET /health` - Health status
- `GET /rooms` - List all rooms
- `POST /rooms` - Create a new room
- `GET /rooms/:id` - Get room by ID
- `GET /rooms/:id/messages` - Get room messages

### WebSocket Events

**Client → Server:**

- `joinRoom` - Join a chat room
- `leaveRoom` - Leave a chat room
- `sendMessage` - Send a message
- `typing` - Typing indicator

**Server → Client:**

- `roomHistory` - Room history on join
- `newMessage` - New message broadcast
- `userJoined` - User joined notification
- `userLeft` - User left notification
- `userTyping` - Typing indicator

## Troubleshooting

### Port already in use

If you get an error about ports already in use, you can:

1. Stop the conflicting service
2. Or change the port in `docker-compose.yml`

### Containers keep restarting

If backend container keeps restarting:

```bash
# Check the logs
docker-compose logs backend

# Common issues:
# - Database not ready: Wait for health check to pass
# - Prisma schema issues: Check prisma/schema.prisma syntax
# - Missing dependencies: Rebuild with --build flag
```

### Database connection issues

```bash
# Reset the database
docker-compose down -v
docker-compose up --build
```

### npm install fails
If you see npm errors during build:


```bash
# Clear everything and rebuild
docker-compose down -v
docker system prune -f
docker-compose up --build
```

### Hot reload not working

If code changes don't reflect:

1. Check that volume mounts are correct in docker-compose.yml
2. For backend: Check that src/ directory changes trigger reload
3. For frontend: Vite should auto-reload; check browser console for errors

### Clear all Docker resources
```bash
docker-compose down -v
docker system prune -a
```

### Frontend can't connect to backend

If you see connection errors in browser console:

1. Ensure backend is running: `docker-compose logs backend`
2. Check backend is listening on http://localhost:3000
3. Verify CORS is configured correctly in backend/src/main.ts

## Production Deployment

For production deployment:

1. Update the Dockerfiles to use production builds
2. Set appropriate environment variables
3. Configure proper CORS settings
4. Set up SSL/TLS certificates
5. Use a reverse proxy (nginx)
6. Consider using managed database services

## Future Enhancements

- [ ] User authentication
- [ ] File sharing
- [ ] Message reactions
- [ ] User presence indicators
- [ ] Message search
- [ ] Room permissions
- [ ] Message editing/deletion
- [ ] Notification system

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
