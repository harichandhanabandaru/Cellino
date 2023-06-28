import { ApiProperty } from "@nestjs/swagger";
import { Type, Transform } from "class-transformer";
import { IsUUID } from "class-validator";

export class GetPlatesByPlateIdsDto {
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
    format: "form",
    type: [String],
    description:
      "Takes plateIds as comma seperated values ex:plateId1,plateId2",
  })
  ids: string[];
}
