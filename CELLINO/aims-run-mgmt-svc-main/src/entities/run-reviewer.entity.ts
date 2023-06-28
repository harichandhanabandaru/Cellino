import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Run } from "./run.entity";

@Entity({ name: "run_reviewer" })
export class RunReviewer {

    @PrimaryColumn({ name: "run_id", type: "uuid" })
    runId: string;

    @PrimaryColumn({ name: "user_id", type: "uuid" })
    userId: string;

    @ManyToOne(() => Run, run => run.id)
    @JoinColumn({ name: "run_id" })
    run: Run;
}