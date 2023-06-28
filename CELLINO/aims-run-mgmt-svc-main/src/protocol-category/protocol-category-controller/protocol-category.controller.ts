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
import { ProtocolCategoryService } from "../protocol-category-service/protocol-category-service.service";
import { PaginationDTO } from "../../dto/pagination.dto";
import { LookUpDTO } from "../../dto/lookup.dto";
import { CreateLookUpDataDTO } from "../../dto/create-lookup-data.dto";
import { LookUpContentDTO } from "../../dto/lookup-content.dto";

@ApiTags("Protocol Category")
@Controller({ path: "protocol-categories", version: "1" })
export class ProtocolCategoryController {
  constructor(
    private readonly protocolCategoryService: ProtocolCategoryService
  ) {}

  /**
   * Handler function to perform Get All operation on `ProtocolCategory` resource.
   */
  @Get()
  @ApiOkResponse({ type: LookUpDTO })
  async getAll(
    @Query(new ValidationPipe({ transform: true })) query: PaginationDTO
  ): Promise<LookUpDTO> {
    return await this.protocolCategoryService.getAll(query);
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
    description:
      "Unexpected error while processing for adding protocol Category",
  })
  @ApiBody({
    type: CreateLookUpDataDTO,
    schema: { $ref: getSchemaPath(CreateLookUpDataDTO) },
    description:
      "For more details on request please refer to CreateLookUpDataDTO from the schema section!",
  })
  async addProtocolCategory(
    @Body() protocolCategoryRequest: CreateLookUpDataDTO,
    @Headers("user-profile") userProfile: string
  ) {
    return this.protocolCategoryService.addProtocolCategory(
      protocolCategoryRequest,
      userProfile
    );
  }
}
