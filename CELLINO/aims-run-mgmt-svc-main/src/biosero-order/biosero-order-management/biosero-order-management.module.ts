import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BioseroOrderType } from "src/entities/biosero-order-type.entity";
import { BioseroOrder } from "src/entities/biosero-order.entity";
import { Instrument } from "src/entities/instrument.entity";
import { Manufacturer } from "src/entities/manufacturer.entity";
import { PhaseProtocol } from "src/entities/phase-protocol.entity";
import { Phase } from "src/entities/phase.entity";
import { Protocol } from "src/entities/protocol.entity";
import { ProtocolDefinition } from "src/entities/protocol-definition.entity";
import { Vendor } from "src/entities/vendor.entity";
import { UserInfo } from "src/utils/UserInfo";
import { BioseroOrderController } from "../biosero-order-controller/biosero-order.controller";
import { BioseroOrderService } from "../biosero-order-service/biosero-order-service";

@Module({
    controllers: [BioseroOrderController],
    providers: [BioseroOrderService, UserInfo],
    imports: [TypeOrmModule.forFeature([BioseroOrder, BioseroOrderType, Protocol, PhaseProtocol, ProtocolDefinition, Phase, Instrument, Manufacturer, Vendor]), ConfigModule.forRoot()]
})
export class BioseroOrderManagementModule {}