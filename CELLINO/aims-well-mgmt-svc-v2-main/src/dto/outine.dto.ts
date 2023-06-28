import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested, IsArray, IsString } from "class-validator";
import { BoundingBox } from "./bounding-box.dto";
import { Vertice } from "./vertice.dto";

export class OutlineDTO {
  @ApiProperty({
    type: [Vertice],
    description: "exterior is a list of vertices",
  })
  @ValidateNested({ each: true })
  @Type(() => Vertice)
  @IsArray()
  exterior: Array<Vertice>;

  @ApiProperty({
    type: () => [[Vertice]],
    description:
      "interiors is a list of polygons, where an internal polygon can be a list of vertices",
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Vertice)
  interiors: Array<Array<Vertice>>;

  @ApiProperty({ description: "color of the outline" })
  @IsString()
  color: string;

  @ApiProperty({ description: "center of the outline" })
  @Type(() => Vertice)
  @ValidateNested()
  center: Vertice;

  @ApiProperty({
    type: BoundingBox,
    description: "boundingBox of the outline",
  })
  @Type(() => BoundingBox)
  @ValidateNested()
  boundingBox: BoundingBox;
}
