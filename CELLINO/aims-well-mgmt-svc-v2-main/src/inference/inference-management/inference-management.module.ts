import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageAnalysisRequest } from "../../entities/image-analysis-request.entity";
import { BaseEntity } from "../../entities/base-entity.entity";
import { InferenceController } from "../inference-controller/inference-controller.controller";
import { InferenceService } from "../inference-service/inference-service.service";
import { Inference } from "../../entities/inference.entity";
import { ImageEvent } from "../../entities/image-event.entity";
import { ImageSetting } from "../../entities/image-setting.entity";
import { UserInfo } from "../../utils/user-info";

@Module({
  controllers: [InferenceController],
  providers: [InferenceService, UserInfo],
  imports: [
    TypeOrmModule.forFeature([
      BaseEntity,
      Inference,
      ImageEvent,
      ImageAnalysisRequest,
      ImageSetting,
    ]),
  ],
  exports: [InferenceService]
})
export class InferenceManagementModule {}
