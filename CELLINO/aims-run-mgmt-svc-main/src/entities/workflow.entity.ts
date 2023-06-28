import { WorkflowType } from "../enums/workflow-type";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Run } from "./run.entity";
import { BaseEntity } from "./base-entity.entity";
import { WorkflowPhase } from "./workflow-phase.entity";

@Entity()
@Unique(["name", "version"])
export class Workflow extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ name: "objective", nullable: true })
  workflowObjective: string;

  @Column({ name: "type", nullable: true })
  workflowType: WorkflowType;

  @Column({ name: "version", nullable: false })
  version: string;

  @OneToMany(() => WorkflowPhase, (workflowPhase) => workflowPhase.workflow)
  workflowToPhase: WorkflowPhase[];

  @OneToMany(() => Run, (run) => run.workflow)
  runs: Run[];
  @Column({ name: "is_active", default: true })
  isActive: boolean;
}
