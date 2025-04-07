import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogEntity } from '../domain/logs';

export abstract class ILogsRepository {
  abstract save(logs: LogEntity[]): Promise<LogEntity[]>;
  abstract getStatsFromDb();
}

@Injectable()
export class LogsRepository implements ILogsRepository {
  constructor(
    @InjectRepository(LogEntity)
    private readonly logRepository: Repository<LogEntity>,
  ) {}

  async save(logs: LogEntity[]): Promise<LogEntity[]> {
    return this.logRepository.save(logs);
  }

  async getStatsFromDb() {
    const raw = await this.logRepository.query(`
        WITH
            total AS (
                SELECT COUNT(*)::int AS total_requests FROM logs
            ),
            methods AS (
                SELECT method, COUNT(*)::int AS count
        FROM logs
        GROUP BY method
            ),
            statuses AS (
        SELECT status, COUNT(*)::int AS count
        FROM logs
        GROUP BY status
            ),
            avg_response AS (
        SELECT url, ROUND(AVG("responseTime")::numeric, 2) AS avg_response_time
        FROM logs
        GROUP BY url
            )
        SELECT
                (SELECT json_object_agg(method, count) FROM methods) AS method_counts,
                (SELECT json_object_agg(status::text, count) FROM statuses) AS status_counts,
                (SELECT json_object_agg(url, avg_response_time) FROM avg_response) AS average_response_times,
                (SELECT total_requests FROM total) AS total_requests;
    `);

    return raw[0];
  }
}
