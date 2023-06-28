import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class SetBaseImageRequestDTO {
  @IsUUID()
  @ApiProperty()
  readonly wellId: string;

  @IsUUID()
  @ApiProperty()
  readonly eventId: string;

  @IsUUID()
  @ApiProperty()
  readonly imageEventId: string;
}
