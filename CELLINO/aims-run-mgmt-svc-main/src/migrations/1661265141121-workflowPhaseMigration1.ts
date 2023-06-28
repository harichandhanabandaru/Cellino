import { MigrationInterface, QueryRunner } from "typeorm";

export class workflowPhaseMigration11661265141121 implements MigrationInterface {
    name = 'workflowPhaseMigration11661265141121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_phase" ALTER COLUMN "parent_phase_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_phase" ALTER COLUMN "parent_phase_id" SET NOT NULL`);
    }

}
