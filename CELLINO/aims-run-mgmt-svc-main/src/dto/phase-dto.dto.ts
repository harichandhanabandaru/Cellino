import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class PhaseDto{
    
    @ApiProperty()
    @IsUUID("all")
    id: string;
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    order: number;
    
    @ApiProperty()
    version: number;

    @ApiProperty({ type: [Map] })
    phaseInitiationRules: Map<String,Object>[]; 
    
    @ApiProperty({ type:[Map] })
    otherRules: Map<String,Object>[];
    
    @IsUUID("all",{each:true})
    @ApiProperty({ type:[String] })
    protocols: string[];
}   