import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNotEmptyObject,
  isNumberString,
  IsOptional,
  IsUUID,
  Matches,
  ValidateNested,
} from "class-validator";
import { AnalysisStatus } from "../enums/AnalysisStatus";
import { EventType } from "../enums/EventType";

export class PlateDetails {
  @ApiPropertyOptional({ description: "The id of plate" })
  @IsUUID("all")
  @IsOptional()
  id: string;

  @ApiPropertyOptional({ description: "The barcode of plate" })
  @IsOptional()
  barcode: string;
}
export class ProtocolRequest {
  @ApiPropertyOptional({ description: "Id of protocol" })
  @IsUUID()
  @IsOptional()
  id: string;
  @ApiPropertyOptional({ description: "The name of protocol" })
  @IsOptional()
  name: string;
}
export class CreateEventDTO {
  @ApiPropertyOptional({ description: "The id of event which is UUID" })
  @IsUUID("all")
  @IsOptional()
  id: string;

  @ApiProperty({ description: "The name of event" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    enum: EventType,
    description: "The type of event",
  })
  @IsNotEmpty()
  @Matches(
    `^${Object.values(EventType)
      .filter((v) => typeof v !== "number")
      .join("|")}$`,
    "",
    {
      message: `eventType should be any of [${Object.keys(EventType)
        .filter((ele) => !isNumberString(ele))
        .join(", ")}]`,
    }
  )
  eventType: EventType;

  @ApiPropertyOptional({ description: "The metadata of event" })
  @IsOptional()
  metadata: { [p: string]: unknown };

  @ApiProperty({
    description: "Either of plate Id or plate barcode is required",
  })
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PlateDetails)
  plate: PlateDetails;

  @ApiPropertyOptional({
    description: "Either protocol Id or name is required",
  })
  @IsOptional()
  @Type(() => ProtocolRequest)
  @ValidateNested()
  protocol: ProtocolRequest;

  @ApiProperty({ description: "Specifies the started time of event" })
  @IsNotEmpty()
  startedAt: Date;

  @ApiPropertyOptional({
    enum: AnalysisStatus,
    description: "Analysis status of event",
  })
  @IsOptional()
  @Matches(
    `^${Object.values(AnalysisStatus)
      .filter((v) => typeof v !== "number")
      .join("|")}$`,
    "",
    {
      message: `Analysis status should be any of [${Object.keys(AnalysisStatus)
        .filter((ele) => !isNumberString(ele))
        .join(", ")}]`,
    }
  )
  analysisStatus: AnalysisStatus;
}
