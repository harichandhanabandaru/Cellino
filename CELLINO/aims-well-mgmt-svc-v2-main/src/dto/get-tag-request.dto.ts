import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";
import { PaginationDTO } from "./pagination.dto";

export class GetTagRequest extends PaginationDTO {
  @Type(() => String)
  @IsString({ each: true })
  @Transform(({ value }) =>
    value
      .toString()
      .trim()
      .substring()
      .split(",")
      .map((id) => String(id))
  )
  @ApiPropertyOptional({
    format: "form",
    type: [String],
    description: "Takes names as comma seperated values ex:name1,name2",
  })
  names: string[];

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    return [true, "true", "1", 1].indexOf(value) > -1;
  })
  isActive: boolean = true;
}
