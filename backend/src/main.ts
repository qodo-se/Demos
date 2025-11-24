import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      credentials: true,
    },
  });

  await app.listen(process.env.PORT || 3000);
  console.log(`Backend server is running on http://localhost:${process.env.PORT || 3000}`);
}
bootstrap();
