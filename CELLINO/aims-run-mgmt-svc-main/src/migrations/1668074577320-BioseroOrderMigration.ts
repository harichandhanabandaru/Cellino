import { MigrationInterface, QueryRunner } from "typeorm";

export class BioseroOrderMigration1668074577320 implements MigrationInterface {
    name = 'BioseroOrderMigration1668074577320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "biosero_order" DROP CONSTRAINT "FK_7e2765a584081a6ab5552547c2d"
        `);
        await queryRunner.query(`
            ALTER TABLE "biosero_order" DROP COLUMN "protocol_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "biosero_order"
            ADD "protocol_configuration" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "biosero_order"
            ADD "well_position" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "biosero_order" DROP COLUMN "well_position"
        `);
        await queryRunner.query(`
            ALTER TABLE "biosero_order" DROP COLUMN "protocol_configuration"
        `);
        await queryRunner.query(`
            ALTER TABLE "biosero_order"
            ADD "protocol_id" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "biosero_order"
            ADD CONSTRAINT "FK_7e2765a584081a6ab5552547c2d" FOREIGN KEY ("protocol_id") REFERENCES "protocol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
