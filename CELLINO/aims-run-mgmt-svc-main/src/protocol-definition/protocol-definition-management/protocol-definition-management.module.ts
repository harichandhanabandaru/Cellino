import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instrument } from '../../entities/instrument.entity';
import { Manufacturer } from '../../entities/manufacturer.entity';
import { Vendor } from '../../entities/vendor.entity';
import { UserInfo } from '../../utils/UserInfo';
import { ProtocolDefinition } from '../../entities/protocol-definition.entity';
import { ProtocolDefinitionController } from '../protocol-definition-controller/protocol-definition.controller';
import { ProtocolDefinitionService } from '../protocol-definition-service/protocol-definition.service';
import { ProtocolType } from '../../entities/protocol-type.entity';
import { ProtocolCategory } from 'src/entities/protocol-category.entity';

@Module({
    controllers: [ProtocolDefinitionController],
    providers: [ProtocolDefinitionService,UserInfo],
    imports: [TypeOrmModule.forFeature([ProtocolDefinition,ProtocolType,ProtocolCategory,Instrument,Manufacturer,Vendor])]
})
export class ProtocolDefinitionManagementModule {}
