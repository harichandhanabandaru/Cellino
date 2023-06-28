import { MigrationInterface, QueryRunner } from "typeorm";

export class setDefaultsProtocolCategoryV1676419600516
  implements MigrationInterface
{
  name = "setDefaultsProtocolCategoryV1676419600516";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "protocol_category" 
        ALTER COLUMN "created_by" SET DEFAULT '00000000-0000-0000-0000-000000000000',
        ALTER COLUMN "modified_by" SET DEFAULT '00000000-0000-0000-0000-000000000000',
        ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
        ALTER COLUMN "modified_at" SET DEFAULT CURRENT_TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "protocol_category"
        ALTER COLUMN "created_by" DROP DEFAULT,
        ALTER COLUMN "modified_by" DROP DEFAULT,
        ALTER COLUMN "created_at" DROP DEFAULT,
        ALTER COLUMN "modified_at" DROP DEFAULT`);
  }
}
