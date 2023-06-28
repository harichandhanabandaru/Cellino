import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateScanObject1675258339778 implements MigrationInterface {
  name = "CreateScanObject1675258339778";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "generation_type" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "code" character varying(50) NOT NULL,
            "label" character varying(50) NOT NULL,
            "description" character varying,
            "is_active" boolean NOT NULL,
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "created_by" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::uuid,
            "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "modified_by" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::uuid,
            CONSTRAINT "UQ_generation_type.code" UNIQUE ("code"),
            CONSTRAINT "PK_generation_type.pk" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        INSERT INTO "generation_type" (id,code,label,description,created_by,created_at,modified_by,modified_at,is_active) 
        VALUES 
        (uuid_generate_v4(),'MANUAL','Manual','','00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,'00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,true),
        (uuid_generate_v4(),'SYSTEMGENERATED','System Generated','','00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,'00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,true),
        (uuid_generate_v4(),'EDITED','Edited','','00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,'00000000-0000-0000-0000-000000000000',CURRENT_TIMESTAMP,true)
    `);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS scan_object
        (
            id uuid NOT NULL,
            name character varying(50) NOT NULL,
            generation_type_code character varying(50) NOT NULL,
            image_analysis_request_id uuid NOT NULL,
            image_event_id uuid NOT NULL,
            outline jsonb NOT NULL,
            attributes jsonb,
            is_active boolean NOT NULL DEFAULT true,
            created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
            created_by uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::uuid,
            modified_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
            modified_by uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::uuid,
            CONSTRAINT scan_object_pkey PRIMARY KEY (id),
            CONSTRAINT "UQ_scan_object_name" UNIQUE (name),
            CONSTRAINT "FK_scan_object.image_event" FOREIGN KEY (image_event_id)
                REFERENCES image_event (id),
            CONSTRAINT "FK_scan_object.image_analysis_request" FOREIGN KEY (image_analysis_request_id)
                REFERENCES image_analysis_request (id),
            CONSTRAINT "FK_scan_object.generation_type" FOREIGN KEY (generation_type_code)
                REFERENCES generation_type (code)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE scan_object`);
    await queryRunner.query(`DROP TABLE generation_type`);
  }
}
