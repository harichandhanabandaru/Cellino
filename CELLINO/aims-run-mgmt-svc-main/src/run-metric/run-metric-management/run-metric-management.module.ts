import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RunMetric } from "../../entities/run-metric.entity";
import { Run } from "../../entities/run.entity";
import { RunMetricController } from "../run-metric-controller/run-metric-controller.controller";
import { RunMetricService } from "../run-metric-service/run-metric-service.service";

@Module({
  controllers: [RunMetricController],
  providers: [RunMetricService],
  imports: [TypeOrmModule.forFeature([Run, RunMetric])],
  exports: [RunMetricService],
})
export class RunMetricManagementModule {}
