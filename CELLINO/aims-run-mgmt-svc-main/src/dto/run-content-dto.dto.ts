import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { CloneReviewStatus } from "../enums/CloneReviewStatus";
import { RunStatus } from "../enums/RunStatus";

export class RunContentDto
{
    @ApiProperty()
    @IsUUID('all')
    id:string;
    @ApiProperty()
    name:string;
    @ApiProperty()
    partnerId:string;
    @ApiProperty()
    @IsUUID('all')
    phaseId:string;
    @ApiProperty()
    @IsUUID('all')
    workflowId:string;
    @ApiProperty()
    metadata: { [key: string]: unknown };
    @ApiProperty()
    objective: string;
    @ApiProperty()
    summary: string;
    @ApiProperty()
    @IsUUID('all')
    creatorId: string;
    @ApiProperty()
    @IsUUID('all')
    runOwnerId: string;
    @ApiProperty()
    @IsUUID('all',{each:true})
    reviewers:string[];
    @ApiProperty()
    runDay: number;
    @ApiProperty()
    seedingDay: Date;
    @ApiProperty()
    @ApiProperty({enum:['INPROGRESS','FINISHED','ABORTED']})
    status: RunStatus;
    @ApiProperty({enum:['INREVIEW','COMPLETED']})
    cloneReviewStatus:CloneReviewStatus;
    @ApiProperty()
    @IsUUID('all')
    processId: string;
}