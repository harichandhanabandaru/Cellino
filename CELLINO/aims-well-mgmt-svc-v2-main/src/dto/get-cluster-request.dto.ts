import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsUUID,IsArray } from "class-validator";
import { PaginationDTO } from "./pagination.dto";

export class GetClusterRequestDTO extends PaginationDTO {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional()
  imageEventId: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  imageAnalysisRequestId: string;

  @IsBoolean()
  @ApiPropertyOptional()
  @Transform(({ value }) => {
    return value === "true" || value === true;
  })
  freeClusters: boolean = false;

  @ApiPropertyOptional({
    type: [String],
    description: "Optional parameter to filter based on colony ID",
    format: "form",
  })
  @Transform(({ value }) =>
    value
      .toString()
      .trim()
      .substring()
      .split(",")
      .map((id) => String(id))
  )
  @IsArray()
  @IsOptional()
  @IsUUID("all", { each: true })
  colonyIds: string[];
}
