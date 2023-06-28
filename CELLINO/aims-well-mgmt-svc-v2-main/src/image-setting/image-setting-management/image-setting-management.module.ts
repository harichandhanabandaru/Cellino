import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserInfo } from "../../utils/user-info";
import { BaseEntity } from "../../entities/base-entity.entity";
import { ImageSetting } from "../../entities/image-setting.entity";
import { ImageSettingController } from "../image-setting-controller/image-setting-controller.controller";
import { ImageSettingService } from "../image-setting-service/image-setting-service.service";

@Module({
  controllers: [ImageSettingController],
  providers: [ImageSettingService, UserInfo],
  imports: [TypeOrmModule.forFeature([BaseEntity, ImageSetting])],
})
export class ImageSettingModule {}
