import { MigrationInterface, QueryRunner } from "typeorm";

export class TagTableCreation1678961203420 implements MigrationInterface {
  name = "TagTableCreation1678961203420";

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`CREATE TABLE IF NOT EXISTS tag
        (
            id uuid NOT NULL,
            name character varying(50) NOT NULL,
            is_active boolean NOT NULL DEFAULT true,
            created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
            created_by uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::uuid,
            modified_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
            modified_by uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::uuid,
            CONSTRAINT tag_pkey PRIMARY KEY (id),
            CONSTRAINT "UQ_tag.name" UNIQUE (name)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE tag`);
  }
}
