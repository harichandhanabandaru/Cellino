import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNotEmptyObject,
  isNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  ValidateNested,
} from "class-validator";
import { AnalysisReviewStatus } from "../enums/analysis-review-status";
import { PlateRequest } from "./plate-request.dto";
import { WellRequest } from "./well-request.dto";

class Protocol {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ description: "Id of protocol" })
  id?: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: "Name of protocol" })
  name?: string;
}

export class CreateImageEventRequestDTO {
  @ApiPropertyOptional({ description: "ID of Image Event" })
  @IsUUID()
  @IsOptional()
  id: string;

  @ApiProperty({ description: "Name of Image Event" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Image Event starting date" })
  @IsNotEmpty()
  startedAt: Date;

  @ApiProperty({
    description: "Analysis status of Image Event",
    enum: AnalysisReviewStatus,
  })
  @IsNotEmpty()
  @Matches(
    `^${Object.values(AnalysisReviewStatus)
      .filter((v) => typeof v !== "number")
      .join("|")}$`,
    "",
    {
      message: `analysisStatus should be any of [${Object.keys(
        AnalysisReviewStatus
      )
        .filter((ele) => !isNumberString(ele))
        .join(", ")}]`,
    }
  )
  analysisStatus: AnalysisReviewStatus;

  @ApiPropertyOptional({ description: "Metadata information" })
  @IsOptional()
  metadata: { [p: string]: unknown };

  @ApiProperty({
    description: "expects protocol id or name",
  })
  @Type(() => Protocol)
  @ValidateNested()
  protocol: Protocol;

  @ApiProperty({ description: "Image Setting ID associated with Image Event" })
  @IsUUID()
  @IsNotEmpty()
  imageSettingId: string;

  @ApiProperty({ description: "Event ID associated with Image Event" })
  @IsUUID()
  @IsNotEmpty()
  eventId: string;

  @ApiProperty({ description: "Either plate Id or barcode is required" })
  @IsNotEmptyObject()
  @Type(() => PlateRequest)
  @ValidateNested()
  plate: PlateRequest;

  @ApiProperty({ description: "Either well Id or well position is required" })
  @IsNotEmptyObject()
  @Type(() => WellRequest)
  @ValidateNested()
  well: WellRequest;
}
