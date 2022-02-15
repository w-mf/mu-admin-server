import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createAccount1643071864478 implements MigrationInterface {
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
            type: 'json',
            name: 'roleIds',
            isNullable: true,
            comment: '所属角色id',
          },
          {
            name: 'userName',
            type: 'varchar',
            length: '128',
            isUnique: true,
            comment: '用户名',
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
            width: 1,
            default: 1,
            unsigned: true,
            comment: '状态。1:正常，0: 停用',
          },
          {
            name: 'password',
            type: 'varchar',
            length: '256',
            isNullable: true,
            comment: '密码',
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
    queryRunner.dropTable('account');
  }
}
