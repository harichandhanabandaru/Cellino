import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { Well } from "./well.entity";
import { Cluster } from "./cluster.entity";
import { ClusterLineage } from "./cluster-lineage.entity";

@Entity("cluster_lineage_attribute")
export class ClusterLineageAttribute extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => ClusterLineage, (clusterLineage) => clusterLineage.id, {
    eager: true,
  })
  @JoinColumn({ name: "cluster_lineage_id" })
  clusterLineage: ClusterLineage;

  @ManyToOne(() => Well, (well) => well.id, { eager: true })
  @JoinColumn({ name: "well_id" })
  well: Well;

  @Column({ name: "source", length: 100, nullable: true })
  source: string;

  @Column({ name: "key", length: 100, nullable: false })
  key: string;

  @Column({ name: "value", type: "jsonb", nullable: false })
  value: { [p: string]: unknown };
}
