import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1661165611078 implements MigrationInterface {
  name = 'Migration1661165611078';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "actions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(50) NOT NULL,
                "created_by" uuid NOT NULL,
                "created_at" TIME WITH TIME ZONE NOT NULL,
                "modified_by" uuid NOT NULL,
                "modified_at" TIME WITH TIME ZONE NOT NULL,
                "active" boolean NOT NULL,
                CONSTRAINT "PK_7bfb822f56be449c0b8adbf83cf" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "conditions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "value" character varying NOT NULL,
                "created_by" uuid NOT NULL,
                "created_at" TIME WITH TIME ZONE NOT NULL,
                "modified_by" uuid NOT NULL,
                "modified_at" TIME WITH TIME ZONE NOT NULL,
                "active" boolean NOT NULL,
                CONSTRAINT "PK_3938bdf2933c08ac7af7e0e15e7" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "subjects" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(50) NOT NULL,
                "created_by" uuid NOT NULL,
                "created_at" TIME WITH TIME ZONE NOT NULL,
                "modified_by" uuid NOT NULL,
                "modified_at" TIME WITH TIME ZONE NOT NULL,
                "active" boolean NOT NULL,
                CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "fields" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(50) NOT NULL,
                "subject_id" uuid,
                "created_by" uuid NOT NULL,
                "created_at" TIME WITH TIME ZONE NOT NULL,
                "modified_by" uuid NOT NULL,
                "modified_at" TIME WITH TIME ZONE NOT NULL,
                "active" boolean NOT NULL,
                CONSTRAINT "PK_ee7a215c6cd77a59e2cb3b59d41" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "roles" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(50) NOT NULL,
                "rule" jsonb array NOT NULL DEFAULT '{}',
                "created_by" uuid NOT NULL,
                "created_at" TIME WITH TIME ZONE NOT NULL,
                "modified_by" uuid NOT NULL,
                "modified_at" TIME WITH TIME ZONE NOT NULL,
                "active" boolean NOT NULL,
                CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "first_name" character varying(50),
                "last_name" character varying(50),
                "email" character varying NOT NULL,
                "role_id" uuid,
                "created_by" uuid NOT NULL,
                "created_at" TIME WITH TIME ZONE NOT NULL,
                "modified_by" uuid NOT NULL,
                "modified_at" TIME WITH TIME ZONE NOT NULL,
                "active" boolean NOT NULL,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "fields"
            ADD CONSTRAINT "FK_837c13bdd5111204e79ddbb9d5d" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"
        `);
    await queryRunner.query(`
            ALTER TABLE "fields" DROP CONSTRAINT "FK_837c13bdd5111204e79ddbb9d5d"
        `);
    await queryRunner.query(`
            DROP TABLE "users"
        `);
    await queryRunner.query(`
            DROP TABLE "roles"
        `);
    await queryRunner.query(`
            DROP TABLE "fields"
        `);
    await queryRunner.query(`
            DROP TABLE "subjects"
        `);
    await queryRunner.query(`
            DROP TABLE "conditions"
        `);
    await queryRunner.query(`
            DROP TABLE "actions"
        `);
  }
}
