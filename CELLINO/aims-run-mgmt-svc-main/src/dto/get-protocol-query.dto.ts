import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";
import { PaginationDTO } from "./pagination.dto";

export class GetProtocolsQuery extends PaginationDTO {
  @ApiPropertyOptional({
    type: String,
    description: "Optional parameter to filter based on Protocol Name",
  })
  @IsOptional()
  name: string;

  @ApiPropertyOptional({
    type: String,
    description: "Optional parameter to filter based on Phase ID",
  })
  @IsOptional()
  @IsUUID("all")
  phaseId: string;

  @ApiPropertyOptional({
    type: String,
    description: "Optional parameter to filter based on Preceding Protocol ID",
  })
  @IsOptional()
  @IsUUID("all")
  precedingProtocolId: string;

  @ApiPropertyOptional({
    type: String,
    description: "Optional parameter to filter based on Protcol Definition ID",
  })
  @IsOptional()
  @IsUUID("all")
  protocolDefinitionId: string;
}
