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

@Entity("cluster_attribute")
export class ClusterAttribute extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Cluster, (cluster) => cluster.id, { eager: true })
  @JoinColumn({ name: "cluster_artifact_id" })
  cluster: Cluster;

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
