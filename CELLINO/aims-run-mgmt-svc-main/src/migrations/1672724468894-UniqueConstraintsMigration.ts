import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueConstraintsMigration1672724468894 implements MigrationInterface {
    name = 'UniqueConstraintsMigration1672724468894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`
            ALTER TABLE "manufacturer"
            ADD CONSTRAINT "UQ_a4687de45b74542072a2656b77d" UNIQUE ("name")
        `);
        await queryRunner.query(`
            ALTER TABLE "vendor"
            ADD CONSTRAINT "UQ_f61018bdc439c6d1a941261b671" UNIQUE ("name")
        `);
        await queryRunner.query(`
            ALTER TABLE "labware"
            ADD CONSTRAINT "UQ_0679e059aa46a858cd7e949c86b" UNIQUE ("name")
        `);
        
        await queryRunner.query(`
            ALTER TABLE "partner"
            ADD CONSTRAINT "UQ_9af6a8bd7cac55b61babc753853" UNIQUE ("name")
        `);
        await queryRunner.query(`
            ALTER TABLE "instrument"
            ADD CONSTRAINT "UQ_efda620b8e7e274a712072e2afb" UNIQUE ("name")
        `);
        await queryRunner.query(`
            ALTER TABLE "biosero_order"
            ADD CONSTRAINT "UQ_bde99ee0fc8258cd701d457a178" UNIQUE ("biosero_identifier")
        `);
        await queryRunner.query(`
            ALTER TABLE "workflow"
            ADD CONSTRAINT "UQ_78101f2aba0e12c8c898d4045ec" UNIQUE ("name", "version")
        `);
        await queryRunner.query(`
            ALTER TABLE "phase"
            ADD CONSTRAINT "UQ_5a59f41044dc5508c544c8465f0" UNIQUE ("name", "version")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "phase" DROP CONSTRAINT "UQ_5a59f41044dc5508c544c8465f0"
        `);
        await queryRunner.query(`
            ALTER TABLE "workflow" DROP CONSTRAINT "UQ_78101f2aba0e12c8c898d4045ec"
        `);
        await queryRunner.query(`
            ALTER TABLE "biosero_order" DROP CONSTRAINT "UQ_bde99ee0fc8258cd701d457a178"
        `);
        await queryRunner.query(`
            ALTER TABLE "instrument" DROP CONSTRAINT "UQ_efda620b8e7e274a712072e2afb"
        `);
        await queryRunner.query(`
            ALTER TABLE "partner" DROP CONSTRAINT "UQ_9af6a8bd7cac55b61babc753853"
        `);
        
        await queryRunner.query(`
            ALTER TABLE "labware" DROP CONSTRAINT "UQ_0679e059aa46a858cd7e949c86b"
        `);
        await queryRunner.query(`
            ALTER TABLE "vendor" DROP CONSTRAINT "UQ_f61018bdc439c6d1a941261b671"
        `);
        await queryRunner.query(`
            ALTER TABLE "manufacturer" DROP CONSTRAINT "UQ_a4687de45b74542072a2656b77d"
        `);
        
    }

}
