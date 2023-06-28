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
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProduces,
  ApiTags,
  getSchemaPath,
} from "@nestjs/swagger";
import { ColonyService } from "../colony-service/colony-service.service";
import { Operation } from "fast-json-patch";
import { ColonyDTO } from "../../dto/colony.dto";
import { GetColonyRequestDTO } from "../../dto/get-colony-request.dto";
import { CreateColonyRequestDTO } from "../../dto/colony-request.dto";
import { PatchRequestBodyDTO } from "../../dto/patch-request-body.dto";
import {
  BAD_REQUEST_EXCEPTION_MESSAGE,
  HTTP_OK_MESSAGE,
} from "../../utils/constants";
import { ColonyCountDTO } from "../../dto/colony-count.dto";
import { GetColonyCountByQualityRequestDTO } from "../../dto/get-colony-count-by-quality.dto";

@ApiTags("Colonies")
@Controller({ path: "colonies", version: "1" })
export class ColonyController {
  constructor(private readonly colonyService: ColonyService) {}

  @Get()
  @ApiOkResponse({ type: [ColonyDTO], description: HTTP_OK_MESSAGE })
  @ApiBadRequestResponse({
    description: "The provided image event id is not UUID",
  })
  @ApiProduces(
    "For more details on response schema please refer to ColonyDTO from the schema section!"
  )
  async getColony(
    @Query(new ValidationPipe({ transform: true })) query: GetColonyRequestDTO
  ): Promise<ColonyDTO[]> {
    return await this.colonyService.getColonies(
      query.imageEventId,
      query.quality
    );
  }

  @Get("quality/count")
  @ApiOkResponse({ type: ColonyCountDTO, description: HTTP_OK_MESSAGE })
  @ApiProduces(
    "For more details on response schema please refer to ColonyCountDTO from the schema section!"
  )
  async getColonyCountByQuality(
    @Query(new ValidationPipe({ transform: true }))
    query: GetColonyCountByQualityRequestDTO
  ): Promise<ColonyCountDTO> {
    return await this.colonyService.getColonyCountByQuality(query.imageEventId);
  }

  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  @Patch(":id")
  @ApiOkResponse({ type: ColonyDTO, description: HTTP_OK_MESSAGE })
  @ApiNotFoundResponse({ description: "The provided colony Id is not found" })
  @ApiBadRequestResponse({ description: BAD_REQUEST_EXCEPTION_MESSAGE })
  @ApiBody({
    type: PatchRequestBodyDTO,
    schema: { $ref: getSchemaPath(PatchRequestBodyDTO) },
    description:
      "For more details on path and value please refer to ColonyDTO from the schema section!",
  })
  @ApiProduces(
    "For more details on response schema please refer to ColonyDTO from the schema section!"
  )
  async patchColonyById(
    @Param("id") id: string,
    @Body() data: [Operation],
    @Headers("user-profile") userProfile: string
  ): Promise<ColonyDTO> {
    return this.colonyService.updateByPatch(id, data, userProfile);
  }

  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  @Post()
  @ApiOkResponse({ type: ColonyDTO, description: HTTP_OK_MESSAGE })
  @ApiInternalServerErrorResponse({
    description: "Unexpected Error when processing the request",
  })
  @ApiBody({
    type: CreateColonyRequestDTO,
    schema: { $ref: getSchemaPath(CreateColonyRequestDTO) },
    description:
      "For more details on request please refer to CreateColonyRequestDTO from the schema section!",
  })
  @ApiProduces(
    "For more details on response schema please refer to ColonyDTO from the schema section!"
  )
  async addColony(
    @Body() colonyRequest: CreateColonyRequestDTO,
    @Headers("user-profile") userProfile: string
  ) {
    console.log("inside post colony controller");
    return this.colonyService.addColony(colonyRequest, userProfile);
  }
}
