import { InjectRepository } from "@nestjs/typeorm";
import { BioseroOrderType } from "../../entities/biosero-order-type.entity";
import { BioseroOrder } from "../../entities/biosero-order.entity";
import { UserInfo } from "../../utils/UserInfo";
import { FindOptionsWhere, Repository } from "typeorm";
import { Logger, NotFoundException } from "@nestjs/common";
import { BioseroOrderDTO } from "../../dto/biosero-order.dto";
import { CreateBioseroOrder } from "../../dto/create-biosero-order.dto";
import { GetBioseroOrderRequest } from "src/dto/get-biosero-order-request.dto";

export class BioseroOrderService {
  private readonly logger = new Logger(BioseroOrderService.name);
  constructor(
    @InjectRepository(BioseroOrder)
    private readonly bioseroOrderRepository: Repository<BioseroOrder>,

    @InjectRepository(BioseroOrderType)
    private readonly bioseroOrderTypeRepository: Repository<BioseroOrderType>,

    private readonly userInfo: UserInfo
  ) {}

  async saveBioseroOrders(
    orders: CreateBioseroOrder[],
    userProfile: string
  ): Promise<Array<BioseroOrderDTO>> {
    const types = await this.bioseroOrderTypeRepository.find();
    console.log("userProfile", userProfile);
    const userId = this.userInfo.getUserId(userProfile);
    const savedOrders = await this.bioseroOrderRepository.save(
      orders.map((order) => {
        const bioseroOrder = new BioseroOrder();
        bioseroOrder.createdAt = order.createdAt;
        bioseroOrder.modifiedAt = order.createdAt;
        bioseroOrder.createdBy = userId;
        bioseroOrder.modifiedBy = userId;
        bioseroOrder.acquisitionId = order.acquisitionId;
        bioseroOrder.metadata = order.metadata;
        const type = types.filter(
          (type) => type.code === order.type.toLowerCase()
        )?.[0];
        if (type) {
          bioseroOrder.type = type;
        } else {
          this.logger.error(
            `The provided order type ${order.type} is not found`
          );
          throw new NotFoundException(
            `The provided order type ${order.type} is not found`
          );
        }
        bioseroOrder.plateBarcode = order.plateBarcode;
        bioseroOrder.wellPosition = order.wellPosition;
        bioseroOrder.protocolConfiguration = order.protocolConfigurationName;
        bioseroOrder.imageEventId = order.imageEventId;
        bioseroOrder.imageSource = order.imageSource;
        bioseroOrder.bioseroIdentifier = order.bioseroIdentifier;
        return bioseroOrder;
      })
    );
    return savedOrders.map((savedOrder) => new BioseroOrderDTO(savedOrder));
  }

  async getBioseroOrders(query: GetBioseroOrderRequest) {
    const whereClause: FindOptionsWhere<BioseroOrder> = {};
    const bioseroOrdertTypewhereClause: FindOptionsWhere<BioseroOrderType> = {};

    if (query.plateBarcode) {
      whereClause.plateBarcode = query.plateBarcode;
    }
    if (query.wellPosition) {
      whereClause.wellPosition = query.wellPosition;
    }
    if (query.protocolConfigurationName) {
      whereClause.protocolConfiguration = query.protocolConfigurationName;
    }
    if (query.imageEventId) {
      whereClause.imageEventId = query.imageEventId;
    }
    if (query.type) {
      bioseroOrdertTypewhereClause.code = query.type.toLowerCase();
      whereClause.type = bioseroOrdertTypewhereClause;
    }
    if (query.imageSource) {
      whereClause.imageSource = query.imageSource;
    }
    if (query.acquisitionId) {
      whereClause.acquisitionId = query.acquisitionId;
    }

    const bioseroOrders: BioseroOrder[] =
      await this.bioseroOrderRepository.find({
        where: whereClause,
        order: { createdAt: "DESC" },
      });
    return bioseroOrders.map((order) => new BioseroOrderDTO(order));
  }

  async deleteOrder(id: string) {
    const deletedResult = await this.bioseroOrderRepository.delete({ id: id });
    if (deletedResult.affected > 0) {
      return { id };
    } else {
      this.logger.error(`The provided biosero order id ${id} is invalid`);
      throw new NotFoundException(
        `The provided biosero order id ${id} is invalid`
      );
    }
  }
}
