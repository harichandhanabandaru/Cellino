import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsOptional, IsUUID } from "class-validator";
import { PaginationDTO } from "./pagination.dto";

export class GetProtocolsV2Query extends PaginationDTO {
  @ApiPropertyOptional({
    type: [String],
    description: "Optional parameter to filter based on Protocol Definition ID",
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
  protocolDefinitionIds: string[];

  @ApiPropertyOptional({
    type: String,
    description: "Optional parameter to filter based on Protocol Name",
  })
  @IsOptional()
  name: string;

  @ApiPropertyOptional({
    description: "Name to filter with partial insensitive case filtering.",
  })
  @IsOptional()
  nameLike: string;
}
