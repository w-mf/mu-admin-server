import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class initRoleMenu1648021068261 implements MigrationInterface {
  tableName = 'role_menu';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'role_id',
            type: 'int',
            isPrimary: true,
            unsigned: true,
          },
          {
            name: 'menu_id',
            type: 'int',
            isPrimary: true,
            unsigned: true,
          },
        ],
      }),
    );
    await queryRunner.createIndices(this.tableName, [
      new TableIndex({
        name: 'IDX_ROLE_MENU_ROLE_ID',
        columnNames: ['role_id'],
      }),
      new TableIndex({
        name: 'IDX_ROLE_MENU_MENU_ID',
        columnNames: ['menu_id'],
      }),
    ]);
    await queryRunner.createForeignKeys(this.tableName, [
      new TableForeignKey({
        name: 'FK_ROLE_MENU_ROLE_ID',
        columnNames: ['role_id'],
        referencedTableName: 'role',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'FK_ROLE_MENU_MENU_ID',
        columnNames: ['menu_id'],
        referencedTableName: 'menu',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndices(this.tableName, [
      new TableIndex({
        name: 'IDX_ROLE_MENU_ROLE_ID',
        columnNames: ['roel_id'],
      }),
      new TableIndex({
        name: 'IDX_ROLE_MENU_MENU_ID',
        columnNames: ['menu_id'],
      }),
    ]);
    await queryRunner.dropForeignKeys(this.tableName, [
      new TableForeignKey({
        name: 'FK_ROLE_MENU_ROLE_ID',
        columnNames: ['role_id'],
        referencedTableName: 'role',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'FK_ROLE_MENU_MENU_ID',
        columnNames: ['menu_id'],
        referencedTableName: 'menu',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
    ]);
    await queryRunner.dropTable(this.tableName);
  }
}
