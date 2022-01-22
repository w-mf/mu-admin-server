import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createMenu1642820345984 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'menu',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            generatedType: 'STORED',
            generationStrategy: 'increment',
            unsigned: true,
            isPrimary: true,
          },
          {
            name: 'type',
            type: 'tinyint',
            width: 1,
            comment: '类型。1:目录,2:菜单,3:按钮',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '128',
            comment: '名称',
          },
          {
            name: 'parentId',
            type: 'int',
            isNullable: true,
            comment: '父级节点',
          },
          {
            name: 'route',
            type: 'varchar',
            length: '256',
            isNullable: true,
            comment: '前端路由',
          },
          {
            name: 'icon',
            type: 'varchar',
            length: '128',
            isNullable: true,
            comment: '图标',
          },
          {
            name: 'show',
            type: 'tinyint',
            width: 1,
            default: 1,
            comment: '是否显示。1:显示,0:不显示，默认1',
          },
          {
            name: 'sort',
            type: 'tinyint',
            width: 4,
            unsigned: true,
            isNullable: true,
            comment: '排序。最大值 9999',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('menu');
  }
}
