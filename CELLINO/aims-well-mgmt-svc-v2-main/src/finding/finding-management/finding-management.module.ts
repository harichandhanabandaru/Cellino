import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GenerationType } from "../../entities/generation-type.entity";
import { ImageAnalysisRequest } from "../../entities/image-analysis-request.entity";
import { UserInfo } from "../../utils/user-info";
import { BaseEntity } from "../../entities/base-entity.entity";
import { Finding } from "../../entities/finding.entity";
import { FindingController } from "../finding-controller/finding-controller.controller";
import { FindingService } from "../finding-service/finding-service.service";
import { ExternalRunService } from "../../utils/external-run.service";
import { AnalysisRequestStatus } from "../../entities/analysis-request-status.entity";
import { ImageEvent } from "../../entities/image-event.entity";

@Module({
  controllers: [FindingController],
  providers: [FindingService, UserInfo, ExternalRunService],
  imports: [
    TypeOrmModule.forFeature([
      BaseEntity,
      Finding,
      ImageAnalysisRequest,
      GenerationType,
      ImageEvent,
      AnalysisRequestStatus,
    ]),
  ],
})
export class FindingManagementModule {}
