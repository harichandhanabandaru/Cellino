import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsOptional, IsUUID } from "class-validator";
import { PaginationDTO } from "./pagination.dto";

export class GetPlatesRequestDTO extends PaginationDTO {
  @IsOptional()
  @Type(() => String)
  @IsUUID("all", { each: true })
  @Transform(({ value }) =>
    value
      .toString()
      .trim()
      .substring()
      .split(",")
      .map((id) => String(id))
  )
  @ApiProperty({
    required: false,
    format: "form",
    type: [String],
    description: "Takes runIds as comma seperated values ex:runId1,runId2",
  })
  runIds: string[];

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
  @ApiProperty({
    required: false,
    format: "form",
    type: [String],
    description:
      "Takes reviewerIds as comma seperated values ex:reviewerId1,reviewerId2",
  })
  reviewerIds: string[];

  @IsOptional()
  @IsUUID()
  @ApiProperty({ required: false })
  currentPhaseId: string;

  @IsOptional()
  @ApiProperty({ required: false })
  barcode: string;

  @IsOptional()
  @Transform(({ value }) =>
    value
      .toString()
      .trim()
      .substring()
      .split(",")
      .map((name) => String(name))
  )
  @ApiProperty({
    required: false,
    format: "form",
    type: [String],
    description:
      "Takes plate names as comma seperated values ex:plateName1,plateName2",
  })
  name: string[];

  @IsOptional()
  @Transform(({ value }) =>
    value
      .toString()
      .trim()
      .substring()
      .split(",")
      .map((passageNumber) => String(passageNumber))
  )
  @ApiProperty({
    required: false,
    format: "form",
    type: [String],
    description: "Takes passage numberss as comma seperated values ex:1,2",
  })
  passageNumbers: string[];
}
