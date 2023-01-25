import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.setGlobalPrefix('api.coingecko.com/api/v3');
  await app.listen(5999);
}
bootstrap();
