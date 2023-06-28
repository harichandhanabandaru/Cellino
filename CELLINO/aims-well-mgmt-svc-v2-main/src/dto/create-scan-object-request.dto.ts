import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsNotEmptyObject,
} from "class-validator";

export class CreateScanObjectRequest {
  @ApiPropertyOptional({ description: "name of the scan object" })
  @IsOptional()
  name: string;

  @IsUUID()
  @ApiProperty({
    description: "imageEvent Id of the scan object",
  })
  @IsNotEmpty()
  imageEventId: string;

  @IsUUID()
  @ApiPropertyOptional({
    description: "imageAnalysisRequest Id of the scan object",
  })
  @IsOptional()
  imageAnalysisRequestId: string;

  @IsOptional()
  @ApiPropertyOptional({ description: "" })
  attributes: { [p: string]: unknown };

  @ApiProperty({ description: "outline of the scan object" })
  @IsNotEmptyObject()
  outline: { [p: string]: unknown };

  @ApiPropertyOptional({
    enum: ["MANUAL", "SYSTEMGENERATED"],
    description: "type of the scan object",
  })
  @IsOptional()
  type: string = "MANUAL";
}
