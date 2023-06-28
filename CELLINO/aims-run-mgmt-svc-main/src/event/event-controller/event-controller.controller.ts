import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
  Headers,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProduces,
  ApiTags,
  getSchemaPath,
} from "@nestjs/swagger";
import { EventReqParam } from "../../dto/get-event.dto";
import { EventDTO } from "../../dto/event.dto";
import { EventService } from "../event-service/event-service.service";
import { CreateEventDTO } from "../../dto/create-event-dto";
import { PatchRequestBodyDTO } from "../../dto/patchRequestBody.dto";
import { Operation } from "fast-json-patch";

/**
 * Controller Class for Event Resource.
 */
@ApiTags("Event")
@Controller({ path: "events", version: "1" })
export class EventController {
  constructor(private readonly eventService: EventService) {}

  /**
   * This method fetched all the records from the service and returns
   * the DTOs of Event object.
   *
   * It also supports filtering based on `plateId` and `eventType`.
   *
   * Pagination is also enabled. You can use `page` and `size`.
   *
   * @param query To fetch the data from the request params.
   * @returns EventDTO[]
   */
  /*Disabling pagination for event api as currently we dont have 
    large data set and also if we are including pagination in future we need
    to specify the content and page info.
  */
  @Get()
  async getAll(
    @Query(new ValidationPipe({ transform: true })) query: EventReqParam
  ): Promise<Array<EventDTO>> {
    const eventDTOs = await this.eventService.getAll({
      plateId: query.plateId,
      eventType: query.eventType,
      bioseroMasterOrderId: query.bioseroMasterOrderId,
    });
    return Promise.resolve(eventDTOs);
  }

  @Get(":id")
  @ApiOkResponse({ type: EventDTO })
  @ApiBadRequestResponse({ description: "The provided event id is invalid" })
  async getEventById(@Param("id", ParseUUIDPipe) id: string) {
    return this.eventService.getEventById(id);
  }

  @Post()
  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  @ApiCreatedResponse({ description: "Event is created", type: EventDTO })
  @ApiBadRequestResponse({ description: "Provided request is invalid" })
  @ApiBody({
    type: CreateEventDTO,
    schema: { $ref: getSchemaPath(CreateEventDTO) },
    description:
      "For more details on request please refer to CreateEventDTO from the schema section!",
  })
  async addEvent(
    @Body() eventRequest: CreateEventDTO,
    @Headers("user-profile") userProfile: string
  ): Promise<EventDTO> {
    return this.eventService.addEvent(eventRequest, userProfile);
  }

  @Patch(":id")
  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  @ApiOkResponse({ type: EventDTO })
  @ApiNotFoundResponse({ description: "The provided Event Id is not found" })
  @ApiBody({
    type: PatchRequestBodyDTO,
    schema: { $ref: getSchemaPath(PatchRequestBodyDTO) },
    description:
      "For more details on path and value please refer to PatchRequestBodyDTO from the schema section!",
  })
  @ApiProduces(
    "For more details on response schema please refer to EventDTO from the schema section!"
  )
  async updateEvent(
    @Param("id") id: string,
    @Body() data: [Operation],
    @Headers("user-profile") userProfile: string
  ): Promise<EventDTO> {
    return this.eventService.updateEvent(id, data, userProfile);
  }
}
