import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseEntity } from '../../entities/base-entity.entity';
import { Plate } from '../../entities/plate.entity';
import { PlateReviewer } from 'src/entities/plate-reviewer.entity';
import { PassageService } from '../passage-service/passage-service.service';
import { PassageController } from '../passage-controller/passage-controller.controller';

@Module({
    controllers:[PassageController],
    providers:[PassageService],
    imports:[TypeOrmModule.forFeature([BaseEntity,Plate])]
})
export class PassageManagementModule {}
