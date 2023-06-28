import { MigrationInterface, QueryRunner } from 'typeorm';

export class TimeStampMigration1679047761795 implements MigrationInterface {
  name = 'TimeStampMigration1679047761795';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "action"
            DROP COLUMN "created_at",
            DROP COLUMN "modified_at",
            ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            ADD "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "condition"
            DROP COLUMN "created_at",
            DROP COLUMN "modified_at",
            ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            ADD "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "subject"
            DROP COLUMN "created_at",
            DROP COLUMN "modified_at",
            ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            ADD "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "field"
            DROP COLUMN "created_at",
            DROP COLUMN "modified_at",
            ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            ADD "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "role"
            DROP COLUMN "created_at",
            DROP COLUMN "modified_at",
            ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            ADD "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "user" 
            DROP COLUMN "created_at",
            DROP COLUMN "modified_at",
            ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            ADD "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "action"
            DROP COLUMN "created_at",
            DROP COLUMN "modified_at",
            ADD "created_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(),
            ADD "modified_at" TIME WITH TIME ZONE NOT NULL DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "condition"
            DROP COLUMN "created_at",
            DROP COLUMN "modified_at",
            ADD "created_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(),
            ADD "modified_at" TIME WITH TIME ZONE NOT NULL DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "subject"
            DROP COLUMN "created_at",
            DROP COLUMN "modified_at",
            ADD "created_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(),
            ADD "modified_at" TIME WITH TIME ZONE NOT NULL DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "field"
            DROP COLUMN "created_at",
            DROP COLUMN "modified_at",
            ADD "created_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(),
            ADD "modified_at" TIME WITH TIME ZONE NOT NULL DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "role"
            DROP COLUMN "created_at",
            DROP COLUMN "modified_at",
            ADD "created_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(),
            ADD "modified_at" TIME WITH TIME ZONE NOT NULL DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "user" 
            DROP COLUMN "created_at",
            DROP COLUMN "modified_at",
            ADD "created_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(),
            ADD "modified_at" TIME WITH TIME ZONE NOT NULL DEFAULT now()
        `);
  }
}
