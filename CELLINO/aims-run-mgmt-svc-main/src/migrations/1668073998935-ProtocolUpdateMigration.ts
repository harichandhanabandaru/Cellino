import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProtocolMigration1668073998935
  implements MigrationInterface
{
  name = "UpdateProtocolMigration1668073998935";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "protocol_definition" ALTER COLUMN name SET NOT NULL 
        `);
    await queryRunner.query(`
            ALTER TABLE "protocol_definition"
            ADD CONSTRAINT "UQ_55230395b40817b521214b4bbf2" UNIQUE ("name")
        `);
    await queryRunner.query(`
            ALTER TABLE "protocol" ALTER COLUMN name SET NOT NULL 
        `);
    await queryRunner.query(`
            ALTER TABLE "protocol"
            ADD CONSTRAINT "UQ_4483ae15da2e78f24142f27e804" UNIQUE ("name")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "protocol" DROP CONSTRAINT "UQ_4483ae15da2e78f24142f27e804"
        `);
    await queryRunner.query(`
            ALTER TABLE "protocol" ALTER COLUMN name SET NULL 
        `);
    await queryRunner.query(`
            ALTER TABLE "protocol_definition" DROP CONSTRAINT "UQ_55230395b40817b521214b4bbf2"
        `);
    await queryRunner.query(`
            ALTER TABLE "protocol_definition" ALTER COLUMN name SET NULL 
        `);
  }
}
