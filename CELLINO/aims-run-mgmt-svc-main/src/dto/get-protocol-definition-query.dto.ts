import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { PaginationDTO } from "./pagination.dto";

export class GetProtocolDefinitionsQuery extends PaginationDTO {
  @ApiPropertyOptional({
    type: String,
    description: "Optional parameter to filter based on name",
  })
  @IsOptional()
  name: string;

  @ApiPropertyOptional({
    type: String,
    description:
      "Optional parameter to filter based on type can be any of [instrument,manual,ml_pipeline,ml_service,ml_deployment...etc]",
  })
  @IsOptional()
  type: string;

  @ApiPropertyOptional({
    type: String,
    description:
      "Optional parameter to filter based on category can be any of [imaging,seeding,feeding,analysis...etc]",
  })
  @IsOptional()
  category: string;
}
