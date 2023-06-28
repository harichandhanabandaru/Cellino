import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexesToClusterArtifactTable1678760386066
  implements MigrationInterface
{
  name = "AddIndexesToClusterArtifactTable1678760386066";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX "index_cluster_artifact.image_event_id"
        ON cluster_artifact (image_event_id)`);
    await queryRunner.query(`CREATE INDEX "index_cluster_artifact.image_analysis_request_id"
        ON cluster_artifact (image_analysis_request_id)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "index_cluster_artifact.image_analysis_request_id"`
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "index_cluster_artifact.image_event_id"`
    );
  }
}
