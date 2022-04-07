import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '账号' })
  readonly userName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '密码。需经过接口 auth/encryption 加密过的字符串' })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '图形验证码' })
  readonly verifyCode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '图形验证码的uuid' })
  readonly verifyCodeUuid: string;
}
