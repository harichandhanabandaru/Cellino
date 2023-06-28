import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePlateReviewer1675407646154 implements MigrationInterface {
  name = "UpdatePlateReviewer1675407646154";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "plate_reviewer"
            ADD "run_id" uuid
        `);
    await queryRunner.query(`
        ALTER TABLE "plate_reviewer"
        ADD CONSTRAINT "FK_run_plate_reviewer" FOREIGN KEY ("run_id") REFERENCES "run"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        UPDATE plate_reviewer   
        SET run_id = rp.run_id
        FROM run_plate rp
        WHERE rp.plate_id = plate_reviewer.plate_id
   `);
    await queryRunner.query(`
            ALTER TABLE "plate_reviewer" DROP CONSTRAINT "PK_1ef8964370d94c128439154bd93"
        `);
    await queryRunner.query(`
            ALTER TABLE "plate_reviewer"
            ADD CONSTRAINT "PK_plate_reviewer.user.plate.run" PRIMARY KEY ("user_id", "plate_id", "run_id")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "plate_reviewer" DROP CONSTRAINT "FK_run_plate_reviewer"
        `);
    await queryRunner.query(`
            ALTER TABLE "plate_reviewer" DROP CONSTRAINT "PK_plate_reviewer.user.plate.run"
        `);
    await queryRunner.query(`
            ALTER TABLE "plate_reviewer"
            ADD CONSTRAINT "PK_1ef8964370d94c128439154bd93" PRIMARY KEY ("user_id", "plate_id")
        `);
    await queryRunner.query(`
            ALTER TABLE "plate_reviewer" DROP COLUMN "run_id"
        `);
  }
}
