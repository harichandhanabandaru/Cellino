import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsBaseImageToImageEvent1677496320905
  implements MigrationInterface
{
  name = "AddIsBaseImageToImageEvent1677496320905";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE image_event  
        ADD COLUMN is_base_image boolean NOT NULL DEFAULT false`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE image_event DROP COLUMN is_base_image`
    );
  }
}
