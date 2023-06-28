import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertProtocolTypeMigration1667554187351
  implements MigrationInterface
{
  name = "InsertProtocolTypeMigration1667554187351";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "protocol_type" (id,code,label,description,created_by,created_at,modified_by,modified_at) VALUES (uuid_generate_v4(),'manual','MANUAL','','00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,'00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP)`
    );
    await queryRunner.query(
      `INSERT INTO "protocol_type" (id,code,label,description,created_by,created_at,modified_by,modified_at) VALUES (uuid_generate_v4(),'instrument','INSTRUMENT','','00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,'00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP)`
    );
    await queryRunner.query(
      `INSERT INTO "protocol_type" (id,code,label,description,created_by,created_at,modified_by,modified_at) VALUES (uuid_generate_v4(),'ml_pipeline','MLPIPELINE','','00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,'00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP)`
    );
    await queryRunner.query(
      `INSERT INTO "protocol_type" (id,code,label,description,created_by,created_at,modified_by,modified_at) VALUES (uuid_generate_v4(),'ml_service','MLSERVICE','','00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,'00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "protocol_type"`);
  }
}
