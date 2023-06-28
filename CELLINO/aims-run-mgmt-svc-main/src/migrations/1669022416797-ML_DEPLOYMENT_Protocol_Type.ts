import { MigrationInterface, QueryRunner } from "typeorm";

export class MLDeploymentProtocolType1669022416797
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "protocol_type" (id,code,label,description,created_by,created_at,modified_by,modified_at) VALUES (uuid_generate_v4(),'ml_deployment','MLDEPLOYMENT','','00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,'00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "protocol_type" where code = 'ml_deployment'`
    );
  }
}
