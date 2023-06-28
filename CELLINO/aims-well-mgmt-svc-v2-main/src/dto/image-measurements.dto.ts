import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { ImageMeasurements } from "../entities/image-measurements.entity";

export class ImageMeasurementsDTO {
  @ApiProperty({ description: "eventId of the image event" })
  @IsUUID()
  eventId: string;

  @ApiProperty({ description: "ID of the image event" })
  imageEventId: string;

  @ApiPropertyOptional({
    description: "Measurements data associated with the image event",
  })
  measurements: Map<String, Object>;

  @ApiProperty({ description: "Derived artifacts of the image event" })
  derivedArtifacts: Array<Map<String, Object>>;

  @ApiProperty({ description: "Started at of the image event" })
  startedAt: Date;

  @ApiProperty({ description: "Image event created at" })
  createdAt:Date

  constructor(imageMeasurementData: ImageMeasurements) {
    this.eventId = imageMeasurementData?.eventId;
    this.imageEventId = imageMeasurementData.imageEventId;
    this.measurements = imageMeasurementData?.measurements;
    this.derivedArtifacts = imageMeasurementData.derivedArtifacts;
    this.startedAt = imageMeasurementData?.startedAt;
    this.createdAt = imageMeasurementData.createdAt;
  }
}
