import { Well } from "../entities/well.entity";
import { ProcessStatus } from "../enums/process-status";
import { WellStatus } from "../enums/well-status";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";

export class CreateWellResponseDTO {
  @ApiProperty({ description: "ID of the well" })
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
  status: WellStatus;

  @ApiProperty({ description: "More information on the Well Status" })
  statusReason: string;

  @ApiProperty({
    description: "Process Status of the Well",
    enum: ProcessStatus,
  })
  processStatus: ProcessStatus;

  @ApiProperty({ description: "More information on the Process Status" })
  processStatusDetail: String;

  @ApiProperty({ description: "Process Metadata information" })
  processMetadata: { [p: string]: unknown };

  constructor(well: Well) {
    this.id = well.id;
    this.name = well.name;
    this.position = well.position;
    this.plateId = well.plateId;
    this.status =
      WellStatus[well.status as unknown as keyof typeof WellStatus] || null; //Enum
    this.statusReason = well.statusReason || null;
    this.processStatus =
      ProcessStatus[well.processStatus as unknown as keyof ProcessStatus] ||
      null;
    this.processStatusDetail = well.processStatusDetail || null;
    this.processMetadata = well.processMetadata || null;
  }
}
