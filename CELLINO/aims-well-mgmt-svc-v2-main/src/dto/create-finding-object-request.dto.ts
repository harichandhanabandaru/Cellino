import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID, IsNotEmptyObject } from "class-validator";

export class createFindingObjectRequest {
  @ApiPropertyOptional({ description: "name of the finding object" })
  @IsOptional()
  name: string;

  @ApiPropertyOptional({
    enum: ["MANUAL", "SYSTEMGENERATED"],
    description: "generation type of the scan object",
  })
  @IsOptional()
  generationType: string = "MANUAL";

  @IsUUID()
  @ApiPropertyOptional({
    description: "imageAnalysisRequest Id of the finding object",
  })
  @IsOptional()
  imageAnalysisRequestId: string;

  @IsUUID()
  @ApiPropertyOptional({
    description:
      "imageEvent Id to create manual analysis request if it doesnt exist",
  })
  @IsOptional()
  imageEventId: string;

  @ApiProperty({ description: "outline of the finding object" })
  @IsNotEmptyObject()
  outline: { [p: string]: unknown };

  @IsOptional()
  @ApiPropertyOptional({ description: "" })
  notes: string;
}
