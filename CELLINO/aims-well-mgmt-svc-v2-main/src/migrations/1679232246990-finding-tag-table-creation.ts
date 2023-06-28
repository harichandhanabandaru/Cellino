import { MigrationInterface, QueryRunner } from "typeorm";

export class FindingTagTableCreation1679232246990
  implements MigrationInterface
{
  name = "FindingTagTableCreation1679232246990";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE finding_tag (
            tag_id uuid NOT NULL, 
            finding_id uuid NOT NULL, 
            is_active boolean NOT NULL DEFAULT true, 
            created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP, 
            created_by uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000' :: uuid, 
            modified_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP, 
            modified_by uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000' :: uuid, 
            CONSTRAINT "PK_finding_tag.id" PRIMARY KEY (tag_id, finding_id), 
            CONSTRAINT "FK_finding_tag.tag_id" FOREIGN KEY (tag_id) REFERENCES tag(id) ON DELETE NO ACTION ON UPDATE NO ACTION, 
            CONSTRAINT "FK_finding_tag.finding_id" FOREIGN KEY (finding_id) REFERENCES finding(id) ON DELETE NO ACTION ON UPDATE NO ACTION
          )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE finding_tag`);
  }
}
