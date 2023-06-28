import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Run } from "./run.entity";

@Entity({ name: "run_metric" })
export class RunMetric {

    @PrimaryColumn({ name: "run_id" })
    runId: String;

    @OneToOne(() => Run)
    @JoinColumn({ name: "run_id" })
    run: Run;

    @Column({ name: "original_plate_count" })
    originalPlateCount: number;

    @Column({ name: "original_well_count" })
    originalWellCount: number;

    @Column({ name: "plates_count" })
    platesCount: number;

    @Column({ name: "wells_count" })
    wellsCount: number;

    @Column({ name: "active_plates_count" })
    activePlatesCount: number;

    @Column({ name: "active_wells_count" })
    activeWellsCount: number;
}