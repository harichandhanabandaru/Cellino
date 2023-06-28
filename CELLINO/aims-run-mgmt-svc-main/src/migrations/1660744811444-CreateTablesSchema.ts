import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablesSchema1660744811444 implements MigrationInterface {
    name = 'CreateTablesSchema1660744811444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "manufacturer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "manufacturer_part_number" character varying, "created_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "modified_by" character varying, "modified_at" TIMESTAMP WITH TIME ZONE, "is_deleted" boolean NOT NULL DEFAULT false,CONSTRAINT "PK_81fc5abca8ed2f6edc79b375eeb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vendor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "vendor_part_number" character varying,"created_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "modified_by" character varying, "modified_at" TIMESTAMP WITH TIME ZONE, "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_931a23f6231a57604f5a0e32780" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "labware" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "labware_type" integer, "attributes" jsonb, "vendor_id" uuid, "manufacturer_id" uuid,"created_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "modified_by" character varying, "modified_at" TIMESTAMP WITH TIME ZONE, "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_315444c6e2763ceda39668d95a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partner" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "type" integer,"created_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "modified_by" character varying, "modified_at" TIMESTAMP WITH TIME ZONE, "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_8f34ff11ddd5459eacbfacd48ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "run" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "start_date" TIMESTAMP WITH TIME ZONE, "run_owner_id" uuid, "run_day" integer, "objective" character varying, "summary" character varying, "status" integer, "clone_review_status" integer, "metadata" json, "partner_id" uuid, "workflow_id" uuid, "phaseId" uuid,"created_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "modified_by" character varying, "modified_at" TIMESTAMP WITH TIME ZONE, "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_804c38ffba92002c6d2c646dd46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workflow" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "objective" character varying, "type" integer, "version" character varying,"created_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "modified_by" character varying, "modified_at" TIMESTAMP WITH TIME ZONE, "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_eb5e4cc1a9ef2e94805b676751b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workflow_phase" ("workflowId" uuid NOT NULL, "phaseId" uuid NOT NULL, "order" character varying NOT NULL, CONSTRAINT "PK_790f1cac553d711abddd472d87e" PRIMARY KEY ("workflowId", "phaseId"))`);
        await queryRunner.query(`CREATE TABLE "protocol" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "protocol_definition_id" uuid, "settings" jsonb,"created_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "modified_by" character varying, "modified_at" TIMESTAMP WITH TIME ZONE, "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_bae34901abddccbddda15ea000c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "phase" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "version" integer, "order" integer, "description" text, "phase_initiation_rules" jsonb, "other_rules" jsonb,"created_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "modified_by" character varying, "modified_at" TIMESTAMP WITH TIME ZONE, "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a9cac5076fb19818ed0f871bea8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "plate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "barcode" character varying, "status" integer, "status_reason" character varying, "reviewers" uuid array, "process_metadata" jsonb, "labware_id" uuid, "phase_id" uuid, "run_id" uuid,"created_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "modified_by" character varying, "modified_at" TIMESTAMP WITH TIME ZONE, "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_eebdaf4c97b73058fba01606616" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "event_type" integer, "started_at" TIMESTAMP, "completed_at" TIMESTAMP, "metadata" jsonb, "protocol_id" uuid, "plate_id" uuid,"created_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "modified_by" character varying, "modified_at" TIMESTAMP WITH TIME ZONE, "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "plate_event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "process_status" integer, "process_status_detail" character varying, "review_status" integer, "analysis_status" integer, "analysis_status_detail" character varying, "event_id" uuid, "plate_id" uuid,"created_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "modified_by" character varying, "modified_at" TIMESTAMP WITH TIME ZONE, "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a94ea14f62a511140b981d12b5d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "instrument" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "manufacturer_part_number" character varying, "vendor_part_number" character varying, "attributes" jsonb, "manufacturer_id" uuid, "vendor_id" uuid,"created_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "modified_by" character varying, "modified_at" TIMESTAMP WITH TIME ZONE, "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_1707dc7e7c2845211b38bef3d29" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "protocol_definition" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "parameters" jsonb, "protocol_definition_id" uuid, "related_id" uuid,"created_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "modified_by" character varying, "modified_at" TIMESTAMP WITH TIME ZONE, "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_069f2559e4e78e23975d2ac893e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "run_metric" ("run_id" uuid NOT NULL, "original_plate_count" integer NOT NULL, "original_well_count" integer NOT NULL, "plates_count" integer NOT NULL, "wells_count" integer NOT NULL, "active_plates_count" integer NOT NULL, "active_wells_count" integer NOT NULL, "modified_at" TIMESTAMP, "modified_by" character varying, CONSTRAINT "REL_add0b28fcdf1d128a08b83d62e" UNIQUE ("run_id"), CONSTRAINT "PK_add0b28fcdf1d128a08b83d62e6" PRIMARY KEY ("run_id"))`);
        await queryRunner.query(`CREATE TABLE "phase_protocol" ("phaseId" uuid NOT NULL, "protocolId" uuid NOT NULL, CONSTRAINT "PK_3527065eec4f08b1c84c63315ee" PRIMARY KEY ("phaseId", "protocolId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0415c9bb94951c3a531acfa7e5" ON "phase_protocol" ("phaseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c350ec1f0ff0fc8689846b2a9a" ON "phase_protocol" ("protocolId") `);
        await queryRunner.query(`ALTER TABLE "labware" ADD CONSTRAINT "FK_d048e2a402c2bba73da245c86cc" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "labware" ADD CONSTRAINT "FK_487ce7b05fc3497239ba9a332fa" FOREIGN KEY ("manufacturer_id") REFERENCES "manufacturer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "run" ADD CONSTRAINT "FK_44ade7032169cc3e307f9d6f012" FOREIGN KEY ("partner_id") REFERENCES "partner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "run" ADD CONSTRAINT "FK_ad8fe16bf3886bbac3cd72ef63a" FOREIGN KEY ("workflow_id") REFERENCES "workflow"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "run" ADD CONSTRAINT "FK_82876e9b408253c6e6afa81d382" FOREIGN KEY ("phaseId") REFERENCES "phase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workflow_phase" ADD CONSTRAINT "FK_51114c01f91b4cdc6d3ad8a3815" FOREIGN KEY ("workflowId") REFERENCES "workflow"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workflow_phase" ADD CONSTRAINT "FK_38b44479fa5a42c33e08bbee6c3" FOREIGN KEY ("phaseId") REFERENCES "phase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plate" ADD CONSTRAINT "FK_5e17257ae081b656473414039fe" FOREIGN KEY ("labware_id") REFERENCES "labware"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plate" ADD CONSTRAINT "FK_ece2ae80da12479eb8e58d1b23a" FOREIGN KEY ("phase_id") REFERENCES "phase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plate" ADD CONSTRAINT "FK_befba403a3dab5390336c18912c" FOREIGN KEY ("run_id") REFERENCES "run"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_9f53f2fd6a23cb6251c278ef935" FOREIGN KEY ("protocol_id") REFERENCES "protocol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_14d5e4d5f5e229ba0926170c60e" FOREIGN KEY ("plate_id") REFERENCES "plate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plate_event" ADD CONSTRAINT "FK_8d62d6c3b073234db2e148ab4f1" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plate_event" ADD CONSTRAINT "FK_ed582684af5545b61d9a71727ee" FOREIGN KEY ("plate_id") REFERENCES "plate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instrument" ADD CONSTRAINT "FK_1e0ccb70bf77ec9c940a91e2361" FOREIGN KEY ("manufacturer_id") REFERENCES "manufacturer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instrument" ADD CONSTRAINT "FK_40aa20ef12a2252b27226f736ff" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "protocol_definition" ADD CONSTRAINT "FK_b46536326c29d349d2d8d06ecaa" FOREIGN KEY ("related_id") REFERENCES "instrument"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "run_metric" ADD CONSTRAINT "FK_add0b28fcdf1d128a08b83d62e6" FOREIGN KEY ("run_id") REFERENCES "run"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "phase_protocol" ADD CONSTRAINT "FK_0415c9bb94951c3a531acfa7e55" FOREIGN KEY ("phaseId") REFERENCES "phase"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "phase_protocol" ADD CONSTRAINT "FK_c350ec1f0ff0fc8689846b2a9ac" FOREIGN KEY ("protocolId") REFERENCES "protocol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phase_protocol" DROP CONSTRAINT "FK_c350ec1f0ff0fc8689846b2a9ac"`);
        await queryRunner.query(`ALTER TABLE "phase_protocol" DROP CONSTRAINT "FK_0415c9bb94951c3a531acfa7e55"`);
        await queryRunner.query(`ALTER TABLE "run_metric" DROP CONSTRAINT "FK_add0b28fcdf1d128a08b83d62e6"`);
        await queryRunner.query(`ALTER TABLE "protocol_definition" DROP CONSTRAINT "FK_b46536326c29d349d2d8d06ecaa"`);
        await queryRunner.query(`ALTER TABLE "instrument" DROP CONSTRAINT "FK_40aa20ef12a2252b27226f736ff"`);
        await queryRunner.query(`ALTER TABLE "instrument" DROP CONSTRAINT "FK_1e0ccb70bf77ec9c940a91e2361"`);
        await queryRunner.query(`ALTER TABLE "plate_event" DROP CONSTRAINT "FK_ed582684af5545b61d9a71727ee"`);
        await queryRunner.query(`ALTER TABLE "plate_event" DROP CONSTRAINT "FK_8d62d6c3b073234db2e148ab4f1"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_14d5e4d5f5e229ba0926170c60e"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_9f53f2fd6a23cb6251c278ef935"`);
        await queryRunner.query(`ALTER TABLE "plate" DROP CONSTRAINT "FK_befba403a3dab5390336c18912c"`);
        await queryRunner.query(`ALTER TABLE "plate" DROP CONSTRAINT "FK_ece2ae80da12479eb8e58d1b23a"`);
        await queryRunner.query(`ALTER TABLE "plate" DROP CONSTRAINT "FK_5e17257ae081b656473414039fe"`);
        await queryRunner.query(`ALTER TABLE "workflow_phase" DROP CONSTRAINT "FK_38b44479fa5a42c33e08bbee6c3"`);
        await queryRunner.query(`ALTER TABLE "workflow_phase" DROP CONSTRAINT "FK_51114c01f91b4cdc6d3ad8a3815"`);
        await queryRunner.query(`ALTER TABLE "run" DROP CONSTRAINT "FK_82876e9b408253c6e6afa81d382"`);
        await queryRunner.query(`ALTER TABLE "run" DROP CONSTRAINT "FK_ad8fe16bf3886bbac3cd72ef63a"`);
        await queryRunner.query(`ALTER TABLE "run" DROP CONSTRAINT "FK_44ade7032169cc3e307f9d6f012"`);
        await queryRunner.query(`ALTER TABLE "labware" DROP CONSTRAINT "FK_487ce7b05fc3497239ba9a332fa"`);
        await queryRunner.query(`ALTER TABLE "labware" DROP CONSTRAINT "FK_d048e2a402c2bba73da245c86cc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c350ec1f0ff0fc8689846b2a9a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0415c9bb94951c3a531acfa7e5"`);
        await queryRunner.query(`DROP TABLE "phase_protocol"`);
        await queryRunner.query(`DROP TABLE "run_metric"`);
        await queryRunner.query(`DROP TABLE "protocol_definition"`);
        await queryRunner.query(`DROP TABLE "instrument"`);
        await queryRunner.query(`DROP TABLE "plate_event"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "plate"`);
        await queryRunner.query(`DROP TABLE "phase"`);
        await queryRunner.query(`DROP TABLE "protocol"`);
        await queryRunner.query(`DROP TABLE "workflow_phase"`);
        await queryRunner.query(`DROP TABLE "workflow"`);
        await queryRunner.query(`DROP TABLE "run"`);
        await queryRunner.query(`DROP TABLE "partner"`);
        await queryRunner.query(`DROP TABLE "labware"`);
        await queryRunner.query(`DROP TABLE "vendor"`);
        await queryRunner.query(`DROP TABLE "manufacturer"`);
    }

}
