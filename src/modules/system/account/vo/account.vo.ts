import { AccountEntity } from '~/modules/system/account/entities/account.entity';
import { RoleEntity } from '~/modules/system/role/entities/role.entity';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';

export class AccountVo extends OmitType(AccountEntity, ['roles'] as const) {
  /** 角色集合 */
  @ApiProperty({ description: '角色集合', type: [PickType(RoleEntity, ['name', 'id'] as const)] })
  readonly roleList: Array<{ name: RoleEntity['name']; id: RoleEntity['id'] }>;
}
