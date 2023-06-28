import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColorToColony1667312305172 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //query to update the color of colony based on color of cluster, used rank here to get rank 1's cluster
    //color for upadting colony's color
    await queryRunner.query(`DO
    $do$
    DECLARE i record;
    BEGIN 
     FOR i IN ( select cluster_rank.colony_id as colony_id,cluster_rank.color as color from colony_artifact colony 
     inner join  
     (select cluster.id,Cast(cluster.outline->>'color' as text) as color,cluster.name,cluster.colony_id,
      RANK() OVER(PARTITION BY cluster.colony_id ORDER BY cluster.created_at) Rank from cluster_artifact cluster )
      cluster_rank 
      on cluster_rank.colony_id = colony.id and cluster_rank.Rank = 1) 
      LOOP
        UPDATE colony_artifact
        SET outline = jsonb_set(coalesce(outline,'{}'),'{color}',to_jsonb(i.color),true)
        WHERE id =i.colony_id;
      END LOOP;
    END
    $do$;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `update colony_artifact set outline = jsonb_set(outline,'{color}',null)`
    );
  }
}
