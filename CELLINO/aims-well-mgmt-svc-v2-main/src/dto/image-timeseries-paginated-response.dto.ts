import { ApiProperty } from "@nestjs/swagger";
import { ImageTimeseriesDTO } from "./image-timeseries.dto";
import { PageInfo } from "./page-info.dto";

export class ImageTimeseriesPaginatedResponse {
  @ApiProperty({ type: [ImageTimeseriesDTO] })
  content: ImageTimeseriesDTO[];
  @ApiProperty({ type: PageInfo })
  pageInfo: PageInfo;
}
