import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteAttributeLabelMigration1673418475958 implements MigrationInterface {
    name = 'DeleteAttributeLabelMigration1673418475958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE "attribute_label"
        `);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS public."attribute_labels" (
            "id" uuid,
            "name" varchar(100),
            "label" varchar(100),
            "section" varchar(100),
             "hint"  varchar(512),
             "default_units" varchar(50),
              CONSTRAINT attribute_labels_pkey PRIMARY KEY (id)
          )
        `);
    }

}
