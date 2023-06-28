import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageTimeseries } from "../../entities/image-timeseries.entity";
import { ImageTimeseriesController } from "../image-timeseries-controller/image-timeseries-controller.controller";
import { ImageTimeseriesService } from "../image-timeseries-service/image-timeseries-service.service";
import { ImageEventManagementModule } from "../../image-event/image-event-management/image-event-management";
import { ImageAnalysisRequest } from "../../entities/image-analysis-request.entity";
import { ImageEvent } from "../../entities/image-event.entity";
import { UserInfo } from "../../utils/user-info";

@Module({
  controllers: [ImageTimeseriesController],
  providers: [ImageTimeseriesService, UserInfo],
  imports: [
    TypeOrmModule.forFeature([
      ImageTimeseries,
      ImageAnalysisRequest,
      ImageEvent,
    ]),
    ImageEventManagementModule,
  ],
})
export class ImageTimeseriesManagementModule {}
