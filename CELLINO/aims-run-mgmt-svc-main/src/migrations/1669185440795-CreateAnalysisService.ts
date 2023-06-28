import { MigrationInterface, QueryRunner } from "typeorm";

export class AnaylsisService1669109075920 implements MigrationInterface {
    name = 'AnaylsisService1669109075920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "analysis_service" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "metadata" jsonb,
                "is_active" boolean NOT NULL,
                "created_by" uuid NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "modified_by" uuid NOT NULL,
                "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                CONSTRAINT "UQ_128ad10dc57cee2e365ddbde8c3" UNIQUE ("name"),
                CONSTRAINT "PK_1cbea0f5c5fa03cc3a45b746138" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "analysis_service"
        `);
    }

}
