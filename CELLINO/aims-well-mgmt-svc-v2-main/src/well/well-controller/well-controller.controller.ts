import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
  Version,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProduces,
  ApiTags,
  ApiUnprocessableEntityResponse,
  getSchemaPath,
} from "@nestjs/swagger";
import {
  BAD_REQUEST_EXCEPTION_MESSAGE,
  HTTP_OK_MESSAGE,
  NOT_FOUND_EXCEPTION_MESSAGE,
} from "../../utils/constants";
import { WellDTO } from "../../dto/well.dto";
import { WellService } from "../well-service/well-service.service";
import { Operation } from "fast-json-patch";
import { UserInfo } from "../../utils/user-info";
import { PatchRequestBodyDTO } from "../../dto/patch-request-body.dto";
import { CreateWellRequestDTO } from "../../dto/create-well-request.dto";
import { CreateWellResponseDTO } from "../../dto/create-well-response.dto";
import { GetWellsRequestDTO } from "../../dto/get-wells.dto";
import { GetWellsV2Dto } from "../../dto/get-wells-v2.dto";
import { WellResponseDto } from "../../dto/well-response.dto";

@ApiTags("Wells")
@Controller({ path: "wells", version: "1" })
export class WellController {
  constructor(
    private readonly wellService: WellService,
    private readonly userService: UserInfo
  ) {}

  @Get()
  @ApiOkResponse({ type: [WellDTO], description: HTTP_OK_MESSAGE })
  @ApiBadRequestResponse({ description: "plateId is not UUID" })
  @ApiNotFoundResponse({ description: NOT_FOUND_EXCEPTION_MESSAGE })
  async getAll(
    @Query(new ValidationPipe({ transform: true }))
    query: GetWellsRequestDTO
  ) {
    return await this.wellService.getAllWells(
      query.plateId,
      query?.activeWells
    );
  }

  @Get(":id")
  @ApiOkResponse({ type: WellDTO, description: HTTP_OK_MESSAGE })
  @ApiBadRequestResponse({ description: BAD_REQUEST_EXCEPTION_MESSAGE })
  @ApiNotFoundResponse({ description: NOT_FOUND_EXCEPTION_MESSAGE })
  async getById(@Param("id") id: string) {
    const well = await this.wellService.getById(id);
    return await this.wellService.buildWellWithTimeSeriesAndImageEventData(
      well
    );
  }

  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  @Patch(":id")
  @ApiOkResponse({ type: WellDTO, description: HTTP_OK_MESSAGE })
  @ApiNotFoundResponse({ description: NOT_FOUND_EXCEPTION_MESSAGE })
  @ApiBadRequestResponse({ description: BAD_REQUEST_EXCEPTION_MESSAGE })
  @ApiBody({
    type: PatchRequestBodyDTO,
    schema: { $ref: getSchemaPath(PatchRequestBodyDTO) },
    description:
      "For more details on path and value please refer to WellDTO from the schema section!",
  })
  @ApiProduces(
    "For more details on response schema please refer to WellDTO from the schema section!"
  )
  async update(
    @Param("id") id: string,
    @Body() patchOps: [Operation],
    @Headers("user-profile") userProfile: string
  ) {
    let userId: string = await this.userService.getUserId(userProfile);
    const updatedWell = await this.wellService.update(id, patchOps, userId);
    return await this.wellService.buildWellWithTimeSeriesAndImageEventData(
      updatedWell
    );
  }

  @Post()
  @ApiOkResponse({
    type: CreateWellResponseDTO,
    schema: { $ref: getSchemaPath(CreateWellResponseDTO) },
  })
  @ApiNotFoundResponse({
    description: "The provided plate is invalid",
  })
  @ApiBadRequestResponse({ description: "The provided request is invalid" })
  @ApiBody({
    type: CreateWellRequestDTO,
    schema: { $ref: getSchemaPath(CreateWellRequestDTO) },
    description:
      "For more details on request please refer to CreateWellRequestDTO from the schema section!",
  })
  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  @ApiUnprocessableEntityResponse({
    description:
      "The provided well position already exists for the given plate",
  })
  async addPlate(
    @Body() wellRequest: CreateWellRequestDTO,
    @Headers("user-profile") userProfile: string
  ) {
    return await this.wellService.addWell(wellRequest, userProfile);
  }

  @Get()
  @Version("2")
  @ApiOkResponse({ type: [WellResponseDto], description: HTTP_OK_MESSAGE })
  @ApiBadRequestResponse({ description: "plateId is not UUID" })
  @ApiNotFoundResponse({ description: NOT_FOUND_EXCEPTION_MESSAGE })
  async getAllV2(@Query() query: GetWellsV2Dto) {
    return await this.wellService.getAllWellsV2(query);
  }
}
