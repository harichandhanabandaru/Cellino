import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
  Headers,
} from "@nestjs/common";
import { PlateDTO } from "../../dto/plate.dto";
import { GetPlatesRequestDTO } from "../../dto/get-plates-query.dto";
import { PlateService } from "../plate-service/plate-service.service";
import { PlateContentDTO } from "../../dto/plate-content.dto";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from "@nestjs/swagger";
import { Operation } from "fast-json-patch";
import { CreatePlateRequestDTO } from "../../dto/plate-request.dto";
import { PlateDetailsDTO } from "../../dto/plate-details.dto";
import { GetPlatesByPlateIdsDto } from "../../dto/get-plates-by-plate-ids.dto";

@ApiTags("Plate")
@Controller({ path: "plates", version: "1" })
export class PlateController {
  constructor(private readonly plateService: PlateService) {}

  @Get()
  @ApiOkResponse({ type: PlateDTO })
  @ApiBadRequestResponse()
  async getPlates(
    @Query(new ValidationPipe({ transform: true })) query: GetPlatesRequestDTO
  ): Promise<PlateDTO> {
    if (typeof query?.runIds === "string") {
      const list = new Array(query.runIds);
      return await this.plateService.getPlates(
        list,
        query?.reviewerIds,
        query?.currentPhaseId,
        query?.name,
        query?.passageNumbers,
        query?.barcode,
        { page: query?.page, size: query?.size }
      );
    } else {
      return await this.plateService.getPlates(
        query?.runIds,
        query?.reviewerIds,
        query?.currentPhaseId,
        query?.name,
        query?.passageNumbers,
        query?.barcode,
        { page: query?.page, size: query?.size }
      );
    }
  }

  @Get(":id")
  @ApiOkResponse({ type: PlateContentDTO })
  @ApiNotFoundResponse({ description: "The provided Plate Id is not found" })
  @ApiBadRequestResponse({ description: "Phase id provided id is not an uuid" })
  async getPlateById(@Param("id") id: string): Promise<PlateContentDTO> {
    return await this.plateService.getPlateById(id);
  }

  @Post()
  @ApiOkResponse({
    type: PlateDetailsDTO,
    schema: { $ref: getSchemaPath(PlateDetailsDTO) },
  })
  @ApiNotFoundResponse({
    description: "The provided createdBy or labware is invalid",
  })
  @ApiBadRequestResponse({ description: "The provided request is invalid" })
  @ApiInternalServerErrorResponse({
    description: "Unexpected error while processing the request",
  })
  @ApiBody({
    type: CreatePlateRequestDTO,
    schema: { $ref: getSchemaPath(CreatePlateRequestDTO) },
    description:
      "For more details on request please refer to CreatePlateRequestDTO from the schema section!",
  })
  async addPlate(@Body() plateRequest: CreatePlateRequestDTO) {
    return this.plateService.addPlate(plateRequest);
  }

  @Patch(":id")
  @ApiOkResponse({ type: PlateContentDTO })
  @ApiNotFoundResponse({ description: "The provided Plate Id is not found" })
  @ApiBadRequestResponse({ description: "Plate id provided is not an uuid" })
  async patchPlateById(
    @Param("id") id: string,
    @Body() data: [Operation],
    @Headers("user-profile") userProfile: string
  ): Promise<PlateContentDTO> {
    return this.plateService.updateByPatch(id, data, userProfile);
  }

  @Get("collection")
  @ApiOkResponse({ type: [PlateContentDTO] })
  async getPlatesByPlateIds(@Query() query: GetPlatesByPlateIdsDto) {
    return this.plateService.getPlatesWithPlateIds(query.ids);
  }
}
