import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseArrayPipe,
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
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProduces,
  ApiTags,
  getSchemaPath,
} from "@nestjs/swagger";
import { GetProtocolsQuery } from "../../dto/get-protocol-query.dto";
import { ProtocolService } from "../protocol-service/protocol-service.service";
import { Operation } from "fast-json-patch";
import { CreateProtocolRequestDTO } from "../../dto/create-protocol-request.dto";
import { ProtocolDTO } from "../../dto/protocol.dto";
import { ProtocolContentDTO } from "../../dto/protocol-content.dto";
import { PatchRequestBodyDTO } from "../../dto/patchRequestBody.dto";
import { GetProtocolsV2Query } from "../../dto/get-protocol-query-v2.dto";
import { ProtocolResponseV2Dto } from "../../dto/protocol-response.dto";

@ApiTags("Protocol")
@Controller({ path: "protocols", version: "1" })
export class ProtocolController {
  constructor(private readonly protocolService: ProtocolService) {}

  /**
   * Handler function to perform Get All operation on `Protocol` resource.
   */
  @Get()
  @ApiOkResponse({ type: ProtocolDTO })
  @ApiBadRequestResponse({
    description: "phaseId and precedingProtocolId should be UUID",
  })
  async getAll(
    @Query(new ValidationPipe({ transform: true })) query: GetProtocolsQuery
  ): Promise<ProtocolDTO> {
    return await this.protocolService.getAll(query);
  }

  @Version("2")
  @Get()
  @ApiOkResponse({ type: ProtocolResponseV2Dto })
  @ApiBadRequestResponse({
    description: "phaseId and precedingProtocolId should be UUID",
  })
  async getAllV2(
    @Query() query: GetProtocolsV2Query
  ): Promise<ProtocolResponseV2Dto> {
    return await this.protocolService.getAllV2(query);
  }

  /**
   * Handler function to perform Get By Id operation on `Protocol` resource.
   */
  @Get(":id")
  @ApiOkResponse({
    type: [ProtocolDTO],
    description: "Request processed successfully!",
  })
  @ApiBadRequestResponse({ description: "Bad Request: id is not UUID" })
  @ApiNotFoundResponse({ description: "Not found: Provided id is not found" })
  async getById(@Param("id") id: string): Promise<ProtocolContentDTO> {
    const protocol = await this.protocolService.getById(id);
    return new ProtocolContentDTO(protocol);
  }

  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  @Post()
  @ApiOkResponse({
    type: ProtocolDTO,
    schema: { $ref: getSchemaPath(ProtocolDTO) },
  })
  @ApiBadRequestResponse({ description: "The provided request is invalid" })
  @ApiInternalServerErrorResponse({
    description: "Unexpected error while processing for adding protocol",
  })
  @ApiBody({
    type: CreateProtocolRequestDTO,
    schema: { $ref: getSchemaPath(CreateProtocolRequestDTO) },
    description:
      "For more details on request please refer to CreateProtocolRequestDTO from the schema section!",
  })
  async addProtocol(
    @Body() protocolRequest: CreateProtocolRequestDTO,
    @Headers("user-profile") userProfile: string
  ) {
    return this.protocolService.addProtocol(protocolRequest, userProfile);
  }

  // @Patch(":id")
  // @ApiHeader({
  //   name: "user-profile",
  //   required: false,
  //   description: "(Leave empty.)",
  // })
  // @ApiOkResponse({ type: ProtocolDTO })
  // @ApiNotFoundResponse({ description: "The provided Protocol Id is not found" })
  // @ApiBadRequestResponse({ description: "Provided Protocol id is not an uuid" })
  // @ApiBody({
  //   type: [PatchRequestBodyDTO],
  //   schema: { $ref: getSchemaPath(PatchRequestBodyDTO) },
  //   description:
  //     "For more details on path and value please refer to PatchRequestBodyDTO from the schema section!",
  // })
  // @ApiProduces(
  //   "For more details on response schema please refer to PatchRequestBodyDTO from the schema section!"
  // )
  // async patchProtocolById(
  //   @Param("id") id: string,
  //   @Body( new ParseArrayPipe()) data: Operation[],
  //   @Headers("user-profile") userProfile: string
  // ): Promise<ProtocolContentDTO> {
  //   return this.protocolService.updateByPatch(id, data, userProfile);
  // }
}
