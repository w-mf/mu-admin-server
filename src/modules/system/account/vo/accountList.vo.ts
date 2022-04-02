import { ApiProperty } from '@nestjs/swagger';
import { AccountVo } from './account.vo';
import { PagingListBaseVo } from '~/common/vo/list.vo';

export class AccountListVo extends PagingListBaseVo {
  /** 列表数据。 */
  @ApiProperty({ type: [AccountVo] })
  readonly list: AccountVo[];
}
