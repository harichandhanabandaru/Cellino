import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Protocol } from '../../entities/protocol.entity';
import { BaseEntity } from 'typeorm';
import { ProtocolController } from '../protocol-controller/protocol-controller.controller';
import { ProtocolService } from '../protocol-service/protocol-service.service';
import { Phase } from '../../entities/phase.entity';
import { ProtocolDefinition } from '../../entities/protocol-definition.entity';
import { PhaseProtocol } from '../../entities/phase-protocol.entity';
import { UserInfo } from '../../utils/UserInfo';

@Module({
    controllers: [ProtocolController],
    providers: [ProtocolService,UserInfo],
    exports: [ProtocolService],
    imports: [TypeOrmModule.forFeature([BaseEntity, Protocol, Phase, ProtocolDefinition, PhaseProtocol])]
})
export class ProtocolManagementModule {}
