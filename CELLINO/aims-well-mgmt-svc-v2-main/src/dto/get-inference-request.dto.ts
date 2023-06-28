import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class GetInferenceRequestDTO {
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: "image event Id associated with the inference",
  })
  imageEventId?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: "analysis Request Id associated with the inference",
  })
  imageAnalysisRequestId?: string;
}
