import { CloneReviewStatus } from "../enums/CloneReviewStatus";
import { RunStatus } from "../enums/RunStatus";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { Partner } from "./partner.entity";
import { Workflow } from "./workflow.entity";
import { Plate } from "./plate.entity";
import { Phase } from "./phase.entity";
import { RunReviewer } from "./run-reviewer.entity";
import { RunPlate } from "./run-plate.entity";

@Entity()
export class Run extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ nullable: false,unique:true })
  name: string;
  @Column({
    type: "timestamp with time zone",
    name: "start_date",
    nullable: false,
  })
  startDate: Date;
  //Need to be converted to a foreign key once users table comes into implementation
  @Column({ name: "run_owner_id", type: "uuid", nullable: false })
  runOwnerId: string;
  @Column({ name: "run_day", nullable: true })
  runDay: number;
  @Column({ name: "objective", nullable: true })
  runObjective: string;
  @Column({ name: "summary", nullable: true })
  runSummary: string;
  @Column({ name: "status", nullable: true })
  runStatus: RunStatus;
  @Column({ name: "clone_review_status", nullable: true })
  cloneReviewStatus: CloneReviewStatus;
  @Column({ name: "metadata", type: "json", nullable: true })
  metadata: { [key: string]: unknown };
  @ManyToOne(() => Partner, (partner) => partner.id)
  @JoinColumn({ name: "partner_id" })
  partner: Partner;
  @ManyToOne(() => Workflow, (workflow) => workflow.id)
  @JoinColumn({ name: "workflow_id" })
  workflow: Workflow;
  @ManyToOne(() => Phase, (phase) => phase.id)
  @JoinColumn({ name: "phase_id" })
  phase: Phase;
  @OneToMany(() => Plate, (plate) => plate)
  plates: Plate[];
  @OneToMany(() => RunReviewer, (reviewer) => reviewer.run)
  reviewers: RunReviewer[];
  @OneToMany(() => RunPlate, (runToPlate) => runToPlate.run)
  runPlate: RunPlate[];
}
