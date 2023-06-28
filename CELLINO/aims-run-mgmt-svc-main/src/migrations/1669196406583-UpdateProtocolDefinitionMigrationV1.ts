import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProtocolDefinitionMigrationV11669196406583
  implements MigrationInterface
{
  name = "UpdateProtocolDefinitionMigrationV11669196406583";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "protocol_definition" DROP CONSTRAINT "FK_b46536326c29d349d2d8d06ecaa"
        `);
    await queryRunner.query(`
            CREATE TABLE "protocol_category" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "code" character varying(50) NOT NULL,
                "label" character varying(50) NOT NULL,
                "description" character varying(255),
                "created_by" uuid NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "modified_by" uuid NOT NULL,
                "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "UQ_a6a956ef61d0ccb1329bf92745a" UNIQUE ("code"),
                CONSTRAINT "PK_57cfb7bfc455f442c279aa5a111" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            ALTER TABLE "protocol_type"
            ADD "is_active" boolean NOT NULL DEFAULT true
        `);
    await queryRunner.query(`
            ALTER TABLE "protocol_definition"
            ADD "workflow_template_name" character varying(50)
        `);
    await queryRunner.query(`
        ALTER TABLE "protocol_definition"
        ADD "protocol_category_code" character varying(50)
        `);
    await queryRunner.query(`
            ALTER TABLE "protocol_definition" 
            ALTER COLUMN related_id TYPE character varying(50),
            ALTER COLUMN "name"
            SET NOT NULL,
            ALTER COLUMN "parameters"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "protocol_type"
            ALTER COLUMN "code" TYPE character varying(50),
            ALTER COLUMN "code" SET NOT NULL
            `);

    await queryRunner.query(`
            ALTER TABLE "protocol_type"
            ALTER COLUMN "label" TYPE character varying(50),
            ALTER COLUMN "label" SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "protocol"
            ALTER COLUMN "name"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "protocol_definition"
            ADD CONSTRAINT "FK_635f456eb6676904f0b4a7f4de3" FOREIGN KEY ("protocol_category_code") REFERENCES "protocol_category"("code") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(
      `INSERT INTO "protocol_category" (id,code,label,description,created_by,created_at,modified_by,modified_at) VALUES (uuid_generate_v4(),'imaging','Imaging','','00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,'00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP)`
    );
    await queryRunner.query(
      `INSERT INTO "protocol_category" (id,code,label,description,created_by,created_at,modified_by,modified_at) VALUES (uuid_generate_v4(),'seeding','Seeding','','00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,'00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP)`
    );
    await queryRunner.query(
      `INSERT INTO "protocol_category" (id,code,label,description,created_by,created_at,modified_by,modified_at) VALUES (uuid_generate_v4(),'feeding','Feeding','','00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,'00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP)`
    );
    await queryRunner.query(
      `INSERT INTO "protocol_category" (id,code,label,description,created_by,created_at,modified_by,modified_at) VALUES (uuid_generate_v4(),'analysis','Analysis','','00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,'00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP)`
    );
    await queryRunner.query(
      `UPDATE "protocol_definition"
      SET "protocol_category_code" = 'analysis'
      `
    );
    await queryRunner.query(`
        ALTER TABLE "protocol_definition"
        ALTER COLUMN "protocol_category_code" SET NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "protocol_category"`);
    await queryRunner.query(`
            ALTER TABLE "protocol_definition" DROP CONSTRAINT "FK_635f456eb6676904f0b4a7f4de3"
        `);
    await queryRunner.query(`
            ALTER TABLE "protocol"
            ALTER COLUMN "name" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "protocol_definition"
            ALTER COLUMN "parameters" DROP NOT NULL,
            ALTER COLUMN "name" DROP NOT NULL,
            ALTER COLUMN related_id TYPE uuid USING related_id::uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "protocol_type"
            ALTER COLUMN "label" DROP NOT NULL,
            ALTER COLUMN "code" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "protocol_definition" DROP COLUMN "protocol_category_code"
        `);
    await queryRunner.query(`
            ALTER TABLE "protocol_definition" DROP COLUMN "workflow_template_name"
        `);
    await queryRunner.query(`
            ALTER TABLE "protocol_type" DROP COLUMN "is_active"
        `);
    await queryRunner.query(`
            DROP TABLE "protocol_category"
        `);
    await queryRunner.query(`
            ALTER TABLE "protocol_definition"
            ADD CONSTRAINT "FK_b46536326c29d349d2d8d06ecaa" FOREIGN KEY ("related_id") REFERENCES "instrument"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
