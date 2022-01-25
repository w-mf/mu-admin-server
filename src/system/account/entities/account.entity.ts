import { Entity, Column } from 'typeorm';
import { Base } from '~/common/entity/base.entity';

@Entity()
export class Account extends Base {
  @Column({
    type: 'json',
    name: 'roleIds',
    comment: '所属角色id',
  })
  roleIds: string;
  @Column({
    name: 'userName',
    type: 'varchar',
    length: '128',
    unique: true,
    comment: '用户名',
  })
  userName: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: '128',
    nullable: true,
    comment: '姓名',
  })
  name?: string;

  @Column({
    name: 'nickname',
    type: 'varchar',
    length: '128',
    nullable: true,
    comment: '昵称',
  })
  nickname?: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: '256',
    nullable: true,
    comment: '邮箱',
  })
  email?: string;

  @Column({
    name: 'mobile',
    type: 'varchar',
    length: '48',
    nullable: true,
    comment: '手机号',
  })
  mobile?: string;

  @Column({
    name: 'remark',
    type: 'varchar',
    length: '256',
    nullable: true,
    comment: '备注',
  })
  remark?: string;

  @Column({
    name: 'status',
    type: 'tinyint',
    width: 1,
    default: 1,
    unsigned: true,
    comment: '状态。1:正常，0: 停用',
  })
  status: 1 | 0;

  @Column({
    name: 'password',
    type: 'varchar',
    length: '256',
    nullable: true,
    comment: '密码',
  })
  password?: string;
}
