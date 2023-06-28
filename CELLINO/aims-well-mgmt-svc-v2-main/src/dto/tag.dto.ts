import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";
import { Tag } from "../entities/tag.entity";

export class TagDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  constructor(tag: Tag) {
    this.name = tag.name;
    this.isActive = tag.isActive;
  }
}
