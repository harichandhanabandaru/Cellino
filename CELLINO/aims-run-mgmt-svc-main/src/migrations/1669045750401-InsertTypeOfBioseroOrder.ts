import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertTypeOfBioseroOrder1669045750401
  implements MigrationInterface
{
  name = "InsertTypeOfBioseroOrder1669045750401";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO biosero_order_type(
                    id, code, label, description,created_by, created_at, modified_by, modified_at)
                    VALUES (uuid_generate_v4(), 'analysis_stitching', 'Analysis Stitching', null, '00000000-0000-0000-0000-000000000000', CURRENT_TIMESTAMP, '00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP),
                    (uuid_generate_v4(), 'analysis_multiscaling', 'Analysis Multiscaling', null, '00000000-0000-0000-0000-000000000000', CURRENT_TIMESTAMP, '00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP),
                    (uuid_generate_v4(), 'analsyis_nuc_inference', 'Analsyis Nuc Inference', null, '00000000-0000-0000-0000-000000000000', CURRENT_TIMESTAMP, '00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP),
                    (uuid_generate_v4(), 'analsyis_density_nuc', 'Analsyis Density Nuc', null, '00000000-0000-0000-0000-000000000000', CURRENT_TIMESTAMP, '00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP);`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("TRUNCATE TABLE biosero_order_type CASCADE");
  }
}
