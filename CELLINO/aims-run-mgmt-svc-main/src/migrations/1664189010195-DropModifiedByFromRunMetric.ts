import { MigrationInterface, QueryRunner } from "typeorm";

export class DropModifiedByFromRunMetric1664189010195 implements MigrationInterface {
    name = 'DropModifiedByFromRunMetric1664189010195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "run_metric" DROP COLUMN "modified_at"`);
        await queryRunner.query(`ALTER TABLE "run_metric" DROP COLUMN "modified_by"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "run_metric" ADD COLUMN "modified_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "run_metric" ADD COLUMN "modified_by" uuid`);
    }

}
