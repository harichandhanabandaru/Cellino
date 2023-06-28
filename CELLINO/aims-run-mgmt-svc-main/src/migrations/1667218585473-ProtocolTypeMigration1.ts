import { MigrationInterface, QueryRunner } from "typeorm";

export class ProtocolTypeMigration1667218585473 implements MigrationInterface {
    name = 'ProtocolTypeMigration1667218585473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "protocol_type" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "code" character varying,
                "label" character varying,
                "description" character varying,
                "created_by" uuid NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "modified_by" uuid NOT NULL,
                "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                CONSTRAINT "UQ_1042c0c915c81215f4ee19b3977" UNIQUE ("code"),
                CONSTRAINT "PK_c10cdb3ace01382864970e255cf" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "protocol_definition" DROP COLUMN "protocol_type"
        `);
        await queryRunner.query(`
            ALTER TABLE "protocol_definition"
            ADD "protocol_type_code" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "protocol_definition"
            ADD CONSTRAINT "FK_26775ca825d2029b16f0a2614c1" FOREIGN KEY ("protocol_type_code") REFERENCES "protocol_type"("code") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "protocol_definition" DROP CONSTRAINT "FK_26775ca825d2029b16f0a2614c1"
        `);
        await queryRunner.query(`
            ALTER TABLE "protocol_definition" DROP COLUMN "protocol_type_code"
        `);
        await queryRunner.query(`
            ALTER TABLE "protocol_definition"
            ADD "protocol_type" integer
        `);
        await queryRunner.query(`
            DROP TABLE "protocol_type"
        `);
    }

}
