import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";
import { WellStatus } from "../enums/well-status";
import { ProcessStatus } from "../enums/process-status";
import { Well } from "../entities/well.entity";

export class WellResponseDto {
  @ApiProperty({ description: "ID of the resource" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Name of the Well" })
  @IsOptional()
  name: string;

  @ApiProperty({ description: "Position of the Well" })
  position: String;

  @ApiProperty({ description: "Plate ID associated with the Well" })
  plateId: string;

  @ApiProperty({ description: "Current Status of the Well", enum: WellStatus })
  status: String;

  @ApiProperty({ description: "More information on the Well Status" })
  statusReason: string;

  @ApiProperty({
    description: "Process Status of the Well",
    enum: ProcessStatus,
  })
  processStatus: string;

  @ApiProperty({ description: "More information on the Process Status" })
  processStatusDetail: String;

  @ApiProperty({ description: "Process Metadata information" })
  processMetadata: { [p: string]: unknown };

  @ApiProperty({
    description: "List of User ID's of who are reviewers of the Well",
  })
  reviewers: string[];

  constructor(well: Well) {
    this.id = well.id;
    this.name = well.name;
    this.position = well.position;
    this.plateId = well.plateId;
    this.status = WellStatus[well.status];
    this.statusReason = well.statusReason;
    this.processMetadata = well.processMetadata;
    this.processStatus =
      well.processStatus !== null ? ProcessStatus[well.processStatus] : null;
    this.processStatusDetail = well.processStatusDetail;
    this.reviewers =
      well.reviewers?.map((reviewer) => reviewer?.userId) || null;
  }
}
