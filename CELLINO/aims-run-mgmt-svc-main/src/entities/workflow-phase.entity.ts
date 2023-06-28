import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Phase } from "./phase.entity";
import { Workflow } from "./workflow.entity";

@Entity("workflow_phase")
export class WorkflowPhase {
    
    @PrimaryColumn({ name: "workflow_id" })
    workflowId: string;

    @PrimaryColumn({ name: "phase_id" })
    phaseId: string

    @Column({name: "parent_phase_id", nullable:true})
    parentPhaseId: string;

    @ManyToOne(() => Workflow, (workflow) => workflow.workflowToPhase, { eager: true })
    @JoinColumn({ name: "workflow_id"})
    workflow: Workflow;

    @ManyToOne(() => Phase, (phase) => phase.workflowToPhase, { eager: true })
    @JoinColumn({ name: "phase_id"})
    phase: Phase;

    @ManyToOne(() => Phase, (phase) => phase.workflowToPhase, { eager: true })
    @JoinColumn({ name: "parent_phase_id"})
    parentPhase: Phase;
}