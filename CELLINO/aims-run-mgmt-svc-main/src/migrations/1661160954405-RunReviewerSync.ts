import { MigrationInterface, QueryRunner } from "typeorm";

export class RunReviewerSync1661160954405 implements MigrationInterface {
    name = 'RunReviewerSync1661160954405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "run_reviewers" ("run_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_76cfa1cf79e885cdd023036147b" PRIMARY KEY ("run_id", "user_id"))`);
        await queryRunner.query(`CREATE TABLE "plate_reviewers" ("plate_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_1ef8964370d94c128439154bd93" PRIMARY KEY ("plate_id", "user_id"))`);
        
        await queryRunner.query(`ALTER TABLE "plate" DROP COLUMN "reviewers"`);
        
        await queryRunner.query(`ALTER TABLE "run_reviewers" ADD CONSTRAINT "FK_40927932f4e764959f2d5cf9cbb" FOREIGN KEY ("run_id") REFERENCES "run"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plate_reviewers" ADD CONSTRAINT "FK_2cf213122880997a0e0c63c44d4" FOREIGN KEY ("plate_id") REFERENCES "plate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plate_reviewers" DROP CONSTRAINT "FK_2cf213122880997a0e0c63c44d4"`);
        await queryRunner.query(`ALTER TABLE "run_reviewers" DROP CONSTRAINT "FK_40927932f4e764959f2d5cf9cbb"`);

        await queryRunner.query(`ALTER TABLE "plate" ADD "reviewers" uuid array`);
        
        await queryRunner.query(`DROP TABLE "plate_reviewers"`);
        await queryRunner.query(`DROP TABLE "run_reviewers"`);
    }
}
