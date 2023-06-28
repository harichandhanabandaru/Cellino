import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAuditFeildsToTimeseries1670492289223
  implements MigrationInterface
{
  name = "AddAuditFeildsToTimeseries1670492289223";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "image_timeseries" ADD COLUMN created_by uuid ,
        ADD COLUMN created_at timestamp with time zone ,
        ADD COLUMN modified_by uuid,
        ADD COLUMN modified_at timestamp with time zone`);

    await queryRunner.query(`update image_timeseries set created_by = image_analysis_request.created_by,
        created_at = image_analysis_request.created_at,
        modified_by = image_analysis_request.modified_by,
        modified_at = image_analysis_request.modified_at
        from image_analysis_request where image_analysis_request.id = image_timeseries.image_analysis_request_id `);

    await queryRunner.query(`ALTER TABLE "image_timeseries" ALTER COLUMN created_by set NOT NULL ,
        ALTER COLUMN created_at set NOT NULL ,
        ALTER COLUMN modified_by set NOT NULL,
        ALTER COLUMN modified_at set NOT NULL`);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE image_timeseries drop column created_by, drop column created_at,drop column modified_by,drop column modified_at`
    );
  }
}
