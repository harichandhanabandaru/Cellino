import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserInfo } from "../../utils/user-info";
import { BaseEntity } from "../../entities/base-entity.entity";
import { ImageEvent } from "../../entities/image-event.entity";
import { ImageSetting } from "../../entities/image-setting.entity";
import { ImageEventController } from "../image-event-controller/image-event-controller";
import { ImageEventService } from "../image-event-service/image-event-service";
import { Well } from "../../entities/well.entity";
import {ExternalRunService} from "../../utils/external-run.service";

@Module({
  controllers: [ImageEventController],
  providers: [ImageEventService, UserInfo, ExternalRunService],
  imports: [
    TypeOrmModule.forFeature([BaseEntity, ImageEvent, ImageSetting, Well]),
  ],
  exports: [ImageEventService],
})
export class ImageEventManagementModule {}
