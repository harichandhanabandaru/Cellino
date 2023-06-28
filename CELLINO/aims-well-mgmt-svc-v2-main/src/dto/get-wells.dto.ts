import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsUUID } from "class-validator";
import { Transform } from "class-transformer";

export class GetWellsRequestDTO {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  plateId: string;

  @IsBoolean()
  @ApiPropertyOptional()
  @Transform(({ value }) => {
    return value === "true" || value === true;
  })
  activeWells: boolean = false;
}
