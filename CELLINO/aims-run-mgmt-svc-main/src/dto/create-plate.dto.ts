import {
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

class CreateWellDto {
  @ApiProperty({ description: "Position of well" })
  @IsString()
  @IsNotEmpty()
  readonly position: string;

  @ApiProperty({ description: "Protocol name" })
  @IsString()
  readonly protocol_config_name: string;
}

export class CreatePlateDto {
  @ApiProperty({ description: "Barcode of plate." })
  @IsString()
  @IsNotEmpty()
  readonly barcode: string;

  @ApiProperty({ description: "Wells array with position" })
  @IsArray()
  @ValidateNested()
  @Type(() => CreateWellDto)
  readonly wells: CreateWellDto[];
}
