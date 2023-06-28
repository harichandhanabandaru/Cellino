import { PartnerType } from "../enums/PartnerType";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { Run } from "./run.entity";

@Entity()
export class Partner extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ name: "name", nullable: false, unique: true })
  name: string;
  @Column({ name: "type", nullable: true })
  type: PartnerType;
  @OneToMany(() => Run, (run) => run.partner)
  runs: Run[];
  @Column({ name: "is_active", default: true })
  isActive: boolean;
}
