import { AnalysisReviewStatus } from "../enums/analysis-review-status";
import { ReviewStatus } from "../enums/review-status";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { ImageSetting } from "./image-setting.entity";
import { Well } from "./well.entity";

@Entity({ name: "image_event" })
export class ImageEvent extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", nullable: false })
  name: string;

  @Column({ name: "started_at", nullable: false })
  startedAt: Date;

  @Column({ name: "completed_at", nullable: true })
  completedAt: Date;

  @Column({ name: "artifact_path", type: "jsonb", nullable: true })
  artifactPath: { [p: string]: unknown };

  @Column({ name: "derived_artifacts", type: "jsonb", nullable: true })
  derivedArtifacts: Array<{ [p: string]: unknown }>;

  @Column({ name: "event_id", nullable: true, type: "uuid" })
  eventId: string;

  @Column({ name: "metadata", type: "jsonb", nullable: true })
  metadata: { [p: string]: unknown };

  @Column({ name: "protocol_id", nullable: false, type: "uuid" })
  protocolId: string;

  @ManyToOne(() => ImageSetting, (imageSetting) => imageSetting.id)
  @JoinColumn({ name: "image_setting_id" })
  imageSetting: ImageSetting;

  @Column({ name: "review_status" })
  reviewStatus: ReviewStatus;

  @Column({ name: "analysis_status" })
  analysisStatus: AnalysisReviewStatus;

  @Column({ name: "analysis_status_detail", nullable: true })
  analysisStatusDetail: string;

  @ManyToOne(() => Well, (well) => well.id)
  @JoinColumn({ name: "well_id" })
  well: Well;

  @Column({ name: "is_base_image", nullable: true, default: false })
  isBaseImage: boolean;
}
