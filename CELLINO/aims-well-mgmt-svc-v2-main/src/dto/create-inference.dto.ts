import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmptyObject, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateInferenceRequest {
  @ApiProperty({ description: "Name of the inference" })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Artifact Path related infromation for the inference",
  })
  @IsNotEmptyObject()
  artifactPath: Map<string, Object>;

  @ApiPropertyOptional({ description: "Metadata for the inference" })
  @IsOptional()
  metadata: { [p: string]: unknown };

  @ApiPropertyOptional({
    description: "Protocol ID associated with the inference",
  })
  @IsUUID()
  @IsOptional()
  protocolId: string;

  @ApiPropertyOptional({
    description: "Image Event ID associated with the inference",
  })
  @IsUUID()
  @IsOptional()
  imageEventId: string;

  @ApiProperty({
    description: "Image Analysis Request ID associated with the inference",
  })
  @IsUUID()
  imageAnalysisRequestId: string;

  @ApiPropertyOptional({
    description: "Image Setting ID associated with the inference",
  })
  @IsOptional()
  @IsUUID()
  imageSettingId: string;
}
