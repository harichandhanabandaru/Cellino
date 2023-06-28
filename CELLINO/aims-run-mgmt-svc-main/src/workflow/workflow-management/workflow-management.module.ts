import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Run } from '../../entities/run.entity';
import { WorkflowPhase } from '../../entities/workflow-phase.entity';
import { Workflow } from '../../entities/workflow.entity';
import { BaseEntity } from 'typeorm';
import { WorkflowController } from '../workflow-controller/workflow-controller.controller';
import { WorkflowService } from '../workflow-service/workflow-service.service';

@Module({
  controllers: [WorkflowController],
  providers: [WorkflowService],
  imports: [
    TypeOrmModule.forFeature([BaseEntity, Run, Workflow, WorkflowPhase]),
  ],
  exports: [WorkflowService],
})
export class WorkflowManagementModule {}
