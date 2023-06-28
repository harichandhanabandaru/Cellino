import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlateReviewer } from "../../entities/plate-reviewer.entity";
import { Plate } from "../../entities/plate.entity";
import { PlateReviewerRepository } from "../../repository/plate-reviewer.repository";
import { PlateRepository } from "../../repository/plate.repository";
import { PlateReviewerController } from "../plate-reviewer-controller/plate-reviewer-controller.controller";
import { PlateReviewerService } from "../plate-reviewer-service/plate-reviewer-service.service";

@Module({
  controllers: [PlateReviewerController],
  providers: [PlateReviewerService, PlateReviewerRepository, PlateRepository],
  imports: [
    TypeOrmModule.forFeature([Plate, PlateReviewer]),
    ConfigModule.forRoot(),
  ],
})
export class PlateReviewerManagementModule {}
