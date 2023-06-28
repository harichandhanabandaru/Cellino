import { IsBoolean, IsOptional, IsUUID } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";

export class GetAnalysisRequestDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: "image event Id associated with the inference",
  })
  imageEventId: string;

  @IsOptional()
  @Type(() => String)
  @IsUUID("all", { each: true })
  @Transform(({ value }) =>
    value
      .toString()
      .trim()
      .split(",")
      .map((id) => String(id))
  )
  @ApiPropertyOptional({
    format: "form",
    type: [String],
    description:
      "Takes protocolIds as comma seperated values ex:protocolId1,protocolId2",
  })
  protocolIds: string[];

  @IsBoolean()
  @ApiPropertyOptional()
  @Transform(({ value }) => {
    return value === "true" || value === true;
  })
  developerMode: boolean = false;

  @IsOptional()
  @ApiPropertyOptional()
  status: string;
}
