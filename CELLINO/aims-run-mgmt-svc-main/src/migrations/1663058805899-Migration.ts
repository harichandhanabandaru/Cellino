import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1663058805899 implements MigrationInterface {
    name = 'Migration1663058805899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "manufacturer"
                RENAME COLUMN "is_deleted" TO "is_active"
        `);
        await queryRunner.query(`
            UPDATE "manufacturer" SET "is_active" = NOT "is_active"
        `)
        await queryRunner.query(`
            ALTER TABLE "vendor"
                RENAME COLUMN "is_deleted" TO "is_active"
        `);
        await queryRunner.query(`
            UPDATE "vendor" SET "is_active" = NOT "is_active"
        `)
        await queryRunner.query(`
            ALTER TABLE "labware"
                RENAME COLUMN "is_deleted" TO "is_active"
        `);
        await queryRunner.query(`
            UPDATE "labware" SET "is_active" = NOT "is_active"
        `)
        await queryRunner.query(`
            ALTER TABLE "partner"
                RENAME COLUMN "is_deleted" TO "is_active"
        `);
        await queryRunner.query(`
            UPDATE "partner" SET "is_active" = NOT "is_active"
        `)
        await queryRunner.query(`
            ALTER TABLE "workflow"
                RENAME COLUMN "is_deleted" TO "is_active"
        `);
        await queryRunner.query(`
            UPDATE "workflow" SET "is_active" = NOT "is_active"
        `)
        await queryRunner.query(`
            ALTER TABLE "instrument"
                RENAME COLUMN "is_deleted" TO "is_active"
        `);
        await queryRunner.query(`
            UPDATE "instrument" SET "is_active" = NOT "is_active"
        `)
        await queryRunner.query(`
            ALTER TABLE "protocol_definition"
                RENAME COLUMN "is_deleted" TO "is_active"
        `);
        await queryRunner.query(`
            UPDATE "protocol_definition" SET "is_active" = NOT "is_active"
        `)
        await queryRunner.query(`
            ALTER TABLE "protocol"
                RENAME COLUMN "is_deleted" TO "is_active"
        `);
        await queryRunner.query(`
            UPDATE "protocol" SET "is_active" = NOT "is_active"
        `)
        await queryRunner.query(`
            ALTER TABLE "phase"
                RENAME COLUMN "is_deleted" TO "is_active"
        `);
        await queryRunner.query(`
            UPDATE "phase" SET "is_active" = NOT "is_active"
        `)
        await queryRunner.query(`
            ALTER TABLE "run_reviewers" RENAME TO "run_reviewer"
        `);
        await queryRunner.query(`
            ALTER TABLE "plate_reviewers" RENAME TO "plate_reviewer"
        `);
        await queryRunner.query(`
            ALTER TABLE "run" DROP COLUMN "is_deleted"
        `);
        await queryRunner.query(`
            ALTER TABLE "plate" DROP COLUMN "is_deleted"
        `);
        await queryRunner.query(`
            ALTER TABLE "event" DROP COLUMN "is_deleted"
        `);
        await queryRunner.query(`
            ALTER TABLE "plate_event" DROP COLUMN "is_deleted"
        `);
        await queryRunner.query(`
            ALTER TABLE "manufacturer"
            ALTER COLUMN "is_active"
            SET DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "vendor"
            ALTER COLUMN "is_active"
            SET DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "labware"
            ALTER COLUMN "is_active"
            SET DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "partner"
            ALTER COLUMN "is_active"
            SET DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "workflow"
            ALTER COLUMN "is_active"
            SET DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "instrument"
            ALTER COLUMN "is_active"
            SET DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "protocol_definition"
            ALTER COLUMN "is_active"
            SET DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "protocol"
            ALTER COLUMN "is_active"
            SET DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "phase"
            ALTER COLUMN "is_active"
            SET DEFAULT true
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "phase"
            ALTER COLUMN "is_active"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "protocol"
            ALTER COLUMN "is_active"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "protocol_definition"
            ALTER COLUMN "is_active"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "instrument"
            ALTER COLUMN "is_active"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "workflow"
            ALTER COLUMN "is_active"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "partner"
            ALTER COLUMN "is_active"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "labware"
            ALTER COLUMN "is_active"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "vendor"
            ALTER COLUMN "is_active"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "manufacturer"
            ALTER COLUMN "is_active"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "plate_event"
            ADD "is_deleted" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "event"
            ADD "is_deleted" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "plate"
            ADD "is_deleted" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "run"
            ADD "is_deleted" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "plate_reviewer" RENAME TO "plate_reviewers"
        `);
        await queryRunner.query(`
            ALTER TABLE "run_reviewer" RENAME TO "run_reviewers"
        `);
        await queryRunner.query(`
            ALTER TABLE "phase"
                RENAME COLUMN "is_active" TO "is_deleted"
        `);
        await queryRunner.query(`
            UPDATE "phase" SET "is_deleted" = NOT "is_deleted"
        `)
        await queryRunner.query(`
            ALTER TABLE "protocol"
                RENAME COLUMN "is_active" TO "is_deleted"
        `);
        await queryRunner.query(`
            UPDATE "protocol" SET "is_deleted" = NOT "is_deleted"
        `)
        await queryRunner.query(`
            ALTER TABLE "protocol_definition"
                RENAME COLUMN "is_active" TO "is_deleted"
        `);
        await queryRunner.query(`
            UPDATE "protocol_definition" SET "is_deleted" = NOT "is_deleted"
        `)
        await queryRunner.query(`
            ALTER TABLE "instrument"
                RENAME COLUMN "is_active" TO "is_deleted"
        `);
        await queryRunner.query(`
            UPDATE "instrument" SET "is_deleted" = NOT "is_deleted"
        `)
        await queryRunner.query(`
            ALTER TABLE "workflow"
                RENAME COLUMN "is_active" TO "is_deleted"
        `);
        await queryRunner.query(`
            UPDATE "workflow" SET "is_deleted" = NOT "is_deleted"
        `)
        await queryRunner.query(`
            ALTER TABLE "partner"
                RENAME COLUMN "is_active" TO "is_deleted"
        `);
        await queryRunner.query(`
            UPDATE "partner" SET "is_deleted" = NOT "is_deleted"
        `)
        await queryRunner.query(`
            ALTER TABLE "labware"
                RENAME COLUMN "is_active" TO "is_deleted"
        `);
        await queryRunner.query(`
            UPDATE "labware" SET "is_deleted" = NOT "is_deleted"
        `)
        await queryRunner.query(`
            ALTER TABLE "vendor"
                RENAME COLUMN "is_active" TO "is_deleted"
        `);
        await queryRunner.query(`
            UPDATE "vendor" SET "is_deleted" = NOT "is_deleted"
        `)
        await queryRunner.query(`
            ALTER TABLE "manufacturer"
                RENAME COLUMN "is_active" TO "is_deleted"
        `);
        await queryRunner.query(`
            UPDATE "manufacturer" SET "is_deleted" = NOT "is_deleted"
        `)
    }

}
