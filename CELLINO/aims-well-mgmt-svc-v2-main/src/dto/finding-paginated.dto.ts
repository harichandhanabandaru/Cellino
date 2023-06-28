import { ApiProperty } from "@nestjs/swagger";
import { FindingDTO } from "./finding.dto";
import { PageInfo } from "./page-info.dto";

export class FindingPaginatedResponse {
  @ApiProperty({ type: [FindingDTO] })
  content: FindingDTO[];

  @ApiProperty({ type: PageInfo })
  pageInfo: PageInfo;
}
