import { MigrationInterface, QueryRunner } from "typeorm"

export class AddOutlineToColony1667312252815 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `ALTER TABLE "colony_artifact" ADD COLUMN "outline" jsonb`
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `ALTER TABLE "colony_artifact" DROP COLUMN "outline"`
        );
      }

}
