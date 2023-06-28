import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1662037020041 implements MigrationInterface {
  name = 'Migration1662037020041';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "actions" RENAME TO "action"
        `);
    await queryRunner.query(`
            ALTER TABLE "conditions" RENAME TO "condition"
        `);
    await queryRunner.query(`
            ALTER TABLE "subjects" RENAME TO "subject"
        `);
    await queryRunner.query(`
            ALTER TABLE "fields" RENAME TO "field"
        `);
    await queryRunner.query(`
            ALTER TABLE "roles" RENAME TO "role"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" RENAME TO "user"
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "action" RENAME TO "actions"
        `);
    await queryRunner.query(`
            ALTER TABLE "condition" RENAME TO "conditions"
        `);
    await queryRunner.query(`
            ALTER TABLE "subject" RENAME TO "subjects"
        `);
    await queryRunner.query(`
            ALTER TABLE "field" RENAME TO "fields"
        `);
    await queryRunner.query(`
            ALTER TABLE "role" RENAME TO "roles"
        `);
    await queryRunner.query(`
            ALTER TABLE "user" RENAME TO "users"
        `);
  }
}
