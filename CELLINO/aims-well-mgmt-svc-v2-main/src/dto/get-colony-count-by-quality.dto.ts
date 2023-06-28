import { ApiProperty } from "@nestjs/swagger";
import {
  IsUUID,
  IsNotEmpty,
} from "class-validator";

export class GetColonyCountByQualityRequestDTO {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  imageEventId: string;
}
