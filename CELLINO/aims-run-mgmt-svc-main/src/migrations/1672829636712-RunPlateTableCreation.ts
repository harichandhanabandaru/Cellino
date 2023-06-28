import { MigrationInterface, QueryRunner } from "typeorm";

export class RunPlateTableCreation1672829636712 implements MigrationInterface {
  name = "RunPlateTableCreation1672829636712";
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        Create table "run_plate"(
          run_id uuid NOT NULL,
          plate_id uuid NOT NULL,
          phase_id uuid NOT NULL,
          created_by uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::uuid,
          created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
          modified_by uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::uuid,
          modified_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "PK_run_plate" PRIMARY KEY (run_id, plate_id),
          CONSTRAINT "FK_phase_id" FOREIGN KEY (phase_id)
              REFERENCES public.phase (id) MATCH SIMPLE
              ON UPDATE NO ACTION
              ON DELETE NO ACTION,
          CONSTRAINT "FK_run_id" FOREIGN KEY (run_id)
              REFERENCES public.run (id) MATCH SIMPLE
              ON UPDATE NO ACTION
              ON DELETE NO ACTION,
          CONSTRAINT "FK_plate_id" FOREIGN KEY (plate_id)
              REFERENCES public.plate (id) MATCH SIMPLE
              ON UPDATE NO ACTION
              ON DELETE NO ACTION
      )
    `);
    await queryRunner.query(`INSERT INTO public.run_plate(run_id, plate_id, phase_id) 
      select run_id,id,phase_id  from plate where run_id is not null and phase_id is not null`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP table run_plate`);
  }
}
