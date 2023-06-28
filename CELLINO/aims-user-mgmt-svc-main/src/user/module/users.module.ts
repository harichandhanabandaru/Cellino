import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseEntity } from 'src/entities/base.entity';
import { Role } from 'src/entities/role.entity';
import { User } from 'src/entities/user.entity';
import { UsersController } from 'src/user/controller/users.controller';
import { UsersService } from 'src/user/service/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([BaseEntity, User, Role])],
})
export class UsersModule {}
