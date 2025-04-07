import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from './domain/logs';
import { LogsController } from './api/logs.controller';
import { LogsService } from './application/logs.service';
import {
  ILogsRepository,
  LogsRepository,
} from './infrastructure/logs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LogEntity])],
  controllers: [LogsController],
  providers: [
    LogsService,
    LogsRepository,
    {
      provide: ILogsRepository,
      useClass: LogsRepository,
    },
  ],
})
export class LogsModule {}
