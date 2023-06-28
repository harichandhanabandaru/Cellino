import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from '../../utils/UserInfo';
import { ProtocolType } from '../../entities/protocol-type.entity';
import { ProtocolTypeController } from '../protocol-type-controller/protocol-type.controller';
import { ProtocolTypeService } from '../protocol-type-service/protocol-type-service.service';

@Module({
    controllers: [ProtocolTypeController],
    providers: [ProtocolTypeService,UserInfo],
    imports: [TypeOrmModule.forFeature([ProtocolType])]
})
export class ProtocolTypeManagementModule {}
