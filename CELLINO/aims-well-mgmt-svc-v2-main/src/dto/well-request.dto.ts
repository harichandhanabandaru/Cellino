import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsUUID, IsOptional } from "class-validator";

export class WellRequest {
    @ApiPropertyOptional({ description: "Id of well" })
    @IsUUID()
    @IsOptional()
    id?: string;

    @ApiPropertyOptional({ description: "The position of well" })
    @IsOptional()
    wellPosition?: string;
  }