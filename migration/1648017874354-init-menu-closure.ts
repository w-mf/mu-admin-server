import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class initMenuClosure1648017874354 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'menu_closure',
        columns: [
          {
            name: 'id_ancestor',
            type: 'int',
            isPrimary: true,
            unsigned: true,
          },
          {
            name: 'id_descendant',
            type: 'int',
            isPrimary: true,
            unsigned: true,
          },
        ],
      }),
    );
    await queryRunner.createIndices('menu_closure', [
      new TableIndex({
        name: 'IDX_ID_ANCESTOR',
        columnNames: ['id_ancestor'],
      }),
      new TableIndex({
        name: 'IDX_ID_DESCENDANT',
        columnNames: ['id_descendant'],
      }),
    ]);
    await queryRunner.createForeignKeys('menu_closure', [
      new TableForeignKey({
        name: 'FK_ID_ANCESTOR',
        columnNames: ['id_ancestor'],
        referencedTableName: 'menu',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
      }),
      new TableForeignKey({
        name: 'FK_ID_DESCENDANT',
        columnNames: ['id_descendant'],
        referencedTableName: 'menu',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
      }),
    ]);
    for (let i = 1; i <= 17; i++) {
      await queryRunner.query('INSERT INTO `menu_closure`(`id_ancestor`, `id_descendant`) VALUES (1, ' + i + ')');
    }
    for (let i = 2; i <= 7; i++) {
      await queryRunner.query('INSERT INTO `menu_closure`(`id_ancestor`, `id_descendant`) VALUES (2, ' + i + ')');
    }
    for (let i = 8; i <= 12; i++) {
      await queryRunner.query('INSERT INTO `menu_closure`(`id_ancestor`, `id_descendant`) VALUES (8, ' + i + ')');
    }
    for (let i = 13; i <= 17; i++) {
      await queryRunner.query('INSERT INTO `menu_closure`(`id_ancestor`, `id_descendant`) VALUES (13, ' + i + ')');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndices('menu_closure', [
      new TableIndex({
        name: 'IDX_ID_ANCESTOR',
        columnNames: ['id_ancestor'],
      }),
      new TableIndex({
        name: 'IDX_ID_DESCENDANT',
        columnNames: ['id_descendant'],
      }),
    ]);
    await queryRunner.dropForeignKeys('menu_closure', [
      new TableForeignKey({
        name: 'FK_ID_ANCESTOR',
        columnNames: ['id_ancestor'],
        referencedTableName: 'menu',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
      }),
      new TableForeignKey({
        name: 'FK_ID_DESCENDANT',
        columnNames: ['id_descendant'],
        referencedTableName: 'menu',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
      }),
    ]);
    await queryRunner.dropTable('menu_closure');
  }
}
