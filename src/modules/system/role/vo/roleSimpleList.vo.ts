import { RoleEntity } from '~/modules/system/role/entities/role.entity';

export class RoleSimpleListVo {
  /** role id */
  value: RoleEntity['id'];
  /** role name */
  label: RoleEntity['name'];
}
