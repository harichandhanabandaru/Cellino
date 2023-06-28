import { ApiProperty } from "@nestjs/swagger";
import { ProcessStatus } from "../enums/ProcessStatus";
import { AnalysisStatus } from "../enums/AnalysisStatus";
import { ReviewStatus } from "../enums/ReviewStatus";
import { PlateDetailsDTO } from "./plate-details.dto";

export class PlateContentDTO extends PlateDetailsDTO {
  @ApiProperty({
    enum: [
      "IMAGINGQUEUE",
      "IMAGING",
      "SCANNINGQUEUE",
      "SCANNING",
      "ININCUBATOR",
      "DROPEED",
      "RETIRED",
    ],
  })
  processStatus: ProcessStatus;

  @ApiProperty({ enum: ["CONFIRMED", "INPROGRESS", "NOTSTARTED"] })
  reviewStatus: ReviewStatus;

  @ApiProperty({
    enum: ["INQUEUE", "INPROGRESS", "FAILURE", "SUCCESS"],
  })
  analysisStatus: AnalysisStatus;

  @ApiProperty()
  analysisStatusDetail: string;

  @ApiProperty()
  processStatusDetail: string;
}
