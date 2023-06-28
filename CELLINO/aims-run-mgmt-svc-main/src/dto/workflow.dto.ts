import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { Workflow } from "../entities/workflow.entity";
import { WorkflowType } from "../enums/workflow-type";

export class WorkflowDTO {
    
    @ApiProperty()
    @IsUUID('all')
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    objective: string;

    @ApiProperty()
    type: WorkflowType;

    @ApiProperty()
    version: string;

    @ApiProperty()
    phases: string[]

    @ApiProperty()
    @IsUUID("all")
    createdBy: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    modifiedBy: string;

    @ApiProperty()
    modifiedAt: Date;

    constructor(workflow: Workflow) {
        
        this.id              = workflow.id;
        this.name            = workflow.name;
        this.objective       = workflow.workflowObjective;
        this.type            = WorkflowType[workflow.workflowType as unknown as keyof typeof WorkflowType];
        this.version         = workflow.version;
        this.phases          = workflow.workflowToPhase?.map(w => w.phase.id) || [];
        
        this.createdAt       = workflow.createdAt;
        this.createdBy       = workflow.createdBy;

        this.modifiedAt      = workflow.modifiedAt;
        this.modifiedBy      = workflow.modifiedBy;
    }
}