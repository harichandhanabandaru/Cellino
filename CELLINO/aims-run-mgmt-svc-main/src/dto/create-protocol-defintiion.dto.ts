import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateProtocolDefinitionDTO {
    
    @IsNotEmpty()
    @ApiProperty({description:'name of the protocol definition'})
    name: string;
    
    @IsNotEmpty()
    @ApiProperty({required:false,type: String,description:'type of the protocol definition can be any of [instrument,manual,ml_pipeline,ml_service,ml_deployment...etc]'})
    protocolType: string;

    @IsNotEmpty()
    @ApiProperty({required:false,type: String,description:'category of the protocol definition can be any of [imaging,seeding,feeding,analysis...etc]'})
    protocolCategory: string;

    @ApiProperty({required:false,type: String,description:'Workflow Template Name associated with the protocol definition'})
    @IsOptional()
    workflowTemplateName: string;
    
    @ApiProperty({required:false,description:'related Id of the protocol definition'})
    @IsOptional()
    relatedId: string;

    @IsNotEmpty()
    @ApiProperty({type:[Map],description:'different parameters of the protocol definition, to be inherited by protocols'})
    parameters: Map<String, Object>[];

}