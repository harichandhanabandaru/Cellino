import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1663148504811 implements MigrationInterface {
    name = 'Migration1663148504811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "action"
                RENAME COLUMN "active" TO "is_active"
        `);
        await queryRunner.query(`
            ALTER TABLE "condition"
                RENAME COLUMN "active" TO "is_active"
        `);
        await queryRunner.query(`
            ALTER TABLE "subject"
                RENAME COLUMN "active" TO "is_active"
        `);
        await queryRunner.query(`
            ALTER TABLE "field"
                RENAME COLUMN "active" TO "is_active"
        `);
        await queryRunner.query(`
            ALTER TABLE "role"
                RENAME COLUMN "active" TO "is_active"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME COLUMN "active" TO "is_active"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME COLUMN "is_active" TO "active"
        `);
        await queryRunner.query(`
            ALTER TABLE "role"
                RENAME COLUMN "is_active" TO "active"
        `);
        await queryRunner.query(`
            ALTER TABLE "field"
                RENAME COLUMN "is_active" TO "active"
        `);
        await queryRunner.query(`
            ALTER TABLE "subject"
                RENAME COLUMN "is_active" TO "active"
        `);
        await queryRunner.query(`
            ALTER TABLE "condition"
                RENAME COLUMN "is_active" TO "active"
        `);
        await queryRunner.query(`
            ALTER TABLE "action"
                RENAME COLUMN "is_active" TO "active"
        `);
    }

}
