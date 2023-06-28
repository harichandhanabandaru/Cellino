import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUniqueConstraint1675418279198 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE scan_object DROP CONSTRAINT "UQ_scan_object_name"`
    );
    await queryRunner.query(
      `ALTER TABLE scan_object ADD CONSTRAINT "UQ_scan_object_name_and_image_analysis_request_id" UNIQUE (name, image_analysis_request_id)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE scan_object DROP CONSTRAINT "UQ_scan_object_name_and_image_analysis_request_id"`
    );
    await queryRunner.query(
      `ALTER TABLE scan_object ADD CONSTRAINT "UQ_scan_object_name" UNIQUE (name)`
    );
  }
}
