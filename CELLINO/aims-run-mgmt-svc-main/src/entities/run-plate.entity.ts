import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { Phase } from "./phase.entity";
import { Plate } from "./plate.entity";
import { Run } from "./run.entity";

@Entity({ name: "run_plate" })
export class RunPlate extends BaseEntity {
  @PrimaryColumn({ name: "run_id", type: "uuid" })
  runId: string;

  @PrimaryColumn({ name: "plate_id", type: "uuid" })
  plateId: string;

  @Column({ name: "phase_id", nullable: false, type: "uuid" })
  phaseId: string;

  @ManyToOne(() => Run, (run) => run.id)
  @JoinColumn({ name: "run_id" })
  run: Run;

  @ManyToOne(() => Plate, (plate) => plate.id)
  @JoinColumn({ name: "plate_id" })
  plate: Plate;

  @ManyToOne(() => Phase, (phase) => phase.id)
  @JoinColumn({ name: "phase_id" })
  phase: Phase;
}
