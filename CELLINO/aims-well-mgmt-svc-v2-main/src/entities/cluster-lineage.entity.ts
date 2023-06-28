import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { Colony } from "./colony.entity";
import { Ancestry } from "./ancestry.entity";

@Entity("cluster_lineage")
export class ClusterLineage extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", length: 100, nullable: false })
  name: string;

  @ManyToOne(() => Ancestry, (ancestry) => ancestry.id, { eager: true })
  @JoinColumn({ name: "ancestry_id" })
  ancestry: Colony;

  @Column({ name: "attributes", type: "jsonb" })
  attributes: { [p: string]: unknown };
}
