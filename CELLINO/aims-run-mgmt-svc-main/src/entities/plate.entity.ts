import { PlateStatus } from "../enums/PlateStatus";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { Labware } from "./labware.entity";
import { Phase } from "./phase.entity";
import { Run } from "./run.entity";
import { PlateReviewer } from "./plate-reviewer.entity";
import { RunPlate } from "./run-plate.entity";

@Entity()
export class Plate extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false, unique: true })
  barcode: string;

  @Column({ name: "status", nullable: true })
  plateStatus: PlateStatus;

  @Column({ name: "status_reason", nullable: true })
  plateStatusReason: string;

  @Column({ name: "process_metadata", type: "jsonb", nullable: true })
  processMetadata: Map<String, Object>;

  @ManyToOne(() => Labware, (labware) => labware.id)
  @JoinColumn({ name: "labware_id" })
  labware: Labware;

  @ManyToOne(() => Phase, (phase) => phase.id, { eager: true })
  @JoinColumn({ name: "phase_id" })
  phase: Phase;

  @ManyToOne(() => Run, (run) => run.plates, {
    cascade: true,
  })
  @JoinColumn({ name: "run_id" })
  run: Run;

  @OneToMany(() => PlateReviewer, (reviewer) => reviewer.plate)
  reviewers: PlateReviewer[];

  @OneToMany(() => RunPlate, (runPlate) => runPlate.plate)
  runPlate: RunPlate[];
}
