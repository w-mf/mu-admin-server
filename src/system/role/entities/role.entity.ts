import { Entity, Column } from 'typeorm';
import { Base } from '~/common/entity/base.entity';
@Entity()
export class Role extends Base {
  @Column({
    name: 'name',
    type: 'varchar',
    length: '128',
    comment: '名称',
    unique: true,
  })
  name: string;

  @Column({
    name: 'menuIds',
    type: 'json',
    comment: '菜单权限',
    default: '[]',
  })
  menuIds: string;

  @Column({
    name: 'remark',
    type: 'varchar',
    length: '256',
    nullable: true,
    comment: '备注',
  })
  remark: string;

  @Column({
    name: 'status',
    type: 'tinyint',
    width: 1,
    default: 1,
    comment: '状态。1:正常，0: 停用',
  })
  status: 1 | 0;
}
