import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseEntity } from "../../entities/base-entity.entity";
import { Tag } from "../../entities/tag.entity";
import { UserInfo } from "../../utils/user-info";
import { TagController } from "../tag-controller/tag-controller.controller";
import { TagService } from "../tag-service/tag-service.service";

@Module({
  controllers: [TagController],
  providers: [TagService, UserInfo],
  imports: [TypeOrmModule.forFeature([Tag, BaseEntity])],
})
export class TagManagementModule {}
