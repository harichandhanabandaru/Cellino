import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedByTypeChanges1663921019238 implements MigrationInterface {
    name = 'CreatedByTypeChanges1663921019238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE IF EXISTS event ALTER COLUMN modified_by TYPE uuid USING modified_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS event ALTER COLUMN created_by TYPE uuid USING created_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS instrument ALTER COLUMN modified_by TYPE uuid USING modified_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS instrument ALTER COLUMN created_by TYPE uuid  USING created_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS labware ALTER COLUMN modified_by TYPE uuid USING modified_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS labware ALTER COLUMN created_by TYPE uuid USING created_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS manufacturer ALTER COLUMN modified_by TYPE uuid USING modified_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS manufacturer ALTER COLUMN created_by TYPE uuid USING created_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS partner ALTER COLUMN modified_by TYPE uuid USING modified_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS partner ALTER COLUMN created_by TYPE uuid USING created_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS phase ALTER COLUMN modified_by TYPE uuid USING modified_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS phase ALTER COLUMN created_by TYPE uuid USING created_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS plate ALTER COLUMN modified_by TYPE uuid USING modified_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS plate ALTER COLUMN created_by TYPE uuid USING created_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS plate_event ALTER COLUMN modified_by TYPE uuid USING modified_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS plate_event ALTER COLUMN created_by TYPE uuid USING created_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS protocol ALTER COLUMN modified_by TYPE uuid USING modified_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS protocol ALTER COLUMN created_by TYPE uuid USING created_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS protocol_definition ALTER COLUMN modified_by TYPE uuid USING modified_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS protocol_definition ALTER COLUMN created_by TYPE uuid USING created_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS run ALTER COLUMN modified_by TYPE uuid USING modified_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS run ALTER COLUMN created_by TYPE uuid USING created_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS run_metric ALTER COLUMN modified_by TYPE uuid USING modified_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS vendor ALTER COLUMN modified_by TYPE uuid USING modified_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS vendor ALTER COLUMN created_by TYPE uuid USING created_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS workflow ALTER COLUMN modified_by TYPE uuid USING modified_by::uuid`);
        await queryRunner.query(`ALTER TABLE IF EXISTS workflow ALTER COLUMN created_by TYPE uuid USING created_by::uuid`);
           }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE IF EXISTS event ALTER COLUMN modified_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS event ALTER COLUMN created_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS instrument ALTER COLUMN modified_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS instrument ALTER COLUMN created_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS labware ALTER COLUMN modified_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS labware ALTER COLUMN created_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS manufacturer ALTER COLUMN modified_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS manufacturer ALTER COLUMN created_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS partner ALTER COLUMN modified_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS partner ALTER COLUMN created_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS phase ALTER COLUMN modified_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS phase ALTER COLUMN created_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS plate ALTER COLUMN modified_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS plate ALTER COLUMN created_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS plate_event ALTER COLUMN modified_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS plate_event ALTER COLUMN created_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS protocol ALTER COLUMN modified_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS protocol ALTER COLUMN created_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS protocol_definition ALTER COLUMN modified_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS protocol_definition ALTER COLUMN created_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS run ALTER COLUMN modified_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS run ALTER COLUMN created_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS run_metric ALTER COLUMN modified_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS vendor ALTER COLUMN modified_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS vendor ALTER COLUMN created_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS workflow ALTER COLUMN modified_by TYPE character varying`);
        await queryRunner.query(`ALTER TABLE IF EXISTS workflow ALTER COLUMN created_by TYPE character varying`);
    }

}
