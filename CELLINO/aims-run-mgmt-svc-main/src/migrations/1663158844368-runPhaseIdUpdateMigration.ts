import { MigrationInterface, QueryRunner } from "typeorm";

export class runPhaseIdUpdateMigration1663158844368 implements MigrationInterface {
    name = 'runPhaseIdUpdateMigration1663158844368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "run" RENAME COLUMN "phaseId" TO "phase_id"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "run" RENAME COLUMN "phase_id" TO "phaseId"
        `);
    }

}
