import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmptyObject, IsUUID, ValidateNested } from "class-validator";
import { PlateRequest } from "./plate-request.dto";
import { WellRequest } from "./well-request.dto";

export class CreateImageTimeseriesRequest {
  @ApiProperty({ description: "Either plate Id or barcode is required" })
  @IsNotEmptyObject()
  @Type(() => PlateRequest)
  @ValidateNested()
  plate: PlateRequest;

  @ApiProperty({ description: "Either well Id or position is required" })
  @IsNotEmptyObject()
  @Type(() => WellRequest)
  @ValidateNested()
  well: WellRequest;

  @IsUUID()
  @ApiProperty({ description: "Image event Id of Image Timeseries" })
  imageEventId: string;

  @IsUUID()
  @ApiProperty({ description: "Image analysis request Id of Image Timeseries" })
  imageAnalysisRequestId: string;

  @ApiProperty({ description: "Measurements of image Timeseries" })
  @IsNotEmptyObject()
  measurements: { [p: string]: unknown };
}
