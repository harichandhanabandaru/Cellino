import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { ImageTimeseries } from "src/entities/image-timeseries.entity";

export class ImageTimeseriesDTO {
  @IsUUID()
  @ApiProperty({ description: "Id of image timeseries" })
  id: string;

  @IsUUID()
  @ApiProperty({ description: "Well id of image timeseries" })
  wellId: string;

  @IsUUID()
  @ApiProperty({ description: "Image Event id of image timeseries" })
  imageEventId: string;

  @IsUUID()
  @ApiProperty({ description: "Image analysis request id of image timeseries" })
  imageAnalysisRequestId: string;

  @ApiProperty({ description: "Measurements of image timeseries" })
  measurements: { [p: string]: unknown };

  constructor(imageTimeseries: ImageTimeseries) {
    this.id = imageTimeseries.id;
    this.wellId = imageTimeseries.well?.id;
    this.imageEventId = imageTimeseries.imageEvent?.id;
    this.imageAnalysisRequestId = imageTimeseries.imageAnalysisRequest?.id;
    this.measurements = imageTimeseries.imageMetadata;
  }
}
