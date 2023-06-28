import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ClusterOrColonyQuality } from "../enums/cluster-or-colony-quality";


export class CreateColonyRequestDTO{
  
    @ApiProperty({ description: "name of Colony"})
    @IsNotEmpty()
    name:string;

    @IsUUID("all")
    @IsNotEmpty()
    @ApiProperty({ description: "well Id of Colony"})
    wellId: string;

    @ApiProperty({required:false,description: "a flag to keep the colony"})
    @IsOptional()
    isSelected:boolean;

    @ApiProperty({ description: "Outline information" })
    @IsOptional()
    outline: Map<String, Object>;

    @IsOptional()
    @ApiProperty({enum:[ 'GOOD','MEDIUM','POOR','UNKNOWN'],required:false,description: "quality of Colony"})
    quality:typeof ClusterOrColonyQuality;
}