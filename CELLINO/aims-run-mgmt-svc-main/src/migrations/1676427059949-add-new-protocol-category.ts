import { MigrationInterface, QueryRunner } from "typeorm";

export class addNewProtocolCategoryV1676427059949
  implements MigrationInterface
{
  name = "addNewProtocolCategoryV1676427059949";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "protocol_category" (id,code,label,description)
      VALUES (uuid_generate_v4(),'energy_map','Energy Map','Protocol to create energy map')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "protocol_category" WHERE code = 'energy_map'`);
  }
}
