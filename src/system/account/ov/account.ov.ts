import { AccountEntity } from '~/system/account/entities/account.entity';
import { RoleEntity } from '~/system/role/entities/role.entity';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';

export class AccountOv extends OmitType(AccountEntity, ['roles'] as const) {
  /** 角色集合 */
  @ApiProperty({ description: '角色集合', type: [PickType(RoleEntity, ['name', 'id'] as const)] })
  readonly roleList: Array<{ name: RoleEntity['name']; id: RoleEntity['id'] }>;
}