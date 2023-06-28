import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { PlateRequest } from "./plate-request.dto";

export class CreateWellRequestDTO {
  @ApiPropertyOptional({ name: "name", description: "The name of the well" })
  @IsOptional()
  name: string;

  @ApiProperty({ description: "Position of well" })
  @IsNotEmpty()
  position: string;

  @ApiProperty({ description: "Either plate Id or barcode is required" })
  @IsNotEmptyObject()
  @Type(() => PlateRequest)
  @ValidateNested()
  plate: PlateRequest;
}
