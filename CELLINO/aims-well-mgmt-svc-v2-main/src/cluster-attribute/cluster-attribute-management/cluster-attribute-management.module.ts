import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Well } from "../../entities/well.entity";
import { BaseEntity } from "../../entities/base-entity.entity";
import { UserInfo } from "../../utils/user-info";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { ClusterAttributeController } from "../cluster-attribute-controller/cluster-attribute-controller.controller";
import { ClusterAttributeService } from "../cluster-attribute-service/cluster-attribute-service.service";
import { ClusterAttribute } from "../../entities/cluster-attribute.entity";
import { Cluster } from "../../entities/cluster.entity";

@Module({
  controllers: [ClusterAttributeController],
  providers: [ClusterAttributeService, UserInfo],
  imports: [
    TypeOrmModule.forFeature([
      BaseEntity,
      ClusterAttribute,
      Well,
      Cluster
    ]),
    HttpModule,
    ConfigModule.forRoot(),
  ],
})
export class ClusterAttributeManagementModule {}
