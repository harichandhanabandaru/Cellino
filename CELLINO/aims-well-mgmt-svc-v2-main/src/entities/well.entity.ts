import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { WellStatus } from "../enums/well-status";
import { ProcessStatus } from "../enums/process-status";
import { WellReviewer } from "./well-reviewer.entity";

@Entity("well")
@Unique(["position", "plateId"])
export class Well extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", nullable: false, unique: true })
  name: string;

  @Column({ name: "plate_id", type: "uuid", nullable: false })
  plateId: string;

  @Column({ name: "position", nullable: false })
  position: string;

  @Column({ name: "well_status", nullable: true })
  status: WellStatus;

  @Column({ name: "well_status_reason", nullable: true })
  statusReason: string;

  @Column({ name: "process_status", nullable: true })
  processStatus: ProcessStatus;

  @Column({ name: "process_status_detail", nullable: true })
  processStatusDetail: string;

  @Column({ name: "process_metadata", type: "jsonb", nullable: true })
  processMetadata: { [p: string]: unknown };

  @OneToMany(() => WellReviewer, (wellReviewer) => wellReviewer.well, {
    cascade: true,
    eager: true,
  })
  reviewers: WellReviewer[];
}
