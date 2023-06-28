import { MigrationInterface, QueryRunner } from "typeorm";

export class PhaseProtocol1660817536778 implements MigrationInterface {
    name = 'PhaseProtocol1660817536778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phase_protocol" RENAME COLUMN "phaseId" TO "phase_id"`);
        await queryRunner.query(`ALTER TABLE "phase_protocol" RENAME COLUMN "protocolId" TO "protocol_id"`);
        await queryRunner.query(`ALTER TABLE "phase_protocol" ADD "preceding_protocol_id" uuid`);
        await queryRunner.query(`ALTER TABLE "phase_protocol" ADD CONSTRAINT "FK_48339dc6638e723b0393569c618" FOREIGN KEY ("preceding_protocol_id") REFERENCES "protocol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phase_protocol" DROP CONSTRAINT "FK_48339dc6638e723b0393569c618"`);
        await queryRunner.query(`ALTER TABLE "phase_protocol" DROP COLUMN "preceding_protocol_id"`);
        await queryRunner.query(`ALTER TABLE "phase_protocol" RENAME COLUMN "phase_id" TO "phaseId"`);
        await queryRunner.query(`ALTER TABLE "phase_protocol" RENAME COLUMN "protocol_id" TO "protocolId"`);
    }
}
