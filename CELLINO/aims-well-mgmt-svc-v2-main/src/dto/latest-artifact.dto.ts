import { AnalysisReviewStatus } from "../enums/analysis-review-status";
import { ReviewStatus } from "../enums/review-status";

export class LastestArtifactDTO {
  artifactPath: { [p: string]: unknown };
  createdAt: Date;
  reviewStatus: ReviewStatus;
  analysisStatus: AnalysisReviewStatus;
  analysisStatusDetail: string;
}
