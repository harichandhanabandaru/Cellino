import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexingOnTables1671002580676 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS colony_index ON cluster_artifact (colony_id)`
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS image_event_cluster_index ON cluster_artifact (image_event_id,colony_id);`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS image_event_cluster_index on cluster_artifact`
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS colony_index on cluster_artifact`
    );
  }
}
