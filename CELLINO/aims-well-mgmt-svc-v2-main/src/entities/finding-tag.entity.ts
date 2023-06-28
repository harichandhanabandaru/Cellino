import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { Finding } from "./finding.entity";
import { Tag } from "./tag.entity";

@Entity("finding_tag")
export class FindingTag extends BaseEntity {
  @PrimaryColumn({ name: "tag_id", type: "uuid" })
  tagId: string;

  @PrimaryColumn({ name: "finding_id", type: "uuid" })
  findingId: string;

  @Column({ name: "is_active", nullable: false, default: true })
  isActive: boolean;

  @ManyToOne(() => Tag, (tag) => tag.id)
  @JoinColumn({ name: "tag_id" })
  tag: Tag;

  @ManyToOne(() => Finding, (finding) => finding.id)
  @JoinColumn({ name: "finding_id" })
  finding: Finding;
}
