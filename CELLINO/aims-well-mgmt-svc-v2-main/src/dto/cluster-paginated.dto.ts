import { ApiProperty } from "@nestjs/swagger";
import { ClusterDTO } from "./cluster.dto";
import { PageInfo } from "./page-info.dto";

export class ClusterPaginatedDTO {
  @ApiProperty({ type: [ClusterDTO] })
  content: ClusterDTO[];
  @ApiProperty({ type: PageInfo })
  pageInfo: PageInfo;
}
