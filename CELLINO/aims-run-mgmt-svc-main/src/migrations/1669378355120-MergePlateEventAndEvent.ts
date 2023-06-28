import { MigrationInterface, QueryRunner } from "typeorm";

export class MergePlateEventAndEvent1669378355120
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event" ADD "process_status" integer, ADD "process_status_detail" character varying, ADD "analysis_status" integer, ADD "analysis_status_detail" character varying, ADD "review_status" integer`
    );

    //copy plate_event data into event table
    await queryRunner.query(`update event set process_status=plate_event.process_status,
        review_status = plate_event.review_status,
        process_status_detail = plate_event.process_status_detail,
        analysis_status_detail = plate_event.analysis_status_detail,
        analysis_status = plate_event.analysis_status
        from plate_event where plate_event.event_id = event.id`);

    //delete plate_event tbale

    await queryRunner.query(`DROP TABLE "plate_event"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event" DROP COLUMN "process_status",DROP COLUMN "process_status_detail",DROP COLUMN "analysis_status",DROP COLUMN "analysis_status_detail",DROP COLUMN "review_status"`
    );

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "plate_event" 
    (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "process_status" integer,
      "process_status_detail" character varying, 
      "review_status" integer, 
      "analysis_status" integer, 
      "analysis_status_detail" character varying, 
      "event_id" uuid, 
      "plate_id" uuid,
      "created_by" character varying, 
      "created_at" TIMESTAMP WITH TIME ZONE, 
      "modified_by" character varying, 
      "modified_at" TIMESTAMP WITH TIME ZONE, 
       CONSTRAINT "PK_a94ea14f62a511140b981d12b5d" PRIMARY KEY ("id"),
       CONSTRAINT plate_event__event_id_fkey FOREIGN KEY (event_id)
            REFERENCES public.event (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION,
      CONSTRAINT plate_event_plate_id_fkey FOREIGN KEY (plate_id)
            REFERENCES public.plate (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
      )`);
  }
}
