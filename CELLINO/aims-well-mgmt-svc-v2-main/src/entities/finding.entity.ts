import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { FindingTag } from "./finding-tag.entity";
import { GenerationType } from "./generation-type.entity";
import { ImageAnalysisRequest } from "./image-analysis-request.entity";

@Entity("finding")
export class Finding extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    name: "name",
    type: "varchar",
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string;

  @ManyToOne(() => GenerationType, (generationType) => generationType.code, {
    cascade: true,
  })
  @JoinColumn({ name: "generation_type_code", referencedColumnName: "code" })
  generationType: GenerationType;

  @ManyToOne(
    () => ImageAnalysisRequest,
    (imageAnalysisRequest) => imageAnalysisRequest.id,
    { eager: true, nullable: false }
  )
  @JoinColumn({ name: "image_analysis_request_id" })
  imageAnalysisRequest: ImageAnalysisRequest;

  @Column({ name: "outline", type: "jsonb", nullable: false })
  outline: { [p: string]: unknown };

  @Column({ name: "notes", type: "varchar" })
  notes: string;

  @OneToOne(() => Finding, (finding) => finding.id, {
    nullable: true,
  })
  @JoinColumn({ name: "original_finding_id" })
  originalFinding: Finding;

  @Column({ name: "is_active", nullable: false, default: true })
  isActive: boolean;

  @OneToMany(() => FindingTag, (findingTag) => findingTag.finding)
  findingTag: FindingTag[];
}
