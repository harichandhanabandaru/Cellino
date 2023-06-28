import { randomUUID } from "crypto";
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddManualProtocolForFindingObject1679298585420
  implements MigrationInterface
{
  name = "AddManualProtocolForFindingObject1679298585420";

  public async up(queryRunner: QueryRunner): Promise<void> {
    const id = randomUUID();
    const protocolId = randomUUID();
    await queryRunner.query(
      `INSERT INTO protocol_definition(id, name, parameters, created_by, created_at, modified_by, modified_at, is_active, protocol_type_code, protocol_category_code) 
                VALUES ('${id}', 'manual_finding_object', '[]', '00000000-0000-0000-0000-000000000000', CURRENT_TIMESTAMP, '00000000-0000-0000-0000-000000000000', CURRENT_TIMESTAMP, true, 'manual', 'analysis')`
    );
    await queryRunner.query(`INSERT INTO protocol(
      id, name, protocol_definition_id, settings, created_by, created_at, modified_by, modified_at, is_active)
        VALUES ('${protocolId}', 'manual_finding_object', '${id}', '{}', '00000000-0000-0000-0000-000000000000', CURRENT_TIMESTAMP, '00000000-0000-0000-0000-000000000000', CURRENT_TIMESTAMP, true)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM protocol_definition WHERE name='manual_finding_object'`
    );
    await queryRunner.query(
      `DELETE FROM protocol WHERE name='manual_finding_object'`
    );
  }
}
