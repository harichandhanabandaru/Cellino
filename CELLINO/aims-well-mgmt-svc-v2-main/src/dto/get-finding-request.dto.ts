import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString, IsUUID, IsBoolean } from "class-validator";
import { PaginationDTO } from "./pagination.dto";

export class GetFindingRequestDTO extends PaginationDTO {
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  name: string;

  @IsUUID()
  @ApiPropertyOptional()
  @IsOptional()
  imageAnalysisRequestId: string;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    return [true, "true", "1", 1].indexOf(value) > -1;
  })
  isActive: boolean = true;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  generationTypeCode: string;

  @IsUUID()
  @ApiPropertyOptional()
  @IsOptional()
  originalFindingId: string;
}
