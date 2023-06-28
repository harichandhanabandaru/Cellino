import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Headers,
  HttpCode,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProduces,
  ApiTags,
  getSchemaPath,
} from "@nestjs/swagger";
import { ImageSettingDTO } from "../../dto/image-setting.dto";
import {
  BAD_REQUEST_EXCEPTION,
  BAD_REQUEST_EXCEPTION_MESSAGE,
  HTTP_OK_MESSAGE,
} from "../../utils/constants";
import { ImageSettingService } from "../image-setting-service/image-setting-service.service";
import { CreateImageSettingRequest } from "../../dto/create-image-setting-request.dto";
import { FindImageSettingRequest } from "src/dto/find-image-setting-request.dto";

@ApiTags("Image Settings")
@Controller({ version: "1" })
export class ImageSettingController {
  constructor(private readonly imageSettingService: ImageSettingService) {}

  @Get("image-settings/:id")
  @ApiOkResponse({ type: ImageSettingDTO, description: HTTP_OK_MESSAGE })
  @ApiBadRequestResponse({ description: BAD_REQUEST_EXCEPTION_MESSAGE })
  @ApiNotFoundResponse({
    description: ImageSettingService.NOT_FOUND_EXCEPTION_MESSAGE,
  })
  @ApiProduces(
    "For more details on response schema please refer to ImageSettingDTO from the schema section!"
  )
  async getImageSetting(@Param("id") id: string): Promise<ImageSettingDTO> {
    return await this.imageSettingService.getById(id);
  }

  @Post("find-image-settings")
  @HttpCode(200)
  @ApiOkResponse({
    type: [ImageSettingDTO],
    description: HTTP_OK_MESSAGE,
    status: 200,
  })
  @ApiBadRequestResponse({
    description: BAD_REQUEST_EXCEPTION,
  })
  @ApiNotFoundResponse({
    description: "The provided image seting data is not found",
  })
  @ApiBody({
    type: FindImageSettingRequest,
    schema: { $ref: getSchemaPath(FindImageSettingRequest) },
    description:
      "For more details on image setting request please refer to FindImageSettingRequest from the schema section!",
  })
  @ApiProduces(
    "For more details on response schema please refer to ImageSettingDTO from the schema section!"
  )
  async findImageSetting(
    @Body() request: FindImageSettingRequest
  ): Promise<ImageSettingDTO[]> {
    return this.imageSettingService.findImageSettings(request);
  }

  @Post("image-settings")
  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  @ApiOkResponse({ type: ImageSettingDTO, description: HTTP_OK_MESSAGE })
  @ApiBadRequestResponse({
    description: "The provided image event id is not UUID",
  })
  @ApiBody({
    type: CreateImageSettingRequest,
    schema: { $ref: getSchemaPath(CreateImageSettingRequest) },
    description:
      "For more details on request please refer to CreateImageSettingRequest from the schema section!",
  })
  @ApiProduces(
    "For more details on response schema please refer to ImageSettingDTO from the schema section!"
  )
  async addImageSetting(
    @Body() request: CreateImageSettingRequest,
    @Headers("user-profile") userProfile: string
  ): Promise<ImageSettingDTO> {
    return this.imageSettingService.addImageSetting(request, userProfile);
  }
}
