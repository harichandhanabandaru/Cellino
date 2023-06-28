import { ApiProperty } from "@nestjs/swagger";
import { ClusterAttributeDTO } from "./cluster-attribute.dto";
import { PageInfo } from "./page-info.dto";
import { ScanObjectDto } from "./scan-object.dto";

export class ClusterAttributePaginatedDTO {
  @ApiProperty({ type: [ScanObjectDto] })
  content: ClusterAttributeDTO[];
  @ApiProperty({ type: PageInfo })
  pageInfo: PageInfo;
}
