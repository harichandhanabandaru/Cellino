import { MigrationInterface, QueryRunner } from "typeorm";

export class ProtocolDefinition1660801925368 implements MigrationInterface {
    name = 'ProtocolDefinition1660801925368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_phase" RENAME COLUMN "workflowId" TO "workflow_id"`);
        await queryRunner.query(`ALTER TABLE "workflow_phase" RENAME COLUMN "phaseId" TO "phase_id"`);
        await queryRunner.query(`ALTER TABLE "workflow_phase" DROP CONSTRAINT "PK_790f1cac553d711abddd472d87e"`);
        await queryRunner.query(`ALTER TABLE "workflow_phase" ADD CONSTRAINT "PK_98ab8bf987d53cb864e475e097a" PRIMARY KEY ("workflow_id", "phase_id")`);
        await queryRunner.query(`ALTER TABLE "protocol_definition" DROP COLUMN "protocol_definition_id"`);
        await queryRunner.query(`ALTER TABLE "protocol_definition" ADD "protocol_type" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "protocol_definition" DROP COLUMN "protocol_type"`);
        await queryRunner.query(`ALTER TABLE "protocol_definition" ADD "protocol_definition_id" uuid`);
        await queryRunner.query(`ALTER TABLE "workflow_phase" DROP CONSTRAINT "PK_98ab8bf987d53cb864e475e097a"`);
        await queryRunner.query(`ALTER TABLE "workflow_phase" ADD CONSTRAINT "PK_790f1cac553d711abddd472d87e" PRIMARY KEY ("workflowId", "phaseId")`);
        await queryRunner.query(`ALTER TABLE "workflow_phase" RENAME COLUMN "phase_id" TO "phaseId"`);
        await queryRunner.query(`ALTER TABLE "workflow_phase" RENAME COLUMN "workflow_id" TO "workflowId"`);
    }

}
 	