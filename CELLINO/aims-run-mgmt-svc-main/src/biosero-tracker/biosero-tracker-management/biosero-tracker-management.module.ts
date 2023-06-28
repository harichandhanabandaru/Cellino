import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BioseroTrackerController} from "src/biosero-tracker/biosero-tracker-controller/biosero-tracker.controller";
import {BioseroTrackerService} from "src/biosero-tracker/biosero-tracker-service/biosero-tracker.service";
import {BioseroTracker} from "src/entities/biosero-tracker.entity";
import {UserInfo} from "src/utils/UserInfo";

@Module({
  controllers: [BioseroTrackerController],
  providers: [BioseroTrackerService, UserInfo],
  imports: [TypeOrmModule.forFeature([BioseroTracker])]
})
export class BioseroTrackerManagementModule {}