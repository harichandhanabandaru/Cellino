import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseEntity } from '../../entities/base-entity.entity';
import { Event } from '../../entities/event.entity';
import { Plate } from '../../entities/plate.entity';
import { Vendor } from '../../entities/vendor.entity';
import { PlateController } from '../plate-controller/plate-controller.controller';
import { PlateService } from '../plate-service/plate-service.service';
import { Labware } from "../../entities/labware.entity";
import { PlateReviewer } from '../../entities/plate-reviewer.entity';
import { Run } from '../../entities/run.entity';
import { Phase } from '../../entities/phase.entity';
import { UserInfo } from '../../utils/UserInfo';

@Module({
  controllers: [PlateController],
  providers: [PlateService, UserInfo],
  imports: [
    TypeOrmModule.forFeature([
      BaseEntity,
      Event,
      Plate,
      Vendor,
      Labware,
      PlateReviewer,
      Run,
      Phase,
    ]),
  ],
  exports: [PlateService]
})
export class PlateManagementModule {}
