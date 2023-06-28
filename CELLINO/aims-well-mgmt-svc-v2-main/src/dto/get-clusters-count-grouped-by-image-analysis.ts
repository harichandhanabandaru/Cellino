import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsUUID } from "class-validator";

export class GetClustersCountGroupedByImageAnalysisDTO {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  imageEventId: string;

  @IsBoolean()
  @ApiPropertyOptional()
  @Transform(({ value }) => {
    return value === "true" || value === true;
  })
  freeClusters: boolean = false;
}
