import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteBioseroNotificationEvents1671714231732
  implements MigrationInterface
{
  name = "DeleteBioseroNotificationEvents1671714231732";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "biosero_notification_event"
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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

    await queryRunner.query(`
            Insert INTO "biosero_notification_event" (end_time, created_by, created_at, modified_by, modified_at) VALUES 
            (current_timestamp, '00000000-0000-0000-0000-000000000000', current_timestamp, '00000000-0000-0000-0000-000000000000', current_timestamp)                                                                
        `);
  }
}
