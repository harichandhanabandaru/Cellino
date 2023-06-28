import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class BoundingBox {
  @ApiProperty()
  @IsNumber()
  xmin: number;
  @ApiProperty()
  @IsNumber()
  ymin: number;
  @ApiProperty()
  @IsNumber()
  xmax: number;
  @ApiProperty()
  @IsNumber()
  ymax: number;
}
