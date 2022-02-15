import { MigrationInterface, QueryRunner, TableIndex, Table } from 'typeorm';

export class createMenu1642820345984 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
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
            name: 'parent_id',
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
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
    await queryRunner.createIndex(
      'menu',
      new TableIndex({
        name: 'IDX_MENU_PARENT',
        columnNames: ['parent_id'],
      }),
    );
    await queryRunner.query(
      "INSERT INTO `menu` VALUES(1, 2, '首页', NULL, '/home', NULL, 1, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL)",
    );
    await queryRunner.query(
      "INSERT INTO `menu` VALUES(2, 1, '系统管理', NULL, '/system', NULL, 1, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL)",
    );
    await queryRunner.query(
      "INSERT INTO `menu` VALUES(3, 2, '用户管理', NULL, '/system/account', NULL, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL)",
    );
    await queryRunner.query(
      "INSERT INTO `menu` VALUES(4, 2, '角色管理', NULL, '/system/role', NULL, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL)",
    );
    await queryRunner.query(
      "INSERT INTO `menu` VALUES(5, 2, '菜单管理', NULL, '/system/menu', NULL, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL)",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(
      'menu',
      new TableIndex({
        name: 'IDX_MENU_PARENT',
        columnNames: ['parent_id'],
      }),
    );
    await queryRunner.dropTable('menu');
  }
}
