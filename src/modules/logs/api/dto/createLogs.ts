import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLogDto {
  @ApiProperty({ example: '2025-04-07T12:34:56Z' })
  @IsString()
  timestamp: string;

  @ApiProperty({
    example: 'GET',
    enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  })
  @IsString()
  @IsIn(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'])
  method: string;

  @ApiProperty({ example: '/api/login' })
  @IsString()
  url: string;

  @ApiProperty({ example: 200 })
  @IsNumber()
  status: number;

  @ApiProperty({ example: 123 })
  @IsNumber()
  responseTime: number;
}

export class CreateLogArrayDto {
  @ApiProperty({
    type: CreateLogDto,
    isArray: true,
    description: 'Array of log entries',
    example: [
      {
        timestamp: '2025-04-07T12:34:56Z',
        method: 'GET',
        url: '/api/login',
        status: 200,
        responseTime: 123,
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateLogDto)
  logs: CreateLogDto[];
}
