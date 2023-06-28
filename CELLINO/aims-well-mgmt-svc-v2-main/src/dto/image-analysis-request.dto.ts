import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { CreateImageAnalysisRequestDTO } from "./create-image-analysis-request.dto";

export class ImageAnalysisRequestDTO extends CreateImageAnalysisRequestDTO {
  @ApiPropertyOptional({ description: "ID of Image Analysis Request" })
  @IsUUID()
  id: string;

  constructor(imageAnalysisRequest: any) {
    super();
    this.id = imageAnalysisRequest.id;
    this.name = imageAnalysisRequest.name;
    this.startedAt = imageAnalysisRequest.startedAt;
    this.completedAt = imageAnalysisRequest?.completedAt;
    this.statusCode =
      imageAnalysisRequest.statusCode?.code || imageAnalysisRequest.statusCode;
    this.statusDetails = imageAnalysisRequest?.statusDetails;
    this.protocolId = imageAnalysisRequest.protocolId;
    this.imageEventId = imageAnalysisRequest.imageEvent?.id || imageAnalysisRequest.imageEvent;
    this.isDeveloperMode = imageAnalysisRequest.isDeveloperMode;
    this.inputParameters = imageAnalysisRequest.inputParameters;
  }
}
