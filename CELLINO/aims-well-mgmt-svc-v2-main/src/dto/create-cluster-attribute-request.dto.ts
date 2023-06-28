import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class CreateClusterAttributeRequestDTO {
  @ApiProperty({ description: "Source of Cluster Attribute" })
  @IsString()
  @IsOptional()
  source: string;

  @ApiProperty({ description: "Key of Cluster Attribute" })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiPropertyOptional({ description: "Value of Cluster Attribute" })
  @IsNotEmpty()
  value: { [p: string]: unknown };

  @ApiProperty({ description: "Cluster Artifact Id of Cluster Attribute" })
  @IsUUID()
  @IsOptional()
  clusterArtifactId: string;

  @ApiProperty({ description: "Well Id of Cluster Attribute" })
  @IsUUID()
  @IsOptional()
  wellId: string;
}
