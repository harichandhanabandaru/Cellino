import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterImageSettingNameLength1673006246535
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE image_setting ALTER COLUMN name TYPE varchar(100) `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE image_setting ALTER COLUMN name TYPE varchar(50)"
    );
  }
}
