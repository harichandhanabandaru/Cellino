import { MigrationInterface, QueryRunner } from "typeorm";

export class ChannelType1677243669822 implements MigrationInterface {
  name = "ChannelType1677243669822";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS public.channel_type
        (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            code character varying(50)  NOT NULL,
            label character varying(50)  NOT NULL,
            description character varying ,
            is_active boolean NOT NULL DEFAULT true,
            created_by uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::uuid,
            created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
            modified_by uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::uuid,
            modified_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT "PK_channel_type" PRIMARY KEY (id),
            CONSTRAINT "UQ_channel_type.code" UNIQUE (code)
        )
        `);

    await queryRunner.query(`INSERT INTO public.channel_type(
          id, code, label)
          VALUES (uuid_generate_v4(), 'BRT', 'Brightfield'),
          (uuid_generate_v4(), 'FLOUR', 'Flourescence'),
          (uuid_generate_v4(), 'VIRTUAL', 'Virtual')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP table channel_type`);
  }
}
