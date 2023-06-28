import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { AnalysisReviewStatus } from "../enums/analysis-review-status";
import { ReviewStatus } from "../enums/review-status";
import { ImageEvent } from "../entities/image-event.entity";
import { ChannelType } from "../enums/channel-type";

export class ImageEventDTO {
  @ApiProperty({ description: "ID of an Image Event" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Name of Image Event" })
  name: string;

  @ApiPropertyOptional({ description: "Artifact Path information" })
  artifactPath: { [p: string]: unknown };

  @ApiPropertyOptional({ description: "Derived Artifact Information" })
  derivedArtifacts: Array<{ [p: string]: unknown }>;

  @ApiProperty({ description: "Image Event starting date" })
  startedAt: Date;

  @ApiPropertyOptional({ description: "Image Event completion date" })
  completedAt: Date;

  @ApiPropertyOptional({ description: "Metadata information" })
  metadata: { [p: string]: unknown };

  @ApiPropertyOptional({
    description: "Protocol ID associated with Image Event",
  })
  @IsUUID()
  protocolId: string;

  @ApiProperty({ description: "Image Setting ID associated with Image Event" })
  @IsUUID()
  imageSettingId: string;

  @ApiPropertyOptional({
    description: "Channel type associated with Image Event",
  })
  channelType: string;

  @ApiProperty({ description: "Event ID associated with Image Event" })
  @IsUUID()
  eventId: string;

  @ApiPropertyOptional({
    description: "Review Status of Image Event",
    enum: ReviewStatus,
  })
  reviewStatus: ReviewStatus;

  @ApiPropertyOptional({
    description: "Analysis Status of Image Event",
    enum: AnalysisReviewStatus,
  })
  analysisStatus: AnalysisReviewStatus;

  @ApiPropertyOptional({ description: "Analysis Status Detail of Image Event" })
  analysisStatusDetail: string;

  @ApiProperty({ description: "Well Id of Image Event" })
  @IsUUID()
  wellId: string;

  @ApiProperty({ description: "indicates if the Image Event is base image" })
  isBaseImage: boolean;

  constructor(event: ImageEvent) {
    this.id = event.id;
    this.name = event.name;
    this.artifactPath = event.artifactPath;
    this.derivedArtifacts = event.derivedArtifacts;
    this.startedAt = event.startedAt;
    this.completedAt = event.completedAt;
    this.metadata = event.metadata;
    this.protocolId = event.protocolId;
    this.imageSettingId = event?.imageSetting?.id || null;
    this.channelType =
      Object.values(ChannelType)[event?.imageSetting?.channelType];
    this.eventId = event.eventId;
    this.reviewStatus = ReviewStatus[
      event.reviewStatus
    ] as unknown as ReviewStatus;
    this.analysisStatus = AnalysisReviewStatus[
      event.analysisStatus
    ] as unknown as AnalysisReviewStatus;
    this.analysisStatusDetail = event.analysisStatusDetail;
    this.wellId = event?.well?.id || null;
    this.isBaseImage = event?.isBaseImage;
  }
}
