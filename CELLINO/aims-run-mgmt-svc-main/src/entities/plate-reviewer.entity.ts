import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Plate } from "./plate.entity";
import { Run } from "./run.entity";

@Entity({ name: "plate_reviewer" })
export class PlateReviewer {

    @PrimaryColumn({ name: "plate_id", type: "uuid" })
    plateId: string;

    @PrimaryColumn({ name: "user_id", type: "uuid" })
    userId: string;

    @PrimaryColumn({ name: "run_id", type: "uuid"})
    runId: string;

    @ManyToOne(() => Plate, plate => plate.id)
    @JoinColumn({ name: "plate_id" })
    plate: Plate;

    @ManyToOne(() => Run, run => run.id)
    @JoinColumn({ name: "run_id" })
    run: Run;
}