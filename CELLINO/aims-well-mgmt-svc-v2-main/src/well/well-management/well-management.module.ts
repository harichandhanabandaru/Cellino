import { HttpModule, HttpService } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageEvent } from "../../entities/image-event.entity";
import { ImageMeasurements } from "../../entities/image-measurements.entity";
import { Well } from "../../entities/well.entity";
import { UserInfo } from "../../utils/user-info";
import { WellController } from "../well-controller/well-controller.controller";
import { WellService } from "../well-service/well-service.service";

@Module({
  controllers: [WellController],
  providers: [WellService, UserInfo, HttpModule],
  imports: [
    TypeOrmModule.forFeature([
      Well,
      ImageMeasurements,
      ImageEvent,
    ]),
    HttpModule,
  ],
})
export class WellManagementModule {}
