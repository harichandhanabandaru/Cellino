import { ApiProperty } from "@nestjs/swagger";
import { Protocol } from "../entities/protocol.entity";
import { PageInfo } from "./page-info.dto";
import { ProtocolResponseContentV2Dto } from "./protocol-content-v2.dto";

export class ProtocolResponseV2Dto {
  @ApiProperty({ type: [ProtocolResponseContentV2Dto] })
  content: ProtocolResponseContentV2Dto[];
  @ApiProperty({ type: PageInfo })
  pageInfo: PageInfo;
}
