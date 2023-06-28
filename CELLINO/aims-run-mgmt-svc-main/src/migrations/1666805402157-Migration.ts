import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1666805402157 implements MigrationInterface {
    name = 'Migration1666805402157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "biosero_order_status" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "code" character varying NOT NULL,
                "label" character varying NOT NULL,
                "created_by" uuid NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "modified_by" uuid NOT NULL,
                "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                CONSTRAINT "UQ_918ba56edd98dffae1af00cd880" UNIQUE ("code"),
                CONSTRAINT "PK_3caf94e5648f1664eac92378359" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "biosero_order_type" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "code" character varying NOT NULL,
                "label" character varying NOT NULL,
                "created_by" uuid NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "modified_by" uuid NOT NULL,
                "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                CONSTRAINT "UQ_66fefcb1d26abaa61dab6648b1e" UNIQUE ("code"),
                CONSTRAINT "PK_42868d2811ce010ce566f3ff310" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "biosero_order" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "metadata" jsonb NOT NULL,
                "plate_barcode" character varying NOT NULL,
                "biosero_order_type_id" uuid,
                "biosero_order_status_id" uuid,
                "protocol_id" uuid,
                "created_by" uuid NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "modified_by" uuid NOT NULL,
                "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                CONSTRAINT "PK_666e4c3a5d22932444fac1acb9c" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "biosero_order"
            ADD CONSTRAINT "FK_01360859b252604df4efcd735c8" FOREIGN KEY ("biosero_order_type_id") REFERENCES "biosero_order_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "biosero_order"
            ADD CONSTRAINT "FK_9dbc317ea8f5900b38e51b03afb" FOREIGN KEY ("biosero_order_status_id") REFERENCES "biosero_order_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "biosero_order"
            ADD CONSTRAINT "FK_7e2765a584081a6ab5552547c2d" FOREIGN KEY ("protocol_id") REFERENCES "protocol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "biosero_order" DROP CONSTRAINT "FK_7e2765a584081a6ab5552547c2d"
        `);
        await queryRunner.query(`
            ALTER TABLE "biosero_order" DROP CONSTRAINT "FK_9dbc317ea8f5900b38e51b03afb"
        `);
        await queryRunner.query(`
            ALTER TABLE "biosero_order" DROP CONSTRAINT "FK_01360859b252604df4efcd735c8"
        `);
        await queryRunner.query(`
            DROP TABLE "biosero_order"
        `);
        await queryRunner.query(`
            DROP TABLE "biosero_order_type"
        `);
        await queryRunner.query(`
            DROP TABLE "biosero_order_status"
        `);
    }

}
