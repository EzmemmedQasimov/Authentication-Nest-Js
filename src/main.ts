import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './setupApp';
// import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupApp(app);
  await app.listen(3000);
}
bootstrap();
