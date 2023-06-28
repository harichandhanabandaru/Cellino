import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "../../entities/event.entity";
import { Plate } from "../../entities/plate.entity";
import { EventManagementModule } from "../../event/event-management/event-management.module";
import { EventService } from "../../event/event-service/event-service.service";
import { BaseEntity } from "../../entities/base-entity.entity";
import { Partner } from "../../entities/partner.entity";
import { Phase } from "../../entities/phase.entity";
import { Protocol } from "../../entities/protocol.entity";
import { Run } from "../../entities/run.entity";
import { Workflow } from "../../entities/workflow.entity";
import { RunController } from "../run-controller/run-controller.controller";
import { RunService } from "../run-service/run-service.service";
import { PartnerManagementModule } from "../../partner/partner-management/partner-management/partner-management.module";
import { WorkflowManagementModule } from "../../workflow/workflow-management/workflow-management.module";
import { UserInfo } from "../../utils/UserInfo";
import { PlateManagementModule } from "../../plate/plate-management/plate-management.module";
import { RunMetricManagementModule } from "../../run-metric/run-metric-management/run-metric-management.module";
import { RunReviewer } from "../../entities/run-reviewer.entity";
import { RunPlateManagementModule } from "../../run-plate/run-plate-management/run-plate-management.module";
import { ExternalWellService } from "src/utils/external-well-service";

@Module({
  controllers: [RunController],
  providers: [RunService, UserInfo, EventService, ExternalWellService],
  imports: [
    TypeOrmModule.forFeature([
      BaseEntity,
      Partner,
      Run,
      RunReviewer,
      Workflow,
      Phase,
      Protocol,
      Event,
      Plate,
    ]),
    PartnerManagementModule,
    WorkflowManagementModule,
    PlateManagementModule,
    RunMetricManagementModule,
    EventManagementModule,
    RunPlateManagementModule,
  ],
})
export class RunManagementModule {}
