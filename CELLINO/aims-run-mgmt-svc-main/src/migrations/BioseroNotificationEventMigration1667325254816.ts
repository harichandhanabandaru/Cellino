import { MigrationInterface, QueryRunner } from "typeorm";

export class BioseroNotificationEventMigration1667325254816 implements MigrationInterface {
    name = 'BioseroNotificationEventMigration1667325254816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "biosero_notification_event" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "end_time" TIMESTAMP WITH TIME ZONE NOT NULL,
                "created_by" uuid NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "modified_by" uuid NOT NULL,
                "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                CONSTRAINT "PK_a840a32208068df353be900fe0a" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "biosero_notification_event"
        `);
    }

}
