import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Finding } from "../entities/finding.entity";

export class FindingDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  generationTypeCode: string;

  @ApiProperty()
  imageAnalysisRequestId: string;

  @ApiProperty()
  outline: { [p: string]: unknown };

  @ApiPropertyOptional()
  notes: string;

  @ApiPropertyOptional()
  originalFindingId: string;

  @ApiProperty()
  isActive: boolean;

  constructor(finding: Finding) {
    this.id = finding.id;
    this.name = finding.name;
    this.imageAnalysisRequestId = finding?.imageAnalysisRequest?.id;
    this.outline = finding.outline;
    this.notes = finding.notes;
    this.isActive = finding.isActive;
    this.originalFindingId = finding?.originalFinding?.id;
    this.generationTypeCode = finding?.generationType?.code;
  }
}
