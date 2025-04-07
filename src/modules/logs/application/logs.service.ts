import { Injectable } from '@nestjs/common';
import { ILogsRepository } from '../infrastructure/logs.repository';
import { CreateLogArrayDto } from '../api/dto/createLogs';
import { LogEntity } from '../domain/logs';

@Injectable()
export class LogsService {
  constructor(private readonly logsRepository: ILogsRepository) {}

  async saveLog(dto: CreateLogArrayDto): Promise<LogEntity[]> {
    const logs = dto.logs.map(LogEntity.create);
    return this.logsRepository.save(logs);
  }

  async getStats() {
    return this.logsRepository.getStatsFromDb();
  }
}
