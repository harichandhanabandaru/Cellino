import { MigrationInterface, QueryRunner } from "typeorm";

export class ClusterColonyUpdateMigration1666168581959 implements MigrationInterface {
    name = 'ClusterColonyUpdateMigration1666168581959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cluster_artifact" RENAME COLUMN "cluster_quality" TO "quality"`);
        await queryRunner.query(`ALTER TABLE "colony_artifact" RENAME COLUMN "colony_quality" TO "quality"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "colony_artifact" RENAME COLUMN "quality" TO "colony_quality"`);
        await queryRunner.query(`ALTER TABLE "cluster_artifact" RENAME COLUMN "quality" TO "cluster_quality"`);
    }

}
