import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsOptional, IsUUID } from "class-validator";

export class GetRunPlateRequestDto {
  @IsUUID("all", { each: true })
  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) =>
    value
      .toString()
      .trim()
      .substring()
      .split(",")
      .map((id) => String(id))
  )
  @ApiPropertyOptional({
    required: false,
    format: "form",
    type: [String],
    description: "Takes runIds as comma seperated values ex:runId1,runId2",
  })
  readonly runIds: string[];

  @Type(() => String)
  @Transform(({ value }) =>
    value
      .toString()
      .trim()
      .substring()
      .split(",")
      .map((id) => String(id))
  )
  @ApiPropertyOptional({
    required: false,
    format: "form",
    type: [String],
    description:
      "Takes plateIds as comma seperated values ex:plateId1,plateId2",
  })
  @IsUUID("all", { each: true })
  @IsOptional()
  readonly plateIds: string[];

  @Transform(({ value }) =>
    value
      .toString()
      .trim()
      .substring()
      .split(",")
      .map((id) => String(id))
  )
  @ApiPropertyOptional({
    required: false,
    format: "form",
    type: [String],
    description:
      "Takes plateIds as comma seperated values ex:phaseId1,phaseId2",
  })
  @IsUUID("all", { each: true })
  @IsOptional()
  readonly phaseIds: string[];

  @IsOptional()
  @Transform(({ value }) =>
    value
      .toString()
      .trim()
      .substring()
      .split(",")
      .map((plateName) => String(plateName))
  )
  @ApiPropertyOptional({
    format: "form",
    type: [String],
    description:
      "Takes plate names as comma seperated values ex:plateName1,plateName2",
  })
  readonly plateNames: string[];

  @IsOptional()
  @Transform(({ value }) =>
    value
      .toString()
      .trim()
      .substring()
      .split(",")
      .map((passageNumber) => String(passageNumber))
  )
  @ApiPropertyOptional({
    format: "form",
    type: [String],
    description: "Takes passage numbers as comma seperated values ex:1,2",
  })
  readonly passageNumbers: string[];

  @IsOptional()
  @ApiPropertyOptional()
  readonly page: number;

  @IsOptional()
  @ApiPropertyOptional()
  readonly size: number;
}
