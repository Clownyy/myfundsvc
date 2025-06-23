// src/dto/response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty({
    description: 'Response code',
    example: 200,
  })
  code: number;

  @ApiProperty({
    description: 'Response message',
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    description: 'Response time',
    example: new Date().toISOString(),
  })
  time: string;

  @ApiProperty({
    description: 'Response data',
  })
  data: any;
}
