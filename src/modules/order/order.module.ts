import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { EventModule } from '../event/event.module';
import { OrderRepository } from './infrastructure/order.repository';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderConsumer } from './infrastructure/order.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository]),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('redis.host'),
          port: +configService.get('redis.port'),
        },
        limiter: {
          max: 5,
          duration: 1000,
          bounceBack: false,
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'order-queue',
    }),
    EventModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderConsumer],
  exports: [OrderService],
})
export class OrderModule {}
