import { MigrationInterface, QueryRunner } from "typeorm";

export class NotNullConstraintsMigration1672812027541 implements MigrationInterface {
    name = 'NotNullConstraintsMigration1672812027541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "vendor"
            ALTER COLUMN "name"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "labware"
            ALTER COLUMN "labware_type"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "run"
            ALTER COLUMN "name" SET NOT NULL,
            ALTER COLUMN "start_date" SET NOT NULL,
            ALTER COLUMN "run_owner_id" SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "workflow"
            ALTER COLUMN "name" SET NOT NULL,
            ALTER COLUMN "version" SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "protocol"
            ALTER COLUMN "settings"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "phase"
            ALTER COLUMN "name" SET NOT NULL,
            ALTER COLUMN "version" SET NOT NULL,
            ALTER COLUMN "phase_initiation_rules" SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "event"
            ALTER COLUMN "event_type"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "biosero_order"
            ALTER COLUMN "biosero_identifier" SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "manufacturer"
            ALTER COLUMN "name"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "labware"
            ALTER COLUMN "name"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "partner"
            ALTER COLUMN "name"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "instrument"
            ALTER COLUMN "name"
            SET NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "instrument"
            ALTER COLUMN "name" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "partner"
            ALTER COLUMN "name" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "labware"
            ALTER COLUMN "name" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "manufacturer"
            ALTER COLUMN "name" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "biosero_order"
            ALTER COLUMN "biosero_identifier" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "event"
            ALTER COLUMN "event_type" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "phase"
            ALTER COLUMN "phase_initiation_rules" DROP NOT NULL,
            ALTER COLUMN "version" DROP NOT NULL,
            ALTER COLUMN "name" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "protocol"
            ALTER COLUMN "settings" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "workflow"
            ALTER COLUMN "version" DROP NOT NULL,
            ALTER COLUMN "name" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "run"
            ALTER COLUMN "run_owner_id" DROP NOT NULL,
            ALTER COLUMN "start_date" DROP NOT NULL,
            ALTER COLUMN "name" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "labware"
            ALTER COLUMN "labware_type" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "vendor"
            ALTER COLUMN "name" DROP NOT NULL
        `);
    }

}
