import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetPasswordAccountDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  @ApiProperty({ description: '用户旧密码。需经加密' })
  readonly oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  @ApiProperty({ description: '用户新密码。需经加密' })
  readonly newPassword: string;
}
