import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { AnalysisStatus } from "../enums/AnalysisStatus";
import { ProcessStatus } from "../enums/ProcessStatus";
import { ReviewStatus } from "../enums/ReviewStatus";
import { Event } from "../entities/event.entity";
import { EventType } from "../enums/EventType";

/**
 * A DTO class for transforming event object.
 */
export class EventDTO {
  @ApiProperty({ description: "The id of event which is of type uuid" })
  @IsUUID("all")
  id: string;

  @ApiProperty({ description: "The name of event" })
  name: string;

  @ApiProperty({ enum: EventType, description: "The type of event" })
  eventType: EventType;

  @ApiProperty({ description: "The metadata associated with event" })
  metadata: { [p: string]: unknown };

  @ApiProperty({
    description: "The id of plate for which the event is configured",
  })
  @IsUUID("all")
  plateId: string;

  @ApiPropertyOptional({ description: "The id of protocol used for the event" })
  @IsUUID("all")
  protocolId: string;

  @ApiProperty({ description: "The start time of event" })
  startedAt: Date;

  @ApiProperty({ description: "The completed time of event" })
  completedAt: Date;

  @ApiProperty({ description: "The created time of event" })
  createdAt: Date;

  @ApiProperty({ description: "The id of user who has created the event" })
  @IsUUID("all")
  createdBy: string;

  @ApiProperty({
    description:
      "The modified time of event and by default will be the same as createdAt",
  })
  modifiedAt: Date;

  @ApiProperty({
    description:
      "The id of user who has updated the event and by default will be the same as createdBy",
  })
  modifiedBy: string;

  @ApiPropertyOptional({
    description: "Process status of event",
    enum: ProcessStatus,
  })
  processStatus: ProcessStatus;

  @ApiPropertyOptional({ description: "Process status detail of the event" })
  processStatusDetail: string;

  @ApiPropertyOptional({
    description: "Review status of event",
    enum: ReviewStatus,
  })
  reviewStatus: ReviewStatus;

  @ApiPropertyOptional({
    description: "Analysis status of event",
    enum: AnalysisStatus,
  })
  analysisStatus: AnalysisStatus;

  @ApiPropertyOptional({ description: "Analysis status detail of event" })
  analysisStatusDetail: string;

  constructor(event: Event) {
    this.id = event.id;
    this.name = event.name;
    this.eventType =
      EventType[event.eventType as undefined as keyof typeof EventType];
    this.metadata = event.metadata;
    this.plateId = event.plate?.id || null;
    this.startedAt = event.startedAt;
    this.completedAt = event.completedAt;
    this.protocolId = event.protocol?.id;
    this.createdAt = event.createdAt;
    this.createdBy = event.createdBy;
    this.modifiedAt = event.modifiedAt;
    this.modifiedBy = event.modifiedBy;
    this.analysisStatus = AnalysisStatus[
      event.analysisStatus
    ] as unknown as AnalysisStatus;
    this.analysisStatusDetail = event?.analysisStatusDetail;
    this.processStatus = ProcessStatus[
      event?.processStatus
    ] as unknown as ProcessStatus;
    this.processStatusDetail = event?.processStatusDetail;
    this.reviewStatus = ReviewStatus[
      event?.reviewStatus
    ] as unknown as ReviewStatus;
  }
}
