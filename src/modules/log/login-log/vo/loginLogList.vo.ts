import { ApiProperty } from '@nestjs/swagger';
import { LoginLogVo } from './loginLog.vo';
import { PagingListBaseVo } from '~/common/vo/list.vo';

export class LoginLogListVo extends PagingListBaseVo {
  /** 列表数据。 */
  @ApiProperty({ type: [LoginLogVo] })
  readonly list: LoginLogVo[];
}
