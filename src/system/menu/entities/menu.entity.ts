import { Entity, Column, ManyToMany, TreeParent, TreeChildren, Tree } from 'typeorm';
import { BaseEntity } from '~/common/entity/base.entity';
import { RoleEntity } from '~/system/role/entities/role.entity';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

@Entity({ name: 'menu' })
@Tree('closure-table')
export class MenuEntity extends BaseEntity {
  @ApiHideProperty()
  @ManyToMany(() => RoleEntity, (role) => role.menus)
  roles: RoleEntity[];

  @ApiHideProperty()
  @TreeParent()
  parent: MenuEntity;

  @ApiHideProperty()
  @TreeChildren()
  children: MenuEntity[];

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

  /** 父级id */
  @Column({ name: 'parent_id', type: 'int', nullable: true })
  parentId?: number;

  /** 类型。1:目录,2:菜单,3:按钮 */
  @Column({
    name: 'type',
    type: 'tinyint',
    width: 1,
    comment: '类型。1:菜单,2:按钮',
  })
  @ApiProperty({ enum: [1, 2] })
  type: 1 | 2;

  /** 名称 */
  @Column({
    name: 'name',
    type: 'varchar',
    length: '128',
  })
  name: string;

  /** 权限码 */
  @Column({
    name: 'access_code',
    type: 'varchar',
    length: '128',
    comment: '权限码',
  })
  accessCode: string;

  /** 是否显示。1:显示,0:不显示，默认1 */
  @Column({
    type: 'tinyint',
    width: 1,
    name: 'show',
    default: 1,
    comment: '是否显示。1:显示,0:不显示，默认1',
  })
  @ApiProperty({ default: 1, enum: [1, 0] })
  show: 1 | 0;

  /** 排序 */
  @Column({
    type: 'int',
    name: 'sort',
    unsigned: true,
    nullable: true,
    comment: '排序。最大值 9999',
  })
  sort?: number;
}
