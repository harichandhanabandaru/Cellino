import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTagRequestDTO {
  @IsString()
  @ApiProperty()
  name: string;
}
