import { MigrationInterface, QueryRunner } from "typeorm";

export class BioseroTracker1668515116769 implements MigrationInterface {
    name = 'BioseroTracker1668515116769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "biosero_tracker" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "type" character varying NOT NULL,
                "topic" character varying,
                "end_time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                "created_by" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                "modified_by" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
                "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                CONSTRAINT "PK_307d55f5a540bb3f60af3ce9204" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            Insert INTO "biosero_tracker" (type, topic) VALUES 
            ('event', 'Cellino.AIMS.NotificationEvent'),
            ('event', 'Cellino.CellCulture.SeedingEvent'),
            ('completedOrder', null)                                                                   
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "biosero_tracker"
        `);
    }

}
