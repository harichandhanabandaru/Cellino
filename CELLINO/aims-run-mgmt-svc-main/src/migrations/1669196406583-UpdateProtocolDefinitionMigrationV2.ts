import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProtocolDefinitionMigrationV21669196406583
  implements MigrationInterface
{
  name = "UpdateProtocolDefinitionMigrationV21669196406583";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "protocol_definition"
        ALTER COLUMN "protocol_type_code" SET NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "protocol_definition"
            ALTER COLUMN "protocol_type_code" DROP NOT NULL
        `);
  }
}
