import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { Well } from "./well.entity";
import { Colony } from "./colony.entity";

@Entity("colony_attribute")
export class ColonyAttribute extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Colony, (colony) => colony.id, { eager: true })
  @JoinColumn({ name: "colony_artifact_id" })
  colony: Colony;

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
