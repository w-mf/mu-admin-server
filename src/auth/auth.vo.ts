import { ApiProperty } from '@nestjs/swagger';

export class LoginVo {
  @ApiProperty({ description: '用户认证token' })
  accessToken: string;
}
