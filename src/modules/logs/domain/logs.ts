import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreateLogDto } from '../api/dto/createLogs';

@Entity('logs')
export class LogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timestamp: string;

  @Column()
  method: string;

  @Column()
  url: string;

  @Column()
  status: number;

  @Column()
  responseTime: number;

  static create(dto: CreateLogDto): LogEntity {
    const entity = new LogEntity();
    entity.timestamp = dto.timestamp;
    entity.method = dto.method;
    entity.url = dto.url;
    entity.status = dto.status;
    entity.responseTime = dto.responseTime;
    return entity;
  }
}
