import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexesToScanObjectTable1675760386066
  implements MigrationInterface
{
  name = "AddIndexesToScanObjectTable1675760386066";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX "index_scan_object.image_event_id"
        ON scan_object (image_event_id)`);
    await queryRunner.query(`CREATE INDEX "index_scan_object.image_analysis_request_id"
        ON scan_object (image_analysis_request_id)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "index_scan_object.image_event_id"`
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "index_scan_object.image_analysis_request_id"`
    );
  }
}
