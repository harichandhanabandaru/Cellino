import { MigrationInterface, QueryRunner } from "typeorm";

export class ObjectCachingRulesMigration1677749781628
  implements MigrationInterface
{
  name = "ObjectCachingRulesMigration1677749781628";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            TRUNCATE TABLE object_caching_rule;
        `);
    await queryRunner.query(`
            Insert into object_caching_rule (object_pattern, cache_control, created_by, created_at, modified_by, modified_at) values
            ('([a-zA-Z0-9\\s_\\/.\\-:])+(\\.jpg)', 'private, max-age=31536000,stale-while-revalidate=3600', '00000000-0000-0000-0000-000000000000', current_timestamp, '00000000-0000-0000-0000-000000000000', current_timestamp),
            ('([a-zA-Z0-9\\s_\\/.\\-:])+(\\.webp)', 'private, max-age=31536000,stale-while-revalidate=3600', '00000000-0000-0000-0000-000000000000', current_timestamp, '00000000-0000-0000-0000-000000000000', current_timestamp),
            ('([a-zA-Z0-9\\s_\\/.\\-:])+(\\d+\\.\\d+\\.\\d+\\.\\d+\\.\\d+)', 'private, max-age=31536000,stale-while-revalidate=3600', '00000000-0000-0000-0000-000000000000', current_timestamp, '00000000-0000-0000-0000-000000000000', current_timestamp),
            ('([a-zA-Z0-9\\s_\\/.\\-:])+(\\.json)', 'private, max-age=31536000,stale-while-revalidate=3600', '00000000-0000-0000-0000-000000000000', current_timestamp, '00000000-0000-0000-0000-000000000000', current_timestamp),
            ('([a-zA-Z0-9\\s_\\/.\\-:])+(\\.zgroup)', 'no-store', '00000000-0000-0000-0000-000000000000', current_timestamp, '00000000-0000-0000-0000-000000000000', current_timestamp),
            ('([a-zA-Z0-9\\s_\\/.\\-:])+(\\.zattrs)', 'no-store', '00000000-0000-0000-0000-000000000000', current_timestamp, '00000000-0000-0000-0000-000000000000', current_timestamp),
            ('([a-zA-Z0-9\\s_\\/.\\-:])+(\\.zarray)', 'no-store', '00000000-0000-0000-0000-000000000000', current_timestamp, '00000000-0000-0000-0000-000000000000', current_timestamp),
            ('([a-zA-Z0-9\\s_\\/.\\-:])+(\\.zmetadata)', 'no-store', '00000000-0000-0000-0000-000000000000', current_timestamp, '00000000-0000-0000-0000-000000000000', current_timestamp);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            TRUNCATE TABLE object_caching_rule;
    `);
  }
}
