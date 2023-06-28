import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { ScanObject } from "../entities/scan-object.entity";

export class ScanObjectDto {
  @IsUUID()
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  imageAnalysisRequestId: string;
  @ApiProperty()
  imageEventId: string;

  @ApiProperty()
  outline: { [p: string]: unknown };
  
  @ApiProperty()
  attributes: { [p: string]: unknown };

  constructor(scanObject: ScanObject) {
    this.id = scanObject?.id;
    this.name = scanObject?.name;
    this.type = scanObject?.generationType?.code;
    this.attributes = scanObject?.attributes;
    this.outline = scanObject?.outline;
    this.imageAnalysisRequestId = scanObject?.imageAnalysisRequest?.id;
    this.imageEventId = scanObject?.imageEvent?.id;
  }
}
