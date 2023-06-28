import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsUUID } from "class-validator";
import { ImageEventDTO } from "./image-event.dto";

export class GroupedImageEventsDTO {
  @IsUUID()
  @ApiProperty()
  eventId: string;

  @Type(() => ImageEventDTO)
  @ApiProperty({ type: [ImageEventDTO] })
  imageEvents: ImageEventDTO[];
}
