import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BioseroTrackerManagementModule } from "src/biosero-tracker/biosero-tracker-management/biosero-tracker-management.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RunManagementModule } from "./runs/run-management/run-management.module";
import { PlateManagementModule } from "./plate/plate-management/plate-management.module";
import { PhaseManagementModule } from "./phase/phase-management/phase-management.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PartnerManagementModule } from "./partner/partner-management/partner-management/partner-management.module";
import { WorkflowManagementModule } from "./workflow/workflow-management/workflow-management.module";
import { EventManagementModule } from "./event/event-management/event-management.module";
import { ProtocolManagementModule } from "./protocol/protocol-management/protocol-management.module";
import { RunMetricManagementModule } from "./run-metric/run-metric-management/run-metric-management.module";
import { PassageManagementModule } from "./passage/passage-management/passage-management.module";
import { BioseroOrderManagementModule } from "./biosero-order/biosero-order-management/biosero-order-management.module";
import { ProtocolDefinitionManagementModule } from "./protocol-definition/protocol-definition-management/protocol-definition-management.module";
import { PlateReviewerManagementModule } from "./plate-reviewer/plate-reviewer-management/plate-reviewer-management.module";
import { ProtocolTypeManagementModule } from "./protocol-type/protocol-type-management/protocol-type-management.module";
import { ProtocolCategoryManagementModule } from "./protocol-category/protocol-category-management/protocol-category-management.module";
import { HealthModule } from "./health/health.module";
import { RunPlateManagementModule } from "./run-plate/run-plate-management/run-plate-management.module";
import { LabwareManagementModule } from "./labware/labware-management/labware-management.module";
import { ObjectCachingRuleModule } from "./object-caching-rule/object-caching-rule-module/object-caching-rule.module";
@Module({
  imports: [
    ConfigModule.forRoot(),
    RunManagementModule,
    PlateManagementModule,
    PhaseManagementModule,
    PartnerManagementModule,
    WorkflowManagementModule,
    EventManagementModule,
    RunMetricManagementModule,
    ProtocolManagementModule,
    PassageManagementModule,
    BioseroOrderManagementModule,
    ProtocolDefinitionManagementModule,
    PlateReviewerManagementModule,
    BioseroTrackerManagementModule,
    ProtocolTypeManagementModule,
    ProtocolCategoryManagementModule,
    HealthModule,
    RunPlateManagementModule,
    LabwareManagementModule,
    ObjectCachingRuleModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        //synchronize has to made false in prod env and it will be false once migration scripts are ready for dev env
        synchronize: false,
        replication: {
          master:{
            host: configService.get<string>("DATABASE_HOST"),
            port: parseInt(configService.get<string>("DATABASE_PORT")),
            username: configService.get<string>("DATABASE_USERNAME"),
            password: configService.get<string>("DATABASE_PASSWORD"),
            database: configService.get<string>("DATABASE_NAME"),
          },
          slaves: [{
            host: configService.get<string>("READ_ONLY_DATABASE_HOST"),
            port: parseInt(configService.get<string>("DATABASE_PORT")),
            username: configService.get<string>("DATABASE_USERNAME"),
            password: configService.get<string>("DATABASE_PASSWORD"),
            database: configService.get<string>("DATABASE_NAME"),
          }]
        }
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
