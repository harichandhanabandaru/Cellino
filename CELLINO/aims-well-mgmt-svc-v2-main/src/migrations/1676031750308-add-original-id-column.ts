import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddOriginalIdColumn1676031750308 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "scan_object",
      new TableColumn({
        name: "original_object_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "scan_object",
      new TableForeignKey({
        name: "fk_scan_object_original_object_id",
        columnNames: ["original_object_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "scan_object",
        onDelete: "SET NULL",
      })
    );

    await queryRunner.query(
      `ALTER TABLE scan_object ADD CONSTRAINT "UQ_original_object_id" UNIQUE (original_object_id)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE scan_object DROP CONSTRAINT "UQ_original_object_id"`
    );
    await queryRunner.dropForeignKey(
      "scan_object",
      "fk_scan_object_original_object_id"
    );
    await queryRunner.dropColumn("scan_object", "original_object_id");
  }
}
