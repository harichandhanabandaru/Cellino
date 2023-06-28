import { ApiProperty } from "@nestjs/swagger";
import { PageInfo } from "./page-info.dto";
import { LookUpContentDTO } from "./lookup-content.dto";

export class LookUpDTO {
  @ApiProperty({ type: [LookUpContentDTO] })
  content: LookUpContentDTO[];
  @ApiProperty({ type: PageInfo })
  pageInfo: PageInfo;
}
