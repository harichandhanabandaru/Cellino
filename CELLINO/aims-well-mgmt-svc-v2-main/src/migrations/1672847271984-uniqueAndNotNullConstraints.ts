import { MigrationInterface, QueryRunner } from "typeorm";

export class uniqueAndNotNullConstraints1672847271984 implements MigrationInterface {
    name = 'uniqueAndNotNullConstraints1672847271984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "colony_artifact"
            ALTER COLUMN "well_id" SET NOT NULL,
            ALTER COLUMN "is_active" SET NOT NULL,
            ALTER COLUMN "is_selected" SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "cluster_artifact"
            ALTER COLUMN "image_event_id" SET NOT NULL,
            ALTER COLUMN "outline" SET NOT NULL,
            ALTER COLUMN "is_active" SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "well"
            ADD CONSTRAINT "UQ_dd1b4e134f1e867406faaa4c226" UNIQUE ("name")
        `);
        await queryRunner.query(`
            ALTER TABLE "well"
            ALTER COLUMN "name" SET NOT NULL,
            ALTER COLUMN "plate_id" SET NOT NULL,
            ALTER COLUMN "position" SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "image_event"
            ALTER COLUMN "name" SET NOT NULL,
            ALTER COLUMN "started_at" SET NOT NULL
        `);
        await queryRunner.query(`
            UPDATE "image_analysis_request" SET started_at = created_at where started_at is null
        `);
        await queryRunner.query(`
            ALTER TABLE "image_analysis_request"
            ALTER COLUMN "name" SET NOT NULL,
            ALTER COLUMN "started_at" SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "inference_artifact"
            ALTER COLUMN "name" SET NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "inference_artifact"
            ALTER COLUMN "name" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "image_analysis_request"
            ALTER COLUMN "name" DROP NOT NULL,
            ALTER COLUMN "started_at" DROP NOT NULL
        `);
        await queryRunner.query(`
            UPDATE "image_analysis_request" SET started_at = null 
        `);
        await queryRunner.query(`
            ALTER TABLE "image_event"
            ALTER COLUMN "name" DROP NOT NULL,
            ALTER COLUMN "started_at" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "well"
            ALTER COLUMN "name" DROP NOT NULL,
            ALTER COLUMN "plate_id" DROP NOT NULL,
            ALTER COLUMN "position" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "well"
            DROP CONSTRAINT "UQ_dd1b4e134f1e867406faaa4c226"
        `);
        await queryRunner.query(`
            ALTER TABLE "cluster_artifact"
            ALTER COLUMN "image_event_id" DROP NOT NULL,
            ALTER COLUMN "outline" DROP NOT NULL,
            ALTER COLUMN "is_active" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "colony_artifact"
            ALTER COLUMN "well_id" DROP NOT NULL,
            ALTER COLUMN "is_active" DROP NOT NULL,
            ALTER COLUMN "is_selected" DROP NOT NULL
        `);
    }

}
