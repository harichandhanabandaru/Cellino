import { MigrationInterface, QueryRunner } from "typeorm";

export class AnalysisRequestStatusMigrationV11669104947722
  implements MigrationInterface
{
  name = "AnalysisRequestStatusMigrationV11669104947722";

  public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            UPDATE "image_analysis_request"
        SET "status_code" = 'fail' where "status_code" = 'FAILURE'
    `);
    await queryRunner.query(`
            UPDATE "image_analysis_request"
        SET "status_code" = 'success' where "status_code" = 'SUCCESS'
    `);
    await queryRunner.query(`
            UPDATE "image_analysis_request"
        SET "status_code" = 'in_progress' where "status_code" = 'INPROGRESS'
    `);
    await queryRunner.query(`
            UPDATE "image_analysis_request"
        SET "status_code" = 'in_queue' where "status_code" = 'INQUEUE'
    `);
        await queryRunner.query(`
    DELETE FROM "analysis_request_status" where CODE IN ('INQUEUE','INPROGRESS','SUCCESS','FAILURE')
    `);
    await queryRunner.query(`
    INSERT INTO "analysis_request_status" (id,code,label,description,created_by,created_at,modified_by,modified_at,is_active) 
    VALUES 
    (uuid_generate_v4(),'INQUEUE','In Queue','','00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,'00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,true),
    (uuid_generate_v4(),'INPROGRESS','In Progress','','00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,'00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,true),
    (uuid_generate_v4(),'SUCCESS','Success','','00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,'00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,true),
    (uuid_generate_v4(),'FAILURE','Failure','','00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,'00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,true)
    `);
    await queryRunner.query(`
        UPDATE "image_analysis_request"
        SET "status_code" = 'INQUEUE' where "status_code" = 'in_queue'
        `);
    await queryRunner.query(`
        UPDATE "image_analysis_request"
        SET "status_code" = 'INPROGRESS' where "status_code" = 'in_progress'
        `);
    await queryRunner.query(`
        UPDATE "image_analysis_request"
        SET "status_code" = 'SUCCESS' where "status_code" = 'success'
        `);
    await queryRunner.query(`
        UPDATE "image_analysis_request"
        SET "status_code" = 'FAILURE' where "status_code" = 'fail'
        `);
    await queryRunner.query(`
        ALTER TABLE "analysis_request_status" ALTER COLUMN created_by SET DEFAULT '00000000-0000-0000-0000-000000000000',
        ALTER COLUMN modified_by SET DEFAULT '00000000-0000-0000-0000-000000000000',
        ALTER COLUMN created_at SET DEFAULT current_timestamp,
        ALTER COLUMN modified_at SET DEFAULT current_timestamp,
        ALTER COLUMN is_active SET DEFAULT true;
        `);
        
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "analysis_request_status" ALTER COLUMN created_by DROP DEFAULT,
        ALTER COLUMN modified_by DROP DEFAULT,
        ALTER COLUMN created_at DROP DEFAULT,
        ALTER COLUMN modified_at DROP DEFAULT,
        ALTER COLUMN is_active DROP DEFAULT;
        `);
    await queryRunner.query(`
            UPDATE "image_analysis_request"
        SET "status_code" = 'fail' where "status_code" = 'FAILURE'
    `);
    await queryRunner.query(`
            UPDATE "image_analysis_request"
        SET "status_code" = 'success' where "status_code" = 'SUCCESS'
    `);
    await queryRunner.query(`
            UPDATE "image_analysis_request"
        SET "status_code" = 'in_progress' where "status_code" = 'INPROGRESS'
    `);
    await queryRunner.query(`
            UPDATE "image_analysis_request"
        SET "status_code" = 'in_queue' where "status_code" = 'INQUEUE'
    `);
    await queryRunner.query(`
            DELETE FROM "analysis_request_status" where code in ('INQUEUE','INPROGRESS','SUCCESS','FAILURE')
    `);
  }
}
