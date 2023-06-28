import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Labware} from '../../entities/labware.entity';
import { Vendor } from "../../entities/vendor.entity";
import { Manufacturer } from "../../entities/manufacturer.entity";
import { BaseEntity } from 'typeorm';
import { LabwareController } from '../labware-controller/labware-controller.controller';
import {LabwareService} from '../labware-service/labware.service';

@Module({
  controllers: [LabwareController],
  providers: [LabwareService],
  imports: [
    TypeOrmModule.forFeature([BaseEntity, Labware,Vendor, Manufacturer]),
  ],
  exports: [LabwareService],
})
export class LabwareManagementModule {}
