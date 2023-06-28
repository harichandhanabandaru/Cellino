import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsOptional, IsUUID, Min } from "class-validator";

export class GetRunMetricQueryDTO {
  @IsOptional()
  @IsArray()
  @IsUUID("all", { each: true })
  @Transform(({ value }) =>
    value
      .toString()
      .trim()
      .substring()
      .split(",")
      .map((id) => String(id))
  )
  @ApiProperty({ type: [String], format: "form" })
  runIds: string[];
}
