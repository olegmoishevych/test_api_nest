import { Body, Controller, Get, Post } from '@nestjs/common';
import { LogsService } from '../application/logs.service';
import { CreateLogArrayDto } from './dto/createLogs';
import { LogEntity } from '../domain/logs';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LogStatsResponseDto } from './dto/log-stats-response.dto';

@ApiTags('Logs')
@Controller()
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post('logs')
  @ApiOperation({ summary: 'Upload an array of log entries' })
  @ApiResponse({ status: 201, description: 'Logs uploaded successfully' })
  @ApiBody({ type: CreateLogArrayDto })
  async addLogs(@Body() dto: CreateLogArrayDto): Promise<LogEntity[]> {
    return this.logsService.saveLog(dto);
  }

  @Get('stats/requests')
  @ApiOperation({ summary: 'Get log statistics' })
  @ApiOkResponse({
    description: 'Returns aggregated statistics about logs',
    type: LogStatsResponseDto,
  })
  async getStats() {
    return this.logsService.getStats();
  }
}
