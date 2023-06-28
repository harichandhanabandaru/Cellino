import { MigrationInterface, QueryRunner } from "typeorm";

export class MakePlateNameAndBarcodeUnique1670652774249
  implements MigrationInterface
{
  name = "MakePlateNameAndBarcodeUnique1670652774249";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE plate
        ADD CONSTRAINT plate_name_unique UNIQUE (name),
        ADD CONSTRAINT plate_barcode_unique UNIQUE (barcode)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE plate
        DROP CONSTRAINT plate_name_unique UNIQUE (name),
        DROP CONSTRAINT plate_barcode_unique UNIQUE (barcode)`);
  }
}
