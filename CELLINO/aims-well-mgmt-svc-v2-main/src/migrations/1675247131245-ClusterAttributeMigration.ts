import { MigrationInterface, QueryRunner } from "typeorm";

export class ClusterAttributeMigration1675247131245
  implements MigrationInterface
{
  name = "ClusterAttributeMigration1675247131245";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "ancestry" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(100) NOT NULL,
                "created_by" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                "modified_by" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
                "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                CONSTRAINT "UQ_555e54c0e698c223f3e2ee22d4d" UNIQUE ("name"),
                CONSTRAINT "PK_cc8f8a92d5918e1091e61241e21" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "cluster_lineage" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(100) NOT NULL,
                "attributes" jsonb,
                "ancestry_id" uuid,
                "created_by" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                "modified_by" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
                "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                CONSTRAINT "PK_aa5c3ee9356801cf197f7fbe26c" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "cluster_attribute" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "source" character varying(100),
                "key" character varying(100) NOT NULL,
                "value" jsonb NOT NULL,
                "cluster_artifact_id" uuid,
                "well_id" uuid,
                "created_by" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                "modified_by" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
                "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                CONSTRAINT "PK_4aa410c271ee691a041362a1ab9" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "cluster_lineage_attribute" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "source" character varying(100),
                "key" character varying(100) NOT NULL,
                "value" jsonb NOT NULL,
                "cluster_lineage_id" uuid,
                "well_id" uuid,
                "created_by" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                "modified_by" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
                "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                CONSTRAINT "PK_e914444b43f7da5767443ee87b2" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "colony_attribute" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "source" character varying(100),
                "key" character varying(100) NOT NULL,
                "value" jsonb NOT NULL,
                "colony_artifact_id" uuid,
                "well_id" uuid,
                "created_by" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                "modified_by" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
                "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                CONSTRAINT "PK_bae382436cb6b44d82142559870" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "cluster_artifact" DROP COLUMN "name_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "cluster_artifact"
            ADD "cluster_lineage_id" uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "cluster_artifact"
            ADD "ancestry_id" uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "cluster_artifact" ALTER COLUMN name TYPE varchar(100) 
        `);
    await queryRunner.query(`
            ALTER TABLE "cluster_lineage"
            ADD CONSTRAINT "FK_e7a16f0c1050355c51fb3c8a2d1" FOREIGN KEY ("ancestry_id") REFERENCES "ancestry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "cluster_artifact"
            ADD CONSTRAINT "FK_f73c75b23688455c290a6420dbc" FOREIGN KEY ("cluster_lineage_id") REFERENCES "cluster_lineage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "cluster_artifact"
            ADD CONSTRAINT "FK_97b2a4438b299073839fa06b36e" FOREIGN KEY ("ancestry_id") REFERENCES "ancestry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "cluster_attribute"
            ADD CONSTRAINT "FK_82efa4b00004df616ea566f8d9d" FOREIGN KEY ("cluster_artifact_id") REFERENCES "cluster_artifact"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "cluster_attribute"
            ADD CONSTRAINT "FK_e2b914438d8933017897bda9fa5" FOREIGN KEY ("well_id") REFERENCES "well"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "cluster_lineage_attribute"
            ADD CONSTRAINT "FK_246b5c678a9ffe88d01fd4bb0f4" FOREIGN KEY ("cluster_lineage_id") REFERENCES "cluster_lineage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "cluster_lineage_attribute"
            ADD CONSTRAINT "FK_80259dee447d60e1128fef2ee34" FOREIGN KEY ("well_id") REFERENCES "well"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "colony_attribute"
            ADD CONSTRAINT "FK_cd3b35fc1a7fd5b0981f09c7086" FOREIGN KEY ("colony_artifact_id") REFERENCES "colony_artifact"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "colony_attribute"
            ADD CONSTRAINT "FK_04f6c44e3a3d99ab7485936a34e" FOREIGN KEY ("well_id") REFERENCES "well"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "colony_attribute" DROP CONSTRAINT "FK_04f6c44e3a3d99ab7485936a34e"
        `);
    await queryRunner.query(`
            ALTER TABLE "colony_attribute" DROP CONSTRAINT "FK_cd3b35fc1a7fd5b0981f09c7086"
        `);
    await queryRunner.query(`
            ALTER TABLE "cluster_lineage_attribute" DROP CONSTRAINT "FK_80259dee447d60e1128fef2ee34"
        `);
    await queryRunner.query(`
            ALTER TABLE "cluster_lineage_attribute" DROP CONSTRAINT "FK_246b5c678a9ffe88d01fd4bb0f4"
        `);
    await queryRunner.query(`
            ALTER TABLE "cluster_attribute" DROP CONSTRAINT "FK_e2b914438d8933017897bda9fa5"
        `);
    await queryRunner.query(`
            ALTER TABLE "cluster_attribute" DROP CONSTRAINT "FK_82efa4b00004df616ea566f8d9d"
        `);
    await queryRunner.query(`
            ALTER TABLE "cluster_artifact" DROP CONSTRAINT "FK_97b2a4438b299073839fa06b36e"
        `);
    await queryRunner.query(`
            ALTER TABLE "cluster_artifact" DROP CONSTRAINT "FK_f73c75b23688455c290a6420dbc"
        `);
    await queryRunner.query(`
            ALTER TABLE "cluster_lineage" DROP CONSTRAINT "FK_e7a16f0c1050355c51fb3c8a2d1"
        `);
    await queryRunner.query(`
        ALTER TABLE "cluster_artifact" ALTER COLUMN name TYPE varchar(50) 
        `);
    await queryRunner.query(`
            ALTER TABLE "cluster_artifact" DROP COLUMN "ancestry_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "cluster_artifact" DROP COLUMN "cluster_lineage_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "cluster_artifact"
            ADD "name_id" character varying(50)
        `);
    await queryRunner.query(`
            DROP TABLE "colony_attribute"
        `);
    await queryRunner.query(`
            DROP TABLE "cluster_lineage_attribute"
        `);
    await queryRunner.query(`
            DROP TABLE "cluster_attribute"
        `);
    await queryRunner.query(`
            DROP TABLE "cluster_lineage"
        `);
    await queryRunner.query(`
            DROP TABLE "ancestry"
        `);
  }
}
