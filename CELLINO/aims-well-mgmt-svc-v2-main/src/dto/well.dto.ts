import { ImageMeasurements } from "../entities/image-measurements.entity";
import { Well } from "../entities/well.entity";
import { AnalysisReviewStatus } from "../enums/analysis-review-status";
import { ProcessStatus } from "../enums/process-status";
import { ReviewStatus } from "../enums/review-status";
import { WellStatus } from "../enums/well-status";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";

export class WellDTO {
  @ApiProperty({ description: "ID of the resource" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Name of the Well" })
  @IsOptional()
  name: string;

  @ApiProperty({ description: "Artifact Path of the given Well" })
  artifactPath: Map<String, Object>;

  @ApiProperty({ description: "Position of the Well" })
  position: String;

  @ApiProperty({ description: "Review Status of Well", enum: ReviewStatus })
  reviewStatus: ReviewStatus;

  @ApiProperty({ description: "Plate ID associated with the Well" })
  plateId: string;

  @ApiProperty({ description: "Current Status of the Well", enum: WellStatus })
  status: WellStatus;

  @ApiProperty({ description: "More information on the Well Status" })
  statusReason: string;

  @ApiProperty({
    description: "Analysis Status of the Well",
    enum: AnalysisReviewStatus,
  })
  analysisStatus: AnalysisReviewStatus;

  @ApiProperty({ description: "More information on the Analysis Status" })
  analysisStatusDetail: String;

  @ApiProperty({
    description: "Process Status of the Well",
    enum: ProcessStatus,
  })
  processStatus: ProcessStatus;

  @ApiProperty({ description: "More information on the Process Status" })
  processStatusDetail: String;

  @ApiProperty({ description: "Process Metadata information" })
  processMetadata: { [p: string]: unknown };

  @ApiProperty({
    description: "List of User ID's of who are reviewers of the Well",
  })
  reviewers: string[];

  constructor(well: Well, imageEventData: any) {
    this.id = well.id;
    this.name = well.name;
    this.position = well.position;
    this.reviewStatus =
      ReviewStatus[
        imageEventData?.reviewStatus as unknown as keyof typeof ReviewStatus
      ];
    this.plateId = well.plateId;
    this.status = WellStatus[well.status as unknown as keyof typeof WellStatus]; //Enum
    this.statusReason = well.statusReason;
    this.analysisStatus =
      AnalysisReviewStatus[
        imageEventData?.analysisStatus as unknown as keyof typeof AnalysisReviewStatus
      ];
    this.analysisStatusDetail = imageEventData?.analysisStatusDetail || null;
    this.processStatus =
      ProcessStatus[well.processStatus as unknown as keyof ProcessStatus];
    this.processStatusDetail = well.processStatusDetail;
    this.processMetadata = well.processMetadata;
    this.reviewers =
      well.reviewers?.map((reviewer) => reviewer?.userId) || null;
    this.artifactPath = imageEventData?.artifactPath || null;
  }
}
