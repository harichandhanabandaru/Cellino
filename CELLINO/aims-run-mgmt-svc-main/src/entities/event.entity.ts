import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { Plate } from "./plate.entity";
import { EventType } from "../enums/EventType";
import { Protocol } from "./protocol.entity";
import { ProcessStatus } from "../enums/ProcessStatus";
import { ReviewStatus } from "../enums/ReviewStatus";
import { AnalysisStatus } from "../enums/AnalysisStatus";

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", nullable: true, unique: true })
  name: string;

  @Column({ name: "event_type", nullable: false })
  eventType: EventType;

  @Column({ name: "started_at", nullable: true })
  startedAt: Date;

  @Column({ name: "completed_at", nullable: true })
  completedAt: Date;

  @Column({ name: "metadata", type: "jsonb", nullable: true })
  metadata: { [p: string]: unknown };

  @Column({ name: "process_status", nullable: true })
  processStatus: ProcessStatus;

  @Column({ name: "process_status_detail", nullable: true })
  processStatusDetail: string;

  @Column({ name: "review_status", nullable: true })
  reviewStatus: ReviewStatus;

  @Column({ name: "analysis_status", nullable: true })
  analysisStatus: AnalysisStatus;

  @Column({ name: "analysis_status_detail", nullable: true })
  analysisStatusDetail: string;

  @ManyToOne(() => Protocol, (protocol) => protocol.id)
  @JoinColumn({ name: "protocol_id" })
  protocol: Protocol;

  @ManyToOne((type) => Plate, (plate) => plate)
  @JoinColumn({ name: "plate_id" })
  plate: Plate;
}
