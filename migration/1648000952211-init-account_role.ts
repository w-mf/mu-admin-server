import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class initAccountRole1648000952211 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'account_role',
        columns: [
          {
            name: 'account_id',
            type: 'int',
            isPrimary: true,
            unsigned: true,
          },
          {
            name: 'role_id',
            type: 'int',
            isPrimary: true,
            unsigned: true,
          },
        ],
      }),
    );
    await queryRunner.createIndices('account_role', [
      new TableIndex({
        name: 'IDX_ACCOUNT_ROLE_ACCOUNT_ID',
        columnNames: ['account_id'],
      }),
      new TableIndex({
        name: 'IDX_ACCOUNT_ROLE_ROLE_ID',
        columnNames: ['role_id'],
      }),
    ]);
    await queryRunner.createForeignKeys('account_role', [
      new TableForeignKey({
        name: 'FK_ACCOUNT_ROLE_ROLE_ID',
        columnNames: ['role_id'],
        referencedTableName: 'role',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
      new TableForeignKey({
        name: 'FK_ACCOUNT_ROLE_ACCOUNT_ID',
        columnNames: ['account_id'],
        referencedTableName: 'account',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
    await queryRunner.query('INSERT INTO `account_role`(`account_id`, `role_id`) VALUES (1, 1)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndices('account_role', [
      new TableIndex({
        name: 'IDX_ACCOUNT_ROLE_ACCOUNT_ID',
        columnNames: ['account_id'],
      }),
      new TableIndex({
        name: 'IDX_ACCOUNT_ROLE_ROLE_ID',
        columnNames: ['role_id'],
      }),
    ]);
    await queryRunner.dropForeignKeys('account_role', [
      new TableForeignKey({
        name: 'FK_ACCOUNT_ROLE_ROLE_ID',
        columnNames: ['role_id'],
        referencedTableName: 'role',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
      new TableForeignKey({
        name: 'FK_ACCOUNT_ROLE_ACCOUNT_ID',
        columnNames: ['account_id'],
        referencedTableName: 'account',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
    await queryRunner.dropTable('account_role');
  }
}
