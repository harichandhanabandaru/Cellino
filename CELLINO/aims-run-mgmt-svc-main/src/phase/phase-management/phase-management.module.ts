import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowPhase } from '../../entities/workflow-phase.entity';
import { Phase } from '../../entities/phase.entity';
import { Protocol } from '../../entities/protocol.entity';
import { PhaseController } from '../../phase/phase-controller/phase-controller.controller';
import { PhaseService } from '../../phase/phase-service/phase-service.service';
import { PhaseProtocol } from '../../entities/phase-protocol.entity';

@Module({ controllers: [PhaseController],
    providers: [PhaseService],
    imports: [TypeOrmModule.forFeature([Phase,Protocol,WorkflowPhase,PhaseProtocol])]})
export class PhaseManagementModule {}
