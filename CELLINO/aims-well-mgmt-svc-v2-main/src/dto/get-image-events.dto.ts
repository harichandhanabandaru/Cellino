import {
  IsBoolean,
  isNumberString,
  IsOptional,
  IsUUID,
  Matches,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { AnalysisReviewStatus } from "../enums/analysis-review-status";
import { Transform } from "class-transformer";

export class GetImageEventsDto {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({
    required: false,
    type: String,
  })
  eventId: string;

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({
    required: false,
    type: String,
  })
  @IsUUID()
  wellId: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: "Analysis status of Image Event",
    enum: AnalysisReviewStatus,
  })
  @Matches(
    `^(${Object.values(AnalysisReviewStatus)
      .filter((v) => typeof v !== "number")
      .join("|")})$`,
    "",
    {
      message: `analysisStatus should be any of [${Object.keys(
        AnalysisReviewStatus
      )
        .filter((ele) => !isNumberString(ele))
        .join(", ")}]`,
    }
  )
  analysisStatus: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    return [true, "true", "1", 1].indexOf(value) > -1;
  })
  isBaseImage: boolean;
}
