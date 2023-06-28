import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsOptional, IsUUID } from "class-validator";
import { PaginationDTO } from "./pagination.dto";

export class GetImageTimeseriesRequestV2DTO extends PaginationDTO {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  imageEventId: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  wellId: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  imageAnalysisRequestId: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  @Transform(({ value }) => {
    return value === "true" || value === true;
  })
  isDeveloperMode: boolean = false;
}
