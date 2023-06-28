import { MigrationInterface, QueryRunner } from "typeorm";

export class ObjectCachingRule1675272571106 implements MigrationInterface {
  name = "ObjectCachingRule1675272571106";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "object_caching_rule" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "object_pattern" character varying(256) NOT NULL,
                "cache_control" character varying(256) NOT NULL,
                "created_by" uuid NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "modified_by" uuid NOT NULL,
                "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                CONSTRAINT "UQ_745ca33e9300ad5c2926ef0a921" UNIQUE ("object_pattern"),
                CONSTRAINT "PK_a4007c15fb83b24056c210bb0ef" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "object_caching_rule"
        `);
  }
}
