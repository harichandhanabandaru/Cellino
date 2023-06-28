import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, Min } from "class-validator";

export class PaginationDTO {
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  @ApiPropertyOptional()
  page: number;

  @Type(() => Number)
  @IsOptional()
  @Min(1)
  @ApiPropertyOptional()
  size: number;
}
