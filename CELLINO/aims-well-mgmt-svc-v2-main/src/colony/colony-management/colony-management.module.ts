import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Colony } from "../../entities/colony.entity";
import { ImageAnalysisRequest } from "../../entities/image-analysis-request.entity";
import { Well } from "../../entities/well.entity";
import { BaseEntity } from "../../entities/base-entity.entity";
import { ColonyController } from "../colony-controller/colony-controller.controller";
import { ColonyService } from "../colony-service/colony-service.service";
import { UserInfo } from "../../utils/user-info";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { Cluster } from "../../entities/cluster.entity";

@Module({
  controllers: [ColonyController],
  providers: [ColonyService, UserInfo],
  imports: [
    TypeOrmModule.forFeature([
      BaseEntity,
      Colony,
      Cluster,
      Well,
      ImageAnalysisRequest,
    ]),
    HttpModule,
    ConfigModule.forRoot(),
  ],
})
export class ColonyManagementModule {}
