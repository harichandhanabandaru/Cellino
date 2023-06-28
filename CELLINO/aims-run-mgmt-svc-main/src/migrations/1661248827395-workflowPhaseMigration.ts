import { MigrationInterface, QueryRunner } from "typeorm";

export class workflowPhaseMigration1661248827395 implements MigrationInterface {
    name = 'workflowPhaseMigration1661248827395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_phase" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "workflow_phase" ADD "parent_phase_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_phase" ADD CONSTRAINT "FK_30f26d80ea4dff191817356eeac" FOREIGN KEY ("parent_phase_id") REFERENCES "phase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_phase" DROP CONSTRAINT "FK_30f26d80ea4dff191817356eeac"`);
        await queryRunner.query(`ALTER TABLE "workflow_phase" DROP COLUMN "parent_phase_id"`);
        await queryRunner.query(`ALTER TABLE "workflow_phase" ADD COLUMN "order" character varying NOT NULL`);
    }

}
