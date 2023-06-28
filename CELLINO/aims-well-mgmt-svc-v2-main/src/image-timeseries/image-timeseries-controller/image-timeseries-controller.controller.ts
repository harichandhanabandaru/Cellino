import {
  Body,
  Controller,
  Post,
  Headers,
  Get,
  Query,
  ValidationPipe,
  ParseUUIDPipe,
  Version,
} from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  getSchemaPath,
  ApiHeader,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ImageMeasurementsDTO } from "../../dto/image-measurements.dto";
import { ImageTimeseriesDTO } from "../../dto/image-timeseries.dto";
import { HTTP_OK_MESSAGE } from "../../utils/constants";
import { CreateImageTimeseriesRequest } from "../../dto/create-image-timeseries.dto";
import { ImageTimeseriesService } from "../image-timeseries-service/image-timeseries-service.service";
import { GetImageTimeseriesRequestDTO } from "src/dto/get-image-timeseries.dto";
import { ImageTimeseriesPaginatedResponse } from "src/dto/image-timeseries-paginated-response.dto";
import { GetImageTimeseriesRequestV2DTO } from "src/dto/get-image-timeseries-request-v2.dto";

@Controller({ path: "image-timeseries", version: "1" })
@ApiTags("Image timeseries")
export class ImageTimeseriesController {
  constructor(
    private readonly imageTimeseriesService: ImageTimeseriesService
  ) {}
  @Post()
  @ApiBody({
    type: CreateImageTimeseriesRequest,
    schema: { $ref: getSchemaPath(CreateImageTimeseriesRequest) },
    description:
      "For more details on request please refer to CreateImageTimeseriesRequest from the schema section!",
  })
  @ApiCreatedResponse({
    description: "The request has been processed successfully!",
    type: ImageTimeseriesDTO,
  })
  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  async saveImageTimeseries(
    @Body() imageTimeseriesRequest: CreateImageTimeseriesRequest,
    @Headers("user-profile") userProfile: string
  ): Promise<ImageTimeseriesDTO> {
    return await this.imageTimeseriesService.saveImageTimeseries(
      imageTimeseriesRequest,
      userProfile
    );
  }

  @Get()
  @ApiOkResponse({
    type: [ImageMeasurementsDTO],
    schema: { $ref: getSchemaPath(ImageMeasurementsDTO) },
    description: HTTP_OK_MESSAGE,
  })
  @ApiBadRequestResponse({
    description: ImageTimeseriesService.BAD_REQUEST_EXCEPTION_MESSAGE,
  })
  async getImageTimeseries(
    @Query(new ValidationPipe({ transform: true }))
    query: GetImageTimeseriesRequestDTO
  ): Promise<ImageMeasurementsDTO[]> {
    return await this.imageTimeseriesService.getImageTimeseries(query);
  }

  @Version("2")
  @Get()
  @ApiOkResponse({
    type: ImageTimeseriesPaginatedResponse,
    schema: { $ref: getSchemaPath(ImageTimeseriesPaginatedResponse) },
    description: HTTP_OK_MESSAGE,
  })
  async getImageTimeseriesV2(
    @Query() query: GetImageTimeseriesRequestV2DTO
  ): Promise<ImageTimeseriesPaginatedResponse> {
    return await this.imageTimeseriesService.getImageTimeseriesV2(query);
  }
}
