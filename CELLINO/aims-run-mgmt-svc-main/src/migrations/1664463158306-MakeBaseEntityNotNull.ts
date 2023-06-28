import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeBaseEntityNotNull1664463158306 implements MigrationInterface {
    name = 'MakeBaseEntityNotNull1664463158306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `ALTER TABLE IF EXISTS event 
                            ALTER COLUMN created_by  SET NOT NULL ,
                            ALTER COLUMN modified_by  SET NOT NULL,
                            ALTER COLUMN created_at  SET NOT NULL ,
                            ALTER COLUMN modified_at  SET NOT NULL;`
        );
        await queryRunner.query(
            `ALTER TABLE IF EXISTS instrument 
                              ALTER COLUMN created_by  SET NOT NULL ,
                              ALTER COLUMN modified_by  SET NOT NULL,
                              ALTER COLUMN created_at  SET NOT NULL ,
                              ALTER COLUMN modified_at  SET NOT NULL;`
          );
        await queryRunner.query(
            `ALTER TABLE IF EXISTS labware 
                              ALTER COLUMN created_by  SET NOT NULL ,
                              ALTER COLUMN modified_by  SET NOT NULL,
                              ALTER COLUMN created_at  SET NOT NULL ,
                              ALTER COLUMN modified_at  SET NOT NULL;`
        );
        await queryRunner.query(
            `ALTER TABLE IF EXISTS manufacturer 
                              ALTER COLUMN created_by  SET NOT NULL ,
                              ALTER COLUMN modified_by  SET NOT NULL,
                              ALTER COLUMN created_at  SET NOT NULL ,
                              ALTER COLUMN modified_at  SET NOT NULL;`
        );
        await queryRunner.query(
            `ALTER TABLE IF EXISTS partner 
                              ALTER COLUMN created_by  SET NOT NULL ,
                              ALTER COLUMN modified_by  SET NOT NULL,
                              ALTER COLUMN created_at  SET NOT NULL ,
                              ALTER COLUMN modified_at  SET NOT NULL;`
        );
        await queryRunner.query(
            `ALTER TABLE IF EXISTS phase 
                              ALTER COLUMN created_by  SET NOT NULL ,
                              ALTER COLUMN modified_by  SET NOT NULL,
                              ALTER COLUMN created_at  SET NOT NULL ,
                              ALTER COLUMN modified_at  SET NOT NULL;`
        );
        await queryRunner.query(
            `ALTER TABLE IF EXISTS plate 
                              ALTER COLUMN created_by  SET NOT NULL ,
                              ALTER COLUMN modified_by  SET NOT NULL,
                              ALTER COLUMN created_at  SET NOT NULL ,
                              ALTER COLUMN modified_at  SET NOT NULL;`
        );
        await queryRunner.query(
            `ALTER TABLE IF EXISTS plate_event 
                              ALTER COLUMN created_by  SET NOT NULL ,
                              ALTER COLUMN modified_by  SET NOT NULL,
                              ALTER COLUMN created_at  SET NOT NULL ,
                              ALTER COLUMN modified_at  SET NOT NULL;`
        );
        await queryRunner.query(
            `ALTER TABLE IF EXISTS protocol 
                              ALTER COLUMN created_by  SET NOT NULL ,
                              ALTER COLUMN modified_by  SET NOT NULL,
                              ALTER COLUMN created_at  SET NOT NULL ,
                              ALTER COLUMN modified_at  SET NOT NULL;`
        );
        await queryRunner.query(
            `ALTER TABLE IF EXISTS protocol_definition 
                              ALTER COLUMN created_by  SET NOT NULL ,
                              ALTER COLUMN modified_by  SET NOT NULL,
                              ALTER COLUMN created_at  SET NOT NULL ,
                              ALTER COLUMN modified_at  SET NOT NULL;`
        );
        await queryRunner.query(
            `ALTER TABLE IF EXISTS run 
                              ALTER COLUMN created_by  SET NOT NULL ,
                              ALTER COLUMN modified_by  SET NOT NULL,
                              ALTER COLUMN created_at  SET NOT NULL ,
                              ALTER COLUMN modified_at  SET NOT NULL;`
        );
        await queryRunner.query(
            `ALTER TABLE IF EXISTS vendor 
                              ALTER COLUMN created_by  SET NOT NULL ,
                              ALTER COLUMN modified_by  SET NOT NULL,
                              ALTER COLUMN created_at  SET NOT NULL ,
                              ALTER COLUMN modified_at  SET NOT NULL;`
        );
        await queryRunner.query(
            `ALTER TABLE IF EXISTS workflow 
                              ALTER COLUMN created_by  SET NOT NULL ,
                              ALTER COLUMN modified_by  SET NOT NULL,
                              ALTER COLUMN created_at  SET NOT NULL ,
                              ALTER COLUMN modified_at  SET NOT NULL;`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE IF EXISTS event 
                              ALTER COLUMN created_by  SET NULL ,
                              ALTER COLUMN modified_by  SET NULL,
                              ALTER COLUMN created_at  SET NULL ,
                              ALTER COLUMN modified_at  SET NULL;`
          );
          await queryRunner.query(
              `ALTER TABLE IF EXISTS instrument 
                                ALTER COLUMN created_by  SET NULL ,
                                ALTER COLUMN modified_by  SET NULL,
                                ALTER COLUMN created_at  SET NULL ,
                                ALTER COLUMN modified_at  SET NULL;`
            );
          await queryRunner.query(
              `ALTER TABLE IF EXISTS labware 
                                ALTER COLUMN created_by  SET NULL ,
                                ALTER COLUMN modified_by  SET NULL,
                                ALTER COLUMN created_at  SET NULL ,
                                ALTER COLUMN modified_at  SET NULL;`
          );
          await queryRunner.query(
              `ALTER TABLE IF EXISTS manufacturer 
                                ALTER COLUMN created_by  SET NULL ,
                                ALTER COLUMN modified_by  SET NULL,
                                ALTER COLUMN created_at  SET NULL ,
                                ALTER COLUMN modified_at  SET NULL;`
          );
          await queryRunner.query(
              `ALTER TABLE IF EXISTS partner 
                                ALTER COLUMN created_by  SET NULL ,
                                ALTER COLUMN modified_by  SET NULL,
                                ALTER COLUMN created_at  SET NULL ,
                                ALTER COLUMN modified_at  SET NULL;`
          );
          await queryRunner.query(
              `ALTER TABLE IF EXISTS phase 
                                ALTER COLUMN created_by  SET NULL ,
                                ALTER COLUMN modified_by  SET NULL,
                                ALTER COLUMN created_at  SET NULL ,
                                ALTER COLUMN modified_at  SET NULL;`
          );
          await queryRunner.query(
              `ALTER TABLE IF EXISTS plate 
                                ALTER COLUMN created_by  SET NULL ,
                                ALTER COLUMN modified_by  SET NULL,
                                ALTER COLUMN created_at  SET NULL ,
                                ALTER COLUMN modified_at  SET NULL;`
          );
          await queryRunner.query(
              `ALTER TABLE IF EXISTS plate_event 
                                ALTER COLUMN created_by  SET NULL ,
                                ALTER COLUMN modified_by  SET NULL,
                                ALTER COLUMN created_at  SET NULL ,
                                ALTER COLUMN modified_at  SET NULL;`
          );
          await queryRunner.query(
              `ALTER TABLE IF EXISTS protocol 
                                ALTER COLUMN created_by  SET NULL ,
                                ALTER COLUMN modified_by  SET NULL,
                                ALTER COLUMN created_at  SET NULL ,
                                ALTER COLUMN modified_at  SET NULL;`
          );
          await queryRunner.query(
              `ALTER TABLE IF EXISTS protocol_definition 
                                ALTER COLUMN created_by  SET NULL ,
                                ALTER COLUMN modified_by  SET NULL,
                                ALTER COLUMN created_at  SET NULL ,
                                ALTER COLUMN modified_at  SET NULL;`
          );
          await queryRunner.query(
              `ALTER TABLE IF EXISTS run 
                                ALTER COLUMN created_by  SET NULL ,
                                ALTER COLUMN modified_by  SET NULL,
                                ALTER COLUMN created_at  SET NULL ,
                                ALTER COLUMN modified_at  SET NULL;`
          );
          await queryRunner.query(
              `ALTER TABLE IF EXISTS vendor 
                                ALTER COLUMN created_by  SET NULL ,
                                ALTER COLUMN modified_by  SET NULL,
                                ALTER COLUMN created_at  SET NULL ,
                                ALTER COLUMN modified_at  SET NULL;`
          );
          await queryRunner.query(
              `ALTER TABLE IF EXISTS workflow 
                                ALTER COLUMN created_by  SET NULL ,
                                ALTER COLUMN modified_by  SET NULL,
                                ALTER COLUMN created_at  SET NULL ,
                                ALTER COLUMN modified_at  SET NULL;`
          );
    }

}
