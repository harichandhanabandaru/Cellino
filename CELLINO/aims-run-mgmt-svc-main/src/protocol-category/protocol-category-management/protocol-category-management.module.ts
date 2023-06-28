import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProtocolCategory } from '../../entities/protocol-category.entity';
import { UserInfo } from '../../utils/UserInfo';
import { ProtocolCategoryController } from '../protocol-category-controller/protocol-category.controller';
import { ProtocolCategoryService } from '../protocol-category-service/protocol-category-service.service';

@Module({
    controllers: [ProtocolCategoryController],
    providers: [ProtocolCategoryService,UserInfo],
    imports: [TypeOrmModule.forFeature([ProtocolCategory])]
})
export class ProtocolCategoryManagementModule {}
