import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class IpDto {
  @IsNotEmpty()
  @ApiProperty()
  ipAddress: string;
}
