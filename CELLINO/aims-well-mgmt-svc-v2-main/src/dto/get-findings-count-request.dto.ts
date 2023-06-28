import { ApiProperty } from "@nestjs/swagger";
import { Type, Transform } from "class-transformer";
import { IsUUID } from "class-validator";

export class GetFindingsCountRequestDTO {
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
      "Takes imageAnalysisRequestIds as comma seperated values ex:imageAnalysisRequestId1,imageAnalysisRequestId2",
  })
  imageAnalysisRequestIds: string[];
}
