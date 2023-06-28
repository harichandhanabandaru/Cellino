import { ApiProperty } from "@nestjs/swagger";
import { PageInfo } from "./page-info.dto";
import { RunPlateContentDto } from "./run-plate-content.dto";

export class RunPlateDto {
  @ApiProperty({ type: [RunPlateContentDto] })
  content: RunPlateContentDto[];
  @ApiProperty({ type: PageInfo })
  pageInfo: PageInfo;
}
