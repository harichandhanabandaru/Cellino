import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Plate } from "../../entities/plate.entity";
import { BaseEntity } from "typeorm";
import { EventController } from "../event-controller/event-controller.controller";
import { EventService } from "../event-service/event-service.service";
import { Protocol } from "../../entities/protocol.entity";
import { Event } from "../../entities/event.entity";
import { UserInfo } from "../../utils/UserInfo";
import { ProtocolManagementModule } from "../../protocol/protocol-management/protocol-management.module";

@Module({
  controllers: [EventController],
  providers: [EventService, UserInfo],
  imports: [
    TypeOrmModule.forFeature([BaseEntity, Event, Plate, Protocol]),
    ProtocolManagementModule
  ],
})
export class EventManagementModule {}
