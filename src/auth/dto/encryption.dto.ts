import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class EncryptionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '需加密字符串' })
  readonly str: string;
}
