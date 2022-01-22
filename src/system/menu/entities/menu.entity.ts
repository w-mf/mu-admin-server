import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { MENU_TYPE } from '../constant';
@Entity()
export class Menu {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'type',
    type: 'tinyint',
    width: 1,
    comment: '类型。1:目录,2:菜单,3:按钮',
  })
  type: MENU_TYPE;

  @Column({
    name: 'name',
    type: 'varchar',
    length: '128',
    comment: '名称',
  })
  name: string;

  @Column({
    type: 'int',
    name: 'parentId',
    nullable: true,
    comment: '父级节点',
  })
  parentId: number;

  @Column({
    type: 'varchar',
    length: '256',
    name: 'route',
    nullable: true,
    comment: '前端路由',
  })
  route: string;

  @Column({
    type: 'varchar',
    length: '128',
    name: 'icon',
    nullable: true,
    comment: '图标',
  })
  icon: string;

  @Column({
    type: 'tinyint',
    width: 1,
    name: 'show',
    default: 1,
    comment: '是否显示。1:显示,0:不显示，默认1',
  })
  show: 1 | 0;

  @Column({
    type: 'tinyint',
    width: 4,
    name: 'sort',
    unsigned: true,
    comment: '排序。最大值 9999',
  })
  sort: number;
}
