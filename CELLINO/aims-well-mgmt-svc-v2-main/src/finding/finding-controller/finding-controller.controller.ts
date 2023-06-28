import { Body, Controller, Get, Post, Query, Headers } from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from "@nestjs/swagger";
import { createFindingObjectRequest } from "src/dto/create-finding-object-request.dto";
import { FindingDTO } from "src/dto/finding.dto";
import { GetFindingsCountRequestDTO } from "src/dto/get-findings-count-request.dto";
import { ObjectCountByAnalysisRequestDto } from "src/dto/objects-group-by-analysis-dto";
import { FindingPaginatedResponse } from "../../dto/finding-paginated.dto";
import { GetFindingRequestDTO } from "../../dto/get-finding-request.dto";
import { FindingService } from "../finding-service/finding-service.service";

@Controller({ path: "findings", version: "1" })
@ApiTags("Findings")
export class FindingController {
  constructor(private readonly findingService: FindingService) {}

  @Get()
  @ApiOkResponse({ type: FindingPaginatedResponse })
  async getAll(@Query() request: GetFindingRequestDTO) {
    return await this.findingService.getAll(request);
  }

  @Get("image-analysis-request/count")
  @ApiOkResponse({ type: ObjectCountByAnalysisRequestDto })
  async getCountOfAnalysisRequests(
    @Query() request: GetFindingsCountRequestDTO
  ) {
    return await this.findingService.getFindingsCountGroupedByAnalysisRequest(
      request
    );
  }

  @Post()
  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  @ApiCreatedResponse({ type: FindingDTO })
  @ApiBody({
    type: createFindingObjectRequest,
    schema: { $ref: getSchemaPath(createFindingObjectRequest) },
    description:
      "For more details on path and value please refer to createFindingObjectRequest from the schema section!",
  })
  async createFindingObject(
    @Body() request: createFindingObjectRequest,
    @Headers("user-profile") userProfile: string
  ) {
    return await this.findingService.createFindingObject(request, userProfile);
  }
}
