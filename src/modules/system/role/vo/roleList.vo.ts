import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from '../entities/role.entity';
import { PagingListBaseVo } from '~/common/vo/list.vo';

export class RoleListVo extends PagingListBaseVo {
  /** 列表数据。 */
  @ApiProperty({ type: [RoleEntity] })
  readonly list: RoleEntity[];
}
