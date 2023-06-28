import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiAcceptedResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from "@nestjs/swagger";
import { BioseroOrderService } from "../biosero-order-service/biosero-order-service";
import { CreateBioseroOrder } from "../../dto/create-biosero-order.dto";
import { BioseroOrderDTO } from "../../dto/biosero-order.dto";
import { GetBioseroOrderRequest } from "src/dto/get-biosero-order-request.dto";

@Controller({ path: "biosero", version: "1" })
@ApiTags("Biosero")
export class BioseroOrderController {
  constructor(private readonly bioseroOrderService: BioseroOrderService) {}

  @Post("orders")
  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "The user profile json will be by the gateway service",
  })
  @ApiCreatedResponse({
    type: [BioseroOrderDTO],
    schema: { $ref: getSchemaPath(BioseroOrderDTO) },
  })
  @ApiBody({
    type: [CreateBioseroOrder],
    schema: { $ref: getSchemaPath(CreateBioseroOrder) },
  })
  async saveBioseroOrders(
    @Body() bioseroOrders: CreateBioseroOrder[],
    @Headers("user-profile") userProfile: string
  ): Promise<Array<BioseroOrderDTO>> {
    return await this.bioseroOrderService.saveBioseroOrders(
      bioseroOrders,
      userProfile
    );
  }

  @Get("orders")
  @ApiOkResponse({ type: [BioseroOrderDTO] })
  async getBioseroOrders(
    @Query() query: GetBioseroOrderRequest
  ): Promise<BioseroOrderDTO[]> {
    return await this.bioseroOrderService.getBioseroOrders(query);
  }

  @Delete("orders/:id")
  @ApiAcceptedResponse({ description: "The order is successfully deleted" })
  @ApiNotFoundResponse({ description: "The provided id is not found" })
  async deleteBioseroOrder(@Param("id", ParseUUIDPipe) id: string) {
    return await this.bioseroOrderService.deleteOrder(id);
  }
}
