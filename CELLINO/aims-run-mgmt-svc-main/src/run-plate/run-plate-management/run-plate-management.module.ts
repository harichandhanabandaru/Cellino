import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseEntity } from "../../entities/base-entity.entity";
import { RunPlate } from "../../entities/run-plate.entity";
import { RunPlateController } from "../run-plate-controller/run-plate.controller";
import { RunPlateService } from "../run-plate-service/run-plate-service.service";
import { Plate } from "../../entities/plate.entity";
import { Run } from "../../entities/run.entity";
import { Phase } from "../../entities/phase.entity";

@Module({
  controllers: [RunPlateController],
  providers: [RunPlateService],
  imports: [
    TypeOrmModule.forFeature([RunPlate, BaseEntity, Plate, Run, Phase]),
  ],
  exports: [RunPlateService],
})
export class RunPlateManagementModule {}
