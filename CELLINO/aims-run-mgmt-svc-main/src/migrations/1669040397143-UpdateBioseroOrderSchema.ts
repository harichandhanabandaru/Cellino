import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBioseroOrderSchema1669040397143
  implements MigrationInterface
{
  name = "UpdateBioseroOrderSchema1669040397143";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "biosero_order_type" CASCADE`);
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS public.biosero_order_type
      (
          id uuid NOT NULL DEFAULT uuid_generate_v4(),
          code character varying COLLATE pg_catalog."default" NOT NULL,
          label character varying COLLATE pg_catalog."default" NOT NULL,
          description character varying,
          created_by uuid NOT NULL,
          created_at timestamp with time zone NOT NULL,
          modified_by uuid NOT NULL,
          modified_at timestamp with time zone NOT NULL,
          CONSTRAINT "PK_42868d2811ce010ce566f3ff310" PRIMARY KEY (id),
          CONSTRAINT "UQ_66fefcb1d26abaa61dab6648b1e" UNIQUE (code)
      )
      `
    );
    await queryRunner.query(`DROP TABLE "biosero_order_status" CASCADE`);
    //as there is no existing data we are deleting it and recreating it
    await queryRunner.query(`DROP TABLE "biosero_order"`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS public.biosero_order
    (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        biosero_identifier character varying NOT NULL,
        plate_barcode character varying COLLATE pg_catalog."default",
        protocol_configuration character varying COLLATE pg_catalog."default" ,
        image_event_id character varying COLLATE pg_catalog."default",
        well_position character varying COLLATE pg_catalog."default",
        biosero_order_type_code character varying NOT NULL,
        metadata jsonb,
        acquisition_id character varying,
        created_by uuid NOT NULL,
        created_at timestamp with time zone NOT NULL,
        modified_by uuid NOT NULL,
        modified_at timestamp with time zone NOT NULL,
        CONSTRAINT "PK_666e4c3a5d22932444fac1acb9d" PRIMARY KEY (id),
        CONSTRAINT "FK_01360859b252604df4efcd735c9" FOREIGN KEY (biosero_order_type_code)
            REFERENCES public.biosero_order_type (code) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
            NOT VALID)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS public.biosero_order_status
      (
          id uuid NOT NULL DEFAULT uuid_generate_v4(),
          code character varying COLLATE pg_catalog."default" NOT NULL,
          label character varying COLLATE pg_catalog."default" NOT NULL,
          created_by uuid NOT NULL,
          created_at timestamp with time zone NOT NULL,
          modified_by uuid NOT NULL,
          modified_at timestamp with time zone NOT NULL,
          CONSTRAINT "PK_3caf94e5648f1664eac92378359" PRIMARY KEY (id),
          CONSTRAINT "UQ_918ba56edd98dffae1af00cd880" UNIQUE (code)
      )
      `
    );
    await queryRunner.query(
      `ALTER TABLE "biosero_order_type" DROP COLUMN "description"`
    );

    await queryRunner.query(`DROP TABLE "biosero_order"`);
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS public.biosero_order
      (
          id uuid NOT NULL DEFAULT uuid_generate_v4(),
          metadata jsonb NOT NULL,
          plate_barcode character varying COLLATE pg_catalog."default" NOT NULL,
          protocol_configuration character varying COLLATE pg_catalog."default" NOT NULL,
          well_position character varying COLLATE pg_catalog."default",
          created_by uuid NOT NULL,
          created_at timestamp with time zone NOT NULL,
          modified_by uuid NOT NULL,
          modified_at timestamp with time zone NOT NULL,
          biosero_order_type_id uuid,
          biosero_order_status_id uuid,
          CONSTRAINT "PK_666e4c3a5d22932444fac1acb9c" PRIMARY KEY (id),
          CONSTRAINT "FK_01360859b252604df4efcd735c8" FOREIGN KEY (biosero_order_type_id)
              REFERENCES public.biosero_order_type (id) MATCH SIMPLE
              ON UPDATE NO ACTION
              ON DELETE NO ACTION
              NOT VALID,
          CONSTRAINT "FK_9dbc317ea8f5900b38e51b03afb" FOREIGN KEY (biosero_order_status_id)
              REFERENCES public.biosero_order_status (id) MATCH SIMPLE
              ON UPDATE NO ACTION
              ON DELETE NO ACTION
              NOT VALID
      )
      
      `
    );
  }
}
