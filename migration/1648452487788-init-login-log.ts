import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class initLoginLog1648452487788 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'login-log',
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
            name: 'user_name',
            type: 'varchar',
            length: '128',
            comment: '登录账号',
          },
          {
            name: 'ip',
            type: 'varchar',
            isNullable: true,
            comment: '登陆ip',
          },
          {
            name: 'equipment',
            type: 'varchar',
            isNullable: true,
            comment: '登录设备',
          },
          {
            name: 'status',
            type: 'tinyint',
            default: 1,
            unsigned: true,
            comment: '状态。1:成功，0: 失败',
          },

          {
            name: 'info',
            type: 'varchar',
            isNullable: true,
            comment: '登录信息',
          },
          {
            name: 'user_agent',
            type: 'varchar',
            isNullable: true,
            comment: 'user_agent',
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
    const insert =
      'INSERT INTO `menu`(`id`, `created_at`, `updated_at`, `deleted_at`, `sys_internal`, `parent_id`, `type`, `name`, `access_code`, `show`,`sort`)';
    //日志管理
    await queryRunner.query(insert + " VALUES (18, DEFAULT, DEFAULT, DEFAULT, 1,DEFAULT , 1, '日志管理', 'log', 1, 2)");
    // 登录日志
    await queryRunner.query(
      insert + " VALUES (19, DEFAULT, DEFAULT, DEFAULT, 1, 1, 1, '登录日志', 'log:loginLog:list', 1, 1)",
    );
    await queryRunner.query(
      insert + " VALUES (20, DEFAULT, DEFAULT, DEFAULT, 1, 2, 2, '查看', 'sys:account:view', 1, 1)",
    );
    for (let i = 18; i <= 20; i++) {
      await queryRunner.query('INSERT INTO `menu_closure`(`id_ancestor`, `id_descendant`) VALUES (1, ' + i + ')');
      await queryRunner.query('INSERT INTO `menu_closure`(`id_ancestor`, `id_descendant`) VALUES (18, ' + i + ')');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('login-log');
  }
}
