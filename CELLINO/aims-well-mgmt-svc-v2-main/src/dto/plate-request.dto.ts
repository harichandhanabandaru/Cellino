import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsUUID, IsOptional } from "class-validator";

export class PlateRequest {
    @ApiPropertyOptional({ description: "Id of plate" })
    @IsUUID()
    @IsOptional()
    id?: string;

    @ApiPropertyOptional({ description: "Barcode of plate" })
    @IsOptional()
    barcode?: string;
  }