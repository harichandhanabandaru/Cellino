import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Headers,
  ParseUUIDPipe,
  Patch,
  Query,
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
import { HTTP_OK_MESSAGE } from "../../utils/constants";
import { ImageEventDTO } from "../../dto/image-event.dto";
import { ImageEventService } from "../image-event-service/image-event-service";
import { CreateImageEventRequestDTO } from "../../dto/create-image-event-request.dto";
import { Operation } from "fast-json-patch";
import { PatchRequestBodyDTO } from "../../dto/patch-request-body.dto";
import { GetImageEventsDto } from "../../dto/get-image-events.dto";
import { ImageEventsByWellIdRequest } from "src/dto/image-event-by-well-reuqest.dto";
import { GroupedImageEventsDTO } from "src/dto/grouped-image-events.dto";
import { SetBaseImageRequestDTO } from "src/dto/set-base-image-request.dto";

@ApiTags("Image Events")
@Controller({ path: "image-events", version: "1" })
export class ImageEventController {
  constructor(private readonly imageEventService: ImageEventService) {}

  // Handler for GetById
  @Get(":id")
  @ApiOkResponse({ type: ImageEventDTO, description: HTTP_OK_MESSAGE })
  @ApiBadRequestResponse({
    description: ImageEventService.BAD_REQUEST_EXCEPTION_MESSAGE,
  })
  @ApiNotFoundResponse({
    description: ImageEventService.NOT_FOUND_EXCEPTION_MESSAGE,
  })
  async getById(@Param("id", ParseUUIDPipe) id: string) {
    return await this.imageEventService.getById(id);
  }

  @Get()
  @ApiOkResponse({
    type: [ImageEventDTO],
    schema: { $ref: getSchemaPath(ImageEventDTO) },
    description: HTTP_OK_MESSAGE,
  })
  async getImageEvents(
    @Query()
    getImageEventsDto: GetImageEventsDto
  ) {
    return await this.imageEventService.getImageEvents(getImageEventsDto);
  }

  @Post()
  @ApiCreatedResponse({
    description: "Image Event is created",
    type: ImageEventDTO,
  })
  @ApiBadRequestResponse({ description: "Provided request is invalid" })
  @ApiBody({
    type: CreateImageEventRequestDTO,
    schema: { $ref: getSchemaPath(CreateImageEventRequestDTO) },
    description:
      "For more details on request please refer to CreateImageEventRequestDTO from the schema section!",
  })
  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  async addImageEvent(
    @Body() createImageEventRequest: CreateImageEventRequestDTO,
    @Headers("user-profile") userProfile: string
  ): Promise<ImageEventDTO> {
    return this.imageEventService.addImageEvent(
      createImageEventRequest,
      userProfile
    );
  }

  @Patch(":id")
  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  @ApiOkResponse({ type: ImageEventDTO, description: HTTP_OK_MESSAGE })
  @ApiNotFoundResponse({
    description: "The provided Image Event Id is not found",
  })
  @ApiBody({
    type: [PatchRequestBodyDTO],
    schema: { $ref: getSchemaPath(PatchRequestBodyDTO) },
    description:
      "For more details on path and value please refer to PatchRequestBodyDTO from the schema section!",
  })
  @ApiProduces(
    "For more details on reponse schema please refer to ImageEventDTO from the schema section!"
  )
  async patchImageEventById(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() data: [Operation],
    @Headers("user-profile") userProfile: string
  ): Promise<ImageEventDTO> {
    return this.imageEventService.UpdateImageEvent(id, data, userProfile);
  }

  @Get("/grouped/event-id")
  @ApiOkResponse({
    type: [GroupedImageEventsDTO],
    schema: { $ref: getSchemaPath(GroupedImageEventsDTO) },
  })
  async getGroupedImageEvents(@Query() request?: ImageEventsByWellIdRequest) {
    return await this.imageEventService.imageEventsGroupedByEventId(request);
  }

  @Post("/set-base-image")
  @ApiBadRequestResponse({ description: "Provided request is invalid" })
  @ApiBody({
    type: SetBaseImageRequestDTO,
    schema: { $ref: getSchemaPath(SetBaseImageRequestDTO) },
    description:
      "For more details on request please refer to SetBaseImageRequestDTO from the schema section!",
  })
  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  @ApiOkResponse({ type: ImageEventDTO })
  async setBaseImageEvent(
    @Body() request: SetBaseImageRequestDTO,
    @Headers("user-profile") userProfile: string
  ): Promise<ImageEventDTO> {
    return this.imageEventService.setBaseImage(request, userProfile);
  }
}
