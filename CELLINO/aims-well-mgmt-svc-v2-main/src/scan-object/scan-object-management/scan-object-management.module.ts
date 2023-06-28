import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GenerationType } from "../../entities/generation-type.entity";
import { ImageAnalysisRequest } from "../../entities/image-analysis-request.entity";
import { ImageEvent } from "../../entities/image-event.entity";
import { BaseEntity } from "../../entities/base-entity.entity";
import { ScanObject } from "../../entities/scan-object.entity";
import { ScanObjectController } from "../scan-object-controller/scan-object-controller.controller";
import { ScanObjectService } from "../scan-object-service/scan-object-service.service";
import { ImageEventManagementModule } from "../../image-event/image-event-management/image-event-management";
import { ImageAnalysisRequestManagementModule } from "../../image-analysis-request/image-analysis-request-management/image-analysis-request-management";
import { UserInfo } from "../../utils/user-info";
import {ExternalRunService} from "../../utils/external-run.service";
import {AnalysisRequestStatus} from "../../entities/analysis-request-status.entity";

@Module({
  providers: [ScanObjectService, UserInfo, ExternalRunService],
  imports: [
    TypeOrmModule.forFeature([
      BaseEntity,
      ScanObject,
      ImageEvent,
      ImageAnalysisRequest,
      GenerationType,
      AnalysisRequestStatus
    ]),
    ImageEventManagementModule,
    ImageAnalysisRequestManagementModule,
  ],
  controllers: [ScanObjectController],
})
export class ScanObjectManagementModule {}