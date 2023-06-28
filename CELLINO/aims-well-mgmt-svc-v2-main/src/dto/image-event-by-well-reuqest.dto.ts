import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class ImageEventsByWellIdRequest {
  @IsUUID()
  @ApiProperty()
  readonly wellId: string;
}
