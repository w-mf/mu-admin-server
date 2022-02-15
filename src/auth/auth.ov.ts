import { ApiProperty } from '@nestjs/swagger';

export class LoginOv {
  @ApiProperty({ description: '用户认证token' })
  accessToken: string;
}
