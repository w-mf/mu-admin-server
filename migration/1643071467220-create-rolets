import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createRole1643071467220 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
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
            comment: '名称',
            isUnique: true,
          },
          {
            name: 'menuIds',
            type: 'json',
            comment: '菜单权限',
            isNullable: true,
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
            width: 1,
            default: 1,
            unsigned: true,
            comment: '状态。1:正常，0: 停用',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('role');
  }
}
