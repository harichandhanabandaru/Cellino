import { ApiProperty } from "@nestjs/swagger";
import { PageInfo } from "./page-info.dto";
import { TagDTO } from "./tag.dto";

export class TagsPaginatedResponse {
  @ApiProperty({ type: [TagDTO] })
  content: TagDTO[];

  @ApiProperty({ type: PageInfo })
  pageInfo: PageInfo;
}
