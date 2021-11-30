import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const configService = app.select(ConfigModule).get(ConfigService);

  app.enableCors();

  await app.listen(configService.get('port'));
}
bootstrap();
