import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class Vertice {
  @IsNumber()
  @ApiProperty()
  x: number;

  @IsNumber()
  @ApiProperty()
  y: number;
}
