import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordAccountDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  @ApiProperty({ description: '用户新密码。需经加密' })
  readonly password?: string;
}
