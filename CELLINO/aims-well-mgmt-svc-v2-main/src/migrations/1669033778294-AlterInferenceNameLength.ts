import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterInferenceNameLength1669033778294 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE inference_artifact ALTER COLUMN name TYPE varchar(100) `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE inference_artifact ALTER COLUMN name TYPE varchar(50)')
    }

}
