import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class initMenu1648015553870 implements MigrationInterface {
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
            name: 'parent_id',
            type: 'int',
            unsigned: true,
            isNullable: true,
            comment: '父级id',
          },
          {
            name: 'type',
            type: 'tinyint',
            default: 1,
            unsigned: true,
            comment: '类型。1:菜单,2:按钮',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '128',
            comment: '名称',
          },
          {
            name: 'access_code',
            type: 'varchar',
            length: '128',
            comment: '权限码',
          },
          {
            name: 'show',
            type: 'tinyint',
            default: 1,
            unsigned: true,
            comment: '是否显示。1:显示,0:不显示',
          },
          {
            name: 'sort',
            type: 'int',
            unsigned: true,
            isNullable: true,
            comment: '排序。最大值 9999',
          },
          {
            name: 'sys_internal',
            type: 'tinyint',
            default: 0,
            unsigned: true,
            comment: '是否系统内置。1:是，0: 否',
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
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
    await queryRunner.createIndices('menu', [
      new TableIndex({
        name: 'IDX_MENU_PARENT_ID',
        columnNames: ['parent_id'],
      }),
    ]);
    await queryRunner.createForeignKeys('menu', [
      new TableForeignKey({
        name: 'FK_MENU_PARENT_ID',
        columnNames: ['parent_id'],
        referencedTableName: 'menu',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
    ]);
    const insert =
      'INSERT INTO `menu`(`id`, `created_at`, `updated_at`, `deleted_at`, `sys_internal`, `parent_id`, `type`, `name`, `access_code`, `show`,`sort`)';
    await queryRunner.query(insert + " VALUES (1, DEFAULT, DEFAULT, DEFAULT, 1,DEFAULT , 1, '系统管理', 'sys', 1, 1)");

    // 用户管理
    await queryRunner.query(
      insert + " VALUES (2, DEFAULT, DEFAULT, DEFAULT, 1, 1, 1, '用户管理', 'sys:account:list', 1, 1)",
    );
    await queryRunner.query(
      insert + " VALUES (3, DEFAULT, DEFAULT, DEFAULT, 1, 2, 2, '新增', 'sys:account:add', 1, 1)",
    );
    await queryRunner.query(
      insert + " VALUES (4, DEFAULT, DEFAULT, DEFAULT, 1, 2, 2, '修改', 'sys:account:edit', 1, 2)",
    );
    await queryRunner.query(
      insert + " VALUES (5, DEFAULT, DEFAULT, DEFAULT, 1, 2, 2, '删除', 'sys:account:remove', 1, 3)",
    );
    await queryRunner.query(
      insert + " VALUES (6, DEFAULT, DEFAULT, DEFAULT, 1, 2, 2, '查看', 'sys:account:view', 1, 4)",
    );
    await queryRunner.query(
      insert + " VALUES (7, DEFAULT, DEFAULT, DEFAULT, 1, 2, 2, '重置密码', 'sys:account:resetPassword', 1, 5)",
    );

    // 角色管理
    await queryRunner.query(
      insert + " VALUES (8, DEFAULT, DEFAULT, DEFAULT, 1, 1, 1, '角色管理', 'sys:role:list', 1, 2)",
    );
    await queryRunner.query(insert + " VALUES (9, DEFAULT, DEFAULT, DEFAULT, 1, 8, 2, '新增', 'sys:role:add', 1, 1)");
    await queryRunner.query(insert + " VALUES (10, DEFAULT, DEFAULT, DEFAULT, 1, 8, 2, '修改', 'sys:role:edit', 1, 2)");
    await queryRunner.query(
      insert + " VALUES (11, DEFAULT, DEFAULT, DEFAULT, 1, 8, 2, '删除', 'sys:role:remove', 1, 3)",
    );
    await queryRunner.query(insert + " VALUES (12, DEFAULT, DEFAULT, DEFAULT, 1, 8, 2, '查看', 'sys:role:view', 1, 4)");

    // 菜单管理
    await queryRunner.query(
      insert + " VALUES (13, DEFAULT, DEFAULT, DEFAULT, 1, 1, 1, '菜单管理', 'sys:menu:list', 1, 3)",
    );
    await queryRunner.query(insert + " VALUES (14, DEFAULT, DEFAULT, DEFAULT, 1, 13, 2, '新增', 'sys:menu:add', 1, 1)");
    await queryRunner.query(
      insert + " VALUES (15, DEFAULT, DEFAULT, DEFAULT, 1, 13, 2, '修改', 'sys:menu:edit', 1, 2)",
    );
    await queryRunner.query(
      insert + " VALUES (16, DEFAULT, DEFAULT, DEFAULT, 1, 13, 2, '删除', 'sys:menu:remove', 1, 3)",
    );
    await queryRunner.query(
      insert + " VALUES (17, DEFAULT, DEFAULT, DEFAULT, 1, 13, 2, '查看', 'sys:menu:view', 1, 4)",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndices('menu', [
      new TableIndex({
        name: 'IDX_MENU_PARENT_ID',
        columnNames: ['parent_id'],
      }),
    ]);
    await queryRunner.dropForeignKeys('menu', [
      new TableForeignKey({
        name: 'FK_MENU_PARENT_ID',
        columnNames: ['parent_id'],
        referencedTableName: 'menu',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
    ]);

    await queryRunner.dropTable('menu');
  }
}
