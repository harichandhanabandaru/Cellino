import { MigrationInterface, QueryRunner } from "typeorm";

export class RunUniqueConstraintsMigration1672724468894 implements MigrationInterface {
    name = 'RunUniqueConstraintsMigration1672724468894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "run"
            ADD CONSTRAINT "UQ_cc57fcee07868cfdd728d9ac17e" UNIQUE ("name")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "run" DROP CONSTRAINT "UQ_cc57fcee07868cfdd728d9ac17e"
        `);
    }

}
