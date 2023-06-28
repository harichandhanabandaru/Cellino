import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Partner } from "../../../entities/partner.entity";
import { PartnerController } from "../../partner-controller/partner-controller/partner-controller.controller";
import { PartnerService } from "../../partner-service/partner-service/partner-service.service";
import { BaseEntity } from "typeorm";
import { Run } from "../../../entities/run.entity";

@Module({
  controllers: [PartnerController],
  providers: [PartnerService],
  imports: [TypeOrmModule.forFeature([BaseEntity, Partner, Run])],
  exports: [PartnerService],
})
export class PartnerManagementModule {}
