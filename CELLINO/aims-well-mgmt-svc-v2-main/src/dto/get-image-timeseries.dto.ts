import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsUUID } from "class-validator";
import { Transform } from "class-transformer";

export class GetImageTimeseriesRequestDTO {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  wellId: string;

  @IsBoolean()
  @ApiPropertyOptional()
  @Transform(({ value }) => {
    return value === "true" || value === true;
  })
  developerMode: boolean = false;
}
