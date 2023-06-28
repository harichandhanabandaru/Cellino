import { IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class WellStitchingDto {
  @ApiProperty({ description: "Cell line" })
  @IsString()
  @IsOptional()
  readonly CellLine;

  @ApiProperty({ description: "Seeding density" })
  @IsString()
  @IsOptional()
  readonly SeedingDensity;

  @ApiProperty({ description: "Seeding protocol" })
  @IsString()
  readonly SeedingProtocol;

  @ApiProperty({ description: "Well volume" })
  @IsNumber()
  @IsOptional()
  readonly WellVolume;

  @ApiProperty({ description: "Media" })
  @IsString()
  @IsOptional()
  readonly Media;

  @ApiProperty({ description: "Mixing strategy" })
  @IsString()
  @IsOptional()
  readonly MixingStrategy;
}
