import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '~/common/entity/base.entity';
import { AccountEntity } from '../../account/entities/account.entity';
import { MenuEntity } from '../../menu/entities/menu.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'role' })
export class RoleEntity extends BaseEntity {
  @ApiHideProperty()
  @ManyToMany(() => AccountEntity, (account) => account.roles)
  accounts: AccountEntity[];

  @ApiHideProperty()
  @ManyToMany(() => MenuEntity, (menu) => menu.roles)
  @JoinTable({ name: 'role_menu' })
  menus: MenuEntity[];

  @ApiHideProperty()
  @Column({
    name: 'sys_internal',
    type: 'tinyint',
    width: 1,
    default: 0,
    select: false,
    readonly: true,
    comment: '是否系统内置。1:是，0: 否',
  })
  sysInternal: 1 | 0;

  /** 角色名称 */
  @Column({
    name: 'name',
    type: 'varchar',
    length: '128',
    unique: true,
  })
  name: string;

  /** 备注 */
  @Column({
    name: 'remark',
    type: 'varchar',
    length: '256',
    nullable: true,
    comment: '备注',
  })
  remark?: string;

  /** 状态。1:正常，0: 停用 */
  @Column({
    name: 'status',
    type: 'tinyint',
    width: 1,
    default: 1,
    comment: '状态。1:正常，0: 停用',
  })
  @ApiProperty({ enum: [1, 0], default: 1 })
  status: 1 | 0;

  /** 菜单权限id */
  @Column({
    name: 'menu_ids',
    type: 'varchar',
    nullable: true,
    comment: ' 菜单权限id。多个用,分隔',
  })
  menuIds?: string;
}
