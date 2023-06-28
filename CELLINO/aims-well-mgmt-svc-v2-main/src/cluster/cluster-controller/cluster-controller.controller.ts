import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  ValidationPipe,
  Headers,
  Post,
  ParseUUIDPipe,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProduces,
  ApiTags,
  getSchemaPath,
} from "@nestjs/swagger";
import { CreateClusterRequestDTO } from "../../dto/cluster-request.dto";
import { ClusterDTO } from "../../dto/cluster.dto";
import { GetClusterRequestDTO } from "../../dto/get-cluster-request.dto";
import { ClusterService } from "../cluster-service/cluster-service.service";
import { Operation } from "fast-json-patch";
import { PatchRequestBodyDTO } from "../../dto/patch-request-body.dto";
import {
  BAD_REQUEST_EXCEPTION_MESSAGE,
  HTTP_OK_MESSAGE,
} from "../../utils/constants";
import { ObjectCountByAnalysisRequestDto } from "../../dto/objects-group-by-analysis-dto";
import { ClusterPaginatedDTO } from "../../dto/cluster-paginated.dto";
import { GetClustersCountGroupedByImageAnalysisDTO } from "../../dto/get-clusters-count-grouped-by-image-analysis";

@ApiTags("Clusters")
@Controller({ path: "clusters", version: "1" })
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}

  @Get("image-analysis-request-id/count")
  @ApiOkResponse({ type: [ObjectCountByAnalysisRequestDto] })
  async getClusteObjectsGroupedByImageAnalysis(
    @Query() query: GetClustersCountGroupedByImageAnalysisDTO
  ) {
    return await this.clusterService.getClusterObjectsGroupedByImageAnalysis(
      query
    );
  }

  @Get()
  @ApiOkResponse({ type: ClusterPaginatedDTO, description: HTTP_OK_MESSAGE })
  @ApiBadRequestResponse({
    description: "The provided image event id is not UUID",
  })
  @ApiNotFoundResponse({
    description: "The provided image event id is not found",
  })
  @ApiProduces(
    "For more details on response schema please refer to ClusterPaginatedDTO from the schema section!"
  )
  async getClusters(
    @Query() query: GetClusterRequestDTO
  ): Promise<ClusterPaginatedDTO> {
    return await this.clusterService.getClusters(query);
  }

  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  @Post()
  @ApiCreatedResponse({ type: ClusterDTO, description: HTTP_OK_MESSAGE })
  @ApiInternalServerErrorResponse({
    description: "Unexpected Error when processing the request",
  })
  @ApiBadRequestResponse({
    description: "The provided image event id is not UUID",
  })
  @ApiBody({
    type: CreateClusterRequestDTO,
    schema: { $ref: getSchemaPath(CreateClusterRequestDTO) },
    description:
      "For more details on request please refer to CreateClusterRequestDTO from the schema section!",
  })
  @ApiProduces(
    "For more details on response schema please refer to ClusterDTO from the schema section!"
  )
  async addCluster(
    @Body() createClusterRequestDTO: CreateClusterRequestDTO,
    @Headers("user-profile") userProfile: string
  ) {
    return this.clusterService.addCluster(createClusterRequestDTO, userProfile);
  }

  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  @Patch(":id")
  @ApiOkResponse({ type: ClusterDTO, description: HTTP_OK_MESSAGE })
  @ApiNotFoundResponse({ description: "The provided cluster Id is not found" })
  @ApiBadRequestResponse({ description: BAD_REQUEST_EXCEPTION_MESSAGE })
  @ApiBody({
    type: PatchRequestBodyDTO,
    schema: { $ref: getSchemaPath(PatchRequestBodyDTO) },
    description:
      "For more details on path and value please refer to ClusterDTO from the schema section!",
  })
  @ApiProduces(
    "For more details on response schema please refer to ClusterDTO from the schema section!"
  )
  async patchClusterById(
    @Param("id") id: string,
    @Body() data: [Operation],
    @Headers("user-profile") userProfile: string
  ): Promise<ClusterDTO> {
    return this.clusterService.updateByPatch(id, data, userProfile);
  }
}
