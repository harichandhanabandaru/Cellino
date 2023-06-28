import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsObject, IsOptional, IsUUID } from "class-validator";
import { Clonality } from "../enums/clonality";
import { ClusterOrColonyType } from "../enums/cluster-or-colony-type";
import { PhenoType } from "../enums/pheno-type";
import { ClusterOrColonyQuality } from "../enums/cluster-or-colony-quality";

export class CreateClusterRequestDTO {
  @ApiPropertyOptional({ description: "ID of the cluster" })
  @IsOptional()
  @IsUUID()
  id: string;

  @ApiProperty({ required: true, description: "name of the cluster" })
  @IsNotEmpty()
  name: string;

  @IsUUID("all")
  @ApiProperty({ required: true, description: "imageEvent Id of the cluster" })
  @IsNotEmpty()
  imageEventId: string;

  @ApiProperty({ required: false, description: "colony Id of the cluster" })
  @IsUUID("all")
  @IsOptional()
  colonyId: string;

  @ApiProperty({
    enum: ["GOOD", "MEDIUM", "POOR", "UNKNOWN"],
    description: "quality Id of the cluster",
  })
  @IsOptional()
  quality: typeof ClusterOrColonyQuality;

  @ApiPropertyOptional({ description: "well Id associated to the cluster" })
  @IsOptional()
  @IsUUID()
  wellId: string;

  @ApiPropertyOptional({
    description: "analysis request Id associated to the cluster",
  })
  @IsOptional()
  @IsUUID()
  imageAnalysisRequestId: string;

  @ApiPropertyOptional({
    enum: ["PREIPSC", "IPSC", "IPSCDIFF", "FIBROBLAST", "RPE", "UNKNOWN"],
    description: "phenoType pf the cluster",
  })
  @IsOptional()
  phenoType: PhenoType;

  @ApiPropertyOptional({
    enum: ["MANUAL", "SYSTEMGENERATED", "EDITED"],
    description: "type pf the cluster",
  })
  @IsOptional()
  type: ClusterOrColonyType;

  @ApiPropertyOptional({
    enum: ["UNKNOWN", "POLYCLONAL", "MONOCLONAL"],
    required: false,
    description: "clonality of the cluster",
  })
  @IsOptional()
  clonality: Clonality;

  @IsOptional()
  @IsObject()
  @ApiProperty({ type: Object, description: "outline of the cluster" })
  outline: { [key: string]: unknown };
}
