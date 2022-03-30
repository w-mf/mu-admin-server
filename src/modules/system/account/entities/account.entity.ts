import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '~/common/entity/base.entity';
import { RoleEntity } from '../../role/entities/role.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'account' })
export class AccountEntity extends BaseEntity {
  @ApiHideProperty()
  @ManyToMany(() => RoleEntity, (role) => role.accounts)
  @JoinTable({ name: 'account_role' })
  roles: RoleEntity[];

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

  /** 用户名,唯一 */
  @Column({
    name: 'user_name',
    type: 'varchar',
    length: '128',
    unique: true,
  })
  userName: string;

  /** 姓名 */
  @Column({
    name: 'name',
    type: 'varchar',
    length: '128',
    nullable: true,
  })
  name?: string;

  /** 昵称 */
  @Column({
    name: 'nickname',
    type: 'varchar',
    length: '128',
    nullable: true,
  })
  nickname?: string;

  /** 邮箱 */
  @Column({
    name: 'email',
    type: 'varchar',
    length: '256',
    nullable: true,
  })
  email?: string;

  /** 手机号 */
  @Column({
    name: 'mobile',
    type: 'varchar',
    length: '48',
    nullable: true,
  })
  mobile?: string;

  /** 备注 */
  @Column({
    name: 'remark',
    type: 'varchar',
    length: '256',
    nullable: true,
  })
  remark?: string;
  /** 状态。1:正常，0: 停用 */
  @ApiProperty({ enum: [1, 0], default: 1 })
  @Column({
    name: 'status',
    type: 'tinyint',
    width: 1,
    default: 1,
    unsigned: true,
    comment: '状态。1:正常，0: 停用',
  })
  status: 1 | 0;

  /** 密码 */
  @ApiHideProperty()
  @Column({
    name: 'password',
    type: 'varchar',
    length: '256',
    select: false,
    comment: '密码',
  })
  password: string;
}
