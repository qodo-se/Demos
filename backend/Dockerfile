# Development Dockerfile for Backend
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies (including dev dependencies)
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start development server with hot reload
CMD ["sh", "-c", "npx prisma generate && npx prisma db push && npm run start:dev"]
