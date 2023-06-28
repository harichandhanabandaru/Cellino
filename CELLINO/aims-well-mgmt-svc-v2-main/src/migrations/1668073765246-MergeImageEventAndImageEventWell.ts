import { MigrationInterface, QueryRunner } from "typeorm";

export class MergeImageEventAndImageEventWell1668073765246
  implements MigrationInterface
{
  name = "MergeImageEventAndImageEventWell1668073765246";

  public async up(queryRunner: QueryRunner): Promise<void> {
    //add columns review_status,analysis_status,analysis_status_detail,well_id
    await queryRunner.query(
      `ALTER TABLE "image_event" ADD "review_status" integer ,ADD "analysis_status" integer ,ADD "analysis_status_detail" character varying,ADD "well_id" uuid`
    );
    await queryRunner.query(
      `ALTER TABLE "image_event" ADD CONSTRAINT "FK_5ee17c67a6ebe29b7ec23809e80" FOREIGN KEY ("well_id") REFERENCES "well"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    //copy image_event_well data to image_event
    await queryRunner.query(`do
    $$
    DECLARE
    r record;
    BEGIN
       FOR r IN (select ie.id,iew.review_status ,iew.analysis_status ,iew.analysis_status_detail,iew.well_id  from image_event ie inner join image_event_well iew on iew.image_event_id = ie.id) LOOP
        update image_event set review_status=r.review_status,analysis_status = r.analysis_status,analysis_status_detail = r.analysis_status_detail,well_id = r.well_id where id = r.id 	;
       END LOOP;
    end;
    $$
    language plpgsql;`);
    //delete image_event_well
    await queryRunner.query(`DROP TABLE "image_event_well"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "image_event" DROP CONSTRAINT "FK_5ee17c67a6ebe29b7ec23809e80"`
    );
    await queryRunner.query(
      `ALTER TABLE "image_event" DROP COLUMN "well_id",DROP COLUMN "analysis_status_detail",DROP COLUMN "analysis_status",DROP COLUMN "review_status"`
    );
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS image_event_well
        (
            image_event_id uuid NOT NULL,
            well_id uuid NOT NULL,
            review_status integer,
            analysis_status integer,
            analysis_status_detail text COLLATE pg_catalog."default",
            CONSTRAINT image_event_well_pkey PRIMARY KEY (image_event_id, well_id),
            CONSTRAINT image_event_well_image_event_id_fkey FOREIGN KEY (image_event_id)
                REFERENCES image_event (id) MATCH SIMPLE
                ON UPDATE CASCADE
                ON DELETE NO ACTION,
            CONSTRAINT image_event_well_well_id_fkey FOREIGN KEY (well_id)
                REFERENCES well (id) MATCH SIMPLE
                ON UPDATE CASCADE
                ON DELETE NO ACTION
        )`);
  }
}
