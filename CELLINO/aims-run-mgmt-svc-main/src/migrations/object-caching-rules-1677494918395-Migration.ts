import { MigrationInterface, QueryRunner } from "typeorm";

export class ObjectCachingRules1677494918395 implements MigrationInterface {
  name = "Object_caching_rules_1677494918395";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            Insert into object_caching_rule (object_pattern, cache_control, created_by, created_at, modified_by, modified_at) values
            ('([a-zA-Z0-9s_/.-:])+(.jpg)', 'private, max-age=3600,stale-while-revalidate=3600', '00000000-0000-0000-0000-000000000000', current_timestamp, '00000000-0000-0000-0000-000000000000', current_timestamp),
            ('([a-zA-Z0-9s_/.-:])+(.webp)', 'private, max-age=3600,stale-while-revalidate=3600', '00000000-0000-0000-0000-000000000000', current_timestamp, '00000000-0000-0000-0000-000000000000', current_timestamp),
            ('([a-zA-Z0-9\s_\/.\-:])+(\d+\.\d+\.\d+\.\d+\.\d+)', 'private, max-age=3600,stale-while-revalidate=3600', '00000000-0000-0000-0000-000000000000', current_timestamp, '00000000-0000-0000-0000-000000000000', current_timestamp),
            ('([a-zA-Z0-9s_/.-:])+(.json)', 'private, max-age=3600,stale-while-revalidate=3600', '00000000-0000-0000-0000-000000000000', current_timestamp, '00000000-0000-0000-0000-000000000000', current_timestamp),
            ('([a-zA-Z0-9s_/.-:])+(.zgroup)', 'no-cache', '00000000-0000-0000-0000-000000000000', current_timestamp, '00000000-0000-0000-0000-000000000000', current_timestamp),
            ('([a-zA-Z0-9s_/.-:])+(.zattrs)', 'no-cache', '00000000-0000-0000-0000-000000000000', current_timestamp, '00000000-0000-0000-0000-000000000000', current_timestamp),
            ('([a-zA-Z0-9s_/.-:])+(.zarray)', 'no-cache', '00000000-0000-0000-0000-000000000000', current_timestamp, '00000000-0000-0000-0000-000000000000', current_timestamp),
            ('([a-zA-Z0-9s_/.-:])+(.zmetadata)', 'no-cache', '00000000-0000-0000-0000-000000000000', current_timestamp, '00000000-0000-0000-0000-000000000000', current_timestamp)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            TRUNCATE TABLE object_caching_rule;
        `);
  }
}
