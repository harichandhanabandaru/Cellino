import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAnalysisRequestStatusMigration1669104947722
  implements MigrationInterface
{
  name = "CreateAnalysisRequestStatusMigration1669104947722";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "analysis_request_status" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "code" character varying NOT NULL,
                "label" character varying NOT NULL,
                "description" character varying,
                "created_by" uuid NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "modified_by" uuid NOT NULL,
                "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "is_active" boolean NOT NULL,
                CONSTRAINT "UQ_466bc570152a64b51ae119c5d31" UNIQUE ("code"),
                CONSTRAINT "PK_07baad041c9bf7c12d18dbdce84" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "image_analysis_request"
            ADD "status_code" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "image_analysis_request" ALTER COLUMN "name" SET NOT NULL,
            ALTER COLUMN "is_developer_mode" SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "image_analysis_request"
            ADD CONSTRAINT "FK_76a0f5670d9d0aa50c241a50a73" FOREIGN KEY ("status_code") REFERENCES "analysis_request_status"("code") ON DELETE NO ACTION ON UPDATE NO ACTION
        `); 
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "image_analysis_request" DROP CONSTRAINT "FK_76a0f5670d9d0aa50c241a50a73"
        `);
    await queryRunner.query(`
            ALTER TABLE "image_analysis_request"
            ALTER COLUMN "is_developer_mode" DROP NOT NULL,
            ALTER COLUMN "name" DROP NOT NULL,
        `);
    await queryRunner.query(`
            ALTER TABLE "image_analysis_request" DROP COLUMN "status_code"
        `);
    await queryRunner.query(`
            DROP TABLE "analysis_request_status"
        `);
  }
}
