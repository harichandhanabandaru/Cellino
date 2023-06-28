import { ApiProperty } from "@nestjs/swagger";
import { ClusterOrColonyQuality } from "../enums/cluster-or-colony-quality";

export class ColonyCountByQualityDTO {
  @ApiProperty()
  quality: ClusterOrColonyQuality;

  @ApiProperty()
  count: number;
}
