import { MigrationInterface, QueryRunner } from "typeorm";

export class FindingTableCreation1678876303374 implements MigrationInterface {
  name = "FindingTableCreation1678876303374";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS public.finding
            (
                id uuid NOT NULL,
                name character varying(50) NOT NULL,
                generation_type_code character varying(50) NOT NULL,
                image_analysis_request_id uuid NOT NULL,
                outline jsonb NOT NULL,
                notes varchar,
                original_finding_id uuid,
                is_active boolean NOT NULL DEFAULT true,
                created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
                created_by uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::uuid,
                modified_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
                modified_by uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::uuid,
                CONSTRAINT finding_pkey PRIMARY KEY (id),
                CONSTRAINT "UQ_finding.original_finding_id" UNIQUE (original_finding_id),
                CONSTRAINT "UQ_finding.name_and_image_analysis_request_id" UNIQUE (name, image_analysis_request_id),
                CONSTRAINT "FK_finding.generation_type" FOREIGN KEY (generation_type_code)
                    REFERENCES public.generation_type (code) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION,
                CONSTRAINT "FK_finding.image_analysis_request" FOREIGN KEY (image_analysis_request_id)
                    REFERENCES public.image_analysis_request (id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION,
                CONSTRAINT fk_finding_original_finding_id FOREIGN KEY (original_finding_id)
                    REFERENCES public.finding (id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE SET NULL
            )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE finding`);
  }
}
