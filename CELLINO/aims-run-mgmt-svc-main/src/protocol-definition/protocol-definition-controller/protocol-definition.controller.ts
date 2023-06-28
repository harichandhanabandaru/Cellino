import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from "@nestjs/swagger";
import { Operation } from "fast-json-patch";
import { PatchRequestBodyDTO } from "../../dto/patchRequestBody.dto";
import { ProtocolDefinitionContentDTO } from "../../dto/protocol-definition-content.dto";
import { CreateProtocolDefinitionDTO } from "../../dto/create-protocol-defintiion.dto";
import { ProtocolDefinitionDTO } from "../../dto/protocol-definition.dto";
import { ProtocolDefinitionService } from "../protocol-definition-service/protocol-definition.service";
import { GetProtocolDefinitionsQuery } from "../../dto/get-protocol-definition-query.dto";

@ApiTags("Protocol Definitions")
@Controller({ path: "protocol-definitions", version: "1" })
export class ProtocolDefinitionController {
  constructor(
    private readonly protocolDefinitionService: ProtocolDefinitionService
  ) {}

  /**
   * Handler function to fetch all the Protocol Definitions.
   */
  @Get()
  @ApiOkResponse({
    type: [ProtocolDefinitionDTO],
    description: "Request processed successfully",
  })
  @ApiNotFoundResponse({ description: "Resource not found" })
  @ApiBadRequestResponse({
    description: ProtocolDefinitionService.BAD_REQUEST_ERROR_MESSAGE,
  })
  async getAll(
    @Query(new ValidationPipe({ transform: true }))
    query: GetProtocolDefinitionsQuery
  ): Promise<ProtocolDefinitionDTO> {
    return await this.protocolDefinitionService.getAll(query);
  }

  /**
   * Handler function to update a given record.
   */
  // @ApiHeader({
  //   name: "user-profile",
  //   required: false,
  //   description: "(Leave empty.)",
  // })
  // @Patch(":id")
  // @ApiOkResponse({ type: ProtocolDefinitionContentDTO })
  // @ApiBadRequestResponse({
  //   description: ProtocolDefinitionService.BAD_REQUEST_ERROR_MESSAGE,
  // })
  // @ApiNotFoundResponse({
  //   description: ProtocolDefinitionService.NOT_FOUND_ERROR_MESSAGE,
  // })
  // @ApiBody({
  //   type: PatchRequestBodyDTO,
  //   schema: { $ref: getSchemaPath(PatchRequestBodyDTO) },
  //   description:
  //     "For more details on path and value please refer to ProtocolDefinitionDTO from the schema section!",
  // })
  // async update(
  //   @Param("id") id: string,
  //   @Body() data: [Operation],
  //   @Headers("user-profile") userProfile: string
  // ) {
  //   let protocolDefinition = await this.protocolDefinitionService.update(
  //     id,
  //     data,
  //     userProfile
  //   );
  //   return new ProtocolDefinitionContentDTO(protocolDefinition);
  // }

  /**
   * Handler function to create a protocol definition record.
   */
  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  @Post()
  @ApiCreatedResponse({
    type: ProtocolDefinitionContentDTO,
    schema: { $ref: getSchemaPath(ProtocolDefinitionDTO) },
    description: "The record has been successfully created.",
  })
  @ApiBadRequestResponse({ description: "The provided request is invalid" })
  @ApiInternalServerErrorResponse({
    description:
      "Unexpected error while processing for storing protocol definition details",
  })
  @ApiBody({
    type: CreateProtocolDefinitionDTO,
    schema: { $ref: getSchemaPath(CreateProtocolDefinitionDTO) },
    description:
      "For more details on request please refer to CreateProtocolDefinitionDTO from the schema section!",
  })
  async addProtocolDefinition(
    @Body() protocolDefinitionRequest: CreateProtocolDefinitionDTO,
    @Headers("user-profile") userProfile: string
  ) {
    return this.protocolDefinitionService.addProtocolDefinition(
      protocolDefinitionRequest,
      userProfile
    );
  }
  /**
   * Handler function to perform Get By Id operation on `Protocol Definition` resource.
   */
  @Get(":id")
  @ApiOkResponse({
    type: ProtocolDefinitionContentDTO,
    schema: { $ref: getSchemaPath(ProtocolDefinitionContentDTO) },
    description: "Request processed successfully!",
  })
  @ApiBadRequestResponse({ description: "Bad Request: id is not UUID" })
  @ApiNotFoundResponse({ description: "Not found: Provided id is not found" })
  async getById(
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<ProtocolDefinitionContentDTO> {
    return await this.protocolDefinitionService.getById(id);
  }
}
