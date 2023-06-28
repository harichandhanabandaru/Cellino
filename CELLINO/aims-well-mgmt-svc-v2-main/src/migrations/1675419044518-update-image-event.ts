import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateImageEvent1675419044518 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE image_event ALTER COLUMN name TYPE varchar(100)`);
    await queryRunner.query(`ALTER TABLE image_event ALTER COLUMN protocol_id SET NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE image_event ALTER COLUMN name TYPE varchar(50)`);
    await queryRunner.query(`ALTER TABLE image_event ALTER COLUMN protocol_id DROP NOT NULL`);
  }
}
