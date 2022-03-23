import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class initRole1648000952210 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'role',
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
            name: 'name',
            type: 'varchar',
            length: '128',
            isUnique: true,
            comment: '角色名称',
          },
          {
            name: 'menu_ids',
            type: 'varchar',
            isNullable: true,
            comment: '菜单权限id。多个用,分隔',
          },
          {
            name: 'status',
            type: 'tinyint',
            default: 1,
            unsigned: true,
            comment: '状态。1:正常，0: 停用',
          },
          {
            name: 'remark',
            type: 'varchar',
            length: '256',
            isNullable: true,
            comment: '备注',
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
    await queryRunner.query(
      "INSERT INTO `role`(`id`, `created_at`, `updated_at`, `deleted_at`, `sys_internal`, `name`, `menu_ids`, `status`, `remark`) VALUES (1, DEFAULT, DEFAULT, DEFAULT, 1, '超级管理员', DEFAULT, 1, '拥有最高权限的角色')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('role');
  }
}
