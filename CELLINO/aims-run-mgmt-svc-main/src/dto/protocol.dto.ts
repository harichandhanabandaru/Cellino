import { ApiProperty } from "@nestjs/swagger";
import { PageInfo } from "./page-info.dto";
import { ProtocolContentDTO } from "./protocol-content.dto";

export class ProtocolDTO {
  @ApiProperty({ type: [ProtocolContentDTO] })
  content: ProtocolContentDTO[];
  @ApiProperty({ type: PageInfo })
  pageInfo: PageInfo;
}
