import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageSourceColumnToBioseroOrder1669702596368
  implements MigrationInterface
{
  name = "AddImageSourceColumnToBioseroOrder1669702596368";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE biosero_order rename to biosero_order_old`
    );
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS public.biosero_order
       (
           id uuid NOT NULL DEFAULT uuid_generate_v4(),
           biosero_identifier character varying  NOT NULL,
           plate_barcode character varying ,
           protocol_configuration character varying ,
           image_event_id character varying ,
           image_source character varying,
           well_position character varying ,
           biosero_order_type_code character varying  NOT NULL,
           metadata jsonb,
           acquisition_id character varying ,
           created_by uuid NOT NULL,
           created_at timestamp with time zone NOT NULL,
           modified_by uuid NOT NULL,
           modified_at timestamp with time zone NOT NULL,
           CONSTRAINT "PK_666e4c3a5d22932444fac1acb9e" PRIMARY KEY (id),
           CONSTRAINT "FK_01360859b252604df4efcd735c0" FOREIGN KEY (biosero_order_type_code)
               REFERENCES public.biosero_order_type (code) MATCH SIMPLE
               ON UPDATE NO ACTION
               ON DELETE NO ACTION
       )
       `);
    await queryRunner.query(`insert into biosero_order 
    (id, biosero_identifier, plate_barcode, protocol_configuration, image_event_id, well_position, biosero_order_type_code, metadata,
         acquisition_id, created_by, created_at, modified_by, modified_at) select id, biosero_identifier, plate_barcode, protocol_configuration, 
         image_event_id, well_position, biosero_order_type_code, metadata, acquisition_id, created_by, created_at, modified_by, modified_at 
         from biosero_order_old
       `);

    await queryRunner.query(`DROP TABLE "biosero_order_old"`);   
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `ALTER TABLE biosero_order rename to biosero_order_old`
      );
      await queryRunner.query(`CREATE TABLE IF NOT EXISTS public.biosero_order
         (
             id uuid NOT NULL DEFAULT uuid_generate_v4(),
             biosero_identifier character varying  NOT NULL,
             plate_barcode character varying ,
             protocol_configuration character varying ,
             image_event_id character varying ,
             well_position character varying ,
             biosero_order_type_code character varying  NOT NULL,
             metadata jsonb,
             acquisition_id character varying ,
             created_by uuid NOT NULL,
             created_at timestamp with time zone NOT NULL,
             modified_by uuid NOT NULL,
             modified_at timestamp with time zone NOT NULL,
             CONSTRAINT "PK_666e4c3a5d22932444fac1acb9d" PRIMARY KEY (id),
             CONSTRAINT "FK_01360859b252604df4efcd735c9" FOREIGN KEY (biosero_order_type_code)
                 REFERENCES public.biosero_order_type (code) MATCH SIMPLE
                 ON UPDATE NO ACTION
                 ON DELETE NO ACTION
         )
         `);
      await queryRunner.query(`insert into biosero_order 
      (id, biosero_identifier, plate_barcode, protocol_configuration, image_event_id, well_position, biosero_order_type_code, metadata,
           acquisition_id, created_by, created_at, modified_by, modified_at) select id, biosero_identifier, plate_barcode, protocol_configuration, 
           image_event_id, well_position, biosero_order_type_code, metadata, acquisition_id, created_by, created_at, modified_by, modified_at 
           from biosero_order_old
         `);
  
      await queryRunner.query(`DROP TABLE "biosero_order_old"`);  }
}
