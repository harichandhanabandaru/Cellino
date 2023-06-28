import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from "@nestjs/swagger";
import { ProtocolTypeService } from "../protocol-type-service/protocol-type-service.service";
import { PaginationDTO } from "../../dto/pagination.dto";
import { LookUpDTO } from "../../dto/lookup.dto";
import { CreateLookUpDataDTO } from "../../dto/create-lookup-data.dto";
import { LookUpContentDTO } from "../../dto/lookup-content.dto";

@ApiTags("Protocol Type")
@Controller({ path: "protocol-types", version: "1" })
export class ProtocolTypeController {
  constructor(private readonly protocolTypeService: ProtocolTypeService) {}

  /**
   * Handler function to perform Get All operation on `ProtocolType` resource.
   */
  @Get()
  @ApiOkResponse({ type: LookUpDTO })
  async getAll(
    @Query(new ValidationPipe({ transform: true })) query: PaginationDTO
  ): Promise<LookUpDTO> {
    return await this.protocolTypeService.getAll(query);
  }

  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  @Post()
  @ApiOkResponse({
    type: LookUpContentDTO,
    schema: { $ref: getSchemaPath(LookUpContentDTO) },
  })
  @ApiBadRequestResponse({ description: "The provided request is invalid" })
  @ApiInternalServerErrorResponse({
    description: "Unexpected error while processing for adding protocol Type",
  })
  @ApiBody({
    type: CreateLookUpDataDTO,
    schema: { $ref: getSchemaPath(CreateLookUpDataDTO) },
    description:
      "For more details on request please refer to CreateLookUpDataDTO from the schema section!",
  })
  async addProtocolType(
    @Body() protocolTypeRequest: CreateLookUpDataDTO,
    @Headers("user-profile") userProfile: string
  ) {
    return this.protocolTypeService.addProtocolType(
      protocolTypeRequest,
      userProfile
    );
  }
}
