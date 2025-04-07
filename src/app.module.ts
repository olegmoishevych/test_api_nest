import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LogsModule } from './modules/logs/logs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from './modules/logs/domain/logs';
import * as process from 'node:process';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [LogEntity],
      synchronize: true,
    }),
    LogsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
