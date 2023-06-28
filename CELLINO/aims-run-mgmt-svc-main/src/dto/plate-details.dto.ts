import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsUUID } from "class-validator";
import { json } from "express";
import { PlateStatus } from "../enums/PlateStatus";
import { ProcessMetadata } from "../entities/plate-process-metadata.entity";

export class PlateDetailsDTO
{
    @ApiProperty({description:"The id of plate"})
    @IsUUID('all')
    id:string;

    @ApiProperty({description:"The name of plate"})
    name:string;

    @IsUUID("all")
    @ApiPropertyOptional({description:"The runId associated with a plate"})
    runId: string;

    @IsUUID("all")
    @ApiProperty({description:"The labwareId associated with a plate"})
    labwareId:string|null;


    @IsUUID("all",{each:true})
    @ApiPropertyOptional({description:"The reviewer Ids assigned to a plate"})
    reviewers:string[];

    @Type(()=>json)
    @ApiPropertyOptional({type:ProcessMetadata,description:"The process metadata associated with a plate"})
    processMetadata : Map<String,Object>;


    @ApiPropertyOptional({description:"The phaseId in which the plate is in currently"})
    @IsUUID('all')
    currentPhaseId: string;


    @ApiProperty({description:"The barcode of a plate"})
    barcode:string;

    @ApiPropertyOptional({description:"The status of a plate",enum:['KEEP','DROP']})
    plateStatus:PlateStatus;

    @ApiPropertyOptional({description:"The reason why a plate is in KEEP or DROP state"})
    plateStatusReason:string;

}