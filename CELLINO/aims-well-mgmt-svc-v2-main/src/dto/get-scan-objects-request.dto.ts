import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";
import { PaginationDTO } from "./pagination.dto";

export class GetScanObjectsRequestDto extends PaginationDTO {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  imageAnalysisRequestId: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  imageEventId: string;
}
