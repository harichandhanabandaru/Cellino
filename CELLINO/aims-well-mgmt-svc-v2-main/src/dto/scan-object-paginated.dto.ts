import { ApiProperty } from "@nestjs/swagger";
import { PageInfo } from "./page-info.dto";
import { ScanObjectDto } from "./scan-object.dto";

export class ScanObjectPaginatedDTO {
  @ApiProperty({ type: [ScanObjectDto] })
  content: ScanObjectDto[];
  @ApiProperty({ type: PageInfo })
  pageInfo: PageInfo;
}
