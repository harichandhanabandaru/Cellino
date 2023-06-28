import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cluster } from "../../entities/cluster.entity";
import { Colony } from "../../entities/colony.entity";
import { ImageAnalysisRequest } from "../../entities/image-analysis-request.entity";
import { ImageEvent } from "../../entities/image-event.entity";
import { ImageSetting } from "../../entities/image-setting.entity";
import { Well } from "../../entities/well.entity";
//import { WellReviewer } from 'src/entities/wellReviewer.entity';
import { BaseEntity } from "../../entities/base-entity.entity";
import { ClusterController } from "../cluster-controller/cluster-controller.controller";
import { ClusterService } from "../cluster-service/cluster-service.service";
import { UserInfo } from "../../utils/user-info";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

@Module({
  controllers: [ClusterController],
  providers: [ClusterService, UserInfo],
  imports: [
    TypeOrmModule.forFeature([
      BaseEntity,
      Cluster,
      ImageEvent,
      Colony,
      Well,
      ImageAnalysisRequest,
      ImageSetting,
    ]),
    HttpModule,
    ConfigModule.forRoot(),
  ],
})
export class ClusterManagementModule {}
