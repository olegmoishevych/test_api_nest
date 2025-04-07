import { ApiProperty } from '@nestjs/swagger';

export class LogStatsResponseDto {
  @ApiProperty({ example: 8, description: 'Total number of log entries' })
  total_requests: number;

  @ApiProperty({
    example: { GET: 5, POST: 3 },
    description: 'Number of requests per HTTP method',
  })
  method_counts: Record<string, number>;

  @ApiProperty({
    example: { '200': 6, '404': 2 },
    description: 'Number of requests per HTTP status code',
  })
  status_counts: Record<string, number>;

  @ApiProperty({
    example: {
      '/api/login': 243.5,
      '/api/status': 123.0,
    },
    description: 'Average response time per URL',
  })
  average_response_times: Record<string, number>;
}
