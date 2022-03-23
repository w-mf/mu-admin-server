import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class initAccount1647999122137 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'account',
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
            isUnique: true,
            comment: '账户',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '128',
            isNullable: true,
            comment: '姓名',
          },
          {
            name: 'nickname',
            type: 'varchar',
            length: '128',
            isNullable: true,
            comment: '昵称',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '256',
            isNullable: true,
            comment: '邮箱',
          },
          {
            name: 'mobile',
            type: 'varchar',
            length: '48',
            isNullable: true,
            comment: '手机号',
          },
          {
            name: 'remark',
            type: 'varchar',
            length: '256',
            isNullable: true,
            comment: '备注',
          },
          {
            name: 'status',
            type: 'tinyint',
            default: 1,
            unsigned: true,
            comment: '状态。1:正常，0: 停用',
          },
          {
            name: 'sys_internal',
            type: 'tinyint',
            default: 0,
            unsigned: true,
            comment: '是否系统内置。1:是，0: 否',
          },
          {
            name: 'password',
            type: 'varchar',
            length: '256',
            isNullable: true,
            comment: '密码',
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
    await queryRunner.query(
      "INSERT INTO `account`(`id`, `created_at`, `updated_at`, `deleted_at`, `sys_internal`, `user_name`, `name`, `nickname`, `email`, `mobile`, `remark`, `status`, `password`) VALUES (1, DEFAULT, DEFAULT, DEFAULT, 1, 'admin', '超级管理员', DEFAULT, DEFAULT, DEFAULT, '拥有最高权限的账号', 1, 'MNHRnHLADtf5JK4Juqm4Ww==')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('account');
  }
}
