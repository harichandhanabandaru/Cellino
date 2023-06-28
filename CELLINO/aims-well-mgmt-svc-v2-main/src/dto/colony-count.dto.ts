import { ApiProperty } from "@nestjs/swagger";
import { ColonyCountByQualityDTO } from "./colony-count-by-quality.dto";

export class ColonyCountDTO {
  @ApiProperty({ type: "uuid" })
  imageEventId: string;

  @ApiProperty()
  colonyCountByQuality: ColonyCountByQualityDTO[];
}
