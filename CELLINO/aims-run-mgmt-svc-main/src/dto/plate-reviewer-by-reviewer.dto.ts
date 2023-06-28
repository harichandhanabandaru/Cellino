import { ApiProperty } from "@nestjs/swagger";
import { Plate } from "../entities/plate.entity";
import { PageInfo } from "./page-info.dto";

export class PlateReviewerDTO {
  userId: string;
  plate: PlateDetails[];
}

export class PlateDetails {
  id: string;
  name: string;
  barcode: string;
  runId: string;
  runName: string;

  constructor(plate: Plate) {
    this.id = plate.id;
    this.name = plate.name;
    this.barcode = plate.barcode;
    this.runId = plate.run?.id;
    this.runName = plate.run?.name;
  }
}

export class PlateReviewerPaginatedDTO{
  @ApiProperty({type:[PlateReviewerDTO]})
  content:PlateReviewerDTO[];
  @ApiProperty({type:PageInfo})
  pageInfo:PageInfo
}