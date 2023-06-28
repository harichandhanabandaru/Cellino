import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { FindingTag } from "./finding-tag.entity";

@Entity("tag")
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", type: "varchar", length: 50 })
  name: string;

  @Column({ name: "is_active", nullable: false, default: true })
  isActive: boolean;

  @OneToMany(() => FindingTag, (findingTag) => findingTag.tag)
  findingTag: FindingTag[];
}
