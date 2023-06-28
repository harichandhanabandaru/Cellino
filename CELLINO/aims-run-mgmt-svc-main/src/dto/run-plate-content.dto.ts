import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { RunPlate } from "../entities/run-plate.entity";

export class RunPlateContentDto {
  @ApiProperty()
  @IsUUID()
  runId: string;
  @ApiProperty()
  @IsUUID()
  plateId: string;
  @ApiProperty()
  @IsUUID()
  phaseId: string;

  constructor(runPlate: RunPlate) {
    this.runId = runPlate.runId;
    this.plateId = runPlate.plateId;
    this.phaseId = runPlate.phaseId;
  }
}
