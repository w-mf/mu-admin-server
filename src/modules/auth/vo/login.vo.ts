import { ApiProperty } from '@nestjs/swagger';
import { AccountEntity } from '~/modules/system/account/entities/account.entity';

export class LoginVo {
  @ApiProperty({ description: '用户认证token' })
  accessToken: string;

  @ApiProperty({ description: '用户信息' })
  accountInfo: AccountEntity;
}
