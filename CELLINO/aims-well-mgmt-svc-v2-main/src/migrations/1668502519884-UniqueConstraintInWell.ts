import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueConstraintInWell1668502519884 implements MigrationInterface {
  name = "UniqueConstraintInWell1668502519884";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "well" ADD CONSTRAINT "UQ_461a8c9dd265a60c729250913e1" UNIQUE ("position", "plate_id")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "well" DROP CONSTRAINT "UQ_461a8c9dd265a60c729250913e1"`
    );
  }
}
