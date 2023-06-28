import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClusterManagementModule } from "./cluster/cluster-management/cluster-management.module";
import { ColonyManagementModule } from "./colony/colony-management/colony-management.module";
import { ImageAnalysisRequestManagementModule } from "./image-analysis-request/image-analysis-request-management/image-analysis-request-management";
import { ImageEventManagementModule } from "./image-event/image-event-management/image-event-management";
import { ImageSettingModule } from "./image-setting/image-setting-management/image-setting-management.module";
import { InferenceManagementModule } from "./inference/inference-management/inference-management.module";
import { WellManagementModule } from "./well/well-management/well-management.module";
import { ImageTimeseriesManagementModule } from "./image-timeseries/image-timeseries-management/image-timeseries-management.module";
import { HealthModule } from "./health/health.module";
import { ScanObjectManagementModule } from "./scan-object/scan-object-management/scan-object-management.module";
import { ClusterAttributeManagementModule } from "./cluster-attribute/cluster-attribute-management/cluster-attribute-management.module";
import { TagManagementModule } from "./tag/tag-management/tag-management.module";
import { FindingManagementModule } from "./finding/finding-management/finding-management.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClusterManagementModule,
    ColonyManagementModule,
    ImageEventManagementModule,
    ImageSettingModule,
    InferenceManagementModule,
    WellManagementModule,
    ImageAnalysisRequestManagementModule,
    ImageTimeseriesManagementModule,
    HealthModule,
    ClusterAttributeManagementModule,
    ScanObjectManagementModule,
    TagManagementModule,
    FindingManagementModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DATABASE_HOST"),
        port: parseInt(configService.get<string>("DATABASE_PORT")),
        username: configService.get<string>("DATABASE_USERNAME"),
        password: configService.get<string>("DATABASE_PASSWORD"),
        database: configService.get<string>("DATABASE_NAME"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
