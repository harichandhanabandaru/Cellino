import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserInfo } from "../../utils/user-info";
import { BaseEntity } from "../../entities/base-entity.entity";
import { ImageAnalysisRequestController } from "../image-analysis-request-controller/image-analysis-request-controller";
import { ImageAnalysisRequestService } from "../image-analysis-request-service/image-analysis-request-service";
import { ImageAnalysisRequest } from "../../entities/image-analysis-request.entity";
import { ImageEvent } from "../../entities/image-event.entity";
import { AnalysisRequestStatus } from "../../entities/analysis-request-status.entity";
import { ExternalRunService } from "../../utils/external-run.service";
import { PubSubPublisherService } from "../../utils/pub-sub-publisher.service";

@Module({
  controllers: [ImageAnalysisRequestController],
  providers: [
    ImageAnalysisRequestService,
    UserInfo,
    ExternalRunService,
    PubSubPublisherService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      BaseEntity,
      ImageAnalysisRequest,
      ImageEvent,
      AnalysisRequestStatus,
    ]),
  ],
})
export class ImageAnalysisRequestManagementModule {}
