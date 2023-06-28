import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertAnalysisRequestStatusMigration1669104947722
  implements MigrationInterface
{
  name = "InsertAnalysisRequestStatusMigration1669104947722";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO "analysis_request_status" (id,code,label,description,created_by,created_at,modified_by,modified_at,is_active) 
    VALUES 
    (uuid_generate_v4(),'in_queue','In Queue','','00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,'00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,true),
    (uuid_generate_v4(),'in_progress','In Progress','','00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,'00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,true),
    (uuid_generate_v4(),'success','Success','','00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,'00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,true),
    (uuid_generate_v4(),'fail','Fail','','00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,'00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,true)
    `);
    await queryRunner.query(`
        UPDATE "image_analysis_request"
        SET "status_code" = 'in_queue' where status=0
        `);
    await queryRunner.query(`
        UPDATE "image_analysis_request"
        SET "status_code" = 'in_progress' where status=1
        `);
    await queryRunner.query(`
        UPDATE "image_analysis_request"
        SET "status_code" = 'success' where status=2
        `);
    await queryRunner.query(`
        UPDATE "image_analysis_request"
        SET "status_code" = 'fail' where status=3
        `);
    await queryRunner.query(`
            ALTER TABLE "image_analysis_request" DROP COLUMN "status"
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "image_analysis_request" ADD "status" integer
        `);
    await queryRunner.query(`
            UPDATE TABLE "image_analysis_request"
            SET "status_code" = '' where status=3
    `);
    await queryRunner.query(`
            UPDATE TABLE "image_analysis_request"
            SET "status_code" = '' where status=2
    `);
    await queryRunner.query(`
            UPDATE TABLE "image_analysis_request"
            SET "status_code" = '' where status=1
    `);
    await queryRunner.query(`
            UPDATE TABLE "image_analysis_request"
            SET "status_code" = '' where status=0
    `);
    await queryRunner.query(`
            DELETE FROM "image_analysis_request"
    `);
  }
}
